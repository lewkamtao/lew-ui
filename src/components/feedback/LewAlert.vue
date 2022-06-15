<script setup lang="ts">
import { PropType } from 'vue';
import LewIcon from '../icon/icon';

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
            <div class="icon" v-html="LewIcon[item.type]"></div>
            <div class="message">
                <div class="title">{{ item.title }}</div>
                <div v-show="item.content" class="content">
                    {{ item.content }}
                </div>
            </div>
            <div
                class="close"
                @click="emit('close', i)"
                v-html="LewIcon.close"
            ></div>
        </div>
    </div>
</template>

<style lang="scss">
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
        min-height: 40px;
        background-color: var(--gray-color);
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 12px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.1);
        box-sizing: border-box;
        opacity: 0.8;
        transition: all 0.25s ease;

        .icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1px 10px 0px 10px;
            svg {
                width: 18px;
                height: 18px;
            }
        }
        .close {
            position: absolute;
            top: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25px;
            height: 25px;
            right: 10px;
            border-radius: 8px;
            box-sizing: border-box;
            cursor: pointer;
            user-select: none;
            svg {
                width: 18px;
                height: 18px;
            }
        }
        .close:hover {
            background: rgba($color: #000000, $alpha: 0.05);
        }
        .close:active {
            background: rgba($color: #000000, $alpha: 0.15);
        }
        .message {
            width: calc(100% - 100px);
            .title {
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
    .lew-alert-gray {
        color: var(--gray-text-color);
        background-color: var(--gray-color-light);
        border: 2px var(--gray-color-dark) solid;
    }
    .lew-alert-success {
        color: var(--success-text-color);
        background-color: var(--success-color-light);
        border: 2px var(--success-color) solid;
    }
    .lew-alert-warning {
        color: var(--warning-text-color);
        background-color: var(--warning-color-light);
        border: 2px var(--warning-color) solid;
    }
    .lew-alert-danger {
        color: var(--danger-text-color);
        background-color: var(--danger-color-light);
        border: 2px var(--danger-color) solid;
    }
    .lew-alert-primary {
        color: var(--primary-text-color);
        background-color: var(--primary-color-light);
        border: 2px var(--primary-color) solid;
    }
    .lew-alert:hover {
        opacity: 1;
    }
}
</style>
