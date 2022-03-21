<template>
  <div class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">Fields</h2>
      <el-row :gutter="30" class="text-center">
        <el-col :xs="24" :sm="12" :lg="8" v-for="(fields, experts) in fieldsArr" :key="fields.name">
          <router-link v-bind:to="'/fields/' + fields.name" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">
              <img
                :src="fields.image"
                alt=""
                class="inline-block w-80 h-52 cover mb-5 mt-5 ml-auto mr-auto md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"
              />
            </el-link>
          </router-link>
          <h3 class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ fields.name }}
          </h3>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'
import { useStore } from '~/store/index'
import { getHomepage } from '~/api/Homepage'
import { Homepage } from '~/models/Homepage'
import { Experts } from '~/models/Experts'

const store = useStore()
const expertArr = ref<Experts[]>([])
const fieldsArr = ref<Fields[], Experts[]>([])
const homepage = ref<Homepage>()

onMounted(async () => {
  homepage.value = await getHomepage()
  fieldsArr.value = await getFields()
  expertArr.value = homepage.value.top_experts
})

const getIdExpert = (id: string) => {
  store.commit('expert_id/setID', id)
}
</script>
