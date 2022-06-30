<script lang="ts" setup>
import { Dismiss24Filled } from '@vicons/fluent';
import { Icon } from '@vicons/utils';
import { useLewTo } from '../../../hooks';
const { lewTo } = useLewTo();

const props = defineProps({
    type: {
        type: String,
        default: 'normal',
    },
    size: {
        type: String,
        default: 'medium',
    },
    round: {
        type: Boolean,
        default: false,
    },
    closable: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    to: {
        type: String,
        default: '',
    },
});

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
        :class="`lew-tag-${size} lew-tag-${type} ${
            round ? 'lew-tag-round' : ''
        } ${disabled ? 'lew-tag-disabled' : ''} ${to ? 'lew-tag-to' : ''}`"
        @click="lewTo(to)"
    >
        <div class="lew-tag-left"><slot name="left"></slot></div>
        <div class="lew-tag-value">
            <slot></slot>
        </div>
        <div class="lew-tag-right"><slot name="right"></slot></div>
        <div v-if="closable" class="lew-tag-close" @click="close">
            <Icon size="13"><Dismiss24Filled /></Icon>
        </div>
    </div>
</template>

<style lang="scss">
.lew-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: bottom;
    border-radius: 3px;
    user-select: none;

    .lew-tag-value {
        display: inline;
        font-weight: normal;
        padding: 0px 3px;
        box-sizing: border-box;
    }

    .lew-tag-close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 8px;
        height: 8px;
        border-radius: 3px;
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
    height: 18px;
    line-height: 18px;
    padding: 0px 2px 0px 2px;
    font-size: 10px;
}
.lew-tag-medium {
    height: 22px;
    line-height: 22px;
    padding: 0px 4px;
    font-size: 12px;
}
.lew-tag-large {
    height: 26px;
    line-height: 26px;
    padding: 0px 5px;
    font-size: 14px;
}

.lew-tag-round {
    border-radius: 35px;
    .lew-tag-close {
        border-radius: 35px;
    }
}

.lew-tag-primary {
    background-color: var(--lew-primary-color-light);
    color: var(--lew-primary-text-color);
}
.lew-tag-info {
    color: var(--lew-info-text-color);
    background-color: var(--lew-info-color-light);
}
.lew-tag-success {
    color: var(--lew-success-text-color);
    background-color: var(--lew-success-color-light);
}

.lew-tag-warning {
    color: var(--lew-warning-text-color);
    background-color: var(--lew-warning-color-light);
}
.lew-tag-error {
    color: var(--lew-error-text-color);
    background-color: var(--lew-error-color-light);
}
.lew-tag-normal {
    color: var(--lew-normal-text-color);
    background-color: var(--lew-normal-color-light);
}
.lew-tag-disabled {
    opacity: var(--lew-opacity-disabled);
    cursor: not-allowed;
    .lew-tag-close {
        cursor: not-allowed;
    }
    .lew-tag-close:hover {
        background-color: rgba(0, 0, 0, 0);
    }
}
</style>
