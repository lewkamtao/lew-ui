<script setup lang="ts">
const value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
        <lew-textarea
            v-model="value"
            placeholder="可清空的"
            :max-length="300"
            show-count
            clearable
        />
        <lew-textarea
            v-model="value"
            placeholder="只读"
            :max-length="300"
            show-count
            readonly
            clearable
        />
        <lew-textarea
            v-model="value"
            placeholder="禁用"
            :max-length="300"
            show-count
            disabled
            clearable
        />
    </lew-flex>
</template>
