import { cloneDeep, debounce, throttle } from "./lodash/index";
import { getRandomStr, getRandomColor } from "./random/index";

export {
  cloneDeep as deepClone,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
};
export const shared = {
  deepClone: cloneDeep,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
};
