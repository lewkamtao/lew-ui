<script setup lang="ts">
import { LewTitle, LewBadge } from '../../components';
import { ref } from 'vue';
defineProps({
    title: {
        type: String,
        default() {
            return '';
        },
    },
    badge: {
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
            <lew-badge style="margin: 2px 0px 0px 5px" v-if="badge">{{
                badge
            }}</lew-badge>
        </lew-title>
        <div class="demo-item">
            <div class="demo-cp"><slot></slot></div>
            <div v-show="isShowCode" v-highlight class="hl-pre">
                <div class="pre-box">
                    <pre><code v-text="code"></code></pre>
                </div>
            </div>
            <div class="show-bar" @click="isShowCode = !isShowCode">
                <svg
                    v-show="!isShowCode"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="square"
                        stroke-miterlimit="10"
                        stroke-width="48"
                        d="M112 184l144 144l144-144"
                    ></path>
                </svg>

                <svg
                    v-show="isShowCode"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="48"
                        d="M112 328l144-144l144 144"
                    ></path>
                </svg>
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
        background-color: #fff;
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
    }
    .hl-pre {
        position: relative;
        .pre-box {
            margin-top: 10px;
            border-radius: 8px;
        }
    }
    .show-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 2px rgb(236, 236, 236) solid;
        width: 100%;
        height: 30px;
        border-radius:0px 0px 8px 8px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.15s;
        svg {
            width: 18px;
            height: 18px;
            font-size: 15px;
            margin-right: 10px;
        }
    }
    .show-bar:hover {
        background-color: rgb(244, 244, 244);
    }
    .show-bar:active {
        background-color: rgb(236, 236, 236);
    }
    .demo-cp {
        padding: 30px;
    }
}
</style>
