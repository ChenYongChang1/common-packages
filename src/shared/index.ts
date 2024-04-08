import { cloneDeep, debounce, throttle, assignIn } from "./lodash/index";
import { ClassExtends } from "./extends/index";
import { getRandomStr, getRandomColor } from "./random/index";

export {
  cloneDeep as deepClone,
  assignIn,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
  ClassExtends,
};
export const shared = {
  assignIn,
  deepClone: cloneDeep,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
  ClassExtends,
};
