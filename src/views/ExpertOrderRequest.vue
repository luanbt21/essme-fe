<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-100 rounded-[40px] p-[50px] flex flex-col">
    <el-row>
      <el-col :span="5" class="bg-slate-200"> </el-col>
      <el-col :span="16" class="pl-3">
        <router-link to="/OrderExpert">
          <div class="mb-[15px] items-right">
            <el-button style="background-color: #4e8d74" color="#4e6d74" size="large" plain>{{
              $t('message.orderexpert', {}, { locale: $i18n.locale })
            }}</el-button>
          </div>
        </router-link>
        <div v-if="user" class="flex mb-[15px] items-center">
          <el-avatar :size="40" :src="user?.photoURL"></el-avatar>
          <p class="ml-[10px]">{{ user?.displayName }}</p>
        </div>
        <div class="ml-[30px]">
          <div class="shrink-0 flex mb-[15px]">
            <img class="h-6 w-6" src="../assets/question-mark.png" alt="Question Logo" />
            <span class="ml-[15px] min-w-[65px]">{{ $t('message.Request', {}, { locale: $i18n.locale }) }}: </span>
            <span class="ml-[10px] line-clamp-3">{{ request?.content }} </span>
          </div>
          <div class="shrink-0 flex mb-[15px]">
            <img class="h-6 w-6 self-start" src="../assets/answer-icon.png" alt="Question Logo" />
            <div class="text-xl text-black">
              {{ $t('message.answer', {}, { locale: $i18n.locale }) }}: ({{ request?.response.length }})
            </div>
          </div>
          <div v-for="response in request?.response">
            <ResponseItem :response="response" />
          </div>
          <el-input
            class="mb-2"
            v-model="ResponseExpert"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            :placeholder="$t('message.Pleasetypeyouranswerforthisrequest', {}, { locale: $i18n.locale })"
          />
          <el-button
            @click="handlePost(), (centerDialogVisible = true)"
            color="#4e8d74"
            type="primary"
            :icon="Edit"
            round
            >{{ $t('message.Send', {}, { locale: $i18n.locale }) }}</el-button
          >
        </div>
      </el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <!-- thông báo save thành công -->
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span v-if="!isLogin">{{ $t('message.Signintopostanswer', {}, { locale: $i18n.locale }) }}</span
      ><br />
      <span v-if="shoeLog">{{ $t('message.Postyouranswersuccessfully', {}, { locale: $i18n.locale }) }} </span>
      <span v-else
        >{{ $t('message.FailtoPostyouranswer', {}, { locale: $i18n.locale }) }} <br />{{
          $t('message.Maybeyouhavenotupdatedyourprofile', {}, { locale: $i18n.locale })
        }}<br />{{ $t('message.Youhavetobeexperttopostanswer', {}, { locale: $i18n.locale }) }}
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{
            $t('message.Return', {}, { locale: $i18n.locale })
          }}</el-button>
          <router-link to="/">
            <el-button type="primary">{{ $t('message.BacktoHomepage', {}, { locale: $i18n.locale }) }}</el-button>
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
import { Edit } from '@element-plus/icons-vue'
import FooterVue from '~/components/tkhuyen/Footer.vue'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getQuestionById } from '~/api/Question'
import { useRoute } from 'vue-router'
import { User } from '~/models/User'
import { getUserById } from '~/api/User'
import { useStore } from '~/store/index'
import { getExpertByUid } from '~/api/Experts'
import { Experts } from '~/models/Experts'
import { useRouter } from 'vue-router'
import axios from 'axios'
import ResponseItem from '~/components/orderExpert/responseItem.vue'
import { Request, Response } from '~/models/Request'
import { getRequestById } from '~/api/Request'

let centerDialogVisible = ref(false)
const failLog = ref(false)

const store = useStore()
const isLogin = computed(() => store.state.auth.user)
const shoeLog = ref(false)

const ResponseExpert = ref('')

const router = useRouter()
const route = useRoute()

const request = ref<Request>()
const user = ref<User>()
const answer = ref<Response[]>([])

const customerEx = ref<Experts>()
const customerID = ref('')

const handlePost = async () => {
  customerEx.value = await getExpertByUid(store.state.auth.userid)
  customerID.value = customerEx.value._id

  const headers = {
    Authorization: `Bearer ${store.state.auth.token}`
  }
  try {
    if (customerID.value == '') {
      failLog.value = true
    } else if (isLogin.value) {
      await axios
        .post(
          `/requests/${route.params.id}/responses`,
          {
            content: ResponseExpert.value,
            expert_id: customerID.value,
            uid: store.state.auth.userid
          },
          {
            headers
          }
        )
        .then(data => {
          shoeLog.value = true
          window.location.reload()
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

onMounted(async () => {
  request.value = await getRequestById(route.params.id.toString())
  user.value = await getUserById(request.value.uid)
  answer.value = request.value.response
})
</script>
