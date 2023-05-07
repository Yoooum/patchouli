<script setup>
import { ref } from 'vue'
import { rules } from '../form'

// 定义从父组件传递过来的props: menuTreeData
const { menuTreeData = [] } = defineProps({
  menuTreeData: { type: Array, default: () => [] },
})
// 定义向父组件传递的事件: saveData
const emit = defineEmits(['saveData'])

const show = ref(false)
const formRef = ref()
const form = ref({
  data: {
    id: undefined,
    name: '',
    description: '',
    menus: [],
  },
  type: 'add',
  handleSubmit: () => {
    formRef.value.validate((errors) => {
      if (errors)
        return
      emit('saveData', form.value.data)
    })
  },
  openDrawer: (type, data) => {
    form.value.type = type
    form.value.data = data
    show.value = true
  },
  closeDrawer: () => {
    show.value = false
  },
})

defineExpose({
  show,
  form,
})
</script>

<template>
  <n-drawer v-model:show="show" :mask-closable="false" :width="500">
    <n-drawer-content
      closable
      :title="['添加角色', '修改角色'][Number(form.type === 'edit')]"
      :native-scrollbar="false"
    >
      <n-form
        ref="formRef"
        label-placement="left"
        require-mark-placement="right-hanging"
        :model="form.data"
        :rules="rules"
      >
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="form.data.name" placeholder="请输入角色名称" clearable />
        </n-form-item>
        <n-form-item label="角色描述" path="description">
          <n-input
            v-model:value="form.data.description" placeholder="请输入角色描述" clearable
            class="w-full" type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
        <n-form-item label="菜单权限">
          <n-tree
            v-model:checked-keys="form.data.menu"
            :data="menuTreeData"
            block-line
            cascade
            checkable
            check-on-click
            default-expand-all
            :selectable="false"
          />
        </n-form-item>
      </n-form>
      <pre>{{ form }}</pre>
      <template #footer>
        <n-space>
          <n-button type="primary" @click="form.handleSubmit()">
            保存
          </n-button>
          <n-button type="primary" @click="form.closeDrawer()">
            取消
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
