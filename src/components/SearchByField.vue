<template>
  <div class="bg-[#C8E3D9] py-3 mb-4 rounded-xl flex justify-center px-[50px]">
    <el-row align="bottom" :gutter="30" class="flex-1">
      <el-col class="mb-4" :xs="24" :md="10">
        <label for="what" class="text-2xl">
          {{ label }}
        </label>
        <el-autocomplete
          id="what"
          v-model="what"
          :fetch-suggestions="whatSearch"
          class="w-full"
          :placeholder="`${$t('message.placeholderfield', {}, { locale: $i18n.locale })}`"
        />
      </el-col>
      <el-col class="mb-4" :xs="24" :md="10">
        <label for="where" class="text-2xl">{{ $t('message.labellocation', {}, { locale: $i18n.locale }) }}</label>
        <el-autocomplete
          id="where"
          v-model="where"
          :fetch-suggestions="whereSearch"
          class="w-full"
          :placeholder="`${$t('message.placeholderlocation', {}, { locale: $i18n.locale })}`"
        >
          <template #prefix>
            <span>
              <el-icon><Location /></el-icon>
            </span>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col class="mb-4" :xs="24" :md="4">
        <el-button type="success" class="w-full" size="large" color="#3754" @click="emit('search', what, where)"
          ><el-icon><SearchIcon /></el-icon>
          {{ $t('message.searchbutton', {}, { locale: $i18n.locale }) }}
        </el-button>
      </el-col>
      <el-col class="mb-4" :xs="24" :md="4"> </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Location, Search as SearchIcon } from '@element-plus/icons-vue'
import { ref } from 'vue'

const props = defineProps<{
  label: string
  placeholder: string
  whatSuggest: Function
  whereSuggest: Function
  whatField: string
  whereField: any
}>()

const emit = defineEmits<{
  (e: 'search', what: string, where: string): void
}>()

const what = ref('')
const where = ref('')
const whatData = ref([])
const whereData = ref([])

const whatSearch = async (queryString: string, cb: (arg: any) => void) => {
  if (queryString !== '') {
    const data = await props.whatSuggest(queryString)
    whatData.value = data.suggestions
  }
  cb(
    whatData.value.map((item: any) => ({
      value: item[props.whatField]
    }))
  )
}
let text = ''
function myFunction(item: any, index: any) {
  text += index + ': ' + item + '<br>'
}
const whereSearch = async (queryString: string, cb: (arg: any) => void) => {
  if (queryString !== '') {
    const data = await props.whereSuggest(queryString)
    whereData.value = data.suggestions
  }

  // const allWhere = whereData.value.map(item => item[props.whereField])
  // console.log(whereData.value)
  // console.log(allWhere)
  // const uniqueWhere = new Set(allWhere)

  cb(
    whereData.value.map(item => ({
      value: item[props.whereField]
    }))
  )
}
</script>
