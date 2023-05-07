<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { APP_MENU } from '@/config'
import { useAuthStore } from '@/stores'
import { renderIcon, renderLink } from '@/utils'

const auth = useAuthStore()
const route = useRoute()

// 通过当前路由的 path，找到对应的菜单项
const activeKey = computed(() => {
  const { path } = route
  const { menu } = auth
  // 遍历所有菜单项，如果有子菜单，就把子菜单也加进去。flatMap 会把数组中的数组展开，变成一个一维数组
  const allMenus = menu.flatMap(item => item.children ? [item, ...item.children] : [item])
  const item = allMenus.find(item => item.path === path)
  return item?.id
})

// 递归生成菜单项
function generateMenu(menu) {
  const { id, label, icon, path, children } = menu
  return {
    key: id,
    label: path ? renderLink(label, path) : label,
    icon: (icon && APP_MENU.iconMap[icon]) ? renderIcon(APP_MENU.iconMap[icon]) : undefined,
    path,
    children: children?.map(item => generateMenu(item)),
  }
}

// 生成菜单项
const options = auth.menu.map(item => generateMenu(item))
</script>

<template>
  <n-menu
    :value="activeKey"
    class="mt-2"
    :options="options"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :accordion="true"
  />
</template>

<style scoped>

</style>
