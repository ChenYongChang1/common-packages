import { assignIn } from "../lodash";
type FunctionConstructor<T> = new (...args: any[]) => T;

export function ClassExtends<B, C>(
  BClass: FunctionConstructor<B>,
  CClass: FunctionConstructor<C>
): FunctionConstructor<C & B>;

export function ClassExtends<B, C>(
  BClass: FunctionConstructor<B>,
  CClass: FunctionConstructor<C>
): FunctionConstructor<C & B> {
  const b = new BClass();
  let newProto = Object.create(null);
  const CClasses = [CClass];
  assignIn(newProto, BClass.prototype);
  CClasses.forEach((cls) => {
    assignIn(newProto, cls.prototype);
  });
  const base = Object.create(newProto); // newProto
  assignIn(base, b);
  CClasses.forEach((cls) => {
    const c = new cls();
    assignIn(base, c);
  });
  return function () {
    return base;
  } as any;
}
