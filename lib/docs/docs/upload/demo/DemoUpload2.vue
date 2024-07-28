<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
  <lew-flex width="400px">
    <lew-upload :maxFileSize="1024" :limit="3" v-model="fileList" :uploadHelper="uploadHelper" />
  </lew-flex>
</template>
