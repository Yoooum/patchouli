<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import { useAppStore } from '@/stores'

const app = useAppStore()
</script>

<template>
  <!-- 侧边栏展开按钮 -->
  <n-button text class="h-8 w-8" @click="app.current.collapsed = !app.current.collapsed">
    <n-icon :size="20">
      <template v-if="app.current.collapsed">
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
