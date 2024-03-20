export enum TokenType {
  KEYWORD, // void, int
  ID, // myVar, myNum
  LITERAL, // 10, 0.2, "Hello"
  OPERATOR, // +, -, *, /, =, ==, !=, <, >, &&, ||
  PUNCTUATION, // {   }  (   )   ,  ;
  COMMENT, // // single-line comment or /* multi-line comment */
}

export const TOKEN_REGEX = {
  ID: /[a-zA-Z_][a-zA-Z_0-9]*/,
  LITERAL: /([0-9.]+)|([A-Za-z]+)/,
  PUNCTUATION: /[{}(),;]/,
  OPERATOR: /1/,
  COMMENT: /1/,
};

export const TOKEN_KEYWORDS: string[] = ["void", "int", "str"];

export interface IToken {
  type: TokenType;
  value: string;
}
