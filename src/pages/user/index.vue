<script setup>
import { computed, ref } from 'vue'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { createTableData as fetchRoles } from '../role/table'
import UserFormDrawer from './components/UserFormDrawer.vue'
import { createTableColumns, createTableData } from './table'
import SearchForm from '@/pages/role/components/SearchForm.vue'

const message = useMessage()
const refSearch = ref()
const refDrawer = ref()
const tableData = ref([])
const loading = ref(false)

fetchTableData()
function fetchTableData(search) {
  loading.value = true
  try {
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
    createTime: new Date().toLocaleString(),
    updateTime: new Date().toLocaleString(),
  }
  const add = () => tableData.value.push({ ...data, ...init })
  const edit = () => {
    data.updateTime = init.updateTime
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

// 根据 value 获取 label，<n-select /> 的 value 为 id, label 为 name, 在表格中，需要显示的是 name
function valueToLabel(value = -1, options) {
  const option = options.find(item => item.value === value)
  return option?.label ?? '-'
}

const columns = createTableColumns({
  onUpdateRole,
  onRemoveRole,
  valueToLabel: value => valueToLabel(value, roleOptions.value),
})

const roleOptions = computed(() => {
  const roles = fetchRoles()
  return roles.map(item => ({
    label: item.name,
    value: item.id,
  }))
})
</script>

<template>
  <n-card title="用户管理">
    <template #header-extra>
      <NSpace>
        <NButton type="primary" @click="openDrawer('add')">
          添加
        </NButton>
      </NSpace>
    </template>
    <SearchForm ref="refSearch" @search="fetchTableData" />
    <n-data-table
      :loading="loading"
      :bordered="false"
      :columns="columns"
      :data="tableData"
      pagination
    />
  </n-card>
  <UserFormDrawer
    ref="refDrawer"
    :role-options="roleOptions"
    @save-data="onSaveData"
  />
</template>

<style scoped>

</style>
