<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-white rounded-[40px] p-[50px] flex flex-col">
    <ExpertsFieldVue v-bind="props" />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import ExpertsFieldVue from '~/components/ExpertsField.vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'

const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
</script>
