import {
  NodeType,
  Program,
  INode,
  Literal,
  Expression,
  BinaryExpression,
  Identifier,
  DeclarationStatement,
  FunctionDeclarationStatement,
  AssignmentStatement,
  Statement,
  BlockStatement,
  CallFunctionStatement,
  ReturnStatement,
  IfStatement,
  WhileStatement,
} from "../backend/ast";
import { Enviorment } from "./enviorment";

interface Function {
  name: string;
  params: string[];
  declarationEnv: Enviorment;
  body: BlockStatement;
}

export type RuntimeValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Function;

export class Interpreter {
  static interpret(program: Program): RuntimeValue {
    const globalEnv = new Enviorment();
    let lastEvalValue;

    for (const statement of program.body) {
      lastEvalValue = this.evaluate(statement, globalEnv);
    }
    return lastEvalValue;
  }

  static evaluate(node: INode, env: Enviorment): RuntimeValue {
    switch (node.type) {
      //#region LITERAL_NODES
      case NodeType.NUMERIC_LITERAL:
        return Number((node as Literal).value);
      case NodeType.STRING_LITERAL:
        return String((node as Literal).value);
      case NodeType.FALSE_LITERAL:
        return false;
      case NodeType.TRUE_LITERAL:
        return true;
      case NodeType.NULL_LITERAL:
        return null;
      //#endregion

      case NodeType.IDENTIFIER:
        const idNode = node as Identifier;
        return env.getVarValue(idNode.name);

      case NodeType.BINARY_EXPRESSION:
        const binaryNode = node as BinaryExpression;

        const left = this.evaluate(binaryNode.left, env);
        const right = this.evaluate(binaryNode.right, env);

        if (typeof left === "number" && typeof right === "number") {
          switch (binaryNode.operator) {
            case "+":
              return left + right;
            case "-":
              return left - right;
            case "*":
              return left * right;
            case "/":
              return left / right;
            case "==":
              return left === right;
            case "!=":
              return left !== right;
            case ">":
              return left > right;
            case "<":
              return left < right;
            case ">=":
              return left >= right;
            case "<=":
              return left <= right;

            default:
              throw new SyntaxError(
                `Invalid operator ${binaryNode.operator} for type "number"`
              );
          }
        } else if (typeof left === "boolean" && typeof right === "boolean") {
          switch (binaryNode.operator) {
            case "&&":
              return left && right;
            case "||":
              return left || right;
            case "==":
              return left === right;
            case "!=":
              return left !== right;
            default:
              throw new SyntaxError(
                `Invalid operator "${binaryNode.operator}" for type "boolean"`
              );
          }
        } else if (typeof left === "string" && typeof right === "string") {
          switch (binaryNode.operator) {
            case "+":
              return left + right;
            default:
              throw new SyntaxError(
                `Invalid operator "${binaryNode.operator}" for type "string"`
              );
          }
        } else {
          throw new SyntaxError(
            `Invalid operator "${
              binaryNode.operator
            }" for "${typeof left}" and "${typeof right}"`
          );
        }

      case NodeType.DECLARATION_STATEMENT:
        const decNode = node as DeclarationStatement;
        const varName = decNode.id.name;

        env.declareVar(varName, null);

        if (decNode.init) {
          const val = this.evaluate(decNode.init, env);
          env.asssignVar(varName, val);
          return val;
        } else {
          return null;
        }

      case NodeType.ASSIGNMENT_STATEMENT:
        const assigNode = node as AssignmentStatement;

        return env.asssignVar(
          assigNode.id.name,
          this.evaluate(assigNode.expression, env)
        );

      case NodeType.FUNCTION_DECLARATION_STATEMENT:
        const funcDecNode = node as FunctionDeclarationStatement;
        const fn: Function = {
          name: funcDecNode.id.name,
          params: funcDecNode.params.map((v) => v.name),
          declarationEnv: env,
          body: funcDecNode.body,
        };

        env.declareVar(funcDecNode.id.name, fn);

        return null;

      case NodeType.CALL_FUNCTION_STATEMENT:
        const callFunNode = node as CallFunctionStatement;
        if (callFunNode.functionId.name === "ctm") {
          console.log(
            ...callFunNode.arguments.map((v) => this.evaluate(v, env))
          );
          return null;
        } else {
          const fn = env.getVarValue(callFunNode.functionId.name) as Function;
          if (typeof fn !== "object")
            throw ReferenceError("Can't call a variable, only functions");

          const fnEnv = new Enviorment(fn.declarationEnv);

          if (fn.params.length > callFunNode.arguments.length)
            throw new SyntaxError(
              `Error calling "${fn.name}": Expected ${fn.params.length} parameters, but received ${callFunNode.arguments.length}`
            );
          else if (fn.params.length < callFunNode.arguments.length)
            throw new SyntaxError(
              `Error calling "${fn.name}": Received ${callFunNode.arguments.length} parameters, expected ${fn.params.length}`
            );

          //console.log(fn.params); //expected params varName
          //console.log(callFunNode.arguments); //given args as values

          for (let i = 0; i < fn.params.length; i++) {
            fnEnv.declareVar(
              fn.params[i],
              this.evaluate(callFunNode.arguments[i], fnEnv)
            );
          }

          return this.evaluate(fn.body, fnEnv);
        }

      case NodeType.BLOCK_STATEMENT:
        for (const statement of (node as BlockStatement).body) {
          if (statement.type === NodeType.RETURN_STATEMENT)
            return this.evaluate(statement, env);

          if (statement.type === NodeType.BREAK_STATEMENT) {
            return this.evaluate(statement, env);
          }

          this.evaluate(statement, env);
        }
        return null;

      case NodeType.RETURN_STATEMENT:
        return this.evaluate((node as ReturnStatement).argument, env);

      case NodeType.IF_STATEMENT:
        const ifNode = node as IfStatement;
        if (this.evaluate(ifNode.test, env)) {
          this.evaluate(ifNode.ifTrue, env);
        } else if (ifNode.ifFalse) {
          this.evaluate(ifNode.ifFalse, env);
        }
        return null;

      case NodeType.WHILE_STATEMENT:
        const whileNode = node as WhileStatement;

        while (this.evaluate(whileNode.test, env)) {
          if (this.evaluate(whileNode.body, env) === -1) break;
        }

        return null;

      case NodeType.BREAK_STATEMENT:
        return -1;

      default:
        console.log(`Statment not def ${node.type}`);
        return null;
    }
  }
}
