<script setup lang="ts">
import { reactive } from 'vue'

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
  {
    name: 'seagull.jpg',
    status: 'success',
    url: 'https://cdn.pixabay.com/photo/2023/05/14/05/04/seagull-7991991_960_720.jpg',
    response: {
      code: 200,
      data: 'https://cdn.pixabay.com/photo/2023/05/14/05/04/seagull-7991991_960_720.jpg',
    },
  },
])

function handlePreview(file) {
  if (file?.response?.data)
    window.open(file.response.data)
}
</script>

<template>
  <lew-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    @preview="handlePreview"
  >
    <lew-icon type="upload" />
    <span>upload</span>
  </lew-upload>
</template>

<style scoped></style>
