<template>
  <el-card :style="{ 'background-color': '#ECF4F1' }" class="m-5 md:hover:scale-105 hover:duration-500">
    <router-link
      v-bind:to="'/expert/' + expert._id"
      custom
      v-slot="{ navigate, href }"
      :style="{ 'text-decoration': 'none' }"
    >
      <a type="primary" :href="href" @click="navigate" text-decoration="none">
        <div class="flex no-underline">
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
      </a>
    </router-link>
  </el-card>
</template>

<script setup lang="ts">
import { Experts } from '~/models/Experts'
defineProps<{
  expert: Experts
}>()
</script>

<style></style>
