<template>
  <div class="p-1 shadow-sm space-x-4">
    <div v-if="user" class="flex items-center">
      <el-avatar :size="30" :src="user?.photoURL"></el-avatar>
      <p class="ml-[10px]">{{ user?.displayName }}</p>
    </div>
    <div class="shrink-0 mb-[15px]">
      <span class="ml-[5px] line-clamp-3 mt-[4px]">{{ response.content }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Response } from '~/models/Request'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'
const user = ref<User>()
const props = defineProps<{
  response: Response
}>()
onMounted(async () => {
  user.value = await getUserById(props.response.uid)
})
</script>
