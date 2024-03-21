export enum TokenType {
  KEYWORD, // Ei, ctm, si, aparte, para, we
  PUNCTUATION, // . ( ) jajaja nmms [ ]
  OPERATOR, // +, -, *, /, es, ==, !=, <, >, y, o
  COMMENT, // // single-line comment
  LITERAL, // 10, 0.2, "Hello"
  ID, // myVar, myNum
}

export const TOKEN_REGEX: { [key: string]: RegExp } = {
  KEYWORD: /Ei|ctm|si|aparte|para|we/,
  PUNCTUATION: /[.\(\)\[\]]|(jajaja|nmms)/,
  LITERAL: /(([0-9]+(\.[0-9]+)*)|("[ A-Za-z]+"))/,
  OPERATOR: /([-+*oy<>])|(es|==|!=)|(\/(?!\/))/,
  COMMENT: /\/\/.*/,
  ID: /[a-zA-Z_][a-zA-Z_0-9]*/,
};

export interface IToken {
  type: TokenType;
  value: string;
}
