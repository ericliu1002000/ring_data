<script setup lang="ts">
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { SwipeCellInstance } from 'vant/es/swipe-cell'
import { useRouter } from 'vue-router'
import header from '@/assets/head_tx.png'
import { openDangerConfirmDialog } from '@/components/dialog/dialog'
import { openSuccessToast } from '@/components/toast/toast'
import { useChatStore } from '@/stores/chat'

const router = useRouter()
const chatStore = useChatStore()
const { activeSessionId, sessionList } = storeToRefs(chatStore)
const swipeCellRefs = ref<Record<string, SwipeCellInstance | null>>({})

// 控制抽屉显示隐藏的响应式变量
const showDrawer = ref(false)

/**
 * 1. 打开抽屉
 */
const openDrawer = () => {
  showDrawer.value = true
}

/**
 * 2. 关闭抽屉
 */
const closeDrawer = () => {
  showDrawer.value = false
}

/**
 * 3. 跳转健康档案
 */
const toHealthRecord = () => {
  closeDrawer()
  router.push('/record')
}

/**
 * 4. 启动新对话
 */
const toNewChat = () => {
  chatStore.startNewChat()
  closeDrawer()
}

/**
 * 7. 跳转系统设置
 */
const toSetting = () => {
  closeDrawer()
  router.push('/setting')
}

/**
 * 切换历史会话
 * @param sessionId 会话 id
 * @returns 无返回结果
 */
const handleSessionClick = (sessionId: string) => {
  chatStore.selectSession(sessionId)
  closeDrawer()
}

/**
 * 绑定滑动项实例
 * @param sessionId 会话 id
 * @param instance 组件实例
 * @returns 无返回结果
 */
const setSwipeCellRef = (sessionId: string, instance: SwipeCellInstance | null) => {
  if (instance) {
    swipeCellRefs.value[sessionId] = instance
    return
  }

  delete swipeCellRefs.value[sessionId]
}

/**
 * 关闭指定滑动项
 * @param sessionId 会话 id
 * @returns 无返回结果
 */
const closeSwipeCell = (sessionId: string) => {
  swipeCellRefs.value[sessionId]?.close('right')
}

/**
 * 会话置顶/取消置顶
 * @param sessionId 会话 id
 * @returns 无返回结果
 */
const handlePinSession = (sessionId: string) => {
  const session = sessionList.value.find((item) => item.id === sessionId)

  if (!session) {
    return
  }

  closeSwipeCell(sessionId)

  if (session.isPinned) {
    chatStore.unpinSession(sessionId)
    openSuccessToast('已取消置顶')
    return
  }

  chatStore.pinSession(sessionId)
  openSuccessToast('已置顶')
}

/**
 * 删除会话
 * @param sessionId 会话 id
 * @returns 无返回结果
 */
const handleDeleteSession = async (sessionId: string): Promise<void> => {
  const confirmed = await openDangerConfirmDialog('删除会话', '确认删除当前会话吗？')

  if (!confirmed) {
    return
  }

  closeSwipeCell(sessionId)
  chatStore.deleteSession(sessionId)
  openSuccessToast('已删除')
}

/**
 * 格式化历史时间
 * @param value 时间戳
 * @returns 展示用时间
 */
function formatSessionTime(value: number): string {
  const target = dayjs(value)

  if (target.isSame(dayjs(), 'day')) {
    return target.format('HH:mm')
  }

  return target.format('MM-DD HH:mm')
}

// 暴露方法给父组件调用
defineExpose({
  openDrawer,
  closeDrawer
})
</script>

