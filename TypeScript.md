## 说说你对 TypeScript 的理解，与 JavaScript 的区别？

TypeScript（简称 **TS**）是 **JavaScript 的超集**，它在 JavaScript 的基础上增加了 **静态类型检查**、**接口**、**泛型**等功能，使代码更**安全**、**可维护**，并且支持最新的 JavaScript 语法（ESNext）。

**简单来说**：

- **JavaScript** 是 **动态类型** 语言，运行时才检查类型错误。
- **TypeScript** 是 **静态类型** 语言，在编译阶段就能发现错误，避免运行时报错。

### **TypeScript 和 JavaScript 的核心区别**

| **对比项**          | **JavaScript（JS）**       | **TypeScript（TS）**       |
| ------------------- | -------------------------- | -------------------------- |
| **类型系统**        | **动态类型**（运行时检查） | **静态类型**（编译时检查） |
| **错误检测**        | 运行时才会发现错误         | 编译阶段就能发现错误       |
| **可读性 & 维护性** | 代码无类型提示，易出错     | 代码有类型约束，维护更方便 |
| **面向对象支持**    | 基于原型（Prototype）      | 支持接口、泛型、抽象类等   |
| **ES6+ 支持**       | 需 Babel 转译              | 原生支持 ES6+ 语法         |
| **运行方式**        | 直接在浏览器/Node.js 运行  | 需要先编译成 JavaScript    |

### **总结**

- **TypeScript 让 JavaScript 更安全、可维护，减少运行时错误**。
- **缺点**：需要**编译**，学习成本稍高，但**大型项目**里非常值得用。
- **适用场景**：适用于 **前端（React/Vue/Angular）** 和 **后端（Node.js）** 开发，特别是**大型团队合作**。

---

**大白话**：TypeScript = **加了类型系统的 JavaScript，更安全、更强大、更适合大型项目**！

## TypeScript 的数据类型有哪些？

有 `number`、`string`、`boolean`、`bigint`、`symbol`、`null`、`undefined`、`Array`、`Tuple`、`Object`、`Enum`、`any`、`unknown`、`void`、`never`、联合类型、交叉类型、类型别名、类型断言、`interface`、`type`


## 说说对 TypeScript 中命名空间与模块的理解？区别？

### 命名空间

命名空间是一种内部模块，通过 namespace 关键字定义，主要用于在全局作用域下组织代码，避免变量污染。适用于 无需模块化的全局代码组织（如 UMD 库）。

```typescript
namespace Utils {
  export function greet(name: string) {
    return `Hello, ${name}!`;
  }
}

// 使用命名空间
console.log(Utils.greet("Alice"));
```

- export 关键字必须添加，否则命名空间内的内容对外不可见。
- 命名空间的使用不需要 import，直接通过 Utils.greet() 访问。

适用场景:

- 适用于 浏览器环境（传统 JS 没有模块加载器时）。
- 大型项目的全局工具库（如 Utils、MathHelper）。

### 模块

TypeScript 的模块是 基于 ES6 模块语法（import/export） 进行组织的，用于 现代前端项目（React、Vue、Node.js 等），需要模块化管理代码，每个 .ts/.tsx 文件默认就是一个模块（如果使用 import/export）。

```typescript
// utils.ts
export function greet(name: string) {
  return `Hello, ${name}!`;
}

// main.ts
import { greet } from "./utils";

console.log(greet("Bob"));
```

- export 让 greet 在 utils.ts 之外可见，import 用于引入模块。
- 模块的加载是基于 CommonJS（Node.js）或 ES6 模块系统（ESM），需要 import 导入。

适用场景：

- 适用于 所有现代 JS/TS 项目，特别是基于 Node.js、Webpack、Vite、Bun 的项目。
- 推荐使用模块，而不是命名空间，因为 ES6 模块是现代 JavaScript 标准。

总结：现在推荐使用模块而不是命名空间！！！

## TypeScript 中的泛型是什么？

泛型（Generics） 是 TypeScript 提供的一种 让代码更通用、更灵活的方式，它允许你在编写代码时不预先指定具体的类型，而是在使用时再指定具体的类型。

为什么需要泛型？

- 复用性：编写可复用的函数、类、接口，而不局限于某种特定类型。
- 类型安全：比 any 更安全，能够在编译时检查类型，而不会丢失类型信息。
- 灵活性：让代码适用于不同的数据类型，提高可扩展性。

## 什么是 TypeScript 的方法重载？

方法重载（Function Overloading） 是指同一个函数可以根据不同的参数类型和数量，执行不同的逻辑。

在 TypeScript 中，虽然 JavaScript 不支持真正的函数重载，但 TypeScript 通过函数声明（签名）+ 实现的方式模拟了方法重载。

在 TypeScript 中，方法重载的语法包括：

1. 多个函数签名（Overload Signatures）：定义不同参数组合的函数声明。
2. 一个具体的函数实现（Implementation）：包含具体的逻辑，并兼容所有签名。

示例：同一个 greet 函数可以接收不同的参数类型

```typescript
// 1️⃣ 定义多个重载签名
function greet(name: string): string;
function greet(name: string, age: number): string;

// 2️⃣ 实现函数（必须兼容所有重载）
function greet(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${name}. You are ${age} years old.`;
  }
  return `Hello, ${name}.`;
}

