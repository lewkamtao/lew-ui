<script setup lang="ts">
import { cityTree } from '@/lib/data'

const v = ref<string>('')
</script>

<template>
    <lew-tree-select
        key-field="value"
        label-field="label"
        v-model="v"
        disabled
        :data-source="cityTree"
    />
</template>
