<template>
  <div class="container m-auto min-w-[500px]">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-lg" style="padding-left: 5%; padding-right: 5%">
      <h1 class="text-center text-2xl mb-10">{{ $t('message.leadingexpert', {}, { locale: $i18n.locale }) }}</h1>
      <el-row class="row-bg mb-10">
        <el-col
          class="grid grid-content mb-10"
          v-for="expert in expertArr"
          :key="expert._id"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <div class="grid justify-evenly">
            <el-popover placement="bottom-start" :width="500" trigger="hover" effect="#ECF4F1">
              <template #reference>
                <div>
                  <router-link v-bind:to="'/expert/' + expert._id" custom v-slot="{ navigate, href }">
                    <el-link type="primary" :href="href" @click="navigate">
                      <div class="h-[300px] w-[210px]">
                        <img
                          :src="expert.img"
                          class="w-[210px] h-[300px] object-cover rounded-3xl"
                          style="height: 300px; border-radius: 10px"
                          @error="
                            e => {
                              const target = e.target as HTMLImageElement
                              target.src = userImg
                            }
                          "
                        />
                      </div>
                    </el-link>
                  </router-link>
                </div>
              </template>

              <div class="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-lg">
                <div class="md:flex">
                  <div class="md:shrink-0">
                    <img
                      class="h-48 w-full object-cover md:h-full md:w-48"
                      alt="avatar"
                      style="height: 200px"
                      :src="expert.img"
                      @error="
                        e => {
                          //@ts-ignore
                          e.target.src = userImg
                        }
                      "
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
                      {{ $t('message.degree', {}, { locale: $i18n.locale }) }}: {{ expert.degree }}
                    </h2>
                    <!-- v-for="(field, index) in expert._source.google_scholar_fields.fields" :key="index" -->
                    <div class="inline">
                      <div class="mt-[8px]">{{ $t('message.researcharea', {}, { locale: $i18n.locale }) }}:</div>
                      <span>
                        <span
                          style="display: block; margin-right: -5px"
                          class="mt-2 ml-2 text-gray-500 overflow-hidden"
                          v-for="(number, index) of expert?.research_area"
                          :key="index"
                        >
                          {{
                            index < expert?.research_area.length - 1 && expert?.research_area.length > 1
                              ? number + ','
                              : number
                          }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
        </el-col>
      </el-row>

      <div class="text-center">
        <router-link to="/allexperts" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">{{
            $t('message.viewallexperts', {}, { locale: $i18n.locale })
          }}</el-link>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userImg from '~/assets/user.png'
import { onMounted, ref } from 'vue'
import { useStore } from '~/store/index'
import { getHomepage } from '~/api/Homepage'
import { Homepage } from '~/models/Homepage'
import { Experts } from '~/models/Experts'
const expertArr = ref<Experts[]>([])
const homepage = ref<Homepage>()
onMounted(async () => {
  homepage.value = await getHomepage()
  expertArr.value = homepage.value.top_experts
  // console.log(expertArr.value)
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
.el-col:last-child {
  display: none;
}

@media screen and (max-width: 1198.5px) {
  .el-col:last-child {
    display: block;
  }
}

@media screen and (max-width: 990px) {
  .el-col:last-child {
    display: none;
  }
}
</style>
