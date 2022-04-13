<template>
  <div class="container mt-10 mb-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">{{ $t('message.fields', {}, { locale: $i18n.locale }) }}</h2>
      <el-row :gutter="30" :key="$route.fullPath">
        <el-col class="text-center" :xs="24" :sm="12" :lg="8" v-for="fields in fieldsArr" :key="fields.name">
          <router-link :to="`/fields/${fields.name_vn}`" custom v-slot="{ navigate, href }">
            <el-link type="primary" :href="href" @click="navigate">
              <img
                @change="handleFieldChange"
                :src="fields.image"
                alt=""
                class="inline-block w-80 h-52 cover mb-5 mt-5 ml-auto mr-auto md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl"
              />
            </el-link>
          </router-link>
          <h3 v-if="$i18n.locale == 'vi'" class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ fields.name_vn }}
          </h3>
          <h3 v-else class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ fields.name }}
          </h3>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getFields } from '~/api/Fields'
import { Fields } from '~/models/Fields'
import router from '~/router'

const fieldsArr = ref<Fields[]>([])

const props = defineProps<{
  name?: string
}>()

onMounted(async () => {
  fieldsArr.value = await getFields()
})

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

const handleFieldChange = () => {
  router.push({
    name: 'fieldname',
    query: {
      name: typesSelect.value.toString()
    }
  })
}
</script>
