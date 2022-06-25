<script setup lang="ts">
import { DemoPopover1, DemoPopover1_code } from './demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popover</lew-title>

        <lew-demo-box
            title="询问校验"
            badge="自定义 HTML"
            :code="DemoPopover1_code"
        >
            <demo-popover1></demo-popover1>
        </lew-demo-box>
    </div>
</template>
