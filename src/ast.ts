interface NodeType {
  type: string;
}

export type Literal = StringLiteral | NumericLiteral;

/**
 * Main entry point.
 *
 * Program
 *  : StatementList
 *  ;
 */
export interface Program extends NodeType {
  body: StatementList;
}

/**
 * StatementList
 *  : (Statement)*
 *  ;
 */
export interface StatementList extends NodeType {
  body: Statement[];
}

//#region Statements

export type Statement = ExpressionStatement;

/**
 * ExpressionStatement
 *  : Expression ';'
 *  ;
 */
export interface ExpressionStatement extends NodeType {
  expression: Expression;
}

//#endregion

//#region Expressions
export type Expression = BinaryExpression | Literal | AssignmentExpression;

export interface BinaryExpression extends NodeType {
  left: Literal | BinaryExpression;
  right: Literal | BinaryExpression;
  operator: string;
}

export interface AssignmentExpression extends NodeType {}

//#endregion

export interface NumericLiteral extends NodeType {
  value: number;
}

export interface StringLiteral extends NodeType {
  value: string;
}

// export type Expression = Literal | BinaryExpression | Identifier;
// export type Statment = VariableDeclaration | IfStatement | WhileStatement;

// interface NodeType {
//   type: string;
// }

// export interface Program extends NodeType {
//   body: BlockStatement;
// }

// export interface BlockStatement extends NodeType {
//   body: Statment[];
// }

// export interface IfStatement extends NodeType {
//   condition: Condition;
//   ifTrue: BlockStatement;
//   ifFalse: BlockStatement | IfStatement;
// }

// export interface WhileStatement extends NodeType {
//   condition: Condition;
//   body: BlockStatement;
// }

// export interface Condition extends NodeType {
//   symbol: string;
//   left: Expression;
//   rigth: Expression;
// }

// export interface VariableDeclaration extends NodeType {
//   id: Identifier;
//   value: Expression | null;
// }

// export interface BinaryExpression extends NodeType {
//   left: Expression;
//   right: Expression;
//   operator: string;
// }

// export interface Identifier extends NodeType {
//   value: string;
// }

// export interface Literal extends NodeType {
//   value: string | number | boolean;
// }

// export const DECLARATION_KEYWORD = "Ei";
// export const LINE_END = ".";
