<script setup lang="ts">
import { useVModel, useDebounceFn } from '@vueuse/core';
import { LewPopover } from 'lew-ui';
import { object2class, numFormat } from 'lew-ui/utils';
import { UseVirtualList } from '@vueuse/components';
import { selectProps, SelectOptions } from './props';

const props = defineProps(selectProps);
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'clear']);
const selectValue = useVModel(props, 'modelValue', emit);

const lewSelectRef = ref();
const lewPopverRef = ref();
const searchInputRef = ref();

const state = reactive({
    selectWidth: 0,
    visible: false,
    loading: false,
    options: props.options,
    keyword: '',
});

const getSelectWidth = () => {
    state.selectWidth = lewSelectRef.value?.clientWidth - 14;
    if (props.searchable) {
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
    selectValue.value = '';
    emit('clear');
    emit('change');
};

const selectHandle = (item: SelectOptions) => {
    if (item.disabled) {
        return;
    }
    selectValue.value = item.value;
    emit('change', item.value);
    hide();
};

const getChecked = computed(() => (value: string | number) => {
    return selectValue.value === value;
});

const getValueStyle = computed(() => {
    return state.visible ? 'opacity:0.4' : '';
});

const getLabel = computed(() => {
    if (state.options) {
        const option = state.options.find((e: any) => {
            if (e) {
                return e.value === selectValue.value;
            }
        });

        if (option && JSON.stringify(option) !== '{}') {
            return option.label;
        }
    }

    return props.defaultValue || props.modelValue;
});

const getSelectClassName = computed(() => {
    let { clearable, size, align } = props;
    clearable = clearable ? !!selectValue.value : false;
    return object2class('lew-select', { clearable, size, align });
});

const getBodyClassName = computed(() => {
    const { size, disabled } = props;
    return object2class('lew-select-body', { size, disabled });
});

const getSelectViewClassName = computed(() => {
    const { disabled, readonly } = props;
    const focus = state.visible;
    return object2class('lew-select-view', { focus, disabled, readonly });
});

const getSelectItemClassName = (e: any) => {
    const { disabled } = e;
    const active = getChecked.value(e.value);
    const { align } = props;

    return object2class('lew-select-item', {
        disabled,
        align,
        active,
    });
};

const getVirtualHeight = computed(() => {
    let height = state.options.length * props.itemHeight;
    height = height >= 240 ? 240 : height;
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
    getSelectWidth();
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
    <lew-popover ref="lewPopverRef" class="lew-select-view" :class="getSelectViewClassName" :trigger="trigger"
        :disabled="disabled" placement="bottom-start" style="width: 100%" :loading="state.loading" @show="showHandle"
        @hide="hideHandle">
        <template #trigger>
            <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
                <lew-icon :size="getIconSize" type="chevron-down" class="icon-select"
                    :class="{ 'icon-select-hide': clearable && getLabel }" />
                <transition name="lew-form-icon-ani">
                    <lew-icon v-if="clearable && getLabel" :size="getIconSize" type="x" v-tooltip="{
                        content: '清空',
                        placement: 'top',
                    }" class="lew-form-icon-clear" @click.stop="clearHandle" />
                </transition>
                <div v-show="getLabel" :style="getValueStyle" class="value">
                    {{ getLabel }}
                </div>
                <div v-show="!getLabel" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div class="lew-select-body" :class="getBodyClassName" :style="`width:${state.selectWidth}px`">
                <slot name="header"></slot>
                <div v-if="searchable" class="search-input">
                    <input ref="searchInputRef" v-model="state.keyword" placeholder="输入搜索关键词" @input="searchDebounce" />
                </div>
                <div class="lew-select-options-box">
                    <lew-flex v-show="state.options && state.options.length === 0" direction="y" class="not-found">
                        <lew-icon type="box" size="30" />
                        <span>暂无结果</span>
                    </lew-flex>
                    <div v-if="searchable &&
                        state.options &&
                        state.options.length > 0
                        " class="reslut-count">
                        共
                        {{ numFormat(state.options && state.options.length) }}
                        条结果
                    </div>

                    <use-virtual-list v-if="state.options.length > 0" class="lew-select-options-list lew-scrollbar"
                        :list="state.options" :options="{
                            itemHeight: 30,
                        }" :height="getVirtualHeight">
                        <template #="props">
                            <!-- you can get current item of list here -->
                            <label @click="selectHandle(props.data)">
                                <div v-if="!labelSlot" class="lew-select-item" :class="getSelectItemClassName(props.data)"
                                    :style="{ height: itemHeight + 'px' }">
                                    <div class="lew-select-label">
                                        {{ props.data.label }}
                                    </div>
                                    <lew-icon v-if="getChecked(props.data.value) &&
                                        showCheckIcon
                                        " class="icon-check" size="14" type="check" />
                                </div>
                                <div v-else class="lew-select-slot-item" :style="{ height: itemHeight + 'px' }">
                                    <slot name="label" :item="props.data" :checked="getChecked(props.data.value)" />
                                </div>
                            </label>
                        </template>
                    </use-virtual-list>
                </div>
                <slot name="footer"></slot>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
.lew-select-view {
    width: 100%;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: all 0.15s ease;
    box-sizing: border-box;
    outline: 0px var(--lew-color-primary-light) solid;
    border: var(--lew-form-border-width) transparent solid;
    box-shadow: var(--lew-form-box-shadow);

    >div {
        width: 100%;
    }

    .lew-select {
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;

        .icon-select {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%) rotate(0deg);
            transition: var(--lew-form-transition);
        }

        .icon-select {
            opacity: var(--lew-form-icon-opacity);
        }

        .icon-select-hide {
            opacity: 0;
            transform: translate(100%, -50%);
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

    .lew-select-align-left {
        text-align: left;
    }

    .lew-select-align-center {
        text-align: center;
    }

    .lew-select-align-right {
        text-align: right;
    }

    .lew-select-placeholder {
        color: rgb(165, 165, 165);
    }

    .lew-select-size-small {

        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-small);
            height: var(--lew-form-item-height-small);
            line-height: var(--lew-form-input-line-height-small);
            font-size: var(--lew-form-font-size-small);
        }
    }

    .lew-select-size-medium {

        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-medium);
            line-height: var(--lew-form-input-line-height-medium);
            height: var(--lew-form-item-height-medium);
            font-size: var(--lew-form-font-size-medium);
        }
    }

    .lew-select-size-large {

        .value,
        .placeholder {
            padding: var(--lew-form-input-padding-large);
            height: var(--lew-form-item-height-large);
            line-height: var(--lew-form-input-line-height-large);
            font-size: var(--lew-form-font-size-large);
        }
    }
}

