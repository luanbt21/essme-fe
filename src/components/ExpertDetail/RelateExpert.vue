<template>
  <div class="common-layout w-[100%] mx-auto">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB] h-auto">
        <div class="font-bold text-2xl my-5 ml-6">{{ $t('message.RELATEDEXPERTS', {}, { locale: $i18n.locale }) }}</div>
        <el-scrollbar height="395px" width="auto" v-if="expertRelate.length !== 0">
          <el-row :gutter="20" class="m-5">
            <el-col :span="8" v-for="expert in expertRelate" :key="expert._id" :xs="24" :sm="12" :lg="8">
              <ItemRelateVue :expert="expert" />
            </el-col>
          </el-row>
        </el-scrollbar>

        <div v-if="expertRelate.length === 0" class="m-5 text-center">
          {{ $t('message.noresult', {}, { locale: $i18n.locale }) }}
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts1, getExpertstop, getRelatedExperts } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'
import { useRoute } from 'vue-router'
import ItemRelateVue from './ItemRelate.vue'
import { truncateSync } from 'fs'
const expertRelate = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()

onMounted(async () => {
  const id = route.params.id
  expertRelate.value = await getRelatedExperts(id as string)
})
</script>

<style scoped>
router-link a {
  text-decoration: none;
}
</style>
