<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <el-breadcrumb class="mb-4" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>field</el-breadcrumb-item>
      <el-breadcrumb-item>{{ route.params.name }} </el-breadcrumb-item>
    </el-breadcrumb>
    <el-scrollbar class="bg-[rgb(209,224,219)] p-9 rounded-2xl" height="800px">
      <div class="rounded-3xl bg-slate-50" v-for="expert in experts">
        <FieldExpert :expert="expert" />
      </div>
    </el-scrollbar>
    <div class="w-[68%]">
      <div class="grid justify-items-center text-center">
        <el-pagination
          layout="prev, pager, next"
          :page-count="expertsPage?.totalPages"
          :current-page="props.page"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <HomeEventsVue :eventsArr="eventsArr" />
    <HomeNews :newsArr="newssArr" />
  </div>
  <div class="relative w-full min-w-[800px] mt-16">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Experts } from '~/models/Experts'
import { Event } from '~/models/Event'
import { PageEntity } from '~/models/PageEntity'
import { searchExperts1 } from '~/api/Experts'
import FieldExpert from '~/components/tkhuyen/FieldExpert.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import HomeEventsVue from '~/components/HomeEvents.vue'
import { searchEvents } from '~/api/Events'
import { News } from '~/models/News'
import { searchNewss1 } from '~/api/News'
import HomeNews from '~/components/HomeNews.vue'
import { useRouter } from 'vue-router'

const eventsArr = ref<Event[]>([])
const eventsPage = ref<PageEntity<Event>>()

const expertsPage = ref<PageEntity<Experts>>()

const newsPage = ref<PageEntity<News>>()
const newssArr = ref<News[]>([])

const route = useRoute()

const experts = computed(() => (expertsPage.value ? expertsPage.value.content : []))
const props = defineProps<{
  what?: string

  page?: number
}>()
const router = useRouter()
const handlePageChange = (page: number) => {
  router.push({
    name: '/fields/:name',
    query: {
      what: `${route.params.name.toString().toLowerCase().split(' ').at(0)}`,

      page
    }
  })
}
onMounted(async () => {
  // const a= route.params.name.
  // console.log(route.params.name.toString().toLowerCase().split(' ').at(0))
  expertsPage.value = await searchExperts1(
    `${route.params.name.toString().toLowerCase().split(' ').at(0)}`,
    5,
    props.page,
    100,
    true
  )
  eventsPage.value = await searchEvents(`${route.params.name.toString().toLowerCase().split(' ').at(0)}`)
  eventsArr.value = eventsPage.value ? eventsPage.value.content : []

  newsPage.value = await searchNewss1(`${route.params.name.toString().toLowerCase().split(' ').at(0)}`)
  newssArr.value = newsPage.value ? newsPage.value.content : []

  // console.log(expertsPage.value)
})
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
