<template>
  <div v-for="FQA in FQAsArr" :key="FQA._id" class="scrollbar-demo-item bg-slate-500">
    <!-- <AnswerItemNotifi :FQA="FQAs" /> -->
    <div class="bg-slate-500" v-for="answer in FQA.answers">
      <router-link :to="`/FQAs/${FQA._id}`">
        <AnswerItemNotifi :answer="answer" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getCustomerbyUid } from '~/api/Customer'
import { getQuestionByCustomerID } from '~/api/Question'
import { Customer } from '~/models/Customer'
import { Question } from '~/models/Question'
import { useStore } from '~/store/index'
import AnswerItemNotifi from './frag/AnswerItemNotifi.vue'
// import AnswerItemEx from '../sfrag/answerItemEx.vue'

const store = useStore()

const FQAsArr = ref<Question[]>([])
const customerCu = ref<Customer>()

onMounted(async () => {
  try {
    customerCu.value = await getCustomerbyUid(store.state.auth.userid)
    FQAsArr.value = await getQuestionByCustomerID(customerCu.value._id)
    // console.log(FQAsArr.value)
  } catch (error) {
    console.log(error)
  }
})
</script>
