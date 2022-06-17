<script setup lang="ts">
import DemoBox from '../../../components/demo/DemoBox.vue';
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
]);

let pre1 = ref(`
<template> 
    <LewFormItem direction="y" title="账号">
        <LewTooltip style="width: 100%" placement="bottom" tips="请输入账号">
            <LewInput v-model="user.username"
        /></LewTooltip>
    </LewFormItem>
    <LewFormItem direction="y" title="密码" style="margin-bottom: 20px">
        <LewInput v-model="user.password" />
    </LewFormItem>
    <LewFormItem direction="y" title="简介" style="margin-bottom: 20px">
        <LewTextarea v-model="user.password" resize="none" />
    </LewFormItem>
    <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
        >选择地址</lew-title
    >
    <LewSelect
        v-model="user.home"
        style="margin-bottom: 20px"
        :options="options"
        >Github</LewSelect
    >
    <lew-title :bold="false" size="14px" style="margin-bottom: 10px"
        >性别</lew-title
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
    <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
        >爱好</lew-title
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
    <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
        >是否订阅</lew-title
    >
    <LewSwitch v-model="user.dark" style="margin-bottom: 20px"></LewSwitch>

    <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
        >支付方式</lew-title
    >
    <LewTabs
        v-model="user.pay"
        :options="LewTabsOptions"
        style="margin-bottom: 20px"
    ></LewTabs>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Form</lew-title>
        <demo-box title="表单总览" :code="pre1">
            <div class="form-box">
                <LewFormItem direction="y" title="账号">
                    <LewTooltip
                        style="width: 100%"
                        placement="bottom"
                        tips="请输入账号"
                    >
                        <LewInput v-model="user.username"
                    /></LewTooltip>
                </LewFormItem>
                <LewFormItem
                    direction="y"
                    title="密码"
                    style="margin-bottom: 20px"
                >
                    <LewInput v-model="user.password" />
                </LewFormItem>
                <LewFormItem
                    direction="y"
                    title="简介"
                    style="margin-bottom: 20px"
                >
                    <LewTextarea v-model="user.password" resize="none" />
                </LewFormItem>
                <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
                    >选择地址</lew-title
                >
                <LewSelect
                    v-model="user.home"
                    style="margin-bottom: 20px"
                    :options="options"
                    >Github</LewSelect
                >
                <lew-title :bold="false" size="14px" style="margin-bottom: 10px"
                    >性别</lew-title
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
                <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
                    >爱好</lew-title
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
                <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
                    >是否订阅</lew-title
                >
                <LewSwitch
                    v-model="user.dark"
                    style="margin-bottom: 20px"
                ></LewSwitch>

                <lew-title :bold="false" style="margin-bottom: 10px" size="14px"
                    >支付方式</lew-title
                >
                <LewTabs
                    v-model="user.pay"
                    :options="LewTabsOptions"
                    style="margin-bottom: 20px"
                ></LewTabs>
            </div>
        </demo-box>
        <pre>{{ user }}</pre>
    </div>
</template>

<style lang="scss" scoped>
.form-box {
    width: 500px;
    margin: 50px auto;
}
</style>
