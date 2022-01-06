<template>
  <el-config-provider :locale="lang">
    <Header @toggle-lang="toggleLang" :flag="flag" />
    <el-date-picker />
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import usFlag from '@/assets/us.svg'
import vnFlag from '@/assets/vn.svg'

import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'
import Header from './components/layouts/Header.vue'

const lang = ref(vi)
const flag = ref(usFlag)

const toggleLang = () => {
  if (flag.value === usFlag) {
    window.localStorage.setItem('lang', 'en')
    flag.value = vnFlag
    lang.value = en
  } else {
    window.localStorage.setItem('lang', 'vi')
    flag.value = usFlag
    lang.value = vi
  }
}

onMounted(() => {
  const favLang = window.localStorage.getItem('lang')
  if (favLang === 'en') {
    lang.value = en
    flag.value = vnFlag
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
