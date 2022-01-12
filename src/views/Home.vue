<template>
  <div>
    <h1>Home</h1>
    <HomeNews />
    <br />
    <HomeExpert />

    <HomeEventsVue />
  </div>
</template>

<script lang="ts" setup>
import HomeNews from '~/components/HomeNews.vue'
import HomeExpert from '~/components/HomeExpert.vue'
import HomeEventsVue from '~/components/HomeEvents.vue'
</script>
