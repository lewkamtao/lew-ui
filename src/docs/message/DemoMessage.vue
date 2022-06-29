<script setup lang="ts">
import { DemoMessage1, DemoMessage1_code } from './demo';
import { ref } from 'vue';

const docsTable = ref([
    {
        param: 'options',
        description: '列表配置',
        type: 'array',
        default: '[]',
    },
]);

let pre1 = ref(`import { LewMessage } from 'lew-ui';

const open = () => {
    LewMessage.info('这是一个demo信息');
};`);
</script>

<template>
    <div class="demo-wrapper">
        <lew-title>Message</lew-title>
        <div class="guide-wrapper">
            <p>
                无论是<lew-mark>按需加载</lew-mark>还是<lew-mark>全局安装</lew-mark>，你都需要在<lew-mark>setup</lew-mark>中引入
                LewMessage
            </p>

            <div v-highlight class="hl-pre">
                <div class="pre-box">
                    <pre><code v-text="pre1"></code></pre>
                </div>
            </div>
        </div>
        <lew-demo-box title="快捷唤起" :code="DemoMessage1_code">
            <demo-message1>删除</demo-message1></lew-demo-box
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
