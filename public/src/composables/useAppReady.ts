import { useAppStore } from '@/stores/app'

/**
 * 初始化应用基础状态。
 * @param title 页面标题。
 * @returns 无返回结果。
 */
export function useAppReady(title?: string): void {
  const appStore = useAppStore()
  appStore.setAppTitle(title || import.meta.env.VITE_APP_TITLE)
}
