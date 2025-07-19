<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
  <lew-flex width="500px">
    <lew-upload
      v-model="fileList"
      :upload-helper="uploadHelper"
      accept="image/*"
    />
  </lew-flex>
</template>
