<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div>
      <div class="text-2xl mb-[40px]">Order Expert</div>
    </div>
    <div class="bg-purple">
      <el-row>
        <el-col :span="17"
          ><div style="border-radius: 15px" class="grid-content bg-indigo-200 p-[20px] mb-[20px]">
            <div class="mb-[15px]">
              <label class="text-xl font-bold" for="field">Fields</label>
              <p>Choose the field which you want to ask about</p>
              <el-select style="width: 100%" v-model="typesSelect" placeholder="Select" size="large">
                <el-option v-for="fields in fieldsArr" :key="fields.name" :label="fields.name" :value="fields.name">
                </el-option>
              </el-select>
            </div>

            <div>
              <label class="text-xl font-bold" for="field">Related Experts</label>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-if="typesSelect" v-for="expert in expertFilter" :key="expert._id">
                  <ExpertItemOrderPage :expert="expert" />
                  <!-- <ExpertsItem :expert="expert" /> -->
                </el-carousel-item>
                <el-carousel-item v-else v-for="expert in expertArr">
                  <ExpertItemOrderPage :expert="expert" />
                  <!-- <ExpertsItem :expert="expert" /> -->
                </el-carousel-item>
              </el-carousel>
            </div>

            <div class="">
              <label class="text-xl font-bold mb-[100px]" for="field">Your Requirement</label>
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
              <router-link to="/fields">
                <el-button class="w-[100%]" type="primary">Find the Fields</el-button>
              </router-link>
            </div>
            <div class="mb-[10px]">
              <router-link to="/allexperts">
                <el-button class="w-[100%]" type="primary">Find more experts</el-button>
              </router-link>
            </div>
            <div class="mb-[10px]">
              <el-button class="w-[100%]" type="primary">News</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="">
      <el-button color="#626aef" size="large" style="color: white">Post your Order</el-button>
    </div>
    <br />
    <hr />
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, ref } from 'vue'
import { getFields } from '~/api/Fields'
import { Experts } from '~/models/Experts'
import { getExperts } from '~/api/Experts'
import { Fields } from '~/models/Fields'
import ExpertItemOrderPage from '~/components/ExpertDetail/expertItemOrderPage.vue'

const textarea2 = ref('')
const fieldsArr = ref<Fields[]>([])

const expertArr = ref<Experts[]>([])

const typesSelect = ref<string[]>([])

const expertFilter = computed(() => {
  if (typesSelect.value.length === 0) return expertArr.value
  else {
    return expertArr.value.filter(expert => {
      return typesSelect.value.every(type => expert.research_area.includes(type))
    })
  }
})
onMounted(async () => {
  fieldsArr.value = await getFields()
  expertArr.value = await getExperts(20)
})
</script>
