<template>
  <div class="mt-[50px] mb-[20px] w-fit border-solid border-2 border-sky-300 px-8 py-2 rounded-3xl shadow-lg">
    <div>
      <div class="text-xl text-black">Hot News</div>
    </div>
  </div>
  <div class="mx-auto common-layout">
    <el-container class="container">
      <el-aside width="200px" class="hidden md:block pt-5">
        <h3>By Fields</h3>
        <!-- <el-input type="text" placeholder="Fields Search" /> -->
        <el-checkbox-group v-model="typesSelect" :max="1">
          <div v-for="(type, index) in types" :key="index">
            <el-checkbox class="z-[0]" :label="type" style="white-space: pre-wrap" />
          </div>
        </el-checkbox-group>
      </el-aside>
      <el-main
        ><el-row :gutter="20">
          <el-col v-for="news in newss" :key="news._id" :xs="24" :sm="12">
            <NewsItem :news="news" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <div class="grid justify-items-center text-center">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :page-count="newsPage?.totalPages"
        @current-change="handlePageChange"
        :current-page="props.page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getNews, searchNewss } from '~/api/News'
import NewsItem from '~/components/NewsItem.vue'
import { News as NewsModel } from '~/models/News'
import { PageEntity } from '~/models/PageEntity'
import { useRouter } from 'vue-router'
const router = useRouter()

const pageSize = 10

const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()

const newsPage = ref<PageEntity<NewsModel>>()

onMounted(async () => {
  newsPage.value = await searchNewss(props.what, props.where, props.page, pageSize)
})

const handlePageChange = (page: number) => {
  router.push({
    name: 'news',
    query: {
      page
    }
  })
}

const newssData = computed(() => (newsPage.value ? newsPage.value.content : []))

const types = computed(() => {
  const result = new Set<string>()
  for (const news of newssData.value) {
    result.add(news.tag)
  }
  return result
})

const typesSelect = ref<string[]>([])
const newss = computed(() => {
  if (typesSelect.value.length === 0) return newssData.value
  else {
    return newssData.value.filter(news => {
      return typesSelect.value.every(type => news.tag.includes(type))
    })
  }
})
</script>
