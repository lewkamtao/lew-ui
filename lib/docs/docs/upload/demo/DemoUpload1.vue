<script setup lang="ts">
import axios from '@/axios/http'

const uploadHandle = ({ id, file, updateProgress, updateStatus }: any) => {
  var formdata = new FormData()
  formdata.append('file', file)
  updateStatus({ id, status: 'uploading' })
  axios
    .post({
      url: '/open/upload',
      data: formdata,
      baseURL: '/api_sso',
      onUploadProgress: (e: any) => {
        updateProgress({ id, percent: e.progress * 100 })
      }
    })
    .then((res: any) => {
      if (res.success) {
        const { fileName } = res.data
        console.log('上传成功：', `https://app.tngeek.com/api_sso/open/file/${fileName}`)
        updateStatus({ id, status: 'success' })
      } else {
        updateStatus({ id, status: 'fail' })
      }
    })
}
</script>

<template>
  <lew-flex width="500px">
    <lew-upload :uploadHandle="uploadHandle" />
  </lew-flex>
</template>

<style lang="scss" scoped></style>
