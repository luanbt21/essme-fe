<template>
  <div class="common-layout mt-5 w-[90%] mx-auto">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />
    <Header />
    <el-container>
      <el-header :style="{ 'background-color': 'white' }">
        <el-breadcrumb :separator-icon="ArrowRight" class="mb-6">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>Expert</el-breadcrumb-item>
          <el-breadcrumb-item>{{ expert?.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="font-bold mb-11">
          <hr class="style-three" :style="{ 'background-color': 'white' }" />
        </div>
      </el-header>
      <el-container class="flex flex-wrap">
        <el-aside class="rounded-xl w-auto m-5 text-[21px]">
          <img
            :src="expert?.image ? expert.image : avatar"
            :alt="expert?.name + ' image'"
            class="w-[235px] h-72 rounded-xl mx-8 my-5"
          />
          <!-- <img
            src="https://pbs.twimg.com/media/CzMC-bfXAAIFIEU.jpg"
            class="w-[235px] h-72 rounded-xl mx-8 my-5"
            alt=""
          /> -->
          <div class="text-center my-7">
            <p>{{ expert?.name }}</p>
          </div>
          <div class="text-center mx-7 font-bold">{{ expert?.degree }}</div>
          <div class="text-center mx-7 font-bold">{{ expert?.research_area }}</div>
          <div class="ml-11 mt-12">
            <i class="fas fa-address-card"></i>
            <span class="ml-3">{{ expert?.degree }}</span>
          </div>
          <div class="ml-11 m-6">
            <i class="fas fa-map-marker-alt"></i>
            <span class="ml-5">Center for Urban Science + Progress, New York University, United States</span>
          </div>
          <div class="ml-11 mt-3 mb-6">
            <i class="fas fa-envelope"></i>
            <span class="ml-5">{{ expert?.email }}</span>
          </div>
        </el-aside>

        <el-container>
          <el-main class="rounded-xl m-5">
            <div class="block">
              <el-carousel trigger="click" class="h-[500px]">
                <el-carousel-item>
                  <div class="my-3 ml-10 font-bold text-black text-2xl">INTRODUCTION</div>
                  <div class="ml-[70px] font-bold text-black">
                    <div class="mt-4">
                      APPELLATION:
                      <span class="font-normal ml-5">{{ expert?.name }} </span>
                    </div>
                    <div class="my-3">
                      POSITION:
                      <span class="font-normal ml-16">{{ expert?.degree }}</span>
                    </div>
                    <div>
                      AFFILIATE:
                      <span class="font-normal ml-14">{{ expert?.company }}</span>
                    </div>
                    <div class="my-3">
                      EXPERTISE:
                      <span class="font-normal ml-12"
                        >Research assistant professor Of computer science Research assistant professor Of computer
                        science Research assistant professor Of computer science</span
                      >
                    </div>
                  </div>
                  <div class="my-3 ml-10 font-bold text-black text-2xl">SOCIAL MEDIA</div>
                  <div class="ml-[70px] text-black text-lg">
                    <div class="flex my-3 mt-5">
                      <div class="mr-3 text-2xl"><i class="fas fa-globe-asia"></i></div>
                      <span>https://abc.xyz</span>
                    </div>
                    <div class="flex my-3">
                      <i class="fab fa-facebook"></i>
                      <div class="mr-3 text-2xl"></div>
                      <span>https://www.facebook.com/</span>
                    </div>
                    <div class="flex my-3">
                      <i class="fab fa-twitter"></i>
                      <div class="mr-3 text-2xl"></div>
                      https://twitter.com/
                    </div>
                    <div class="flex my-3">
                      <i class="fab fa-linkedin-in"></i>
                      <div class="mr-3 text-2xl"></div>
                      https://www.linkedin.com/
                    </div>
                  </div>
                </el-carousel-item>
                <el-carousel-item>
                  <!-- <MapboxVue /> -->
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-main>
          <el-footer class="rounded-xl m-5 font-semibold">
            <div class="text-2xl my-5">ORDER EXPERT</div>
            <el-input
              class="w-auto h-35 text-xl"
              v-model="textarea"
              :rows="8"
              type="textarea"
              placeholder="Enter your requirement"
            />
            <div class="flex justify-center my-3">
              <el-button class="w-24">Send</el-button>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <div class="common-layout w-[90%] mx-auto">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB]">
        <div class="font-bold text-2xl my-5 ml-6">RELATED EXPERTS</div>
        <el-row :gutter="20" class="m-5">
          <el-col :span="8" v-for="expert in expertArr.slice(2, 5)" :key="expert._id" :xs="24" :sm="12" :lg="8">
            <el-card shadow="always" :style="{ 'background-color': '#ECF4F1' }" class="m-5">
              <div class="flex">
                <div class="basis-3/4">
                  <div>{{ expert.name }}</div>
                  <div class="my-5">{{ expert.degree }}</div>
                  <div>
                    <p>{{ expert.company }}</p>
                  </div>
                </div>
                <div class="basis-1/4">
                  <img
                    src="https://img.xcitefun.net/users/2008/05/2997,xcitefun-little-cute-chicken-wallpapers-3.jpg"
                    alt=""
                  />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>
<script  lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'

import { computed, onMounted, ref } from 'vue'
import { getExperts, getExpertById } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { useStore } from '~/store/index'
// import MapboxVue from '~/component/Mapbox.vue'
import avatar from '/avatar_expert_detail.png'
import Header from '~/component/layouts/Header.vue'
const expertArr = ref<Expert[]>([])
const expert = ref<Expert>()

onMounted(async () => {
  ;(expertArr.value = await getExperts(8)), (expert.value = await getExpertById(getId.value))
  console.log(expert.value)
})

const store = useStore()

const getId = computed(() => store.state.expert_id.id)
const textarea = ref('')
</script>

<style lang="scss">
.common-layout {
  .el-header,
  .el-footer {
    background-color: #d1e0db;
    color: var(--el-text-color-primary);

    height: auto;
  }

  .el-aside {
    background-color: #d1e0db;
    color: var(--el-text-color-primary);
  }

  .el-main {
    background-color: #d1e0db;
    color: var(--el-text-color-primary);
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-carousel__item {
    color: #475669;
    font-size: 18px;
    height: 500px;
    margin: 0;
  }
}
</style>