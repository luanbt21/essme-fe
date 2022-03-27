<style>
.demo-shadow {
  background-color: #95c2b0;
  height: 70px;
}
</style>

<template>
  <div
    class="demo-shadow p-2 hover:cursor-pointer hover:text-white hover:drop-shadow-lg grid items-center border-[1px]"
    :style="{ boxShadow: `var(--el-box-shadow-base')` }"
  >
    <span
      ><b>{{ user?.displayName }}</b></span
    >
    <span> has made a new comment on your question</span>
    <!-- <span class="line-clamp-1">{{ answer.answer }}</span> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Answer } from '~/models/Question'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'

const user = ref<User>()
onMounted(async () => {
  user.value = await getUserById(props.answer.uid)
})

const props = defineProps<{
  answer: Answer
}>()
</script>
