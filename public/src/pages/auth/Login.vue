<script setup lang="ts">
import type { FormInstance } from 'vant'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoMark from '@/assets/logo.webp'
import { openSuccessToast } from '@/components/toast/toast'
import { useUserStore } from '@/stores/user'
import type { ILoginForm } from '@/types/user'
import { isMobile, isPassword } from '@/utils/validate'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const form = reactive<ILoginForm>({
  mobile: '13800138000',
  password: 'abc12345',
})

// 控制密码显示隐藏
const showPassword = ref(false)

/**
 * 切换密码显示隐藏状态。
 * @param 无入参。
 * @returns 无返回结果。
 */
function togglePasswordVisibility(): void {
  showPassword.value = !showPassword.value
}

/**
 * 获取登录成功后的跳转地址。
 * @param 无入参。
 * @returns 目标路由地址。
 */
function getRedirectPath(): string {
  return String(route.query.redirect || '/home')
}

/**
 * 提交登录表单。
 * @param 无入参。
 * @returns 无返回结果。
 */
async function handleSubmit(): Promise<void> {
  await formRef.value?.validate()
  userStore.loginByDemo(form)
  openSuccessToast('登录成功，欢迎回来')
  router.replace(getRedirectPath())
}
</script>

<template>
  <div class="page-shell neu-bg !px-4 !pb-6 !pt-12 min-h-screen">
    <section class="neu-card rounded-4xl px-6 py-8">
      <div class="flex flex-col items-center gap-4 mb-8">
        <div class=" p-4 ">
          <img class="h-10 w-26" :src="logoMark" alt="logo" />
        </div>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-[#134E4A]">欢迎登录</h1>
        </div>
      </div>

      <van-form ref="formRef" class="space-y-6" @submit="handleSubmit">
        <div class="space-y-4">
          <div class="neu-input rounded-2xl overflow-hidden">
            <van-field
              v-model="form.mobile"
              name="mobile"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[
                { required: true, message: '请输入手机号' },
                { validator: isMobile, message: '请输入正确的手机号' },
              ]"
            />
          </div>

          <div class="neu-input rounded-2xl overflow-hidden">
            <van-field
              v-model="form.password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              label="密码"
              placeholder="请输入密码"
              :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
              :rules="[
                { required: true, message: '请输入密码' },
                { validator: isPassword, message: '密码需为 6-20 位字母数字组合' },
              ]"
              @click-right-icon="togglePasswordVisibility"
            />
          </div>
        </div>

        <div class="pt-4 space-y-4">
          <button type="submit" class="neu-btn w-full h-12 rounded-3xl font-semibold text-lg flex items-center justify-center">
            登 录
          </button>
        </div>
      </van-form>
    </section>
  </div>
</template>

<style scoped>
.neu-bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to right, #e1f2fc,#daf0fd);
}

.neu-card {
  background: #f0fdfa;
}

.neu-icon-wrapper {
  background: #f0fdfa;
  box-shadow: 8px 8px 16px #c9d8d5, -8px -8px 16px #ffffff;
}

.neu-input {
  background: #f0fdfa;
  box-shadow: inset 6px 6px 12px #c9d8d5, inset -6px -6px 12px #ffffff;
}

.neu-btn {
  background: #0891b2;
  box-shadow: 6px 6px 12px #c9d8d5, -6px -6px 12px #ffffff;
  color: white;
  transition: all 0.2s ease-in-out;
  border: none;
  cursor: pointer;
}

.neu-btn:active {
  box-shadow: inset 4px 4px 8px #06748e, inset -4px -4px 8px #0aaee6;
}

/* 穿透修改 vant 样式 */
:deep(.van-cell) {
  background: transparent !important;
  padding: 16px;
}
:deep(.van-cell::after) {
  display: none;
}
:deep(.van-field__control) {
  color: #134e4a;
  font-weight: 500;
}
:deep(.van-field__control::placeholder) {
  color: #99f6e4;
}
:deep(.van-field__label) {
  color: #0f766e;
  font-weight: 600;
}
:deep(.van-field__right-icon) {
  color: #0d9488;
}
</style>
