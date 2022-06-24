<script setup lang="ts">
import { ref } from 'vue';
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

let sex_options = ref([
    { name: '未知', id: 0 },
    { name: '男', id: 1 },
    { name: '女', id: 2 },
]);

let pay_options = ref([
    { label: '微信', value: '1' },
    { label: '支付宝', value: '2' },
    { label: 'Apple Pay', value: '3' },
]);
let hobby_options = ref([
    { name: '唱歌', id: 1 },
    { name: '跳舞', id: 2 },
    { name: 'rap', id: 3 },
    { name: '打篮球', id: 44 },
]);
let home_options = ref([
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
    <div class="form-box">
        <lew-form-item direction="y" title="账号">
            <LewInput
                v-model="user.username"
                v-tooltip="{
                    content: `输入账号`,
                    placement: `top`,
                    trigger: `focus`,
                }"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="密码">
            <LewInput v-model="user.password" />
        </lew-form-item>
        <lew-form-item direction="y" title="简介">
            <LewTextarea v-model="user.password" resize="none" />
        </lew-form-item>
        <lew-form-item direction="y" title="家地址">
            <LewSelect v-model="user.home" :options="home_options" />
        </lew-form-item>
        <lew-form-item direction="y" title="性别">
            <lew-radiobox-group v-model="user.sex" :options="sex_options" />
        </lew-form-item>
        <lew-form-item direction="y" title="爱好">
            <lew-checkbox-group v-model="user.hobby" :options="hobby_options" />
        </lew-form-item>
        <lew-form-item direction="y" title="订阅">
            <LewSwitch v-model="user.dark" />
        </lew-form-item>
        <lew-form-item direction="y" title="爱好">
            <lew-tabs v-model="user.pay" :options="pay_options" />
        </lew-form-item>
    </div>
</template>
<style scoped lang="scss">
.form-box {
    width: 500px;
    margin: 50px auto;
}
</style>
