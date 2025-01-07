<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'

const fileList = ref<UploadFileItem[]>([
  {
    key: '50357524',
    size: 71808,
    name: '滴滴出行行程报销单.pdf',
    lastModifiedDate: '2024-09-05T12:48:41.363Z',
    lastModified: 1725540521363
  },
  {
    key: 'f7d20623',
    size: 74499,
    name: '滴滴电子发票.pdf',
    lastModifiedDate: '2024-09-05T12:48:35.593Z',
    lastModified: 1725540515593
  },
  {
    key: '6924f722',
    size: 646077,
    name: 'lew-ui_docs.zip',
    lastModifiedDate: '2025-01-06T07:15:21.373Z',
    lastModified: 1736147721373
  }
])
</script>

<template>
  <lew-flex width="400px" x="start">
    <lew-upload v-model="fileList" limit="3" />
  </lew-flex>
</template>
