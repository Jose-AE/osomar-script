import * as util from "util";

export interface Token {
  type: TokenType;
  value: string;
}

//#region TOKEN_DEFENITIONS

export enum TokenType {
  IGNORE = "IGNORE",

  IDENTIFIER = "IDENTIFIER",

  //Keywords
  KEYWORD_DECLARATION = "KEYWORD_DECLARATION",
  KEYWORD_FUNCTION = "KEYWORD_FUNCTION",
  KEYWORD_RETURN = "KEYWORD_RETURN",
  KEYWORD_IF = "KEYWORD_IF",
  KEYWORD_ELSE = "KEYWORD_ELSE",
  KEYWORD_WHILE = "KEYWORD_WHILE",

  //Punctuation
  LEFT_PAREN = "LEFT_PAREN",
  RIGHT_PAREN = "RIGHT_PAREN",
  BLOCK_START = "BLOCK_START",
  BLOCK_END = "BLOCK_END",
  COMMA = "COMMA",

  //Literals
  NUMERIC_LITERAL = "NUMERIC_LITERAL",
  STRING_LITERAL = "STRING_LITERAL",
  TRUE_LITERAL = "TRUE_LITERAL",
  FALSE_LITERAL = "FALSE_LITERAL",
  NULL_LITERAL = "NULL_LITERAL",

  //Operators
  OPERATOR_PLUS = "OPERATOR_PLUS",
  OPERATOR_MINUS = "OPERATOR_MINUS",
  OPERATOR_MULTIPLY = "OPERATOR_MULTIPLY",
  OPERATOR_DIVIDE = "OPERATOR_DIVIDE",
  OPERATOR_ASSIGNMENT = "OPERATOR_ASSIGNMENT",
  OPERATOR_EQUALITY = "OPERATOR_EQUALITY",

  //
  END_STATEMENT = "END_STATEMENT",
}

export const TOKEN_REGEX: { [key in keyof typeof TokenType]: RegExp } = {
  IGNORE: /[\n ]/,

  KEYWORD_DECLARATION: /Ei/,
  KEYWORD_FUNCTION: /we/,
  KEYWORD_RETURN: /nmms/,
  KEYWORD_IF: /hijo mio si/,
  KEYWORD_ELSE: /de lo contrario/,
  KEYWORD_WHILE: /no digas mamadas mientras/,

  LEFT_PAREN: /\(/,
  RIGHT_PAREN: /\)/,
  BLOCK_START: /"🃏/,
  BLOCK_END: /🃏"/,
  COMMA: /,/,

  NUMERIC_LITERAL: /[0-9]+\.?([0-9]+)*/,
  STRING_LITERAL: /"[^"]*"/,
  TRUE_LITERAL: /verdad/,
  FALSE_LITERAL: /falso/,
  NULL_LITERAL: /sepa dios/,

  OPERATOR_DIVIDE: /\//,
  OPERATOR_MINUS: /-/,
  OPERATOR_MULTIPLY: /\*/,
  OPERATOR_PLUS: /\+/,
  OPERATOR_ASSIGNMENT: /es/,
  OPERATOR_EQUALITY: /==/,

  IDENTIFIER:
    /\b(?!Ei|jajaja|es|sepa|dios|verdad|falso|we|nmms|hijo|mio|si|de|lo|contrario|no|digas|mamadas|mientras)[a-zA-Z_][a-zA-Z_0-9]*\b/,

  END_STATEMENT: /jajaja/,
};

//#endregion

export class Lexer {
  public static tokenize(sourceCode: string, debug: boolean = false): Token[] {
    const tokenArray = new Array<Token>();
    let position = 0;
    let remainingSourceCode = sourceCode;

    while (remainingSourceCode.length > 0) {
      let foundMatch = false;
      // Check for each token type
      for (const tokenType in TokenType) {
        const regex = TOKEN_REGEX[tokenType as keyof typeof TOKEN_REGEX];
        const match = remainingSourceCode.match(regex);

        if (match && match.index === 0) {
          foundMatch = true;

          if (tokenType !== TokenType.IGNORE) {
            tokenArray.push({
              type: TokenType[tokenType as keyof typeof TokenType],
              value: match[0],
            });
          }

          remainingSourceCode = remainingSourceCode.slice(match[0].length);
          position++;

          break;
        }
      }
      if (!foundMatch) {
        throw new SyntaxError(
          `Invalid token "${remainingSourceCode[0]}" at position ${position}`
        );
      }
    }

    if (debug) {
      console.log("\n\n\n\n------------[Token Array]-------------");
      console.log(
        util.inspect(tokenArray, { maxArrayLength: null, colors: true })
      );
      console.log("-------------------------\n\n\n\n");
    }

    return tokenArray;
  }
}
