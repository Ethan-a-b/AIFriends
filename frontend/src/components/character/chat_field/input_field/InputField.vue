<script setup>

import MicIcon from "@/components/character/icons/MicIcon.vue";
import SendIcon from "@/components/character/icons/SendIcon.vue";
import {ref, useTemplateRef} from "vue";
import streamApi from "@/js/http/streamApi.js";
let isProcessing = false

const props = defineProps(['friendId'])
const emit = defineEmits(['pushBackMessage','addToLastMessage'])
const inputRef = useTemplateRef('input-ref')
const message = ref('')

function focus() {
  // ⚠️ 增加判空，防止报错
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

async function handleSend() {
  if(isProcessing) return
  isProcessing = true

  const content = message.value.trim()
  if(!content) return
  message.value = ''

  emit('pushBackMessage',{role:'user',content:content,id:crypto.randomUUID()})
  emit('pushBackMessage',{role:'ai', content:'', id: crypto.randomUUID()})

  try {
    await streamApi('/api/friend/message/chat/',{
      body: {
        friend_id: props.friendId,
        message: content,
      },
      onmessage(data,isDone){
        if(isDone) {
          isProcessing = false
        } else if (data.content) {
          emit('addToLastMessage',data.content)
        }
      },
      onerror(err) {
        isProcessing = false
      },
    })
  } catch (err) {

    isProcessing = false
  }


}

defineExpose({
  focus,
})
</script>

<template>
  <!-- 外层定位容器 -->
  <form @submit.prevent="handleSend" class="absolute bottom-4 left-4 right-4">

    <!-- 输入框与按钮的包裹层 -->
    <div class="flex items-center w-full h-11 bg-black/40 backdrop-blur-md rounded-full border border-white/20 pl-4 pr-2 transition-[background-color,border-color,box-shadow] duration-300 focus-within:border-white/50 focus-within:bg-black/60 focus-within:shadow-[0_0_12px_rgba(255,255,255,0.2)]">

      <!-- 文本输入区 -->
      <input
        ref="input-ref"
        v-model="message"
        class="flex-1 min-w-0 bg-transparent text-white  text-sm placeholder-gray-300 outline-none h-full"
        type="text"
        placeholder="输入文本聊聊天..."
      >

      <!-- 右侧按钮区 -->
      <div class="flex items-center gap-1 ml-2">

        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors cursor-pointer">
          <MicIcon />
        </button>

        <button @click="handleSend" class="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-400 text-white transition-colors cursor-pointer">
          <SendIcon />
        </button>

      </div>

    </div>
  </form>
</template>

<style scoped>

</style>