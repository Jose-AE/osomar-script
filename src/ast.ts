export enum NodeType {
  PROGRAM = "PROGRAM",
  DECLARATION_STATEMENT = "DECLARATION_STATEMENT",
  IDENTIFIER = "IDENTIFIER",

  //Literals
  STRING_LITERAL = "STRING_LITERAL",
  NUMERIC_LITERAL = "NUMERIC_LITERAL",
  TRUE_LITERAL = "TRUE_LITERAL",
  FALSE_LITERAL = "FALSE_LITERAL",
  NULL_LITERAL = "NULL_LITERAL",

  CALL_FUNCTION_STATEMENT = "CALL_FUNCTION_STATEMENT",
  IF_STATEMENT = "IF_STATEMENT",
  BINARY_EXPRESSION = "BINARY_EXPRESSION",
  BLOCK_STATEMENT = "BLOCK_STATEMENT",
  FUNCTION_DECLARATION_STATEMENT = "FUNCTION_DECLARATION_STATEMENT",
  RETURN_STATEMENT = "RETURN_STATEMENT",
  ASSIGNMENT_STATEMENT = "ASSIGNMENT_STATEMENT",
  WHILE_STATEMENT = "WHILE_STATEMENT",
}

export interface INode {
  type: NodeType;
}

export interface Program extends INode {
  body: Statement[];
}

//#region Statements

export type Statement =
  | Expression
  | DeclarationStatement
  | AssignmentStatement
  | FunctionDeclarationStatement
  | BlockStatement
  | ReturnStatement
  | IfStatement
  | WhileStatement
  | CallFunctionStatement;

export interface ExpressionStatement extends INode {
  expression: Expression;
}

export interface AssignmentStatement extends INode {
  id: Identifier;
  expression: Expression;
}

export interface BinaryExpression extends INode {
  left: Literal | BinaryExpression;
  right: Literal | BinaryExpression;
  operator: string;
}

export interface CallFunctionStatement extends INode {
  functionId: Identifier;
  arguments: (Expression | CallFunctionStatement)[];
}

export interface DeclarationStatement extends INode {
  id: Identifier;
  init: Expression | null;
}

export interface FunctionDeclarationStatement extends INode {
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

export interface ReturnStatement extends INode {
  argument: Expression;
}

export interface BlockStatement extends INode {
  body: Statement[];
}

export interface IfStatement extends INode {
  test: Expression;
  ifTrue: BlockStatement;
  ifFalse: BlockStatement | null | IfStatement;
}

export interface WhileStatement extends INode {
  test: Expression;
  body: BlockStatement;
}

//#endregion

//#region Expression
export type Expression = BinaryExpression | Literal | Identifier;

//#endregion

export interface Identifier extends INode {
  name: string;
}

//#region LITERALS

export interface Literal extends INode {
  value: string | number | boolean | null;
}

//#endregion
