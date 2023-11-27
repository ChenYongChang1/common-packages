declare global {
  interface HTMLElement {
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

export const domExtend = () => {
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
