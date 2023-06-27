<script setup lang="ts">
import { useVModel, useDebounceFn } from '@vueuse/core';
import { LewPopover } from 'lew-ui';
import { object2class, numFormat } from 'lew-ui/utils';
import { cascaderProps, CascaderOptions } from './props';
const props = defineProps(cascaderProps);
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'clear']);
const cascaderValue = useVModel(props, 'modelValue', emit);

const lewCascaderRef = ref();
const lewPopverRef = ref();
const searchInputRef = ref();

const state = reactive({
    visible: false,
    loading: false,
    options: [],
    keyword: '',
});

const init = () => {
    const _options = props.options.map((e) => {
        return {
            ...e,
            isHasChild: e.children && e.children.length > 0,
        };
    });
    state.options = [_options];
};
init();

const selectItem = (item: CascaderOptions, level: number) => {
    if (item.isHasChild) {
        state.options = state.options.slice(0, level + 1);
        const _options = item.children.map((e) => {
            return {
                ...e,
                isHasChild: e.children && e.children.length > 0,
            };
        });
        state.options.push(_options);
    }
};

const show = () => {
    lewPopverRef.value.show();
};

const hide = () => {
    lewPopverRef.value.hide();
};

const searchDebounce = useDebounceFn(async (e: any) => {
    search(e);
}, props.searchDelay);

const search = async (e: any) => {
    // loading
    state.loading = true;
    const keyword = e.target.value;
    if (props.searchable) {
        let result: any = [];
        // 如果没输入关键词
        if (!keyword && props.options.length > 0) {
            result = props.options;
        } else {
            result = await props.searchMethod({
                options: props.options,
                keyword,
            });
        }
        state.options = result;
    }
    state.loading = false;
};

const clearHandle = () => {
    cascaderValue.value = '';
    emit('clear');
    emit('change');
};

const cascaderHandle = (item: CascaderOptions) => {
    if (item.disabled) {
        return;
    }
    cascaderValue.value = item.value;
    emit('change', item.value);
    hide();
};

const getChecked = computed(() => (value: string | number) => {
    return cascaderValue.value === value;
});

const getValueStyle = computed(() => {
    return state.visible ? 'opacity:0.4' : '';
});

const getLabel = computed(() => {
    // if (state.options) {
    //     const option = state.options.find((e) => {
    //         if (e) {
    //             return e.value === cascaderValue.value;
    //         }
    //     });

    //     if (option && JSON.stringify(option) !== '{}') {
    //         return option.label;
    //     }
    // }

    return props.defaultValue || props.modelValue;
});

const getCascaderClassName = computed(() => {
    let { clearable, size, align } = props;
    clearable = clearable ? !!cascaderValue.value : false;
    return object2class('lew-cascader', { clearable, size, align });
});

const getBodyClassName = computed(() => {
    const { size, disabled } = props;
    return object2class('lew-cascader-body', { size, disabled });
});

const getCascaderViewClassName = computed(() => {
    const { disabled, readonly } = props;
    const focus = state.visible;
    return object2class('lew-cascader-view', { focus, disabled, readonly });
});

const getCascaderItemClassName = (e: any) => {
    const { disabled } = e;
    const active = getChecked.value(e.value);
    const { align } = props;

    return object2class('lew-cascader-item', {
        disabled,
        align,
        active,
    });
};

const getVirtualHeight = computed(() => {
    let height = state.options.length * props.itemHeight;
    height = height > 240 ? 240 : height;
    return `${height}px`;
});

const getIconSize = computed(() => {
    const size: any = {
        small: 13,
        medium: 14,
        large: 16,
    };
    return size[props.size];
});

const showHandle = () => {
    state.visible = true;
    if (state.options && state.options.length === 0 && props.searchable) {
        search({ target: { value: '' } });
    }
};

const hideHandle = () => {
    state.visible = false;
    emit('blur');
};

defineExpose({ show, hide });
</script>

