<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <el-breadcrumb class="mb-4" :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>field</el-breadcrumb-item>
      <el-breadcrumb-item>{{ route.params.name }} </el-breadcrumb-item>
    </el-breadcrumb>
    <el-select
      v-model="blog.text"
      placeholder="Select field"
      class="ml-10 mt-2 h-[30px] w-[300px] bg-white scroll-smooth"
    >
      <!-- <el-option v-for="item in expertfield" :key="item._id" :label="item._id" :value="item._id">
        <el-button @click="handleFieldChange" style="float: left">{{ `${item._id} (${item.quantity})` }}</el-button>
      </el-option> -->
      <!-- <el-option
        v-for="item in expertfield"
        :key="item._id"
        :value="item._id"
        :label="item._id"
        @click="handleFieldChange"
        class="w-[200px] font-serif text-base scroll-smooth"
      >
        <div class="w-[200px] font-serif scroll-smooth">
          {{ `${item._id}` }}
        </div>
      </el-option> -->
    </el-select>
    <Fieldall :key="$route.fullPath" v-bind="props" />

    <HomeEventsVue :eventsArr="eventsArr" />
    <HomeNews :newsArr="newssArr" />
  </div>
  <div class="relative w-full min-w-[800px] mt-16">
    <FooterVue />
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
import { searchField } from '~/api/Research-area'
import { ResearchArea } from '~/models/Research-area'
const eventsArr = ref<Event[]>([])
const eventsPage = ref<PageEntity<Event>>()

const expertsPage = ref<PageEntity<Experts>>()

const newsPage = ref<PageEntity<News>>()
const newssArr = ref<News[]>([])

const route = useRoute()
// const pageSize = 10
// const experts = computed(() => (expertsPage.value ? expertsPage.value.content : []))
// // interface Props {
// //   name?: string

// //   page?: number
// // }
// // const props = defineProps<Props>()
const props = defineProps<{
  name?: string

  page?: number
}>()
// const router = useRouter()
// const handlePageChange = (page: number) => {
//   router.push({
//     name: 'fieldname',
//     query: {
//       page
//     }
//   })
// }
const blog = {
  text: ''
}
const expertfield = ref<ResearchArea>()
onMounted(async () => {
  //   // const a= route.params.name.
  //   // console.log(route.params.name.toString().toLowerCase().split(' ').at(0))
  //   expertsPage.value = await searchExperts1(
  //     `${route.params.name.toString().toLowerCase().split(' ').at(1)}`,
  //     5,
  //     props.page,
  //     pageSize,
  //     true
  //   )
  const field = route.params.name.toString().toLowerCase().split(' ').at(0)
  eventsPage.value = await searchEvents(`${route.params.name.toString().toLowerCase().split(' ').at(0)}`)
  console.log(typeof route.params.name.toString().toLowerCase().split(' ').at(0))
  eventsArr.value = eventsPage.value ? eventsPage.value.content : []

  newsPage.value = await searchNewss1(`${route.params.name.toString().toLowerCase().split(' ').at(0)}`)
  newssArr.value = newsPage.value ? newsPage.value.content : []
  // expertfield.value = await searchField(`${route.params.name}`)
  // console.log(route.params.name)
  //   console.log(experts.value)
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
