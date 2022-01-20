<template>
  <div>
    <h1>Home</h1>
    <HomeNews />

    <HomeEventsVue />

    <br />
    <HomeExpert />
    <br />
    <!-- <MapboxVue /> -->
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'

import HomeExpert from '~/components/HomeExpert.vue'
// import MapboxVue from '~/components/Mapbox.vue'
</script>
