<script setup>

import MicIcon from "@/components/character/icons/MicIcon.vue";
import SendIcon from "@/components/character/icons/SendIcon.vue";
</script>

<template>
  <!-- 外层定位容器 -->
  <div class="absolute bottom-4 left-4 right-4">

    <!-- 输入框与按钮的包裹层 -->
    <div class="flex items-center w-full h-11 bg-black/40 backdrop-blur-md rounded-full border border-white/20 pl-4 pr-2 transition-all duration-300 focus-within:border-white/50 focus-within:bg-black/60 focus-within:shadow-[0_0_12px_rgba(255,255,255,0.2)]">

      <!-- 文本输入区 -->
      <input
        class="flex-1 min-w-0 bg-transparent text-white  text-sm placeholder-gray-300 outline-none h-full"
        type="text"
        placeholder="输入文本聊聊天..."
      >

      <!-- 右侧按钮区 -->
      <div class="flex items-center gap-1 ml-2">

        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer">
          <MicIcon />
        </button>

        <button class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-400 text-white transition-colors cursor-pointer">
          <SendIcon />
        </button>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>