// 3️⃣ 调用
console.log(greet("Alice")); // ✅ "Hello, Alice."
console.log(greet("Bob", 30)); // ✅ "Hello, Bob. You are 30 years old."
// console.log(greet(42));       // ❌ 错误：参数类型不匹配
```

### TypeScript 支持的访问修饰符有哪些？

在 TypeScript 中，访问修饰符用于控制类的属性和方法的可见性，防止不必要的外部访问，提升代码的封装性和安全性。

TypeScript 支持的三种访问修饰符：
| 修饰符 | 作用 |
|--------|--------------------------------|
| `public`（默认） | 任何地方都可以访问 |
| `private` | 只能在类的**内部**访问 |
| `protected` | 只能在类的**内部**或**子类**访问 |

## tsconfig.json 文件有什么作用

tsconfig.json 是 TypeScript 项目的配置文件，用于指定编译选项、文件路径等，控制 TypeScript 代码的编译方式。


1. 集中管理 TypeScript 编译配置
2. 提供严格的类型检查
3. 支持 ES 模块、目标版本、路径别名等
4. 提高项目可维护性
5. 支持增量编译、跳过不必要的编译

## TypeScript 中的 Delcare的关键字有什么作用？

在 TypeScript 中，`declare` 关键字用于**声明全局变量、模块、函数、类等**，但不会在编译后生成 JavaScript 代码。它的主要作用是**告诉 TypeScript 这些变量或模块是外部提供的，自己不会实现**。

---

### **1. `declare` 的主要用途**
| **用途** | **作用** |
|---------|---------|
| **声明全局变量** | 告诉 TypeScript 某个全局变量已存在，但不提供具体实现 |
| **声明全局函数** | 告诉 TypeScript 某个全局函数已存在，但不提供实现 |
| **声明模块** | 适用于引入 **非 TypeScript** 的第三方库（如 `.js`） |
| **声明类型（类型定义文件）** | 在 `*.d.ts` 文件中使用 `declare` 进行类型定义 |

---

### **2. `declare` 声明全局变量**
如果你在 JavaScript 代码中引入了一个**没有 TypeScript 类型定义**的全局变量（比如来自 CDN），TypeScript 默认会报错：

```js
console.log(window.globalVar); // globalVar 是一个在 JS 里定义的全局变量
```

TypeScript 会提示：
```
Cannot find name 'globalVar'.
```

### **✅ 使用 `declare` 解决**
在 `.d.ts` 文件或 `ts` 文件中：
```typescript
declare var globalVar: string;
console.log(globalVar); // ✅ 不会报错
```
`declare` 只是**声明**，不生成 JavaScript 代码。

---

### **3. `declare` 声明全局函数**
假设你使用一个**全局函数**，但 TypeScript 不认识它：
```typescript
externalFunction(); // ❌ 报错：Cannot find name 'externalFunction'
```

### **✅ 使用 `declare` 解决**
```typescript
declare function externalFunction(): void;
externalFunction(); // ✅ 不报错
```

---

### **4. `declare` 声明全局对象**
如果有一个全局对象，包含多个属性：
```typescript
declare const API: {
  baseUrl: string;
  version: number;
};

console.log(API.baseUrl);
```
这样 TypeScript 知道 `API` 存在，并能提供类型提示。

---

### **5. `declare` 声明模块**
如果我们使用 `import` 导入一个**没有 TypeScript 类型的 JavaScript 模块**：
```typescript
import { someFunction } from "myLibrary";
```
如果 `myLibrary` 没有 `.d.ts` 类型定义文件，TypeScript 会报错：
```
Cannot find module 'myLibrary'.
```

### **✅ 使用 `declare module` 解决**
在 `myLibrary.d.ts` 中：
```typescript
declare module "myLibrary" {
  export function someFunction(): void;
}
```
这样就可以正常使用 `import` 了。

---

### **6. `declare` 在 `*.d.ts` 类型定义文件中**
通常，`declare` 关键字用于 `.d.ts`（声明文件），帮助 TypeScript 识别外部库的类型。

例如：
```typescript
// typings.d.ts
declare module "moment" {
  export function format(date: string): string;
}
```
这样，在 TypeScript 代码中：
```typescript
import { format } from "moment";
format("2025-03-13");
```
不会报错。

---

### **7. `declare` VS `export`**
如果你想要**真正定义**一个变量、函数或类，需要使用 `export` 而不是 `declare`：

| 关键字 | 作用 |
|--------|-----|
| `declare` | 只是**声明**，不会编译成 JS 代码 |
| `export` | 真实导出，编译后仍然存在 |

```typescript
declare var a: number; // 只告诉 TS "a 存在"
export const b = 10; // 真实存在于编译后的 JS 代码中
```

---

### **8. 总结**
✅ `declare` 关键字用于：
1. **声明全局变量**（`declare var` / `declare let` / `declare const`）
2. **声明全局函数**（`declare function`）
3. **声明模块**（`declare module`）
4. **用于 `.d.ts` 类型定义文件**
5. **不会在编译后生成 JavaScript 代码**
