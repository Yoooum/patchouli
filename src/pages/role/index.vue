<script setup>
import { computed, ref } from 'vue'
import {NButton, NSpace, useMessage} from 'naive-ui'
import RoleFormDrawer from '@/pages/role/components/RoleFormDrawer.vue'
import { useAppStore } from '@/stores'
import { renderIcon } from '@/utils'
import { APP_MENU } from '@/config'
import { createTableColumns, createTableData } from '@/pages/role/table'
const message = useMessage()
const app = useAppStore()
const refDrawer = ref()
const tableData = ref([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  pageSizes: [10, 20, 30, 40, 50],
})

fetchTableData()
function fetchTableData() {
  loading.value = true
  try {
    tableData.value = createTableData()
    pagination.value.itemCount = tableData.value.length
  }
  finally {
    loading.value = false
  }
}

function openDrawer(type, data) {
  if (type !== 'add' && type !== 'edit')
    throw new Error('type must be add or edit')
  if (type === 'add') {
      data = {
        ...refDrawer.value?.data
      }
  }
  refDrawer.value?.form.openDrawer(type, data)
}
function onUpdateRole(data) {
  openDrawer('edit', data)
}

function onSaveData(data) {
  const add = () => tableData.value.push({ ...data })
  const edit = () => {
    const index = tableData.value.findIndex((item) => item.id === data.id)
    tableData.value.splice(index, 1, data)
  }
  data.id ? edit() : add()
  message.success('保存成功')
}
function onRemoveRole(data) {

}
const columns = createTableColumns({
  onUpdateRole,
  onRemoveRole,
},
)

const menuTreeData = computed(() => {
  return app.menus.map((menu) => {
    return {
      label: menu.label,
      key: menu.id,
      prefix: (menu.icon && APP_MENU.iconMap[menu.icon])
          ? renderIcon(APP_MENU.iconMap[menu.icon])
          : renderIcon(APP_MENU.iconMap.extension),
      children: menu.children?.map((child) => {
        return {
          label: child.label,
          key: child.id,
        }
      }),
    }
  })
})
</script>

<template>
  <n-card title="角色管理">
    <template #header-extra>
      <NSpace>
        <NButton type="primary" @click="openDrawer('add')">
          添加
        </NButton>
      </NSpace>
    </template>
    <n-data-table
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
    />
  </n-card>
  <RoleFormDrawer
    ref="refDrawer"
    :menu-tree-data="menuTreeData"
    @save-data="onSaveData"
  />
</template>

<style scoped>

</style>
