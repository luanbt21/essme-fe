<template>
  <div class="container m-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-3xl" style="padding-left: 5%; padding-right: 5%">
      <h1 class="text-center text-4xl mb-10">Experts</h1>
      <el-row :gutter="0">
        <el-col class="bg-[#D1E0DB]" v-for="Expert in ExpertArr" :key="Expert._id" :span="8" :xs="24" :sm="12" :lg="8">
          <el-card
            :body-style="{ padding: '0px' }"
            class="mb-10 md:hover:scale-105 hover:duration-500 background-color-radius"
          >
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image rounded-3xl"
              style="width: 220px; height: 300px"
            />
          </el-card>
        </el-col>
      </el-row>
      <div class="text-center">
        <router-link to="/news" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">View all Experts</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getExperts } from '~/api/Expert'
import { Expert } from '~/models/Expert'

const ExpertArr = ref<Expert[]>([])

onMounted(async () => {
  ExpertArr.value = await getExperts(6, 0)
})
</script>

<style>
.background-color-radius {
  background-color: #d1e0db;
  border: none;
  border-radius: 20px;
  width: 220px;
  margin: 0 auto 40px auto;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
