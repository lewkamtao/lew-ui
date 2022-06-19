<script setup lang="ts">
import { ref } from 'vue';
import DemoBox from '../../../components/demo/DemoBox.vue';
import { LewTitle, LewTabs } from '../../../components';

const options = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '5' },
]);

let value = ref('');

type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const change = (e: Options) => {
    console.log(e);
};

let pre1 = ref(`<script setup lang="ts">
import { ref } from 'vue';
import { LewTabs } from '../../../components';

const options = ref([
    { label: '北京', value: '1' },
    { label: '上海', value: '2' },
    { label: '广州', value: '3' },
    { label: '深圳', value: '4' },
    { label: '乌鲁木齐', value: '5' },
]);

let value = ref('');

type Options = {
    label: string;
    value: string;
    activeIndex: number;
};

const change = (e: Options) => {
    console.log(e);
};
<\/script>

<template>
    <div style="width: 450px">
        <lew-tabs
            v-model="value"
            :options="options"
            @update:change="change"
        ></lew-tabs>
    </div>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Tabs</lew-title>
        <demo-box title="常规" :code="pre1">
            <div style="width: 450px">
                <lew-tabs
                    v-model="value"
                    :options="options"
                    @update:change="change"
                ></lew-tabs></div
        ></demo-box>
    </div>
</template>
