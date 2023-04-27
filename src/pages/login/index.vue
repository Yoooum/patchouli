<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const form = ref({
  login: {
    account: '',
    password: '',
  },
})

function signIn() {
  const { account, password } = form.value.login
  if (!account || !password)
    message.error('请输入账号和密码')
}
</script>

<template>
  <transition name="slide-fade">
    <n-card class="w-300px">
      <n-tabs>
        <n-tab-pane name="sign-in" tab="登录">
          <n-form>
            <n-input v-model:value="form.login.account" class="mb-6 mt-2" type="text" placeholder="账号" />
            <n-input v-model:value="form.login.password" class="mb-6" type="password" show-password-on="click" placeholder="密码" />
          </n-form>
          <n-button type="primary" block strong @click="signIn">
            登录
          </n-button>
          <n-divider />
          <div class="flex flex-col items-start">
            <n-button class="mb-2" text type="primary" size="tiny">
              第三方登录
            </n-button>
            <n-button text type="primary" size="tiny">
              忘记密码？
            </n-button>
          </div>
        </n-tab-pane>
        <n-tab-pane name="sign-up" tab="注册">
          <n-form>
            <n-input v-model:value="form.login.account" class="mb-6 mt-2" type="text" placeholder="账号" />
            <n-input v-model:value="form.login.password" class="mb-6" type="password" show-password-on="click" placeholder="密码" />
          </n-form>
          <n-button type="primary" block strong @click="signIn">
            登录
          </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </transition>
</template>

<style scoped></style>
