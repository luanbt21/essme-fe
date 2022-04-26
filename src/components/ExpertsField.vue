<template>
  <div
    v-if="$t('message.searchresult', {}, { locale: $i18n.locale }) === 'Kết quả tìm kiếm'"
    class="mt-5 w-[95%] mx-auto justify-center"
  >
    <Search
      what-field="what"
      :what-suggest="whatSuggestvi"
      where-field="where"
      :where-suggest="whereSuggestvi"
      :label="`${$t('message.FindanExpert', {}, { locale: $i18n.locale })}`"
      :placeholder="`${$t('message.Experttitle', {}, { locale: $i18n.locale })}`"
      @search="handleSearch"
    />
  </div>
  <div v-else class="mt-5 w-[95%] mx-auto justify-center">
    <Search
      what-field="what"
      :what-suggest="whatSuggesten"
      where-field="where"
      :where-suggest="whereSuggesten"
      :label="`${$t('message.FindanExpert', {}, { locale: $i18n.locale })}`"
      :placeholder="`${$t('message.Experttitle', {}, { locale: $i18n.locale })}`"
      @search="handleSearch"
    />
  </div>
  <div v-if="props.what === '' && props.where !== undefined" class="mt-5 ml-11 w-[100%] m-auto justify-center text-lg">
    {{ $t('message.searchresult', {}, { locale: $i18n.locale }) }}:<span class="font-bold">"{{ props.where }}"</span>
  </div>
  <div v-if="props.where === undefined" class="mt-5 ml-11 w-[100%] m-auto justify-center text-lg">
    {{ $t('message.searchresult', {}, { locale: $i18n.locale }) }}: <span class="font-bold">"{{ props.what }}"</span>
  </div>
  <div v-if="props.what !== undefined && props.where === ''" class="mt-5 ml-11 w-[100%] m-auto justify-center text-lg">
    {{ $t('message.searchresult', {}, { locale: $i18n.locale }) }}: <span class="font-bold">"{{ props.what }}"</span>
  </div>
  <div
    v-if="props.what !== undefined && props.where !== undefined && props.what !== '' && props.where !== ''"
    class="mt-5 ml-11 w-[100%] m-auto justify-center text-lg"
  >
    {{ $t('message.searchresult', {}, { locale: $i18n.locale }) }}:
    <span class="font-bold">"{{ props.what }} & {{ props.where }}"</span>
  </div>
  <div class="mt-5 ml-11 w-[100%] flex justify-center">
    <el-row :key="$route.fullPath" :gutter="20" class="flex" viewClass="yf-content">
      <div class="w-[300px] md:w-[400px] lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] bg-[#D1E0DB] rounded-[15px]">
        <div class="font-bold text-center p-5 text-2xl">
          {{ $t('message.expert', {}, { locale: $i18n.locale }).toUpperCase() }}
        </div>
        <div class="text-center" v-if="experts.length === 0">
          {{ $t('message.noresult', {}, { locale: $i18n.locale }) }}
        </div>
        <div v-else class="h-[500px]">
          <el-scrollbar height="480px" :key="$route.fullPath">
            <el-col :span="12" height="239px" v-for="expert in experts" :key="expert._id" style="max-width: 500px">
              <ExpertsItem :expert="expert" />
            </el-col>
          </el-scrollbar>
        </div>
      </div>

      <div class="bg-[#D1E0DB] rounded-[15px] mx-2 w-[290px] lg:w-[250px] xl:w-[300px]">
        <div class="font-bold text-center p-5 mb-5 text-2xl">
          {{ $t('message.fields', {}, { locale: $i18n.locale }).toUpperCase() }}
        </div>
        <el-scrollbar height="460px " width="200px">
          <!-- <div v-for="(address, index) in types" :key="index">
            <el-card
              :style="{ 'background-color': ' #FFFFFF' }"
              class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px] text-center"
            >
              <button v-on:click="callFunction" data-id="{{address}}">
                {{ address }}
              </button>
            </el-card>
          </div> -->
          <div v-if="$t('message.searchresult', {}, { locale: $i18n.locale }) === 'Kết quả tìm kiếm'" class="ml-5">
            <div>
              <el-radio-group v-model="typesSelect" size="large" class="rounded-sm">
                <div>
                  <div v-for="type in expertfieldvi" :key="type._id" class="rounded-sm">
                    <el-radio-button
                      :label="type._id"
                      class="w-[100px] m-2 flex flex-wrap flex-row"
                      @change="handleFieldChange"
                    >
                      <div
                        class="w-[170px] md:w-[180px] lg:w-[160px] xl:w-[200px] h-[20px]"
                        :title="`${type._id} (${type.quantity})`"
                      >
                        <div class="truncate h-[20px] text-left">
                          {{ `${type._id} (${type.quantity})` }}
                        </div>
                      </div>
                    </el-radio-button>
                  </div>
                  <br />
                </div>
              </el-radio-group>
            </div>
          </div>
          <div v-else class="ml-5">
            <div>
              <el-radio-group v-model="typesSelect" size="large" class="rounded-sm">
                <div>
                  <div v-for="type in expertfielden" :key="type._id" class="rounded-sm">
                    <el-radio-button
                      :label="type._id"
                      class="w-[100px] m-2 flex flex-wrap flex-row"
                      @change="handleFieldChange"
                    >
                      <div
                        class="w-[170px] md:w-[180px] lg:w-[160px] xl:w-[200px] h-[20px]"
                        :title="`${type._id} (${type.quantity})`"
                      >
                        <div class="truncate h-[20px] text-left">
                          {{ `${type._id} (${type.quantity})` }}
                        </div>
                      </div>
                    </el-radio-button>
                  </div>
                  <br />
                </div>
              </el-radio-group>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="w-[68%]">
        <div class="grid justify-items-center text-center">
          <el-pagination
            layout="prev, pager, next"
            :page-count="expertsPage?.totalPages"
            :current-page="props.page"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </el-row>
  </div>
  <div class="mt-10">
    <Mapbox :key="$route.fullPath" :data="mapData" />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeFieldsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeNewsVue />
  </div>
  <div class="mt-5 w-[95%] mx-auto justify-center">
    <HomeEventsVue />
  </div>
