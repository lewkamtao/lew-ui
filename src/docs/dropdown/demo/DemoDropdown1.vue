<script setup lang="ts">
    import type { DropdownOptions } from 'lew-ui';

    type Options = typeof DropdownOptions;

    const options: Options = ref([
        {
            label: '西游记',
            value: '1'
        },
        {
            label: '水浒传',
            value: '2'
        },
        {
            label: '三国演义',
            value: '3'
        },
        {
            label: '红楼梦',
            value: '4'
        }
    ]);

    const change = (e: Options) => {
        LewMessage.info(e.label);
    };
</script>
<template>
    <lew-flex gap="30" x="start">
        <lew-dropdown :options="options" @change="change">
            <lew-button text="hover" />
        </lew-dropdown>
        <lew-dropdown :options="options" trigger="click" @change="change">
            <lew-button text="click" />
        </lew-dropdown>
    </lew-flex>
</template>
