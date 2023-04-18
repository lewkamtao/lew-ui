<script setup lang="ts">
import type { CSSProperties } from 'vue';

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

const isShowCode = ref(false);

const style = computed<CSSProperties>(() => {
    if (isShowCode.value) {
        return { maxHeight: `400px` };
    }
    return { maxHeight: 0 };
});
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
            <div class="demo-cp">
                <slot></slot>
            </div>
            <div v-show="code" v-highlight class="hl-pre" :style="style">
                <div class="pre-box">
                    <pre><code>{{ code }}</code></pre>
                </div>
            </div>
            <div class="show-bar" @click="isShowCode = !isShowCode">
                <div class="icon">
                    <lew-icon
                        v-if="!isShowCode"
                        size="16"
                        type="chevron-down"
                    />
                    <lew-icon v-else size="16" type="chevron-up" />
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
        overflow: hidden;
    }

    .hl-pre {
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;

        .pre-box {
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
        font-size: 14px;
        cursor: pointer;
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

    @media (max-width: 767px) {
        .demo-cp {
            overflow-x: auto;
        }
    }
}
</style>
