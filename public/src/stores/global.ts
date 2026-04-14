import { defineStore } from 'pinia'
import { CONTENT_LIST } from '@/config'
import type { IContentCard } from '@/types/common'

export const useGlobalStore = defineStore('global', () => {
  const banners = ref([
    '企业级 H5 项目骨架',
    '活动页 / 商城 / 表单页快速复用',
    '高性能、强约束、易扩展',
  ])
  const contentList = ref<IContentCard[]>(CONTENT_LIST)

  /**
   * 根据编号获取详情数据。
   * @param id 内容编号。
   * @returns 命中的内容详情或空值。
   */
  function getContentById(id: string): IContentCard | undefined {
    return contentList.value.find((item) => item.id === id)
  }

  /**
   * 更新全局内容列表。
   * @param list 最新内容列表。
   * @returns 无返回结果。
   */
  function setContentList(list: IContentCard[]): void {
    contentList.value = list
  }

  return {
    banners,
    contentList,
    getContentById,
    setContentList,
  }
})
