<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Loading from '@/components/loading/Loading.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const { loading } = storeToRefs(appStore)
</script>

<template>
  <router-view />
  <Loading :show="loading" />
</template>
