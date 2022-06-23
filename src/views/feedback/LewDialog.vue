<script setup lang="ts">
import { ref } from 'vue';
import { LewTitle } from '../../../packages';
import DemoDialog1 from '../../demo/feedback/dialog/DemoDialog1.vue';
import DemoBox from '../../layout/DemoBox.vue';

let pre1 = ref(`<script setup lang="ts">
import { LewButton, LewDialog } from '../../../../packages';

const open = (type: string) => {
    LewDialog[type]({
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
    <lew-button type="normal" @click="open('normal')">normal</lew-button>
    <lew-button type="success" @click="open('success')">success</lew-button>
    <lew-button type="info" @click="open('info')">info</lew-button
    ><lew-button type="warning" @click="open('warning')">warning</lew-button>
    <lew-button type="error" @click="open('error')">error</lew-button>
</template>

<style lang="scss" scoped>
.lew-button {
    margin-right: 20px;
}
</style>
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
