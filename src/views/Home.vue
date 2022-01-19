<template>
  <div class="relative w-[97%] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <HomeNews />
    <HomeEventsVue />

    <br />
    <HomeExpert />
    <br />
    <MapboxVue />
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'

import HomeExpert from '~/components/HomeExpert.vue'
import MapboxVue from '~/components/Mapbox.vue'
</script>
