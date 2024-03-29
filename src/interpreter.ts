import {
  NodeType,
  Program,
  INode,
  Literal,
  Expression,
  BinaryExpression,
} from "./ast";

export class Interpreter {
  static interpret(program: Program): void {
    for (const statement of program.body) {
      console.log(this.evaluate(statement));
    }
  }

  static evaluate(node: INode): number | string | boolean | null {
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

      case NodeType.BINARY_EXPRESSION:
        const binaryNode = node as BinaryExpression;

        const left = this.evaluate(binaryNode.left);
        const right = this.evaluate(binaryNode.right);

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

      default:
        return null;
    }
  }
}
