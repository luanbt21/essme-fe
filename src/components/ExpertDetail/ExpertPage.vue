<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-white rounded-[40px] p-[50px] flex flex-col">
    <div class="common-layout mt-5 w-[95%] mx-auto" id="top">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous"
      />

      <!-- <input type="number" v-model="lat" />
      <input type="number" v-model="lon" /> -->

      <div>
        <FilterFieldVue />
      </div>
      <el-container class="h-auto">
        <el-container class="flex flex-wrap justify-center">
          <AsideVue :key="$route.fullPath" />
          <MainFooterVue :key="$route.fullPath" />
        </el-container>
      </el-container>
      <div class="h-[500px]">
        <Mapbox :key="$route.fullPath" :center="mapCenter" :data="mapData" :icon-zoom="0.05" />
      </div>
      <RelateExpertVue :key="$route.fullPath" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed, onMounted, onUpdated, ref } from 'vue'

import { Experts } from '~/models/Experts'

import Mapbox from '~/components/Mapbox.vue'
import avatar from '/avatar_expert_detail.png'
import AsideVue from './Aside.vue'
import MainFooterVue from './Main&Footer.vue'
import RelateExpertVue from './RelateExpert.vue'
import { Feature } from '~/models/Geojson'
import { useRoute } from 'vue-router'
import expert_id from '~/store/modules/expert_id'
import FilterFieldVue from './FilterField.vue'
import { getExpertsById } from '~/api/Experts'
const expertArr = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id

  expert.value = await getExpertsById(id as string)
})
const mapCenter = expert.value?.location.features[0].geometry.coordinates
const lat = ref<number>(105)
const lon = ref<number>(21)
const mapData = computed((): Feature[] => {
  if (expert.value) {
    return [
      {
        type: 'Feature',
        geometry: expert.value.location.features[0].geometry,
        properties: {
          label: expert.value.name,
          html: `<span> Lĩnh vực: ${expert.value.research_area}</span>`
        }
      } as Feature
    ]
  } else {
    return []
  }
})

const textarea = ref('')
</script>

<style lang="scss">
.common-layout {
  .el-header,
  .el-footer {
    height: auto;
    width: auto;
  }
}
</style>
