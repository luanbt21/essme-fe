<template>
  <div class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.fields', {}, { locale: $i18n.locale }) }}</h2>
      <el-row :key="$route.fullPath">
        <el-col class="text-center" :xs="24" :sm="12" :lg="8" v-for="fields in fieldsArr" :key="fields._id">
          <router-link v-bind:to="'/fields/' + fields.name_vn" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">
              <img
                :src="fields.img"
                alt=""
                class="inline-block w-80 h-52 cover mb-5 mt-5 ml-auto mr-auto md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"
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
