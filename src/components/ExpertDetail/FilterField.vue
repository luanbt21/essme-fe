<template>
  <div
    v-if="$t('message.Choosethefield', {}, { locale: $i18n.locale }) === 'Choose the field'"
    class="rounded-xl m-5 text-[21px] bg-[#d1e0db] h-[50px] w-[97%]"
  >
    <span class="p-10">{{ $t('message.Choosethefield', {}, { locale: $i18n.locale }) }}:</span>
    <el-select
      v-model="blog.text"
      :placeholder="`${$t('message.placeholderselect', {}, { locale: $i18n.locale })}`"
      class="ml-2 mt-2 h-[30px] w-[50%] lg:w-[40%] bg-white scroll-smooth"
    >
      <!-- <el-option v-for="item in expertfield" :key="item._id" :label="item._id" :value="item._id">
        <el-button @click="handleFieldChange" style="float: left">{{ `${item._id} (${item.quantity})` }}</el-button>
      </el-option> -->
      <el-option
        v-for="item in expertfielden"
        :key="item._id"
        :value="item._id"
        :label="item._id"
        @click="handleFieldChange"
        class="w-[500px] font-serif text-base scroll-smooth"
      >
        <div class="w-[300px] font-serif scroll-smooth">
          {{ `${item._id}` }}
        </div>
      </el-option>
    </el-select>
  </div>
  <div v-else class="rounded-xl m-5 text-[21px] bg-[#d1e0db] h-[50px] w-[97%]">
    <span class="p-10">{{ $t('message.Choosethefield', {}, { locale: $i18n.locale }) }}:</span>
    <el-select
      v-model="blog.text"
      :placeholder="`${$t('message.placeholderselect', {}, { locale: $i18n.locale })}`"
      class="ml-2 mt-2 h-[30px] w-[50%] lg:w-[40%] bg-white scroll-smooth"
    >
      <!-- <el-option v-for="item in expertfield" :key="item._id" :label="item._id" :value="item._id">
        <el-button @click="handleFieldChange" style="float: left">{{ `${item._id} (${item.quantity})` }}</el-button>
      </el-option> -->
      <el-option
        v-for="item in expertfieldvi"
        :key="item._id"
        :value="item._id"
        :label="item._id"
        @click="handleFieldChange"
        class="w-[200px] font-serif text-base scroll-smooth"
      >
        <div class="w-[300px] font-serif scroll-smooth">
          {{ `${item._id}` }}
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { FieldsType, fieldsExpertsvi, fieldsExpertsen } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const expertfieldvi = ref<FieldsType[]>([])
const expertfielden = ref<FieldsType[]>([])
const fieldSelect = ref('')
const router = useRouter()
const props = defineProps<{
  what?: string
  where?: string
  page?: number
}>()
const handleFieldChange = () => {
  router.push({
    name: 'expertfields',
    query: {
      what: blog.text.toString(),
      // where: props.where,
      page: 1
    }
  })
}
const blog = {
  text: ''
}
onMounted(async () => {
  expertfieldvi.value = await fieldsExpertsvi()
  expertfielden.value = await fieldsExpertsen()
})
</script>

<style></style>
