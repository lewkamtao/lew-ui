<script setup lang="ts">
import * as Yup from 'yup';

const form = ref({});
const options = ref([
    {
        field: 'username',
        label: '用户名',
        component: 'lew-input',
        rules: Yup.string().required(),
        props: {},
    },
    {
        field: 'password',
        label: '密码',
        component: 'lew-input',
        rules: Yup.string().min(6).required(),
        props: {
            type: 'password',
        },
    },
]);
</script>

<template>
    <lew-form
        class="form-box"
        v-model="form"
        :options="options"
        :label-width="80"
    />
</template>
<style scoped lang="scss">
.form-box {
    width: 380px;
    margin: 0 auto;
}
@media (max-width: 767px) {
    .form-box {
        width: 100%;
    }
}
</style>
