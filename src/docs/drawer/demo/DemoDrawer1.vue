<script setup lang="ts">
import { ref } from 'vue';
let visible = ref(false);
const open = (): void => {
    visible.value = true;
};
</script>
<template>
    <lew-flex gap="20px" x="start">
        <lew-drawer v-model:visible="visible" position="right"></lew-drawer>
        <lew-button @click="open">打开</lew-button>
    </lew-flex>
</template>
