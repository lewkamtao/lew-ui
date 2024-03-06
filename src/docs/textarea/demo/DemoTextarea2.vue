<script setup lang="ts">
    const value = ref('');
</script>

<template>
    <lew-flex style="width: 300px" gap="20px" x="start" direction="y">
        <lew-textarea v-model="value" placeholder="展示字数" show-count />
        <lew-textarea v-model="value" placeholder="限制字数" show-count :max-length="300" />
    </lew-flex>
</template>
