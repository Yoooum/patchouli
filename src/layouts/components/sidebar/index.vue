<script setup lang="ts">
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { APP_MENU } from '@/config'
import { useAppStore } from '@/stores'
import type {Menu} from "@/types/app";

const app = useAppStore()
const activeKey = ref('')
app.fetchMenus()

const renderIcon = ({icon, size}) => () => h(NIcon, { size }, { default: () => h(icon) })
const renderLink = (label, path) => () => h(RouterLink, { to: path }, { default: () => label })
function generateMenu(menu:Menu) {
  const { id, label, icon, path, children } = menu
  return {
    key: id,
    label: path ? renderLink(label, path) : label,
    icon: icon && APP_MENU.iconMap[icon] ? renderIcon(APP_MENU.iconMap[icon]) : undefined,
    path,
    children: children?.map(item => generateMenu(item)),
  }
}

const options = app.menus.map(item => generateMenu(item))
</script>

<template>
  <n-menu
    v-model:value="activeKey"
    class="mt-2"
    :options="options"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :accordion="true"
    :default-value="app.current.route"
  />
</template>

<style scoped>

</style>
