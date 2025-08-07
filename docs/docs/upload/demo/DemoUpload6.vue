<script setup lang="ts">
import type { LewUploadFileItem } from 'lew-ui'

const fileList = ref<LewUploadFileItem[]>([])
</script>

<template>
  <lew-flex width="500px" x="start">
    <lew-upload v-model="fileList" :limit="3" />
  </lew-flex>
</template>
