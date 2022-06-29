<script setup lang="ts">
import { DemoDialog1, DemoDialog1_code } from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);
let pre1 = ref(`import { LewDialog } from 'lew-ui';
import { LewMessage } from 'lew-ui';

const open = () => {
    LewDialog.error({
        title: '删除确认',
        content: '删除之后无法恢复，请确定',
        ok: () => {
            LewMessage.info('这是一个demo信息');
        },
        cancel: () => {
            LewMessage.info('已取消');
        },
    });
};`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Dialog</lew-title>
        <p class="sub-title">
            如果你需要更简单的询问框，请可以尝试一下
            <lew-mark type="info" to="/Popok">Popok</lew-mark>
        </p>
        <br />
        <div class="guide-wrapper">
            <p>
                无论是<lew-mark>按需加载</lew-mark>还是<lew-mark>全局安装</lew-mark>，你都需要在<lew-mark>setup</lew-mark>中引入
                LewDialog
            </p>

            <div v-highlight class="hl-pre">
                <div class="pre-box">
                    <pre><code v-text="pre1"></code></pre>
                </div>
            </div>
        </div>
        <lew-demo-box title="快捷唤起" :code="DemoDialog1_code">
            <demo-dialog1>删除</demo-dialog1></lew-demo-box
        >

        <lew-title size="16px">Props</lew-title>
        <vxe-table :data="docsTable">
            <vxe-column
                show-overflow
                field="param"
                width="220px"
                title="参数名"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="description"
                title="描述"
            ></vxe-column>
            <vxe-column
                show-overflow
                width="300"
                field="type"
                title="类型"
            ></vxe-column>
            <vxe-column
                show-overflow
                field="default"
                title="默认值"
            ></vxe-column>
        </vxe-table>
    </div>
</template>
