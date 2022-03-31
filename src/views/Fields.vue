<template>
  <div
    :xs="24"
    :sm="12"
    :lg="8"
    class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col"
    :key="$route.fullPath"
    v-bind="props"
  >
    <div class="container px-5 py-6 mx-auto" :key="$route.fullPath" v-bind="props">
      <Search
        label="Search Events?"
        placeholder="Event title"
        what-field="name_event"
        :what-suggest="searchEvents"
        where-field="location"
        :where-suggest="whereSuggest"
        @search="handleSearch"
      />

      <el-container class="container text-center">
        <el-col class="hidden md:block pt-5" :key="$route.fullPath">
          <h2 class="text-2xl mb-2 text-left">Results</h2>
          <div v-if="experts.length === 0">No result</div>
          <div v-else class="h-[820px]">
            <el-scrollbar height="820px" :key="$route.fullPath" v-bind="props">
              <div v-for="expert in experts" :key="expert._id">
                <FieldsResults :expert="expert" />
              </div>
            </el-scrollbar>
          </div>
          <div class="bg-[#D1E0DB]">
            <el-col class="flex-col px-8 py-4">
              Fields
              <el-select v-model="typesSelect" class="m-2" placeholder="Select" size="large">
                <el-option
                  v-for="type in expertfield"
                  :key="type._id"
                  :label="`${type._id} (${type.quantity})`"
                  :value="type._id"
                  @change="handleFieldChange"
                >
                </el-option>
              </el-select>
            </el-col>
          </div>
        </el-col>
      </el-container>
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script setup lang="ts">
import { searchExperts, getExperts, getExpertstop, FieldsType, fieldsExperts, getExpertByField } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'
// import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'
// import ExpertsItem from '~/components/ExpertsItem.vue'
const router = useRouter()
const pageSize = 10
const mapCenter = ref<number[]>()
const expertfield = ref<FieldsType[]>([])
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const expertField = ref<ExpertModel[]>()
const props = defineProps<{
  field: string
  limit: number
  skip: number
}>()
let id = ''
const callFunction = (e: any) => {
  id = e.target.value
  console.log(id)
}
const handlePageChange = (field: string, limit: number, skip: number) => {
  router.push({
    name: 'fieldname',
    query: {
      field: props.field,
      limit: props.limit,
      skip: props.skip
    }
  })
}
const types = computed(() => {
  const result = new Set<string>()
  for (const expert of expertsData.value) {
    for (const type of expert.address) {
      result.add(type)
    }
  }
  return result
})
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))
const typesSelect = ref('')
const experts = computed(() => {
  return expertsData.value
})
const mapData = computed((): Feature[] =>
  experts.value.map(
    expert =>
      ({
        type: 'Feature',
        geometry: expert.location.features[0].geometry,
        properties: {
          label: expert.name,
          html: `<span>${expert.name}</span>`
        }
      } as Feature)
  )
)
const handleFieldChange = () => {
  router.push({
    name: 'fieldname',
    query: {
      field: typesSelect.value.toString(),
      limit: 10,
      skip: 0
    }
  })
}
onMounted(async () => {
  expertField.value = await getExpertByField(props.field, props.limit, props.skip)
  // expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(20, 1)
  expertfield.value = await fieldsExperts()
})
const handleSearch = (field: string, limit: number, skip: number) => {
  router.push({
    name: 'fieldname',
    query: {
      field,
      limit,
      skip
    }
  })
}
</script>
