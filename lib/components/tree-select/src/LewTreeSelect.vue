<script setup lang="ts">
    import { useVModel } from '@vueuse/core';
    import { LewPopover, LewFlex, LewButton, LewIcon, LewTooltip } from 'lew-ui';
    import { object2class } from 'lew-ui/utils';
    import { treeSelectProps, TreeSelectOptions } from './props';
    import { UseVirtualList } from '@vueuse/components';
    import _ from 'lodash';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(LewTooltip);
    }

    const props = defineProps(treeSelectProps);
    const emit = defineEmits(['update:modelValue', 'change', 'blur', 'clear']);
    const treeSelectValue = useVModel(props, 'modelValue', emit);

    const lewTreeSelectRef = ref();
    const lewPopverRef = ref();

    const state = reactive({
        visible: false,
        loading: false,
        okLoading: false,
        optionsGroup: [] as TreeSelectOptions[][], // 分组
        optionsTree: [] as any, // 树
        activelabels: [] as string[], // 激活
        tobelabels: [] as string[], // 待确认
        tobeItem: {} as TreeSelectOptions,
        keyword: ''
    });

    // 格式化 获取 path
    const formatPathsToTreeList = (
        treeList: TreeSelectOptions[],
        parentValuePaths = [],
        parentLabelPaths = []
    ) => {
        treeList.forEach((tree) => {
            const { value, label, children = [], isLeaf } = tree;
            const valuePaths: any = [...parentValuePaths, value];
            const labelPaths: any = [...parentLabelPaths, label];
            tree.valuePaths = valuePaths;
            tree.labelPaths = labelPaths;
            tree.parentValuePaths = parentValuePaths;
            tree.parentLabelPaths = parentLabelPaths;
            tree.level = valuePaths.length - 1;
            if (!isLeaf) {
                tree.parentChildren = children;
                formatPathsToTreeList(children, valuePaths, labelPaths);
            }
        });
    };
    // 通过值获取对象
    const findObjectByValue = (treeList: TreeSelectOptions[], value: [string, number]) => {
        for (let i = 0; i < treeList.length; i++) {
            const tree = treeList[i];
            if (tree.value === value) {
                return tree;
            }
            if (tree.children) {
                const foundObject: TreeSelectOptions = findObjectByValue(
                    tree.children,
                    value
                ) as TreeSelectOptions;
                if (foundObject) {
                    return foundObject;
                }
            }
        }
        return null;
    };
    // 通过值添加子集
    function findAndAddChildrenByValue(
        tree: TreeSelectOptions[],
        value: [string, number],
        children: TreeSelectOptions[]
    ): TreeSelectOptions[] {
        for (const node of tree) {
            if (node.value === value) {
                if (!node.children) {
                    node.children = [];
                }
                node.children = children;
                return tree;
            }
            if (node.children && node.children.length > 0) {
                const result = findAndAddChildrenByValue(node.children, value, children);
                if (result && result.length > 0) {
                    return tree;
                }
            }
        }

        return [];
    }
    // 通过值查找子集
    function findChildrenByValue(
        tree: TreeSelectOptions[],
        value: [string, number]
    ): TreeSelectOptions[] {
        for (const node of tree) {
            if (node.value === value) {
                return node.children || [];
            }

            if (node.children && node.children.length > 0) {
                const result = findChildrenByValue(node.children, value);
                if (result && result.length > 0) {
                    return result;
                }
            }
        }

        return [];
    }

    // 初始化
    const init = async () => {
        let _optionsTree: any = [[]];
        if (props.onload) {
            state.loading = true;
            _optionsTree = (await props.onload()) || [];
            state.loading = false;
        } else if (props.options && props.options.length > 0) {
            _optionsTree =
                (props.options &&
                    props.options.map((e) => {
                        return {
                            ...e,
                            isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
                        };
                    })) ||
                [];
        }
        formatPathsToTreeList(_optionsTree);
        state.optionsGroup = [_optionsTree];
        state.optionsTree = _optionsTree;
    };

    init();

    // 选择
    const selectItem = async (item: TreeSelectOptions, level: number) => {
        if (!item.isLeaf && item.labelPaths !== state.activelabels) {
            state.optionsGroup = state.optionsGroup.slice(0, level + 1);
            if (props.onload && !item.isLeaf) {
                item.loading = true;
                state.okLoading = true;
                const new_options = (await props.onload(_.cloneDeep({ ...item, level }))) || [];
                let _optionsTree = findAndAddChildrenByValue(
                    _.cloneDeep(state.optionsTree),
                    _.cloneDeep(item.value),
                    new_options
                );
                formatPathsToTreeList(_optionsTree);
                state.optionsTree = _optionsTree;
                const _options = findChildrenByValue(_optionsTree, item.value);
                state.optionsGroup.push(_options);
                item.loading = false;
                state.okLoading = false;
            } else if (!item.isLeaf) {
                const _options =
                    (item.children &&
                        item.children.map((e) => {
                            return {
                                ...e,
                                isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
                            };
                        })) ||
                    [];
                state.optionsGroup.push(_options);
            }
        }
        if (item.labelPaths === state.activelabels) {
            state.activelabels = item.parentLabelPaths as string[];
            if (level < state.optionsGroup.length - 1) {
                state.optionsGroup.pop();
            }
        } else {
            state.activelabels = item.labelPaths as string[];
        }
        state.tobeItem = { ...item, children: undefined };
        if (props.free) {
            checkItem(item);
        } else if (item.isLeaf) {
            checkItem(item);
            ok();
        }
    };

    // 检查Item
    const checkItem = (item: TreeSelectOptions) => {
        if (props.showAllLevels) {
            if (state.tobelabels === item.labelPaths) {
                state.tobelabels = item.parentLabelPaths as string[];
            } else {
                state.tobelabels = item.labelPaths as string[];
            }
        } else if (state.tobelabels[0] === (item.label as string)) {
            state.tobelabels = [] as string[];
        } else {
            state.tobelabels = [item.label] as any;
        }
    };

    const show = async () => {
        lewPopverRef.value.show();
    };

    const hide = () => {
        lewPopverRef.value.hide();
    };

    const clearHandle = () => {
        treeSelectValue.value = undefined;
        state.tobelabels = [];
        state.activelabels = [];
        hide();
        init();
        emit('clear');
        emit('change');
    };

    const getValueStyle = computed(() => {
        return state.visible ? 'opacity:0.4' : '';
    });

    const getTreeSelectClassName = computed(() => {
        let { clearable, size } = props;
        clearable = clearable ? !!treeSelectValue.value : false;
        return object2class('lew-treeSelect', { clearable, size });
    });

    const getBodyClassName = computed(() => {
        const { size, disabled } = props;
        return object2class('lew-treeSelect-body', { size, disabled });
    });

    const getTreeSelectViewClassName = computed(() => {
        const { disabled, readonly } = props;
        const focus = state.visible;
        return object2class('lew-treeSelect-view', { focus, disabled, readonly });
    });

    // 获取图标大小
    const getIconSize = computed(() => {
        const size: Record<string, number> = {
            small: 13,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    // 展示
    const showHandle = () => {
        state.visible = true;
    };

    // 隐藏
    const hideHandle = () => {
        state.visible = false;
        if (!treeSelectValue.value) {
            state.tobelabels = [];
            state.activelabels = [];
            state.optionsGroup = [state.optionsGroup[0]];
        }
        emit('blur');
    };

    // 获取宽度
    const getTreeSelectWidth = computed(() => {
        const _hasChildOptions = state.optionsGroup.filter((e) => e && e.length > 0).length;
        if (_hasChildOptions > 1) {
            return _hasChildOptions * 180;
        }
        return _hasChildOptions * 180;
    });

    const getLabel = computed(() => {
        const item = findObjectByValue(state.optionsTree, treeSelectValue.value);
        return item?.labelPaths || [];
    });

    const ok = () => {
        const item = findObjectByValue(state.optionsTree, state.tobeItem.value);
        treeSelectValue.value = state.tobeItem.value;
        emit('change', _.cloneDeep(item));
        hide();
    };

    const cancel = () => {
        treeSelectValue.value = '';
        state.tobelabels = [];
        state.activelabels = [];
        hide();
    };

    defineExpose({ show, hide });
</script>

<template>
    <lew-popover
        ref="lewPopverRef"
        class="lew-treeSelect-view"
        :class="getTreeSelectViewClassName"
        :trigger="trigger"
        :disabled="disabled"
        placement="bottom-start"
        style="width: 100%"
        :offset="[-1, 10]"
        :loading="state.loading"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div ref="lewTreeSelectRef" class="lew-treeSelect" :class="getTreeSelectClassName">
                <transition name="lew-form-icon-ani">
                    <lew-icon
                        v-if="!(clearable && getLabel && getLabel.length > 0)"
                        :size="getIconSize"
                        type="chevron-down"
                        class="icon-treeSelect"
                    />
                </transition>

                <transition name="lew-form-icon-ani">
                    <lew-icon
                        v-if="clearable && getLabel && getLabel.length > 0 && !readonly"
                        :size="getIconSize"
                        type="x"
                        class="lew-form-icon-clear"
                        :class="{
                            'lew-form-icon-clear-focus': state.visible
                        }"
                        @click.stop="clearHandle"
                    />
                </transition>

                <div v-show="getLabel && getLabel.length > 0" :style="getValueStyle" class="value">
                    <template v-if="showAllLevels">
                        <span v-for="(item, index) in getLabel" :key="index">
                            {{ item }}
                            <svg
                                v-if="getLabel && index !== getLabel.length - 1"
                                :style="{
                                    width: getIconSize,
                                    height: getIconSize
                                }"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="currentColor"
                                stroke-width="4"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                            >
                                <path d="M29.506 6.502 18.493 41.498" data-v-5303b0ef=""></path>
                            </svg>
                        </span>
                    </template>
                    <template v-else-if="getLabel">
                        <span>{{ getLabel[getLabel.length - 1] }}</span>
                    </template>
                </div>
                <div v-show="!getLabel || (getLabel && getLabel.length === 0)" class="placeholder">
                    {{ placeholder }}
                </div>
            </div>
        </template>
        <template #popover-body>
            <div
                class="lew-treeSelect-body"
                :style="{
                    width: `${getTreeSelectWidth}px`
                }"
                :class="getBodyClassName"
            >
                <slot name="header"></slot>
                <div class="lew-treeSelect-options-box">
                    <template v-for="(oItem, oIndex) in state.optionsGroup" :key="oIndex">
                        <use-virtual-list
                            v-if="oItem.length > 0"
                            class="lew-treeSelect-item-warpper lew-scrollbar-hover"
                            :list="oItem"
                            :options="{
                                itemHeight: 30
                            }"
                            :height="30 * oItem.length"
                            :style="{
                                zIndex: 20 - oIndex,
                                transform: oItem.length > 0 ? `translateX(${180 * oIndex}px)` : ''
                            }"
                        >
                            <template #default="{ data: templateProps }">
                                <div class="lew-treeSelect-item-padding">
                                    <div
                                        class="lew-treeSelect-item"
                                        :class="{
                                            'lew-treeSelect-item-disabled': templateProps.disabled,
                                            'lew-treeSelect-item-hover':
                                                state.activelabels.includes(templateProps.label),
                                            'lew-treeSelect-item-active': free
                                                ? state.activelabels.includes(
                                                      templateProps.label
                                                  ) &&
                                                  state.tobelabels.includes(templateProps.label)
                                                : state.activelabels.includes(templateProps.label),
                                            'lew-treeSelect-item-tobe': state.tobelabels.includes(
                                                templateProps.label
                                            ),
                                            'lew-treeSelect-item-select':
                                                getLabel && getLabel.includes(templateProps.label)
                                        }"
                                        @click="selectItem(templateProps, oIndex)"
                                    >
                                        <lew-checkbox
                                            v-if="free"
                                            class="lew-treeSelect-checkbox"
                                            :checked="
                                                state.tobelabels.includes(templateProps.label)
                                            "
                                        />
                                        <div
                                            class="lew-treeSelect-label"
                                            :class="{
                                                'lew-treeSelect-label-free': free
                                            }"
                                        >
                                            {{ templateProps.label }}
                                        </div>
                                        <lew-icon
                                            v-if="templateProps.loading"
                                            size="14px"
                                            animation="spin"
                                            animation-speed="fast"
                                            class="lew-treeSelect-loading-icon"
                                            type="loader"
                                        />
                                        <lew-icon
                                            v-else-if="!templateProps.isLeaf"
                                            size="14px"
                                            class="lew-treeSelect-icon"
                                            type="chevron-right"
                                        />
                                    </div>
                                </div>
                            </template>
                        </use-virtual-list>
                    </template>
                </div>
                <lew-flex v-if="free" x="end" class="lew-treeSelect-control">
                    <lew-button round color="normal" type="text" size="small" @click="cancel"
                        >取消</lew-button
                    >
                    <lew-button
                        :disabled="state.okLoading"
                        round
                        type="light"
                        size="small"
                        @click="ok()"
                    >
                        确认
                    </lew-button>
                </lew-flex>
            </div>
        </template>
    </lew-popover>
