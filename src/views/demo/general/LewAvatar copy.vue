<script setup lang="ts">
import { ref } from 'vue';
import { LewAlert, LewButton } from '../../../components';

type Options = {
    type: string;
    title: string;
    content: string;
};

let alertList = ref<Options[]>([]);

const addAlert = (e: Options) => {
    alertList.value.unshift(e);
};
const close = (e: number) => {
    alertList.value.splice(e, 1);
};

</script>

<template>
    <LewButton
        type="primary"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'primary',
                title: '成功发送一条消息',
                content: ``,
            })
        "
        >点我</LewButton
    >
    <LewButton
        type="danger"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'danger',
                title: '成功发送一条消息',
                content: ``,
            })
        "
        >点我</LewButton
    >
    <LewButton
        type="warning"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'warning',
                title: '成功发送一条消息',
                content: ``,
            })
        "
        >点我</LewButton
    >
    <LewButton
        type="success"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'success',
                title: '成功发送一条消息',
                content: ``,
            })
        "
        >点我</LewButton
    >
    <LewButton
        type="normal"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'normal',
                title: '成功发送一条消息',
                content: `Well the Ukraine girls really knock me out
                                    They leave the West behind
                                    And Moscow girls make me sing and shout
                                    That Georgia's always on my mind
                                    Aw come on!`,
            })
        "
        >点我</LewButton
    >
    <div style="margin-top: 20px">
        <LewAlert :alert-list="alertList" @close="close"></LewAlert>
    </div>
</template>
