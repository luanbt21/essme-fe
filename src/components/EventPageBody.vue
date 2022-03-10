<template>
  <el-main>
    <h2 class="text-center" v-if="events.length === 0">No Result</h2>
    <template v-else>
      <Mapbox :key="$route.fullPath" :data="mapData" :center="mapCenter" />
      <el-row :key="$route.fullPath" :gutter="20">
        <el-col v-for="event in events" :key="event._id" :xs="24" :sm="12">
          <EventItem :event="event" @locating="() => (mapCenter = event.geojson.geometry.coordinates)" />
        </el-col>
      </el-row>
      <div class="grid justify-items-center text-center">
        <el-pagination
          layout="prev, pager, next"
          :page-count="eventsPage?.totalPages"
          :current-page="props.page"
          @current-change="handlePageChange"
        />
      </div>
    </template>
  </el-main>
</template>

<script lang="ts" setup>
import { searchEvents } from '~/api/Events'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { PageEntity } from '~/models/PageEntity'
import { Event as EventModel } from '~/models/Event'
import { Feature } from '~/models/Geojson'
import EventItem from '~/components/EventItem.vue'
import Mapbox from '~/components/Mapbox.vue'

interface Props {
  what?: string
  where?: string
  types?: string
  page?: number
}
const props = defineProps<Props>()

const router = useRouter()

const mapCenter = ref<number[]>()

const eventsPage = ref<PageEntity<EventModel>>()

const handlePageChange = (page: number) => {
  router.push({
    name: 'events',
    query: {
      what: props.what,
      where: props.where,
      types: props.types?.toString(),
      page
    }
  })
}

const events = computed(() => (eventsPage.value ? eventsPage.value.content : []))

const mapData = computed((): Feature[] =>
  events.value.map(
    event =>
      ({
        type: 'Feature',
        geometry: event.geojson.geometry,
        properties: {
          label: event.name_event,
          html: `<span>${event.name_event}</span>`
        }
      } as Feature)
  )
)

onMounted(async () => {
  eventsPage.value = await searchEvents(props.what, props.where, props.types, props.page)
})
</script>
