<script setup lang="ts">
import { useRouter } from 'vue-router'
import { openDangerConfirmDialog } from '@/components/dialog/dialog'
import { openToast } from '@/components/toast/toast'

const router = useRouter()

/**
 * 返回上一页
 */
const onClickLeft = () => {
  router.back()
}

/**
 * 修改密码（模拟）
 */
const handleChangePassword = () => {
  openToast('跳转到修改密码页面')
}

/**
 * 账号注销
 */
const handleCancelAccount = async () => {
  const confirmed = await openDangerConfirmDialog('风险提示', '账号注销后无法恢复，确定要注销吗？')

  if (!confirmed) {
    return
  }

  openToast('账号已注销')
  router.replace('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#e1f2fc] to-[#daf0fd] flex flex-col">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="账号设置"
      left-arrow
      :border="false"
      class="transparent-nav"
      @click-left="onClickLeft"
    />

    <!-- 账号信息列表 -->
    <div class="mt-4 px-4 flex-1">
      <van-cell-group inset class="!mx-0 !bg-white/80">
        <van-cell title="手机号码" value="138****8888" />
        <van-cell title="微信绑定" value="已绑定" />
        <van-cell title="修改密码" is-link @click="handleChangePassword" />
      </van-cell-group>

      <!-- 危险操作区域 -->
      <div class="mt-8">
        <van-cell-group inset class="!mx-0 !bg-white/80">
          <van-cell title="注销账号" is-link @click="handleCancelAccount">
            <template #title>
              <span class="text-[#FF4D4F]">注销账号</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保持导航栏透明 */
:deep(.van-nav-bar) {
  background-color: transparent;
}
:deep(.van-nav-bar__title) {
  color: #1D2129;
  font-weight: bold;
}
:deep(.van-nav-bar .van-icon) {
  color: #1D2129;
}
</style>
