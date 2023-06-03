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
])

function handlePreview(file) {
  if (file?.response?.data)
    window.open(file.response.data)
}
</script>

<template>
  <lew-upload v-model:file-list="fileList" @preview="handlePreview">
    <lew-button type="primary" icon="upload" text="upload" />
    <template #tip>
      <span>jpg/png files with a size less than 500KB.</span>
    </template>
  </lew-upload>
</template>

<style scoped></style>
