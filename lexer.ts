export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
}

export interface IToken {
  value: string;
  type: TokenType;
}

function generateToken(value: string = "", type: TokenType): IToken {
  return { value, type };
}

export function tokenize(sourceCode: string): IToken[] {
  const tokenArray = new Array<IToken>();
  const src = sourceCode.split("");

  while (src.length > 0) {
    const currChar = src[0];

    if (currChar === "(") {
      tokenArray.push(generateToken(src.shift(), TokenType.OpenParen));
    } else if (currChar === ")") {
      tokenArray.push(generateToken(src.shift(), TokenType.OpenParen));
    } else if (
      currChar === "-" ||
      currChar === "+" ||
      currChar === "*" ||
      currChar === "/"
    ) {
      tokenArray.push(generateToken(src.shift(), TokenType.BinaryOperator));
    } else if (currChar === "=") {
      tokenArray.push(generateToken(src.shift(), TokenType.Equals));
    } else {
    }
  }

  return tokenArray;
}
