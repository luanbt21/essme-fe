<template>
  <div class="container m-auto mt-10 mb-9">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.events', {}, { locale: $i18n.locale }) }}</h2>
      <div v-if="eventsArr.length === 0" class="px-8 py-4 bg-[#D1E0DB] rounded-xl text-center">
        <div>{{ $t('message.noresult', {}, { locale: $i18n.locale }) }}</div>
      </div>
      <div v-else class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
        <el-carousel :interval="4000" type="card" height="450px" :autoplay="true">
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
                <img
                  :src="events.img ? events.img : img"
                  class="image w-72 h-40 pb-3 cursor-pointer rounded-2xl object-cover"
                  :xs="24"
                  :sm="12"
                  :lg="8"
                />
                <div style="padding: 14px">
                  <h3 class="font-medium text-lg">
                    {{ events.name_event }}
                  </h3>
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar-check mr-2 mt-[2px]"
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
                  </div>
                  <div class="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-geo-alt-fill mr-2 mt-[2px]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <p class="text-base text-left truncate">{{ events.location }}</p>
                  </div>
                </div>
              </el-card>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="eventsArr.length === 0" class="px-8 py-4 bg-[#D1E0DB] rounded-xl text-center"></div>
      <div v-else class="text-center">
        <router-link to="/events" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">{{
            $t('message.showmore', {}, { locale: $i18n.locale })
          }}</el-link>
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
const homepage = ref<Homepage>()

const img = 'https://th.bing.com/th/id/OIP.iSu2RcCcdm78xbxNDJMJSgHaEo?pid=ImgDet&rs=1'

const props = defineProps<{
  eventsArr: Event[]
}>()
</script>
