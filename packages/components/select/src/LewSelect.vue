<script setup lang="ts">
import { selectProps, LewSelectOptions } from './props';
import { LewCheckbox, LewPopover } from 'lew-ui';

const props = defineProps(selectProps);
const v = ref<string>('');
const multipleV = ref<Array<string>>([]);
const labelStr = ref<string>('');
const multipleLabelStr = ref<Array<string>>([]);

watch(
    () => props.modelValue,
    () => {
        // 如果是多选
        if (!props.modelValue) {
            return;
        }
        if (props.multiple && props.modelValue instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            multipleV.value = props.modelValue;
            multipleLabelStr.value = filterSelect(
                props.modelValue,
                props.options
            );
        } else if (typeof props.modelValue==='string') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            v.value = props.modelValue;
            labelStr.value =
                props.options?.find((e) => e.value===props.modelValue)
                    ?.label || '';
        }
    },
    { deep: true }
);

let lewSelectRef = ref();

const filterSelect = (v: string[], options: LewSelectOptions[]) => {
    let _v: Array<string> = [];
    if (v && options) {
        v.map((e: string) => {
            options.map((o) => {
                if (e===o.value) {
                    _v.push(o.label);
                }
            });
        });
    }
    return _v;
};

const emit = defineEmits(['update:modelValue', 'change']);

const getChecked = (_value: string) => {
    return props.modelValue?.includes(_value);
};

let isShowOptions = ref(false);

let lewPopverRef1 = ref();
let lewPopverRef2 = ref();

const delTag = (i: number) => {
    multipleV.value.splice(i, 1);
    multipleLabelStr.value.splice(i, 1);
    emit('update:modelValue', multipleV.value);
    emit('change', { value: multipleV.value, show, hide });
    if (i===0 && multipleV.value.length===0) {
        lewPopverRef2.value.hide();
    }
};

const lewSelectWidth = computed(
    () => lewSelectRef.value?.offsetWidth - 12 + 'px'
);

const check = (item: LewSelectOptions, checked: boolean) => {
    if (props.modelValue instanceof Array) {
        let updatedValue = [...props.modelValue];
        if (checked) {
            updatedValue.push(item.value);
        } else {
            updatedValue.splice(updatedValue.indexOf(item.value), 1);
        }
        emit('update:modelValue', updatedValue);
    } else {
        if (v.value != item.value) {
            labelStr.value = item.label;
            v.value = item.value;
            emit('change', item.value);
        }
        emit('update:modelValue', item.value);
        hide();
    }
};

const show = () => {
    lewPopverRef1.value.show();
};

const hide = () => {
    lewPopverRef1.value.hide();
};

defineExpose({ show, hide });

onMounted(() => {
    // 如果是多选
    if (props.multiple && props.modelValue instanceof Array) {
        multipleLabelStr.value = filterSelect(props.modelValue, props.options);
    } else if (typeof props.modelValue==='string') {
        labelStr.value = labelStr.value =
            props.options?.find((e) => e.value===props.modelValue)?.label ||
            '';
    }
});
</script>

