<script setup lang="ts">
const options = ref([
    {
        label: '宋太宗',
        value: '1',
    },
    {
        label: '明神宗',
        value: '2',
        disabled: true,
    },
    {
        label: '雍正帝',
        disabled: true,
        value: '3',
    },
    {
        label: '宋宁宗',
        value: '4',
    },
    {
        label: '陈高祖陈霸先',
        value: '5',
    },
]);

const value = ref('');
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select
            v-model="value"
            :options="options"
            placeholder="禁用某几个选项"
        />
    </lew-flex>
</template>
