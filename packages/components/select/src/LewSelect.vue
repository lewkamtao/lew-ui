<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { selectProps, SelectOptions } from './props';
import { LewPopover } from 'lew-ui';
import { getClass } from 'lew-ui/utils';
const props = defineProps(selectProps);
const emit = defineEmits(['update:modelValue', 'change']);

const selectValue = useVModel(props, 'modelValue', emit);

let visible = ref(false);
let lewSelectRef = ref();
let lewPopverRef = ref();
let selectWidth = ref();

// @ts-ingore

const getSelectWidth = () => {
    selectWidth.value = lewSelectRef.value?.clientWidth - 12;
};

const show = () => {
    lewPopverRef.value.show();
};

const hide = () => {
    lewPopverRef.value.hide();
};

const clearHandle = () => {
    selectValue.value = '';
};

const selectHandle = (item: SelectOptions) => {
    if (item.disabled) {
        return;
    }
    selectValue.value = item.value;
    hide();
};

const getChecked = (_value: String | Number) => {
    return props.modelValue === _value;
};

const getValue = computed(() => {
    if (props.options) {
        const option = props.options.find((e) => {
            if (!!e) {
                return e.value === selectValue.value;
            }
        });

        if (option) {
            return option.label;
        } else {
            return '';
        }
    }
});

const getSelectClassName = computed(() => {
    let { clearable, size } = props;
    clearable = clearable ? (selectValue.value ? true : false) : false;
    return getClass('lew-select', { clearable, size });
});

const getBodyClassName = computed(() => {
    let { size } = props;
    return getClass('lew-select-body', { size });
});

const getSelectItemClassName = (e: any) => {
    let { disabled } = e;
    return getClass('lew-select-item', { disabled });
};

defineExpose({ show, hide });
</script>

<template>
    <lew-popover
        ref="lewPopverRef"
        class="lew-select-view"
        :class="{ 'lew-select-focus': visible }"
        :trigger="trigger"
        placement="bottom-start"
        style="width: 100%"
        @on-show="(visible = true), getSelectWidth()"
        @on-hide="visible = false"
    >
        <template #trigger>
            <div
                ref="lewSelectRef"
                class="lew-select"
                :class="getSelectClassName"
            >
                <lew-icon size="16px" type="chevron-down" class="select-icon" />
                <lew-icon
                    @click.stop="clearHandle"
                    v-if="clearable"
                    size="16px"
                    type="x-circle"
                    class="clear-icon"
                />
                <div v-show="getValue" class="value">{{ getValue }}</div>
                <div v-show="!getValue" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="lew-select-body"
                :class="getBodyClassName"
                :style="`width:${selectWidth}px`"
            >
                <slot name="header"></slot>
                <div class="lew-select-options-box">
                    <template v-for="item in options" :key="item.value">
                        <label @click="selectHandle(item)">
                            <!-- 原生 -->
                            <div
                                v-if="!labelSlot"
                                class="lew-select-item"
                                :class="
                                    getSelectItemClassName({
                                        disabled: item.disabled,
                                    })
                                "
                            >
                                <div class="lew-select-label">
                                    {{ item.label }}
                                </div>
                            </div>
                            <div v-else class="lew-select-slot-item">
                                <slot
                                    name="label"
                                    :item="item"
                                    :checked="getChecked(item.value)"
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
    outline: 0px var(--lew-primary-color-light) solid;
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

        .select-icon,
        .clear-icon {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%) rotate(0deg);
            transition: var(--lew-form-transition);
            color: var(--lew-text-color-7);
        }
        .clear-icon {
            display: none;
        }
        .placeholder {
            color: rgb(165, 165, 165);
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

    .lew-select-clearable {
        .select-icon {
            opacity: 1;
        }
        .clear-icon {
            display: block;
            opacity: 0;
            transform: translate(100%, -50%);
        }
    }
    .lew-select-clearable:hover {
        .select-icon {
            opacity: 0;
        }
        .clear-icon {
            opacity: 1;
            transform: translate(0px, -50%);
        }
    }
    .lew-select-placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-select-size-small {
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

    .lew-select-size-medium {
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

    .lew-select-size-large {
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
    outline: 3px var(--lew-primary-color-light) solid;

    .select-icon {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
}
</style>
<style lang="scss">
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
            color: var(--lew-text-color-3);
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

.lew-select-body-size-small {
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

.lew-select-body-size-medium {
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

.lew-select-body-size-large {
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
