<template>
  <el-card
    :style="{ 'background-color': ' #FFFFFF' }"
    class="m-5 md:hover:scale-105 hover:duration-500 rounded-[15px] w-[250px] md:w-[330px] lg:w-[220px] xl:w-[320px] 2xl:w-[450px]"
  >
    <router-link
      v-bind:to="'/expert/' + expert._id"
      custom
      v-slot="{ navigate, href }"
      :style="{ 'text-decoration': 'none' }"
    >
      <a type="primary" :href="href" @click="navigate" text-decoration="none">
        <div class="flex no-underline">
          <div class="basis-3/4 text-black h-[150px] w-[350px]">
            <div>{{ expert.name }}</div>
            <div class="my-5">{{ expert.degree }}</div>
            <div>
              <p>{{ expert.company }}</p>
            </div>
          </div>
          <div class="basis-1/4">
            <img
              :src="expert.img == '' || expert.img == null ? avarta : expert.img"
              alt=""
              class="h-[140px] w-[100px]"
              @error="
                e => {
                  const target = e.target as HTMLImageElement
                  target.src = userImg
                }
              "
            />
          </div>
        </div>
      </a>
    </router-link>
  </el-card>
</template>

<script setup lang="ts">
import { Experts } from '~/models/Experts'
import avarta from '~/assets/anhexpert.jpg'
import userImg from '~/assets/user.png'
defineProps<{
  expert: Experts
}>()
</script>

<style></style>
