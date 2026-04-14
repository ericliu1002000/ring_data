<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import szrBg from '@/assets/szr_male_bg.webp'
import headTx from '@/assets/head_tx.png'
import szrBack from '@/assets/szr_back_bg.webp'
import { openSuccessToast, openToast } from '@/components/toast/toast'
import { getStorage, setStorage } from '@/utils/storage'

const router = useRouter()
const RECORD_NAME_STORAGE_KEY = 'vue3-h5-record-name'
const displayName = ref(getStorage<string>(RECORD_NAME_STORAGE_KEY, '主*'))
const editNamePopupVisible = ref(false)
const draftName = ref(displayName.value)

/**
 * 返回上一页
 */
const onClickLeft = () => {
  router.back()
}

/**
 * 编辑名称
 */
const handleEditName = () => {
  draftName.value = displayName.value
  editNamePopupVisible.value = true
}

/**
 * 关闭编辑弹框
 */
const handleCloseEditPopup = () => {
  editNamePopupVisible.value = false
}

/**
 * 保存名称
 */
const handleSaveName = () => {
  const nextName = draftName.value.trim()

  if (!nextName) {
    openToast('请输入姓名')
    return
  }

  displayName.value = nextName
  setStorage(RECORD_NAME_STORAGE_KEY, nextName)
  editNamePopupVisible.value = false
  openSuccessToast({
    message: '保存成功',
  })
}

/**
 * 点击功能菜单
 */
const handleMenuClick = (name: string) => {
  openToast(`点击了：${name}`)
}

// 功能菜单数据
const menuList = [
  { name: '智能设备', icon: '' },
  { name: '提醒设置', icon: '' },
  { name: '亲情账号', icon: '' },
  { name: '意见反馈', icon: '' }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#e1f2fc] to-[#daf0fd] flex flex-col relative overflow-hidden">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="健康档案"
      left-arrow
      :border="false"
      class="transparent-nav relative z-10"
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!-- 头部身份信息 -->
    <div class="relative z-10 w-full px-4 pt-2 pb-4">
      <!-- 左侧气泡标签 -->
      <div class="absolute left-4 top-2 flex items-center bg-gradient-to-r from-[#4CA5FF] to-[#6EC5FF] rounded-r-full rounded-tl-full p-2 pr-3 shadow-md">
        <van-image
          round
          width="24"
          height="24"
          :src="headTx"
          class="border border-white"
        />
        <span class="text-white text-xs ml-2 font-medium">本人</span>
      </div>
      
      <!-- 居中名称与编辑 -->
      <div class="flex items-center justify-center mt-8">
        <span class="text-xl font-bold text-[#1D2129] tracking-wider">{{ displayName }}</span>
        <van-icon name="edit" class="ml-2 text-[#86909C]" size="18" @click="handleEditName" />
      </div>
    </div>

    <!-- 中央数字人展示区 -->
    <div class="relative w-full flex justify-center items-end  pt-10">
      <!-- 装饰背景发光效果 -->
      <div class="relative w-full h-[240px] flex justify-center items-center">
      <!-- 底层背景图 -->
      <img 
        :src="szrBg" 
        alt="数字人背景" 
        class="absolute inset-0 w-full  h-[100%]  object-contain z-20" 
      />
        <img
        :src="szrBack" 
        alt="数字人" 
        class="relative max-h-[240px] object-contain z-10" 
      />
    </div>
    

      <!-- 数据指示器：男 / 性别 -->
      <div class="absolute left-8 top-[30%] flex items-center group z-20">
        <div class="flex flex-col items-start mr-2">
          <span class="text-xl font-bold text-[#1D2129]">男</span>
          <span class="text-xs text-[#86909C]">性别</span>
        </div>
        <!-- 连接线 -->
        <div class="relative w-12 h-[1px] bg-[#96C5F7]">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#1890FF] rounded-full"></div>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1890FF] rounded-full border border-white"></div>
        </div>
      </div>

      <!-- 数据指示器：38岁 / 年龄 -->
      <div class="absolute left-8 top-[65%] flex items-center group z-20">
        <div class="flex flex-col items-start mr-2">
          <span class="text-xl font-bold text-[#1D2129]">38岁</span>
          <span class="text-xs text-[#86909C]">年龄</span>
        </div>
        <!-- 连接线 -->
        <div class="relative w-10 h-[1px] bg-[#96C5F7]">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#1890FF] rounded-full"></div>
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1890FF] rounded-full border border-white"></div>
        </div>
      </div>

      <!-- 数据指示器：22.9 / BMI -->
      <div class="absolute right-8 top-[35%] flex items-center group z-20">
        <!-- 连接线 -->
        <div class="relative w-12 h-[1px] bg-[#96C5F7] mr-2">
          <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#1890FF] rounded-full"></div>
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1890FF] rounded-full border border-white"></div>
        </div>
        <div class="flex flex-col items-end">
          <span class="text-xl font-bold text-[#1D2129]">22.9</span>
          <div class="flex items-center gap-1">
            <span class="text-xs text-[#86909C]">BMI</span>
            <van-icon name="info-o" size="12" color="#86909C" />
          </div>
          <!-- 正常标签 -->
          <div class="mt-1 bg-gradient-to-r from-[#4ADE80] to-[#52C41A] text-white text-[10px] px-2 py-0.5 rounded shadow-sm">正常</div>
        </div>
      </div>
    </div>

    <!-- 底部功能卡片 -->
    <div class="w-full flex-1  bg-white/10 backdrop-blur-lg  border border-white/20  rounded-t-[32px] pt-8 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30">
      
      <div class="grid grid-cols-4 gap-4 bg-white/95 p-4 rounded-xl ">
        <div 
          v-for="(item, index) in menuList" 
          :key="index" 
          class="flex flex-col items-center gap-2 cursor-pointer active:opacity-70 transition-opacity"
          @click="handleMenuClick(item.name)"
        >
          <!-- 图标占位：浅蓝色圆角矩形 -->
          <div class="w-14 h-14 bg-[#DCEBFF] rounded-2xl flex items-center justify-center shadow-inner">
            <!-- 此处可放置真实图标，目前按 UI 用纯色块占位 -->
          </div>
          <span class="text-xs text-[#4E5969]">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <van-popup
      v-model:show="editNamePopupVisible"
      round
      close-on-click-overlay
      class="name-edit-popup w-[320px]"
      @click-overlay="handleCloseEditPopup"
    >
      <div class="px-5 pb-5 pt-6 w-[300px]">
        <div class="text-center text-lg font-semibold text-[#1D2129]">编辑姓名</div>
        <div class="mt-4 overflow-hidden rounded-2xl bg-[#F7F8FA]">
          <van-field
            v-model="draftName"
            maxlength="12"
            placeholder="请输入姓名"
            clearable
            input-align="left"
          />
        </div>
        <div class="mt-5 flex gap-3">
          <van-button plain block round class="!h-11 !border-[#D9DEE8] !text-[#4E5969]" @click="handleCloseEditPopup">
            取消
          </van-button>
          <van-button block round type="primary" class="!h-11" @click="handleSaveName">
            确定
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
/* 保持导航栏透明 */
:deep(.van-nav-bar) {
  background-color: transparent;
}
:deep(.van-nav-bar__title) {
  color: #1D2129;
  font-weight: bold;
}
:deep(.van-nav-bar .van-icon) {
  color: #1D2129;
}

.name-edit-popup {
  overflow: hidden;
}

.name-edit-popup :deep(.van-cell) {
  background: transparent;
}

.name-edit-popup :deep(.van-cell::after) {
  display: none;
}
</style>
