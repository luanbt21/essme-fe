<template>
  <div v-if="$t('message.fields', {}, { locale: $i18n.locale }) === 'FIELDS'" class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.fields', {}, { locale: $i18n.locale }) }}</h2>
      <el-row :key="$route.fullPath">
        <el-col gutter="30" class="text-center" :xs="24" :sm="12" :lg="8" v-for="fields in fieldsArr" :key="fields._id">
          <router-link v-bind:to="'/fields/' + fields.name_en" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">
              <img
                :src="fields.img"
                alt=""
                class="inline-block w-64 h-48 lg:w-72 cover m-10 md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"
                @error="
                e => {
                  const target = e.target as HTMLImageElement
                  target.src = questionMark
                }"
              />
            </el-link>
          </router-link>
          <h3 class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ $i18n.locale == 'vi' ? fields.name_vn : fields.name_en }}
          </h3>
        </el-col>
      </el-row>
    </div>
  </div>
  <div v-else class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.fields', {}, { locale: $i18n.locale }) }}</h2>
      <el-row :key="$route.fullPath">
        <el-col gutter="30" class="text-center" :xs="24" :sm="12" :lg="8" v-for="fields in fieldsArr" :key="fields._id">
          <router-link v-bind:to="'/fields/' + fields.name_vn" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">
              <img
                :src="fields.img"
                alt=""
                class="inline-block w-64 h-48 lg:w-72 cover m-10 md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"
                @error="
                e => {
                  const target = e.target as HTMLImageElement
                  target.src = questionMark
                }"
              />
            </el-link>
          </router-link>
          <h3 class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ $i18n.locale == 'vi' ? fields.name_vn : fields.name_en }}
          </h3>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getField } from '~/api/Research-area'
import { ResearchArea } from '~/models/Research-area'
import questionMark from '~/assets/question-mark.png'

const fieldsArr = ref<ResearchArea[]>()

onMounted(async () => {
  fieldsArr.value = await getField()
  fieldsArr.value.map(f => {
    f.name_vn = f.name_vn.charAt(0).toUpperCase() + f.name_vn.slice(1)
    f.name_en = f.name_en.charAt(0).toUpperCase() + f.name_en.slice(1)
    return f
  })
  // fieldsArr.value.push({} as ResearchArea)
})
</script>
