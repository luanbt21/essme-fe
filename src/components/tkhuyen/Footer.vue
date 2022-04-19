<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
  <div class="px-8 py-4 bg-slate-200 w-full mx-auto">
    <div class="container m-auto">
      <el-row>
        <el-col :sm="12" :md="6" class="leading-10">
          <div class="pl-[40%]">
            <h2 class="font-medium text-2xl">{{ $t('message.Feature', {}, { locale: $i18n.locale }) }}</h2>
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.FindanExpert', {}, { locale: $i18n.locale }) }}
              </p></a
            >
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.FindEvents', {}, { locale: $i18n.locale }) }}
              </p></a
            >
          </div>
        </el-col>
        <el-col :sm="12" :md="6" class="leading-10">
          <div class="pl-[40%]">
            <h2 class="font-medium text-2xl">{{ $t('message.Discover', {}, { locale: $i18n.locale }) }}</h2>
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.Security', {}, { locale: $i18n.locale }) }}
              </p></a
            >
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.Sponsor', {}, { locale: $i18n.locale }) }}
              </p></a
            >
          </div>
        </el-col>
        <el-col :sm="12" :md="6" class="leading-10">
          <div class="pl-[40%]">
            <h2 class="font-medium text-2xl">
              {{ $t('message.Information', {}, { locale: $i18n.locale }) }}
            </h2>
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.Rules', {}, { locale: $i18n.locale }) }}
              </p></a
            >
            <a href=""
              ><p class="text-lg leading-10 hover:text-emerald-600">
                {{ $t('message.Aboutus', {}, { locale: $i18n.locale }) }}
              </p></a
            >
          </div>
        </el-col>
        <el-col :sm="12" :md="6" class="leading-10">
          <div class="pl-[40%]">
            <h2 class="font-medium text-2xl">{{ $t('message.Community', {}, { locale: $i18n.locale }) }}</h2>
            <p>
              <i class="bi bi-facebook mr-2"></i
              ><a href="https://m.facebook.com"
                ><span class="text-lg leading-10 hover:text-emerald-600">Facebook</span></a
              >
            </p>
            <p>
              <i class="bi bi-twitter mr-2"></i
              ><a href="https://twitter.com"><span class="text-lg leading-10 hover:text-emerald-600">Twitter</span></a>
            </p>
            <p>
              <i class="bi bi-linkedin mr-2"></i
              ><a href="https://www.linkedin.com"
                ><span class="text-lg leading-10 hover:text-emerald-600">LinkeIn</span></a
              >
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
