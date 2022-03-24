<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="container px-5 py-6 mx-auto">
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
        <el-col :span="19" class="hidden md:block pt-5">
          <div v-if="experts.length === 0">No result</div>
          <div v-else class="h-[820px]">
            <el-scrollbar height="820px" :key="$route.fullPath">
              <FieldsResults v-for="expert in experts" :key="expert._id" :expert="expert" />
            </el-scrollbar>
          </div>
        </el-col>

        <el-col :span="5">
          <el-scrollbar height="750px" class="mt-4">
            <div>
              <el-radio-group v-model="typesSelect" size="large" class="">
                <div class="w-[50px]">
                  <div v-for="field in expertfield" :key="field._id" class="">
                    <div class="w-[100px] flex flex-wrap">
                      <el-radio-button :label="field._id" class="w-10 m-2" @change="handleFieldChange">
                        {{ `${field._id} (${field.quantity})` }}
                      </el-radio-button>
                    </div>
                    <br />
                  </div>
                </div>
              </el-radio-group>
            </div>
          </el-scrollbar>
        </el-col>
      </el-container>
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script setup lang="ts">
import { searchExperts, getExperts, getExpertstop, FieldsType, fieldsExperts } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '~/components/Search.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'
import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import ExpertsItem from '~/components/ExpertsItem.vue'
const router = useRouter()
const pageSize = 10
const mapCenter = ref<number[]>()
const results = ref<FieldsResults[]>([])
const expertfield = ref<FieldsType[]>([])
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
  field?: string
}>()
let id = ''
const callFunction = (e: any) => {
  id = e.target.value
  console.log(id)
}
const handlePageChange = (page: number) => {
  router.push({
    name: 'fieldname',
    query: {
      what: props.what,
      where: props.where,
      page
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
const mapData = computed(
  (): Feature[] =>
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
  // experts.value.map(
  //   expert =>
  //     ({
  //       type: 'Feature',
  //       geometry: expert.location.features[0].geometry,
  //       properties: {
  //         label: expert.name,
  //         html: `<span>${expert.name}</span>`
  //       }
  //     } as Feature)
  // )
)
const handleFieldChange = () => {
  router.push({
    name: 'fieldname',
    query: {
      what: typesSelect.value.toString(),
      // where: props.where,
      page: 1
    }
  })
}
onMounted(async () => {
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(20, 1)
  expertfield.value = await fieldsExperts()
})
const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'fieldname',
    query: {
      what,
      where,
      page: 1
    }
  })
}
</script>
