<template>
  <div class="container -translate-y-24 bg-slate-200 rounded-[40px] p-[3%] flex flex-col">
    <div>
      <Search
        label="Search Events?"
        placeholder="Event title"
        what-field="name_event"
        :what-suggest="searchEvents"
        where-field="location"
        :where-suggest="whereSuggest"
        @search="handleSearch"
      />
      <el-container class="container">
        <el-aside width="200px" class="hidden md:block pt-5">
          <div class="text-center">
            <el-button @click="filter">{{ $t('message.Filter', {}, { locale: $i18n.locale }) }}</el-button>
          </div>
          <div>{{ $t('message.ByTags', {}, { locale: $i18n.locale }) }}</div>
          <el-checkbox-group v-model="tagsSelect">
            <div v-for="t in allTags" :key="t._id">
              <el-checkbox :label="t._id" style="white-space: pre-wrap">
                {{ `${t._id} (${t.quantity})` }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
          <div>{{ $t('message.ByTypes', {}, { locale: $i18n.locale }) }}</div>
          <el-checkbox-group v-model="typesSelect">
            <div v-for="t in allTypes" :key="t._id">
              <el-checkbox :label="t._id" style="white-space: pre-wrap">
                {{ `${t._id} (${t.quantity})` }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-aside>
        <EventPageBody :key="$route.fullPath" v-bind="props" />
      </el-container>
    </div>
  </div>
  <FooterVue />
</template>

<script setup lang="ts">
import { searchEvents, getEventTypes, TypeCount, getEventTags } from '~/api/Events'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '~/components/Search.vue'

import FooterVue from '~/components/tkhuyen/Footer.vue'
import EventPageBody from '~/components/EventPageBody.vue'

const router = useRouter()

interface Props {
  what?: string
  where?: string
  types?: string
  tags?: string
  page?: number
}
const props = defineProps<Props>()

const whereSuggest = (queryString: string) => {
  return searchEvents('', queryString)
}

const allTypes = ref<TypeCount[]>([])
const typesSelect = ref<string[]>([])

const allTags = ref<TypeCount[]>([])
const tagsSelect = ref<string[]>([])

const filter = () => {
  router.push({
    name: 'events',
    query: {
      // what: props.what,
      // where: props.where,
      types: typesSelect.value.toString(),
      tags: tagsSelect.value.toString(),
      page: 1
    }
  })
}

onMounted(async () => {
  allTypes.value = await getEventTypes()
  allTags.value = await getEventTags()
})

const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'events',
    query: {
      what,
      where,
      types: typesSelect.value.toString(),
      tags: tagsSelect.value.toString(),
      page: 1
    }
  })
}
</script>
