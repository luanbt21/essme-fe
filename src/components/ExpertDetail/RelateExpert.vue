<template>
  <div class="common-layout w-[100%] mx-auto">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB] h-auto">
        <div class="font-bold text-2xl my-5 ml-6">RELATED EXPERTS</div>
        <el-scrollbar height="395px" width="auto" v-if="types.length !== 0">
          <el-row :gutter="20" class="m-5">
            <el-col :span="8" v-for="expert in types" :key="expert._id" :xs="24" :sm="12" :lg="8">
              <ItemRelateVue :expert="expert" />
            </el-col>
          </el-row>
          <button @click="seeMore = !seeMore">See more</button>
        </el-scrollbar>
        <!-- <el-row :gutter="20" class="m-5" v-if="(seeMore = true)">
          <el-col :span="8" v-for="expert in types.slice(0, 3)" :key="expert._id" :xs="24" :sm="12" :lg="8">
            <ItemRelateVue :expert="expert" />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="m-5" v-if="(seeMore = false)">
          <el-col :span="8" v-for="expert in types" :key="expert._id" :xs="24" :sm="12" :lg="8">
            <ItemRelateVue :expert="expert" />
          </el-col>
        </el-row> -->

        <div v-if="types.length === 0" class="m-5 text-center">no result</div>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts1, getExpertstop, getExpertsById } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'
import { useRoute } from 'vue-router'
import ItemRelateVue from './ItemRelate.vue'
import { truncateSync } from 'fs'
const expertRelate = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()
const types = computed(() => {
  const result = new Array()
  for (const experts of expertRelate.value) {
    if (experts.research_area === expert.value?.research_area) {
      result.push(experts)
    }
  }
  return result
})
const expertlength = computed(() => {
  return types.value.slice(0, 3)
})
var seeMore = true
const readMore = () => {
  seeMore = !seeMore
  console.log(seeMore)
}

onMounted(async () => {
  const id = route.params.id
  ;(expert.value = await getExpertsById(id as string)), (expertRelate.value = await getExperts1(20))
  // console.log(types.value)
})
</script>

<style scoped>
router-link a {
  text-decoration: none;
}
</style>
