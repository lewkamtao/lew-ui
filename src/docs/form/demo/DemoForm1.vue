<script setup lang="ts">
import { ref } from 'vue';
let user = ref({
    username: '',
    password: '',
    age: '',
    sex: '0',
    hobby: [],
    school: '',
    home: '',
    intro: '',
    dark: true,
    tags: [],
    pay: '',
});

let sex_options = ref([
    { label: '未知', value: '0' },
    { label: '男', value: '1' },
    { label: '女', value: '2' },
]);

let pay_options = ref([
    { label: '微信', value: '1' },
    { label: '支付宝', value: '2' },
    { label: 'Apple Pay', value: '3' },
]);
let hobby_options = ref([
    { label: '唱歌', value: '1' },
    { label: '跳', value: '2' },
    { label: 'rap', value: '3' },
    { label: '打篮球', value: '44' },
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
let d = ref('2020-12-12');
</script>

<template>
    <div class="form-box">
        <lew-form-item direction="y" title="账号">
            <LewInput v-model="user.username" />
        </lew-form-item>
        <lew-form-item direction="y" title="密码">
            <LewInput v-model="user.password" />
        </lew-form-item>
        <lew-form-item direction="y" title="简介">
            <LewInput
                v-model="user.intro"
                type="textarea"
                show-count
                :max-length="250"
                resize="none"
            />
        </lew-form-item>
        <lew-form-item direction="y" title="家地址">
            <LewSelect v-model="user.home" :options="home_options" />
        </lew-form-item>

        <lew-form-item direction="y" title="生日">
            <lew-date-picker
                v-model="d"
                style="width: 100%"
                auto-close
            ></lew-date-picker>
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
        <lew-form-item direction="y" title="标签输入框">
            <lew-input-tag v-model="user.tags" />
        </lew-form-item>
        <lew-form-item direction="y" title="爱好">
            <lew-tabs
                width="100%"
                item-width="100%"
                v-model="user.pay"
                :options="pay_options"
            />
        </lew-form-item>
    </div>
</template>
<style scoped lang="scss">
.form-box {
    width: 350px;
    margin: 50px auto;
}
@media (max-width: 767px) {
    .form-box {
        width: 100%;
    }
}
</style>
