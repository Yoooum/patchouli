<script setup>

</script>

<template>
  <slot />
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>

<style scoped>

</style>
