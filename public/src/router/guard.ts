import type { Router } from 'vue-router'
import { ROUTE_WHITE_LIST } from '@/config'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

/**
 * 注册路由守卫。
 * @param router 路由实例。
 * @returns 无返回结果。
 */
export function setupRouterGuard(router: Router): void {
  router.beforeEach((to) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const title = String(to.meta.title || import.meta.env.VITE_APP_TITLE)

    appStore.setAppTitle(title)

    if (to.meta.requiresAuth && !userStore.isLogin && !ROUTE_WHITE_LIST.includes(to.path)) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }

    return true
  })
}
