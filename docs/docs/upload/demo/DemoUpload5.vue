<script setup lang="ts">
import type { LewUploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<LewUploadFileItem[]>([])
</script>

<template>
  <lew-flex x="start">
    <lew-upload v-model="fileList" view-mode="card" :upload-helper :limit="3" />
  </lew-flex>
</template>
