import { createRouter, createWebHistory } from 'vue-router'
import HomepageIcon from "@/components/navbar/icons/HomepageIcon.vue";
import HomepageIndex from "@/views/homepage/HomepageIndex.vue";
import FriendIndex from "@/views/friend/FriendIndex.vue";
import CreateIndex from "@/views/create/CreateIndex.vue";
import ErrorIndex from "@/views/error/ErrorIndex.vue";
import LoginIndex from "@/views/user/account/LoginIndex.vue";
import RegisterIndex from "@/views/user/account/RegisterIndex.vue";
import SpaceIndex from "@/views/user/space/SpaceIndex.vue";
import ProfileIndex from "@/views/user/profile/ProfileIndex.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:HomepageIndex,
      name:'homepage-index',
    },
    {
      path:'/friend/',
      component:FriendIndex,
      name:'friend-index',
    },
    {
      path:'/create/',
      component:CreateIndex,
      name:'create-index',
    },
    {
      path:'/error/',
      component:ErrorIndex,
      name:'error-index',
    },
    {
      path:'/user/account//login/',
      component:LoginIndex,
      name:'user-account-login-index',
    },
    {
      path:'/user/account/register/',
      component:RegisterIndex,
      name:'user-account-register-index',
    },
    {
      path:'/user/space/:user_id/',
      component:SpaceIndex,
      name:'user-space-index',
    },
    {
      path:'/user/profile/',
      component:ProfileIndex,
      name:'user-profile-index',
    },
    {
      path: '/:pathMatch(.*)*',
      component:ErrorIndex,
      name:'error'
    }
  ],
})

export default router
