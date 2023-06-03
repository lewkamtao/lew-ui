<script setup lang="ts">
import { reactive, ref } from 'vue'

const uploadRef = ref()

const fileList = reactive([
  {
    name: 'dog.jpg',
    status: 'success',
    url: 'https://cdn.pixabay.com/photo/2023/05/13/19/20/dog-7991199_960_720.jpg',
    response: {
      code: 200,
      data: 'https://cdn.pixabay.com/photo/2023/05/13/19/20/dog-7991199_960_720.jpg',
    },
  },
])

function handlePreview(file: any) {
  if (file?.response?.data)
    window.open(file.response.data)
}

function submit(event: any) {
  event.stopPropagation()
  uploadRef.value.submit()
}
</script>

<template>
  <lew-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    @preview="handlePreview"
  >
    <lew-button type="success" icon="file-text" text="select" />
    <lew-button
      type="primary"
      icon="upload"
      text="upload"
      style="margin-left: 10px"
      @click="submit"
    />
  </lew-upload>
</template>

<style scoped></style>
