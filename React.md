## 什么是 Virtual DOM?

Virtual DOM 是对实际 DOM 的一种轻量级抽象。它是一个 JavaScript 对象，表示了 DOM 的结构和状态。虚拟 DOM 本质上是页面 UI 的一个内存表示，它与实际 DOM 对应，但它并不会直接操作页面中的 DOM 元素，在更新 UI 时，不直接操作浏览器中的 DOM，而是先通过虚拟 DOM 更新 UI，最后再根据虚拟 DOM 和实际 DOM 的差异进行高效的更新，最后利用操作 DOM 的方法更新 DOM

## React 组件之间如何通信？

- 父组件通过 props 向子组件传递状态
- 子组件通过回调方法更新父组件的状态
- 兄弟组件通过状态提升到最近的共同父组件或者状态管理工具通信

## 详解 React Hooks 的生命周期

![React Lifecycle](./static/react_lifecycle.png)

## React 的重渲染

1. 组件的 state 变化
2. 父组件重渲染导致子组件也重渲染
3. 组件接收到新的 props
4. context 变化导致所有消费组件重渲染

## 为什么 React 渲染列表时需要加上 key？

在 React 渲染列表时，需要为每个列表项添加 key，其主要原因是 提升性能并减少不必要的 DOM 操作

## 如何理解 Fiber 架构

## Redux 的原理&React-Redux 的原理

Redux 的原理是发布订阅模式，React-Redux 的原理是 React.Context+useContext

## vue2 与 vue3 的双向绑定原理

### vue2 的双向绑定原理

Vue2 的双向绑定主要是通过 Object.defineProperty 实现的，它利用了 JavaScript 的 getter 和 setter 来监听数据的变化，并通过更新视图来实现双向绑定。

- 数据劫持： Vue2 在创建 Vue 实例时，会遍历 data 对象中的每个属性，并使用 Object.defineProperty() 将这些属性转换为 getter 和 setter。当属性值发生变化时，setter 会被触发，进而通知视图更新。

- 视图更新： 当数据发生变化时，setter 会将视图组件中的依赖（即需要该数据的视图）收集到一个依赖管理器中。视图更新时，Vue2 会通过通知这些依赖进行重新渲染。

### vue3 的双向绑定原理

Vue3 相比 Vue2 在双向绑定的实现上进行了优化，核心的变化是使用了 Proxy 来取代 Object.defineProperty，使得 Vue3 在性能、灵活性等方面有了显著提升。

- 数据劫持： Vue3 使用 Proxy 对整个数据对象进行代理。与 Object.defineProperty 不同，Proxy 可以拦截对象的所有操作（包括属性访问、修改、删除等），并通过 getter 和 setter 实现对数据变化的监听。

- 视图更新： Vue3 的响应式系统通过 依赖收集 和 依赖触发 来更新视图。当访问数据时，Proxy 会触发 get 方法，收集依赖；当数据修改时，set 方法会被触发，从而通知依赖进行更新。

## Vue3 的生命周期

![vue3_lifecycle](./static/vue3_lifecycle.png)

## Vue3.0 有什么更新

## React 性能优化

两个优化方向，避免一次性渲染大量 DOM 节点，避免长时间占用 JS 线程

- 减少重渲染的次数
- 虚拟列表

## 前端路由的实现原理

- Hash 模式，hash 变化不会触发页面刷新，可以使用 window.onhashchange 监听 hash 变化并切换页面。
- History 模式，使用 history.pushState() 或 history.replaceState() 修改 URL，不刷新页面。监听 popstate 事件，来处理前进/后退操作
- 内存路由（Memory Router） 是一种 不依赖 URL 变化的路由方式，所有的路由信息都存储在 内存（JavaScript 变量） 中。这种方式通常用于 非浏览器环境，无法支持浏览器前进/后退按钮

## computed 与 watch 的区别

computed 是计算属性，依赖响应式数据，只有依赖的数据发生变化时才会重新计算。如果依赖数据未改变，则不会重新执行函数，直接返回上次的计算结果。

watch 是侦听器，监听一个或多个响应式数据，在其发生变化时执行回调函数。没有缓存，每次数据变化都会执行回调。适用于监听数据变化并执行异步操作（如请求 API、手动更新 DOM）。

## 路由懒加载的实现原理

ES6 支持动态 import。import() 返回一个 Promise，当路由匹配时执行 import 方法加载组件，整体效果时按需加载

在 React 中的搭配 Suspense 组件，让代码看起来更优雅

## Webpack 在检测到导入时怎样实现异步加载

webpack 将模块打包成 chunk 文件，不会立即加载模块源文件，而是返回 promise,等代码执行时才去下载该 chunk

## requestAnimationFrame 怎么使用

requestAnimationFrame 是 浏览器提供的 API，用于优化动画渲染，让动画更流畅、减少资源消耗。它适用于平滑动画，

适用场景：

- canvas 动画
- CSS 动画增强
- DOM 元素移动
- 游戏帧渲染

```js
function animate() {
  console.log("动画执行");
  requestAnimationFrame(animate); // 递归调用，实现动画循环
}

requestAnimationFrame(animate);
```

相比 setInterval 优势: 不会卡顿，能匹配屏幕刷新率。不会阻塞主线程，动画更流畅。

## vue 中实现 diff 算法的关键是什么？

Vue 采用 双端 Diff（双指针），加速相同节点的查找，比 React 的单向 Diff 更高效。采用 最长递增子序列（LIS）：减少 DOM 移动，提高效率。Fragment & Static Tree Hoisting：减少 Diff 操作，提高渲染速度。

一句话总结：Vue 通过 sameVNode 判断相同节点，结合双端 Diff 和 LIS 进行高效更新，避免不必要的 DOM 变化！
