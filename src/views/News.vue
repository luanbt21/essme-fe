<template>
  <div class="container mx-auto">
    <div v-for="news in newsArr" :key="news._id">
      <NewsItem :news="news" />
    </div>
    <div class="text-center">
      <el-pagination layout="prev, pager, next" :page-size="20" :total="1000" @current-change="handleCurrentChange" />
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getNews } from '~/api/News'
import NewsItem from '~/components/NewsItem.vue'
import { News } from '~/models/News'
import FooterVue from '~/components/tkhuyen/Footer.vue'
const newsArr = ref<News[]>([])
const page = ref(1)

const handleCurrentChange = (val: number) => {
  page.value = val
}

onMounted(async () => {
  newsArr.value = await getNews(20)
})
</script>
