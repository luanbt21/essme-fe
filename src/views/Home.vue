<template>
  <div>
    <h1>Home</h1>
    <HomeNews />

    <HomeEventsVue />

    <br />
    <HomeExpert />
    <br />
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'

import HomeExpert from '~/components/HomeExpert.vue'
</script>
