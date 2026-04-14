import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appTitle = ref(import.meta.env.VITE_APP_TITLE)
  const loading = ref(false)

  /**
   * 设置应用标题。
   * @param title 页面标题。
   * @returns 无返回结果。
   */
  function setAppTitle(title: string): void {
    appTitle.value = title
    document.title = title
  }

  /**
   * 设置全局加载状态。
   * @param value 是否加载中。
   * @returns 无返回结果。
   */
  function setLoading(value: boolean): void {
    loading.value = value
  }

  return {
    appTitle,
    loading,
    setAppTitle,
    setLoading,
  }
})
