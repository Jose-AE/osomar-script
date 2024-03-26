import { Lexer } from "./lexer";
import * as util from "util";
import { Parser } from "./parser";

const sourceCode = `1+(3+4)+(5+6)`; //1+2+(3+4)+(5+6)

//1+(3+4)[err]+(5+6)

function run() {
  let tokens = Lexer.tokenize(sourceCode, true);

  let AST = Parser.parse(tokens, true);
}

run();
