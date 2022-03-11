<template>
  <div style="max-width: 500px">
    <el-scrollbar ref="scrollbar" max-height="400px" :native="true">
      <el-row v-for="file in listFile" :key="file" justify="center">
        <el-button-group>
          <el-button class="select" type="info" @click="choose(file)">{{ file }}</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="deleteBackup(file)">
            <template #reference>
              <el-button type="danger" :icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </el-button-group>
      </el-row>
    </el-scrollbar>
    <el-row :gutter="10" justify="center">
      <el-button type="primary" @click="createBackup">Create</el-button>

      <el-button type="success" @click="download" :disabled="!choice">
        Download<el-icon class="el-icon--right"><Download /></el-icon>
      </el-button>

      <el-button type="warning" @click="restore" :disabled="!choice" :loading="isUploading">Restore</el-button>
    </el-row>
    <el-upload drag :headers="headers" :action="`${__baseURL}/backup`" @success="uploadSuccess" @error="uploadError()">
      <el-icon class="el-icon--upload"><Upload /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download, Delete, Upload } from '@element-plus/icons-vue'

import * as Backup from '~/api/Backup'
import { __baseURL } from '~/constant'

const listFile = ref<string[]>([])
const choice = ref('')
const isUploading = ref(false)

const headers = new Headers({ Authorization: '' })

const choose = (filename: string) => {
  choice.value = filename
}

const listBackup = async () => {
  try {
    listFile.value = await Backup.listBackup()
  } catch (error) {
    const err = <Error>error
    ElMessage.error({ message: err.message, center: true })
  }
}

const createBackup = async () => {
  try {
    const filename = await Backup.createBackup()
    if (filename) ElMessage.success({ showClose: true, message: `Backup created: ${filename}`, center: true })
    else ElMessage.error({ message: 'Could not create backup', center: true })
    listBackup()
  } catch (error) {
    const err = <Error>error
    ElMessage.error({ message: err.message, center: true })
  }
}

const download = () => {
  Backup.downloadBackup(choice.value)
}

const restore = async () => {
  isUploading.value = true
  try {
    const status: boolean = await Backup.restore(choice.value)
    if (status) ElMessage.success({ showClose: true, message: `Restore successfully: ${choice.value}`, center: true })
    else ElMessage.error({ message: `Could not restore. File using: ${choice.value}`, center: true })
  } catch (error) {
    const err = <Error>error
    ElMessage.error({ message: err.message, center: true })
  } finally {
    isUploading.value = false
  }
}

const deleteBackup = async (filename: string) => {
  try {
    const status: boolean = await Backup.deleteBackup(filename)
    listBackup()
    if (status) {
      ElMessage.success({ showClose: true, message: `Backup deleted: ${filename}`, center: true })
    } else {
      ElMessage.error({ message: 'Could not delete backup', center: true })
    }
  } catch (error) {
    const err = <Error>error
    ElMessage.error({ message: err.message, center: true })
  }
}

const uploadSuccess = async (file: string) => {
  ElMessage.success({ showClose: true, message: `Update file successful: ${file}`, center: true })
  listBackup()
}

const uploadError = () => {
  ElMessage.error({ message: 'Upload file failed', center: true })
}

onMounted(async () => {
  await listBackup()
})
</script>

<style scoped>
.select {
  width: 300px;
}

.el-scrollbar {
  margin-bottom: 10px;
}

.el-row {
  margin-bottom: 10px;
}
</style>
