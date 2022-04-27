<template>
  <router-link :to="`/requests/${request._id}`">
    <div class="md:hover:scale-[1.02] hover:duration-500 p-6 mb-[15px] bg-white rounded-xl shadow-lg space-x-4">
      <div v-if="user" class="flex mb-[15px] items-center">
        <el-avatar :size="40" :src="user?.photoURL"></el-avatar>
        <p class="ml-[10px]">{{ user?.displayName }}</p>
      </div>
      <div class="shrink-0 flex mb-[15px]">
        <img class="h-6 w-6" src="../assets/question-mark.png" alt="Question Logo" />
        <span class="ml-[15px] min-w-[65px]">{{ $t('message.Request', {}, { locale: $i18n.locale }) }}: </span>
        <span class="ml-[10px] line-clamp-3">{{ request.content }} </span>
      </div>
      <div class="shrink-0 flex mb-[15px]">
        <img class="h-6 w-6 self-start" src="../assets/answer-icon.png" alt="Question Logo" />
        <div class="text-xl text-black">{{ $t('message.Answer', {}, { locale: $i18n.locale }) }}:</div>
        <span class="ml-[5px] line-clamp-3 mt-[4px]">{{ request.response[0]?.content }}</span>
      </div>
      <el-tag class="float-right" v-for="(topic, index) in request.topic" type="info" effect="dark">
        {{ topic }}
      </el-tag>
      <div class="text-center">
        <router-link :to="`/requests/${request._id}`">
          <el-link type="primary">{{ $t('message.seemoreanswers', {}, { locale: $i18n.locale }) }}</el-link>
        </router-link>
      </div>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Request } from '~/models/Request'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'
const user = ref<User>()
const props = defineProps<{
  request: Request
}>()
onMounted(async () => {
  user.value = await getUserById(props.request.uid)
})
</script>
