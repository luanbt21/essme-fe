<template>
  <el-container class="w-[890px] h-auto">
    <el-main class="rounded-xl m-5 bg-[#d1e0db] h-auto">
      <div class="my-3 ml-10 font-bold text-black text-2xl">
        {{ $t('message.INTRODUCTION', {}, { locale: $i18n.locale }) }}
      </div>
      <div class="ml-[70px] font-bold text-black lg:w-[700px]">
        <div class="flex my-5">
          <div>{{ $t('message.APPELLATION', {}, { locale: $i18n.locale }) }}:</div>
          <div class="ml-[22px] font-normal">{{ expert?.name }}</div>
        </div>
        <div class="flex">
          <div class="w-28">{{ $t('message.POSITION', {}, { locale: $i18n.locale }) }}:</div>
          <div class="ml-5 font-normal">{{ expert?.degree }}</div>
        </div>
        <div class="flex my-5">
          <div class="w-28">{{ $t('message.AFFILIATE', {}, { locale: $i18n.locale }) }}:</div>
          <div class="ml-5 font-normal">{{ expert?.company }}</div>
        </div>
        <div class="flex">
          <div class="">{{ $t('message.EXPERTISE', {}, { locale: $i18n.locale }) }}:</div>
          <div class="ml-[47px] font-normal">
            <span v-for="(number, index) of expert?.research_area" :key="index">
              {{ index < expert?.research_area.length - 1 && expert?.research_area.length > 1 ? number + ',' : number }}
            </span>
          </div>
        </div>
      </div>
      <div class="my-3 ml-10 font-bold text-black text-2xl">
        {{ $t('message.SOCIALMEDIA', {}, { locale: $i18n.locale }) }}
      </div>
      <div class="ml-[70px] text-black text-lg h-auto">
        <div class="flex my-3 mt-5">
          <div class="mr-3 text-2xl"><i class="fas fa-globe-asia"></i></div>

          <div class="">
            <a :href="expert?.link_profile">{{ expert?.link_profile }}</a>
          </div>
        </div>
        <!-- <div class="flex my-3">
              <i class="fab fa-facebook"></i>
              <div class="mr-3 text-2xl"></div>
              <span>https://www.facebook.com/</span>
            </div> -->
        <!-- <div class="flex my-3">
              <i class="fab fa-twitter"></i>
              <div class="mr-3 text-2xl"></div>
              https://twitter.com/
            </div>
            <div class="flex my-3">
              <i class="fab fa-linkedin-in"></i>
              <div class="mr-3 text-2xl"></div>
              https://www.linkedin.com/
            </div> -->
      </div>
    </el-main>
    <el-footer class="rounded-xl my-5 mx-5 font-semibold bg-[#d1e0db] h-auto">
      <div class="text-2xl my-5">{{ $t('message.ORDEREXPERT', {}, { locale: $i18n.locale }) }}</div>
      <div class="mt-[25px]">
        <div class="mb-[10px] text-xl">
          <label class="font-bold mb-[100px]" for="title">{{
            $t('message.Title', {}, { locale: $i18n.locale })
          }}</label>
        </div>

        <el-input
          v-model="title"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          :placeholder="`${$t('message.PleaseInput', {}, { locale: $i18n.locale })}`"
        >
        </el-input>
      </div>

      <div class="mt-[25px]">
        <div class="mb-[10px]">
          <label class="text-xl font-bold mb-[100px]" for="title">{{
            $t('message.Yourrequirement', {}, { locale: $i18n.locale })
          }}</label>
        </div>
        <el-input
          class="w-auto text-xl"
          v-model="content"
          :rows="7"
          type="textarea"
          :placeholder="`${$t('message.Enteryourrequirement', {}, { locale: $i18n.locale })}`"
        />
      </div>
      <div class="flex justify-center m-5 bg-[#d1e0db]">
        <el-button class="w-24" type="primary" @click="handlePost(), (centerDialogVisible = true)">{{
          $t('message.Send', {}, { locale: $i18n.locale })
        }}</el-button>
      </div>
      <!-- thông báo save thành công -->
      <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
        <span v-if="!isLogin">{{ $t('message.Signintopostanswer', {}, { locale: $i18n.locale }) }}</span
        ><br />
        <span v-if="!shoeLog1">{{ $t('message.MailwassenttoExpert', {}, { locale: $i18n.locale }) }} <br /></span>
        <span v-else>{{ $t('message.MailwasnotsenttoExpert', {}, { locale: $i18n.locale }) }} <br /></span>
        <span v-if="shoeLog">{{ $t('message.Postyouranswersuccessfully', {}, { locale: $i18n.locale }) }} <br /></span>
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
            <router-link :to="`/`">
              <el-button type="primary">{{ $t('message.BacktoHomepage', {}, { locale: $i18n.locale }) }}</el-button>
            </router-link>
          </span>
        </template>
      </el-dialog>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts, getExpertsById } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useStore } from '~/store/index'
import Mapbox from '~/components/Mapbox.vue'
import avatar from '/avatar_expert_detail.png'
import { useRoute } from 'vue-router'
import { Feature } from '~/models/Geojson'
import expert_id from '~/store/modules/expert_id'

import axios from 'axios'
import { __baseURL } from '~/constant'
import { Customer } from '~/models/Customer'
import { getCustomerbyUid } from '~/api/Customer'
import { sendMail } from '~/api/Email'

const failLog = ref(false)
const store = useStore()
const handleClick = () => {
  store.dispatch('auth/logout')
}
const isLogin = computed(() => store.state.auth.user)
const expertArr = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()
const centerDialogVisible = ref(false)
const content = ref('')
const customer = ref<Customer>()
const shoeLog = ref(false)
const shoeLog1 = ref(false)
const handlePost = async () => {
  customer.value = await getCustomerbyUid(store.state.auth.userid)
  console.log(customer.value)

  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  console.log(headers)

  try {
    console.log(customer.value._id)
    if (customer.value._id == '') {
      failLog.value = true
    } else if (isLogin.value) {
      await axios
        .post(
          `/requests/direct`,
          {
            content: content.value,
            title: title.value,
            expert_id: route.params.id,
            expert_email: expert.value?.email,
            customer_id: customer.value._id,
            topic: expert.value?.research_area
          },
          {
            headers
          }
        )
        .then(async data => {
          console.log(data)
          shoeLog.value = true
          if (expert.value?.email) {
            try {
              await sendMail(expert.value?.email).then(dta => {
                alert(dta)
                console.log(dta)
              })
            } catch (error) {
              alert('Fail to send mail!')
            }
          } else {
            shoeLog1.value = true
          }
        })
    } else {
    }
  } catch (error) {
    failLog.value = true
  }
}

const idCustomer = ref('')
onMounted(async () => {
  const id = route.params.id
  ;(expert.value = await getExpertsById(id as string)), (expertArr.value = await getExperts(8))
})

const lat = ref<number>(105)
const lon = ref<number>(21)
const mapData = computed((): Feature[] => {
  if (expert.value) {
    return [
      {
        type: 'Feature',
        geometry: expert.value.location.features[0].geometry,
        properties: {
          label: expert.value.name,
          html: `<span> Lĩnh vực: ${expert.value.research_area}</span>`
        }
      } as Feature
    ]
  } else {
    return []
  }
})

const title = ref('')
</script>

<style>
.el-header,
.el-footer {
  height: auto;
  width: auto;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
