<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
  <lew-flex x="start">
    <lew-upload
      v-model="fileList"
      list-type="card"
      limit="3"
    />
  </lew-flex>
</template>
