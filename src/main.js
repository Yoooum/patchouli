import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'virtual:uno.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)

app.mount('#app')
