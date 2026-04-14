import { defineStore } from 'pinia'
import { TOKEN_KEY } from '@/config'
import type { ILoginForm, IUserProfile } from '@/types/user'
import { getStorage, removeStorage, setStorage } from '@/utils/storage'

const defaultUser: IUserProfile = {
  id: '',
  name: '',
  mobile: '',
  avatar: '',
  token: '',
}

export const useUserStore = defineStore('user', () => {
  const profile = ref<IUserProfile>(getStorage<IUserProfile>('vue3-h5-user', defaultUser))
  const token = ref<string>(getStorage<string>(TOKEN_KEY, ''))
  const isLogin = computed(() => Boolean(token.value))

  /**
   * 保存用户信息。
   * @param user 用户资料。
   * @returns 无返回结果。
   */
  function setProfile(user: IUserProfile): void {
    profile.value = user
    token.value = user.token
    setStorage('vue3-h5-user', user)
    setStorage(TOKEN_KEY, user.token)
  }

  /**
   * 使用演示数据完成登录。
   * @param payload 登录表单。
   * @returns 无返回结果。
   */
  function loginByDemo(payload: ILoginForm): void {
    setProfile({
      id: 'u-001',
      name: '增长负责人',
      mobile: payload.mobile,
      avatar:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
      token: 'demo-token',
    })
  }

  /**
   * 退出登录。
   * @param 无入参。
   * @returns 无返回结果。
   */
  function logout(): void {
    profile.value = defaultUser
    token.value = ''
    removeStorage('vue3-h5-user')
    removeStorage(TOKEN_KEY)
  }

  return {
    profile,
    token,
    isLogin,
    setProfile,
    loginByDemo,
    logout,
  }
})
