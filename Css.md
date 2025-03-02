## 标准文档流&脱离文档流

文档流（Normal Flow） 是 HTML 元素按照默认规则排列 的方式，主要包括：

- 块级元素（block）：占满一整行，从上到下排列（如 div、p）。
- 行内元素（inline）：按行排列，不会换行（如 span、a）。
- 行内块元素（inline-block）：像 inline 一样排列，但可以设置 width 和 height（如 img）。

某些 CSS 规则会使元素脱离文档流，从而影响布局：

- float
- position: absolute 或 position: fixed
- display: none（不显示元素）

## 重绘重排

在浏览器的渲染过程中，重绘（Repaint） 和 重排（Reflow） 是两个关键的性能优化概念。它们会影响页面的渲染效率，从而影响用户体验和页面流畅度

**重绘**发生在元素的外观（颜色、阴影等）发生变化，但不影响布局时。

**重排**发生在元素的几何属性（宽、高、位置）发生变化时，浏览器需要重新计算布局，重新渲染页面

## BFC

BFC（Block Formatting Context，块级格式化上下文） 是 CSS 视觉渲染中的一种独立的布局环境，它决定了子元素如何排列，以及如何与其他元素相互影响。

如果一个元素创建了 BFC，它的 内部元素 会独立于外部元素进行布局，不会受到外部元素的影响，也不会影响外部元素。

### BFC 的特点：

- 内部的 Box 不会影响外部（避免外边距塌陷问题）。
- 不会与浮动元素重叠（常用于清除浮动）。
- BFC 区域不会与外部的浮动元素重叠（防止文本环绕浮动元素）。
- BFC 内部元素不会被外部 float 覆盖（用于自适应布局）。

### 以下几种情况会创建 BFC：

- display: flow-root
- float: left | right
- overflow: hidden | auto | scroll
- position: absolute | fixed
- display: flex | inline-flex
- display: grid | inline-grid
- display: table-cell | table-caption

## CSS 盒模型

在 CSS 中，所有的 HTML 元素都被看作是一个矩形的“盒子”，这个盒子由多个部分组成，包括 内容（content）、内边距（padding）、边框（border）和外边距（margin）。这就是 CSS 盒模型（Box Model）
