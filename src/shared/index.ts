import { cloneDeep, debounce, throttle } from "./lodash/index";
export { cloneDeep as deepClone, debounce, throttle };
export const shared = {
  deepClone: cloneDeep,
  debounce,
  throttle,
};
