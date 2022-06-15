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
});

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
        <LewTitle bold>Form</LewTitle>

        <div style="margin-bottom: 50px">
            <LewFormItem direction="y" title="账号">
                <LewInput v-model="user.username" style="width: 350px" />
            </LewFormItem>
            <LewFormItem direction="y" title="密码" style="margin-bottom: 20px">
                <LewInput v-model="user.password" style="width: 350px" />
            </LewFormItem>
            <LewFormItem direction="y" title="简介" style="margin-bottom: 20px">
                <LewTextarea
                    v-model="user.password"
                    style="width: 350px"
                    resize="none"
                />
            </LewFormItem>
            <LewTitle style="margin-bottom: 10px" size="14px"
                >选择地址</LewTitle
            >
            <LewSelect
                v-model="user.home"
                style="width: 350px; margin-bottom: 20px"
                :options="options"
                >Github</LewSelect
            >
            <LewTitle size="14px" style="margin-bottom: 10px">性别</LewTitle>
            <LewRadioboxGroup
                v-model:value="user.sex"
                style="margin-bottom: 20px"
                :options="[
                    { name: '未知', id: 0 },
                    { name: '男', id: 1 },
                    { name: '女', id: 2 },
                ]"
            ></LewRadioboxGroup>
            <LewTitle style="margin-bottom: 10px" size="14px">爱好</LewTitle>
            <LewCheckboxGroup
                v-model:value="user.hobby"
                style="margin-bottom: 20px"
                :options="[
                    { name: '唱歌', id: 1 },
                    { name: '跳舞', id: 2 },
                    { name: 'rap', id: 3 },
                    { name: '打篮球', id: 44 },
                ]"
            ></LewCheckboxGroup>
            <LewTitle style="margin-bottom: 10px" size="14px"
                >是否订阅</LewTitle
            >
            <LewSwitch
                v-model="user.dark"
                style="margin-bottom: 20px"
            ></LewSwitch>
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
