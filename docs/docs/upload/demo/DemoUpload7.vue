<script setup lang="ts">
import type { LewUploadFileItem } from 'lew-ui'

const fileList = ref<LewUploadFileItem[]>([
  {
    key: '50357524',
    size: 71808,
    name: 'Didi Travel Expense Report.pdf',
    lastModifiedDate: '2024-09-05T12:48:41.363Z',
    lastModified: 1725540521363,
  },
  {
    key: 'f7d20623',
    size: 74499,
    name: 'Didi Electronic Invoice.pdf',
    lastModifiedDate: '2024-09-05T12:48:35.593Z',
    lastModified: 1725540515593,
  },
])
</script>

<template>
  <lew-flex width="500px" x="start">
    <lew-upload v-model="fileList" :limit="3" />
  </lew-flex>
</template>
