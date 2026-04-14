<script setup lang="ts">
import { openToast } from '@/components/toast/toast'

const actions = [
  { id: 'consult', title: '健康咨询', desc: '真人医生在线解答', route: '/consult' },
  { id: 'medicine', title: '用药提醒', desc: '系统级提醒你吃药', route: '/medicine' },
  { id: 'device-change', title: '设备更换', desc: '退换/管理', route: '/device-change' },
]

/**
 * 处理快捷按钮点击事件。
 * @param routePath 目标路由。
 * @returns 无返回结果。
 */
function handleAction(_routePath: string): void {
  // 因为当前项目只保留了 /home, /my, /login，其他页面不存在
  // 根据 PRD：“若跳转失败，页面顶部展示「跳转失败，请重试」提示”
  openToast({
    message: '跳转失败，请重试',
    position: 'top',
    className: 'custom-toast-fail',
  })
}
</script>

<template>
  <div class="px-2 pb-2 pt-2">
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <div
        v-for="action in actions"
        :key="action.id"
        class="neu-btn min-w-[160px] flex-shrink-0 cursor-pointer rounded-[16px] px-[14px] py-[8px] "
        @click="handleAction(action.route)"
      >
        <div class="text-base font-semibold text-[#1D2129]">{{ action.title }}</div>
        <div class=" text-sm text-[#86909C] whitespace-nowrap">{{ action.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.neu-btn {
  background: #ffffff; /* PRD 要求按钮背景色默认 #FFFFFF */
  transition: all 0.15s ease-in-out;
}

.neu-btn:active {
  background: #f5f7fa; /* PRD 点击态 */
  opacity: 0.8;
}

/* 全局可注入的 toast 样式 */
:global(.custom-toast-fail) {
  background-color: #F0F9FF !important;
  color: #FF7D00 !important;
  font-size: 14px !important;
}
</style>
