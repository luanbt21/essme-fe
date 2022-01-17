<template>
  <div class="common-layout mt-5">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />

    <el-container>
      <el-header :style="{ 'background-color': 'white' }">
        <el-breadcrumb :separator-icon="ArrowRight" class="mb-3">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="font-bold mb-11">
          <hr class="style-three" :style="{ 'background-color': 'white' }" />
        </div>
      </el-header>
      <el-container class="flex flex-wrap">
        <el-aside class="rounded-xl w-auto m-5 text-[21px]">
          <img
            src="https://pbs.twimg.com/media/CzMC-bfXAAIFIEU.jpg"
            class="w-[235px] h-72 rounded-xl mx-8 my-5"
            alt=""
          />
          <div class="text-center my-7"><p>KHANH HUYEN TRINH</p></div>
          <div class="text-center my-7 mx-7 font-bold">RESEARCH ASSISTANT PROFESSOR OF Computer science</div>
          <div class="ml-11 mt-16">
            <i class="fas fa-address-card"></i>
            <span class="ml-3">PROFESSOR</span>
          </div>
          <div class="ml-11 m-6">
            <i class="fas fa-map-marker-alt"></i>
            <span class="ml-5">Center for Urban Science + Progress, New York University, United States</span>
          </div>
          <div class="ml-11 mt-3 mb-6">
            <i class="fas fa-envelope"></i>
            <span class="ml-5">tkh@gmail.com</span>
          </div>
        </el-aside>

        <el-container>
          <el-main class="rounded-xl m-5">
            <div class="block">
              <el-carousel :interval="2000" arrow="always" class="h-[500px]">
                <el-carousel-item>
                  <div class="my-3 ml-10 font-bold text-black text-2xl">INTRODUCTION</div>
                  <div class="ml-[70px] font-bold text-black">
                    <div class="mt-4">
                      APPELLATION:
                      <span class="font-normal ml-5">Research assistant professor Of computer science </span>
                    </div>
                    <div class="my-3">
                      POSITION:
                      <span class="font-normal ml-16">Assistant Professor</span>
                    </div>
                    <div>
                      AFFILIATE:
                      <span class="font-normal ml-14">New York university</span>
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
                  <h3>a</h3>
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
  <div class="common-layout">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB]">
        <div class="font-bold text-2xl my-5 ml-6">RELATED EXPERTS</div>
        <el-row :gutter="20" class="m-5">
          <el-col :span="8" v-for="expert in 3" :key="expert" :xs="24" :sm="12" :lg="8">
            <el-card shadow="always" :style="{ 'background-color': '#ECF4F1' }" class="m-5">
              <div class="flex">
                <div class="basis-3/4">
                  <div>DINH CHI NGUYEN</div>
                  <div class="my-5">Professional, Doctor</div>
                  <div>Harvard University, Cambridge university, 北京大学</div>
                </div>
                <div class="basis-1/4">
                  <img
                    src="http://celebdonut.com/wp-content/uploads/images/clara-alonso-img-models-digitals-session-_4.jpg"
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
import { onMounted, ref } from 'vue'
import { getNews } from '~/api/News'
import { News } from '~/models/News'
import { Search } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'

const newsArr = ref<News[]>([])

onMounted(async () => {
  newsArr.value = await getNews(6, 0)
})

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