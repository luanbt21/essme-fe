<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="container px-5 py-6 mx-auto">
      <Search
        label="Search Events?"
        placeholder="Event title"
        what-field="name_event"
        :what-suggest="searchEvents"
        where-field="location"
        :where-suggest="whereSuggest"
        @search="handleSearch"
      />
      <h2 class="text-center" v-if="eventsData.length === 0">No Result</h2>
      <template v-else>
        <Mapbox :data="mapData" :center="mapCenter" />
        <el-container class="container">
          <el-aside width="200px" class="hidden md:block pt-5">
            <h3>By Fields</h3>
            <!-- <el-input type="text" placeholder="Fields Search" /> -->
            <el-checkbox-group v-model="typesSelect">
              <div v-for="(type, index) in types" :key="index">
                <el-checkbox :label="type" style="white-space: pre-wrap" />
              </div>
            </el-checkbox-group>
          </el-aside>
          <el-main>
            <el-row :gutter="20">
              <el-col v-for="event in events" :key="event._id" :xs="24" :sm="12">
                <EventItem :event="event" @click="() => (mapCenter = event.geojson.geometry.coordinates)" />
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <div class="grid justify-items-center text-center">
          <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="eventsPage?.totalPages"
            :current-page="props.page"
            @current-change="handlePageChange"
          />
        </div>
      </template>
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script setup lang="ts">
import { searchEvents, getEvents } from '~/api/Events'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Event as EventModel } from '~/models/Event'
import EventItem from '~/components/EventItem.vue'
import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'

const router = useRouter()

const pageSize = 6
const mapCenter = ref<number[]>()

interface Props {
  what?: string
  where?: string
  page?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1
})

const eventsPage = ref<PageEntity<EventModel>>()
const whereSuggest = (queryString: string) => {
  return searchEvents('', queryString)
}

const handlePageChange = (page: number) => {
  router.push({
    name: 'events',
    query: {
      what: props.what,
      where: props.where,
      page
    }
  })
}

const eventsData = computed(() => (eventsPage.value ? eventsPage.value.content : []))

const types = computed(() => {
  const result = new Set<string>()
  for (const event of eventsData.value) {
    for (const type of event.type) {
      result.add(type)
    }
  }
  return result
})
const typesSelect = ref<string[]>([])

const events = computed(() => {
  if (typesSelect.value.length === 0) return eventsData.value
  else {
    return eventsData.value.filter(event => {
      return typesSelect.value.every(type => event.type.includes(type))
    })
  }
})

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
  eventsPage.value = await searchEvents(props.what, props.where, props.page, pageSize)
})

const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'events',
    query: {
      what,
      where,
      page: 1
    }
  })
}
</script>
