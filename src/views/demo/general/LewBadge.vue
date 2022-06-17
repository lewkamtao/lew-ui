<script setup lang="ts">
import { LewTitle, LewBadge } from '../../../components';
</script>

<template>
    <div class="main">
        <LewTitle>Badge</LewTitle>
        <div>
            <LewTitle size="16px">普通</LewTitle>
            <LewBadge type="primary">
                <svg
                    style="width: 12px; width: 12px"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    class="arco-icon arco-icon-github"
                    stroke-width="4"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                >
                    <path
                        d="M.056 24.618c0 10.454 6.7 19.344 16.038 22.608 1.259.32 1.067-.582 1.067-1.19v-4.148c-7.265.853-7.553-3.957-8.043-4.758-.987-1.686-3.312-2.112-2.62-2.912 1.654-.853 3.34.213 5.291 3.1 1.413 2.09 4.166 1.738 5.562 1.385a6.777 6.777 0 0 1 1.856-3.253C11.687 34.112 8.55 29.519 8.55 24.057c0-2.646.874-5.082 2.586-7.045-1.088-3.243.102-6.01.26-6.422 3.11-.282 6.337 2.225 6.587 2.421 1.766-.474 3.782-.73 6.038-.73 2.266 0 4.293.26 6.069.74.603-.458 3.6-2.608 6.49-2.345.155.41 1.317 3.12.294 6.315 1.734 1.968 2.62 4.422 2.62 7.077 0 5.472-3.158 10.07-10.699 11.397a6.82 6.82 0 0 1 2.037 4.875v6.02c.042.48 0 .96.806.96 9.477-3.194 16.299-12.15 16.299-22.697C47.938 11.396 37.218.68 23.996.68 10.77.675.055 11.391.055 24.617l.001.001Z"
                        fill="currentColor"
                        stroke="none"
                    ></path>
                </svg>
                primary</LewBadge
            >
            <LewBadge type="success">success</LewBadge>
            <LewBadge type="danger">danger</LewBadge>
            <LewBadge type="warning">waning</LewBadge>
            <LewBadge type="normal">normal</LewBadge>
            <LewBadge type="normal">方的</LewBadge>
        </div>

        <div>
            <LewTitle size="16px">圆形</LewTitle>
            <LewBadge round type="primary">primary</LewBadge>
            <LewBadge round type="success">success</LewBadge>
            <LewBadge round type="danger">danger</LewBadge>
            <LewBadge round type="warning">waning</LewBadge>
            <LewBadge round type="normal">normal</LewBadge>

            <LewBadge round type="normal">圆的</LewBadge>
        </div>

        <div>
            <LewTitle size="16px">粗的</LewTitle>
            <LewBadge round bold type="primary">primary</LewBadge>
            <LewBadge round bold type="success">success</LewBadge>
            <LewBadge round bold type="danger">danger</LewBadge>
            <LewBadge round bold type="warning">waning</LewBadge>
            <LewBadge round bold type="normal">normal</LewBadge>
            <LewBadge round bold type="normal">圆的</LewBadge>
        </div>

        <div>
            <LewTitle size="16px">链接</LewTitle>
            <LewBadge round type="primary" href="/button">BUTTON</LewBadge>
            <LewBadge round type="normal" href="https://vuejs.org/"
                >Vue</LewBadge
            >
        </div>

        <div>
            <LewTitle size="16px">数字</LewTitle>
            <LewBadge round type="normal">99+</LewBadge>
            <LewBadge round type="primary">999+</LewBadge>
            <LewBadge round type="success">25</LewBadge>
            <LewBadge round type="warning">30</LewBadge>
            <LewBadge round type="danger">2</LewBadge>
        </div>

        <div>
            <LewTitle size="16px">点</LewTitle>
            <LewBadge round dot type="normal"></LewBadge>
            <LewBadge round dot type="primary"></LewBadge>
            <LewBadge round dot type="success"></LewBadge>
            <LewBadge round dot type="warning"></LewBadge>
            <LewBadge round dot type="danger"></LewBadge>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin: 0 auto;
    > div {
        margin-bottom: 40px;
    }
}
</style>
