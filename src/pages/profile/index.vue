<script setup>
import { useUserStore } from '@/stores'

const user = useUserStore()
</script>

<template>
  <n-card>
    <n-space justify="start">
      <n-avatar
        round
        :size="128"
        :src="user.user.avatar"
      />
      <n-space vertical justify="center" class="w-full">
        <n-space align="baseline">
          <n-h2>
            {{ user.user.username }}
          </n-h2>
          <n-tag size="small" type="success">
            {{ user.user.role[0].description }}
          </n-tag>
        </n-space>
        <n-space>
          <n-h3>
            {{ user.user.email }}
          </n-h3>
        </n-space>
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
