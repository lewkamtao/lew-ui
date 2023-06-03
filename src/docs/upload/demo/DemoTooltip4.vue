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
  <lew-upload
    v-model:file-list="fileList"
    drag
    multiple
    list-type="picture"
    @preview="handlePreview"
  >
    <div
      style="
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 100px;
            "
    >
      <lew-icon type="upload" />
      <span>upload</span>
    </div>
  </lew-upload>
</template>

<style scoped></style>
