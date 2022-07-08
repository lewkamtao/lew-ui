<script setup lang="ts">
import { ref } from 'vue';

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
    <lew-flex gap="30px" x="start">
        <lew-dropdown
            :options="options"
            placement="bottom-start"
            @change="change"
        >
            <lew-avatar src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/media/images/2022782251430.jpeg">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown :options="options" placement="top-start" @change="change">
            <lew-avatar src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/media/images/2022782251430.jpeg">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown
            :options="options"
            placement="left-start"
            @change="change"
        >
            <lew-avatar src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/media/images/2022782251430.jpeg">hover</lew-avatar>
        </lew-dropdown>

        <lew-dropdown
            :options="options"
            placement="right-start"
            @change="change"
        >
            <lew-avatar src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/media/images/2022782251430.jpeg">hover</lew-avatar>
        </lew-dropdown>
    </lew-flex>
</template>
