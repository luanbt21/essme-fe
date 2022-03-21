<template>
  <div class="container mt-10 mx-auto">
    <h2 class="text-2xl mb-2">Results</h2>
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <el-scrollbar height="820px">
        <el-card class="h-fit" :body-style="{ padding: '10px' }">
          <el-row :xs="24" :sm="12" :lg="8" v-for="(experts, fields) in expertsArr" :key="experts._id">
            <el-col :span="7" class="text-center">
              <router-link v-bind:to="'/expert/' + experts._id" custom v-slot="{ navigate, href }">
                <el-link type="primary" :href="href" @click="navigate">
                  <img
                    :src="experts?.img"
                    :alt="experts?.name + ' image'"
                    class="inline-block w-60 h-60 mb-5 mt-5 cursor-pointer rounded-2xl"
                  />
                </el-link>
              </router-link>
            </el-col>
            <el-col :span="15" :gutter="30">
              <el-row class="mt-9 ml-8 text-xl">Họ tên: {{ experts?.name }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Trình độ: {{ experts?.degree }}</el-row>
              <el-row class="mt-9 ml-8 text-xl">Công ty: {{ experts?.company }}</el-row>
              <el-row class="mt-9 ml-8 text-xl"
                >Lĩnh vực:
                <span v-for="(number, index) of experts?.research_area" :key="index">
                  {{ index === 0 && experts?.research_area.length === 2 ? number + ',' : number }}
                </span></el-row
              >
            </el-col>
            <div class="w-full h-[1px] mt-4 bg-black opacity-60"></div>
          </el-row>
        </el-card>
      </el-scrollbar>
      <!-- <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
        Fields
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option v-for="fields in fieldsArr" :key="fields.name" :label="fields.name" :value="fields.name">
          </el-option>
        </el-select>
        Company
        <el-select
          class="m-2"
          size="large"
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="Please enter a location"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option v-for="experts in expertsArr" :key="experts._id" :label="experts.company" :value="experts.company">
          </el-option>
        </el-select>
        Degree
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option v-for="experts in expertsArr" :key="experts._id" :label="experts.degree" :value="experts.degree">
          </el-option>
        </el-select>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getExperts, getExpertsById } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'
import { useRoute } from 'vue-router'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'

const expertsArr = ref<Expert[], Fields[]>([])
const fieldsArr = ref<Fields[]>([])
const input = ref('')
const expert = ref<Experts>()
const route = useRoute()

onMounted(async () => {
  expertsArr.value = await getExperts()
  fieldsArr.value = await getFields()
  const name = route.params.name
  console.log(this.fields)
  expert.value = await getExpertsByField(name as string)
})

const textarea = ref('')
</script>
