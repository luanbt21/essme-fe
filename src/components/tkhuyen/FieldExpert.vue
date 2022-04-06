<template>
  <el-row :gutter="20" class="p-5 mb-4 text-center">
    <el-col :span="6">
      <img :src="expert.img" class="mt-3 w-60 object-cover rounded-2xl inline-block" />
      <!-- <el-image
              class="max-h-56 rounded-sm"
              style="width: auto; height: auto; border-radius: 30px"
              :src="expert.img"
              fit="cover"
            /> -->
    </el-col>
    <el-col :span="14">
      <div class="h-full flex flex-col justify-center text-left">
        <div class="flex p-2">
          <div class="min-w-[130px]">Tên chuyên gia:</div>
          <div>{{ expert.name.toUpperCase() }}</div>
        </div>
        <div class="flex p-2">
          <div class="min-w-[130px]">Trình độ:</div>
          <div>{{ expert.degree }}</div>
        </div>
        <div class="flex p-2">
          <div class="min-w-[130px]">Lĩnh vực:</div>
          <div>
            <div v-for="research_area in expert.research_area">
              <div>{{ research_area }},&nbsp</div>
            </div>
          </div>
        </div>
        <div class="flex p-2">
          <div class="min-w-[130px]">Địa chỉ:</div>
          <div>
            <div class="inline" v-for="address in expert.address">{{ address }},&nbsp</div>
          </div>
        </div>
      </div>
    </el-col>
    <router-link :to="'/expert/' + expert._id">
      <div class="mt-20"><el-button class="w-20 rounded-lg" type="info">Chi tiết</el-button></div>
    </router-link>
  </el-row>
</template>

<script lang="ts" setup>
import { Experts } from '~/models/Experts'
const props = defineProps<{
  expert: Experts
}>()
</script>
