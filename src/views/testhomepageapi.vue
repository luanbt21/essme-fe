<template>
  <div v-for="expert in expertArr" :key="expert._id">
    {{ expert._id }}
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getHomepage } from '~/api/Homepage'
import { Expert } from '~/models/Expert'
import { Event } from '~/models/Event'
import { Field } from '~/models/Field'
import { Footer } from '~/models/Footer'
import { Homepage } from '~/models/Homepage'
import { useStore } from '~/store/index'
import { loadavg } from 'os'
const homepage = ref<Homepage>()
const expertArr = ref<Expert[]>([])
const eventArr = ref<Event[]>([])
const fieldArr = ref<Field[]>([])
const footer = ref<Footer>()

onMounted(async () => {
  homepage.value = await getHomepage()
  // expertArr.value = homepage.value.top_experts
  fieldArr.value = homepage.value.fields
  footer.value = homepage.value.Footer
  eventArr.value = homepage.value.top_events

  // console.log(homepage.value.top_events)
  // console.log(homepage.value.top_experts)
  // console.log([1, 2, 3])
})
</script>
