<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openSuccessToast, openToast } from '@/components/toast/toast'

const router = useRouter()

// 反馈内容
const feedbackContent = ref('')

/**
 * 返回上一页
 */
const onClickLeft = () => {
  router.back()
}

/**
 * 提交反馈
 */
const handleSubmit = () => {
  if (!feedbackContent.value.trim()) {
    openToast('请输入反馈内容')
    return
  }

  openSuccessToast({
    message: '感谢您的反馈！',
    onClose: () => {
      router.back()
    },
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#e1f2fc] to-[#daf0fd] flex flex-col">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="举报与反馈"
      left-arrow
      :border="false"
      class="transparent-nav"
      @click-left="onClickLeft"
    />

    <!-- 表单输入区域 -->
    <div class="mt-4 px-4 flex-1 flex flex-col gap-6">
      <van-cell-group inset class="!mx-0 !bg-white/80 shadow-sm">
        <van-field
          v-model="feedbackContent"
          rows="6"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入您的宝贵意见或反馈问题，我们将尽快处理（最多200字）"
          show-word-limit
          class="!bg-transparent"
        />
      </van-cell-group>

      <!-- 提交按钮 -->
      <van-button 
        block 
        round 
        type="primary" 
        class="neu-btn-primary"
        @click="handleSubmit"
      >
        提交反馈
      </van-button>
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

/* 拟态风格按钮，与整体 UI 一致 */
.neu-btn-primary {
  background: linear-gradient(135deg, #1890FF, #40A9FF) !important;
  border: none !important;
  box-shadow: 
    4px 4px 10px rgba(24, 144, 255, 0.3),
    -4px -4px 10px rgba(255, 255, 255, 0.5) !important;
}
</style>
