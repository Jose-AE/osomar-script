import * as util from "util";

import { IToken, TOKEN_REGEX, TokenType } from "./Tokens";

function tokenize(sourceCode: string): IToken[] {
  const tokenArray = new Array<IToken>();
  let remainingSourceCode = sourceCode;

  while (remainingSourceCode.length > 0) {
    let foundMatch = false;
    // Check for each token type
    for (const tokenType in TokenType) {
      if (isNaN(Number(tokenType))) continue; //skip strings just get enums

      const regex = TOKEN_REGEX[TokenType[tokenType]];
      const match = remainingSourceCode.match(regex);

      if (match && match.index === 0) {
        foundMatch = true;
        tokenArray.push({
          type: TokenType[tokenType] as any,
          value: match[0],
        });
        remainingSourceCode = remainingSourceCode.slice(match[0].length);
        break;
      }
    }
    if (!foundMatch) remainingSourceCode = remainingSourceCode.slice(1);
  }

  return tokenArray;
}

const testProgram = `
//Variable declaration and assignment
Ei myName es "Alice".

// Printing values
ctm("Hello World").


// Conditional statements
si (age < 18/2) 
    jajaja
        ctm("You are a minor.").
    nmms

aparte si (age >= 18 && age < 65) 
    jajaja
        ctm("You are an adult.").
    nmms 
aparte 
    jajaja
        ctm("You are a senior citizen.").
    nmms

// Looping
para (Ei i = 0. i < 5. i=i+ 1) 
    jajaja
        ctm(i)
    nmms

// Arrays
Ei fruits = ["apple", "banana", "orange"].
ctm("Fruits:", fruits).

// Functions
we myFunction(Ei name) 
    jajaja
        ctm("Hello, " + name).
    nmms

// Function call
myFunction("Bob").
`;

const arr = tokenize(testProgram);
console.log(util.inspect(arr, { maxArrayLength: null, colors: true }));
