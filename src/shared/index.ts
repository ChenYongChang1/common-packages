import { cloneDeep, debounce, throttle } from "./lodash/index";
import { manyMixins } from "./extends/index";
import { getRandomStr, getRandomColor } from "./random/index";

export {
  cloneDeep as deepClone,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
  manyMixins,
};
export const shared = {
  deepClone: cloneDeep,
  debounce,
  throttle,
  getRandomStr,
  getRandomColor,
  manyMixins,
};
