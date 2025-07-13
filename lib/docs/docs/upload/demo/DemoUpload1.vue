<script setup lang="ts">
import type { UploadFileItem } from 'lew-ui'
import uploadHelper from '../uploadHelper'

const fileList = ref<UploadFileItem[]>([])
</script>

<template>
    <lew-flex width="500px">
        <lew-upload v-model="fileList" :uploadHelper="uploadHelper" />
    </lew-flex>
</template>
