<script setup lang="ts">
import { DemoPopok1, DemoPopok2 } from '../../demo';
import { ref } from 'vue';
let pre1 = ref(``);
let pre2 = ref(``);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Popok</lew-title>
        <lew-demo-box title="简单的询问" badge="click" :code="pre1">
            <demo-popok1> </demo-popok1>
        </lew-demo-box>

        <lew-demo-box title="简单的询问" badge="hover" :code="pre2">
            <demo-popok2> </demo-popok2>
        </lew-demo-box>
    </div>
</template>
