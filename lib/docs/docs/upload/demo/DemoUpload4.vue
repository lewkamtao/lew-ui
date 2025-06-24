<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui';
import uploadHelper from '../uploadHelper';

const fileList = ref<UploadFileItem[]>([]);
</script>

<template>
  <lew-flex width="500px">
    <lew-upload
      v-model="fileList"
      :uploadHelper="uploadHelper"
      accept="image/*"
      :maxFileSize="1024 * 500"
      tips="证件照格式：只能上传jpg/png文件，且不超过500kb"
    />
  </lew-flex>
</template>
