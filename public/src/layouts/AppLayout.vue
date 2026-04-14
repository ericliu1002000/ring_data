<template>
  <div class="h-screen overflow-hidden bg-[#E6F7FF]">
    <main class="h-full">
      <router-view v-slot="{ Component }">
        <transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.page-slide-enter-active,
.page-slide-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
