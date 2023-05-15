<script setup lang="ts">
import {
    DemoMagicText1,
    DemoMagicText1_code,
    DemoMagicText2,
    DemoMagicText2_code,
    DemoMagicText3,
    DemoMagicText3_code,
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
        <lew-title>MagicText</lew-title>
        <p class="sub-title">
            这是一个参考（tou）<lew-mark
                to="https://www.naiveui.com/zh-CN/os-theme/components/gradient-text"
                >Naive-UI</lew-mark
            >的 Gradient Text 设计的组件，不能说是模仿，只能说一模一样。
        </p>
        <lew-demo-box title="任意值" :code="DemoMagicText1_code">
            <demo-magic-text1 />
        </lew-demo-box>
        <lew-demo-box title="自增" :code="DemoMagicText2_code">
            <demo-magic-text2 />
        </lew-demo-box>
        <lew-demo-box title="天然支持千分位" :code="DemoMagicText3_code">
            <demo-magic-text3 />
        </lew-demo-box>
        <lew-docs-tables :options="options"></lew-docs-tables>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
