export type Literal = string | number | boolean;
export type Expression = Literal | BinaryExpression | Identifier;
export type Statment = VariableDeclaration | IfStatement | WhileStatement;

export interface Program {
  body: BlockStatement;
}

export interface BlockStatement {
  body: Statment[];
}

export interface IfStatement {
  condition: Condition;
  ifTrue: BlockStatement;
  ifFalse: BlockStatement | IfStatement;
}

export interface WhileStatement {
  condition: Condition;
  body: BlockStatement;
}

export interface Condition {
  symbol: string;
  left: Expression;
  rigth: Expression;
}

export interface VariableDeclaration {
  id: Identifier;
  value: Expression;
}

export interface BinaryExpression {
  left: Expression;
  right: Expression;
  operator: string;
}

export interface Identifier {
  value: string;
}
