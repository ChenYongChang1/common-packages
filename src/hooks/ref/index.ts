import { customRef } from "vue";

export const debounceRef = <T>(initialValue: T, time = 100) => {
  let t: NodeJS.Timeout | null = null;
  let value: T = initialValue;
  return customRef((track, trigger) => {
    return {
      get: () => {
        track();
        return value;
      },
      set: (v: T) => {
        t && clearTimeout(t);
        t = setTimeout(() => {
          value = v;
          trigger();
        }, time);
      },
    };
  });
};
