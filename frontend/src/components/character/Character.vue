<script setup>
import {ref, useTemplateRef} from "vue";
import {useUserStore} from "@/stores/user.js";
import UpdateIcon from "@/components/character/icons/UpdateIcon.vue";
import RemoveIcon from "@/components/character/icons/RemoveIcon.vue";
import api from "@/js/http/api.js";
import ChatField from "@/components/character/chat_field/ChatField.vue";
import {useRouter} from "vue-router";

const props = defineProps(['character','canEdit','canRemoveFriend','friendId'])
const emit = defineEmits(['remove'])
const isHover = ref(false)
const user = useUserStore()
const router = useRouter()

async function handleRemoveCharacter() {
  try {
    const res = await api.post('/api/create/character/remove/',{
      character_id: props.character.id,
    })
    if (res.data.result === 'success') {
      emit('remove',props.character.id)
    }
  } catch (err) {

  }
}

async function handleRemoveFriend() {
  try {
    const res = await api.post('/api/friend/remove/', {
      friend_id: props.friendId,
    })
    if (res.data.result === 'success') {
      emit('remove',props.friendId)
    }
  } catch (err) {

  }

}

const chatFieldRef = useTemplateRef('chat-field-ref')
const friend = ref(null)

async function openChatField() {
  if (!user.isLogin()) {
    await router.push ({
      name:'user-account-login-index'
    })
  } else {
    try {
      const res = await api.post('/api/friend/get_or_create/', {
        character_id: props.character.id,
      })
      const data = res.data
      if (data.result === 'success') {
        friend.value = data.friend
        chatFieldRef.value.showModal()
      }
    } catch (err) {

    }
  }
}
</script>

<template>
  <div>
    <div class="avatar cursor-pointer" @mouseover="isHover=true" @mouseout="isHover=false" @click="openChatField">
      <!-- 1. 给外层卡片加上 overflow-hidden，防止图片放大时溢出圆角 -->
      <div class="w-60 h-100 rounded-2xl relative overflow-hidden bg-gray-100">

        <!-- 背景图 -->
        <img :src="character.background_image" class="w-full h-full object-cover transition-transform duration-300" :class="{'scale-120':isHover}" alt="">

        <!-- 2. 右上角操作按钮 (调整了位置到右上角，使用 z-20 确保在最上层) -->
        <div v-if="canEdit && character.author.user_id === user.id" class="absolute right-2 top-2 flex flex-col gap-2 z-20">
          <RouterLink @click.stop :to="{name: 'update-character',params:{character_id:character.id}}" class="btn btn-circle btn-ghost bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm">
            <UpdateIcon/>
          </RouterLink>
          <button @click.stop="handleRemoveCharacter" class="btn btn-circle btn-ghost bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm">
            <RemoveIcon/>
          </button>
        </div>

        <div v-if="canRemoveFriend" class="absolute right-0 top-50">
          <button @click.stop="handleRemoveFriend" class="btn btn-circle btn-ghost bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm">
            <RemoveIcon />
          </button>
        </div>

        <!-- 3. 【核心】底部半透明浅灰渐变信息面板 -->
        <!-- bg-gradient-to-t 表示从下往上渐变；from-gray-200/90 代表底部是90%透明度的浅灰色；to-transparent 代表顶部完全透明；pt-12 给顶部留出空间让渐变自然过渡 -->
        <div class="absolute bottom-0 left-0 right-0 z-10 p-4 pt-10 bg-gradient-to-t from-gray-100/80 via-gray-100/60 to-transparent">

          <!-- 头像和名字横向排列 -->
          <div class="flex items-center gap-3">
            <!-- 头像 -->
            <div class="w-16 h-16 rounded-full ring-2 ring-white overflow-hidden bg-white shrink-0 shadow-sm">
              <img :src="character.photo" class="w-full h-full object-cover" alt="avatar">
            </div>
            <!-- 名字 (由于背景变浅，文字改成深色) -->
            <div class="text-xl font-bold text-gray-800 line-clamp-1 break-all">
              {{ character.name }}
            </div>
          </div>

          <!-- 简介 (放在头像下方) -->
          <div class="mt-3 text-sm text-gray-700 line-clamp-3 break-all leading-relaxed">
            {{ character.profile }}
          </div>

        </div>
      </div>
    </div>
    <RouterLink :to="{name: 'user-space-index',params:{user_id: character.author.user_id}}" class="flex items-center mt-4 gap-2 w-60 cursor-pointer">
      <div class="avatar">
        <div class="w-7 rounded-full">
          <img :src="character.author.photo" alt="">
        </div>
      </div>
      <div class="text-sm line-clamp-1 break-all">{{ character.author.username }}</div>
    </RouterLink>

    <ChatField ref="chat-field-ref" :friend="friend" />
  </div>
</template>

<style scoped>

</style>