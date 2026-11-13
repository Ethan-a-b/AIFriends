<script setup>
import {useUserStore} from "@/stores/user.js";

defineProps(['message','character'])

const user = useUserStore()
</script>

<template>
  <div v-if="message.content || message.role === 'ai'">
    <div v-if="message.role === 'ai'" class="chat chat-start">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full ring-2 ring-white/40">
          <img :src="character.photo" alt="">
        </div>
      </div>
      <div class="chat-bubble max-w-[78%] rounded-2xl rounded-tl-sm bg-white/85 text-neutral-800 shadow-sm backdrop-blur-sm leading-relaxed">
        <span v-if="message.content" class="whitespace-pre-wrap break-all">{{ message.content }}</span>
        <span v-else class="typing-dots"><i></i><i></i><i></i></span>
      </div>
    </div>
    <div v-else class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full ring-2 ring-white/40">
          <img :src="user.photo" alt="">
        </div>
      </div>
      <div class="chat-bubble max-w-[78%] rounded-2xl rounded-tr-sm border-0 bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-sm leading-relaxed">
        <span class="whitespace-pre-wrap break-all">{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typing-dots { display: inline-flex; gap: 4px; padding: 2px 0; }
.typing-dots i {
  width: 6px; height: 6px; border-radius: 50%;
  background: #6b7280; opacity: .5;
  animation: dot 1.2s infinite ease-in-out;
}
.typing-dots i:nth-child(2) { animation-delay: .2s; }
.typing-dots i:nth-child(3) { animation-delay: .4s; }
@keyframes dot {
  0%, 80%, 100% { transform: translateY(0); opacity: .35; }
  40% { transform: translateY(-4px); opacity: 1; }
}
</style>
