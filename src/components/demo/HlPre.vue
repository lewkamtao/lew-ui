<script setup lang="ts">
import { ref } from 'vue';
import LewButton from '../general/LewButton.vue';
defineProps({
    code: {
        type: String,
        default() {
            return '';
        },
    },
});

let isShow = ref(false);
</script>

<template>
    <div v-highlight class="hl-pre" :class="{ isShow: isShow }">
        <LewButton class="show-btn" @click="isShow = !isShow">
            <svg
                v-show="!isShow"
                style="margin-right: 5px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
            >
                <path
                    d="M160 389a20.91 20.91 0 0 1-13.82-5.2l-128-112a21 21 0 0 1 0-31.6l128-112a21 21 0 0 1 27.66 31.61L63.89 256l109.94 96.19A21 21 0 0 1 160 389z"
                    fill="currentColor"
                ></path>
                <path
                    d="M352 389a21 21 0 0 1-13.84-36.81L448.11 256l-109.94-96.19a21 21 0 0 1 27.66-31.61l128 112a21 21 0 0 1 0 31.6l-128 112A20.89 20.89 0 0 1 352 389z"
                    fill="currentColor"
                ></path>
                <path
                    d="M208 437a21 21 0 0 1-20.12-27l96-320a21 21 0 1 1 40.23 12l-96 320A21 21 0 0 1 208 437z"
                    fill="currentColor"
                ></path>
            </svg>

            <svg
                v-show="isShow"
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
            {{ isShow ? '关闭代码' : '查看代码' }}
        </LewButton>
        <div class="pre-box">
            <pre><code v-text="code"></code></pre>
        </div>
    </div>
</template>

<style lang="scss">
.hl-pre {
    position: relative;
    margin: 10px 0px 100px 0px;

    .show-btn {
        width: 100px;
        height: 30px;
    }

    .pre-box {
        margin-top: 10px;
        max-height: 0px;
        overflow: hidden;
        border-radius: 4px;
    }
}

.isShow {
    .pre-box {
        max-height: 2500px;
    }
}
.isShow::after {
    background: rgba(0, 0, 0, 0);
    content: '';
    z-index: -1;
}
</style>
