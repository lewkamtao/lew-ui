<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);

const change = (e: unknown) => {
    console.log(e);
    console.log(value.value);
};
</script>

<template>
    <lew-switch v-model="value" :round="false" @change="change"></lew-switch>
</template>
