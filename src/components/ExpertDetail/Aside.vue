<template>
  <el-aside class="rounded-xl m-5 text-[21px] bg-[#d1e0db] h-auto w-full lg:w-[600px]">
    <img
      :src="expert?.img ? expert.img : avatar"
      :alt="expert?.name + ' image'"
      class="w-[235px] h-72 rounded-xl mx-8 my-5"
    />
    <!-- <img
            src="https://pbs.twimg.com/media/CzMC-bfXAAIFIEU.jpg"
            class="w-[235px] h-72 rounded-xl mx-8 my-5"
            alt=""
          /> -->
    <div class="text-center my-7">
      <p>{{ expert?.name }}</p>
    </div>
    <div class="text-center mx-7 font-bold">{{ expert?.degree }}</div>
    <div class="text-center mx-7 font-bold" v-for="(number, index) of expert?.research_area" :key="index">
      {{ index === 0 && expert?.research_area.length === 2 ? number + ',' : number }}
    </div>
    <div class="ml-11 mt-12">
      <i class="fas fa-address-card"></i>
      <span class="ml-3">{{ expert?.degree }}</span>
    </div>
    <div class="ml-11 m-6">
      <i class="fas fa-map-marker-alt"></i>
      <span class="ml-5" v-for="(number, index) of expert?.address" :key="index">{{
        index === 0 && expert?.address.length === 2 ? number + ',' : number
      }}</span>
    </div>
    <div class="ml-11 mt-3 mb-6 m-3">
      <i class="fas fa-envelope"></i>
      <span class="ml-2 text-base">{{ expert?.email }}</span>
    </div>
  </el-aside>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getExperts, getExpertsById } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'

import avatar from '/avatar_expert_detail.png'

import { useRoute } from 'vue-router'

const expert = ref<Experts>()
const route = useRoute()
const c = 0

onMounted(async () => {
  const id = route.params.id
  // console.log(id)
  expert.value = await getExpertsById(id as string)
  // console.log(expert.value)
})

const textarea = ref('')
</script>
