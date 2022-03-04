<template>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <!-- <SearchVue /> -->
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <!-- <MapboxVues :data="mapData" /> -->
  </div>

  <div class="mt-5 ml-11 w-[95%] m-auto flex justify-center">
    <el-row :gutter="20" class="flex">
      <div class="w-[79%] bg-[#D1E0DB] rounded-[15px]">
        <div class="font-bold text-center p-5 text-2xl">Leading Experts</div>
        <el-scrollbar height="480px" v-model="typesSelect">
          <el-col :span="12" height="339px" v-for="expert in experts" :key="expert._id">
            <el-card
              :style="{ 'background-color': ' #FFFFFF' }"
              class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px]"
            >
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
        </el-scrollbar>
      </div>

      <div class="bg-[#D1E0DB] rounded-[15px] mx-2 w-[19%]">
        <div class="font-bold text-center p-5 text-2xl">City/Province</div>
        <el-scrollbar height="490px">
          <div v-for="(address, index) in types" :key="index">
            <el-card
              :style="{ 'background-color': ' #FFFFFF' }"
              class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px] text-center"
            >
              {{ address }}
            </el-card>
          </div>
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
// import { computed, onMounted, onUpdated, ref } from 'vue'
// import { getExperts, getExpertById, searchExperts } from '~/api/Experts'
// import { Experts } from '~/models/Experts'
// import { useStore } from '~/store/index'
// import SearchVue from './Search.vue'
// import MapboxVue from './Mapbox.vue'
// import HomeFieldsVue from './HomeFields.vue'
// import HomeNewsVue from './HomeNews.vue'
// import HomeEventsVue from './HomeEvents.vue'
// const expertArr = ref<Experts[]>([])
// onMounted(async () => {
//   expertArr.value = await getExperts(8)
//   console.log(expertArr.value)
// })

import { searchExperts, getExperts, getExpertstop } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'
import EventItem from '~/components/EventItem.vue'
import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'

const router = useRouter()

const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<ExpertModel[]>([])
const types = computed(() => {
  const result = new Set<string>()
  for (const event of expertsTop.value) {
    for (const address of event.address) {
      result.add(address)
    }
  }
  return result
})
const expertsData = computed(() => (expertsTop.value ? expertsTop.value : []))
const typesSelect = ref<string[]>([])
const experts = computed(() => {
  if (typesSelect.value.length === 0) return expertsData.value
  else {
    return expertsData.value.filter(event => {
      return typesSelect.value.every(type => event.address.includes(type))
    })
  }
})
// const mapData = computed((): Feature[] =>
//   experts.value.map(
//     expert =>
//       ({
//         type: 'Feature',
//         geometry: expert.location.features[0].geometry,
//         properties: {
//           label: expert.name,
//           html: `<span>${expert.name}</span>`
//         }
//       } as Feature)
//   )
// )
onMounted(async () => {
  // expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(8)
  // expertsPage.value=await getExperts(8)
  console.log(expertsTop.value)
})
</script>

<style></style>
