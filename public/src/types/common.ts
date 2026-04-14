export interface IApiResponse<T> {
  code: number
  data: T
  message: string
}

export interface IHttpError {
  code?: number
  message: string
}

export interface IPagination {
  page: number
  pageSize: number
  total: number
}

export interface IRouteTabItem {
  label: string
  name: string
  path: string
  icon: string
}

export interface IContentCard {
  id: string
  title: string
  subtitle: string
  summary: string
  cover: string
  tags: string[]
  price?: number
}
