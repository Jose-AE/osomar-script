import { Program } from "../backend/ast";
import { Interpreter, RuntimeValue } from "./interpreter";
import { Lexer } from "../backend/lexer";
import { Parser } from "../backend/parser";

export class Compiler {
  public static compile(src: string, debug: boolean): RuntimeValue {
    let tokens = Lexer.tokenize(src, debug);
    let AST: Program = Parser.parse(tokens, debug);
    return Interpreter.interpret(AST);
  }
}
