<script setup lang="ts">
import type { LewUploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<LewUploadFileItem[]>([])
</script>

<template>
  <lew-flex width="500px">
    <lew-upload v-model="fileList" :upload-helper="uploadHelper" />
  </lew-flex>
</template>
