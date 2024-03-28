interface NodeType {
  type: string;
}

export interface Program extends NodeType {
  body: Statement[];
}

//#region Statements

export type Statement =
  | ExpressionStatement
  | DeclarationStatement
  | AssignmentStatement
  | FunctionDeclarationStatement
  | BlockStatement
  | ReturnStatement;

export interface ExpressionStatement extends NodeType {
  expression: Expression;
}

export interface AssignmentStatement extends NodeType {
  id: Identifier;
  expression: Expression;
}

export interface BinaryExpression extends NodeType {
  left: Literal | BinaryExpression;
  right: Literal | BinaryExpression;
  operator: string;
}

export interface DeclarationStatement extends NodeType {
  id: Identifier;
  init: Expression | null;
}

export interface FunctionDeclarationStatement extends NodeType {
  id: Identifier;
  params: Identifier[];
  body: BlockStatement;
}

export interface ReturnStatement extends NodeType {
  argument: Expression;
}

export interface BlockStatement extends NodeType {
  body: Statement[];
}

//#endregion

//#region Expression
export type Expression = BinaryExpression | Literal | Identifier;

//#endregion

export interface Identifier extends NodeType {
  name: string;
}

//#region LITERALS

export type Literal =
  | StringLiteral
  | NumericLiteral
  | TrueLiteral
  | FalseLiteral
  | NullLiteral;

export interface NumericLiteral extends NodeType {
  value: number;
}

export interface StringLiteral extends NodeType {
  value: string;
}

export interface TrueLiteral extends NodeType {
  value: true;
}
export interface FalseLiteral extends NodeType {
  value: false;
}
export interface NullLiteral extends NodeType {
  value: null;
}

//#endregion
