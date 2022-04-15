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
import { createI18n } from 'vue-i18n'
import VueI18n from 'vue-i18n';
// import i18n  from "@/plugins/i18n";
import vnMessage from './lang/vn.json'
import enMessage from './lang/en.json'
import { getAuth } from 'firebase/auth'
import type { MessageSchema, NumberSchema } from './lang.schema.ts'

type MessageSchema = typeof enMessage

// const store1 = useStore()
const i18n = createI18n({
  locale: 'vn',
  messages: {
    'vn': vnMessage,
    'en': enMessage,
  },
  fallbackLocale: 'vn',
})
// const i18n = createI18n<[MessageSchema], 'en' | 'vn'>({
//   lang: 'en',
//   messages: {
//     'en': enMessage
//   }
// })

axios.defaults.baseURL = __baseURL
// axios.defaults.headers.common['Authorization'] = 'Bearer' + store1.state.auth.token

const app = createApp(App);
// app.use(ElementPlus)
app.use(store, key)
app.use(router)
app.use(i18n)
app.use(store);
app.mount('#app')



