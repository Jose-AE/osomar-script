import { Program } from "../backend/ast";
import { Interpreter } from "./interpreter";
import { Lexer } from "../backend/lexer";
import { Parser } from "../backend/parser";

export class Compiler {
  public static compile(src: string) {
    let tokens = Lexer.tokenize(src);
    let AST: Program = Parser.parse(tokens);
    Interpreter.interpret(AST);
  }
}
