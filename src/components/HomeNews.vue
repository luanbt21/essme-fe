<template>
  <div class="container m-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.news', {}, { locale: $i18n.locale }) }}</h2>
      <div v-if="newsArr.length === 0" class="px-8 py-4 bg-[#D1E0DB] rounded-xl text-center">
        <div>{{ $t('message.noresult', {}, { locale: $i18n.locale }) }}</div>
      </div>
      <el-row v-else :gutter="30">
        <el-col v-for="news in newsArr" :key="news._id" :xs="24" :sm="12" :lg="8">
          <router-link :to="`/news/${news._id}`">
            <el-card class="h-36 mb-5 md:hover:scale-105 hover:duration-500" :body-style="{ padding: '10px' }">
              <h4 class="line-clamp-2 h-fit min-h-[3rem]">
                {{ news.title }}
              </h4>
              <div class="flex flex-row h-full">
                <img :src="news.img" alt="" class="w-auto h-20 rounded-lg mr-3" />
                <div>
                  <p class="line-clamp-4 text-sm h-fit">
                    {{ news.content }}
                  </p>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>

      <div v-if="newsArr.length === 0" class="px-8 py-4 bg-[#D1E0DB] rounded-xl text-center"></div>
      <div v-else class="text-center">
        <router-link to="/news" custom v-slot="{ navigate, href }">
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
import { getNewsHome } from '~/api/News'
import { News } from '~/models/News'
import NewsItem from './NewsItem.vue'

// const newsArr = ref<News[]>([])

// onMounted(async () => {
//   newsArr.value = await getNewsHome(9)
// })

const props = defineProps<{
  newsArr: News[]
}>()
</script>
