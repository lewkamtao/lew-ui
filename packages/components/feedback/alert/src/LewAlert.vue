<script setup lang="ts">
import { PropType } from 'vue';
import {
    Info24Regular,
    Warning24Regular,
    CheckmarkCircle24Regular,
    ErrorCircle24Regular,
    Alert24Regular,
    Dismiss24Filled,
} from '@vicons/fluent';
import { Icon } from '@vicons/utils';
// alert type
type Alert = {
    type: string;
    title: string;
    content: string;
};

defineProps({
    alertList: {
        type: Array as PropType<Alert[]>,
        default() {
            return [];
        },
    },
});

const emit = defineEmits(['close']);
</script>

<template>
    <div class="lew-alert-group">
        <div
            v-for="(item, i) in alertList"
            :key="i"
            class="lew-alert"
            :class="`lew-alert-${item.type}`"
        >
            <div class="alert-icon">
                <Icon size="20">
                    <Info24Regular v-if="item.type == `normal`" />
                    <Warning24Regular v-if="item.type == `warning`" />
                    <CheckmarkCircle24Regular v-if="item.type == `success`" />
                    <ErrorCircle24Regular v-if="item.type == `error`" />
                    <Alert24Regular v-if="item.type == `info`" />
                </Icon>
            </div>

            <div class="message">
                <div class="title">{{ item.title }}</div>
                <div v-show="item.content" class="content">
                    {{ item.content }}
                </div>
            </div>
            <div class="btn-close" @click="emit('close', i)">
                <Icon size="18"> <Dismiss24Filled /> </Icon>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-alert-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0px;
    .lew-alert {
        position: relative;
        display: flex;
        align-items: flex-start;
        width: 100%;
        min-height: 32px;
        background-color: var(--lew-normal-color);
        border-radius: var(--lew-form-border-radius);
        margin-bottom: 10px;
        padding: 8px 12px;
        box-sizing: border-box;
        opacity: 0.8;
        transition: all 0.25s ease;
        .alert-icon {
            margin: 1px 5px 0px 0px;
        }
        .btn-close {
            position: absolute;
            top: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25px;
            height: 25px;
            right: 10px;
            border-radius: var(--lew-border-radius);
            box-sizing: border-box;
            cursor: pointer;
            user-select: none;
        }
        .btn-close:hover {
            background: rgba($color: #000000, $alpha: 0.05);
        }
        .btn-close:active {
            background: rgba($color: #000000, $alpha: 0.15);
        }
        .message {
            width: calc(100% - 100px);
            .title {
                margin-top: 1px;
                font-size: 15px;
                width: 100%;
            }
            .content {
                margin-top: 7px;
                font-size: 14px;
                width: 100%;
            }
        }
    }
    .lew-alert-normal {
        color: var(--lew-normal-text-color);
        background-color: var(--lew-normal-color-light);
    }
    .lew-alert-success {
        color: var(--lew-success-text-color);
        background-color: var(--lew-success-color-light);
    }
    .lew-alert-warning {
        color: var(--lew-warning-text-color);
        background-color: var(--lew-warning-color-light);
    }
    .lew-alert-error {
        color: var(--lew-error-text-color);
        background-color: var(--lew-error-color-light);
    }
    .lew-alert-info {
        color: var(--lew-info-text-color);
        background-color: var(--lew-info-color-light);
    }
    .lew-alert:hover {
        opacity: 1;
    }
}
</style>
