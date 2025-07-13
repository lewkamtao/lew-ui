<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
    <lew-flex width="500px" x="start">
        <lew-upload v-model="fileList" :limit="3" />
    </lew-flex>
</template>
