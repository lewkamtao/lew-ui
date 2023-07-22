<script setup lang="ts">
let value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" :gap="20" x="start" direction="y">
        <lew-input
            size="small"
            v-model="value"
            clearable
            show-count
            :max-length="30"
        />
        <lew-input v-model="value" clearable show-count :max-length="30" />
        <lew-input size="large" v-model="value" clearable show-count :max-length="30" />
    </lew-flex>
</template>
