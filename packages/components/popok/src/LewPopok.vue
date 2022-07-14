<!-- filename: Popover.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { LewButton } from 'lew-ui';
import tippy from 'tippy.js';

import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
} from '@vicons/fluent';
import { Icon } from '@vicons/utils';

const props = defineProps({
    type: {
        type: String,
        default: 'warning',
    },
    width: { type: String, default: '250px' },
    trigger: {
        type: String,
        default: 'click',
    },
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    placement: {
        type: String,
        default: 'top',
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let lewPopoverRef = ref();

let show = () => {
    lewPopoverRef.value.show();
};

let hide = () => {
    lewPopoverRef.value.hide();
};

const emit = defineEmits(['ok', 'cancel']);

defineExpose({ show, hide });
</script>

<template>
    <lew-popover
        ref="lewPopoverRef"
        class="lew-popok"
        :trigger="trigger"
        placement="bottom-start"
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
                            @click="emit('cancel', { show, hide })"
                            >取消
                        </lew-button>
                        <lew-button
                            size="small"
                            @click="emit('ok', { show, hide })"
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