<template>
    <lew-popover
        ref="lewPopverRef1"
        class="lew-select-view"
        :class="{ 'lew-select-focus': isShowOptions }"
        :trigger="trigger"
        :placement="placement"
        :arrow="false"
        style="width: 100%"
        @on-show="isShowOptions = true"
        @on-hide="isShowOptions = false"
    >
        <template #trigger>
            <div
                ref="lewSelectRef"
                class="lew-select"
                :class="`lew-select-${size} lew-select-align-${align}`"
            >
                <lew-icon
                    size="16px"
                    type="chevron-down"
                    class="lew-select-icon"
                />
                <div
                    v-if="
                        (!multiple && labelStr.length===0) ||
                        (multiple && multipleLabelStr.length===0)
                    "
                    class="lew-select-placeholder"
                >
                    请选择
                </div>
                <!-- 单选 -->
                <div v-show="!multiple" class="lew-select-label-single">
                    {{ labelStr }}
                </div>
                <!-- 多选 -->
                <div v-show="multiple" class="lew-select-label-multiple">
                    <lew-tag
                        v-show="multipleLabelStr.length > 0"
                        type="primary"
                        :size="size"
                        closable
                        @close="delTag(0)"
                    >
                        {{ multipleLabelStr[0] }}</lew-tag
                    >
                    <lew-popover
                        v-show="multipleLabelStr.length > 1"
                        ref="lewPopverRef2"
                        trigger="hover"
                        placement="top"
                    >
                        <template #trigger>
                            <div
                                style="margin-left: 5px"
                                class="lew-isSelect-label-num"
                            >
                                <lew-tag
                                    v-show="multipleLabelStr.length > 1"
                                    :size="size"
                                    type="primary"
                                >
                                    +{{ multipleLabelStr.length - 1 }}</lew-tag
                                >
                            </div>
                        </template>
                        <template #popover-body>
                            <lew-flex
                                wrap
                                gap="5px"
                                x="start"
                                class="lew-isSelect-label-box"
                            >
                                <lew-tag
                                    v-for="(item, index) in multipleLabelStr"
                                    :key="index"
                                    type="primary"
                                    closable
                                    :size="size"
                                    @close="delTag(index)"
                                >
                                    {{ item }}
                                </lew-tag>
                            </lew-flex>
                        </template>
                    </lew-popover>
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="lew-select-body"
                :class="`
            ${size ? 'lew-select-body-' + size : ''} 
            ${multiple ? 'lew-select-multiple-body' : ''}  
            ${align ? 'lew-select-body-align-' + align : ''}  
            `"
                :style="`width:${lewSelectWidth}`"
            >
                <slot name="header"></slot>
                <div class="lew-select-options-box">
                    <template v-for="item in options" :key="item.value">
                        <label>
                            <!-- 原生 -->
                            <div
                                v-if="!labelSlot"
                                class="lew-select-item"
                                :class="`
                            ${item.disabled ? 'lew-select-item-disabled' : ''} 
                            `"
                            >
                                <lew-checkbox
                                    v-show="showIcon && multiple"
                                    :size="size"
                                    class="lew-select-checkbox"
                                    :label="item.label"
                                    :disabled="item.disabled"
                                    :checked="getChecked(item.value)"
                                    @change="check(item, $event)"
                                />
                                <div v-if="!multiple" class="lew-select-label">
                                    {{ item.label }}
                                </div>
                            </div>
                            <div v-else class="lew-select-slot-item">
                                <slot
                                    name="label"
                                    :item="item"
                                    :checked="getChecked(item.value)"
                                ></slot>
                                <lew-checkbox
                                    v-show="false"
                                    :checked="getChecked(item.value)"
                                    @change="check(item, $event)"
                                />
                            </div>
                        </label>
                    </template>
                </div>
                <slot name="footer"></slot>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-select-view {
    width: 100%;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: all 0.15s ease;
    box-sizing: border-box;

    > div {
        width: 100%;
    }

    .lew-select {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;

        .lew-select-icon {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%) rotate(0deg);
            transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
            color: var(--lew-text-color-7);
        }

        .lew-select-label-multiple {
            width: 100%;
            display: flex;
            align-items: center;

            .lew-popover {
                display: flex;
                align-items: center;

                > div {
                    display: flex;
                    align-items: center;
                }
            }
        }

        .lew-isSelect-label-num {
            display: inline-flex;
            align-items: center;
        }
    }

    .lew-select-placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-select-small {
        padding: var(--lew-form-input-padding-small);
        height: var(--lew-form-item-height-small);
        line-height: var(--lew-form-input-line-height-small);

        .lew-select-label-single,
        .lew-select-placeholder {
            width: calc(100% - 20px);
            font-size: var(--lew-form-font-size-small);
        }

        .lew-select-label-multiple {
            margin-left: -4px;
        }
    }

    .lew-select-medium {
        padding: var(--lew-form-input-padding-medium);
        line-height: var(--lew-form-input-line-height-medium);
        height: var(--lew-form-item-height-medium);

        .lew-select-label-single,
        .lew-select-placeholder {
            font-size: var(--lew-form-font-size-medium);
        }

        .lew-select-label-multiple {
            margin-left: -6px;
        }
    }

    .lew-select-large {
        padding: var(--lew-form-input-padding-large);
        line-height: var(--lew-form-input-line-height-large);
        height: var(--lew-form-item-height-large);

        .lew-select-label-single,
        .lew-select-placeholder {
            font-size: var(--lew-form-font-size-large);
        }

        .lew-select-label-multiple {
            margin-left: -8px;
        }
    }
}

.lew-select-view:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-select-view:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-select-view.lew-select-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;

    .lew-select-icon {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
}
</style>
<style lang="scss">
.lew-isSelect-label-box {
    max-width: 250px;
}

.lew-select-align-left,
.lew-select-body-align-left {
    text-align: left;
}

.lew-select-align-center,
.lew-select-body-align-center {
    text-align: center;
}

.lew-select-align-right,
.lew-select-body-align-right {
    text-align: right;
}

.lew-select-body {
    width: 100%;
    box-sizing: border-box;

    .lew-select-options-box {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 300px;
        height: auto;
        box-sizing: border-box;
        transition: all 0.25s ease;

        .lew-select-item {
            position: relative;
            display: inline-flex;
            align-items: center;
            width: 100%;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: var(--lew-text-color-7);
            box-sizing: border-box;
            border-radius: var(--lew-border-radius);
        }

        .lew-select-item-disabled {
            opacity: 0.3;
            cursor: no-drop;
        }

        .lew-select-label {
            width: 100%;
            user-select: none;
            font-size: 14px;
            padding: 0px 8px;
            box-sizing: border-box;
        }

        .lew-select-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-select-checked {
            font-weight: bold;
            color: var(--lew-primary-color-dark);
        }

        .lew-select-checked:hover {
            color: var(--lew-primary-color-dark);
        }

        .lew-select-slot-item {
            border-radius: var(--lew-border-radius);
        }

        .lew-select-slot-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-select-checkbox {
            position: absolute;
            z-index: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .lew-select-options-box::-webkit-scrollbar {
        background-color: rgb(126, 126, 126, 0);
        width: 5px;
        height: 5px;
    }

    .lew-select-options-box::-webkit-scrollbar-thumb:hover {
        background-color: rgb(126, 126, 126);
    }

    .lew-select-options-box::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 0);
        border-radius: 5px;
    }

    .lew-select-options-box:hover::-webkit-scrollbar-thumb {
        background-color: rgb(209 213 219 / 1);
        border-radius: 5px;
    }
}

.lew-select-body-small {
    .lew-select-options-box {
        .lew-select-item {
            height: 28px;
            line-height: 28px;
        }

        .lew-select-checkbox {
            left: 8px;
        }
    }
}

.lew-select-body-medium {
    .lew-select-options-box {
        .lew-select-item {
            height: 30px;
            line-height: 30px;
        }

        .lew-select-checkbox {
            left: 8px;
        }
    }
}

.lew-select-body-large {
    .lew-select-options-box {
        .lew-select-item {
            height: 32px;
            line-height: 32px;
        }

        .lew-select-checkbox {
            left: 8px;
        }
    }
}
</style>
