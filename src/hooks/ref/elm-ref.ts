import { ref } from "vue";
export const useComponentRef = <T extends abstract new (...args: any) => any>(
  _opt: T
) => {
  return ref<InstanceType<T>>();
};
