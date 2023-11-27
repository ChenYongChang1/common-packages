# common-packages - 公共包

1. vue3 自定义指令

   1. dom 出现在视口区域内 `side-in` 渐入效果
   2. `clickOutside` 点击指定 dom 意外以外的地方

2. vue3 props 的 hooks `usePropsHook`

   可以实现 父组件传过来的 props 用 hooks 包起来后 可以在子组件直接修改 会 emit 到付组件

   ```javascript
   const filterData = usePropsHook(props, emit, "modelValue");
   filterData.value.k = 1;
   ```

3. date 相关

4. shared

   1. lodash `cloneDeep, debounce, throttle`
   2. 随机数 `getRandomStr 多少位随机数` `getRandomColor 获取随机颜色`

5. tdk

6. addListener `addEventListener 当页面卸载会自动 移除监听`
