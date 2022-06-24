<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    {
        label: '广东',
        value: '1',
    },
    {
        label: '深圳',
        value: '2',
    },
    {
        label: '杭州',
        value: '3',
    },
    {
        label: '上海',
        value: '4',
    },
    {
        label: '北京',
        value: '5',
    },
]);

let value = ref('');
</script>

<template>
    <div style="width: 350px">
        <LewSelect v-model="value" :options="options"></LewSelect>
    </div>
</template>
