<template>
  <div class="container m-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">News</h2>
      <el-row :gutter="30">
        <el-col v-for="news in newsArr" :key="news._id" :xs="24" :sm="12" :lg="8">
          <NewsItem :news="news" />
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
import NewsItem from './NewsItem.vue'

const newsArr = ref<News[]>([])

onMounted(async () => {
  newsArr.value = await getNews(6, 0)
})
</script>
