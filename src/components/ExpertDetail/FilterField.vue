<template>
  <div class="rounded-xl m-5 text-[21px] bg-[#d1e0db] h-[50px] w-[200px] lg:w-auto">
    <span class="p-10">Choose the field:</span>
    <el-select
      v-model="blog.text"
      placeholder="Select field"
      class="ml-10 mt-2 h-[30px] w-[300px] bg-white scroll-smooth"
    >
      <!-- <el-option v-for="item in expertfield" :key="item._id" :label="item._id" :value="item._id">
        <el-button @click="handleFieldChange" style="float: left">{{ `${item._id} (${item.quantity})` }}</el-button>
      </el-option> -->
      <el-option
        v-for="item in expertfield"
        :key="item._id"
        :value="item._id"
        :label="item._id"
        @click="handleFieldChange"
        class="w-[200px] font-serif text-base scroll-smooth"
      >
        <div class="w-[200px] font-serif scroll-smooth">
          {{ `${item._id}` }}
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { FieldsType, fieldsExperts } from '~/api/Experts'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const expertfield = ref<FieldsType[]>([])
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
  expertfield.value = await fieldsExperts()
})
</script>

<style></style>
