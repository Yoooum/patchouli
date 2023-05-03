<script setup>
import { ref } from 'vue'
import { rules } from '../form'

// 定义从父组件传递过来的props: menuTreeData
const { roleOptions = [] } = defineProps({
  roleOptions: { type: Array, default: () => [] },
})
// 定义向父组件传递的事件: saveData
const emit = defineEmits(['saveData'])

const show = ref(false)
const formRef = ref()
const form = ref({
  data: {
    id: undefined,
    username: '',
    password: '',
    email: '',
    phone: '',
    role: undefined,
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
      :title="['添加用户', '修改用户'][Number(form.type === 'edit')]"
      :native-scrollbar="false"
    >
      <n-form
        ref="formRef"
        label-placement="left"
        label-align="right"
        require-mark-placement="right-hanging"
        :model="form.data"
        :rules="rules"
      >
        <n-form-item label="用户账号" path="username">
          <n-input v-model:value="form.data.username" type="text" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item label="用户密码" path="password">
          <n-input
            v-model:value="form.data.password" type="password" placeholder="请输入密码"
            :input-props="{ autocomplete: 'new-password' }" show-password-on="click"
          />
        </n-form-item>
        <template v-if="form.type === 'edit'">
          <n-form-item label="用户邮箱" path="email">
            <n-input v-model:value="form.data.email" type="text" placeholder="请输入邮箱" />
          </n-form-item>
          <n-form-item label="用户手机" path="phone">
            <n-input v-model:value="form.data.phone" type="text" placeholder="请输入手机号" />
          </n-form-item>
        </template>
        <n-form-item label="用户角色">
          <n-select
            v-model:value="form.data.role"
            placeholder="请选择角色"
            :options="roleOptions"
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
