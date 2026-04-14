import type { ILoginForm, IRegisterForm, IUserProfile } from '@/types/user'
import { http } from '@/utils/request'

/**
 * 提交登录请求。
 * @param payload 登录表单。
 * @returns 用户信息。
 */
export function loginApi(payload: ILoginForm): Promise<IUserProfile> {
  return http.post<IUserProfile>('/auth/login', payload, {
    showLoading: true,
  })
}

/**
 * 提交注册请求。
 * @param payload 注册表单。
 * @returns 用户信息。
 */
export function registerApi(payload: IRegisterForm): Promise<IUserProfile> {
  return http.post<IUserProfile>('/auth/register', payload, {
    showLoading: true,
  })
}
