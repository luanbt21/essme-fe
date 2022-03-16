<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div>
      <div class="text-2xl mb-[40px]">Ask a public question</div>
    </div>
    <div class="bg-purple">
      <el-row>
        <el-col :span="17"
          ><div style="border-radius: 15px" class="grid-content bg-[#b9cec7] p-[20px]">
            <div>
              <label class="text-xl font-bold" for="field">Fields</label>
              <p>Choose the field which you want to ask about</p>

              <el-select-v2
                v-model="field"
                filterable
                :options="
                  fieldsArr.map(field => {
                    return { value: field.name, label: field.name }
                  })
                "
                placeholder="Please select fields"
                size="large"
                style="width: 100%"
                multiple
              >
                <template #default="{ item }">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                  <!-- <span style="color: var(--el-text-color-secondary); font-size: 13px">
                    {{ item.value }}
                  </span> -->
                </template>
              </el-select-v2>
            </div>

            <div class="mt-[25px]">
              <label class="text-xl font-bold mb-[100px]" for="title">Title</label>
              <el-input
                v-model="title"
                :autosize="{ minRows: 2, maxRows: 5 }"
                type="textarea"
                placeholder="Please input"
              >
              </el-input>
            </div>

            <div class="mt-[25px]">
              <label class="text-xl font-bold mb-[100px]" for="field">Your Question</label>
              <el-input
                v-model="contentQuestion"
                :autosize="{ minRows: 4, maxRows: 8 }"
                type="textarea"
                placeholder="Please input"
              >
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="flex flex-col p-[20px]">
            <div class="mb-[10px] text-black">
              <el-button color="#b9cec7" class="w-[100%] text-black" type="primary"
                ><span class="text-black">Find question</span></el-button
              >
            </div>
            <div class="mb-[10px]">
              <el-button color="#b9cec7" class="w-[100%]" type="primary"
                ><span class="text-black">Find expert</span></el-button
              >
            </div>
            <div class="mb-[10px]">
              <el-button color="#b9cec7" class="w-[100%]" type="primary"
                ><span class="text-black">News</span></el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mt-[10px]">
      <el-button @click="handlePost(), (centerDialogVisible = true)" color="#626aef" size="large" style="color: white"
        >Post your question</el-button
      >
    </div>

    <!-- thông báo save thành công -->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span v-if="failLog">Fail to update your profile!</span>
      <span v-if="!isLogin">Sign in to post question!</span>
      <span v-else>Update your profile successfully!</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Return</el-button>
          <router-link to="/">
            <el-button type="primary">Back to Homepage</el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
    <br />
    <hr />
    <div class="mt-[50px] mb-[20px] w-fit border-solid border-2 border-sky-300 px-8 py-2 rounded-3xl shadow-lg">
      <div class="text-xl text-black">Recent questions related to your field</div>
    </div>
    <div v-for="FQA in FQAs" :key="FQA._id">
      <FQAitem :question="FQA" />
    </div>
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, ref } from 'vue'
import { Fields } from '~/models/Fields'
import { getFields } from '~/api/Fields'
import { Question } from '~/models/Question'
import { getQuestion } from '~/api/Question'
import FQAitem from '~/components/FQAitem.vue'
import axios from 'axios'
import { useStore } from '~/store/index'
let centerDialogVisible = ref(false)
const failLog = ref(false)
const store = useStore()
const isLogin = computed(() => store.state.auth.user)
const handlePost = async () => {
  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  try {
    if (isLogin.value) {
      await axios.post(
        '/questions',
        {
          Description: contentQuestion.value,
          Customer_id: '',
          Admin_id: '',
          answers: [],
          Title: title.value,
          Topic: field.value,
          vote: 0,
          uid: store.state.auth.userid
        },
        {
          headers
        }
      )
    } else {
    }
  } catch (error) {
    failLog.value = true
  }
}

const FQAs = ref<Question[]>([])
const fieldsArr = ref<Fields[]>([])
// const options = ref<String[]>([])

onMounted(async () => {
  fieldsArr.value = await getFields()

  FQAs.value = await getQuestion(30)
})

const contentQuestion = ref('')
const field = ref<String[]>([])
const title = ref('')
</script>
