<script setup lang="ts">
    import {
        DemoSelect1,
        DemoSelect1Code,
        DemoSelect2,
        DemoSelect2Code,
        DemoSelect3,
        DemoSelect3Code,
        DemoSelect5,
        DemoSelect5Code,
        DemoSelect6,
        DemoSelect6Code
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
        <lew-title>Select</lew-title>
        <p class="sub-title"> 一个自带搜索的、支持异步请求、支持虚拟列表、支持插槽的选择器 </p>
        <lew-demo-box title="常规" :code="DemoSelect1Code">
            <demo-select1 />
        </lew-demo-box>
        <lew-demo-box title="触发方式" :code="DemoSelect2Code">
            <demo-select2 />
        </lew-demo-box>
        <lew-demo-box title="支持搜索" :code="DemoSelect3Code">
            <demo-select3 />
        </lew-demo-box>
        <!-- <lew-demo-box title="插槽" :code="DemoSelect4Code">
            <demo-select4 />
        </lew-demo-box> -->
        <lew-demo-box title="禁用项" :code="DemoSelect5Code">
            <demo-select5 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoSelect6Code">
            <demo-select6 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
