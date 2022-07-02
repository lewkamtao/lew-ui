<script setup lang="ts">
import { ref } from 'vue';
import { LewMessage } from '../../../../packages';

let options = ref([
    {
        label: '修改头像',
        value: '1',
    },
    {
        label: '个人中心',
        value: '2',
    },
    {
        label: '开通会员',
        value: '3',
    },
    {
        label: '退出登陆',
        value: '4',
    },
]);

const change = (e: any) => {
    console.log(e);
    LewMessage.info(e.label);
};
</script>
<template>
    <lew-flex gap="120px" x="start">
        <lew-dropdown
            :options="options"
            placement="bottom-start"
            @change="change"
        >
            <lew-avatar src="https://dpurl.org/Oqmw8">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown :options="options" placement="top-start" @change="change">
            <lew-avatar src="https://dpurl.org/Oqmw8">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown
            :options="options"
            placement="left-start"
            @change="change"
        >
            <lew-avatar src="https://dpurl.org/Oqmw8">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown
            :options="options"
            placement="right-start"
            @change="change"
        >
            <lew-avatar src="https://dpurl.org/Oqmw8">hover</lew-avatar>
        </lew-dropdown>
    </lew-flex>
</template>
