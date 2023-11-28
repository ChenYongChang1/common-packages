import { customRef } from "vue";

export const debounceRef = <T>(value: T, time = 100) => {
  //   let t: NodeJS.Timeout | null = null;
  //   return customRef((track, trigger) => {
  //     return {
  //       get() {
  //         console.log("????", value);
  //         track();
  //         return value;
  //       },
  //       set(v) {
  //         t && clearTimeout(t);
  //         t = setTimeout(() => {
  //           value = v;
  //           trigger();
  //           console.log("??", value);
  //         }, time);
  //       },
  //     };
  //   });
};
