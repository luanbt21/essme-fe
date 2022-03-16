<template>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <Search
      label="Search Events?"
      placeholder="Expert title"
      what-field="name"
      :what-suggest="searchExperts"
      where-field="location"
      :where-suggest="getExperts"
      @search="handleSearch"
    />
  </div>

  <div class="mt-5 w-[95%] mx-auto justify-center"></div>
  <div>
    <Mapbox :data="mapData" />
  </div>
  <div class="mt-5 ml-11 w-[95%] flex justify-center">
    <el-row :gutter="20" class="flex" viewClass="yf-content" wrapClass="yf-container">
      <div class="w-[79%] bg-[#D1E0DB] rounded-[15px]">
        <div class="font-bold text-center p-5 text-2xl">Leading Experts</div>
        <div class="h-[500px]">
          <el-scrollbar responsive height="580px">
            <el-col :span="12" height="239px" v-for="expert in experts" :key="expert._id">
              <ExpertsItem :key="$route.fullPath" :expert="expert" />
            </el-col>
          </el-scrollbar>
        </div>
      </div>

      <div class="bg-[#D1E0DB] rounded-[15px] mx-2 w-[19%]">
        <div class="font-bold text-center p-5 mb-5 text-2xl">City/Provincee</div>
        <el-scrollbar height="490px">
          <!-- <div v-for="(address, index) in types" :key="index">
            <el-card
              :style="{ 'background-color': ' #FFFFFF' }"
              class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px] text-center"
            >
              <button v-on:click="callFunction" data-id="{{address}}">
                {{ address }}
              </button>
            </el-card>
          </div> -->
          <div class="ml-5">
            <div style="">
              <el-radio-group v-model="typesSelect" size="large" class="" style="white-space: pre-wrap">
                <div class="w-[50px]">
                  <div v-for="(type, index) in types" :key="index" class="">
                    <div class="w-[50px]">
                      <el-radio-button :label="type" class="w-10 m-2" stacked v-on:change="callFunction($event)">
                      </el-radio-button>
                    </div>
                    <br />
                  </div>
                </div>
              </el-radio-group>
            </div>
          </div>
          <!-- <el-checkbox-group v-model="typesSelect">
            <div v-for="(type, index) in types" :key="index">
              <el-checkbox :label="type" style="white-space: pre-wrap" />
            </div>
          </el-checkbox-group> -->
        </el-scrollbar>
      </div>
    </el-row>
  </div>

  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeFieldsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeNewsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeEventsVue />
  </div>
</template>

<script lang="ts" setup>
import HomeNewsVue from './HomeNews.vue'
import HomeEventsVue from './HomeEvents.vue'
import HomeFieldsVue from './HomeFields.vue'
import { searchExperts, getExperts, getExpertstop } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'

import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import ExpertsItem from '~/components/ExpertsItem.vue'

const router = useRouter()
const pageSize = 10
const mapCenter = ref<number[]>()
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
let id = ''
const callFunction = (e: any) => {
  id = e.target.value
  console.log(id)
}
const handlePageChange = (page: number) => {
  router.push({
    name: 'allexperts',
    query: {
      what: props.what,
      where: props.where,

      page
    }
  })
}
const types = computed(() => {
  const result = new Set<string>()
  for (const expert of expertsData.value) {
    for (const type of expert.address) {
      result.add(type)
    }
  }
  return result
})
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))

const typesSelect = ref('')

const experts = computed(() => {
  if (typesSelect.value === '') {
    return expertsTopData.value
  } else {
    return expertsData.value.filter(expert => {
      return expert.address.includes(typesSelect.value)
    })
  }
})

const mapData = computed(
  (): Feature[] =>
    experts.value.map(
      expert =>
        ({
          type: 'Feature',
          geometry: expert.location.features[0].geometry,
          properties: {
            label: expert.name,
            html: `<span>${expert.name}</span>`
          }
        } as Feature)
    )

  // experts.value.map(
  //   expert =>
  //     ({
  //       type: 'Feature',
  //       geometry: expert.location.features[0].geometry,
  //       properties: {
  //         label: expert.name,
  //         html: `<span>${expert.name}</span>`
  //       }
  //     } as Feature)
  // )
)
onMounted(async () => {
  // expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(20, 1)
  console.log(experts.value)
})
const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'allexperts',
    query: {
      what,
      where,

      page: 1
    }
  })
}
</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
</style>
