<script setup lang="ts">
import { computed } from 'vue'
import type { IChatMessage } from '@/types/chat'

const props = defineProps<{
  msg: IChatMessage
}>()

const isUser = computed(() => props.msg.role === 'user')
</script>

<template>
  <div class="px-4  flex" :class="isUser ? 'justify-end' : 'justify-start'">
    <div
      class="max-w-[85%] px-4 py-2"
      :class="
        isUser
          ? 'rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-none bg-[#0891b2] text-white'
          : 'rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px] rounded-tl-none bg-white text-[#1D2129]'
      "
    >
      <div v-if="msg.status === 'loading'" class="flex items-center gap-2">
        <van-loading type="spinner" size="16" color="#0891b2" />
        <span class="text-base text-[#86909C]">AI正在思考...</span>
      </div>
      <div
        v-else
        class="text-base leading-[24px] whitespace-pre-wrap break-words"
        :class="!isUser && msg.status === 'error' ? 'text-[#FF7D00]' : ''"
      >
        {{ msg.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
