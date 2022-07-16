<script setup lang="ts">
import { ref } from 'vue';

type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const options = ref([
    { label: 'light', value: '1' },
    { label: 'dark', value: '2' },
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
        style="width: 150px"
        v-model="value"
        :options="options"
        @change="change"
    />
</template>
