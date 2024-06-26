# common-packages - 公共包

1.  vue3 自定义指令

    1. dom 出现在视口区域内 `side-in` 渐入效果
    2. `click-outside` 点击指定 dom 以外的地方 执行回调
    3. `img-lazy` 图片懒加载 滑动到视口区域内才会加载 `string｜ { success: string; error?: string; timeout?: number };`

2.  vue3 props 的 hooks `usePropsHook`

    可以实现 父组件传过来的 props 用 hooks 包起来后 可以在子组件直接修改 会 emit 到付组件

    ```javascript
    const filterData = usePropsHook(props, emit, "modelValue");
    filterData.value.k = 1;
    // 这个filterData 可以直接在子组件template里面直接使用
    ```

3.  `useComponentRef`
    给组件设置 ref 这个 k 可以找到类型

    ```javascript
    import QuestionList from "@/components/pages/question/QuestionList.vue";
    const k = useComponentRef(QuestionList);
    ```

4.  date 相关

5.  shared

    1.  lodash `cloneDeep, debounce, throttle`
    2.  随机数 `getRandomStr 多少位随机数` `getRandomColor 获取随机颜色`
    3.  extends `ClassExtends` 提供多继承

        ```js
        const d = new ClassExtends(B, C);
        ```

6.  tdk

7.  浏览器相关

    1. addListener `addEventListener 当页面卸载会自动 移除监听`
    2. mutationObserver `mutationObserver 直接dom.mutationObserver 会监听dom变化`

       1. 第一个参数是回调

       2. 第二个参数是配置项 `{ attributes: true, childList: true, subtree: true } ` 默认 `{  subtree: false,childList: true,  attributes: false,  }`

          - attributes：一个布尔值，表示是否观察目标节点或其子节点中属性的变化。如果为 true，则当目标节点或其子节点中的属性发生变化时，MutationObserver 对象将会被通知。

          - childList：一个布尔值，表示是否观察目标节点的子节点的变化。如果为 true，则当目标节点的子节点列表发生变化时（如添加、删除或移动子节点），MutationObserver 对象将会被通知。

          - subtree：一个布尔值，表示是否观察目标节点的所有后代节点（即包括它的子节点、孙子节点、曾孙节点等）。如果为 true，则当目标节点及其后代节点的任何变化发生时，MutationObserver 对象将会被通知。
