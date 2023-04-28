<script setup lang="ts">
import SideMenu from '@/layouts/components/sidebar/index.vue'
import TitleBar from '@/layouts/components/header/index.vue'
import { useAppStore } from '@/stores'
</script>

<template>
  <n-layout has-sider>
    <!-- 左：侧边栏菜单 -->
    <n-layout-sider
      :native-scrollbar="false"
      class="h-screen"
      collapse-mode="width"
      :collapsed="useAppStore().current.collapsed"
      :collapsed-width="64"
      :width="240"
      :show-trigger="false"
      bordered
    >
      <SideMenu />
    </n-layout-sider>
    <!-- 右：主体内容 -->
    <n-layout>
      <!-- 右上：头部 -->
      <n-layout-header>
        <TitleBar />
      </n-layout-header>
      <!-- 右下：内容 -->
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
  <!-- 全局抽屉 -->
</template>

<style scoped>

</style>
