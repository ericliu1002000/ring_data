<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import botImage from '@/assets/bot.webp'
import type { IHealthData } from '@/types/home'

defineProps<{
  healthData: IHealthData
}>()

/**
 * 根据当前时间获取问候语。
 * @param 无入参。
 * @returns 对应的问候语。
 */
const greeting = computed(() => {
  const hour = dayjs().hour()
  if (hour >= 6 && hour < 12) {
    return '上午好~工作久了，起来活动一下吧☕'
  } else if (hour >= 12 && hour < 18) {
    return '下午好~工作久了，起来活动一下吧☕'
  } else {
    return '晚上好~忙碌一天，注意休息哦🌙'
  }
})
</script>

<template>
  <div class="px-4 py-3">
    <div class="neu-card relative overflow-hidden rounded-[16px] px-0 py-0">
      <!-- 骨架屏 -->
      <div v-if="healthData.isLoading" class="animate-pulse space-y-4">
        <div class="h-6 w-1/2 rounded bg-[#c6d0d9]"></div>
        <div class="h-4 w-1/3 rounded bg-[#c6d0d9] opacity-50"></div>
        <div class="space-y-2 pt-4">
          <div class="h-4 w-full rounded bg-[#c6d0d9]"></div>
          <div class="h-4 w-5/6 rounded bg-[#c6d0d9]"></div>
        </div>
      </div>

      <!-- 真实数据 -->
      <template v-else>
      

        <!-- 问候语 -->
        <div class="relative z-5 mb-4 bg-[#d8f2ff] pl-4 pt-3 pb-2 border-b border-[#ffffff] ">
          <h2 class="text-lg font-bold text-[#0d151d]">{{ greeting.split('~')[0] }}~</h2>
          <p class="mt-1 text-lg font-semibold text-[#0d151d]">{{ greeting.split('~')[1] }}</p>
        </div>

          <div class="absolute right-1 top-1 z-[9] h-[70px] w-[90px] overflow-hidden pointer-events-none">
          <img class="h-[100px] w-[90px] object-contain" :src="botImage" alt="健康机器人" />
        </div>

        <div class="relative z-10 space-y-3 pl-4 pr-6 pb-4">
          <h3 class="text-base font-normal text-[#0c1021]">健康小提醒</h3>
          
          <template v-if="healthData.hasData">
            <!-- PRD 要求的固定格式文案与异常高亮 -->
            <p class="text-base leading-[24px] text-[#0c1021] whitespace-pre-line text-justify indent-8">
              您的体温与血氧指标正常，但当前心率偏高（<span class="text-[#0c1021]">89次/分</span>），压力指数达<span class="text-[#0c1021]">7级</span>，且睡眠质量78分，说明身体正处于紧绷且休息不足的状态。
            </p>
            <p class="mt-2 text-base leading-[24px] text-[#0c1021] whitespace-pre-line text-justify indent-8">
              {{ healthData.healthAdvice }}
            </p>
          </template>
          <template v-else>
            <p class="text-base leading-[24px] text-[#0c1021] indent-8">暂无健康数据，建议绑定智能设备获取个性化提醒</p>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.neu-card {
  background: linear-gradient(to right, #e0f2ff, #deedff );
  border: 1px solid white; 

}
</style>
