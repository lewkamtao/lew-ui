<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewAlert, LewButton } from '../../../components';

type Options = {
    type: string;
    title: string;
    content: string;
};

let alertList = ref([] as Options);

const addAlert = (e: number) => {
    alertList.value.unshift(e);
};
const close = (e: number) => {
    alertList.value.splice(e, 1);
};
</script>

<template>
    <div class="main">
        <LewTitle>Alert</LewTitle>
        <div style="width: 600px">
            <LewButton
                type="primary"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'primary',
                        title: '成功发送一条消息',
                        content: `Well the Ukraine girls really knock me out
                                    They leave the West behind
                                    And Moscow girls make me sing and shout
                                    That Georgia's always on my mind
                                    Aw come on!`,
                    })
                "
                >发送</LewButton
            >
            <LewButton
                type="danger"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'danger',
                        title: '成功发送一条消息',
                        content: `Well the Ukraine girls really knock me out
                                    They leave the West behind
                                    And Moscow girls make me sing and shout
                                    That Georgia's always on my mind
                                    Aw come on!`,
                    })
                "
                >发送</LewButton
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
                >发送</LewButton
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
                >发送</LewButton
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
                >发送</LewButton
            >
            <div style="margin-top: 20px">
                <LewAlert :alert-list="alertList" @close="close"></LewAlert>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0px;
    }
}
</style>
