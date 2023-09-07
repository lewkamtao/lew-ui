<script setup lang="ts">
import * as Yup from 'yup';

const form = ref({} as any);

const options = ref([
    {
        field: 'name', // 字段名
        label: '姓名', // 标签
        as: 'input', // 组件
        value: '',
        rules: Yup.string()
            .matches(/^[a-zA-Z]+$/, '必须为纯英文字母')
            .min(4, '长度必须至少为4')
            .max(16, '长度不能超过16')
            .required('不能为空'), // 校验规则
        props: {
            // 组件props
            clearable: true,
        },
    },
    {
        field: 'remark', // 字段名
        label: '备注', // 标签
        as: 'input', // 组件
        rules: Yup.string()
            .matches(/^[a-zA-Z]+$/, '必须为纯英文字母')
            .min(4, '长度必须至少为4')
            .max(16, '长度不能超过16')
            .required('不能为空'), // 校验规则
        props: {
            clearable: true,
        },
    },
    {
        field: 'intro',
        label: '介绍',
        as: 'input',
        rules: Yup.string()
            .matches(/^[\u4e00-\u9fa5]+$/, '必须为纯中文')
            .min(30, '长度必须至少为30')
            .max(300, '长度不能超过8')
            .required('不能为空'),
        props: {
            type: 'textarea',
            clearable: true,
        },
    },
    {
        field: 'birth',
        label: '生日',
        value: '2023-01-12',
        as: 'date-picker',
        rules: Yup.string().required('不能为空'),
        props: {
            clearable: true,
        },
    },
    {
        field: 'date.birth',
        label: '有效期',
        value: {
            start: '2012-11-12',
            end: '2012-12-12',
        },
        as: 'date-range-picker',
        rules: Yup.object()
            .shape({
                start: Yup.string().required(),
                end: Yup.string().required(),
            })
            .required('不能为空'),
        props: {
            clearable: true,
        },
    },
    {
        field: 'user.avatar',
        label: '头像',
        as: 'select',
        rules: Yup.string().required('此项必填'),
        props: {
            change: (e: any) => {
                console.log(e);
            },
            clearable: true,
            options: [
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
            ],
        },
    },
    {
        field: 'user.addd',
        label: '',
        as: 'checkbox',
        rules: Yup.boolean().oneOf([true], '请同意').required('请同意'),
        props: {
            label: '是否同意',
        },
    },
    {
        as: 'button',
        props: {
            text: '提交',
            click: () => submit(),
        },
    },
]);

const formRef = ref();

const submit = () => {
    formRef.value.validate().then((res: any) => {
        console.log(res);
    });
};
</script>

<template>
    <lew-flex x="start" y="start" :gap="50">
        <lew-form
            ref="formRef"
            v-model="form"
            direction="y"
            class="form-box"
            :options="options"
            :label-width="80"
        />
        <lew-flex style="width: calc(100% - 380px)" direction="y" x="start">
            <lew-button text="获取form" @click="form = formRef.getForm()" />
            <pre>{{ form }}</pre>
            <pre
                >{{
                    options.map((e: any) => {
                        return {
                            field: e.field,
                            errMessage: e?.errMessage || undefined,
                        };
                    })
                }} 
            </pre>
        </lew-flex>
    </lew-flex>
</template>
<style scoped lang="scss">
.form-box {
    width: 380px;
}
pre {
    background-color: var(--lew-bgcolor-2);
    padding: 30px;
}
@media (max-width: 767px) {
    .form-box {
        width: 100%;
    }
}
</style>
