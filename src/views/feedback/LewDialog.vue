<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle } from '../../../packages';
import DemoDialog1 from '../../demo/feedback/dialog/DemoDialog1.vue';
import DemoBox from '../../layout/DemoBox.vue';

let pre1 = ref(`<script setup lang="ts">
import { LewButton, LewDialog } from '../../../../packages';

const open = () => {
    LewDialog.warning({
        title: '删除确认',
        content: '删除之后无法恢复，请确定',
        ok: () => {
            console.log('确定');
        },
        cancel: () => {
            console.log('取消');
        },
    });
};
<\/script> 

<template>
    <lew-button @click="open">删除</lew-button>
</template>
`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <demo-box title="快捷唤起" :code="pre1">
            <demo-dialog-1>删除</demo-dialog-1></demo-box
        >
    </div>
</template>
