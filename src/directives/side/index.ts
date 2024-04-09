import { App, Directive } from "vue";

/**
  @param distance?: number; // 上移距离
  @param start?: Keyframe; // 开始状态
  @param end?: Keyframe; //结束状态
  @param opt?: KeyframeAnimationOptions; // 参数
 */
interface IDirectiveOption {
  distance?: number; // 上移距离
  start?: Keyframe; // 开始状态
  end?: Keyframe; //结束状态
  opt?: KeyframeAnimationOptions; // 参数
}

const weak = new WeakMap<HTMLElement, Animation>();

let ob: any = null;

if (typeof window) {
  ob = new IntersectionObserver((entries) => {
    for (const elm of entries) {
      if (elm.isIntersecting) {
        const animate = weak.get(elm.target as HTMLElement);
        if (animate) {
          animate.play();
          ob!.unobserve(elm.target);
        }
      }
    }
  });
}

const isBeforeOutView = (el: HTMLElement, distance: number) => {
  const rect = el.getBoundingClientRect();
  return rect.top - distance > window.innerHeight;
};

export const _domSideIn: Directive<any, IDirectiveOption> = {
  mounted(el: HTMLElement, binding, vnode) {
    const { distance = 100, start, end, opt } = binding.value || {};
    if (!isBeforeOutView(el, distance)) {
      return;
    }
    const animate = el.animate(
      [
        start || {
          transform: `translateY(${distance}px)`,
          opacity: 0.5,
        },
        end || {
          transform: "translateY(0)",
          opacity: 1,
        },
      ],
      {
        duration: 300,
        easing: "ease-out",
        fill: "forwards",
        ...opt,
      }
    );

    animate.pause();
    ob!.observe(el);
    weak.set(el, animate);
  },
  unmounted(el: HTMLElement) {
    ob!.unobserve(el);
  },
};

export const domSideIn = {
  install(app: App) {
    app.directive("side-in", _domSideIn);
  },
};
