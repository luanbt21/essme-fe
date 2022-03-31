<template>
  <div class="container mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] text-center">
      <el-card
        :expert="expert"
        :xs="24"
        :sm="12"
        :lg="8"
        :style="{ 'background-color': ' #FFFFFF' }"
        class="m-2 md:hover:scale-105 hover:duration-500 rounded-[15px] inline-block w-[80%]"
        :key="$route.fullPath"
      >
        <router-link
          v-bind:to="'/expert/' + expert._id"
          custom
          v-slot="{ navigate, href }"
          :style="{ 'text-decoration': 'none' }"
        >
          <a type="primary" :href="href" @click="navigate" text-decoration="none">
            <el-col :span="9" class="text-center">
              <img
                :src="expert?.img"
                :alt="expert?.name + ' image'"
                v-if="null"
                class="inline-block w-60 h-60 mb-5 mt-5 cursor-pointer rounded-2xl"
              />
              <img
                src="https://nhathauxaydung24h.com/wp-content/uploads/2021/12/avatar-cute-gau-trang.jpg"
                :alt="expert?.name + ' image'"
                v-else
                class="inline-block w-60 h-60 mb-5 mt-5 cursor-pointer rounded-2xl"
              />
            </el-col>
            <el-col :span="15" :gutter="30">
              <el-row class="mt-6 ml-8 text-xl">Họ tên: {{ expert?.name }}</el-row>
              <el-row class="mt-6 ml-8 text-xl">Trình độ: {{ expert?.degree }}</el-row>
              <el-row class="mt-6 ml-8 text-xl">Công ty: {{ expert?.company }}</el-row>
              <el-row class="mt-6 ml-8 text-xl"
                >Lĩnh vực:
                <span v-for="(number, index) of expert?.research_area" :key="index">
                  {{ index === 0 && expert?.research_area.length === 2 ? number + ',' : number }}
                </span></el-row
              >
            </el-col>
          </a></router-link
        >
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getExperts } from '~/api/Expert'
import { Experts } from '~/models/Experts'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'
import { getHomepage } from '~/api/Homepage'
import { Homepage } from '~/models/Homepage'

let expertsArr = {}
const fieldsArr = ref<Fields[]>([])
const homepage = ref<Homepage>()

onMounted(async () => {
  fieldsArr.value = await getFields()
  expertsArr = await getExperts()
  console.log('homepage-value', fieldsArr.value)
})

defineProps<{
  expert: Experts
}>()
const input = ref('')
</script>
