<style>
.demo-shadow {
  background-color: #95c2b0;
  height: 70px;
}
</style>

<template>
  <div v-for="FQAs in FQAsArr" :key="FQAs._id" class="scrollbar-demo-item">
    <router-link :to="`/FQAs/${FQAs._id}`">
      <div
        class="demo-shadow p-2 hover:cursor-pointer hover:text-white hover:drop-shadow-lg grid items-center justify-items-center border-2"
        :style="{ boxShadow: `var(--el-box-shadow-base')` }"
      >
        <span>You have posted a new question:</span>
        <span class="line-clamp-1">{{ FQAs?.Description }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getCustomerbyUid } from '~/api/Customer'
import { getQuestionByCustomerID } from '~/api/Question'
import { Customer } from '~/models/Customer'
import { Question } from '~/models/Question'
import { useStore } from '~/store/index'

const store = useStore()

const FQAsArr = ref<Question[]>([])
const customerCu = ref<Customer>()

onMounted(async () => {
  try {
    customerCu.value = await getCustomerbyUid(store.state.auth.userid)
    FQAsArr.value = await getQuestionByCustomerID(customerCu.value._id)
  } catch (error) {
    console.log(error)
  }
})
</script>
