<script setup>
import { computed, ref } from 'vue'
import { NButton, NSpace, useMessage } from 'naive-ui'
import RoleFormDrawer from './components/RoleFormDrawer.vue'
import { createTableColumns, createTableData } from './table'
import { useAppStore, useAuthStore } from '@/stores'
import { currentTimestamp, renderIcon } from '@/utils'
import { APP_MENU } from '@/config'
import SearchForm from '@/pages/role/components/SearchForm.vue'

const message = useMessage()
const app = useAppStore()
const auth = useAuthStore()
const refSearch = ref()
const refDrawer = ref()
const tableData = ref([])
const loading = ref(false)

fetchTableData()

function fetchTableData(search) {
  loading.value = true
  try {
    console.log('search', search)
    tableData.value = createTableData(search)
  }
  finally {
    loading.value = false
  }
}

// type 为 add 时，data 为空对象，edit 时，data 为当前行数据
function openDrawer(type, data) {
  if (type !== 'add' && type !== 'edit')
    throw new Error('type must be add or edit')
    // add 时，data 为空对象，需要设置默认值
  if (type === 'add') {
    data = {
      ...refDrawer.value?.data,
    }
  }
  refDrawer.value?.form.openDrawer(type, data)
}
function onUpdateRole(data) {
  // 解构赋值，防止修改原数据
  data = { ...data }
  openDrawer('edit', data)
}

function onSaveData(data) {
  const init = {
    id: tableData.value.length + 1,
    // yyyy-MM-dd HH:mm:ss
    createAt: currentTimestamp(),
    updateAt: currentTimestamp(),
  }
  const add = () => tableData.value.push({ ...data, ...init })
  const edit = () => {
    data.updateAt = init.updateAt
    const index = tableData.value.findIndex(item => item?.id === data.id)
    tableData.value.splice(index, 1, data)
  }
  data.id ? edit() : add()
  message.success('保存成功')
  refDrawer.value?.form.closeDrawer()
}
function onRemoveRole(data) {
  const index = tableData.value.findIndex(item => item?.id === data.id)
  tableData.value.splice(index, 1)
  message.success('删除成功')
}
const columns = createTableColumns({
  onUpdateRole,
  onRemoveRole,
},
)

const menuTreeData = computed(() => {
  return auth.menu?.map((menu) => {
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
    <SearchForm
      ref="refSearch"
      @search="fetchTableData"
    />
    <n-data-table
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      pagination
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
