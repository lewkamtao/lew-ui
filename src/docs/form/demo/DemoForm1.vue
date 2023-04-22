<script setup lang="ts">
const user = ref({
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
    <lew-form class="form-box" label-width="70px">
        <lew-form-item label="账号">
            <LewInput v-model="user.username" />
        </lew-form-item>
        <lew-form-item label="密码">
            <LewInput v-model="user.password" />
        </lew-form-item>
        <lew-form-item label="简介">
            <LewInput
                v-model="user.intro"
                type="textarea"
                show-count
                :max-length="250"
                resize="none"
            />
        </lew-form-item>
        <lew-form-item label="家地址">
            <LewSelect v-model="user.home" :options="home_options" />
        </lew-form-item>

        <lew-form-item label="生日">
            <lew-date-picker
                v-model="d"
                style="width: 100%"
                auto-close
            ></lew-date-picker>
        </lew-form-item>

        <lew-form-item label="性别">
            <lew-radio-group v-model="user.sex" :options="sex_options" />
        </lew-form-item>
        <lew-form-item label="爱好">
            <lew-checkbox-group v-model="user.hobby" :options="hobby_options" />
        </lew-form-item>

        <lew-form-item label="标签输入框">
            <lew-input-tag v-model="user.tags" />
        </lew-form-item>
        <lew-form-item label="支付方式">
            <lew-tabs
                v-model="user.pay"
                width="100%"
                :options="pay_options"
                round
            />
        </lew-form-item>
    </lew-form>

    <br />
    <br />
    <br />

    <lew-form class="form-box">
        <lew-form-item direction="y" label="账号">
            <LewInput v-model="user.username" />
        </lew-form-item>
        <lew-form-item direction="y" label="密码">
            <LewInput v-model="user.password" />
        </lew-form-item>
        <lew-form-item direction="y" label="简介">
            <LewInput
                v-model="user.intro"
                type="textarea"
                show-count
                :max-length="250"
                resize="none"
            />
        </lew-form-item>
        <lew-form-item direction="y" label="家地址">
            <LewSelect v-model="user.home" :options="home_options" />
        </lew-form-item>

        <lew-form-item direction="y" label="生日">
            <lew-date-picker
                v-model="d"
                style="width: 100%"
                auto-close
            ></lew-date-picker>
        </lew-form-item>

        <lew-form-item direction="y" label="性别">
            <lew-radio-group v-model="user.sex" :options="sex_options" />
        </lew-form-item>
        <lew-form-item direction="y" label="爱好">
            <lew-checkbox-group v-model="user.hobby" :options="hobby_options" />
        </lew-form-item>

        <lew-form-item direction="y" label="标签输入框">
            <lew-input-tag v-model="user.tags" />
        </lew-form-item>
        <lew-form-item direction="y" label="支付方式">
            <lew-tabs
                v-model="user.pay"
                width="100%"
                :options="pay_options"
            />
        </lew-form-item>
    </lew-form>
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
