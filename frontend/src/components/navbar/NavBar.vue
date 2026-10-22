<script setup>
import MenuIcon from "@/components/navbar/icons/MenuIcon.vue";
import HomepageIcon from "@/components/navbar/icons/HomepageIcon.vue";
import FriendIcon from "@/components/navbar/icons/FriendIcon.vue";
import CreateIcon from "@/components/navbar/icons/CreateIcon.vue";
import SearchIcon from "@/components/navbar/icons/SearchIcon.vue";
import {useUserStore} from "@/stores/user.js";
import UserMenu from "@/components/navbar/UserMenu.vue";

const user = useUserStore()
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-300 shadow-sm">
        <div class="navbar-start">
          <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost drawer-button">
           <MenuIcon/>
          </label>
          <div class="px-2 font-bold text-2xl">AIFriends</div>
        </div>

        <div class="navbar-center w-4/5 max-w-[480px] ml-4">
          <div class="flex items-center w-full rounded-full overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow">
            <input
              class="input flex-1 border-none outline-none px-4 py-2.5 text-base focus:ring-0"
              placeholder="搜索你感兴趣的内容"
            />
            <button class="btn bg-gray-100 hover:bg-gray-200 text-gray-700 border-none rounded-none px-5 py-2.5 transition-colors">
              <SearchIcon class="w-4 h-4 mr-1"/>
              搜索
            </button>
          </div>
        </div>


        <div class="navbar-end">
          <RouterLink v-if="user.isLogin()" :to="{name:'create-index'}" active-class="btn-active"  class="btn btn-ghost text-base mr-6">
            <CreateIcon />
              创作
          </RouterLink>
          <RouterLink v-if="!user.isLogin()" :to="{name:'user-account-login-index'}"  active-class="btn-active" class="btn btn-ghost text-lg">
          登录
          </RouterLink>
          <UserMenu v-else />
        </div>

      </nav>
      <!-- Page content here -->
      <slot>  </slot>

    </div>

    <div class="drawer-side is-drawer-close:overflow-visible">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-54">
        <!-- Sidebar content here -->
        <ul class="menu w-full grow">
          <!-- List item -->
          <li>
            <RouterLink :to="{name:'homepage-index'}" active-class="menu-focus" class=" is-drawer-close:tooltip is-drawer-close:tooltip-right py-3" data-tip="首页">
              <!-- Home icon -->
              <HomepageIcon/>
             <span class="is-drawer-close:hidden text-base ml-2 whitespace-nowrap">首页</span>
            </RouterLink>
          </li>

           <li>
            <RouterLink :to="{name:'friend-index'}" active-class="menu-focus" class="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3" data-tip="好友列表">
              <!-- Home icon -->
              <FriendIcon/>
             <span class="is-drawer-close:hidden text-base ml-2 whitespace-nowrap">好友列表</span>
            </RouterLink>
          </li>

          <li>
            <RouterLink :to ="{name:'create-index'}" active-class="menu-focus" class="is-drawer-close:tooltip is-drawer-close:tooltip-right py-3" data-tip="创作">
              <!-- Home icon -->
              <CreateIcon/>
             <span class="is-drawer-close:hidden text-base ml-2 whitespace-nowrap">创作</span>
            </RouterLink>
          </li>



        </ul>
      </div>
    </div>
  </div>

</template>

<style scoped>
  :deep(.menu li a.router-link-active),
  :deep(.menu li a.router-link-exact-active) {
    background-color: #e5e7eb !important;
    color: inherit !important;
  }

  :deep(.menu li > a:hover) {
    background-color: #e5e7eb;
  }

  :deep(.menu li > a:active) {
    background-color: black !important;
    color: white !important;
  }
</style>