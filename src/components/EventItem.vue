<template>
  <div class="mb-6 hover:-translate-y-1 hover:shadow-lg duration-500">
    <a :href="event.web" target="_blank">
      <el-card :body-style="{ padding: '10px' }">
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
        <!-- <p>
          {{ event.desc }}
        </p> -->
        <time class="text-[14px] text-[#999]">
          {{ event.time }}
        </time>
        <address class="text-[14px] text-[#999]">
          {{ event.location }}
        </address>
        <span class="text-[14px] text-[#999]">
          {{ event.type }}
        </span>
      </el-card>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Event } from '~/models/Event'
import { Picture } from '@element-plus/icons-vue'

defineProps<{
  event: Event
}>()
</script>
