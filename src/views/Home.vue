<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <!-- <Search /> -->
    <HomeExpert />
    <HomeFields />
    <HomeNews />
    <HomeEventsVue />
    <!-- <ExpertPage /> -->
    <!-- <FieldsResults />
    <FieldsEvent /> -->
    <!-- <MapboxVue /> -->
    <!-- <FieldsResults /> -->
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'

import HomeExpert from '~/components/HomeExpert.vue'
import MapboxVue from '~/components/Mapbox.vue'
import HomeFields from '~/components/HomeFields.vue'
// import Search from '~/components/Search.vue'
// import HomeHeader from '~/components/layouts/HomeHeader.vue'
import FieldsResults from '~/components/FieldsResults.vue'
import ExpertPage from './ExpertPage.vue'
import NewsItem from '~/components/NewsItem.vue'
</script>
