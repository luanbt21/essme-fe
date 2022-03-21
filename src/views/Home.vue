<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="mt-5 w-[95%] mx-auto justify-center">
      <Search
        label="Search"
        placeholder="Expert title"
        what-field="name"
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
    <HomeNews />
    <HomeEventsVue />

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
import HomeExpert from '~/components/HomeExpert.vue'
import HomeFields from '~/components/HomeFields.vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import Search from '~/components/Search.vue'
import HomeExpertnew from '~/components/HomeExpertnew.vue'
import { onMounted, ref } from 'vue'
import { searchExperts, getExperts } from '~/api/Experts'
import { useRouter } from 'vue-router'
import { PageEntity } from '~/models/PageEntity'
import { Experts } from '~/models/Experts'

const router = useRouter()

const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()

const expertsPage = ref<PageEntity<Experts>>()

onMounted(async () => {
  expertsPage.value = await searchExperts(props.what, props.where, props.page)
})
const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'allexperts',
    query: {
      what,
      where,

      page: 1
    }
  })
}
</script>
