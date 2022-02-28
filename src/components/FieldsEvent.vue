<template>
  <div class="container mt-10 m-auto">
    <h2 class="text-2xl mb-2">Events</h2>
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <el-carousel trigger="click" type="card" :autoplay="false">
        <el-carousel-item
          class="text-center opacity-100"
          v-for="events in eventsArr"
          :key="events._id"
          :xs="24"
          :sm="12"
          :lg="8"
        >
          <a :href="events.web" target="_blank">
            <el-card class="flex-col-reverse justify-center pb-12 w-80 inline-block">
              <el-col class="flex">
                <el-col>
                  <el-row>
                    <img
                      :src="events.img"
                      alt=""
                      class="w-72 h-40 pb-3 cursor-pointer rounded-2xl"
                      :xs="24"
                      :sm="12"
                      :lg="8"
                    />
                  </el-row>
                  <!-- <h2 class="font-bold w-64 text-left truncate">{{ events.event_name }}</h2> -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-calendar-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                    />
                  </svg>
                  <p class="text-base text-left truncate">{{ events.time }}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                  <p class="text-base text-left truncate">{{ events.location }}</p>
                </el-col>
              </el-col>
            </el-card>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getEvents } from '~/api/Events'
import { Event } from '~/models/Event'

const eventsArr = ref<Event[]>([])

onMounted(async () => {
  eventsArr.value = await getEvents(6)
})

const events: Event[] = []

defineProps<{
  events: Event
}>()
</script>
