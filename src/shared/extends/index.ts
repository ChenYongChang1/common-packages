type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export function manyMixins<
  T extends { new (...args: any[]): {} },
  K extends { new (...args: any[]): {} }[]
>(Base: T, ...Compare: K) {
  return class {
    constructor(...args: any[]) {
      const base = new Base(...(args[0] || []));
      Object.assign(this, base);
      for (const CIndex in Compare) {
        const C = Compare[CIndex];

        const c = new C(...(args[Number(CIndex) + 1] || []));
        Object.assign(this, c);
      }
      (this as any).__proto__ = Base.prototype;
    }
  } as {
    new (...args: any[]): InstanceType<T> &
      UnionToIntersection<InstanceType<K[number]>>;
  };
}
