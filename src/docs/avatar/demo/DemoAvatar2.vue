<script setup lang="ts">
import { ref } from 'vue';
let avatarUrl = ref(
    'https://cdn.jsdelivr.net/gh/lewkamtao/PicHub-Cloud@master/PicHub/1fb3f5f5bf661efd985d940004b3642_pyapiq_.jpeg',
);
</script>

<template>
    <lew-flex wrap x="start" gap="20px">
        <lew-avatar
            :src="avatarUrl"
            status="online"
            status-position="top-left" />
        <lew-avatar
            :src="avatarUrl"
            status="processing"
            status-position="top-left" />
        <lew-avatar
            :src="avatarUrl"
            status="busy"
            status-position="top-right" />
        <lew-avatar
            :src="avatarUrl"
            round
            status="away"
            status-position="bottom-left" />
        <lew-avatar
            :src="avatarUrl"
            round
            status="offline"
            status-position="bottom-right"
    /></lew-flex>
</template>
