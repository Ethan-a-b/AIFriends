<script setup>
import {computed, nextTick, ref, useTemplateRef} from "vue";
import InputField from "@/components/character/chat_field/input_field/InputField.vue";
import CharacterPhotoField from "@/components/character/chat_field/character_photo_field/CharacterPhotoField.vue";
import ChatHistory from "@/components/character/chat_field/chat_history/ChatHistory.vue";

const props = defineProps(['friend'])
const modalRef = useTemplateRef('modal-ref')
const inputRef = useTemplateRef('input-ref')
const chatHistoryRef = useTemplateRef('chat-history-ref')
const history = ref([])

async function showModal() {
  modalRef.value.showModal()

  await nextTick()
  inputRef.value?.focus()

}

const modalStyle = computed(() => {
  if (props.friend) {
    return {
      backgroundImage: `url(${props.friend.character.background_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  } else {
    return {}
  }
})

function handlePushBackMessage(msg) {
  history.value.push(msg)
  chatHistoryRef.value.scrollToBottom()
}

function handleAddToLastMessage(delta) {
  history.value.at(-1).content += delta
  chatHistoryRef.value.scrollToBottom()
}

function handlePushFrontMessage(msg) {
  history.value.unshift(msg)
}

defineExpose({
  showModal,
})
</script>

<template>
  <dialog ref="modal-ref" class="modal">
    <div class="modal-box relative h-150 max-h-[82vh] w-[min(92vw,380px)] overflow-hidden rounded-3xl border border-white/10 p-0 shadow-2xl" :style="modalStyle">
      <!-- 顶部渐变压暗：让角色胶囊和消息都看得清 -->
      <div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/55 to-transparent"></div>
      <!-- 底部渐变压暗：衬托输入框 -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/60 to-transparent"></div>

      <button
        @click="modalRef.close()"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30 border-0 bg-black/25 text-white/80 hover:bg-black/45 hover:text-white"
      >✕</button>

      <ChatHistory
        ref="chat-history-ref"
        v-if="friend"
        :history="history"
        :friendId="friend.id"
        :character="friend.character"
        @pushFrontMessage = "handlePushFrontMessage"
      />
      <InputField
          v-if="friend"
          ref="input-ref"
          :friendId = "friend.id"
          @pushBackMessage="handlePushBackMessage"
          @addToLastMessage="handleAddToLastMessage"
      />
      <CharacterPhotoField v-if="friend" :character="friend.character" />
    </div>
  </dialog>
</template>

<style scoped>

</style>
