<script setup>
import { Logout, UserAvatar } from '@vicons/carbon'
import { renderIcon } from '@/utils'
import { useUserStore} from "@/stores";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore()
userStore.fetchUser()
const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserAvatar),
      props: {
          onClick: () => router.push('/profile')
      },
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(Logout),
      props: {
          onClick: () => userStore.logout().then(() => router.push('/login'))
      },
  },
]

</script>

<template>
  <n-dropdown :options="options">
    <n-space>
      <n-button text class="h-8">
          {{ userStore.user.username }}
      </n-button>
      <n-button text class="h-8">
        <n-avatar round :size="40" :src="userStore.user.avatar" />
      </n-button>
    </n-space>
  </n-dropdown>
</template>

<style scoped>

</style>
