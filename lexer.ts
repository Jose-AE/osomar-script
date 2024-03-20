import { IToken, SYMBOL_TOKENS, TokenType } from "./Tokens";

function generateToken(value: string = "", type: TokenType): IToken {
  return { value, type };
}

export function tokenize(sourceCode: string): IToken[] {
  const tokenArray = new Array<IToken>();
  const src = sourceCode.split("");

  while (src.length > 0) {
    const currChar = src[0];

    //check for symbol
    if (SYMBOL_TOKENS.includes(currChar)) {
      tokenArray.push(generateToken(src.shift(), TokenType.SYMBOL));
    }
  }

  return tokenArray;
}
