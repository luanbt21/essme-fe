import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import axios from 'axios'

import 'element-plus/dist/index.css'
import '~/styles/index.scss'

import router from './router'
import { store, key } from './store'

import App from './App.vue'

axios.defaults.baseURL = 'https://essme.duckdns.org/api/'

const app = createApp(App)
// app.use(ElementPlus)
app.use(store, key)
app.use(router)
app.mount('#app')
