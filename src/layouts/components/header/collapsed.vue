<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <!-- 侧边栏展开按钮 -->
  <n-button class="h-8" text @click="app.collapsed = !app.collapsed">
    <n-icon :size="20">
      <template v-if="app.collapsed">
        <MenuUnfoldOutlined />
      </template>
      <template v-else>
        <MenuFoldOutlined />
      </template>
    </n-icon>
  </n-button>
</template>

<style scoped>

</style>
