<script setup>
defineProps(['userProfile'])
</script>

<template>
  <div v-if="userProfile" class="flex flex-col sm:flex-row items-center sm:items-start mt-8 sm:mt-12 gap-4 sm:gap-0 px-4 sm:px-0 w-full">
    <div class="avatar shrink-0">
      <div class="w-24 sm:w-44 rounded-full">
        <img :src="userProfile.photo" alt="">
      </div>
    </div>
    <div class="flex flex-col justify-center w-full sm:w-64 sm:h-44 sm:ml-6 text-center sm:text-left min-w-0">
      <div class="text-xl sm:text-2xl font-bold line-clamp-1 break-all">{{ userProfile.username }}</div>
      <div class="text-sm text-gray-500 mt-2">AIFriends号:{{ userProfile.user_id }}</div>
      <div class="text-sm sm:h-20 mt-3 sm:mt-4 line-clamp-3 sm:line-clamp-4 break-all">{{ userProfile.profile }}</div>
    </div>
  </div>
</template>