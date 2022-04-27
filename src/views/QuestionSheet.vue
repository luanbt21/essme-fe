<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="text-center">
      <button class="text-center w-96 h-14 text-2xl mb-[40px] bg-[#b9cec7] rounded-lg shadow-md">
        {{ $t('message.Askapublicquestion', {}, { locale: $i18n.locale }) }}
      </button>
    </div>
    <div class="bg-purple">
      <el-row>
        <el-col :span="17"
          ><div style="border-radius: 15px" class="grid-content bg-[#b9cec7] p-[20px]">
            <div>
              <label class="text-xl font-bold" for="field">{{
                $t('message.fields', {}, { locale: $i18n.locale })
              }}</label>
              <p>{{ $t('message.Choosethefieldwhichyouwanttoaskabout', {}, { locale: $i18n.locale }) }}</p>

              <el-select-v2
                v-model="field"
                filterable
                :options="
                  fieldsArr.map(field => {
                    return { value: field.name_vn, label: field.name_vn }
                  })
                "
                :placeholder="`${$t('message.Pleaseselectfields', {}, { locale: $i18n.locale })}`"
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
              <label class="text-xl font-bold mb-[100px]" for="title">{{
                $t('message.Title', {}, { locale: $i18n.locale })
              }}</label>
              <el-input
                v-model="title"
                :autosize="{ minRows: 2, maxRows: 5 }"
                type="textarea"
                :placeholder="`${$t('message.PleaseInput', {}, { locale: $i18n.locale })}`"
              >
              </el-input>
            </div>

            <div class="mt-[25px]">
              <label class="text-xl font-bold mb-[100px]" for="field">{{
                $t('message.YourQuestion', {}, { locale: $i18n.locale })
              }}</label>
              <el-input
                v-model="contentQuestion"
                :autosize="{ minRows: 4, maxRows: 8 }"
                type="textarea"
                :placeholder="`${$t('message.Enteryourrequirement', {}, { locale: $i18n.locale })}`"
              >
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="flex flex-col p-[20px]">
            <div class="mb-[10px] text-black">
              <el-button color="#b9cec7" class="w-[100%] text-black" type="primary"
                ><span class="text-black">{{
                  $t('message.Findquestion', {}, { locale: $i18n.locale })
                }}</span></el-button
              >
            </div>
            <div class="mb-[10px]">
              <el-button color="#b9cec7" class="w-[100%]" type="primary"
                ><span class="text-black">{{ $t('message.Findexpert', {}, { locale: $i18n.locale }) }}</span></el-button
              >
            </div>
            <div class="mb-[10px]">
              <el-button color="#b9cec7" class="w-[100%]" type="primary"
                ><span class="text-black">{{ $t('message.news', {}, { locale: $i18n.locale }) }}</span></el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="mt-[10px]">
      <el-button
        @click="handlePost(), (centerDialogVisible = true)"
        color="#b9cec7"
        size="large"
        class="text-stone-800"
        >{{ $t('message.Postyourquestion', {}, { locale: $i18n.locale }) }}</el-button
      >
    </div>

    <!-- thông báo save thành công -->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span v-if="!isLogin">{{ $t('message.Signintopostanswer', {}, { locale: $i18n.locale }) }}</span
      ><br />
      <span v-if="shoeLog">{{ $t('message.Postyouranswersuccessfully', {}, { locale: $i18n.locale }) }} </span>
      <span v-else
        >{{ $t('message.FailtoPostyouranswer', {}, { locale: $i18n.locale }) }} <br />{{
          $t('message.Maybeyouhavenotupdatedyourprofile', {}, { locale: $i18n.locale })
        }}<br />{{ $t('message.Youhavetobecustomertosendrequest', {}, { locale: $i18n.locale }) }}
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{
            $t('message.Return', {}, { locale: $i18n.locale })
          }}</el-button>
          <router-link :to="`/FQAs/${question?._id}`">
            <el-button type="primary">{{ $t('message.BacktoHomepage', {}, { locale: $i18n.locale }) }}</el-button>
          </router-link>
        </span>
      </template>
    </el-dialog>
    <br />
    <hr />

    <!-- <div v-for="FQA in FQAs" :key="FQA._id">
      <FQAitem :question="FQA" />
    </div> -->
  </div>
  <div class="relative w-full min-w-[800px] mt-20">
    <FooterVue />
  </div>
</template>

<script lang="ts" setup>
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { ResearchArea } from '~/models/Research-area'
import { getField } from '~/api/Research-area'
import { Question } from '~/models/Question'
import { getQuestion } from '~/api/Question'
import axios from 'axios'
import { useStore } from '~/store/index'
import { useRouter } from 'vue-router' // import router
import { getCustomerbyUid } from '~/api/Customer'
import { Customer } from '~/models/Customer'

const router = useRouter()

let centerDialogVisible = ref(false)
const failLog = ref(false)

const store = useStore()
const isLogin = computed(() => store.state.auth.user)
const shoeLog = ref(false)
const question = ref<Question>()

const handlePost = async () => {
  customerCu.value = await getCustomerbyUid(store.state.auth.userid)
  customerID.value = customerCu.value._id

  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  try {
    if (customerID.value == '') {
      failLog.value = true
    } else if (isLogin.value) {
      await axios
        .post(
          '/questions',
          {
            Description: contentQuestion.value,
            Customer_id: customerID.value,
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
        .then(data => {
          question.value = data.data
          router.push(`/FQAs/${question.value?._id}`)
          shoeLog.value = true
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

const FQAs = ref<Question[]>([])
const fieldsArr = ref<ResearchArea[]>([])
const customerCu = ref<Customer>()

const customerID = ref(`${store.state.auth.userid}`)

onMounted(async () => {
  try {
    fieldsArr.value = await getField()
    FQAs.value = await getQuestion(30)
  } catch (e) {
    console.log(e)
  }
})

const contentQuestion = ref('')
const field = ref<String[]>([])
const title = ref('')
</script>
