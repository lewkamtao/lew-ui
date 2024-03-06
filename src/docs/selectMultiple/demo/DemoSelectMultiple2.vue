<script setup lang="ts">
    const options = ref([
        {
            label: '宋太宗',
            value: '1'
        },
        {
            label: '明神宗',
            value: '2',
            disabled: true
        },
        {
            label: '雍正帝',
            disabled: true,
            value: '121'
        },
        {
            disabled: true,
            label: '雍正帝',
            value: '3'
        },
        {
            label: '宋宁宗',
            value: '4'
        },
        {
            label: '陈高祖陈霸先',
            value: '5'
        },
        {
            label: '宋钦宗',
            value: '6'
        },
        {
            label: '唐高宗',
            value: '7'
        },
        {
            label: '齐高帝萧道成',
            disabled: true,
            value: '8'
        },
        {
            label: '晋武帝',
            value: '9'
        },
        {
            label: '唐中宗',
            value: '10'
        },
        {
            label: '唐睿宗',
            value: '11'
        },
        {
            disabled: true,
            label: '汉献帝',
            value: '12'
        },
        {
            label: '齐武帝',
            value: '13'
        }
    ]);
    const value = ref([]);
</script>

<template>
    <lew-flex style="width: 320px" direction="y">
        <lew-select-multiple v-model="value" :options="options" placeholder="click" />
        <lew-select-multiple
            v-model="value"
            :options="options"
            trigger="hover"
            placeholder="hover"
        />
    </lew-flex>
</template>
