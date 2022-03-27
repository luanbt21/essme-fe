<template>
  <div class="container mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <router-link
        v-bind:to="'/expert/' + expert._id"
        custom
        v-slot="{ navigate, href }"
        :style="{ 'text-decoration': 'none' }"
      >
        <el-card
          :xs="24"
          :sm="12"
          :lg="8"
          v-for="expert in expertsArr"
          :key="expert._id"
          :style="{ 'background-color': ' #FFFFFF' }"
          class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px]"
        >
          <a type="primary" :href="href" @click="navigate" text-decoration="none">
            <el-col :span="9" class="text-center">
              <img
                :src="expert?.img"
                :alt="expert?.name + ' image'"
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
          </a>
        </el-card></router-link
      >
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

const expertsArr = ref<Expert[]>([])
const fieldsArr = ref<Fields[]>([])
const homepage = ref<Homepage>()

onMounted(async () => {
  expertsArr.value = await getExperts()
  fieldsArr.value = await getFields()
  homepage.value = await getHomepage()
  expertArr.value = homepage.value.top_experts
})

defineProps<{
  expert: Experts
}>()
const input = ref('')
</script>
