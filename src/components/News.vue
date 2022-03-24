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
        <el-checkbox-group v-model="tagSelect" :max="1">
          <div v-for="t in tags" :key="t">
            <el-checkbox class="z-[0]" :label="t" style="white-space: pre-wrap" />
          </div>
        </el-checkbox-group>
        <el-button @click="filter"> Filter </el-button>
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
import { searchNewss, getNewsTags } from '~/api/News'
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
  tag?: string
}>()

const newsPage = ref<PageEntity<NewsModel>>()

const newss = computed(() => (newsPage.value ? newsPage.value.content : []))

const tags = ref<string[]>([])

const tagSelect = ref<string[]>([])

const handlePageChange = (page: number) => {
  router.push({
    name: 'news',
    query: {
      page,
      tag: tagSelect.value
    }
  })
}

const filter = () => {
  router.push({
    name: 'news',
    query: {
      page: 1,
      tag: tagSelect.value
    }
  })
}

onMounted(async () => {
  tags.value = await getNewsTags()
  newsPage.value = await searchNewss(props.what, props.where, props.page, pageSize, props.tag)
})
</script>
