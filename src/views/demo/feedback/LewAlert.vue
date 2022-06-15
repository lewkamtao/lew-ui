<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle, LewAlert, LewButton } from '../../../components';
let alertList = ref([] as any);

const addAlert = (e: any) => {
    alertList.value.unshift(e);
};
const close = (e: any) => {
    alertList.value.splice(e, 1);
};
</script>

<template>
    <div class="main">
        <LewTitle bold>Alert</LewTitle>
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
                type="gray"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'gray',
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
            <LewAlert :alert-list="alertList" @close="close"></LewAlert>
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
