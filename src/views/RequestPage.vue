<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="mb-[15px]">
      <router-link to="/OrderExpert">
        <el-button size="large" type="primary">{{ $t('message.orderexpert', {}, { locale: $i18n.locale }) }}</el-button>
      </router-link>
    </div>

    <!-- <Search /> -->

    <el-container class="container">
      <el-aside width="200px" class="hidden md:block pt-5">
        <h3>{{ $t('message.ByFields', {}, { locale: $i18n.locale }) }}</h3>

        <!-- <el-input type="text" placeholder="Fields Search" /> -->
        <el-checkbox-group v-model="typesSelect" :max="2">
          <div v-for="(type, index) in types" :key="index">
            <el-checkbox class="z-[0]" :label="type" style="white-space: pre-wrap" />
          </div>
        </el-checkbox-group>
      </el-aside>
      <el-main>
        <div v-for="FQA in FQAsFilter"><RequestItem :request="FQA" /></div>
        <div class="grid justify-items-center text-center">
          <el-pagination
            layout="prev, pager, next"
            :page-count="requestPage?.totalPages"
            :current-page="props.page"
            @current-change="handlePageChange"
          />
        </div>
      </el-main>
    </el-container>

    <br />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import RequestItem from '~/components/RequestItem.vue'
import { computed, onMounted, ref } from 'vue'
import { getRequest } from '~/api/Request'
import { Request as RequestModel } from '~/models/Request'
import { PageEntity } from '~/models/PageEntity'
import router from '~/router'
// import Search from '~/components/Search.vue'

interface Props {
  page?: number
}
const handlePageChange = async (page: number) => {
  router.push({
    name: 'RequestPage',
    query: {
      page
    }
  })
}

const requestPage = ref<PageEntity<RequestModel>>()
const props = defineProps<Props>()
let request = computed(() => (requestPage.value ? requestPage.value.content : []))
// const FQAs = ref<Question[]>([])
const types = computed(() => {
  const result = new Set<string>()
  for (const FQA of request.value) {
    for (const topic of FQA.topic) {
      result.add(topic)
    }
  }
  return result
})
const typesSelect = ref<string[]>([])
const FQAsFilter = computed(() => {
  if (typesSelect.value.length === 0) return request.value
  else {
    return request.value.filter(FQA => {
      return typesSelect.value.every(type => FQA.topic.includes(type))
    })
  }
})
onMounted(async () => {
  requestPage.value = await getRequest(props.page)
})
</script>
