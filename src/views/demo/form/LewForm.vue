<script setup lang="ts">
import { ref } from 'vue';
import {
    LewTitle,
    LewInput,
    LewFormItem,
    LewCheckboxGroup,
    LewRadioboxGroup,
    LewSwitch,
    LewTextarea,
    LewSelect,
    LewTabs,
    LewTooltip,
} from '../../../components';

let user = ref({
    username: '',
    password: '',
    age: '',
    sex: 0,
    hobby: [],
    school: '',
    home: '',
    dark: true,
    pay: '',
});

const LewTabsOptions = ref([
    { label: '微信', value: '1' },
    { label: '支付宝', value: '2' },
    { label: 'Apple Pay', value: '3' },
]);

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
</script>

<template>
    <div class="main">
        <LewTitle>Form</LewTitle>

        <div style="margin-bottom: 50px; width: 350px">
            <LewFormItem direction="y" title="账号">
                <LewTooltip
                    style="width: 100%"
                    placement="bottom"
                    tips="请输入账号"
                >
                    <LewInput v-model="user.username"
                /></LewTooltip>
            </LewFormItem>
            <LewFormItem direction="y" title="密码" style="margin-bottom: 20px">
                <LewInput v-model="user.password" />
            </LewFormItem>
            <LewFormItem direction="y" title="简介" style="margin-bottom: 20px">
                <LewTextarea v-model="user.password" resize="none" />
            </LewFormItem>
            <LewTitle :bold="false" style="margin-bottom: 10px" size="14px"
                >选择地址</LewTitle
            >
            <LewSelect
                v-model="user.home"
                style="margin-bottom: 20px"
                :options="options"
                >Github</LewSelect
            >
            <LewTitle :bold="false" size="14px" style="margin-bottom: 10px"
                >性别</LewTitle
            >
            <LewRadioboxGroup
                v-model="user.sex"
                style="margin-bottom: 20px"
                :options="[
                    { name: '未知', id: 0 },
                    { name: '男', id: 1 },
                    { name: '女', id: 2 },
                ]"
            ></LewRadioboxGroup>
            <LewTitle :bold="false" style="margin-bottom: 10px" size="14px"
                >爱好</LewTitle
            >
            <LewCheckboxGroup
                v-model="user.hobby"
                style="margin-bottom: 20px"
                :options="[
                    { name: '唱歌', id: 1 },
                    { name: '跳舞', id: 2 },
                    { name: 'rap', id: 3 },
                    { name: '打篮球', id: 44 },
                ]"
            ></LewCheckboxGroup>
            <LewTitle :bold="false" style="margin-bottom: 10px" size="14px"
                >是否订阅</LewTitle
            >
            <LewSwitch
                v-model="user.dark"
                style="margin-bottom: 20px"
            ></LewSwitch>

            <LewTitle :bold="false" style="margin-bottom: 10px" size="14px"
                >支付方式</LewTitle
            >
            <LewTabs
                v-model="user.pay"
                :options="LewTabsOptions"
                style="margin-bottom: 20px"
            ></LewTabs>
        </div>
        <pre>{{ user }}</pre>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin: 30px 0;
    }
}
</style>
