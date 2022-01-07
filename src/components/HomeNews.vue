<template>
  <div class="container m-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">News</h2>
      <el-row :gutter="30">
        <el-col v-for="news in newsArr" :key="news._id" :xs="24" :sm="12" :lg="8">
          <el-card class="h-44 mb-5 md:hover:scale-105 duration-200" :body-style="{ padding: '10px' }">
            <h3 class="line-clamp-2 h-fit min-h-[3rem]">
              {{ news.title }}
            </h3>
            <div class="flex flex-row h-full">
              <img :src="news.img" alt="" class="w-auto h-[105px] rounded-lg mr-3" />
              <div>
                <p class="line-clamp-4 text-sm h-fit">
                  {{ news.content }}
                </p>
                <el-link type="primary" :href="news.url" target="_blank">more</el-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="text-center">
        <router-link to="/news" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">View all news</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getNews } from '~/api/News'
import { News } from '~/models/News'

const newsArr = ref<News[]>([])

onMounted(async () => {
  newsArr.value = await getNews(6, 0)
})
</script>
