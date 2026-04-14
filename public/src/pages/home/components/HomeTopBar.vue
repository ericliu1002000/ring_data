<script setup lang="ts">
import { ref } from 'vue'
import HomeDrawer from './HomeDrawer.vue'

const drawerRef = ref<InstanceType<typeof HomeDrawer> | null>(null)

/**
 * 触发抽屉菜单从左侧滑出显示
 * @returns 无返回结果
 */
function handleMenuClick(): void {
  drawerRef.value?.openDrawer()
}
</script>

<template>
  <header class="flex items-center justify-between sticky top-0 z-50 neu-bg px-4 py-3">
    <!-- 左侧菜单，入口 -->
    <div class="flex  cursor-pointer items-center gap-2 justify-center rounded-full" @click="handleMenuClick">
      <van-icon name="wap-nav" size="20" color="#000000" />
      <span class="text-base font-normal text-[#000000]">智医康</span>
    </div>

    <!-- 标题区 -->
    <div class="flex items-center gap-4">
      <span class="text-lg font-bold text-[#000000]">对话</span>
      <span class="text-base font-semibold text-[#666]">硬件</span>
    </div>

    <!-- 右侧占位 -->
    <div class="h-8 bg-white rounded-l-full rounded-r-full flex items-center justify-center w-[80px] gap-3">
      <van-icon name="weapp-nav" size="20" color="#000000" />
      <van-icon name="clear" size="20" color="#000000" />
    </div>

    <!-- 侧边栏抽屉组件 -->
    <HomeDrawer ref="drawerRef" />
  </header>
</template>

<style scoped>
.neu-bg {
}
.neu-icon-btn {
  background: #ffffff;
  box-shadow: 6px 6px 12px #c9d8d5, -6px -6px 12px #ffffff;
  transition: all 0.2s ease;
}
.neu-icon-btn:active {
  box-shadow: inset 4px 4px 8px #c9d8d5, inset -4px -4px 8px #ffffff;
}
</style>
