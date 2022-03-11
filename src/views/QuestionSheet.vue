<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div>
      <div class="text-2xl mb-[40px]">Ask a public question</div>
    </div>
    <div class="bg-purple">
      <el-row>
        <el-col :span="17"
          ><div style="border-radius: 15px" class="grid-content bg-indigo-200 p-[20px]">
            <div>
              <label class="text-xl font-bold" for="field">Fields</label>
              <p>Choose the field which you want to ask about</p>
              <el-select style="width: 100%" v-model="value" placeholder="Select" size="large">
                <el-option v-for="fields in fieldsArr" :key="fields.name" :label="fields.name" :value="fields.name">
                </el-option>
              </el-select>
            </div>
            <div class="mt-[25px]">
              <label class="text-xl font-bold mb-[100px]" for="field">Your Question</label>
              <el-input
                v-model="textarea2"
                :autosize="{ minRows: 4, maxRows: 8 }"
                type="textarea"
                placeholder="Please input"
              >
              </el-input>
            </div></div
        ></el-col>
        <el-col :span="7">
          <div class="flex flex-col p-[20px]">
            <div class="mb-[10px]">
              <el-button class="w-[100%]" type="primary">Find question</el-button>
            </div>
            <div class="mb-[10px]">
              <el-button class="w-[100%]" type="primary">Find expert</el-button>
            </div>
            <div class="mb-[10px]">
              <el-button class="w-[100%]" type="primary">News</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mt-[10px]">
      <el-button color="#626aef" size="large" style="color: white">Post your question</el-button>
    </div>
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
import { onMounted, ref } from 'vue'
import { Fields } from '~/models/Fields'
import { getFields } from '~/api/Fields'
import { Question } from '~/models/Question'
import { getQuestion } from '~/api/Question'
import FQAitem from '~/components/FQAitem.vue'
const FQAs = ref<Question[]>([])
const fieldsArr = ref<Fields[]>([])
onMounted(async () => {
  fieldsArr.value = await getFields()
  FQAs.value = await getQuestion(30)
})
const textarea2 = ref('')
const value = ref([])
</script>
