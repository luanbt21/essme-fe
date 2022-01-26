<template>
  <div class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">Fields</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :lg="8" v-for="fields in fieldsArr" :key="fields.name">
          <router-link to="/fields">
            <img :src="fields.image" alt=""
              class="w-80 h-52 cover mb-5 mt-5 ml-auto mr-auto md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"/>
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

const fieldsArr = ref<Fields[]>([])

onMounted(async () => {
  fieldsArr.value = await getFields()
})

</script>
