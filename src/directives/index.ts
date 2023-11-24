import { App } from "vue";
import { domSideIn } from "./side/index";

export const directives = {
  domSideIn: {
    install(app: App) {
      app.directive("side-in", domSideIn);
    },
  },
};
