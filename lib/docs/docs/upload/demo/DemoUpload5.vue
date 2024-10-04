<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
  <lew-flex x="start">
    <lew-upload v-model="fileList" view-mode="card" :uploadHelper limit="3" />
  </lew-flex>
</template>
