<style>
.demo-shadow {
  background-color: #95c2b0;
  height: 70px;
}
</style>

<template>
  <div v-for="item in 20" :key="item" class="scrollbar-demo-item">
    <div
      class="demo-shadow p-2 hover:text-white hover:drop-shadow-lg grid items-center justify-items-center"
      :style="{ boxShadow: `var(--el-box-shadow-base')` }"
    >
      f
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(async () => {
  fieldsArr.value = await getFields()
  FQAs.value = await getQuestion(30)
  console.log(store.state.auth.userid)
})
</script>
