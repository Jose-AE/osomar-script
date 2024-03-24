// import {
//   BlockStatement,
//   DECLARATION_KEYWORD,
//   Expression,
//   Identifier,
//   LINE_END,
//   Literal,
//   Program,
//   Statment,
//   VariableDeclaration,
// } from "./ast";
// import { Token, TokenType } from "./lexer";

// export class Parser {
//   static tokens: Token[] = [];

//   public static generateAST(tokenArray: Token[]): Program {
//     this.tokens = tokenArray;
//     const programBodyBlock: BlockStatement = this.parseBlock();

//     return { type: "PROGRAM_NODE", body: programBodyBlock };
//   }

//   private static eat() {
//     return this.tokens.shift();
//   }

//   private static parseBlock(): BlockStatement {
//     const block: BlockStatement = { type: "BLOCK_STATEMENT_NODE", body: [] };
//     while (this.tokens.length > 0) {
//       const statement = this.parseStatement();
//       if (statement) {
//         block.body.push(statement);
//       }
//     }
//     return block;
//   }

//   private static parseStatement(): Statment | null {
//     const currentToken = this.tokens[0];

//     switch (currentToken.type) {
//       case TokenType.KEYWORD:
//         if (currentToken.value === DECLARATION_KEYWORD) {
//           return this.parseVariableDeclaration();
//         }
//       default:
//         return null;
//     }
//   }
//   private static parseVariableDeclaration(): VariableDeclaration {
//     this.eat(); // Consume "Ei"
//     const id = this.parseIdentifier();
//     let value: Expression | null = null;

//     if (this.tokens[0].value !== LINE_END) {
//       this.eat(); // Consume "es"
//       value = this.parseExpression();
//     }
//     this.eat(); // Consume "."
//     return { type: "VARIABLE_DECLARATION_NODE", id, value };
//   }

//   private static parseIdentifier(): Identifier {
//     const token = this.eat();
//     return { type: "IDENTIFIER_NODE", value: token ? token.value : "" };
//   }

//   private static parseExpression(): Expression {
//     // Very simplistic, assumes literal or identifier for now
//     const token = this.eat();
//     if (token) {
//       if (token.type === TokenType.LITERAL) {
//         return { type: "LITERAL_NODE", value: token.value } as Literal;
//       } else if (token.type === TokenType.IDENTIFIER) {
//         return { type: "IDENTIFIER_NODE", value: token.value } as Identifier;
//       }
//     }
//     return { type: "", value: "" } as Literal;
//   }
// }
