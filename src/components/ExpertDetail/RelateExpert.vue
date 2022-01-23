<template>
  <div class="common-layout w-full mx-auto">
    <el-container>
      <el-header class="rounded-xl m-5 bg-[#D1E0DB] h-auto">
        <div class="font-bold text-2xl my-5 ml-6">RELATED EXPERTS</div>
        <el-row :gutter="20" class="m-5">
          <el-col :span="8" v-for="expert in expertArr.slice(2, 5)" :key="expert._id" :xs="24" :sm="12" :lg="8">
            <el-card shadow="always" :style="{ 'background-color': '#ECF4F1' }" class="m-5">
              <router-link v-bind:to="'/expert/' + expert._id" custom v-slot="{ navigate, href }">
                <el-link type="primary" :href="href" @click="navigate">
                  <div class="flex">
                    <div class="basis-3/4 text-black">
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
                </el-link>
              </router-link>
            </el-card>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { getExperts, getExpertById } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { useStore } from '~/store/index'

const expertArr = ref<Expert[]>([])

onMounted(async () => {
  expertArr.value = await getExperts(8)
})
</script>

<style>
</style>