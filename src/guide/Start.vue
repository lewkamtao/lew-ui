<script setup lang="ts">
const pre1 = ref(`<script setup>
  import { LewButton } from 'lew-ui'
<\/script>`);
const pre2 = ref(`import "lew-ui/style";`);
const pre3 = ref(`import { createApp } from 'vue'
import Lew from "lew-ui";
import "lew-ui/style";

const app = createApp(App);
app.use(Lew);`);
</script>

<template>
    <div class="guide-wrapper">
        <lew-title>如何使用</lew-title>
        <br />
        <lew-title :size="16">直接引入（推荐）</lew-title>
        <p>你可以在页面中直接导入</p>
        <div v-highlight class="hl-pre lew-scrollbar">
            <div class="pre-box">
                <pre><code v-text="pre1"></code></pre>
            </div>
        </div>
        <br />
        <p>
            但，你别忘了还要在
            <lew-mark>main.ts</lew-mark> 引入样式
        </p>
        <div v-highlight class="hl-pre lew-scrollbar">
            <div class="pre-box">
                <pre><code v-text="pre2"></code></pre>
            </div>
        </div>

        <br />
        <br />
        <lew-title :size="16">全局安装（不推荐）</lew-title>
        <p>
            你需要在
            <lew-mark>main.ts</lew-mark
            >全局安装，这样你就可以在页面内使用全部组件。
        </p>
        <div v-highlight class="hl-pre lew-scrollbar">
            <div class="pre-box">
                <pre><code v-text="pre3"></code></pre>
            </div>
        </div>
    </div>
</template>
