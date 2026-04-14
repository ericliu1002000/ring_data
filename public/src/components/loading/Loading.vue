<script setup lang="ts">
defineProps<{
  show: boolean
  text?: string
}>()
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 backdrop-blur-sm"
    >
      <div class="rounded-4xl bg-white px-6 py-5 text-center shadow-card">
        <van-loading color="#12b886" size="24px" vertical>
          {{ text || '加载中...' }}
        </van-loading>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
