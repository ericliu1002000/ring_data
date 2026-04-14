<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = computed(() => String(route.meta.title || import.meta.env.VITE_APP_TITLE))
const showBack = computed(() => route.path !== '/home' && route.path !== '/')

/**
 * 处理返回事件。
 * @param 无入参。
 * @returns 无返回结果。
 */
function handleBack(): void {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.replace('/home')
}
</script>

<template>
  <van-nav-bar
    fixed
    placeholder
    safe-area-inset-top
    :title="title"
    :left-arrow="showBack"
    @click-left="handleBack"
  />
</template>

<style scoped>
:deep(.van-nav-bar) {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
}

:deep(.van-nav-bar__title) {
  font-weight: 600;
  color: rgb(var(--text-primary));
}
</style>