</template>

<style lang="scss" scoped>
    .lew-treeSelect-view {
        width: 100%;
        border-radius: var(--lew-border-radius-small);
        background-color: var(--lew-form-bgcolor);
        transition: var(--lew-form-transition);
        box-sizing: border-box;
        outline: 0px var(--lew-color-primary-light) solid;
        border: var(--lew-form-border-width) transparent solid;
        box-shadow: var(--lew-form-box-shadow);

        > div {
            width: 100%;
        }

        .lew-treeSelect {
            position: relative;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            user-select: none;
            box-sizing: border-box;

            .icon-treeSelect {
                position: absolute;
                top: 50%;
                right: 7px;
                transform: translateY(-50%) rotate(0deg);
                transition: var(--lew-form-transition);
            }

            .icon-treeSelect {
                opacity: var(--lew-form-icon-opacity);
            }

            .icon-treeSelect-hide {
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
                transition: var(--lew-form-transition);
                gap: 2px;

                span {
                    display: inline-flex;
                    gap: 2px;
                    align-items: center;

                    svg {
                        opacity: 0.4;
                    }
                }
            }
        }

        .lew-treeSelect-align-left {
            text-align: left;
        }

        .lew-treeSelect-align-center {
            text-align: center;
        }

        .lew-treeSelect-align-right {
            text-align: right;
        }

        .lew-treeSelect-placeholder {
            color: rgb(165, 165, 165);
        }

        .lew-treeSelect-size-small {
            .value,
            .placeholder {
                padding: var(--lew-form-input-padding-small);
                height: var(--lew-form-item-height-small);
                line-height: var(--lew-form-input-line-height-small);
                font-size: var(--lew-form-font-size-small);
            }
        }

        .lew-treeSelect-size-medium {
            .value,
            .placeholder {
                padding: var(--lew-form-input-padding-medium);
                line-height: var(--lew-form-input-line-height-medium);
                height: var(--lew-form-item-height-medium);
                font-size: var(--lew-form-font-size-medium);
            }
        }

        .lew-treeSelect-size-large {
            .value,
            .placeholder {
                padding: var(--lew-form-input-padding-large);
                height: var(--lew-form-item-height-large);
                line-height: var(--lew-form-input-line-height-large);
                font-size: var(--lew-form-font-size-large);
            }
        }
    }

    .lew-treeSelect-view:hover {
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-treeSelect-view:active {
        background-color: var(--lew-form-bgcolor-active);
    }

    .lew-treeSelect-view.lew-treeSelect-view-focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
        outline: var(--lew-form-ouline);

        .icon-treeSelect {
            transform: translateY(-50%) rotate(180deg);
            color: var(--lew-text-color-2);
        }

        .icon-treeSelect-hide {
            opacity: 0;
            transform: translate(100%, -50%) rotate(180deg);
        }
    }

    .lew-treeSelect-view-disabled {
        opacity: var(--lew-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .lew-treeSelect-view-readonly {
        pointer-events: none; //鼠标点击不可修改

        .lew-treeSelect {
            user-select: text;
        }
    }

    .lew-treeSelect-view-disabled:hover {
        background-color: var(--lew-form-bgcolor);
        outline: 0px var(--lew-color-primary-light) solid;
        border: var(--lew-form-border-width) transparent solid;
    }
</style>
<style lang="scss">
    .lew-treeSelect-body {
        width: 100%;
        box-sizing: border-box;
        min-width: 180px;
        height: 280px;
        overflow: hidden;
        transition: var(--lew-form-transition);
        user-select: none;

        .search-input {
            margin-bottom: 5px;

            input {
                outline: none;
                border: none;
                background-color: var(--lew-bgcolor-1);
                width: 100%;
                height: 30px;
                border-radius: var(--lew-border-radius-small);
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
            opacity: 0.4;
        }

        .reslut-count {
            padding-left: 8px;
            margin: 5px 0px;
            opacity: 0.4;
            font-size: 13px;
        }

        .lew-treeSelect-options-box {
            position: relative;
            display: flex;
            box-sizing: border-box;

            .lew-treeSelect-item-warpper {
                position: absolute;
                left: 0px;
                top: 0px;
                overflow-y: scroll;
                height: 100%;
                width: 180px;
                padding-left: 5px;
                border-right: var(--lew-popover-border);
                padding: 5px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 4px;
                margin-top: -2px;
            }

            .lew-treeSelect-item-warpper:last-child {
                border-right: 0px transparent solid;
            }
            .lew-treeSelect-item-padding {
                padding: 2px 0px;
            }
            .lew-treeSelect-item {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 10px;
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
                flex-shrink: 0;

                .lew-treeSelect-icon {
                    position: absolute;
                    right: 2px;
                    top: 8.5px;
                    opacity: 0.4;
                }
                .lew-treeSelect-loading-icon {
                    position: absolute;
                    right: 5px;
                    top: 8.5px;
                }
                .lew-treeSelect-checkbox {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: -9;
                }

                .lew-treeSelect-label {
                    position: relative;
                    z-index: 5;
                    width: 100%;
                    user-select: none;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    box-sizing: border-box;
                }

                .lew-treeSelect-label-free {
                    padding: 0px 8px 0px 25px;
                }
            }

            .lew-treeSelect-item:hover {
                .icon {
                    opacity: 1;
                }
            }

            .lew-treeSelect-item-disabled {
                opacity: 0.3;
                pointer-events: none;
            }

            .lew-treeSelect-item-align-left {
                text-align: left;
            }

            .lew-treeSelect-item-align-center {
                text-align: center;
            }

            .lew-treeSelect-item-align-right {
                text-align: right;
            }

            .lew-treeSelect-item:hover {
                color: var(--lew-text-color-0);
                background-color: var(--lew-backdrop-bg-active);
            }

            .lew-treeSelect-slot-item {
                border-radius: 6px;
            }

            .lew-treeSelect-slot-item:hover {
                color: var(--lew-text-color-0);
                background-color: var(--lew-backdrop-bg-active);
            }

            .lew-treeSelect-item-hover {
                background-color: var(--lew-backdrop-bg-active);
                .icon-check {
                    margin-right: 10px;
                }
            }
            .lew-treeSelect-item-active {
                color: var(--lew-color-primary-dark);
                font-weight: bold;

                .icon-check {
                    margin-right: 10px;
                }
            }

            .lew-treeSelect-item-active:hover {
                color: var(--lew-color-primary-dark);
                font-weight: bold;
            }
        }

        .lew-treeSelect-control {
            border-top: 1px solid var(--lew-bgcolor-4);
            height: 40px;
            padding-right: 10px;
        }
    }

    .lew-treeSelect-item:hover {
        .lew-checkbox {
            .icon-checkbox-box {
                border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
                outline: var(--lew-form-ouline);
                background: var(--lew-form-bgcolor);
            }
        }
    }

    .lew-treeSelect-item-tobe:hover {
        .lew-checkbox {
            .icon-checkbox-box {
                border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
                background: var(--lew-checkbox-color);

                .icon-checkbox {
                    transform: translate(-50%, -50%) rotate(0deg) scale(1);
                    opacity: 1;
                }
            }
        }
    }

    .lew-treeSelect-item-select:hover {
        .lew-checkbox {
            .icon-checkbox-box {
                border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
                background: var(--lew-checkbox-color);

                .icon-checkbox {
                    transform: translate(-50%, -50%) rotate(0deg) scale(1);
                    opacity: 1;
                }
            }
        }
    }
</style>
