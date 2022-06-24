<script setup lang="ts">
import {
    DemoPopok1,
    DemoPopok2,
    DemoPopok1_code,
    DemoPopok2_code,
} from '../../demo';
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popok</lew-title>
        <lew-demo-box title="简单的询问" badge="click" :code="DemoPopok1_code">
            <demo-popok1> </demo-popok1>
        </lew-demo-box>

        <lew-demo-box title="简单的询问" badge="hover" :code="DemoPopok2_code">
            <demo-popok2> </demo-popok2>
        </lew-demo-box>
    </div>
</template>
