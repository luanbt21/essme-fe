<template>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <!-- <SearchVue /> -->
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <!-- <MapboxVue /> -->
  </div>

  <div class="mt-5 ml-11 w-[95%] m-auto flex justify-center">
    <el-row :gutter="20" class="flex">
      <div class="w-[79%] bg-[#D1E0DB] rounded-[15px]">
        <div class="font-bold text-center p-5 text-2xl">Leading Experts</div>
        <el-scrollbar height="480px">
          <el-col :span="12" v-for="expert in expertArr.slice(2, 8)" :key="expert._id" height="639px">
            <el-card
              :style="{ 'background-color': ' #FFFFFF' }"
              class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px]"
            >
              <router-link
                v-bind:to="'/expert/' + expert._id"
                custom
                v-slot="{ navigate, href }"
                :style="{ 'text-decoration': 'none' }"
              >
                <a type="primary" :href="href" @click="navigate" text-decoration="none">
                  <div class="flex no-underline">
                    <div class="basis-3/4 text-black">
                      <div>{{ expert.name }}</div>
                      <div class="my-5">{{ expert.degree }}</div>
                      <div>
                        <p>{{ expert.company }}</p>
                      </div>
                    </div>
                    <div class="basis-1/4">
                      <img
                        src="https://img.xcitefun.net/users/2008/05/2997,xcitefun-little-cute-chicken-wallpapers-3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </a>
              </router-link>
            </el-card>
          </el-col>
        </el-scrollbar>
      </div>

      <div class="bg-[#D1E0DB] rounded-[15px] mx-2 w-[19%]">
        <div class="font-bold text-center p-5 text-2xl">City/Province</div>
      </div>
    </el-row>
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeFieldsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeNewsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeEventsVue />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts, getExpertById } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { useStore } from '~/store/index'
import SearchVue from './Search.vue'
import MapboxVue from './Mapbox.vue'
import HomeFieldsVue from './HomeFields.vue'
import HomeNewsVue from './HomeNews.vue'
import HomeEventsVue from './HomeEvents.vue'
const expertArr = ref<Expert[]>([])

onMounted(async () => {
  expertArr.value = await getExperts(8)
})
</script>

<style></style>
