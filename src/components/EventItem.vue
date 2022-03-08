<template>
  <div class="mb-6 hover:-translate-y-1 hover:shadow-lg duration-500">
    <el-card :body-style="{ padding: '10px' }">
      <router-link :to="`/events/${event._id}`">
        <el-image :src="event.img" class="w-full h-32" fit="cover" lazy>
          <template #error>
            <div class="w-full h-full flex justify-center bg-gray-200">
              <el-icon class="m-auto"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <h3 class="font-medium text-lg">
          {{ event.name_event }}
        </h3>
      </router-link>
      <!-- <p>
          {{ event.desc }}
        </p> -->
      <time class="text-[14px] text-[#999]">
        {{ event.time }}
      </time>
      <address class="text-[14px] text-[#999]">
        {{ event.location }}
      </address>
      <el-tag v-for="type in event.type" :key="type">
        {{ type }}
      </el-tag>
      <div class="float-right">
        <el-link type="info" :href="event.web" target="_blank">website</el-link>
        <el-button
          style="margin-left: 8px"
          @click="$emit('locating')"
          type="primary"
          :icon="Location"
          circle
        ></el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Event } from '~/models/Event'
import { Picture, Location } from '@element-plus/icons-vue'

defineProps<{
  event: Event
}>()
</script>
