<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-100 rounded-[40px] p-[50px] flex flex-col">
    <div class="text-center">
      <button class="text-center w-96 h-14 text-2xl mb-[40px] bg-[#b9cec7] rounded-lg shadow-md">Order Expert</button>
    </div>

    <div class="bg-purple">
      <el-row>
        <el-col :span="17"
          ><div style="border-radius: 15px" class="grid-content bg-[#b9cec7] p-[20px] mb-[40px]">
            <div class="mb-[15px]">
              <label class="text-xl font-bold" for="field">Fields</label>
              <p>Choose the field which you want to ask about</p>
              <el-select style="width: 100%" v-model="typesSelect" placeholder="Select" size="large">
                <el-option v-for="fields in fieldsArr" :key="fields.name" :label="fields.name" :value="fields.name_vn">
                </el-option>
              </el-select>
            </div>

            <div class="">
              <label class="text-xl font-bold mb-[100px]" for="field">Title</label>
              <el-input
                v-model="Title"
                :autosize="{ minRows: 2, maxRows: 3 }"
                type="textarea"
                placeholder="Please input"
              >
              </el-input>
            </div>

            <div class="mt-5">
              <label class="text-xl font-bold" for="field">Related Experts</label>
              <div v-if="expertFilter" class="text-center relative top-10 italic">not found</div>
              <el-carousel indicator-position="none" :interval="4000" type="card" height="200px" :autoplay="true">
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
                v-model="content"
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
      <el-button @click="handlePost(), (centerDialogVisible = true)" color="#626aef" size="large" style="color: white"
        >Post your Order</el-button
      >
    </div>
    <br />
    <hr />
    <!-- thông báo save thành công -->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span v-if="!isLogin">Sign in to post answer!</span><br />
      <span v-if="shoeLog">Post your answer successfully!</span>
      <span v-else>Fail to Post your answer! <br />Maybe you have not updated your profile</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Return</el-button>
          <router-link :to="`/`">
            <el-button type="primary">Back to Homepage</el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
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
import { getExpertByUid, getExperts1 } from '~/api/Experts'
import { Fields } from '~/models/Fields'
import ExpertItemOrderPage from '~/components/ExpertDetail/expertItemOrderPage.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from '~/store/index'
import router from '~/router'
import { getCustomerbyUid } from '~/api/Customer'
import { Customer } from '~/models/Customer'
let centerDialogVisible = ref(false)
const failLog = ref(false)

const store = useStore()
const isLogin = computed(() => store.state.auth.user)
const shoeLog = ref(false)
const customerEx = ref<Customer>()
const customerID = ref('')
const handlePost = async () => {
  customerEx.value = await getCustomerbyUid(store.state.auth.userid)
  // console.log(customerEx.value)

  customerID.value = customerEx.value._id

  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  try {
    if (customerID.value == '') {
      failLog.value = true
      // console.log('sai r')
    } else if (isLogin.value) {
      await axios
        .post(
          `/requests`,
          {
            topic: [typesSelect.value],
            Title: Title.value,
            content: content.value,
            response: [],
            customer_id: customerID.value,
            uid: store.state.auth.userid
          },
          {
            headers
          }
        )
        .then(data => {
          shoeLog.value = true
          console.log(data.data._id)
          router.push(`/requests/${data.data._id}`)
          setTimeout(() => {
            window.location.reload()
          }, 500)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
    }
  } catch (error) {
    failLog.value = true
  }
}

const content = ref('')
const Title = ref('')
const fieldsArr = ref<Fields[]>([])

const expertArr = ref<Experts[]>([])

const typesSelect = ref<string>()

const expertFilter = computed(() => {
  if (typesSelect.value == '') return expertArr.value
  else {
    // return await getExperts1(10, typesSelect.value)
    return expertArr.value.filter(expert => {
      return expert.research_area.includes(typesSelect.value?.toLowerCase())
    })
  }
})
onMounted(async () => {
  fieldsArr.value = await getFields()
  expertArr.value = await getExperts1(10)
})
</script>
