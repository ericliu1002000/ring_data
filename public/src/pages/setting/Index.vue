<script setup lang="ts">
import { useRouter } from 'vue-router'
import { openConfirmDialog } from '@/components/dialog/dialog'

const router = useRouter()

/**
 * 返回上一页
 */
const onClickLeft = () => {
  router.back()
}

/**
 * 退出登录
 */
const handleLogout = async () => {
  const confirmed = await openConfirmDialog('提示', '确定要退出登录吗？')

  if (!confirmed) {
    return
  }

  router.replace('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#e1f2fc] to-[#daf0fd] flex flex-col">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="系统设置"
      left-arrow
      :border="false"
      class="transparent-nav"
      @click-left="onClickLeft"
    />

    <!-- 设置菜单列表 -->
    <div class="mt-4 px-4 flex-1">
      <van-cell-group inset class="!mx-0 !bg-white/80">
        <van-cell icon="friends" title="账号设置" is-link to="/setting/account" />
        <van-cell icon="share" title="举报与反馈" is-link to="/setting/feedback" />
        <van-cell icon="info" title="关于我们" is-link to="/setting/about" />
      </van-cell-group>

      <!-- 退出登录按钮 -->
      <div class="mt-8">
        <van-button 
          block 
          round 
          type="primary" 
          color="#FF4D4F"
          @click="handleLogout"
        >
          退出登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使导航栏背景透明，融合进页面渐变背景 */
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
