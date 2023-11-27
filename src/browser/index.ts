import { tdk } from "./tdk/index";
import { domExtend } from "./dom/index";
export { tdk };

domExtend();

export const browser = {
  tdk,
};
