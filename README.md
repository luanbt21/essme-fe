# ESSME

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
        <el-scrollbar height="480px">
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

          <div v-for="expert in experts" :key="expert._id">
            <button
              v-on:click="webcamSendRequestButton($event), check()"
              :value="expert.research_area"
              type="button"
              class="webcam-send-request-button"
            >
              {{ expert.research_area }}
            </button>
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
const pageSize = 10
const mapCenter = ref<number[]>()
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))

let experts = computed(() => {
  if (buttonValue === '') {
    return expertsData.value
  } else {
    return expertsTopData.value
  }
})
//  var experts = computed(() => {
//     return expertsData.value.filter(event => {
//       return event.research_area.includes(buttonValue)
//     })
//   })
var buttonValue = ''

const webcamSendRequestButton = (e: any) => {
  buttonValue = e.target.value

  // console.log(buttonValue)
}

const check = () => {
  console.log(typeof buttonValue)
}

// const expertFilter = computed(() => (expert.value ? expert : experts))
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
  for (const event of expertsTop.value) {
    for (const address of event.research_area) {
      result.add(address)
    }
  }
  return result
})
const typesSelect = ref<string[]>([])

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
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(8)

  console.log('gia tri :' + buttonValue)
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

<style></style>

---

---

---

//research area
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
        <el-scrollbar height="580px">
          <el-col :span="12" height="239px" v-for="expert in experts" :key="expert._id">
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
          <div class="flex justify-center">
            <div style="white-space: pre-wrap">
              <el-checkbox-group v-model="typesSelect" size="large" class="w-[100px]" style="white-space: pre-wrap">
                <div v-for="expert in types" :key="expert" class="w-[100px]">
                  <el-checkbox-button :label="expert" class="w-60 m-2"> </el-checkbox-button>
                </div>
              </el-checkbox-group>
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
const pageSize = 10
const mapCenter = ref<number[]>()
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
const callFunction = (e: any) => {
  let id = e.target.value
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
  for (const event of expertsData.value) {
    result.add(event.research_area)
  }
  return result
})
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))
const typesSelect = ref<string[]>([])
const experts = computed(() => {
  if (typesSelect.value.length === 0) return expertsTopData.value
  else {
    return expertsData.value.filter(event => {
      return typesSelect.value.every(type => event.research_area.includes(type))
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
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(8)
  // console.log(expertsTop.value)
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

---

//address
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
        <el-scrollbar height="580px">
          <el-col :span="12" height="239px" v-for="expert in experts" :key="expert._id">
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
          <div class="flex justify-center">
            <div>
              <el-checkbox-group v-model="typesSelect" size="large">
                <el-checkbox-button v-for="(type, index) in types" :key="index" :label="type" class=""> </el-checkbox-button>
              </el-checkbox-group>
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
const pageSize = 10
const mapCenter = ref<number[]>()
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
const callFunction = (e: any) => {
  let id = e.target.value
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
  for (const event of expertsTop.value) {
    for (const address of event.address) {
      result.add(address)
    }
  }
  return result
})
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))
const typesSelect = ref<string[]>([])
const experts = computed(() => {
  if (typesSelect.value.length === 0) return expertsTopData.value
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
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(8)
  // console.log(expertsTop.value)
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
