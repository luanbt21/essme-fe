<template>
  <div>
    <h1>Home</h1>
    <HomeNews />

    <HomeEventsVue />
    <ExpertDetail />
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'

import ExpertDetail from '~/components/ExpertDetail.vue'
</script>
