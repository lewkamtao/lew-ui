<script setup lang="ts">
const parentProps: any = getCurrentInstance()?.parent?.props;
const { labelWidth, direction, labelAlign } = parentProps;

const props = defineProps({
    label: {
        type: String,
        default: '标题',
    },
    labelWidth: {
        type: String,
        default: '',
    },
    labelAlign: {
        type: String,
        default: '',
    },
    direction: {
        type: String,
        default: '',
    },
    labelSize: {
        type: String,
        default: 'medium',
    },
});

const _labelWidth = ref(props.labelWidth || labelWidth || 'auto');
const _direction = ref(props.direction || direction || 'x');
const _labelAlign = ref(props.labelAlign || labelAlign || 'end');
</script>

<template>
    <div
        class="lew-form-item"
        :class="`lew-form-item-${_direction} lew-form-item-${_labelAlign}`"
    >
        <div
            class="lew-form-item-label"
            :style="`width: ${_labelWidth};height:${labelSize}px;`"
        >
            {{ props.label }}
        </div>
        <div class="lew-form-item-view">
            <slot />
            <div v-show="false" class="lew-form-item-tips">输入格式错误</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-form-item {
    width: 100%;
    text-align: left;
    .lew-form-item-label {
        display: inline-flex;
        white-space: nowrap;
        align-items: center;
        font-size: 14px;
        color: var(--lew-text-color-1);
        height: var(--lew-form-item-height-medium);
        line-height: var(--lew-form-item-height-medium);
    }
    .lew-form-item-view {
        width: 100%;
        .lew-form-item-tips {
            font-size: 14px;
            margin-top: 8px;
        }
    }
}

.lew-form-item-x {
    display: flex;
    align-items: center;
    gap: 15px;
    .lew-form-item-label {
        width: auto;
        flex-shrink: 0;
        text-align: right;
    }
    .lew-form-item-view {
        width: 100%;
    }
}

.lew-form-item-start {
    .lew-form-item-label {
        justify-content: flex-start;
    }
}

.lew-form-item-end {
    .lew-form-item-label {
        justify-content: flex-end;
    }
}

.lew-form-item-y {
    .lew-form-item-label {
        display: block;
        width: 100%;
    }
}
</style>
