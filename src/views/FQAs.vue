<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="mb-[15px]">
      <router-link to="/questionSheet"
        ><el-button color="rgb(46, 109, 192)" size="large" plain>Ask your question</el-button></router-link
      >
    </div>

    <!-- <Search /> -->

    <el-container class="container">
      <el-aside width="200px" class="hidden md:block pt-5">
        <h3>By Fields</h3>

        <!-- <el-input type="text" placeholder="Fields Search" /> -->
        <el-checkbox-group v-model="typesSelect" :max="2">
          <div v-for="(type, index) in types" :key="index">
            <el-checkbox class="z-[0]" :label="type" style="white-space: pre-wrap" />
          </div>
        </el-checkbox-group>
      </el-aside>
      <el-main>
        <div v-for="FQA in FQAsFilter"><FQAitem :question="FQA" /></div>
        <!-- <el-row v-for="FQA in FQAs" :key="FQA._id">
          <el-col :span="24"><FQAitem :question="FQA" /></el-col>
        </el-row> -->
      </el-main>
    </el-container>

    <br />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import FQAitem from '~/components/FQAitem.vue'
import { computed, onMounted, ref } from 'vue'
import { Question } from '~/models/Question'
import { getQuestion } from '~/api/Question'
// import Search from '~/components/Search.vue'
const FQAs = ref<Question[]>([])
const types = computed(() => {
  const result = new Set<string>()
  for (const FQA of FQAs.value) {
    for (const topic of FQA.Topic) {
      result.add(topic)
    }
  }
  return result
})
const typesSelect = ref<string[]>([])
const FQAsFilter = computed(() => {
  if (typesSelect.value.length === 0) return FQAs.value
  else {
    return FQAs.value.filter(FQA => {
      return typesSelect.value.every(type => FQA.Topic.includes(type))
    })
  }
})
onMounted(async () => {
  FQAs.value = await getQuestion(1000)
})
</script>
