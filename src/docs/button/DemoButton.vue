<script setup lang="ts">
import {
    DemoButton1,
    DemoButton2,
    DemoButton3,
    DemoButton4,
    DemoButton5,
    DemoButton1_code,
    DemoButton2_code,
    DemoButton3_code,
    DemoButton4_code,
    DemoButton5_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Button</lew-title>
        <lew-demo-box title="普通" :code="DemoButton1_code"
            ><demo-button1 />
        </lew-demo-box>
        <lew-demo-box title="尺寸" :code="DemoButton2_code"
            ><demo-button2 />
        </lew-demo-box>
        <lew-demo-box title="圆形" :code="DemoButton3_code"
            ><demo-button3 />
        </lew-demo-box>
        <lew-demo-box title="加载" :code="DemoButton4_code"
            ><demo-button4 />
        </lew-demo-box>
        <lew-demo-box title="禁用" :code="DemoButton5_code"
            ><demo-button5 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-button {
    margin: 10px;
}
</style>
