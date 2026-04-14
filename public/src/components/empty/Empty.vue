<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: '暂无内容',
    description: '当前页面还没有数据，稍后再来看看吧',
  },
)
</script>

<template>
  <div class="flex flex-col items-center justify-center rounded-4xl bg-white/90 px-6 py-10">
    <van-empty image="search" :description="description">
      <template #default>
        <div class="mt-3 text-center">
          <p class="text-base font-semibold text-text-primary">{{ title }}</p>
          <p class="mt-2 text-sm leading-6 text-text-secondary">{{ description }}</p>
        </div>
      </template>
    </van-empty>
  </div>
</template>
