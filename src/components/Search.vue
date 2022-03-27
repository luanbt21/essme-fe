<template>
  <div class="bg-[#C8E3D9] py-4 mb-4 rounded-xl flex justify-center px-[50px]">
    <el-row align="bottom" :gutter="30" class="flex-1">
      <el-col :xs="24" :md="10" class="flex-auto w-64">
        <label for="what">
          {{ label }}
        </label>
        <el-autocomplete
          id="what"
          v-model="what"
          :fetch-suggestions="whatSearch"
          class="w-full"
          placeholder="Search by fields"
        />
      </el-col>
      <el-col :xs="24" :md="10" class="flex-auto w-64">
        <label for="where" class="text-2xl">Find Where?</label>
        <el-autocomplete
          id="where"
          v-model="where"
          :fetch-suggestions="whereSearch"
          class="w-full"
          placeholder="Country, City..."
        >
          <template #prefix>
            <span>
              <el-icon><Location /></el-icon>
            </span>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :xs="24" :md="4" class="flex-initial w-64">
        <el-button type="success" size="large" color="#3754" @click="emit('search', what, where)">
          <el-icon><SearchIcon /></el-icon> Search
        </el-button>
      </el-col>
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
  whereField: string
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
    whatData.value = data.content
  }
  cb(
    whatData.value.map(item => ({
      value: item[props.whatField]
    }))
  )
}

const whereSearch = async (queryString: string, cb: (arg: any) => void) => {
  if (queryString !== '') {
    const data = await props.whereSuggest(queryString)
    whereData.value = data.content
  }

  const allWhere = whereData.value.map(item => item[props.whereField])
  console.log(whereData.value)
  console.log(allWhere)
  const uniqueWhere = new Set(allWhere)

  cb(
    [...uniqueWhere].map(item => ({
      value: item
    }))
  )
}
</script>
