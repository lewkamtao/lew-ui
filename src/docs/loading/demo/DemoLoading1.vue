<script setup lang="ts">
    import * as Yup from 'yup';

    const visible = ref(false);
    const tip = ref('加载中');
    const form = ref({});
    const options = ref([
        {
            field: 'username',
            label: '用户名',
            as: 'input',
            rules: Yup.string().required()
        },
        {
            field: 'password',
            label: '密码',
            as: 'input',
            rules: Yup.string().min(6).required(),
            props: {
                type: 'password'
            }
        }
    ]);
</script>

<template>
    <div style="width: 300px">
        <lew-title :size="14">常规</lew-title>
        <lew-flex
            v-loading="{ visible: true }"
            direction="y"
            style="padding: 20px; box-shadow: var(--lew-box-shadow)"
        >
            <lew-title :bold="700" style="margin-bottom: 20px">登录你的账户 </lew-title>
            <lew-form
                v-model="form"
                direction="y"
                class="form-box"
                :options="options"
                :label-width="80"
            />
            <lew-flex x="end">
                <lew-button type="text" text="关闭" color="normal" />
                <lew-button text="立即登录" />
            </lew-flex>
        </lew-flex>
        <br />
        <br />
        <br />
        <lew-title :size="14">自定义文字</lew-title>

        <lew-flex
            v-loading="{ visible: visible, tip: tip }"
            direction="y"
            style="margin-bottom: 20px; box-shadow: var(--lew-box-shadow); padding: 20px"
        >
            <lew-title :bold="700" style="margin-bottom: 20px">登录你的账户 </lew-title>
            <lew-form
                v-model="form"
                direction="y"
                class="form-box"
                :options="options"
                :label-width="80"
            />

            <lew-flex x="end">
                <lew-button text="关闭" type="text" color="normal" />
                <lew-button text="立即登录" @click="visible = true" />
            </lew-flex>
        </lew-flex>
        <br />
        <lew-button text="触发" @click="visible = !visible" />
    </div>
</template>
