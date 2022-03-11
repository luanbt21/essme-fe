<template>
  <div class="p-6 mb-[15px] shadow-lg space-x-4">
    <div v-if="user" class="flex mb-[15px] items-center">
      <el-avatar :size="40" :src="user?.photoURL"></el-avatar>
      <p class="ml-[10px]">{{ user?.displayName }}</p>
    </div>
    <div class="shrink-0 mb-[15px]">
      <span class="ml-[5px] line-clamp-3 mt-[4px]">{{ answer.answer }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Answer } from '~/models/Question'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'
const user = ref<User>()
const props = defineProps<{
  answer: Answer
}>()
onMounted(async () => {
  user.value = await getUserById(props.answer.uid)
})
</script>
