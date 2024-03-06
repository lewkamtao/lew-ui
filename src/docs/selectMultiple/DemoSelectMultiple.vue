<script setup lang="ts">
import {
    DemoSelectMultiple1,
    DemoSelectMultiple1Code,
    DemoSelectMultiple2,
    DemoSelectMultiple2Code,
    DemoSelectMultiple3,
    DemoSelectMultiple3Code,
    DemoSelectMultiple4,
    DemoSelectMultiple4Code,
    DemoSelectMultiple5,
    DemoSelectMultiple5Code,
    DemoSelectMultiple6,
    DemoSelectMultiple6Code,
} from './demo';
import LewDemoBox from '../../layout/LewDemoBox.vue';
import LewDocsTables from '../../layout/LewDocsTables.vue';
import * as API from './api';

const options = ref(
    Object.keys(API).map((key: any) => {
        // @ts-ignore
        return API[key];
    })
);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>SelectMultiple</lew-title>
        <p class="sub-title">
            或许你需要选择更多，多选选择器和单选选择器的 Props 大同小异。
        </p>
        <lew-demo-box title="常规" :code="DemoSelectMultiple1Code">
            <demo-select-multiple1 />
        </lew-demo-box>
        <lew-demo-box title="触发方式" :code="DemoSelectMultiple2Code">
            <demo-select-multiple2 />
        </lew-demo-box>
        <lew-demo-box title="支持搜索" :code="DemoSelectMultiple3Code">
            <demo-select-multiple3 />
        </lew-demo-box>
        <lew-demo-box title="插槽" :code="DemoSelectMultiple4Code">
            <demo-select-multiple4 />
        </lew-demo-box>
        <lew-demo-box title="禁用项" :code="DemoSelectMultiple5Code">
            <demo-select-multiple5 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoSelectMultiple6Code">
            <demo-select-multiple6 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
