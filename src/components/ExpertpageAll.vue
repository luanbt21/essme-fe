<template>
  <div class="mt-5 w-[100%] mx-auto justify-center"></div>

  <div class="mt-5 w-[98%] flex justify-center">
    <el-row :gutter="20" class="flex" viewClass="yf-content" wrapClass="yf-container">
      <div class="w-full xl:w-[72%] ml-5 my-5 bg-[#D1E0DB] rounded-[15px]">
        <div class="font-bold text-center p-5 text-2xl">CHUYÊN GIA HÀNG ĐẦU</div>
        <div v-if="experts.length === 0">No result</div>
        <div v-else class="h-[500px] flex flex-wrap">
          <el-scrollbar responsive height="480px" :key="$route.fullPath">
            <el-col :span="12" height="239px" v-for="expert in experts" :key="expert._id" class="flex flex-wrap">
              <ExpertsItem :expert="expert" />
            </el-col>
          </el-scrollbar>
        </div>
      </div>

      <div class="bg-[#D1E0DB] rounded-[15px] w-full my-5 ml-3 xl:w-[25%]">
        <div class="font-bold text-center p-5 mb-5 text-2xl">LĨNH VỰC</div>
        <el-scrollbar height="460px">
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
            <div>
              <el-radio-group v-model="typesSelect" size="large" class="">
                <div class="w-[50px]">
                  <div v-for="type in expertfield" :key="type._id" class="">
                    <div class="w-[100px] flex flex-wrap">
                      <el-radio-button :label="type._id" class="w-10 m-2" @change="handleFieldChange">
                        {{ `${type._id} (${type.quantity})` }}
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
  <div class="mt-14 w-full">
    <Mapbox :data="mapData" />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeFieldsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeNews :newsArr="newsArr" />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeEventsVue :eventsArr="eventsArr" />
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from './HomeEvents.vue'
import HomeFieldsVue from './HomeFields.vue'
import { searchExperts, getExperts, getExpertstop, FieldsType, fieldsExperts } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'

import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import ExpertsItem from '~/components/ExpertsItem.vue'
import { Experts } from '~/models/Experts'
import { Homepage } from '~/models/Homepage'
import { Event } from '~/models/Event'
import { getHomepage } from '~/api/Homepage'
import { News } from '~/models/News'
import { getNewsHome } from '~/api/News'
const eventsArr = ref<Event[]>([])
const router = useRouter()
const pageSize = 10
const mapCenter = ref<number[]>()
const expertfield = ref<FieldsType[]>([])
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const homepage = ref<Homepage>()
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
  return expertsTopData.value
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
const newsArr = ref<News[]>([])

onMounted(async () => {
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(20, 1)
  expertfield.value = await fieldsExperts()
  homepage.value = await getHomepage()
  eventsArr.value = homepage.value.top_events
  newsArr.value = await getNewsHome(9)
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
const handleFieldChange = () => {
  router.push({
    name: 'expertfields',
    query: {
      what: typesSelect.value.toString(),
      where: props.where,
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
