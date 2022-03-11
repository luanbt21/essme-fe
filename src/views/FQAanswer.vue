<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <router-link to="/questionSheet">
      <div class="mb-[15px] items-right">
        <el-button color="rgb(46, 109, 192)" size="large" plain>Ask your question</el-button>
      </div>
    </router-link>
    <div v-if="user" class="flex mb-[15px] items-center">
      <el-avatar :size="40" :src="user?.photoURL"></el-avatar>
      <p class="ml-[10px]">{{ user?.displayName }}</p>
    </div>
    <div class="ml-[30px]">
      <div class="shrink-0 flex mb-[15px]">
        <img class="h-6 w-6" src="../assets/question-mark.png" alt="Question Logo" />
        <span class="ml-[15px] min-w-[65px]">Question: </span>
        <span class="ml-[10px] line-clamp-3">{{ question?.Description }} </span>
      </div>
      <div class="shrink-0 flex mb-[15px]">
        <img class="h-6 w-6 self-start" src="../assets/answer-icon.png" alt="Question Logo" />
        <div class="text-xl text-black">Answer: ({{ question?.answers.length }})</div>
      </div>
      <div v-for="answer in question?.answers">
        <AnswerItem :answer="answer" />
      </div>
    </div>
    <br />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>
<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import AnswerItem from '~/components/AnswerItem.vue'
import { onMounted, ref } from 'vue'
import { getQuestionById } from '~/api/Question'
import { Answer, Question } from '~/models/question'
import { useRoute } from 'vue-router'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'
const route = useRoute()
const id = route.params.id
console.log(id)
const question = ref<Question>()
const user = ref<User>()
const answer = ref<Answer[]>([])
onMounted(async () => {
  question.value = await getQuestionById(id.toString())
  user.value = await getUserById(question.value.uid)
  answer.value = question.value.answers
})
</script>
