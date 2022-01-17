<template>
  <div class="container px-5 py-6 mx-auto">
    <Search
      label="Search Events?"
      placeholder="Event title"
      what-field="event_name"
      :what-suggest="searchEvents"
      where-field="location"
      :where-suggest="getEvents"
      @search="handleSearch"
    />
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
          <el-col :xs="24" :sm="12">
            <div v-for="event in events1" :key="event._id">
              <EventItem :event="event" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div v-for="event in events2" :key="event._id">
              <EventItem :event="event" />
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <div class="text-center">
      <el-pagination layout="prev, pager, next" :page-size="20" :total="1000" @current-change="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from '~/components/Search.vue'
import { searchEvents, getEvents } from '~/api/Events'
import { computed, onMounted, ref } from 'vue'
import { Events } from '~/models/Events'
import EventItem from '~/components/EventItem.vue'

const eventsData = ref<Events[]>([])

const types = computed(() => {
  const result = [] as string[]
  for (const event of eventsData.value) {
    const eventTypes = event.type.split(';')
    for (let type of eventTypes) {
      type = type.trim()
      const index = result.findIndex(item => item === type)
      if (index === -1) result.push(type)
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

const events1 = computed(() => events.value.slice(0, events.value.length / 2))
const events2 = computed(() => events.value.slice(events.value.length / 2))

onMounted(async () => {
  eventsData.value = await getEvents()
  // eventsData.value = await searchEvents(route.query.what as string)
})

const handleSearch = async (what: string, where: string) => {
  eventsData.value = await searchEvents(what, where)
}
</script>
