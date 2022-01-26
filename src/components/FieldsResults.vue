<template>
  <div class="container mt-10 mx-auto">
    <h2 class="text-2xl mb-2">Results</h2>
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <el-scrollbar height="820px">
        <el-card class="h-fit" :body-style="{ padding: '10px' }">
          <el-row :xs="24" :sm="12" :lg="8" v-for="experts in expertsArr" :key="experts._id">
            <el-col :span="5">
              <!-- sửa yes thành true -->
              <img
                :src="experts.image"
                alt=""
                v-if="true"
                class="w-60 cover mb-5 mt-5 ml-auto mr-auto cursor-pointer rounded-2xl"
              />
              <img
                src="src/assets/avt.jpg"
                alt=""
                v-else="No"
                class="w-60 cover mb-5 mt-5 ml-auto mr-auto cursor-pointer rounded-2xl"
              />
            </el-col>
            <el-col :span="10" :gutter="30">
              <el-row class="mt-9 ml-8 text-xl">Name: {{ experts.name }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Degree: {{ experts.degree }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Company: {{ experts.company }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Address: {{ experts.address }}</el-row>
            </el-col>
            <a :href="experts.link_profile">
              <button
                :span="9"
                class="h-fit mt-28 ml-96 bg-[#42a1be] text-white leading-10 cursor-pointer text-right px-9 py-1 rounded-lg text-xl"
              >
                Detail
              </button>
            </a>
            <div class="w-full h-[1px] mt-4 bg-black opacity-60"></div>
          </el-row>
        </el-card>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getExperts } from '~/api/Experts'
import { Experts } from '~/models/Experts'

const expertsArr = ref<Experts[]>([])

onMounted(async () => {
  expertsArr.value = await getExperts(20, 0)
})

defineProps<{
  experts: Experts
}>()
</script>
