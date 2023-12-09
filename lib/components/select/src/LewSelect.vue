<script setup lang="ts">
import { useVModel, useDebounceFn } from '@vueuse/core';
import { LewPopover, LewFlex, LewIcon, LewTooltip } from 'lew-ui';
import { object2class, numFormat } from 'lew-ui/utils';
import { UseVirtualList } from '@vueuse/components';
import { selectProps, SelectOptions } from './props';

// 获取app
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive('tooltip')) {
    app.use(LewTooltip);
}
const props = defineProps(selectProps);
const emit = defineEmits(['update:modelValue', 'change', 'blur', 'clear']);
const selectValue = useVModel(props, 'modelValue', emit);

const lewSelectRef = ref();
const lewPopverRef = ref();
const searchInputRef = ref();

const state = reactive({
    selectWidth: 0,
    itemHeight: 34,
    visible: false,
    loading: false,
    options: props.options,
    keyword: '',
});

const getSelectWidth = () => {
    state.selectWidth = lewSelectRef.value?.clientWidth - 12;
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

const getIconSize = computed(() => {
    const size: any = {
        small: 13,
        medium: 14,
        large: 16,
    };
    return size[props.size];
});

const getVirtualHeight = computed(() => {
    let height = state.options.length * state.itemHeight;
    height = height >= 240 ? 240 : height;
    return `${height}px`;
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
    <lew-popover
        ref="lewPopverRef"
        popover-body-class-name="lew-select-popover-body"
        class="lew-select-view"
        :class="getSelectViewClassName"
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
                ref="lewSelectRef"
                class="lew-select"
                :class="getSelectClassName"
            >
                <lew-icon
                    :size="getIconSize"
                    type="chevron-down"
                    class="icon-select"
                    :class="{ 'icon-select-hide': clearable && getLabel }"
                />
                <transition name="lew-form-icon-ani">
                    <lew-icon
                        v-if="clearable && getLabel && !readonly"
                        v-tooltip="{
                            content: '清空',
                            placement: 'top',
                        }"
                        :size="getIconSize"
                        type="x"
                        class="lew-form-icon-clear"
                        :class="{
                            'lew-form-icon-clear-focus': state.visible,
                        }"
                        @click.stop="clearHandle"
                    />
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
            <div
                class="lew-select-body"
                :class="getBodyClassName"
                :style="`width:${state.selectWidth}px`"
            >
                <slot name="header"></slot>
                <div v-if="searchable" class="search-input">
                    <input
                        ref="searchInputRef"
                        v-model="state.keyword"
                        placeholder="输入搜索关键词"
                        @input="searchDebounce"
                    />
                </div>
                <div class="lew-select-options-box">
                    <lew-flex
                        v-show="state.options && state.options.length === 0"
                        direction="y"
                        class="not-found"
                    >
                       <svg height="300" node-id="1" sillyvg="true" template-height="300" template-width="500" version="1.1" viewBox="0 0 500 300" width="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs node-id="33"><linearGradient gradientUnits="userSpaceOnUse" id="未命名的渐变_50" node-id="5" spreadMethod="pad" x1="250" x2="250" y1="284.22" y2="191.22"><stop offset="0" stop-color="#fff9ef" stop-opacity="0"/><stop offset="0.17" stop-color="#fef8ef" stop-opacity="0.02"/><stop offset="0.32" stop-color="#fbf5ee" stop-opacity="0.06"/><stop offset="0.46" stop-color="#f5f1ec" stop-opacity="0.14"/><stop offset="0.6" stop-color="#edebea" stop-opacity="0.26"/><stop offset="0.74" stop-color="#e3e2e7" stop-opacity="0.4"/><stop offset="0.87" stop-color="#d6d8e4" stop-opacity="0.58"/><stop offset="0.99" stop-color="#c8cde0" stop-opacity="0.79"/><stop offset="1" stop-color="#c7cce0" stop-opacity="0.8"/></linearGradient></defs><g node-id="90"><path d="M 84.43 162.78 C 80.94 160.49 73.35 153.53 72.88 151.55 L 73.24 151.46 C 73.24 151.46 73.24 149.69 72.87 149.69 C 72.50 149.69 60.55 152.49 60.55 152.49 L 61.05 154.49 L 61.29 154.43 C 59.79 157.24 55.19 166.09 54.95 169.60 L 54.67 173.80 C 55.78 173.29 57.02 173.13 58.22 173.33 C 60.09 173.70 62.14 177.33 70.22 173.80 C 71.51 173.39 72.88 173.27 74.22 173.43 C 76.93 173.62 77.95 170.82 80.38 170.82 C 82.81 170.82 83.93 170.45 84.76 169.61 C 85.59 168.77 86.91 168.77 87.65 167.84 C 88.39 166.91 88.00 165.11 84.43 162.78 Z" fill="#c7cce0" fill-opacity="0.8" fill-rule="nonzero" group-id="1" node-id="58" stroke="none" target-height="27.64" target-width="33.72" target-x="54.67" target-y="149.69"/><path d="M 83.82 162.78 C 80.33 160.49 72.74 153.53 72.27 151.55 L 72.63 151.46 C 72.63 151.46 72.63 149.69 72.26 149.69 C 71.89 149.69 59.94 152.49 59.94 152.49 L 60.44 154.49 L 60.68 154.43 C 59.18 157.24 54.58 166.09 54.34 169.60 L 54.06 173.80 C 55.17 173.29 56.41 173.13 57.61 173.33 C 59.48 173.70 61.53 177.33 69.61 173.80 C 70.90 173.39 72.27 173.27 73.61 173.43 C 76.32 173.62 77.34 170.82 79.77 170.82 C 82.20 170.82 83.32 170.45 84.15 169.61 C 84.98 168.77 86.30 168.77 87.04 167.84 C 87.78 166.91 87.37 165.11 83.82 162.78 Z" fill="#e2e4ed" fill-opacity="0.8" fill-rule="nonzero" group-id="1" node-id="60" stroke="none" target-height="27.64" target-width="33.719997" target-x="54.06" target-y="149.69"/></g><g node-id="91"><path d="M 362.56 64.21 L 365.00 65.40 C 365.00 65.40 360.73 70.94 363.75 73.16 C 366.77 75.38 369.97 75.79 373.14 69.55 L 375.39 70.55 C 375.39 70.55 367.16 88.95 367.10 91.21 C 363.65 90.68 360.31 89.62 357.19 88.07 C 354.86 86.92 352.62 85.60 350.47 84.14 Z" fill="#c7cce0" fill-opacity="0.8" fill-rule="nonzero" group-id="2" node-id="65" stroke="none" target-height="27" target-width="24.920013" target-x="350.47" target-y="64.21"/><path d="M 362.13 63.59 L 364.55 64.78 C 364.55 64.78 360.28 70.32 363.30 72.54 C 366.32 74.76 369.52 75.17 372.69 68.93 L 374.94 69.93 C 374.94 69.93 366.71 88.33 366.65 90.59 C 363.20 90.06 359.86 89.00 356.74 87.45 C 354.41 86.29 352.15 84.97 350.00 83.50 Z" fill="#e2e4ed" fill-opacity="0.8" fill-rule="nonzero" group-id="2" node-id="67" stroke="none" target-height="26.999996" target-width="24.940002" target-x="350" target-y="63.59"/></g><g node-id="92"><path d="M 103.74 87.82 L 112.21 78.29 L 115.01 76.72 C 115.01 76.72 116.76 80.19 121.55 77.44 C 126.34 74.69 124.55 71.34 124.55 71.34 L 129.06 71.20 L 140.06 72.79 C 140.06 72.79 140.54 80.08 140.06 80.23 C 139.58 80.38 133.06 79.96 133.06 79.96 C 133.06 79.96 140.85 98.32 140.60 98.33 C 140.35 98.34 121.00 106.00 120.92 105.88 C 120.84 105.76 115.92 88.39 115.92 88.39 L 110.58 93.84 Z" fill="#c7cce0" fill-opacity="0.8" fill-rule="nonzero" group-id="3" node-id="72" stroke="none" target-height="34.800003" target-width="37.11001" target-x="103.74" target-y="71.2"/><path d="M 102.79 87.55 L 111.25 78.00 L 114.05 76.43 C 114.05 76.43 115.80 79.90 120.59 77.15 C 125.38 74.40 123.59 71.05 123.59 71.05 L 128.10 70.91 L 139.10 72.50 C 139.10 72.50 139.58 79.79 139.10 79.94 C 138.62 80.09 132.10 79.67 132.10 79.67 C 132.10 79.67 139.89 98.03 139.64 98.04 C 139.39 98.05 120.00 105.75 120.00 105.61 C 120.00 105.47 115.00 88.12 115.00 88.12 L 109.66 93.57 Z" fill="#e2e4ed" fill-opacity="0.8" fill-rule="nonzero" group-id="3" node-id="74" stroke="none" target-height="34.839996" target-width="37.1" target-x="102.79" target-y="70.91"/></g><g node-id="93"><path d="M 400.93 141.92 C 401.09 141.78 415.93 133.92 416.64 133.92 C 416.64 133.92 420.91 139.43 421.64 140.56 C 422.37 141.69 423.38 142.96 423.38 142.96 L 416.80 148.54 L 413.07 145.86 L 413.63 150.56 L 405.21 153.84 Z" fill="#c7cce0" fill-opacity="0.8" fill-rule="nonzero" group-id="4" node-id="79" stroke="none" target-height="19.919998" target-width="22.450012" target-x="400.93" target-y="133.92"/><path d="M 400.52 141.94 C 400.68 141.80 415.52 133.94 416.23 133.94 C 416.23 133.94 420.50 139.45 421.23 140.58 C 421.96 141.71 422.97 142.98 422.97 142.98 L 416.39 148.56 L 412.66 145.88 L 413.22 150.58 L 404.80 153.86 Z" fill="#e2e4ed" fill-opacity="0.8" fill-rule="nonzero" group-id="4" node-id="81" stroke="none" target-height="19.919998" target-width="22.450012" target-x="400.52" target-y="133.94"/></g><path d="M 396.00 237.72 C 396.00 263.40 330.63 284.22 250.00 284.22 C 169.37 284.22 104.00 263.40 104.00 237.72 C 104.00 212.04 169.37 191.22 250.00 191.22 C 330.63 191.22 396.00 212.04 396.00 237.72 Z" fill="url(#未命名的渐变_50)" fill-rule="nonzero" node-id="84" stroke="none" target-height="93" target-width="292" target-x="104" target-y="191.22"/><path d="M 290.70 79.27 C 276.25 54.07 244.50 44.72 218.70 58.07 C 192.89 71.43 182.18 102.73 194.41 129.09 C 206.63 155.45 237.45 167.50 264.31 156.43 L 297.69 219.89 C 299.69 223.33 306.36 224.78 310.64 222.03 C 314.03 219.99 315.20 215.63 313.29 212.17 L 276.85 149.17 C 298.34 132.64 304.26 102.75 290.70 79.27 Z M 263.59 140.74 C 249.67 148.78 232.27 147.63 219.52 137.84 C 206.77 128.05 201.17 111.54 205.34 96.01 C 209.51 80.49 222.63 69.00 238.57 66.92 C 254.51 64.83 270.14 72.56 278.16 86.49 C 289.03 105.51 282.52 129.73 263.59 140.74 Z" fill="#c7cce0" fill-rule="nonzero" node-id="86" stroke="none" target-height="180.05843" target-width="133.01683" target-x="182.18364" target-y="44.721577"/><path d="M 287.08 79.27 C 272.63 54.07 240.88 44.72 215.08 58.07 C 189.27 71.43 178.56 102.73 190.79 129.09 C 203.01 155.45 233.83 167.50 260.69 156.43 L 297.13 219.43 C 299.12 222.89 303.55 224.08 307.01 222.09 C 310.47 220.10 311.66 215.67 309.67 212.21 L 273.23 149.21 C 294.74 132.67 300.67 102.76 287.08 79.27 Z M 260.00 140.74 C 246.08 148.78 228.68 147.63 215.93 137.84 C 203.18 128.05 197.58 111.54 201.75 96.01 C 205.92 80.49 219.04 69.00 234.98 66.92 C 250.92 64.83 266.55 72.56 274.57 86.49 C 285.44 105.51 278.93 129.73 260.00 140.74 Z" fill="#e2e4ed" fill-rule="nonzero" node-id="88" stroke="none" target-height="179.36217" target-width="133.10011" target-x="178.56364" target-y="44.721577"/></svg>
                        <span>暂无结果</span>
                    </lew-flex>
                    <div
                        v-if="
                            searchable &&
                            state.options &&
                            state.options.length > 0
                        "
                        class="reslut-count"
                    >
                        共
                        {{ numFormat(state.options && state.options.length) }}
                        条结果
                    </div>
                    <use-virtual-list
                        v-if="state.options.length > 0"
                        :key="getVirtualHeight"
                        class="lew-select-options-list lew-scrollbar"
                        :list="state.options"
                        :options="{
                            itemHeight: 30,
                        }"
                        :height="getVirtualHeight"
                    >
                        <template #="props">
                            <!-- you can get current item of list here -->
                            <label
                                :style="{ height: state.itemHeight + 'px' }"
                                class="lew-select-item-label"
                                @click="selectHandle(props.data)"
                            >
                                <div
                                    v-if="!labelSlot"
                                    class="lew-select-item"
                                    :class="getSelectItemClassName(props.data)"
                                >
                                    <div class="lew-select-label">
                                        {{ props.data.label }}
                                    </div>
                                    <lew-icon
                                        v-if="
                                            getChecked(props.data.value) &&
                                            showCheckIcon
                                        "
                                        class="icon-check"
                                        size="14"
                                        type="check"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="lew-select-slot-item"
                                    :style="{ height: state.itemHeight + 'px' }"
                                >
                                    <slot
                                        name="label"
                                        :item="props.data"
                                        :checked="getChecked(props.data.value)"
                                    />
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

    > div {
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
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
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
.lew-select-popover-body {
    padding: 6px;
}
.lew-select-body {
    width: 100%;
    box-sizing: border-box;

    .search-input {
        margin-bottom: 5px;

        input {
            outline: none;
            border: none;
            background-color: var(--lew-bgcolor-2);
            width: 100%;
            height: 30px;
            border-radius: var(--lew-border-radius);
            padding: 0px 10px;
            box-sizing: border-box;
            color: var(--lew-form-color);
            transition: var(--lew-form-transition);
        }

        input:focus {
            background-color: var(--lew-bgcolor-3);
            box-shadow: var(--lew-box-shadow);
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
        margin-top: -2px;
        margin-bottom: -2px;

        .lew-select-item-label {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px 0px;
            height: 34px;
            overflow: hidden;
            box-sizing: border-box;
        }

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
            height: 30px;
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
            background-color: var(--lew-backdrop-bg-active);
        }

        .lew-select-slot-item {
            border-radius: 6px;
        }

        .lew-select-slot-item:hover {
            color: var(--lew-text-color-0);
            background-color: var(--lew-backdrop-bg-active);
        }

        .lew-select-item-active {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-backdrop-bg-active);

            .icon-check {
                margin-right: 10px;
            }
        }

        .lew-select-item-active:hover {
            color: var(--lew-color-primary-dark);
            font-weight: bold;
            background-color: var(--lew-backdrop-bg-active);
        }
    }
}
</style>
