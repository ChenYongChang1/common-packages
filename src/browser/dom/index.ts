declare global {
  interface HTMLElement {
    mutationObserver(
      call: (e: MutationRecord[], observer: MutationObserver) => void,
      options: MutationObserverInit
    ): void;
    addListener<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
}

function _domObserver(
  dom: HTMLElement,
  call: (e: MutationRecord[], observer: MutationObserver) => void,
  options?: MutationObserverInit
) {
  const observer = new MutationObserver(call);
  observer.observe(
    dom,
    options || {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      attributes: false, // 观察属性变动
    }
  );
  window.addEventListener("unload", () => {
    observer.disconnect();
  });
  return observer;
}

export const domExtend = () => {
  HTMLElement.prototype.mutationObserver = function (
    call: (e: MutationRecord[], observer: MutationObserver) => void,
    options?: MutationObserverInit
  ) {
    return _domObserver(this, call, options);
  };
  HTMLElement.prototype.addListener = function <
    K extends keyof HTMLElementEventMap
  >(
    type: K,
    listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener("unload", () => {
      window.removeEventListener(type, listener as any, options);
    });
    return this.addEventListener(type, listener as any, options);
  };
};
