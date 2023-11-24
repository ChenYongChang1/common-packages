import { shared } from "../../shared/index";
import { ComputedRef, WritableComputedRef, computed, toRaw } from "vue";

export interface FunctionInterface {
  (...args: any[]): any;
}

function ProxyDeep<T extends object>(target: T, handler: ProxyHandler<T>) {
  if (Array.isArray(target)) {
    target.forEach((item, index) => {
      if (typeof item === "object") {
        ProxyDeep(target[index], handler);
      }
    });
  }
  return new Proxy(target, handler);
}

function _usePropsHooks<T extends IAnyObj>(
  props: T,
  _emit: FunctionInterface
): ComputedRef<T> {
  const _hook = (obj: IAnyObj, objKey: string[]): IAnyObj => {
    return ProxyDeep(obj, {
      get(target: IAnyObj, p: string, receiver: any) {
        const info = Reflect.get(target, p, receiver);
        const result =
          typeof info === "object" ? _hook(info, [...objKey, p]) : info;
        return result;
      },
      set(o, k, v, receiver) {
        if (objKey.length) {
          const firstKey = objKey.shift();
          if (firstKey) {
            let oldObj = shared.deepClone(toRaw(props[firstKey]) as any);
            while (objKey.length) {
              let temp = objKey.shift();
              if (temp) {
                oldObj = oldObj[temp];
              }
            }
            oldObj && Reflect.set(oldObj, k, v, receiver);

            _emit(`update:${firstKey as string}`, oldObj);
          }
        } else {
          _emit(`update:${k as string}`, v);
        }
        return true;
      },
    });
  };
  return computed<any>(() => {
    return _hook(props as object, []);
  });
}

function _usePropsHook<T extends IAnyObj, K extends string & keyof T>(
  props: T,
  _emit: FunctionInterface,
  key: K
): WritableComputedRef<T[K]> {
  const obj = props[key];
  const updateName = "update:" + key;
  let changeObj = new WeakMap();
  // const hanldeDeepObjectArr = (arr: IAnyObj[]) => {
  // 	arr.forEach((item, index) => {
  // 		if (typeof item === 'object') {
  // 			return _hooks(arr, index)
  // 		}
  // 	})
  // }
  const _hooks = <T extends IAnyObj, K extends number | (string & keyof T)>(
    props: T,
    key: K
  ): object => {
    const oldVal = toRaw(props[key]);
    const newProxyData = new Proxy(props[key], {
      get(target, k, receiver) {
        // const obj = toRaw(oldVal)
        // const copyNeedObj = changeObj.get(props[key])

        // const newObj = toRaw(copyNeedObj || oldVal) as any
        // const result = Reflect.get(newObj, k, newObj)

        return props[key][k];
      },
      set(target, k, v, receiver) {
        const copyNeedObj = changeObj.get(props[key]);
        const newObj = toRaw(shared.deepClone(copyNeedObj || oldVal)) as any;
        Reflect.set(newObj, k, v, newObj);
        _emit(updateName, newObj);

        typeof oldVal === "object" && changeObj.set(props[key], newObj);

        return true;
      },
      deleteProperty(target, k) {
        const copyNeedObj = changeObj.get(props[key]);
        const newObj = toRaw(shared.deepClone(copyNeedObj || oldVal)) as any;

        Reflect.deleteProperty(newObj, k);

        _emit(updateName, newObj);

        typeof oldVal === "object" && changeObj.set(props[key], newObj);
        return true;
      },
    });

    return newProxyData;
  };

  if (typeof obj === "object") {
    return computed<any>({
      get: () => {
        return _hooks(props, key);
      },
      set(val) {
        _emit(updateName, val);
        return val;
      },
    });
  } else {
    return computed({
      get() {
        return props[key] as T[K];
      },
      set(val) {
        _emit(updateName, val);
        return val;
      },
    }) as any;
  }
}

interface IAnyObj {
  [k: string]: any;
}

export function usePropsHook<T extends IAnyObj, K extends string & keyof T>(
  props: T,
  _emit: FunctionInterface
): ComputedRef<T>;
// }
export function usePropsHook<T extends IAnyObj, K extends string & keyof T>(
  props: T,
  _emit: FunctionInterface,
  key: K
): WritableComputedRef<T[K]>;

export function usePropsHook<T extends IAnyObj, K extends string & keyof T>(
  props: T,
  _emit: FunctionInterface,
  key?: K
) {
  if (key) {
    return _usePropsHook(props, _emit, key) as WritableComputedRef<T[K]>;
  }
  return _usePropsHooks(props, _emit) as ComputedRef<T>;
}
