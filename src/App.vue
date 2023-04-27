<script setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { computed } from 'vue'
import { useAppStore } from '@/stores'

const app = useAppStore()
const { dark } = app.current
const theme = computed(() => dark ? darkTheme : null)
</script>

<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <router-view />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
