<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-white rounded-[40px] p-[50px] flex flex-col">
    <div class="common-layout mt-5 w-[90%] mx-auto">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous"
      />

      <el-container class="h-auto">
        <el-header :style="{ 'background-color': 'white' }" class="h-auto">
          <el-breadcrumb :separator-icon="ArrowRight" class="mb-6">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>

            <el-breadcrumb-item>{{ expert?.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="font-bold mb-11">
            <hr class="style-three" :style="{ 'background-color': 'white' }" />
          </div>
        </el-header>
        <el-container class="flex flex-wrap justify-center">
          <AsideVue />
          <MainFooterVue />
        </el-container>
      </el-container>
      <RelateExpertVue />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExpertById, getExperts } from '~/api/Expert'
import { Expert } from '~/models/Expert'

import Mapbox from '~/components/Mapbox.vue'
import avatar from '/avatar_expert_detail.png'
import AsideVue from './Aside.vue'
import MainFooterVue from './Main&Footer.vue'
import RelateExpertVue from './RelateExpert.vue'
import { Feature } from '~/models/Geojson'
import { useRoute } from 'vue-router'

const expertArr = ref<Expert[]>([])
const expert = ref<Expert>()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id

  ;(expert.value = await getExpertById(id as string)), (expertArr.value = await getExperts(8))
})

const textarea = ref('')
</script>

<style lang="scss">
.common-layout {
  .el-header,
  .el-footer {
    height: auto;
    width: auto;
  }
}
</style>
