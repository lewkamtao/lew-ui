<script setup lang="ts">
type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const options = ref([
    { label: 'Light', value: '1' },
    { label: 'Dark', value: '2' },
]);

const value = ref('');

const change = (e: Options) => {
    console.log(e);
    LewMessage.info(e.label);
};
</script>

<template>
    <lew-tabs v-model="value" round :options="options" @change="change" />
</template>
