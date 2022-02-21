<template>
  <div class="container m-auto mt-10 mb-10">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">Events</h2>
      <el-row :gutter="30">
        <el-col v-for="events in eventsArr.slice(2, 8)" :key="events._id" :xs="24" :sm="12" :lg="8">
          <a :href="events.web" target="_blank">
            <el-card class="h-40 mb-5 md:hover:scale-105 hover:duration-500" :body-style="{ padding: '10px' }">
              <div class="flex flex-row h-full">
                <div class="mr-3">
                  <img :src="events.img" alt="" class="w-80 h-32 sm:w-44 md:w-80 lg:w-96 xl:w-80 rounded-lg mt-1" />
                </div>
                <div class="pb-9">
                  <h4 class="line-clamp-2 h-fit min-h-fit">
                    <b>{{ events.name_event }}</b>
                  </h4>

                  <p class="line-clamp-4 text-sm h-fit mt-2">
                    {{ events.time }}
                  </p>
                  <p class="line-clamp-4 text-sm h-fit mb-10">Địa điểm: {{ events.location }}</p>
                </div>
              </div>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <div class="text-center">
        <router-link to="/events" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">View all events</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHomepage } from '~/api/Homepage'
import { Homepage } from '~/models/Homepage'
import { Event } from '~/models/Event'
const eventsArr = ref<Event[]>([])
const homepage = ref<Homepage>()
onMounted(async () => {
  homepage.value = await getHomepage()
  eventsArr.value = homepage.value.top_events
})
</script>
