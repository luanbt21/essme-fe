<template>
  <div class="container mt-10 m-auto">
    <h2 class="text-2xl mb-2">Events</h2>
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <el-carousel trigger="click" type="card">
        <el-carousel-item
          class="text-center opacity-100"
          v-for="events in eventsArr"
          :key="events._id"
          :xs="24"
          :sm="12"
          :lg="8"
        >
          <a :href="events.web" target="_blank">
            <el-card
              class="md:hover:scale-105 hover:duration-500 flex-col-reverse justify-center pb-12 w-80 inline-block"
            >
              <el-col class="flex">
                <el-col>
                  <el-row>
                    <img
                      :src="events.img"
                      alt=""
                      class="w-80 cover h-40 pb-3 cursor-pointer rounded-2xl"
                      :xs="24"
                      :sm="12"
                      :lg="8"
                    />
                  </el-row>
                  <<<<<<< HEAD
                  <h2 class="font-bold w-64 text-left">{{ events.name_event }}</h2>
                  =======
                  <h2 class="font-bold w-64 text-left">{{ events.event_name }}</h2>
                  >>>>>>> Huong
                  <a href="#"><p class="text-xl text-left">Time of event</p></a>
                  <a href="#"><p class="text-xl text-left">Location</p></a>
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
import { Events } from '~/models/Events'

const eventsArr = ref<Events[]>([])

onMounted(async () => {
  eventsArr.value = await getEvents(6)
})

<<<<<<< HEAD
const events: Event[] = []
=======
const events: Events[] = []
>>>>>>> Huong

for (let i = 0; i < 3; i++) {
  events.push()
}
defineProps<{
  events: Event
}>()
</script>
