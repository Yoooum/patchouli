<script setup>
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { computed } from 'vue'
import { useAppStore } from '@/stores'

const app = useAppStore()
const theme = computed(() => app.dark ? darkTheme : null)
function override() {
  if (!app.dark) {
    return {
      common: {
        primaryColor: '#312520',
        primaryColorHover: '#554437',
        primaryColorPressed: '#180F0B',
        primaryColorSuppl: '#8D6D5C',
        infoColor: '#6EB5D4',
        infoColorHover: '#4B8EA8',
        infoColorPressed: '#335C71',
        successColor: '#108448',
        successColorHover: '#0B6E38',
        successColorPressed: '#084624',
        warningColor: '#B27006',
        warningColorHover: '#916104',
        warningColorPressed: '#5C3E02',
        errorColor: '#E04D61',
        errorColorHover: '#B33C4A',
        errorColorPressed: '#8F2934',
        backgroundColor: '#F2E7DB',
      },
    }
  }
}
</script>

<template>
  <n-config-provider
    :theme="theme" :theme-overrides="override()"
    :locale="zhCN" :date-locale="dateZhCN"
  >
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
