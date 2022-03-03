<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <!-- <NewsItem /> -->
    <News />
  </div>
</template>

<script setup lang="ts">
import News from '~/components/News.vue'
import NewsItem from '~/components/NewsItem.vue'
</script>
