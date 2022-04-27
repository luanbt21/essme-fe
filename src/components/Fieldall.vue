<template>
  <div class="bg-[hsl(160,19%,85%)] p-9 rounded-2xl">
    <h2 class="text-center text-2xl mb-2">{{ $t('message.fields', {}, { locale: $i18n.locale }) }}</h2>
    <div v-if="$t('message.fields', {}, { locale: $i18n.locale }) === 'FIELDS'" class="mb-10">
      <span class="p-10">{{ $t('message.Choosethefield', {}, { locale: $i18n.locale }) }}:</span>
      <el-select
        v-model="blog.text"
        filterable
        :placeholder="`${$t('message.placeholderselect', {}, { locale: $i18n.locale })}`"
        class="ml-10 mt-2 h-[30px] w-[300px] bg-white scroll-smooth"
      >
        <el-option
          v-for="(reason, key) in expertfield?.key_en"
          :key="key"
          :value="reason"
          :label="reason"
          @click="handleFieldChange"
          class="w-[300px] font-serif text-base scroll-smooth"
        />
      </el-select>
    </div>
    <div v-else class="mb-10">
      <span class="p-10">{{ $t('message.Choosethefield', {}, { locale: $i18n.locale }) }}:</span>
      <el-select
        v-model="blog.text"
        filterable
        :placeholder="`${$t('message.placeholderselect', {}, { locale: $i18n.locale })}`"
        class="ml-10 mt-2 h-[30px] w-[300px] bg-white scroll-smooth"
      >
        <el-option
          v-for="(reason, key) in expertfield?.keys"
          :key="key"
          :value="reason"
          :label="reason"
          @click="handleFieldChange"
          class="w-[300px] font-serif text-base scroll-smooth"
        />
      </el-select>
    </div>
    <el-scrollbar v-if="experts.length === 0" height="100px" class="text-center">
      <div>No result</div>
    </el-scrollbar>
    <el-scrollbar v-else :key="$route.fullPath" height="800px">
      <div class="rounded-3xl bg-slate-50" v-for="expert in experts" :key="expert._id">
        <FieldExpert :key="$route.fullPath" :expert="expert" />
      </div>
    </el-scrollbar>
  </div>
  <div v-if="experts.length === 0"></div>
  <div v-else class="w-[100%] mt-5 flex justify-center text-center">
    <div class="">
      <el-pagination
        v-if="props.what === undefined"
        layout="prev, pager, next"
        :page-count="expertsall?.totalPages"
        :current-page="props.page"
        @current-change="handlePageChange"
      />
      <el-pagination
        v-else
        layout="prev, pager, next"
        :page-count="expertsPage?.totalPages"
        :current-page="props.page"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Fieldall from '~/components/Fieldall.vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Experts } from '~/models/Experts'
import { Event } from '~/models/Event'
import { PageEntity } from '~/models/PageEntity'
import { searchExperts1 } from '~/api/Experts'
import FieldExpert from '~/components/tkhuyen/FieldExpert.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import HomeEventsVue from '~/components/HomeEvents.vue'
import { searchEvents } from '~/api/Events'
import { News } from '~/models/News'
import { searchNewss1 } from '~/api/News'
import HomeNews from '~/components/HomeNews.vue'
import { useRouter } from 'vue-router'
import { searchField } from '~/api/Research-area'
import { ResearchArea } from '~/models/Research-area'
const props = defineProps<{
  name?: string
  what?: string
  page?: number
}>()
const expertsall = ref<PageEntity<Experts>>()
const expertsPage = ref<PageEntity<Experts>>()
const router = useRouter()
const pageSize = 10
const experts = computed(() => {
  if (props.what === undefined) return expertsallData.value
  else {
    return expertsData.value
  }
})
const handlePageChange = (page: number) => {
  router.push({
    name: 'fieldname',
    query: {
      what: props.what,
      page
    }
  })
}
const handleFieldChange = () => {
  router.push({
    name: 'fieldname',
    query: {
      what: blog.text.toString(),
      // where: props.where,
      page: 1
    }
  })
}
const expertsallData = computed(() => (expertsall.value ? expertsall.value.content : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))
const blog = {
  text: ''
}

const expertfield = ref<ResearchArea>()
const fieldArr = ref<String[]>()
const route = useRoute()
onMounted(async () => {
  const field = route.params.name
  // console.log(route.params.name.toString().toLowerCase().split(' ').at(0))
  expertsPage.value = await searchExperts1(props.what, 5, props.page, pageSize, true)
  expertsall.value = await searchExperts1(route.params.name.toString(), 5, props.page, pageSize, true)
  expertfield.value = await searchField(route.params.name.toString())
  // console.log(props.what)
  // expertfield.value = await searchField(route.params.name.toString())
  // fieldArr.value = expertfield.value.keys
  console.log(experts.value.length)
})
</script>

<style></style>
