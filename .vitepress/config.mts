import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/fe-interview-site/",
  title: "前端面试总结",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: "Home", link: "/" },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "章节目录",
    },

    sidebar: [
      {
        text: "JS 理论基础",
        link: "/JS 理论基础",
      },
      {
        text: "TypeScript",
        link: "/TypeScript",
      },
      {
        text: "前端工程化",
        items: [
          { text: "React&Vue", link: "/React" },
          { text: "Webpack&Vite", link: "/Webpack" },
          { text: "CSS", link: "/Css" },
        ],
      },
      {
        text: "手写题",
        link: "/手写题",
      },
      {
        text: "网络协议",
        link: "/网络协议",
      },
      {
        text: "算法题",
        link: "/算法题",
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ilcherry/fe-interview-site" },
    ],
  },
});
