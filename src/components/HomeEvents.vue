<template>
  <div class="container m-auto mt-10">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">Events</h2>
      <el-row :gutter="30">
        <el-col v-for="events in newsArr" :key="events._id" :xs="24" :sm="12" :lg="8">
          <a :href="events.web" target="_blank">
            <el-card class="h-40 mb-5 md:hover:scale-105 hover:duration-500" :body-style="{ padding: '10px' }">
              <div class="flex flex-row h-full">
                <img :src="events.img" alt="" class="w-56 h-auto rounded-lg mr-3" />
                <div>
                  <h4 class="line-clamp-2 h-fit min-h-[3rem]">
                    <b>{{ events.event_name }}</b>
                  </h4>
                  <p class="line-clamp-4 text-sm h-fit">
                    {{ events.time }}
                  </p>
                  <p class="line-clamp-4 text-sm h-fit">Địa điểm: {{ events.location }}</p>
                </div>
              </div>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <div class="text-center">
        <router-link to="/news" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">View all events</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getEvents } from '~/api/Events'
import { Events } from '~/models/Events'

const newsArr = ref<Events[]>([])

onMounted(async () => {
  newsArr.value = await getEvents(6, 0)
})
</script>
