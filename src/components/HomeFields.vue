<template>
  <div class="container mt-10 mx-auto">
    <div class="px-8 py-4 bg-[#D1E0DB] rounded-xl">
      <h2 class="text-center text-2xl mb-2">Fields</h2>
      <el-row :gutter="30">
        <el-col v-for="field in field" :key="field._id" :xs="24" :sm="12" :lg="8">
          <img :src="field.image" alt="" 
                class="w-80 h-52 cover mb-5 mt-5 ml-auto mr-auto md:hover:scale-105 hover:duration-500 cursor-pointer rounded-2xl" >
          <h3 class="text-center text-xl hover:text-emerald-600 cursor-pointer">
            {{ field.name }}
          </h3>
        </el-col>
      </el-row>
      <!-- <div class="text-center">
        <router-link to="/news" custom v-slot="{ navigate, href }">
          <el-link type="primary" :href="href" @click="navigate">View all news</el-link>
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import { getNews } from '~/api/News'
// import { News } from '~/models/News'
// import NewsItem from './NewsItem.vue'

// const newsArr = ref<News[]>([])

interface Field {
  name: string,
  image: string
}
import imgBusiness from '~/assets/field_business.jpg'
import imgIT from '~/assets/field_IT.jpg'
import imgArchitect from '~/assets/field_architect.jpg'
import imgRestaurant from '~/assets/field_restaurant.jpg'
import imgDentist from '~/assets/field_dentist.jpg'
import imgEducation from '~/assets/field_education.jpg'
import imgBeautySalon from '~/assets/field_beauty-salon.jpg'
import imgBiology from '~/assets/field_biology.jpg'
import imgAstronomy from '~/assets/field_astronomy.jpg'


const field: Field[] = [
  {
    name: 'Business',
    image: imgBusiness
  },
  {
    name: 'Information Technology',
    image: imgIT
  },
  {
    name: 'Architect',
    image: imgArchitect
  },
  {
    name: 'Restaurant',
    image: imgRestaurant
  },
  {
    name: 'Dentist',
    image: imgDentist
  },
  {
    name: 'Education',
    image: imgEducation
  },
  {
    name: 'Beauty Salon',
    image: imgBeautySalon
  },
  {
    name: 'Biology',
    image: imgBiology
  },
  {
    name: 'Astronomy',
    image: imgAstronomy
  }
]

</script>
