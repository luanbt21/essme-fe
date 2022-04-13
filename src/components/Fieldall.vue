<template>
  <el-scrollbar :key="$route.fullPath" class="bg-[rgb(209,224,219)] p-9 rounded-2xl" height="800px">
    <div class="rounded-3xl bg-slate-50" v-for="expert in experts" :key="expert._id">
      <FieldExpert :key="$route.fullPath" :expert="expert" />
    </div>
  </el-scrollbar>
  <div class="w-[68%] flex justify-center text-center">
    <div class="">
      <el-pagination
        layout="prev, pager, next"
        :page-count="expertsPage?.totalPages"
        :current-page="props.page"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fieldall from '~/components/Fieldall.vue'
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

const props = defineProps<{
  name?: string

  page?: number
}>()
const expertsPage = ref<PageEntity<Experts>>()
const router = useRouter()
const pageSize = 10
const handlePageChange = (page: number) => {
  router.push({
    name: 'fieldname',
    query: {
      page
    }
  })
}
const experts = computed(() => (expertsPage.value ? expertsPage.value.content : []))

const route = useRoute()
onMounted(async () => {
  // const a= route.params.name.
  // console.log(route.params.name.toString().toLowerCase().split(' ').at(0))
  expertsPage.value = await searchExperts1(props.name, 5, props.page, pageSize, true)
})
</script>

<style></style>
