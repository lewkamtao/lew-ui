<script setup lang="ts">
import DemoBox from '../../layout/DemoBox.vue';
import { ref } from 'vue';
import { LewTitle, LewAlert, LewButton } from '../../../packages';

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

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewAlert, LewButton } from '../../../packages';

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

<\/script>

<template>
    <LewButton
        type="primary"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'primary',
                title: '成功发送一条消息',
                content: '',
            })
        "
        >点我</LewButton
    >
    <LewButton
        type="error"
        style="margin-right: 10px"
        @click="
            addAlert({
                type: 'error',
                title: '成功发送一条消息',
                content: '',
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
                content: '',
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
                content: '',
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
                content: 'Well the Ukraine girls really knock me out
                                    They leave the West behind
                                    And Moscow girls make me sing and shout
                                    That Georgia's always on my mind
                                    Aw come on!',
            })
        "
        >点我</LewButton
    >
    <div style="margin-top: 20px">
        <LewAlert :alert-list="alertList" @close="close"></LewAlert>
    </div>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Alert</lew-title>
        <demo-box title="警报" :code="pre1">
            <LewButton
                type="normal"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'normal',
                        title: '成功发送一条消息',
                        content:
                            'Well the Ukraine girls really knock me out They leave the West behind And Moscow girls make me sing and shout That Georgia s always on my mind Aw come on!',
                    })
                "
                >normal</LewButton
            >
            <LewButton
                type="primary"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'info',
                        title: '成功发送一条消息',
                        content: '',
                    })
                "
                >info</LewButton
            >
            <LewButton
                type="error"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'error',
                        title: '成功发送一条消息',
                        content: '',
                    })
                "
                >error</LewButton
            >
            <LewButton
                type="warning"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'warning',
                        title: '成功发送一条消息',
                        content: '',
                    })
                "
                >warning</LewButton
            >
            <LewButton
                type="success"
                style="margin-right: 10px"
                @click="
                    addAlert({
                        type: 'success',
                        title: '成功发送一条消息',
                        content: '',
                    })
                "
                >success</LewButton
            >

            <div style="margin-top: 20px">
                <LewAlert :alert-list="alertList" @close="close"></LewAlert>
            </div>
        </demo-box>
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
