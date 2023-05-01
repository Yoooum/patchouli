<script setup>
import { Moon, Sun } from '@vicons/carbon'
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <!-- 切换黑暗模式 -->
  <n-button text class="h-8 w-8" @click="app.current.dark = !app.current.dark">
    <n-icon :size="20">
      <template v-if="app.current.dark">
        <Sun />
      </template>
      <template v-else>
        <Moon />
      </template>
    </n-icon>
  </n-button>
</template>

<style scoped>

</style>
