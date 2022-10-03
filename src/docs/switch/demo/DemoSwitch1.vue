<script setup lang="ts">
import { ref } from 'vue';

let value = ref(false);

const mockFn = (v: boolean) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(v);
            resolve(true);
            LewMessage.success('发送成功');
        }, 1000);
    });
};
const change = (e: boolean) => {
    console.log(e);
};
</script>

<template>
    <lew-switch v-model="value" @change="change" :request="mockFn"></lew-switch>
</template>