<template>
    <lew-popover
        ref="lewPopverRef"
        class="lew-cascader-view"
        :class="getCascaderViewClassName"
        :trigger="trigger"
        :disabled="disabled"
        placement="bottom-start"
        style="width: 100%"
        :loading="state.loading"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div
                ref="lewCascaderRef"
                class="lew-cascader"
                :class="getCascaderClassName"
            >
                <lew-icon
                    :size="getIconSize"
                    type="chevron-down"
                    class="icon-cascader"
                    :class="{ 'icon-cascader-hide': clearable && getLabel }"
                />
                <lew-icon
                    v-if="clearable"
                    :size="getIconSize"
                    type="x-circle"
                    class="icon-clear"
                    :class="{ 'icon-clear-show': clearable && getLabel }"
                    @click.stop="clearHandle"
                />
                <div v-show="getLabel" :style="getValueStyle" class="value">
                    {{ getLabel }}
                </div>
                <div v-show="!getLabel" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div class="lew-cascader-body" :class="getBodyClassName">
                <slot name="header"></slot>
                <div class="lew-cascader-options-box">
                    <div
                        v-for="(oItem, oIndex) in state.options"
                        :key="index"
                        class="lew-cascader-item-warpper lew-scrollbar-hover"
                    >
                        <div
                            class="lew-cascader-item"
                            v-for="(item, index) in oItem"
                            :key="index"
                            @click="selectItem(item, oIndex)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <slot name="footer"></slot>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-cascader-view {
    width: 100%;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: all 0.15s ease;
    box-sizing: border-box;
    outline: 0px var(--lew-primary-color-light) solid;
    border: var(--lew-form-border-width) transparent solid;
    box-shadow: var(--lew-form-box-shadow);

    > div {
        width: 100%;
    }

    .lew-cascader {
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        user-cascader: none;
        box-sizing: border-box;

        .icon-cascader,
        .icon-clear {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%) rotate(0deg);
            transition: var(--lew-form-transition);
        }
        .icon-cascader {
            opacity: var(--lew-form-icon-opacity);
        }
        .icon-clear {
            opacity: 0;
            transform: translate(150%, -50%);
        }

        .icon-cascader-hide {
            opacity: 0;
            transform: translate(100%, -50%);
        }
        .icon-clear-show {
            opacity: var(--lew-form-icon-opacity);
            transform: translate(0%, -50%);
        }
        .icon-clear-show:hover {
            opacity: var(--lew-form-icon-opacity-hover);
        }
        .placeholder {
            color: rgb(165, 165, 165);
        }

        .placeholder,
        .value {
            display: inline-flex;
            align-items: center;
            width: calc(100% - 24px);
            box-sizing: border-box;
            transition: all 0.2s;
        }
    }

    .lew-cascader-align-left {
        text-align: left;
    }
    .lew-cascader-align-center {
        text-align: center;
    }
    .lew-cascader-align-right {
        text-align: right;
    }

    .lew-cascader-placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-cascader-size-small {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-small);
            height: var(--lew-form-item-height-small);
            line-height: var(--lew-form-input-line-height-small);
            font-size: var(--lew-form-font-size-small);
        }
    }

    .lew-cascader-size-medium {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-medium);
            line-height: var(--lew-form-input-line-height-medium);
            height: var(--lew-form-item-height-medium);
            font-size: var(--lew-form-font-size-medium);
        }
    }

    .lew-cascader-size-large {
        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-large);
            height: var(--lew-form-item-height-large);
            line-height: var(--lew-form-input-line-height-large);
            font-size: var(--lew-form-font-size-large);
        }
    }
}

.lew-cascader-view:hover {
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-cascader-view:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-cascader-view.lew-cascader-view-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    outline: var(--lew-form-ouline);

    .icon-cascader {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }
    .icon-cascader-hide {
        opacity: 0;
        transform: translate(100%, -50%) rotate(180deg);
    }
}

.lew-cascader-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}
.lew-cascader-view-readonly {
    pointer-events: none; //鼠标点击不可修改
    .lew-cascader {
        user-cascader: text;
    }
}
.lew-cascader-view-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    outline: 0px var(--lew-primary-color-light) solid;
    border: var(--lew-form-border-width) transparent solid;
}
</style>
<style lang="scss">
.lew-cascader-body {
    width: 100%;
    box-sizing: border-box;
    min-width: 180px;
    .search-input {
        margin-bottom: 5px;
        input {
            outline: none;
            border: none;
            background-color: var(--lew-bgcolor-1);
            width: 100%;
            height: 30px;
            border-radius: var(--lew-border-radius);
            padding: 0px 10px;
            box-sizing: border-box;
            color: var(--lew-form-color);
            transition: var(--lew-form-transition);
        }
        input:focus {
            background-color: var(--lew-form-bgcolor);
        }
    }
    .not-found {
        padding: 50px 0px;
        opacity: 0.4;
    }
    .reslut-count {
        padding-left: 8px;
        margin: 5px 0px;
        opacity: 0.4;
        font-size: 13px;
    }
    .lew-cascader-options-box {
        display: flex;

        box-sizing: border-box;
        .lew-cascader-item-warpper {
            overflow-y: auto;
            max-height: 300px;
            width: 180px;
        }

        .lew-cascader-item {
            position: relative;
            display: inline-flex;
            align-items: center;
            width: 100%;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            color: var(--lew-text-color-2);
            box-sizing: border-box;
            border-radius: 6px;
            height: 30px;
            padding: 0px 10px;
        }

        .lew-cascader-item-disabled {
            opacity: 0.3;
            cursor: no-drop;
        }
        .lew-cascader-item-align-left {
            text-align: left;
        }
        .lew-cascader-item-align-center {
            text-align: center;
        }
        .lew-cascader-item-align-right {
            text-align: right;
        }

        .lew-cascader-label {
            width: 100%;
            user-cascader: none;
            font-size: 14px;
            padding: 0px 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-sizing: border-box;
        }

        .lew-cascader-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-cascader-slot-item {
            border-radius: 6px;
        }

        .lew-cascader-slot-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-cascader-item-active {
            color: var(--lew-primary-color-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);
            .icon-check {
                margin-right: 10px;
            }
        }

        .lew-cascader-item-active:hover {
            color: var(--lew-primary-color-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);
        }
    }
}
</style>
