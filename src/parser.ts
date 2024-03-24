import { Literal, NumericLiteral, Program, StringLiteral } from "./ast";
import { Token, TokenType } from "./lexer";
import * as util from "util";

export class Parser {
  static tokens: Token[] = [];

  public static peek(): Token {
    //get the token to be parsed
    return this.tokens[0];
  }

  public static eat(tokenType: TokenType) {
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

    return this.tokens.shift() as Token;
  }

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

  private static Program(): Program {
    return { type: "PROGRAM_NODE", body: this.Literal() } as Program;
  }

  private static Literal(): Literal {
    switch (this.peek().type) {
      case TokenType.NUMERIC_LITERAL:
        return this.NumericLiteral();
      case TokenType.STRING_LITERAL:
        return this.StringLiteral();
      default:
        throw new SyntaxError("Literal: unexpected literal production");
    }
  }

  private static StringLiteral(): StringLiteral {
    const token = this.eat(TokenType.STRING_LITERAL);
    return {
      type: token.type,
      value: token.value.slice(1, -1),
    } as StringLiteral;
  }

  private static NumericLiteral(): NumericLiteral {
    const token = this.eat(TokenType.NUMERIC_LITERAL);
    return {
      type: token.type,
      value: Number(token.value),
    } as NumericLiteral;
  }
}
