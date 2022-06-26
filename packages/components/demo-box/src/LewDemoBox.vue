<script setup lang="ts">
import { ChevronUp24Regular, Code24Regular } from '@vicons/fluent';
import { Icon } from '@vicons/utils';
import { ref } from 'vue';
defineProps({
    title: {
        type: String,
        default() {
            return '';
        },
    },
    tag: {
        type: String,
        default() {
            return '';
        },
    },
    code: {
        type: String,
        default() {
            return '';
        },
    },
});

let isShowCode = ref(false);
</script>

<template>
    <div class="demo-box">
        <lew-title size="16px"
            >{{ title }}
            <lew-tag v-if="tag" type="info" style="margin: 2px 0px 0px 5px">
                {{ tag }}</lew-tag
            >
        </lew-title>
        <div class="demo-item">
            <div class="demo-cp"><slot></slot></div>
            <div v-show="isShowCode" v-highlight class="hl-pre">
                <div class="pre-box">
                    <pre><code v-text="code"></code></pre>
                </div>
            </div>
            <div class="show-bar" @click="isShowCode = !isShowCode">
                <div class="icon">
                    <Icon v-if="!isShowCode" size="20">
                        <Code24Regular />
                    </Icon>
                    <Icon v-if="isShowCode" size="20">
                        <ChevronUp24Regular />
                    </Icon>
                </div>

                {{ isShowCode ? '关闭' : '显示源码' }}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.demo-box {
    margin: 50px 0px 50px 0px;

    .demo-item {
        margin: 10px 0px;
        background-color: var(--lew-bgcolor-0);
        border-radius: var(--lew-border-radius);
        border: var(--lew-border-1);
    }
    .hl-pre {
        position: relative;
        .pre-box {
            margin-top: 10px;
            border-radius: var(--lew-border-radius);
        }
    }
    .show-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: var(--lew-border-1);
        width: 100%;
        height: 30px;
        border-radius: 0px 0px var(--lew-border-radius) var(--lew-border-radius);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.25s;
        color: #999;
        background-color: var(--lew-bgcolor-0);
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }
    }
    .show-bar:hover {
        background-color: var(--lew-bgcolor-3);
        color: var(--lew-text-color-3);
    }

    .demo-cp {
        padding: 30px;
    }
}
</style>
