import { Lexer } from "./lexer";
import * as util from "util";
import { Parser } from "./parser";

const sourceCode = `0.0`;

function run() {
  let tokens = Lexer.tokenize(sourceCode, true);

  let AST = Parser.parse(tokens, true);
}

run();
