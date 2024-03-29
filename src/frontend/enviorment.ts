import { RuntimeValue } from "./interpreter";

export class Enviorment {
  private parent?: Enviorment;
  private variables: Map<string, RuntimeValue>;

  constructor(parentEnv?: Enviorment) {
    this.parent = parentEnv;
    this.variables = new Map();
  }

  public declareVar(varName: string, value: RuntimeValue): RuntimeValue {
    if (this.variables.has(varName))
      throw new ReferenceError(
        `Can't define variable ${varName}. It's already defined`
      );
    this.variables.set(varName, value);
    return value;
  }

  public asssignVar(varName: string, value: RuntimeValue): RuntimeValue {
    const env = this.resolveVarScope(varName);
    env.variables.set(varName, value);

    return value;
  }

  public getVarValue(varName: string): RuntimeValue {
    const env = this.resolveVarScope(varName);
    return env.variables.get(varName);
  }

  //returns the env where a variable is definded
  public resolveVarScope(varName: string): Enviorment {
    if (this.variables.has(varName)) return this;

    if (!this.parent)
      throw new ReferenceError(
        `Can't resolve variable name "${varName}" as it doesn't exist`
      );

    return this.parent.resolveVarScope(varName);
  }

  public printVars() {
    console.log(this.variables);
  }
}
