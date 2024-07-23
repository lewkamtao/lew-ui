<script setup lang="ts">
import axios from '@/axios/http'

const uploadHandle = ({ id, file, setFileItem }: any) => {
  var formdata = new FormData()
  formdata.append('file', file)
  setFileItem({ id, status: 'uploading' })
  axios
    .post({
      url: '/open/upload',
      data: formdata,
      baseURL: '/api_sso',
      onUploadProgress: (e: any) => {
        setFileItem({ id, percent: e.progress * 100 })
      }
    })
    .then((res: any) => {
      if (res.success) {
        const { fileName } = res.data
        console.log('上传成功：', `https://app.tngeek.com/api_sso/open/file/${fileName}`)
        setFileItem({
          id,
          status: 'success',
          url: `https://app.tngeek.com/api_sso/open/file/${fileName}`,
          percent: 100
        })
      } else {
        setFileItem({ id, status: 'fail' })
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
