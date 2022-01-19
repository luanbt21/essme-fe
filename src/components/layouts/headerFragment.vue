<template>
  <h1>fhaksfhk</h1>
  <!-- <el-button @click="">Login</el-button> -->
  <router-link to="/"><el-button @click="">Home</el-button></router-link>
  <router-link to="/register"><el-button v-if="!isLogin" @click="">Register</el-button></router-link>
  <router-link to="/Login"><el-button v-if="isLogin" @click="handleClick">Logout</el-button></router-link>
  <span v-if="isLogin">Logged in as {{}}</span>
  <!-- <router-link to="/Login"><el-button v-if="!isLogin" @click="">Login</el-button></router-link> -->
</template>

<script setup lang="ts">
import { useStore } from '~/store/index'
import { computed } from 'vue'
const store = useStore()
const handleClick = () => {
  store.dispatch('auth/logout')
}
const isLogin = computed(() => store.state.auth.user)
</script>
