<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-white rounded-[40px] p-[50px] flex flex-col">
    <div v-if="event" class="container mx-auto">
      <div class="text-center mb-12 rounded-lg mx-auto">
        <el-image :src="event.img" :alt="event.name_event" lazy>
          <template #error>
            <div class="mx-auto w-[720px] h-32 flex justify-center bg-gray-200">
              <el-icon class="m-auto"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <div class="bg-[#ECF4F1] rounded-lg text-center p-3 mb-12">
        <h1 class="font-medium text-3xl mb-2">
          {{ event.name_event }}
        </h1>
        <el-tag class="mx-4" size="large" v-for="type in event.type_vn" :key="type">
          {{ type }}
        </el-tag>
      </div>

      <div class="bg-[#ECF4F1] rounded-lg p-16 mb-12 text-2xl">
        <p class="mb-12">
          <el-icon style="vertical-align: middle" :size="30">
            <LocationFilled />
          </el-icon>
          {{ event.location }}
        </p>
        <p class="mb-12">
          <el-icon style="vertical-align: middle" :size="30">
            <Clock />
          </el-icon>
          {{ event.time }}
        </p>
        <p>
          <el-icon style="vertical-align: middle" :size="30">
            <HomeFilled />
          </el-icon>
          <el-link style="font-size: 24px" :href="event.web" target="_blank">
            {{ event.web }}
          </el-link>
        </p>
      </div>

      <div class="bg-[#ECF4F1] px-12 py-6 text-2xl rounded-lg mb-12">
        <span class="ml-4"> Chi Tiết </span>
        <hr />
        <p>
          {{ event.desc }}
        </p>
      </div>

      <div class="bg-[#ECF4F1] rounded-lg mb-12">
        <Mapbox :data="mapData" :center="event.geojson.geometry.coordinates" :zoom="6" />
      </div>
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import { Event } from '~/models/Event'
import { getEventsById } from '~/api/Events'
import { computed, onMounted, ref } from 'vue'
import { Picture, LocationFilled, Clock, HomeFilled } from '@element-plus/icons-vue'
import Mapbox from '~/components/Mapbox.vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'

const props = defineProps<{
  id: string
}>()

const event = ref<Event>()

console.log(event.value)

const mapData = computed(() =>
  event.value
    ? [
        {
          type: 'Feature',
          geometry: event.value.geojson.geometry,
          properties: {
            label: event.value.name_event,
            html: `<span>${event.value.name_event}</span>`
          }
        }
      ]
    : []
)

onMounted(async () => {
  event.value = await getEventsById(props.id)
})
</script>
