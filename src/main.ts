import { computed, createApp } from 'vue'
import ElementPlus from 'element-plus'
import axios from 'axios'

import 'element-plus/dist/index.css'
import '~/styles/index.scss'
import './index.css'
import { i18n } from "~/i18n/i18n";


import router from './router'
import { store, key, useStore } from './store'

import App from './App.vue'
import { __baseURL } from './constant'

import { getAuth } from 'firebase/auth'
// const store1 = useStore()

axios.defaults.baseURL = __baseURL
// axios.defaults.headers.common['Authorization'] = 'Bearer' + store1.state.auth.token

const app = createApp(App);
// app.use(ElementPlus)
app.use(store, key)
app.use(router)
app.use(i18n)
app.use(store);
app.mount('#app')



