import { Compiler } from "./compiler";
import { OutputFunctionType, RuntimeValue } from "./interpreter";

const sourceCode = `


//Printing
ctm("hola") jajaja

`;

Compiler.compile(sourceCode, true);
