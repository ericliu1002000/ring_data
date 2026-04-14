# Vue3 H5 Starter

企业级移动端 H5 项目脚手架，基于 Vue 3.5、Vite 8、Vant 4、Pinia、Tailwind CSS、UnoCSS 与 Axios 构建。

## 启动方式

```bash
npm install
npm run dev
```

## 校验命令

```bash
npm run lint
```

## 目录结构

```text
src
├─ api            接口请求模块
├─ assets         静态资源
├─ components     公共组件与交互封装
├─ composables    组合式函数
├─ config         项目配置常量
├─ layouts        页面布局
├─ pages          业务页面
├─ router         路由与守卫
├─ stores         Pinia 状态管理
├─ styles         全局样式与主题
├─ types          TypeScript 类型
├─ utils          工具函数与请求封装
├─ App.vue
└─ main.ts
```

## 内置能力

- 移动端 vw 适配，375 设计稿开箱即用
- Vant 自动按需引入
- Tailwind CSS + UnoCSS 混合原子化方案
- Axios 请求封装，内置请求拦截、响应拦截、错误提示与 Loading
- 路由嵌套、404、登录守卫
