<template>
  <div class="container m-auto min-w-[500px]">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-lg">
      <h1 class="text-center text-2xl mb-10">FQAs</h1>
      <div
        v-for="question in questionArr"
        :key="question._id"
        class="md:hover:scale-[1.02] hover:duration-500 p-6 mb-[15px] bg-white rounded-xl shadow-lg space-x-4"
      >
        <div class="shrink-0 flex mb-[15px]">
          <img class="h-6 w-6" src="../assets/question-mark.png" alt="Question Logo" />
          <span class="ml-[15px] min-w-[65px]">Question: </span>
          <span class="ml-[10px] line-clamp-3">{{ question.Description }} </span>
        </div>
        <div class="shrink-0 flex mb-[15px]">
          <img class="h-6 w-6 self-start" src="../assets/answer-icon.png" alt="Question Logo" />
          <div class="text-xl text-black">Answer:</div>
          <span class="ml-[5px] line-clamp-3 mt-[4px]">{{ question.answers[0].answer }}</span>
        </div>
        <div class="text-center">
          <router-link :to="`/FQAs/${question._id}`" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">See more answers</el-link>
          </router-link>
        </div>
      </div>
      <div class="text-center">
        <router-link to="/FQAs" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">Show more</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getQuestion } from '~/api/Question'
import { Question } from '~/models/question'
const questionArr = ref<Question[]>([])
onMounted(async () => {
  questionArr.value = await getQuestion(3)
  // console.log(questionArr.value)
})
</script>
