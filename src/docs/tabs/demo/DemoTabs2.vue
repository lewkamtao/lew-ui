<script setup lang="ts">
import { ref } from 'vue';

type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const options = ref([
    { label: 'Light', value: '1' },
    { label: 'Dark', value: '2' },
]);

let value = ref('');

const change = (e: Options) => {
    console.log(e);
    LewMessage.info(e.label);
};
</script>

<template>
    <lew-tabs
        round
        v-model="value"
        :options="options"
        @change="change"
    />
</template>