.lew-select-view:hover {
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-select-view:active {
    background-color: var(--lew-form-bgcolor-active);
}

.lew-select-view.lew-select-view-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
    outline: var(--lew-form-ouline);

    .icon-select {
        transform: translateY(-50%) rotate(180deg);
        color: var(--lew-text-color-2);
    }

    .icon-select-hide {
        opacity: 0;
        transform: translate(100%, -50%) rotate(180deg);
    }
}

.lew-select-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}

.lew-select-view-readonly {
    pointer-events: none; //鼠标点击不可修改

    .lew-select {
        user-select: text;
    }
}

.lew-select-view-disabled:hover {
    background-color: var(--lew-form-bgcolor);
    outline: 0px var(--lew-color-primary-light) solid;
    border: var(--lew-form-border-width) transparent solid;
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
            background-color: var(--lew-bgcolor-3) !important;
        }
    }

    .not-found {
        padding: 50px 0px;
        opacity: 0.4;
        min-height: 268px;
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
            color: var(--lew-text-color-2);
            box-sizing: border-box;
            border-radius: 6px;
        }

        .lew-select-item-disabled {
            opacity: 0.3;
            cursor: no-drop;
        }

        .lew-select-item-align-left {
            text-align: left;
        }

        .lew-select-item-align-center {
            text-align: center;
        }

        .lew-select-item-align-right {
            text-align: right;
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

        .lew-select-slot-item {
            border-radius: 6px;
        }

        .lew-select-slot-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-form-bgcolor);
        }

        .lew-select-item-active {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);

            .icon-check {
                margin-right: 10px;
            }
        }

        .lew-select-item-active:hover {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-form-bgcolor);
        }
    }
}
</style>
