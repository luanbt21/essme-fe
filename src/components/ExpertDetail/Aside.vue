<template>
  <el-aside class="rounded-xl w-auto m-5 text-[21px] bg-[#d1e0db]">
    <img
      :src="expert?.image ? expert.image : avatar"
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
    <div class="text-center mx-7 font-bold">{{ expert?.research_area }}</div>
    <div class="ml-11 mt-12">
      <i class="fas fa-address-card"></i>
      <span class="ml-3">{{ expert?.degree }}</span>
    </div>
    <div class="ml-11 m-6">
      <i class="fas fa-map-marker-alt"></i>
      <span class="ml-5">Center for Urban Science + Progress, New York University, United States</span>
    </div>
    <div class="ml-11 mt-3 mb-6">
      <i class="fas fa-envelope"></i>
      <span class="ml-5">{{ expert?.email }}</span>
    </div>
  </el-aside>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getExperts, getExpertById } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { useStore } from '~/store/index'

import avatar from '/avatar_expert_detail.png'

import { useRoute } from 'vue-router'

const expert = ref<Expert>()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id
  // console.log(id)
  expert.value = await getExpertById(id as string)
  // console.log(expert.value)
})

const textarea = ref('')
</script>

