import { Lexer } from "./lexer";
import * as util from "util";
import { Parser } from "./parser";
import { Program } from "./ast";
import { Interpreter } from "./interpreter";

const sourceCode = `
1+1 jajaja

// Variables
Ei miNombre es "Osomar" jajaja
Ei miNumero es 5 jajaja
Ei miVerdadero es verdad jajaja
Ei miFalso es falso jajaja
Ei miNull es sepa dios jajaja


//Printing
ctm(miNombre) jajaja

// Conditional statement
Ei x es 1 jajaja

hijo mio si (x == 1) "🃏 

  ctm("Num 1") jajaja

🃏" de lo contrario hijo mio si (x==2) "🃏 

  ctm("Num 2") jajaja

🃏" de lo contrario "🃏 

  ctm("Num any") jajaja

🃏"


// Function
we MiFuncion(num) "🃏
  nmms num * num jajaja
🃏"

ctm(square(5)) jajaja // Output: 25


// While loop
Ei countdown es 3 jajaja
no digas mamadas mientras (countdown > 0) "🃏 

  ctm(countdown)jajaja
  countdown es countdown - 1 jajaja

🃏"

`;

function run() {
  let tokens = Lexer.tokenize(sourceCode, true);

  let AST: Program = Parser.parse(tokens, true);

  Interpreter.interpret(AST);
}

run();
