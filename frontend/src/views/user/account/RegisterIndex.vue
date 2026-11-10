<script setup>
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.js";
import {useRouter} from "vue-router";
import api from "@/js/http/api.js";

const username = ref('')
const password = ref('')
const passwordConfirmed = ref('')
const errorMessage = ref('')
const loading = ref(false)
const showPassword = ref(false)
const usernameInput = ref(null)

const user = useUserStore()
const router = useRouter()

const canSubmit = computed(
    () => username.value.trim() !== '' && password.value !== '' && passwordConfirmed.value !== ''
)

onMounted(() => {
  usernameInput.value?.focus()
})

async function handleRegister() {
  if (loading.value) return
  errorMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = '用户名不能为空'
    return
  }
  if (username.value.trim().length < 2) {
    errorMessage.value = '用户名至少 2 个字符'
    return
  }
  if (!password.value) {
    errorMessage.value = '密码不能为空'
    return
  }
  if (password.value !== passwordConfirmed.value) {
    errorMessage.value = '两次输入密码不一致'
    return
  }

  loading.value = true
  try {
    const res = await api.post('/api/user/account/register/', {
      username: username.value.trim(),
      password: password.value,
    })
    const data = res.data
    if (data.result === 'success') {
      user.setAccessToken(data.access)
      user.setUserInfo(data)
      await router.push({name: 'homepage-index'})
    } else {
      errorMessage.value = data.result || '注册失败，请稍后重试'
    }
  } catch (err) {
    errorMessage.value = err?.response?.data?.result || '网络异常，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-10">
    <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl"></div>

    <div class="relative w-full max-w-sm">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-semibold tracking-wide">AIFriends</h1>
        <p class="mt-1 text-sm text-base-content/60">创建一个账号，开始你的角色故事</p>
      </div>

      <form
          class="rounded-2xl border border-base-300/70 bg-base-100/80 p-6 shadow-xl backdrop-blur"
          @submit.prevent="handleRegister"
      >
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium text-base-content/70">用户名</span>
          <input
              ref="usernameInput"
              v-model="username"
              :disabled="loading"
              autocomplete="username"
              class="app-input input input-bordered w-full"
              placeholder="请输入用户名"
              type="text"
          />
        </label>

        <label class="mt-4 block">
          <span class="mb-1.5 block text-sm font-medium text-base-content/70">密码</span>
          <span class="relative block">
            <input
                v-model="password"
                :disabled="loading"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="app-input input input-bordered w-full pr-11"
                placeholder="请输入密码"
            />
            <button
                class="btn btn-ghost btn-xs absolute right-2 top-1/2 -translate-y-1/2 text-base-content/60"
                tabindex="-1"
                type="button"
                @click="showPassword = !showPassword"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
            </button>
          </span>
        </label>

        <label class="mt-4 block">
          <span class="mb-1.5 block text-sm font-medium text-base-content/70">确认密码</span>
          <input
              v-model="passwordConfirmed"
              :disabled="loading"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              class="app-input input input-bordered w-full"
              placeholder="请再次输入密码"
          />
        </label>

        <div
            v-if="errorMessage"
            class="mt-4 flex items-start gap-2 rounded-lg bg-error/10 px-3 py-2 text-sm text-error"
        >
          <span class="mt-0.5">!</span>
          <span>{{ errorMessage }}</span>
        </div>

        <button
            class="btn btn-neutral mt-5 w-full"
            :disabled="loading || !canSubmit"
            type="submit"
        >
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          {{ loading ? '注册中…' : '注册' }}
        </button>

        <div class="mt-3 text-center text-sm text-base-content/60">
          已经有账号了？
          <RouterLink :to="{name: 'user-account-login-index'}"
                      class="link link-hover text-primary">去登录
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.app-input {
  transition: border-color .18s ease, box-shadow .18s ease, background-color .18s ease;
}

.app-input:focus,
.app-input:focus-within {
  outline: none !important;
  border-width: 1px;
  border-color: color-mix(in srgb, var(--color-primary, #6366f1) 45%, var(--color-base-300, #d1d5db));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary, #6366f1) 8%, transparent);
}

.app-input::-ms-reveal,
.app-input::-ms-clear {
  display: none;
}
</style>
