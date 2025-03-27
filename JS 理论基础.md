# 下面是与原生 JS 有关的知识点汇总

## 作用域&作用域链&闭包

**JS 作用域**是词法作用域，指变量的访问范围。主要分为块作用域、函数作用域、模块作用域和全局作用域

当 JavaScript 代码需要访问某个变量时,按照嵌套关系从内向外查找变量，直到找到该变量或者到达全局作用域。如果在所有作用域中都找不到变量，则会抛出 ReferenceError

在 JS 中函数是一等公民，当函数返回函数的时候就形成**闭包**

## 类与继承和原型链

在 JavaScript 中，每个对象都有一个原型，这个原型也是一个对象，并且它可以继续拥有自己的原型，形成**原型链**,原型链是 JavaScript 继承的核心机制。如果一个对象本身没有某个属性或方法，JavaScript 会沿着原型链向上查找，直到 null

ES6 引入 class 语法，它是基于原型的语法糖，提供更清晰的面向对象写法。class 只是 prototype 的语法糖，本质上仍然基于原型继承

## 异步解决方案发展历程

- 回调函数（Callback） 是最早的异步处理方式，典型应用是 XMLHttpRequest（XHR），即传统 Ajax 请求
- 事件监听（Event Listener） 允许通过 addEventListener 监听事件，如 click、load、error 等
- Promise 是 ES6 引入的异步解决方案，提供 .then() 和 .catch() 方法，使代码更具可读性，并避免 回调地狱（Callback Hell）
- 生成器（Generator） 允许函数暂停和恢复执行，结合 yield 和 next() 可以逐步执行异步操作，让异步代码更像同步代码
- async/await 是基于 Promise 的语法糖，提供最接近同步代码的异步处理方式，避免 then() 链式调用，使代码更清晰

## Promise

在 JavaScript 中，Promise 对象表示一个异步操作，它有 三种状态：

1. Pending → Fulfilled（调用 resolve(value)）
2. Pending → Rejected（调用 reject(error)）
3. Fulfilled / Rejected 状态一旦确定，就不可再更改！

Promise 是 JavaScript 处理异步操作的对象，它提供了多个方法来创建、控制和管理异步流程。主要包括以下 7 个方法：

## **📌 Promise 的常用方法**

`Promise` 是 JavaScript 处理异步操作的对象，它提供了多个方法来创建、控制和管理异步流程。主要包括以下 **7 个方法**：

| **方法**                       | **作用**                            | **返回时机**      |
| ------------------------------ | ----------------------------------- | ----------------- |
| `Promise.resolve(value)`       | 创建已成功的 Promise                | 立即              |
| `Promise.reject(error)`        | 创建已失败的 Promise                | 立即              |
| `Promise.all([p1, p2])`        | 等待全部成功，失败则返回错误        | 所有 Promise 结束 |
| `Promise.allSettled([p1, p2])` | 返回所有 Promise 的状态和结果       | 所有 Promise 结束 |
| `Promise.race([p1, p2])`       | 返回**最先执行完成**的 Promise 结果 | 第一个完成        |
| `Promise.any([p1, p2])`        | 返回**第一个成功**的结果            | 第一个成功        |
| `then()`                       | 处理成功结果                        | 成功后            |
| `catch()`                      | 处理失败结果                        | 失败后            |
| `finally()`                    | 无论成功或失败都会执行              | 结束后            |

## CommonJS VS ESM

| 对比项                         | **CommonJS (CJS)**                    | **ES Modules (ESM)**              |
| ------------------------------ | ------------------------------------- | --------------------------------- |
| **默认环境**                   | Node.js（服务器端）                   | 浏览器 & Node.js                  |
| **导出方式**                   | `module.exports` / `exports`          | `export` / `export default`       |
| **导入方式**                   | `require()`                           | `import`                          |
| **加载方式**                   | 同步（适用于服务器）                  | 异步（适用于浏览器）              |
| **执行时机**                   | 运行时（`require` 是动态的）          | 编译时（`import` 是静态的）       |
| **能否部分导入**               | 不能按需加载（除非使用解构）          | 可以按需导入特定的部分            |
| **是否支持 `top-level await`** | ❌ 不支持                             | ✅ 支持                           |
| **Tree Shaking**               | ❌ 不支持（Node.js 直接运行所有代码） | ✅ 支持（浏览器可优化未使用代码） |
| **适用场景**                   | 服务器端（Node.js）                   | 现代浏览器、前端项目              |

## Event Loop

### 在浏览器中，异步任务分为两类：

- **宏任务（Macrotask）**：Script 脚本、定时器、requestAnimationFrame、网络请求、事件监听、setImmediate、pushState h 和 replaceState 等等

- **微任务（Microtask）**：Promise、MutationObserver 和 queueMicrotask 等等

浏览器的 Event Loop 大致执行流程如下：

1️. 执行同步代码（Script），即主线程上的所有代码。

2️. 执行所有微任务（Microtasks），直到清空微任务队列。

3️. 执行一个宏任务（Macrotask），例如 setTimeout()、setInterval()、I/O 事件等。

4️. 重复步骤 2 和 3，直到所有任务完成。

5️. 执行 UI 渲染（浏览器在必要时执行 页面重绘，通常在 Event Loop 的某些阶段执行）。

6️. 回到第 2 步，继续执行微任务 → 宏任务 → 微任务 → ...，形成循环。

### 在 Node.js 中，异步任务分为两类：

- **宏任务（Macrotask）**：定时器、网络请求、事件监听、setImmediate、I/O 任务等等

- **微任务（Microtask）**：Promise、process.nextTick 和 queueMicrotask 等等

Node.js 的 Event Loop 大致执行流程如下：

### Timers 阶段

执行已设置的 定时器回调（setTimeout()、setInterval()）。
如果定时器已经超时，回调就会执行。

### I/O Callback 阶段

执行 I/O 操作的回调（例如，网络请求、文件系统操作等）。
I/O 回调通常是 非阻塞 操作的结果。

### Idle, Prepare 阶段

该阶段主要是用于内部操作，在 Node.js 内部进行一些任务处理。

### Poll 阶段

该阶段有两种不同的操作：
如果没有定时器需要执行，Event Loop 会阻塞等待 I/O 操作。
如果有定时器或回调任务需要执行，会继续执行它们。
Poll 阶段会持续 阻塞 I/O 操作，直到有回调可以执行或超时。
一旦没有更多的 I/O 任务，Node.js 会进入 检查阶段。

### Check 阶段

执行 setImmediate() 回调。
这是唯一一个处理 setImmediate() 回调的阶段。

### Close Callbacks 阶段

执行关闭事件的回调，比如关闭的网络连接（例如 socket.on('close')）。
