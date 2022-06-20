<script setup lang="ts">
import { ref } from 'vue';
import DemoBox from '../../layout/DemoBox.vue';
import { LewTitle, LewFormItem, LewSelect } from '../../../packages';

let value = ref('');

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

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewFormItem, LewSelect } from '../../../packages';

let value = ref('');

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
<\/script>

<template>
    <lew-form-item direction="y" title="选择城市">
        <div style="width: 350px">
            <LewSelect v-model="value" :options="options"></LewSelect></div
    ></lew-form-item>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Select</lew-title>
        <demo-box title="选择器" :code="pre1">
            <lew-form-item direction="y" title="选择城市">
                <div style="width: 350px">
                    <LewSelect
                        v-model="value"
                        :options="options"
                    ></LewSelect></div
            ></lew-form-item>
        </demo-box>
    </div>
</template>
