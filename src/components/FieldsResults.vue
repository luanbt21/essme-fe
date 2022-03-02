<template>
  <div class="container mt-10 mx-auto">
    <h2 class="text-2xl mb-2">Results</h2>
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <el-scrollbar height="820px">
        <el-card class="h-fit" :body-style="{ padding: '10px' }">
          <el-row :xs="24" :sm="12" :lg="8" v-for="experts in expertsArr" :key="experts._id">
            <el-col :span="5">
              <img :src="experts.image" alt="" v-if="null" class="w-60 cover mb-5 mt-5 ml-auto mr-auto cursor-pointer rounded-2xl">
              <img src="src/assets/avt.jpg" alt="" v-else class="w-60 cover mb-5 mt-5 ml-auto mr-auto cursor-pointer rounded-2xl">
            </el-col>
            <el-col :span="10" :gutter="30">
              <el-row class="mt-9 ml-8 text-xl">Name: {{ experts.name }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Degree: {{ experts.degree }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Company: {{ experts.company }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Field: {{ experts.research_area }}</el-row>
            </el-col>
            <a :href="experts.link_profile">
              <button
                
                class="h-fit mt-28 ml-96 bg-[#42a1be] text-white leading-10 cursor-pointer text-right px-9 py-1 rounded-lg text-xl"
              >
                Detail
              </button>
            </a>
            <div class="w-full h-[1px] mt-4 bg-black opacity-60"></div>
          </el-row>
        </el-card>
      </el-scrollbar>
      <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
        Fields
        <el-select  class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="fields in fieldsArr" 
            :key="fields.name"
            :label="fields.name"
            :value="fields.name"
          >
          </el-option>
        </el-select>
        Company
          <el-select class="m-2" size="large"
           
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a location"
            
            
          >
            <el-option
              v-for="experts in expertsArr" 
              :key="experts._id"
              :label="experts.company"
              :value="experts.company" 
            >
            </el-option>
          </el-select>
          Degree
          <el-select  class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="experts in expertsArr" 
            :key="experts._id"
            :label="experts.degree"
            :value="experts.degree"
          >
          </el-option>
        </el-select>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getExperts } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'

const expertsArr = ref<Expert[]>([])
const fieldsArr = ref<Fields[]>([])

onMounted(async () => {
  expertsArr.value = await getExperts()
  fieldsArr.value = await getFields()
})

defineProps<{
  experts: Expert
}>()
const input = ref('')
</script>

