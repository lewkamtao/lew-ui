<script setup lang="ts">
import { ref } from 'vue';
let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-avatar :src="avatarUrl" alt="avatar" />
        <lew-avatar round :src="avatarUrl" alt="avatar"
    /></lew-flex>
</template>
