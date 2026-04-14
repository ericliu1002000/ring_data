import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from '@/router/guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    redirect: '/login',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/home/Index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/pages/my/Index.vue'),
        meta: {
          title: '我的',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/pages/setting/Index.vue'),
    meta: {
      title: '系统设置',
      requiresAuth: true,
    },
  },
  {
    path: '/setting/account',
    name: 'setting-account',
    component: () => import('@/pages/setting/Account.vue'),
    meta: {
      title: '账号设置',
      requiresAuth: true,
    },
  },
  {
    path: '/setting/feedback',
    name: 'setting-feedback',
    component: () => import('@/pages/setting/Feedback.vue'),
    meta: {
      title: '举报与反馈',
      requiresAuth: true,
    },
  },
  {
    path: '/setting/about',
    name: 'setting-about',
    component: () => import('@/pages/setting/About.vue'),
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('@/pages/record/Index.vue'),
    meta: {
      title: '健康档案',
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

setupRouterGuard(router)

export default router
