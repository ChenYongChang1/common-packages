import { App } from "vue";
import { domSideIn } from "./side/index";
import { clickOutside } from "./clickoutside/index";
import { domImgLazy } from "./images/index";
export { domSideIn, clickOutside, domImgLazy };

export const directives = {
  clickOutside,
  domSideIn,
  domImgLazy,
};
