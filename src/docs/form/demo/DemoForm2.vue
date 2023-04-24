<script setup lang="ts">
import * as Yup from 'yup';

const formSchema = {
    fields: [
        {
            label: '姓名',
            name: 'username',
            as: 'LewInput',
            rules: Yup.string().required(),
        },
        {
            label: '密码',
            name: 'password',
            as: 'LewInput',
            type: 'password',
            rules: Yup.string().min(6).required(),
        },
    ],
};

const sex_options = ref([
    { label: '未知', value: '0' },
    { label: '男', value: '1' },
    { label: '女', value: '2' },
]);

const pay_options = ref([
    { label: '微信', value: '1' },
    { label: '支付宝', value: '2' },
    { label: 'Apple Pay', value: '3' },
]);
const hobby_options = ref([
    { label: '唱歌', value: '1' },
    { label: '跳', value: '2' },
    { label: 'rap', value: '3' },
    { label: '打篮球', value: '44' },
]);
const home_options = ref([
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
const d = ref('');
</script>

<template>
    <lew-form class="form-box" :schema="formSchema" :label-width="70" />
</template>
<style scoped lang="scss">
.form-box {
    width: 380px;
}
@media (max-width: 767px) {
    .form-box {
        width: 100%;
    }
}
</style>
