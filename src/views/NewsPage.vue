<template>
  <div class="relative w-[97%] min-w-[800px] z-1 mt-[-100px] bg-slate-200 rounded-[40px] p-[50px] flex flex-col">
    <div class="relative bottom-[20px]"><span>Home/News</span></div>

    <div class="common-layout" v-if="newsById?.img">
      <el-container>
        <el-aside width="600px" class="">
          <div class="demo-image__preview">
            <el-image
              class="md:hover:bg-slate-100 hover:duration-500"
              style="width: 100%; height: auto; padding: 30px"
              :src="newsById?.img"
              :initial-index="4"
              fit="cover"
            >
            </el-image>
          </div>
        </el-aside>
        <el-main class="relative">
          <el-tag type="info" effect="dark">
            {{ newsById?.tag }}
          </el-tag>
          <h3 class="mt-[15px] font-medium text-2xl text-center">
            {{ newsById?.title }}
          </h3>
          <div class="flex flex-row">
            <div>
              <p class="mt-[15px] line-clamp-3 text-base h-fit">
                {{ newsById?.content }}
              </p>
            </div>
          </div>
          <a :href="newsById?.url" target="_blank"
            ><h6 class="text-sm text-cyan-700 hover:text-lime-600 text-right mr-[50px] mt-[10px]">Read more</h6></a
          >
        </el-main>
      </el-container>
    </div>
    <News />
  </div>
</template>

<script setup lang="ts">
import News from '~/components/News.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { News as NewsModel } from '~/models/News'
import { getNewsById } from '~/api/News'
const route = useRoute()
const newsById = ref<NewsModel>()
onMounted(async () => {
  newsById.value = await getNewsById(route.params.id)
})
</script>

<style>
.common-layout .el-aside {
  background-color: #d3dce6;
  padding-left: 15px;
  color: var(--el-text-color-primary);
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

.common-layout > .el-container {
  margin-bottom: 40px;
}
</style>
