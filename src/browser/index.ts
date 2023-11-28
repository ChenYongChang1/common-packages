import { tdk } from "./tdk/index";
import { domExtend } from "./dom/index";
export { tdk };

/**
 * 这是给HTMLElement 添加拓展方法
 * 1. addListener
 * 2. mutationObserver 监听dom的改变
 */
domExtend();

export const browser = {
  tdk,
};
