import { Lexer } from "./lexer";
import * as util from "util";
import { Parser } from "./parser";

const sourceCode = `


x + y jajaja

x es 10 jajaja

Ei x es (5+x) jajaja

`;

function run() {
  let tokens = Lexer.tokenize(sourceCode, true);

  let AST = Parser.parse(tokens, true);
}

run();

/*
x + y jajaja

x es 10 jajaja

Ei x es 5 jajaja

we miOsmarfuncion(arg1, arg2) "🃏 🃏"

nmms verdad jajaja

hijo mio si (x == 5) "🃏 🃏" de lo contrario

no digas mamadas mientras (falso) "🃏 🃏"

*/
