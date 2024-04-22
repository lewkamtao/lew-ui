<script setup lang="ts">
    import {
        DemoTreeSelect1,
        DemoTreeSelect2,
        DemoTreeSelect3,
        DemoTreeSelect4,
        DemoTreeSelect5,
        DemoTreeSelect6,
        DemoTreeSelect7,
        DemoTreeSelect8,
        DemoTreeSelect1Code,
        DemoTreeSelect2Code,
        DemoTreeSelect3Code,
        DemoTreeSelect4Code,
        DemoTreeSelect5Code,
        DemoTreeSelect6Code,
        DemoTreeSelect7Code,
        DemoTreeSelect8Code
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
        <lew-title>TreeSelect</lew-title>
        <lew-demo-box title="常规" :code="DemoTreeSelect1Code">
            <demo-tree-select1 />
        </lew-demo-box>
        <lew-demo-box title="异步加载数据" :code="DemoTreeSelect2Code">
            <demo-tree-select2 />
        </lew-demo-box>
        <lew-demo-box title="自定义插槽" :code="DemoTreeSelect3Code">
            <demo-tree-select3 />
        </lew-demo-box>
        <lew-demo-box title="禁用项" :code="DemoTreeSelect4Code">
            <demo-tree-select4 />
        </lew-demo-box>
        <lew-demo-box title="异步加载数据" :code="DemoTreeSelect5Code">
            <demo-tree-select5 />
        </lew-demo-box>
        <lew-demo-box title="空状态插槽" :code="DemoTreeSelect6Code">
            <demo-tree-select6 />
        </lew-demo-box>
        <lew-demo-box title="自定义字段" :code="DemoTreeSelect7Code">
            <demo-tree-select7 />
        </lew-demo-box>
        <lew-demo-box title="其他" :code="DemoTreeSelect8Code">
            <demo-tree-select8 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>
