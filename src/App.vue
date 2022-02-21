<template>
  <el-config-provider :locale="lang">
    <HomeHeader />
    <router-view :key="$route.fullPath" />
  </el-config-provider>
  <Testhomepageapi />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import usFlag from '~/assets/us.svg'
import vnFlag from '~/assets/vn.svg'

import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'
import HomeHeader from './components/layouts/HomeHeader.vue'
import Home from './views/Home.vue'
import Test from './views/Test.vue'

import ExpertOrCustomerStatus from './views/ExpertOrCustomerStatus.vue'
import Testhomepageapi from './views/testhomepageapi.vue'

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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(120, 131, 134);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
