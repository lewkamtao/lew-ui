<script setup lang="ts">
import { ref } from 'vue';
let pre1 = ref(`import { LewTooltip } from 'lew-ui';

app.use(LewTooltip);`);
let pre2 = ref(`import { LewDialog } from 'lew-ui';
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
    <div class="guide-wrapper">
        <lew-title>Q&A</lew-title>
        <br />
        <br />
        <lew-title size="16px">为什么 Tooltips 不起效果？</lew-title>
        <p>
            tooltips 是一个自定义指令，你需要在
            <lew-mark>main.ts</lew-mark> 注册该指令
        </p>

        <div v-highlight class="hl-pre">
            <div class="pre-box">
                <pre><code v-text="pre1"></code></pre>
            </div>
        </div>
        <br />
        <br />
        <lew-title size="16px">关于 Dialog 和 Message 的用法</lew-title>

        <p>
            无论是<lew-mark>按需加载</lew-mark>还是<lew-mark>全局安装</lew-mark>，你都需要在<lew-mark>setup</lew-mark>中引入他们
        </p>

        <div v-highlight class="hl-pre">
            <div class="pre-box">
                <pre><code v-text="pre2"></code></pre>
            </div>
        </div>
    </div>
</template>
