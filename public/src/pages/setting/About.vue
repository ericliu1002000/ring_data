<script setup lang="ts">
import { useRouter } from 'vue-router'
import logoMark from '@/assets/logo.webp'

const router = useRouter()

/**
 * 返回上一页
 */
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-[#e1f2fc] to-[#daf0fd] flex flex-col">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="关于我们"
      left-arrow
      :border="false"
      class="transparent-nav"
      @click-left="onClickLeft"
    />

    <!-- Logo 与版本信息 -->
    <div class="flex flex-col items-center justify-center py-5">
      <div class="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden mb-4">
        <img :src="logoMark" alt="logo" class="w-32 h-22 object-fit" />
      </div>
      <p class="text-sm text-[#86909C] mt-1">Version 1.0.0</p>
    </div>

    <!-- 协议入口 -->
    <div class="p-2 flex-1 bg-white/80 rounded-2xl m-4 flex flex-col justify-center items-center">
      <!-- <van-cell-group inset class="!mx-0 !bg-white/80">
        <van-cell title="用户协议" is-link @click="handleViewAgreement('用户协议')" />
        <van-cell title="隐私政策" is-link @click="handleViewAgreement('隐私政策')" />
        <van-cell title="硬件服务条款" is-link @click="handleViewAgreement('硬件服务条款')" />
      </van-cell-group> -->
      <p class="text-lg font-semibold">关于智医康</p>
      <p class="text-base font-normal">连接生命，赋能健康</p>
      <p class="m-5">海智医康科技有限公司是一家专注于慢病数字化疗法的前沿医疗科技企业。我们深度融合AI大模型能力与医疗级物联网硬件，通过结构化真实世界数据（RWD）赋能医生决策，提升患者生存质量与生存期。 智医康创始团队由来自平安、哈啰、上海三甲医院的人工智能、医学、物联网专家组成，我们致力于帮助慢病患者科学康复，并坚持以循证医学为底座，助力“健康中国2030”建设。</p>
    </div>

    <!-- 底部版权信息 -->
    <div class="py-6 text-center text-xs text-[#86909C] p-10">
      <p>© 2026 上海智医康科技有限公司 |  沪ICP备2024092528号-4 | 沪公网安备31010402336532号
            </p>
      <p class="mt-2"> 地址：上海市徐汇区龙漕路200弄28号302   |   邮箱：kefu@izencare.com   |   电话：4006898982</p>
    </div>
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
</style>
