<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
  <div class="w-full bg-slate-200 m-auto">
    <div class="px-8 py-4 bg-slate-200 flex justify-center w-full mx-auto">
      <div class="w-[80%] m-auto">
        <el-row :gutter="80" class="text-center flex-auto">
          <el-col :span="6" class="text-center">
            <el-col class="text-left leading-10">
              <h2 class="font-medium text-2xl">Feature</h2>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">Find an Expert</p></a>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">Find Events</p></a>
            </el-col>
          </el-col>
          <el-col :span="6" class="text-center">
            <el-col class="text-left leading-10">
              <h2 class="font-medium text-2xl">Discover</h2>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">Security</p></a>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">Sponsor</p></a>
            </el-col>
          </el-col>
          <el-col :span="6" class="text-center">
            <el-col class="text-left leading-10">
              <h2 class="font-medium text-2xl">Information</h2>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">Rules</p></a>
              <a href=""><p class="text-lg leading-10 hover:text-emerald-600">About us</p></a>
            </el-col>
          </el-col>
          <el-col :span="6" class="text-center">
            <el-col class="text-left leading-10">
              <h2 class="font-medium text-2xl">Community</h2>
              <p>
                <i class="bi bi-facebook mr-2"></i
                ><a href="https://m.facebook.com"><t class="text-lg leading-10 hover:text-emerald-600">Facebook</t></a>
              </p>
              <p>
                <i class="bi bi-twitter mr-2"></i
                ><a href="https://twitter.com"><t class="text-lg leading-10 hover:text-emerald-600">Twitter</t></a>
              </p>
              <p>
                <i class="bi bi-linkedin mr-2"></i
                ><a href="https://www.linkedin.com"><t class="text-lg leading-10 hover:text-emerald-600">LinkeIn</t></a>
              </p>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
