<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <router-link to="questions">Questions</router-link>
    <el-button style="padding: 0" @click="$emit('toggle-lang')"><img class="svg" :src="flag" /></el-button>
    <el-button @click="login">Login</el-button>
    <el-button @click="logout">Logout</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '~/store/index'
const store = useStore()

const login = () => {
  store.commit('auth/auth', true)
}

const logout = () => {
  store.commit('auth/auth', false)
}

const props = defineProps({
  flag: String
})
</script>

<style scoped>
.svg {
  height: 1.5rem;
  width: auto;
}
</style>
