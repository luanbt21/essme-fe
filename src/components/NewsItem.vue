<template>
  <div>
    <a :href="news.url" target="_blank">
      <router-link :to="`/news/${news._id}`">
        <el-card class="h-[150px] mb-5 md:hover:scale-105 hover:duration-500" :body-style="{ padding: '10px' }">
          <h4 class="line-clamp-2 h-fit min-h-[3rem]">
            {{ news.title }}
          </h4>
          <div class="flex flex-row h-full">
            <img :src="news.img" alt="" class="w-auto h-20 rounded-lg mr-3" />
            <div>
              <p class="line-clamp-3 text-sm h-fit">
                {{ news.content }}
              </p>
              <el-tag type="info" effect="dark">
                {{ news.tag }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </router-link>
    </a>
  </div>
</template>

<script setup lang="ts">
import { News } from '~/models/News'
defineProps<{
  news: News
}>()
</script>
