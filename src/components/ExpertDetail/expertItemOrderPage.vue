<template>
  <div
    class="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden md:max-w-lg md:hover:scale-105 hover:duration-500 bg-[#ECF4F1]"
  >
    <div class="md:flex">
      <div class="md:shrink-0">
        <img
          style="height: 200px"
          v-if="expert.img"
          class="h-48 w-full object-cover md:h-full md:w-48"
          alt="avatar"
          :src="expert.img"
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
        <h2 href="#" class="block mt-1 text-lg leading-tight font-medium text-black word-break-keep-all text-left">
          Trình độ: {{ expert.degree }}
        </h2>
        <div class="flex">
          <div class="w-24">Lĩnh vực:</div>
          <span>
            <a class="mt-2 text-gray-500 overflow-hidden" v-for="(number, index) of expert?.research_area" :key="index">
              {{ index < expert?.research_area.length - 1 && expert?.research_area.length > 1 ? number + ',' : number }}
            </a>
          </span>
        </div>
        <div>
          <router-link :to="'/expert/' + expert._id"
            ><div class="text-right italic text-sky-600 hover:text-sky-400 underline">details</div></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Experts } from '~/models/Experts'

defineProps<{
  expert: Experts
}>()
</script>
