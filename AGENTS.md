# AGENTS.md

## Scope

- 本仓库当前可执行的前端项目位于 `public/`。
- 处理前端需求时，将 `public/` 视为项目根目录。
- 若根目录与 `public/` 下规则冲突，以 `public/.trae/rules/projectrule.md` 为准，并同步更新两者。

## Project Summary

- 项目类型：Vue 3 H5 移动端。
- 核心技术栈：Vue 3.5、TypeScript、Vite 8、Vant 4、Pinia、Vue Router、Axios。
- 样式方案：Tailwind CSS + UnoCSS。
- 目标场景：移动端触控体验、弱网容错、安全区适配、首屏性能优先。

## Working Directory

- 安装依赖、运行命令、检查构建时，默认在 `public/` 目录执行。
- 仅在处理仓库级文档或配置时，才在仓库根目录执行命令。

## Required Commands

- 开发：`npm run dev`
- Lint：`npm run lint`
- 类型检查：`npm run typecheck`
- 构建：`npm run build`

## Delivery Gates

- 修改页面、组件、Store、接口、工具函数后，至少运行 `npm run lint` 和 `npm run typecheck`。
- 修改路由、Vite 配置、样式入口、环境变量、自动导入配置后，额外运行 `npm run build`。
- 如果无法运行校验命令，必须在交付说明里明确指出原因和风险。

## Implementation Rules

- 必须使用 `<script setup lang="ts">`，禁止新增 Options API。
- 必须保持 TypeScript 严格模式，禁止通过关闭 `strict` 或加入 `any` 掩盖问题。
- 所有业务请求统一复用 `public/src/utils/request.ts`，禁止在页面或组件中直接裸用 `axios`。
- 组件、页面、Store、API、类型文件必须遵守现有目录职责，不要混写。
- 复用逻辑优先抽到 `composables/`，复用 UI 优先抽到 `components/`。
- 页面私有组件优先放在 `src/pages/**/components/`。
- 组件默认使用 `scoped` 样式；全局样式仅放在 `src/styles/`。
- 跨目录导入统一使用 `@/` 别名。

## Naming Rules

- 页面入口：`src/pages/**/Index.vue`
- 页面私有组件：`src/pages/**/components/*.vue`
- 公共组件：`src/components/**/*.vue`
- 接口模块：`src/api/modules/*.ts`
- Store：`src/stores/*.ts`
- Composable：`src/composables/useXxx.ts`
- Interface 类型：`I` 前缀，例如 `IApiResponse`
- 联合类型/字面量类型：`T` 前缀，例如 `TChatRole`

## Type Safety Rules

- 禁止新增裸 `any`，优先使用 `unknown` 并在边界处收窄。
- API 返回值、Props、Emits、Store State、工具函数参数和返回值必须显式标注类型。
- DOM 引用统一使用显式 `ref` 类型，例如 `ref<HTMLElement | null>(null)`。
- 本地存储、接口响应、第三方输入必须做归一化或兜底处理，不能直接信任外部数据。
- 不要使用 `as any`、双重断言或宽泛断言掩盖类型问题。

## Vue and Pinia Rules

- 页面负责组装和调度，不承担过重的数据加工。
- Store 只管理共享状态、持久化状态和核心业务流程，不存放纯展示临时状态。
- 解构 Store 响应式字段时使用 `storeToRefs`。
- 异步流程必须处理 loading、失败、空态、并发、重复点击和竞态。
- 定时器、事件监听、订阅等副作用必须在卸载时清理。
- 列表渲染必须使用稳定唯一 `key`，禁止长期使用索引作为 `key`。

## H5 Performance Rules

- 保持路由页面懒加载，禁止改成静态全量导入。
- 复用现有 Vite 分包策略，不要随意打散或合并基础依赖包。
- 图片优先使用 `webp` 或 `svg`，避免大图阻塞首屏。
- 高频事件优先复用 `public/src/utils/performance.ts` 中的防抖和节流封装。
- 能缓存的数据优先缓存，并明确 TTL、失效条件和刷新时机。
- 重点关注聊天流、滚动容器、固定底部输入区的重绘和滚动性能。

## H5 UX Constraints

- 必须考虑 `safe-area-inset-*`，避免底部按钮、输入框、弹层被遮挡。
- 不要过度依赖固定像素布局；优先保持移动端自适应。
- 点击热区、字体可读性、软键盘顶起、滚动穿透、图片拉伸都属于必查项。

## Bug Investigation Order

- 先跑 `lint`、`typecheck`，必要时跑 `build`。
- 再检查浏览器控制台、Network、路由守卫、Pinia 状态和本地存储。
- 然后定位问题归属：页面渲染、组件通信、Store、请求层、样式覆盖、移动端兼容。
- 最后检查是否存在未清理定时器、重复请求、监听器泄漏、异步竞态。

## Review Checklist

- 是否遵守当前目录职责。
- 是否保持完整类型，没有新增 `any` 或重复定义冲突类型。
- 是否复用了现有封装：`request.ts`、`storage.ts`、`performance.ts`、已有 Store。
- 是否补齐 loading、失败、空态、竞态保护和资源清理。
- 是否影响首屏体积、分包、图片加载、滚动性能和固定底部交互。
- 是否通过对应的校验命令。

## Reference

- 详细项目规则：`public/.trae/rules/projectrule.md`
