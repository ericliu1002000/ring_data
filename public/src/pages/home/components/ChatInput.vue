<script setup lang="ts">
import { ref, watch } from 'vue'
import { openToast } from '@/components/toast/toast'

const emit = defineEmits<{
  (e: 'send', text: string): void
}>()

const inputText = ref('')
const isOverLimit = ref(false)

// 监控字数
watch(inputText, (val) => {
  if (val.length >= 500) {
    isOverLimit.value = true
  } else {
    isOverLimit.value = false
  }
})

/**
 * 拦截输入事件，超过 500 字提示并阻止输入。
 * @param val 当前输入值。
 * @returns 无返回结果。
 */
function handleInput(val: string): void {
  if (val.length > 500) {
    inputText.value = val.slice(0, 500)
    openToast({
      message: '输入内容不能超过500字',
      position: 'bottom',
    })
  }
}

/**
 * 处理发送逻辑。
 * @param 无入参。
 * @returns 无返回结果。
 */
function handleSend(): void {
  const text = inputText.value.trim()
  if (!text) {
    // PRD: 输入内容为空，不触发请求，可选震动
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }
    return
  }
  emit('send', text)
  inputText.value = ''
}
</script>

<template>
  <div class="px-2  ">
    <!-- 超出字数提示 -->
    <div v-if="isOverLimit" class="mb-2 text-[14px] text-[#FF7D00] text-center">
      输入内容不能超过500字
    </div>
    
    <div class="neu-input-box flex items-center rounded-[24px] px-4 py-[10px] bg-[#ffffff] min-h-[48px]">
      <van-field
        v-model="inputText"
        class="!p-0 !bg-transparent flex-1"
        type="textarea"
        autosize
        rows="1"
        placeholder="有什么健康问题问我吗"
        @update:model-value="handleInput"
      />
      <div
        class="ml-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
        :class="inputText.trim().length ? 'bg-[#1677FF] text-white cursor-pointer' : 'bg-[#D9DEE8] text-[#9AA4B2] cursor-not-allowed'"
        @click="handleSend"
      >
        <van-icon name="guide-o" size="16" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.neu-input-box {
  border: 1px solid #E5E6EB; /* 默认边框 */
  transition: border-color 0.2s ease;
}

.neu-input-box:focus-within {
  border-color: #1677FF; /* 聚焦时边框 */
}

/* 穿透修改 vant 样式 */
:deep(.van-cell::after) {
  border-bottom: none;
}

:deep(.van-field__control) {
  color: #1D2129;
  font-size: 16px;
  line-height: 22px;
}

:deep(.van-field__control::placeholder) {
  color: #86909C;
}
</style>
