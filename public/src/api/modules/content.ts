import type { IContentCard } from '@/types/common'
import { http } from '@/utils/request'

/**
 * 获取内容列表。
 * @param keyword 搜索关键词。
 * @returns 内容列表数据。
 */
export function fetchContentList(keyword = ''): Promise<IContentCard[]> {
  return http.get<IContentCard[]>('/content/list', {
    params: {
      keyword,
    },
  })
}

/**
 * 获取内容详情。
 * @param id 内容编号。
 * @returns 内容详情数据。
 */
export function fetchContentDetail(id: string): Promise<IContentCard> {
  return http.get<IContentCard>(`/content/${id}`)
}
