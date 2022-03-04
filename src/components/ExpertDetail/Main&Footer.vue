<template>
  <el-container class="w-[890px] h-auto">
    <el-main class="rounded-xl m-5 bg-[#d1e0db] h-auto">
      <el-carousel trigger="click" height="420px" width="auto" :autoplay="false">
        <el-carousel-item>
          <div class="my-3 ml-10 font-bold text-black text-2xl">INTRODUCTION</div>
          <div class="ml-[70px] font-bold text-black lg:w-[700px]">
            <div class="flex my-5">
              <div>APPELLATION:</div>
              <div class="ml-[22px] font-normal">{{ expert?.name }}</div>
            </div>
            <div class="flex">
              <div class="w-28">POSITION:</div>
              <div class="ml-5 font-normal">{{ expert?.degree }}</div>
            </div>
            <div class="flex my-5">
              <div class="w-28">AFFILIATE:</div>
              <div class="ml-5 font-normal">{{ expert?.company }}</div>
            </div>
            <div class="flex">
              <div class="">EXPERTISE:</div>
              <div class="ml-[47px] font-normal">
                {{ expert?.research_area }}
              </div>
            </div>
          </div>
          <div class="my-3 ml-10 font-bold text-black text-2xl">SOCIAL MEDIA</div>
          <div class="ml-[70px] text-black text-lg h-auto">
            <div class="flex my-3 mt-5">
              <div class="mr-3 text-2xl"><i class="fas fa-globe-asia"></i></div>
              <div class="">{{ expert?.link_profile }}</div>
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
        </el-carousel-item>
        <el-carousel-item>
          <Mapbox
            :center="[lat,lon] as [number,number]"
            :data="mapData"
            :zoom="8"
            class="w-full h-full"
            :icon-link="'https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1646134277~hmac=6be4f93d8f1de692441e2a33dff90441'"
            :icon-zoom="0.05"
          />
          <input type="number" v-model="lat" />
          <input type="number" v-model="lon" />
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <el-footer class="rounded-xl my-5 mx-5 font-semibold bg-[#d1e0db] h-auto">
      <div class="text-2xl my-5">ORDER EXPERT</div>
      <el-input
        class="w-auto text-xl"
        v-model="textarea"
        :rows="7"
        type="textarea"
        placeholder="Enter your requirement"
      />
      <div class="flex justify-center m-5 bg-[#d1e0db]">
        <el-button class="w-24" type="text" @click="centerDialogVisible = true">Send</el-button>
        <el-dialog v-if="!isLogin" v-model="centerDialogVisible" title="Warning" width="30%" center>
          <span>Bạn chưa đăng nhập</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <router-link to="/login"><button class="nav-dropbtn">Login</button></router-link>
            </span>
          </template>
        </el-dialog>
        <el-dialog v-if="isLogin" v-model="centerDialogVisible" title="Warning" width="30%" center>
          <span>Bạn đã đăng nhập thành công</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="centerDialogVisible = false" class="nav-dropbtn">Cancel</el-button>
              <router-link to="/login"><button class="nav-dropbtn">Login</button></router-link>
            </span>
          </template>
        </el-dialog>
      </div>
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
const store = useStore()
const handleClick = () => {
  store.dispatch('auth/logout')
}
const isLogin = computed(() => store.state.auth.user)
const expertArr = ref<Experts[]>([])
const expert = ref<Experts>()
const route = useRoute()
const centerDialogVisible = ref(false)
onUpdated(async () => {
  if (isLogin.value) {
    const token = computed(() => store.state.auth.token)
    console.log(token.value)
    const headers = {
      Authorization: `Bearer ${token.value}`
    }
    await axios.post(
      '/news',
      {
        stt: 'string',
        img: 'string',
        tag: 'string',
        title: 'string',
        url: 'string',
        content: 'string',
        status: 'string'
      },
      {
        headers
      }
    )
  }
})
onMounted(async () => {
  const id = route.params.id
  // console.log(id)
  ;(expert.value = await getExpertsById(id as string)), (expertArr.value = await getExperts(8))
  // console.log(expert.value)
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

const textarea = ref('')
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
