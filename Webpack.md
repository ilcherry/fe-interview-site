## Webpack 的原理

Webpack 的打包过程主要包含以下 5 个核心步骤：

1. 解析入口文件（Entry
2. 构建依赖关系（Dependency Graph）
3. 通过 Loader 处理不同类型的文件
4. 通过 Plugin 扩展 Webpack 功能
5. 输出打包文件（Output）

## webpack 的作用
Webpack 是一个前端模块打包工具，它的主要作用是：

- 将前端的 JS、CSS、图片等资源作为模块管理。
- 通过依赖分析，打包成一个或多个 bundle 文件。
- 优化代码，提升性能，如 Tree Shaking、代码分割、HMR 等。

## source map 是什么？

Source Map（源码映射） 是一种用于调试的技术，作用是 将压缩、混淆或编译后的代码映射回原始源码，使得开发者可以在浏览器 DevTools 中看到未压缩的源码。

当 JavaScript 代码经过 打包、压缩、Babel 转换、TypeScript 编译 等处理后，行数和变量名称可能会发生变化，这给调试带来了困难。Source Map 允许开发者直接在浏览器中查看原始代码，并准确定位错误。

## webpack 的优化

Webpack 是一个功能强大的前端构建工具，但由于其庞大的打包机制，在大型项目中可能会遇到 构建速度慢、打包体积大 等问题。为了提升 Webpack 的性能，可以从**构建速度优化**和**打包体积优化**两个方面进行优化。

- 使用 SWC-loader 替换 babel，提高编译模块的速度
- 开启 webpack 缓存，避免重复编译
- 将不常变更的库（比如 React/vue 等）进行动态链接库优化
- 开启 Tree shaking 去除无用的代码
- 使用 splitChunks 进行代码分割，浏览器允许同一个域名下最大并发次数为 6
- 开启 gzip 压缩

## HMR 的原理

```txt
当开发者修改代码时，Vite 监听到文件变更，并通过 WebSocket 触发 HMR 机制：

1. 监听文件变更

- Vite 通过 chokidar 文件监听库 监听源码文件（.js, .vue, .ts, .css 等）。
- 当文件发生变化时，Vite 识别出变更的模块。

2. 增量编译

- Vite 仅编译发生变更的模块，而不是整个项目（相比 Webpack HMR 更快）。
- 如果是 .vue 文件，Vite 只会更新 <script> 或 style 部分，不会重载整个组件。

3. 通过 WebSocket 发送更新通知

- Vite 维护一个 WebSocket 服务器，客户端（浏览器）会与之保持连接。
- 发生文件变更后，Vite 通过 WebSocket 向浏览器发送更新信息（如 { type: 'update', path: '/src/App.vue' }）。

4. 客户端接收更新并应用

- 浏览器收到更新后，会通过 fetch() 请求新的模块代码。
- 使用 ESM 动态导入 (import())，在不刷新页面的情况下替换老模块。
```

## Vite 的原理

Vite 是一个现代前端构建工具，主要利用 原生 ESM（ECMAScript Modules） 和 即时热模块替换（HMR） 来提高开发效率。

因为浏览器可以加载 ESM 模块，Vite 利用这种特性，当浏览器加载 .js 文件时，Vite 让浏览器直接加载该文件，省去打包构建的过程，提升启动速度，加载 jsx/ts/vue 文件时，Vite 内部利用 esbuild 对该文件进行编译和转换为 js/html/css 文件，加载某个文件就转换某个文件，不转换所有文件，这个操作是按需编译，减少 CPU 开销，而 Vite 的 HMR 直接基于 ESM 模块，更新速度快又不容易出问题，而 webpack 的 HMR 是自己实现的，非常复杂，性能也不是特别好！

而生产构建产物用的 Rollup, 会导致一些意外之外的问题

## Babel 的原理

Babel 是 JS 编译器，将现代 JS 代码转换兼容旧浏览器的代码

核心原理分为三步：

- **解析** 代码经过词法分析，形成 Token, 再经过语法分析，转换为 AST
- **转换** 根据配置的插件等，调整对应的节点，修改 AST
- **代码生成** 将第二步的结果重新生产 JS 代码

Babel 是用 JS 实现的，所以 JS 的局限性导致 Babel 存在性能问题，社区提供 SWC 和 esbuild 解决性能问题
