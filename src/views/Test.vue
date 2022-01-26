<template>
  <div>
    <button @click="postNews">post news</button>
    <p>
      {{ JSON.stringify(news) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const news = ref()

const postNews = async () => {
  const headers = {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDA2MjBjNWFhN2JlOGNkMDNhNmYzYzY4NDA2ZTQ1ZTkzYjNjYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTU1MDg4NzM4MzEwLWtzNmpqdXV2a3YwaWN1ZHM3aDhhbmszczA4NHIwdHZzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTU1MDg4NzM4MzEwLWtzNmpqdXV2a3YwaWN1ZHM3aDhhbmszczA4NHIwdHZzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEyODI4NzM2NDM5ODEzMTg5NDkyIiwiZW1haWwiOiJob2Fob25nZ2FpMTE5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IkxwSWY1bFBiMjJxRzBIZWZSNnNsN3ciLCJpYXQiOjE2NDI3ODE1NDUsImV4cCI6MTY0Mjc4NTE0NX0.AveVkGA8QbCn4XZ76PThBGfcjE5pczOQ3TZ9eRSzck0vfVB-0R9Gq2iplwkLad-crp6e6c7ibHNiACYTRrEXMKITTB19uh5zNtWHUJqty9Zr3ww9Rykk8Cw25-89eGzkeL8V_HVzdCvoLXAFYbDb4suo3KxEK9wkGOY_oaBYYSU9jIr77eNGOz2y_8iyK05MTMCzjq6QTVAiV7_or8ZSvysLRH2kZ2M_3oxK61GFCjhesAd4VbiEELE5Fv7nztP5SRsdLUmgdN2UaNHhozhjSIcFL0JQMQ-Xu1nHFGnan_PkVfi4l9DWqUjr0wiNfBhmnkJIe_hP8xY0jcljL9ijrQ`
  }
  const res = await axios.post(
    '/news',
    {
      stt: 'string',
      img: 'string',
      tag: 'string',
      title: 'string',
      url: 'string',
      content: 'string',
      status: 'string'
    },
    {
      headers
    }
  )
  news.value = res.data
}
</script>
