<script setup lang="ts">
const pre1 = ref(`import { LewTooltip } from 'lew-ui';

app.use(LewTooltip);`)
const pre2 = ref(`import { LewDialog, LewMessage } from 'lew-ui';

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
};`)
</script>

<template>
  <div class="guide-wrapper">
    <lew-title>Q&A</lew-title>
    <br>
    <br>
    <lew-title :size="16">
      如何使用 Tooltips
    </lew-title>
    <p>
      tooltips 是一个自定义指令，你需要在
      <lew-mark>main.ts</lew-mark> 注册该指令
    </p>

    <div v-highlight class="hl-pre">
      <div class="pre-box">
        <pre><code v-text="pre1" /></pre>
      </div>
    </div>
    <br>
    <br>
    <lew-title :size="16">
      关于 Dialog 和 Message 的用法
    </lew-title>
    <p>如果你使用的方式不是全局引入，你需要引入它们才能使用</p>
    <div v-highlight class="hl-pre">
      <div class="pre-box">
        <pre><code v-text="pre2" /></pre>
      </div>
    </div>
  </div>
</template>
