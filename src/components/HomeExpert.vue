<template>
  <div class="container m-auto min-w-[500px]">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-lg" style="padding-left: 5%; padding-right: 5%">
      <h1 class="text-center text-4xl mb-10">Experts</h1>
      <el-row :gutter="0">
        <el-col class="bg-[#D1E0DB]" v-for="expert in expertArr" :key="expert._id" :xs="12" :sm="12" :md="8" :lg="6">
          <el-popover
            style="border-radius: 10px"
            trigger="hover"
            width="500px"
            placement="bottom-start"
            hide-after="50"
          >
            <template #reference>
              <el-card
                @click="getIdExpert(expert._id)"
                :body-style="{ padding: '0px' }"
                class="mb-10 background-color-radius"
              >
                <img
                  src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                  class="image rounded-3xl"
                  style="width: 220px; height: 300px"
                />
              </el-card>
            </template>

            <div
              class="m-[-50px] max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden md:max-w-lg md:hover:scale-105 hover:duration-500 bg-[#ECF4F1]"
            >
              <div class="md:flex">
                <div class="md:shrink-0">
                  <img
                    v-if="expert.image"
                    class="h-48 w-full object-cover md:h-full md:w-48"
                    alt="avatar"
                    :src="expert.image"
                  />

                  <img
                    v-else
                    class="h-48 w-full object-cover md:h-full md:w-48"
                    src="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
                    alt="avatar"
                  />
                </div>
                <div class="p-8">
                  <p class="uppercase tracking-wide text-sm text-indigo-500 font-semibold line-clamp-2">
                    {{ expert.name }}
                  </p>
                  <!-- mt-1 text-lg leading-tight font-medium text-black line-clamp-2 -->
                  <h2
                    href="#"
                    class="block mt-1 text-lg leading-tight font-medium text-black word-break-keep-all text-left"
                  >
                    Trình độ: {{ expert.degree }}
                  </h2>
                  <!-- v-for="(field, index) in expert._source.google_scholar_fields.fields" :key="index" -->
                  <div class="flex">
                    <a class="mt-2 text-gray-500 overflow-hidden">Lĩnh vực: {{ expert.research_area }}</a>
                  </div>
                </div>
              </div>
            </div>
          </el-popover>
        </el-col>
      </el-row>

      <div class="text-center">
        <router-link to="/experts" custom v-slot="{ navigate, href }">
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
import { useStore } from '~/store/index'

const expertArr = ref<Expert[]>([])

onMounted(async () => {
  expertArr.value = await getExperts(8)
})
// catch expert_id
const store = useStore()
const getIdExpert = (id: string) => {
  store.commit('expert_id/setID', id)
}
</script>

<style>
.word-break-keep-all {
  word-break: keep-all;
}
.img-w-h {
  width: 220px;
  height: 300px;
}
.background-color-radius {
  background-color: #d1e0db;
  border: none;
  border-radius: 20px;
  width: 220px;
  margin: 0 auto 40px auto;
}
</style>