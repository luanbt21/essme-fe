<template>
  <div class="common-layout w-full mx-auto">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB] h-auto">
        <div class="font-bold text-2xl my-5 ml-6">RELATED EXPERTS</div>
        <el-row :gutter="20" class="m-5">
          <el-col :span="8" v-for="expert in types" :key="expert._id" :xs="24" :sm="12" :lg="8">
            <el-card :style="{ 'background-color': '#ECF4F1' }" class="m-5 md:hover:scale-105 hover:duration-500">
              <router-link
                v-bind:to="'/expert/' + expert._id"
                custom
                v-slot="{ navigate, href }"
                :style="{ 'text-decoration': 'none' }"
              >
                <a type="primary" :href="href" @click="navigate" text-decoration="none">
                  <div class="flex no-underline">
                    <div class="basis-3/4 text-black">
                      <div>{{ expert.name }}</div>
                      <div class="my-5">{{ expert.degree }}</div>
                      <div>
                        <p>{{ expert.company }}</p>
                      </div>
                    </div>
                    <div class="basis-1/4">
                      <img
                        src="https://img.xcitefun.net/users/2008/05/2997,xcitefun-little-cute-chicken-wallpapers-3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </router-link>
            </el-card>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts, getExpertstop, getExpertsById } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'
import { useRoute } from 'vue-router'
const expertRelate = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()
const types = computed(() => {
  const result = new Set()
  for (const experts of expertRelate.value) {
    if (experts.research_area === expert.value?.research_area) {
      return experts
    }
  }
})
onMounted(async () => {
  const id = route.params.id
  ;(expert.value = await getExpertsById(id as string)), (expertRelate.value = await getExperts(20))
  console.log(types.value)
})
</script>

<style scoped>
router-link a {
  text-decoration: none;
}
</style>
