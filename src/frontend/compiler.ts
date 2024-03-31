import { Program } from "../backend/ast";
import { Interpreter, OutputFunctionType, RuntimeValue } from "./interpreter";
import { Lexer } from "../backend/lexer";
import { Parser } from "../backend/parser";

export class Compiler {
  public static compile(
    src: string,
    debug: boolean = false,
    outputFunction: OutputFunctionType = console.log
  ): RuntimeValue {
    let tokens = Lexer.tokenize(src, debug, outputFunction);
    let AST: Program = Parser.parse(tokens, debug, outputFunction);
    return Interpreter.interpret(AST, outputFunction);
  }
}
