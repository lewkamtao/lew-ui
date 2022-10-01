<!-- filename: Popover.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { LewButton } from 'lew-ui';
import tippy from 'tippy.js';
import { _props } from './props';

import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
} from '@vicons/fluent';
import { Icon } from '@vicons/utils';

const props = defineProps(_props);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lewPopoverRef = ref();

let okLoading = ref(false);
let cancelLoading = ref(false);

let hide = () => {
    lewPopoverRef.value.hide();
};

const okHandle = async () => {
    if (typeof props.ok === 'function') {
        okLoading.value = true;
        await props.ok();
        okLoading.value = false;
    }
    hide();
};

const cancelHandle = async () => {
    if (typeof props.cancel === 'function') {
        cancelLoading.value = true;
        await props.cancel();
        cancelLoading.value = false;
    }
    hide();
};

const emit = defineEmits(['onShow', 'cancel']);
</script>

<template>
    <lew-popover
        ref="lewPopoverRef"
        class="lew-popok"
        :trigger="trigger"
        :placement="placement"
        @onShow="emit('onShow')"
    >
        <template #trigger>
            <slot />
        </template>
        <template #popover-body>
            <div class="lew-popok-body" :style="`width:${width}`">
                <div class="left">
                    <Icon size="22" :class="`icon-${type}`">
                        <Info24Regular v-if="type == `normal`" />
                        <Warning24Regular v-if="type == `warning`" />
                        <CheckmarkCircle24Regular v-if="type == `success`" />
                        <ErrorCircle24Regular v-if="type == `error`" />
                        <Alert24Regular v-if="type == `info`" />
                    </Icon>
                </div>
                <div class="right">
                    <div v-if="title" class="title">{{ title }}</div>
                    <div v-if="content" class="content">{{ content }}</div>
                    <div class="footer">
                        <lew-button
                            size="small"
                            type="blank"
                            @click="cancelHandle"
                            :loading="cancelLoading"
                            >取消
                        </lew-button>
                        <lew-button
                            size="small"
                            @click="okHandle"
                            :loading="okLoading"
                            >确定</lew-button
                        >
                    </div>
                </div>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popok {
    display: inline-block;
}
.lew-popok-body {
    display: flex;
    padding: 10px;
    .left {
        width: 30px;
        margin-right: 5px;
        .icon-success {
            color: var(--lew-success-color-dark);
        }
        .icon-warning {
            color: var(--lew-warning-color-dark);
        }
        .icon-normal {
            color: var(--lew-normal-color-dark);
        }
        .icon-info {
            color: var(--lew-info-color-dark);
        }
        .icon-error {
            color: var(--lew-error-color-dark);
        }
    }
    .right {
        width: calc(100% - 30px);
        .title {
            width: 100%;
            font-weight: 600;
            margin-bottom: 5px;
        }
        .content {
            width: 100%;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .footer {
            width: 100%;
            display: flex;
            justify-content: end;
            .lew-button {
                margin-left: 10px;
            }
        }
    }
}
</style>
