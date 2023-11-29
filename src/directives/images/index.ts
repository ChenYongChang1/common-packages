import { App, Directive } from "vue";

/**
 *  @param 类型 string 为需要加载的url
 * @param success 需要加载的url  error 失败的url timeout 超时时间
 */
type IImageOption =
  | string
  | { success: string; error?: string; timeout?: number };

const imgDomMap = new WeakMap<HTMLImageElement, IntersectionObserver>();
const isLoadedMap = new WeakMap<HTMLImageElement, boolean>();

const loadStringImg = (dom: HTMLImageElement, url: string) => {
  return new Promise((resolve) => {
    const img = dom.cloneNode() as HTMLImageElement;
    img.src = url;
    img.onload = () => {
      dom.parentNode?.replaceChild(img, dom);
      resolve(img);
    };
    img.onerror = () => {
      resolve(img);
    };
  });
};
const loadDataImg = (
  dom: HTMLImageElement,
  data: { success: string; error?: string; timeout?: number }
) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = dom.cloneNode() as HTMLImageElement;
    const setErrorImgSrc = () => {
      flag = false;
      data.error && (dom.src = data.error);
      resolve(img);
    };

    img.onerror = () => {
      setErrorImgSrc();
    };
    img.src = data.success;
    let flag = true;
    if (data.timeout) {
      setTimeout(() => {
        setErrorImgSrc();
      }, data.timeout);
    }

    img.onload = () => {
      if (flag) {
        dom.parentNode?.replaceChild(img, dom);
      }
      resolve(img);
    };
  });
};

const loadImgBox = async (el: HTMLImageElement, data: IImageOption) => {
  if (isLoadedMap.get(el)) return;
  isLoadedMap.set(el, true);
  disconnect(el);
  if (typeof data === "string") {
    await loadStringImg(el, data);
  } else {
    await loadDataImg(el, data);
  }
};

const disconnect = (el: HTMLImageElement) => {
  const observer = imgDomMap.get(el);
  observer?.disconnect();
  isLoadedMap.delete(el);
};

export const _domImgLazy: Directive<any, IImageOption> = {
  mounted(el: HTMLImageElement, binding, vnode) {
    if (el.tagName !== "IMG") {
      console.error("img-lazy directive only used by img");
      return;
    }
    const data = binding.value;
    const observer = new IntersectionObserver((entries) => {
      for (const entrie of entries) {
        if (entrie.isIntersecting) {
          loadImgBox(el, data);
        }
      }
    });
    imgDomMap.set(el, observer);
    observer.observe(el);
  },
  unmounted(el: HTMLImageElement) {
    disconnect(el);
  },
};

export const domImgLazy = {
  install(app: App) {
    app.directive("img-lazy", _domImgLazy);
  },
};
