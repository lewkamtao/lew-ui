<script lang="ts" setup>
import { Dismiss24Filled } from '@vicons/fluent';
import { Icon } from '@vicons/utils';
import { useLewTo } from '../../../hooks';
import _props from './props';
const { lewTo } = useLewTo();

const props = defineProps(_props);

const emit = defineEmits(['close']);
const close = () => {
    if (props.disabled) {
        return;
    }
    emit('close');
};
</script>

<template>
    <div
        class="lew-tag"
        :class="`lew-tag-${size} 
        lew-tag-${type} 
        ${round ? 'lew-tag-round' : ''}       
        ${bold ? 'lew-tag-bold' : ''} 
        ${disabled ? 'lew-tag-disabled' : ''} ${to ? 'lew-tag-to' : ''}`"
        :style="`max-width:${maxWidth}`"
        @click="lewTo(to)"
    >
        <div class="lew-tag-left"><slot name="left"></slot></div>
        <div class="lew-tag-value"><slot></slot></div>
        <div class="lew-tag-right"><slot name="right"></slot></div>
        <div v-if="closable" class="lew-tag-close" @click.stop="close">
            <Icon><Dismiss24Filled /></Icon>
        </div>
    </div>
</template>

<style lang="scss">
.lew-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    user-select: none;
    box-sizing: border-box;
    .lew-tag-value {
        font-weight: normal;
        padding: 0px 3px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .lew-tag-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 8px;
        height: 8px;
        border-radius: 3px;
        margin-left: -3px;
        padding: 5px;
        cursor: pointer;
    }
    .lew-tag-close:hover {
        background-color: rgba($color: #000, $alpha: 0.1);
    }
    .lew-tag-close:active {
        background-color: rgba($color: #000, $alpha: 0.2);
    }
    .lew-tag-left {
        margin-left: 3px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
    }
    .lew-tag-right {
        margin-right: 3px;
        display: inline-flex;
        align-items: center;
    }
}
.lew-tag-to {
    cursor: pointer;
}
.lew-tag-small {
    height: 20px;
    min-width: 20px;
    line-height: 20px;
    padding: 0px;
    font-size: 12px;
    .lew-tag-close {
        margin-left: 1px;
        border-radius: 2px;
        padding: 2px;
        font-size: 12px;
        margin-right: 4px;
    }
    .lew-tag-value {
        padding: 0px 2px;
    }
}
.lew-tag-bold {
    font-weight: bold;
    .lew-tag-value {
        font-weight: bold;
    }
}
.lew-tag-medium {
    height: 24px;
    min-width: 24px;
    line-height: 24px;
    padding: 0px 2px;
    font-size: 13px;
    .lew-tag-close {
        margin-left: 1px;
        border-radius: 3px;
        padding: 4px;
        font-size: 13px;
        margin-right: 2px;
    }
    .lew-tag-value {
        padding: 0px 4px;
    }
}
.lew-tag-large {
    height: 28px;
    min-width: 28px;
    line-height: 28px;
    padding: 0px 4px;
    font-size: 14px;
    .lew-tag-close {
        margin-left: 1px;
        border-radius: 4px;
        padding: 6px;
        font-size: 14px;
    }
    .lew-tag-value {
        padding: 0px 6px;
    }
}

.lew-tag-round {
    border-radius: 35px;
    .lew-tag-close {
        border-radius: 35px;
    }
}

.lew-tag-primary {
    background-color: var(--lew-primary-color-light);
    color: var(--lew-primary-color-dark);
}
.lew-tag-info {
    color: var(--lew-info-color-dark);
    background-color: var(--lew-info-color-light);
}
.lew-tag-success {
    color: var(--lew-success-color-dark);
    background-color: var(--lew-success-color-light);
}

.lew-tag-warning {
    color: var(--lew-warning-color-dark);
    background-color: var(--lew-warning-color-light);
}
.lew-tag-error {
    color: var(--lew-error-color-dark);
    background-color: var(--lew-error-color-light);
}
.lew-tag-normal {
    color: var(--lew-text-color-3);
    background-color: var(--lew-normal-color-light);
}
.lew-tag-disabled {
    opacity: var(--lew-disabled-opacity);
    cursor: not-allowed;
    .lew-tag-close {
        cursor: not-allowed;
    }
    .lew-tag-close:hover {
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>
