import {
  BinaryExpression,
  Literal,
  Expression,
  Program,
  Statement,
  DeclarationStatement,
  Identifier,
  AssignmentStatement,
  FunctionDeclarationStatement,
  BlockStatement,
  ReturnStatement,
  IfStatement,
  WhileStatement,
  CallFunctionStatement,
  NodeType,
  BreakStatement,
} from "./ast";
import { Token, TokenType } from "./lexer";
import * as util from "util";

export class Parser {
  static tokens: Token[] = [];
  static position: number = 0;

  //#region MAIN_FUNCTIONS

  public static parse(tokenArray: Token[], debug: boolean = false): Program {
    this.tokens = tokenArray;

    const program: Program = this.Program();

    if (debug) {
      console.log("\n\n\n\n------------[AST]-------------");
      console.log(util.inspect(program, false, null, true));
      console.log("-----------------------------\n\n\n\n");
    }

    return program;
  }

  public static peek(index: number = 0): Token | null {
    //get the token to be parsed
    return this.tokens[index];
  }

  public static eat(tokenType: TokenType | null = null) {
    const token = this.peek();

    if (token == null) {
      throw new SyntaxError(
        `Unexpected end of input, expected: "${tokenType}"`
      );
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token: "${token.value}", expected: "${tokenType}"`
      );
    }
    this.position++;
    return this.tokens.shift() as Token;
  }

  //#endregion

  //#region PARSING_FUNCTIONS
  private static Program(): Program {
    return { type: NodeType.PROGRAM, body: this.StatementList() };
  }

  private static StatementList(
    stopLookAhead: TokenType | null = null
  ): Statement[] {
    const statementList: Statement[] = [this.Statement()];
    while (this.peek() != null && this.peek()?.type !== stopLookAhead) {
      statementList.push(this.Statement());
    }
    return statementList;
  }

  //#region STATMENT_FUNCTIONS

  static Statement(): Statement {
    const tok1 = this.peek()?.type;
    const tok2 = this.peek(1)?.type;

    if (tok1 === TokenType.KEYWORD_DECLARATION)
      return this.DeclarationStatement();
    else if (
      tok1 === TokenType.IDENTIFIER &&
      tok2 === TokenType.OPERATOR_ASSIGNMENT
    ) {
      return this.AssignmentStatement();
    } else if (tok1 === TokenType.KEYWORD_FUNCTION) {
      return this.FunctionDeclarationStatement();
    } else if (tok1 === TokenType.KEYWORD_RETURN) {
      return this.ReturnStatement();
    } else if (tok1 === TokenType.KEYWORD_BREAK) {
      return this.BreakStatement();
    } else if (tok1 === TokenType.KEYWORD_IF) {
      return this.IfStatement();
    } else if (tok1 === TokenType.KEYWORD_WHILE) {
      return this.WhileStatement();
    } else if (tok1 === TokenType.IDENTIFIER && tok2 === TokenType.LEFT_PAREN) {
      const node = this.CallFunctionStatement();
      this.eat(TokenType.END_STATEMENT);
      return node;
    } else {
      const exp = this.Expression();
      this.eat(TokenType.END_STATEMENT);
      return exp;
    }
  }
  static CallFunctionStatement(): CallFunctionStatement {
    const functionId = this.Identifier();
    this.eat(TokenType.LEFT_PAREN);
    const args: (Expression | CallFunctionStatement)[] = [];

    while (this.peek()?.type !== TokenType.RIGHT_PAREN) {
      if (
        this.peek()?.type === TokenType.IDENTIFIER &&
        this.peek(1)?.type === TokenType.LEFT_PAREN
      ) {
        args.push(this.CallFunctionStatement());
      } else {
        args.push(this.Expression());
      }

      if (this.peek()?.type !== TokenType.RIGHT_PAREN)
        this.eat(TokenType.COMMA);
    }

    this.eat(TokenType.RIGHT_PAREN);

    return {
      type: NodeType.CALL_FUNCTION_STATEMENT,
      functionId,
      arguments: args,
    };
  }
  static WhileStatement(): WhileStatement {
    this.eat(TokenType.KEYWORD_WHILE);
    this.eat(TokenType.LEFT_PAREN);
    const test = this.Expression();
    this.eat(TokenType.RIGHT_PAREN);

    const body = this.BlockStatement();

    return { type: NodeType.WHILE_STATEMENT, test, body };
  }
  static IfStatement(): IfStatement {
    this.eat(TokenType.KEYWORD_IF);
    this.eat(TokenType.LEFT_PAREN);
    const test = this.Expression();
    this.eat(TokenType.RIGHT_PAREN);

    const ifTrue = this.BlockStatement();

    let ifFalse: BlockStatement | null | IfStatement = null;

    if (
      this.peek()?.type === TokenType.KEYWORD_ELSE &&
      this.peek(1)?.type === TokenType.KEYWORD_IF
    ) {
      this.eat(TokenType.KEYWORD_ELSE);
      ifFalse = this.IfStatement();
    } else if (this.peek()?.type === TokenType.KEYWORD_ELSE) {
      this.eat(TokenType.KEYWORD_ELSE);
      ifFalse = this.BlockStatement();
    }

    return { type: NodeType.IF_STATEMENT, test, ifTrue, ifFalse };
  }
  static ReturnStatement(): ReturnStatement {
    this.eat(TokenType.KEYWORD_RETURN);
    const expression = this.Expression();
    this.eat(TokenType.END_STATEMENT);

    return {
      type: NodeType.RETURN_STATEMENT,
      argument: expression,
    };
  }

  static BreakStatement(): BreakStatement {
    this.eat(TokenType.KEYWORD_BREAK);
    this.eat(TokenType.END_STATEMENT);

    return {
      type: NodeType.BREAK_STATEMENT,
    };
  }

  static FunctionDeclarationStatement(): FunctionDeclarationStatement {
    this.eat(TokenType.KEYWORD_FUNCTION);
    const id = this.Identifier();
    this.eat(TokenType.LEFT_PAREN);

    const params: Identifier[] = [];
    while (this.peek()?.type !== TokenType.RIGHT_PAREN) {
      params.push(this.Identifier());
      if (this.peek()?.type !== TokenType.RIGHT_PAREN)
        this.eat(TokenType.COMMA);
    }
    this.eat(TokenType.RIGHT_PAREN);

    const body = this.BlockStatement();

    return {
      type: NodeType.FUNCTION_DECLARATION_STATEMENT,
      id,
      params,
      body,
    };
  }

  static BlockStatement(): BlockStatement {
    let body: Statement[] = [];

    this.eat(TokenType.BLOCK_START);
    if (this.peek()?.type !== TokenType.BLOCK_END) {
      body = this.StatementList(TokenType.BLOCK_END);
    }
    this.eat(TokenType.BLOCK_END);

    return { type: NodeType.BLOCK_STATEMENT, body };
  }

  static AssignmentStatement(): AssignmentStatement {
    const id = this.Identifier();
    this.eat(TokenType.OPERATOR_ASSIGNMENT);
    const expression = this.Expression();
    this.eat(TokenType.END_STATEMENT);

    return {
      type: NodeType.ASSIGNMENT_STATEMENT,
      id,
      expression,
    };
  }

  static DeclarationStatement(): DeclarationStatement {
    this.eat(TokenType.KEYWORD_DECLARATION);
    const id = this.Identifier();
    let init: Expression | null = null;

    if (this.peek()?.type === TokenType.OPERATOR_ASSIGNMENT) {
      this.eat(TokenType.OPERATOR_ASSIGNMENT);
      init = this.Expression();
    }

    this.eat(TokenType.END_STATEMENT);

    return {
      type: NodeType.DECLARATION_STATEMENT,
      id,
      init,
    };
  }

  //#endregion

  static Identifier(): Identifier {
    const token = this.eat(TokenType.IDENTIFIER);
    return {
      type: NodeType.IDENTIFIER,
      name: token.value,
    };
  }

  //#region BINARY_OPERATIONS_PARSING_FUNCTIONS
  static BinaryOperation(
    func: Function,
    operators: TokenType[]
  ): BinaryExpression {
    let node: BinaryExpression = func();

    while (operators.includes(this.peek()?.type as TokenType)) {
      const opToken = this.peek();
      this.eat(opToken?.type);

      node = {
        type: NodeType.BINARY_EXPRESSION,
        left: node,
        operator: opToken?.value as string,
        right: func(),
      };
    }

    return node;
  }

  private static Expression(): BinaryExpression {
    return this.BinaryOperation(this.Term.bind(this), [
      TokenType.OPERATOR_MINUS,
      TokenType.OPERATOR_PLUS,
      TokenType.OPERATOR_EQUALITY,
      TokenType.OPERATOR_NOT_EQUAL,
      TokenType.OPERATOR_GREATER_THAN,
      TokenType.OPERATOR_LESS_THAN,
      TokenType.OPERATOR_GREATER_THAN_OR_EQUAL,
      TokenType.OPERATOR_LESS_THAN_OR_EQUAL,
      TokenType.OPERATOR_AND,
      TokenType.OPERATOR_OR,
    ]);
  }

  private static Term(): BinaryExpression {
    return this.BinaryOperation(this.Factor.bind(this), [
      TokenType.OPERATOR_MULTIPLY,
      TokenType.OPERATOR_DIVIDE,
    ]);
  }

  private static Factor(): Expression {
    switch (this.peek()?.type) {
      case TokenType.NUMERIC_LITERAL:
      case TokenType.NULL_LITERAL:
      case TokenType.FALSE_LITERAL:
      case TokenType.TRUE_LITERAL:
      case TokenType.STRING_LITERAL:
        return this.Literal();

      case TokenType.LEFT_PAREN:
        this.eat(TokenType.LEFT_PAREN);
        const node = this.Expression();
        this.eat(TokenType.RIGHT_PAREN);
        return node;

      case TokenType.IDENTIFIER:
        return this.Identifier();

      default:
        throw new SyntaxError(
          `Invalid factor "${this.peek()?.value}"  at pos ${this.position}`
        );
    }
  }

  //#endregion

  //#region LITERAL_PARSING_FUNCTIONS
  private static Literal(): Literal {
    switch (this.peek()?.type) {
      case TokenType.NUMERIC_LITERAL:
        return {
          type: NodeType.NUMERIC_LITERAL,
          value: this.eat(TokenType.NUMERIC_LITERAL).value,
        };

      case TokenType.STRING_LITERAL:
        return {
          type: NodeType.STRING_LITERAL,
          value: this.eat(TokenType.STRING_LITERAL).value.slice(1, -1),
        };

      case TokenType.TRUE_LITERAL:
        return {
          type: NodeType.TRUE_LITERAL,
          value: this.eat(TokenType.TRUE_LITERAL).value,
        };
      case TokenType.FALSE_LITERAL:
        return {
          type: NodeType.FALSE_LITERAL,
          value: this.eat(TokenType.FALSE_LITERAL).value,
        };
      case TokenType.NULL_LITERAL:
        return {
          type: NodeType.NULL_LITERAL,
          value: this.eat(TokenType.NULL_LITERAL).value,
        };
      default:
        throw new SyntaxError(
          `Unexpected literal ("${
            this.peek()?.value
          }") production at position: ${this.position}`
        );
    }
  }

  //#endregion

  //#endregion
}
