<script lang="ts" setup>
import { _props } from './props';
defineProps(_props);
</script>

<template>
    <lew-flex x="start" y="start" class="lew-comment">
        <div class="avatar">
            <slot name="avatar"> </slot>
        </div>
        <lew-flex
            direction="y"
            gap="0px"
            x="start"
            class="lew-comment-body"
        >
            <div class="header"><slot name="header"> </slot></div>
            <div class="content"><slot name="content"> </slot></div>
            <div class="footer"><slot name="footer"> </slot></div>
        </lew-flex>
    </lew-flex>
</template>

<style lang="scss">
.lew-comment {
    width: 100%;
    display: inline-flex;
    box-sizing: border-box;

    .lew-comment-body {
        width: 100%;
        .header {
            width: 100%;
            min-height: 20px;
        }
        .content {
            width: 100%;
            font-size: 14px;
        }
        .footer {
            width: 100%;
        }
    }
}
</style>
