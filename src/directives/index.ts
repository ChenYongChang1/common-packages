import { App } from "vue";
import { domSideIn } from "./side/index";
import { clickOutside } from "./clickoutside/index";
export { domSideIn, clickOutside };

export const directives = {
  clickOutside,
  domSideIn,
};
