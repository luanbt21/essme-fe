<template>
  <el-container>
    <el-main class="rounded-xl m-5 bg-[#d1e0db]">
      <div class="">
        <el-carousel trigger="click" class="h-[500px]">
          <el-carousel-item class="h-auto">
            <div class="my-3 ml-10 font-bold text-black text-2xl">INTRODUCTION</div>
            <div class="ml-[70px] font-bold text-black">
              <div class="mt-4">
                APPELLATION:
                <span class="font-normal ml-5">{{ expert?.name }} </span>
              </div>
              <div class="my-3">
                POSITION:
                <span class="font-normal ml-16">{{ expert?.degree }}</span>
              </div>
              <div>
                AFFILIATE:
                <span class="font-normal ml-14">{{ expert?.company }}</span>
              </div>
              <div class="my-3">
                EXPERTISE:
                <span class="font-normal ml-12"
                  >Research assistant professor Of computer science Research assistant professor Of computer science
                  Research assistant professor Of computer science</span
                >
              </div>
            </div>
            <div class="my-3 ml-10 font-bold text-black text-2xl">SOCIAL MEDIA</div>
            <div class="ml-[70px] text-black text-lg">
              <div class="flex my-3 mt-5">
                <div class="mr-3 text-2xl"><i class="fas fa-globe-asia"></i></div>
                <span>{{ expert?.link_profile }}</span>
              </div>
              <!-- <div class="flex my-3">
                <i class="fab fa-facebook"></i>
                <div class="mr-3 text-2xl"></div>
                <span>https://www.facebook.com/</span>
              </div>
              <div class="flex my-3">
                <i class="fab fa-twitter"></i>
                <div class="mr-3 text-2xl"></div>
                https://twitter.com/
              </div>
              <div class="flex my-3">
                <i class="fab fa-linkedin-in"></i>
                <div class="mr-3 text-2xl"></div>
                https://www.linkedin.com/
              </div> -->
            </div>
          </el-carousel-item>
          <el-carousel-item class="w-auto">
            <MapboxVue
              :data="mapData"
              :zoom="6"
              class="w-full h-full"
              :icon-link="'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'"
              :icon-zoom="0.08"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-main>
    <el-footer class="rounded-xl m-5 font-semibold bg-[#d1e0db] h-auto">
      <div class="text-2xl my-5">ORDER EXPERT</div>
      <el-input
        class="w-auto h-35 text-xl"
        v-model="textarea"
        :rows="8"
        type="textarea"
        placeholder="Enter your requirement"
      />
      <div class="flex justify-center my-3">
        <el-button class="w-24">Send</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, ref } from 'vue'
import { getExperts, getExpertById } from '~/api/Expert'
import { Expert } from '~/models/Expert'
import { useStore } from '~/store/index'
import MapboxVue from '~/components/Mapbox.vue'
import avatar from '/avatar_expert_detail.png'
import { useRoute } from 'vue-router'
import { Feature } from '~/models/Geojson'
import expert_id from '~/store/modules/expert_id'

const expertArr = ref<Expert[]>([])
const expert = ref<Expert>()
const route = useRoute()
let mapData = computed((): Feature[] => {
  if (expert.value) {
    return [
      {
        type: 'Feature',
        geometry: expert.value.location.features[0].geometry,
        properties: {
          label: expert.value._id,
          html: `<span>${expert.value.name}</span>`
        }
      } as Feature
    ]
  } else {
    return []
  }
})

onMounted(async () => {
  const id = route.params.id
  console.log(id)
  expert.value = await getExpertById(id as string)
  // expertArr.value = await getExperts(8)
  // console.log(expert.value)
})
const lat = ref<number>(16)
const lon = ref<number>(50)

const textarea = ref('')
</script>

<style></style>
