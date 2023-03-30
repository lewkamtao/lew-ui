<script setup lang="ts">
import { useVModel, useDebounceFn } from '@vueuse/core';
import { selectProps, SelectOptions } from './props';
import { LewPopover } from 'lew-ui';
import { getClass, numFormat } from 'lew-ui/utils';

const props = defineProps(selectProps);
const emit = defineEmits(['update:modelValue', 'change']);
const selectValue = useVModel(props, 'modelValue', emit);

const { searchDelay, options, searchMethod, searchable, modelValue } = props;

let lewSelectRef = ref();
let lewPopverRef = ref();
let searchInputRef = ref();

let state = reactive({
    selectWidth: 0,
    visible: false,
    loading: false,
    opitons: options,
    keyword: '',
});

const getSelectWidth = () => {
    state.selectWidth = lewSelectRef.value?.clientWidth - 14;
    console.log(state.selectWidth);

    if (searchable) {
        setTimeout(() => {
            searchInputRef.value && searchInputRef.value.focus();
        }, 200);
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
}, searchDelay);

const search = async (e: any) => {
    // loading
    state.loading = true;
    const keyword = e.target.value;
    if (searchable) {
        let result: any = [];
        // 如果没输入关键词
        if (!keyword && options.length > 0) {
            result = options;
        } else {
            result = await searchMethod({
                options: options,
                keyword,
            });
        }
        state.opitons = result;
    }
    state.loading = false;
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
    return modelValue === _value;
};

const getLabel = computed(() => {
    if (options) {
        const option = options.find((e) => {
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
    let { size, align } = props;
    return getClass('lew-select-body', { size, align });
});

const getSelectItemClassName = (e: any) => {
    let { disabled } = e;
    return getClass('lew-select-item', { disabled });
};

const onShow = () => {
    state.visible = true;
    getSelectWidth();
    if (state.opitons && state.opitons.length === 0 && searchable) {
        search({ target: { value: '' } });
    }
};

const onHide = () => {
    state.visible = false;
};

defineExpose({ show, hide });
</script>

<template>
    <lew-popover
        ref="lewPopverRef"
        class="lew-select-view"
        :class="{ 'lew-select-focus': state.visible }"
        :trigger="trigger"
        placement="bottom-start"
        style="width: 100%"
        @on-show="onShow"
        @on-hide="onHide"
        :loading="state.loading"
    >
        <template #trigger>
            <div
                ref="lewSelectRef"
                class="lew-select"
                :class="getSelectClassName"
            >
                <lew-icon
                    size="16px"
                    type="chevron-down"
                    class="select-icon"
                    :class="{ 'select-icon-hide': clearable && getLabel }"
                />
                <lew-icon
                    @click.stop="clearHandle"
                    v-if="clearable"
                    size="16px"
                    type="x-circle"
                    class="clear-icon"
                    :class="{ 'clear-icon-show': clearable && getLabel }"
                />
                <div v-show="getLabel" class="value">{{ getLabel }}</div>
                <div v-show="!getLabel" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="lew-select-body"
                :class="getBodyClassName"
                :style="`width:${state.selectWidth}px`"
            >
                <slot name="header"></slot>
                <div v-if="searchable" class="search-input">
                    <input
                        v-model="state.keyword"
                        ref="searchInputRef"
                        @input="searchDebounce"
                        placeholder="输入搜索关键词"
                    />
                </div>
                <div class="lew-select-options-box">
                    <lew-flex
                        direction="y"
                        v-show="state.opitons && state.opitons.length === 0"
                        class="not-found"
                    >
                        <lew-icon type="box" />
                        <span>暂无结果</span>
                    </lew-flex>
                    <div
                        v-if="
                            searchable &&
                            state.opitons &&
                            state.opitons.length > 0
                        "
                        class="reslut-count"
                    >
                        共
                        {{ numFormat(state.opitons && state.opitons.length) }}
                        条结果
                    </div>
                    <template v-for="item in state.opitons" :key="item.value">
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
            opacity: 0;
        }
        .clear-icon {
            opacity: 0;
            transform: translate(100%, -50%);
        }
        .clear-icon:hover {
            opacity: 1;
        }
        .select-icon-hide {
            opacity: 0;
            transform: translate(100%, -50%);
        }
        .clear-icon-show {
            opacity: 0.7;
            transform: translate(0%, -50%);
        }
        .clear-icon-show:hover {
            opacity: 1;
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
    .lew-select-options-box {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 250px;
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
