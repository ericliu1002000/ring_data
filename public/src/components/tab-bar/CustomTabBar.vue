<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TAB_BAR_LIST } from '@/config'

const route = useRoute()
const router = useRouter()
const active = computed(() => String(route.name || 'home'))

/**
 * 切换底部导航。
 * @param name 目标路由名称。
 * @returns 无返回结果。
 */
function handleChange(name: string | number): void {
  const matchedRoute = TAB_BAR_LIST.find((item) => item.name === name)

  if (matchedRoute) {
    router.push(matchedRoute.path)
  }
}
</script>

<template>
  <div class="custom-tab-bar">
    <van-tabbar :model-value="active" safe-area-inset-bottom @change="handleChange">
      <van-tabbar-item
        v-for="item in TAB_BAR_LIST"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      >
        {{ item.label }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.custom-tab-bar :deep(.van-tabbar) {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -8px 28px rgba(15, 23, 42, 0.08);
}

.custom-tab-bar :deep(.van-tabbar-item--active) {
  color: rgb(var(--brand-primary));
}
</style>
