<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="mt-5 w-[95%] mx-auto justify-center">
      <Search
        label="Search Field?"
        placeholder="Expert title"
        what-field="research_area"
        :what-suggest="searchExperts"
        where-field="location"
        :where-suggest="getExperts"
        @search="handleSearch"
      />
    </div>
    <!-- <DemoVue /> -->
    <HomeExpertnew />
    <HomeFields />
    <HomeFQAs />
    <HomeNews :newsArr="newsArr" />
    <HomeEventsVue :eventsArr="eventsArr" />

    <br />

    <br />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import HomeFQAs from '~/components/HomeFQAs.vue'
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'
import HomeFields from '~/components/HomeFields.vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import Search from '~/components/Search.vue'
import HomeExpertnew from '~/components/HomeExpertnew.vue'
import { onMounted, ref } from 'vue'
import { searchExperts, getExperts } from '~/api/Experts'
import { useRouter } from 'vue-router'
import { PageEntity } from '~/models/PageEntity'
import { Experts } from '~/models/Experts'
import { Homepage } from '~/models/Homepage'
import { Event } from '~/models/Event'
import { getHomepage } from '~/api/Homepage'
import { News } from '~/models/News'
import { getNewsHome } from '~/api/News'
const homepage = ref<Homepage>()
const eventsArr = ref<Event[]>([])

const router = useRouter()

const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()

const expertsPage = ref<PageEntity<Experts>>()
const newsArr = ref<News[]>([])
onMounted(async () => {
  expertsPage.value = await searchExperts(props.what, props.where, props.page)
  homepage.value = await getHomepage()
  eventsArr.value = homepage.value.top_events
  newsArr.value = await getNewsHome(9)
  // console.log(newsArr.value)
})
const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'expertfields',
    query: {
      what,
      where,
      page: 1
    }
  })
}
</script>
