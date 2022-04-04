<template>
  <el-row :gutter="20" class="p-5 mb-4">
    <el-col :span="4">
      <img
        :src="expert.img"
        class="w-[210px] h-[300px] object-cover rounded-3xl"
        style="height: 200px; border-radius: 10px"
      />
      <!-- <el-image
              class="max-h-56 rounded-sm"
              style="width: auto; height: auto; border-radius: 30px"
              :src="expert.img"
              fit="cover"
            /> -->
    </el-col>
    <el-col :span="16">
      <div class="h-full flex flex-col justify-center">
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
      <div class="mt-20"><el-button class="w-20" type="info" round>Chi tiết</el-button></div>
    </router-link>
  </el-row>
</template>

<script lang="ts" setup>
import { Experts } from '~/models/Experts'
const props = defineProps<{
  expert: Experts
}>()
</script>