<template>
  <van-popup
    v-model:show="showDrawer"
    position="left"
    :style="{ width: '80%', height: '100%' }"
    class="home-drawer-popup flex flex-col"
    style="background: linear-gradient(to right, #e1f2fc,#daf0fd);"
  >
    <!-- 1. 用户信息头部区域 -->
    <div class="px-2 py-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- 头像 -->
        <van-image
          round
          width="48"
          height="48"
          :src="header"
        />
        <!-- 用户名和健康档案 -->
        <div class="flex flex-col">
          <span class="text-lg font-bold text-[#1D2129]">主*</span>
          <span class="text-xs text-[#86909C] mt-1 cursor-pointer flex items-center gap-1" @click="toHealthRecord">
            健康档案 <van-icon name="arrow" />
          </span>
        </div>
      </div>
      <!-- 右侧设置与关闭按钮 -->
      <div class="flex items-center gap-4">
        <!-- 设置图标 -->
        <van-icon name="setting-o" size="20" color="#1D2129" @click="toSetting" />
        <!-- 关闭图标（代码方法控制关闭） -->
        <van-icon name="cross" size="20" color="#1D2129" @click="closeDrawer" />
      </div>
    </div>

    <!-- 2. 菜单功能列表 -->
    <div class="flex-1 overflow-y-auto px-2 pb-4 flex flex-col gap-4">
      <!-- 新建对话大按钮 -->
      <div 
        class="bg-white rounded-2xl p-2 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:opacity-80 transition-opacity"
        @click="toNewChat"
      >
        <van-icon name="chat-o" size="20" color="#1D2129" />
        <span class="text-base font-bold text-[#1D2129]">新建对话</span>
      </div>

      <!-- 全部历史对话 -->
      <div class="bg-white rounded-2xl p-4 shadow-sm flex-1 flex flex-col min-h-[300px]">
        <div class="text-base font-bold text-[#1D2129] mb-4">全部历史对话</div>
        <div v-if="sessionList.length" class="flex flex-col gap-3">
          <van-swipe-cell
            v-for="session in sessionList"
            :key="session.id"
            :ref="(instance) => setSwipeCellRef(session.id, instance as SwipeCellInstance | null)"
            :name="session.id"
            :right-width="120"
            class="drawer-swipe-cell overflow-hidden rounded-2xl"
          >
            <div
              class="rounded-2xl border px-3 py-3 transition-colors"
              :class="
                activeSessionId === session.id
                  ? 'border-[#1677FF] bg-[#EAF3FF]'
                  : 'border-transparent bg-[#f2f2f2]'
              "
              @click="handleSessionClick(session.id)"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <div class="truncate text-sm font-semibold text-[#1D2129]">{{ session.title }}</div>
                    <span
                      v-if="session.isPinned"
                      class="shrink-0 rounded-full bg-[#E8F3FF] px-2 py-[2px] text-[10px] font-semibold text-[#1677FF]"
                    >
                      置顶
                    </span>
                  </div>
                  <div class="truncate mt-2 text-xs leading-[12px] text-[#86909C]">
                    {{ session.preview }}
                  </div>
                </div>
                <div class="shrink-0 text-[12px] text-[#86909C]">
                  {{ formatSessionTime(session.updatedAt) }}
                </div>
              </div>
            </div>
            <template #right>
              <div class="flex h-full">
                <button
                  type="button"
                  class="swipe-action swipe-action-pin"
                  @click.stop="handlePinSession(session.id)"
                >
                  {{ session.isPinned ? '取消置顶' : '置顶' }}
                </button>
                <button
                  type="button"
                  class="swipe-action swipe-action-delete"
                  @click.stop="handleDeleteSession(session.id)"
                >
                  删除
                </button>
              </div>
            </template>
          </van-swipe-cell>
        </div>
        <div v-else class="flex-1 flex items-center justify-center text-sm text-[#86909C]">
          暂无历史对话
        </div>
      </div>

      
    </div>

    
  </van-popup>
</template>

<style scoped>
/* 仅覆盖首页抽屉自己的 popup，避免影响 Toast / Dialog 等其他 Vant 弹层 */
.home-drawer-popup {
  background-color: transparent !important;
}

/* 针对 van-cell 移除部分不需要的边框，使其更符合拟物圆角卡片风格 */
:deep(.van-cell::after) {
  border-bottom-color: #f0f0f0;
}
:deep(.van-cell:last-child::after) {
  display: none;
}

.session-preview {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.drawer-swipe-cell {
  background: transparent;
}

.swipe-action {
  width: 60px;
  height: 100%;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.swipe-action-pin {
  background: #1677ff;
}

.swipe-action-pin:active {
  background: #0f5fd6;
}

.swipe-action-delete {
  background: #ff4d4f;
}
</style>
