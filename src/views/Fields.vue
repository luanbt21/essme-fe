<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <Search />
    <Mapbox />
    <FieldsResults />
    <FieldsEvent />
    <HomeNews />
  </div>
</template>

<script setup lang="ts">
import Search from '~/components/Search.vue'
import Mapbox from '~/components/Mapbox.vue'
import FieldsResults from '~/components/FieldsResults.vue'
import HomeNews from '~/components/HomeNews.vue'
// import Events from './Events.vue'
import FieldsEvent from '~/components/FieldsEvent.vue'
</script>
