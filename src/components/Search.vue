<template>
  <div class="bg-[#C8E3D9] px-2 py-4 rounded-xl">
    <el-row align="bottom" :gutter="30">
      <el-col :xs="24" :md="10">
        <label for="what">
          {{ label }}
        </label>
        <el-autocomplete
          id="what"
          v-model="what"
          :fetch-suggestions="whatSearch"
          class="w-full"
          :placeholder="placeholder"
        />
      </el-col>
      <el-col :xs="24" :md="10">
        <label for="where">Find Where?</label>
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
      <el-col :xs="24" :md="4">
        <el-button type="success" class="w-full" @click="emit('search', what, where)"
          ><el-icon><SearchIcon /></el-icon> Search</el-button
        >
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
    whatData.value = await props.whatSuggest(queryString)
  }
  cb(
    whatData.value.map(item => ({
      value: item[props.whatField]
    }))
  )
}

const whereSearch = async (queryString: string, cb: (arg: any) => void) => {
  if (queryString !== '') {
    whereData.value = await props.whereSuggest(queryString)
  }
  cb(
    whereData.value.map(item => ({
      value: item[props.whereField]
    }))
  )
}
</script>
