<script setup lang="ts">
import * as Yup from 'yup';
import { schools } from '../../select/demo/schools';

let schoolsOptions = schools.map((e, i) => {
    return { label: e, value: i + 1 };
});
const form = ref({} as any);

const options = ref([
    {
        label: '表单大小',
        as: 'lew-tabs',
        field: 'size',
        props: {
            itemWidth: 'auto',
            width: '100%',
            options: [
                {
                    label: 'small',
                    value: 'small',
                },
                {
                    label: 'medium',
                    value: 'medium',
                },
                {
                    label: 'large',
                    value: 'large',
                },
            ],
        },
    },
    {
        field: 'input', // 字段名
        label: '文本框', // 标签
        as: 'lew-input', // 组件
        rules: Yup.string().required('不能为空'), // 校验规则
        props: {
            // 组件props
            clearable: true,
        },
    },
    {
        field: 'textarea', // 字段名
        label: '多行文本框', // 标签
        as: 'lew-textarea', // 组件
        rules: Yup.string().required('不能为空'), // 校验规则
        props: {
            clearable: true,
            showCount: true,
            maxLength: 300,
        },
    },
    {
        field: 'select',
        label: '单选选择器',
        as: 'lew-select',
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
        field: 'select_multiple',
        label: '多选选择器',
        as: 'lew-select-multiple',
        rules: Yup.array().min(1, '至少选择一个').required('此项必填'),
        props: {
            change: (e: any) => {
                console.log(e);
            },
            clearable: true,
            options: schoolsOptions,
        },
    },
    {
        field: 'radio_group',
        label: '单选框',
        as: 'lew-radio-group',
        rules: Yup.string().required('此项必填'),
        props: {
            options: [
                {
                    label: '男',
                    value: '1',
                },
                {
                    label: '女',
                    value: '2',
                },
                {
                    label: '不公开',
                    value: '3',
                },
            ],
        },
    },
    {
        field: 'checkbox_group',
        label: '多选框',
        as: 'lew-checkbox-group',
        rules: Yup.array().min(1, '至少选择一个').required('此项必填'),
        props: {
            options: [
                {
                    label: '唱歌',
                    value: '1',
                },
                {
                    label: '跳舞',
                    value: '2',
                },
                {
                    label: 'Rap',
                    value: '3',
                },
                {
                    label: '上海',
                    value: '4',
                },
            ],
        },
    },
    {
        field: 'tabs',
        label: '选项卡',
        as: 'lew-tabs',
        rules: Yup.string().required('此项必填'),
        props: {
            options: [
                {
                    label: 'Beijing',
                    value: '1',
                },
                {
                    label: 'Shanghai',
                    value: '2',
                },
                {
                    label: 'Guangzhou',
                    value: '3',
                },
                {
                    label: 'Shenzhen',
                    value: '4',
                },
            ],
        },
    },
    {
        field: 'user.addd',
        label: '',
        as: 'lew-checkbox',
        rules: Yup.boolean().oneOf([true], '请同意').required('请同意'),
        props: {
            label: '是否同意',
        },
    },
    {
        field: 'info.input_tag',
        label: '标签输入框',
        as: 'lew-input-tag',
        rules: Yup.array().min(1, '至少选择一个').required('不能为空'),
        props: {
            clearable: true,
        },
    },
    {
        as: 'lew-button',
        props: {
            text: '提交',
            click: () => submit(),
        },
    },
]);

let formRef = ref();

const submit = () => {
    formRef.value.validate();
};
</script>

<template>
    <lew-flex x="start" y="start" :gap="50">
        <lew-form
            ref="formRef"
            :size="form.size"
            class="form-box"
            v-model="form"
            :options="options"
            :label-width="80"
        />
        <pre>{{ form }}</pre>
    </lew-flex>
</template>
<style scoped lang="scss">
.form-box {
    width: 380px;
    flex-shrink: 0;
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
