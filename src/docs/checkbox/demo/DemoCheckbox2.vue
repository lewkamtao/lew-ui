<script setup lang="ts">
const checked = ref(false);
</script>

<template>
    <lew-flex x="start" gap="15" direction="y">
        <lew-checkbox v-model="checked" size="small" label="同意" />
        <lew-checkbox v-model="checked" round label="是否付款" />
        <lew-checkbox v-model="checked" size="large" round label="是否少数民族" />
    </lew-flex>
</template>
