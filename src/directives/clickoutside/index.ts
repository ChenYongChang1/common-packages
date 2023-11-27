import { App, Directive } from "vue";

interface IOutsideFunc {
  (bindElm: HTMLElement, dom: HTMLElement): void; // elm 是绑定的 dom / dom是当前点击的
}

function checkIsInDom(target: HTMLElement, clickDom: HTMLElement | null) {
  while (clickDom) {
    if (clickDom === target) return true;
    clickDom = clickDom.parentElement;
  }
  return false;
}
const weakMap = new WeakMap();
const _clickOutside: Directive<any, IOutsideFunc> = {
  mounted(el, binding) {
    function clickOutsideFunc(e: MouseEvent) {
      const dom = e.target as HTMLElement;
      const isClickDom = checkIsInDom(el, dom);
      if (!isClickDom) {
        func(el, dom);
      }
    }
    const func = binding.value;
    weakMap.set(el, clickOutsideFunc);
    window.addEventListener("click", clickOutsideFunc, true);
    window.addEventListener("unload", () => {
      window.removeEventListener("click", clickOutsideFunc, true);
    });
  },
  unmounted(el) {
    const clickOutsideFunc = weakMap.get(el);
    window.removeEventListener("click", clickOutsideFunc, true);
  },
};

export const clickOutside = {
  install(app: App) {
    app.directive("click-outside", _clickOutside);
  },
};
