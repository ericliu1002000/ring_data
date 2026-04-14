<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { openConfirmDialog } from '@/components/dialog/dialog'
import { useUserStore } from '@/stores/user'
import { formatMobile } from '@/utils/format'

const router = useRouter()
const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

/**
 * 退出当前账号。
 * @param 无入参。
 * @returns 无返回结果。
 */
async function handleLogout(): Promise<void> {
  const confirmed = await openConfirmDialog('退出登录', '确认退出当前账号吗？')

  if (!confirmed) {
    return
  }

  userStore.logout()
  router.replace('/home')
}
</script>

<template>
  <div class="space-y-4">
    <section class="rounded-4xl bg-hero-glow px-5 py-6 text-white shadow-card">
      <div class="flex items-center gap-4">
        <img class="h-16 w-16 rounded-full border-2 border-white/70" :src="profile.avatar" alt="avatar" />
        <div>
          <h1 class="text-xl font-semibold">{{ profile.name }}</h1>
          <p class="mt-1 text-sm text-white/70">{{ formatMobile(profile.mobile) }}</p>
        </div>
      </div>

      <div class="mt-5 grid grid-cols-3 gap-3">
        <div class="rounded-3xl bg-white/10 px-3 py-3 text-center">
          <p class="text-lg font-semibold">08</p>
          <p class="mt-1 text-xs text-white/70">已完成活动</p>
        </div>
        <div class="rounded-3xl bg-white/10 px-3 py-3 text-center">
          <p class="text-lg font-semibold">16</p>
          <p class="mt-1 text-xs text-white/70">待优化页面</p>
        </div>
        <div class="rounded-3xl bg-white/10 px-3 py-3 text-center">
          <p class="text-lg font-semibold">92%</p>
          <p class="mt-1 text-xs text-white/70">性能评分</p>
        </div>
      </div>
    </section>

    <section class="app-card">
      <h2 class="app-title">快捷操作</h2>
      <div class="mt-4 grid grid-cols-2 gap-3">
        <div class="rounded-3xl bg-slate-50 px-4 py-4">
          <p class="text-base font-semibold text-text-primary">页面装修</p>
          <p class="mt-2 text-sm text-text-secondary">活动页、个人中心、表单页快速搭建</p>
        </div>
        <div class="rounded-3xl bg-slate-50 px-4 py-4">
          <p class="text-base font-semibold text-text-primary">接口配置</p>
          <p class="mt-2 text-sm text-text-secondary">统一请求拦截、错误处理与 Loading 能力</p>
        </div>
      </div>
    </section>

    <van-button type="danger" block class="!h-11 !rounded-3xl" @click="handleLogout">
      退出登录
    </van-button>
  </div>
</template>
