<script setup lang="ts">
import {
    DemoFlex1,
    DemoFlex1_code,
    DemoFlex2,
    DemoFlex2_code,
    DemoFlex3,
    DemoFlex3_code,
} from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Flex</lew-title>
        <lew-demo-box title="row" :code="DemoFlex1_code">
            <demo-flex1 />
        </lew-demo-box>
        <lew-demo-box title="column" :code="DemoFlex2_code">
            <demo-flex2 />
        </lew-demo-box>
        <lew-demo-box title="mode" :code="DemoFlex3_code">
            <demo-flex3 />
        </lew-demo-box>
    </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
    margin: 10px;
}
</style>