</template>
<script lang="ts" setup>
// import HomeNewsVue from './HomeNews.vue'
// import HomeEventsVue from './HomeEvents.vue'
// import HomeFieldsVue from './HomeFields.vue'
import {
  searchExperts,
  getExperts,
  getExpertstop,
  FieldsType,
  fieldsExpertsvi,
  fieldsExpertsen,
  whatSuggesten,
  whereSuggesten,
  whatSuggestvi,
  whereSuggestvi
} from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Search from '~/components/SearchByField.vue'
import { PageEntity } from '~/models/PageEntity'
import { Experts as ExpertModel } from '~/models/Experts'
import Mapbox from '~/components/Mapbox.vue'
import { Feature } from '~/models/Geojson'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import ExpertsItem from '~/components/ExpertsItem.vue'
const router = useRouter()
const pageSize = 10
const mapCenter = ref<number[]>()
const expertfieldvi = ref<FieldsType[]>([])
const expertfielden = ref<FieldsType[]>([])
const expertsTop = ref<ExpertModel[]>([])
const expertsPage = ref<PageEntity<ExpertModel>>()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
const expertsTopData = computed(() => (expertsTop.value ? expertsTop.value : []))
const expertsData = computed(() => (expertsPage.value ? expertsPage.value.content : []))
for (let item of expertsData.value) {
  for (let i of item.research_area) {
    let fielditem = i
  }
}
const handlePageChange = (page: number) => {
  router.push({
    name: 'expertfields',
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
    name: 'expertfields',
    query: {
      what: typesSelect.value.toString(),
      page: 1
    }
  })
}
const suggest = ref<PageEntity<ExpertModel>>()
onMounted(async () => {
  expertsPage.value = await searchExperts(props.what, props.where, props.page, pageSize)
  expertsTop.value = await getExpertstop(20, 1)
  expertfieldvi.value = await fieldsExpertsvi()
  expertfielden.value = await fieldsExpertsen()
})
const handleSearch = (what: string, where: string) => {
  router.push({
    name: 'expertfields',
    query: {
      what,
      where,
      page: 1
    }
  })
}
</script>
<style scoped>
.demo-button-style {
  margin-top: 24px;
}
div.text1 {
  width: 20px;
  word-wrap: break-word;
}
</style>
