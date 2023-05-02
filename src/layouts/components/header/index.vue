<script setup>
import Breadcrumb from './breadcrumb.vue'
import Collapsed from './collapsed.vue'
import ToggleTheme from '@/layouts/components/header/toggleTheme.vue'
import Avatar from '@/layouts/components/header/avatar.vue'
</script>

<template>
  <n-card size="small">
    <n-space justify="space-between" class="h-8">
      <n-space align="center">
        <Collapsed />
        <Breadcrumb />
      </n-space>
      <n-space>
        <ToggleTheme />
        <Avatar />
      </n-space>
    </n-space>
  </n-card>
</template>

<style scoped>

</style>
