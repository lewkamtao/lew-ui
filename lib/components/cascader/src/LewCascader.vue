<script setup lang="ts">
    import { LewPopover, LewFlex, LewButton, LewIcon, LewTooltip, LewTextTrim } from 'lew-ui';
    import { object2class } from 'lew-ui/utils';
    import { cascaderProps, CascaderOptions } from './props';
    import { UseVirtualList } from '@vueuse/components';
    import { cloneDeep } from 'lodash-es';

    // 格式化 获取 path
    const formatTree = (
        tree: CascaderOptions[],
        parentValuePaths: String[] = [],
        parentLabelPaths: String[] = []
    ): CascaderOptions[] => {
        return tree.map((node: CascaderOptions) => {
            const { value, label, children = [] } = node;
            const valuePaths: String[] = [...parentValuePaths, value];
            const labelPaths: String[] = [...parentLabelPaths, label];
            const level = valuePaths.length - 1;
            const _node = {
                ...node,
                valuePaths,
                labelPaths,
                level,
                parentValuePaths,
                parentLabelPaths
            };
            if ((children || []).length > 0) {
                return {
                    ..._node,
                    children: formatTree(children, valuePaths, labelPaths)
                };
            }
            return _node;
        }) as CascaderOptions[];
    };

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(LewTooltip);
    }

    const props = defineProps(cascaderProps);
    const emit = defineEmits(['change', 'blur', 'clear']);

    const cascaderValue: Ref<string | number | undefined> = defineModel<
        string | number | undefined
    >({
        default: undefined
    });

    const lewCascaderRef = ref();
    const lewPopverRef = ref();

    const state = reactive({
        visible: false,
        loading: false,
        okLoading: false,
        optionsGroup: [] as CascaderOptions[][], // 分组
        optionsTree: [] as any, // 树
        activelabels: [] as string[], // 激活
        tobelabels: [] as string[], // 待确认
        tobeItem: {} as CascaderOptions,
        keyword: ''
    });

    // 通过值获取对象
    const findObjectByValue = (treeList: CascaderOptions[], value: string) => {
        for (let i = 0; i < treeList.length; i++) {
            const tree = treeList[i];
            if (tree.value === value) {
                return tree;
            }
            if (tree.children) {
                const foundObject: CascaderOptions = findObjectByValue(
                    tree.children,
                    value
                ) as CascaderOptions;
                if (foundObject) {
                    return foundObject;
                }
            }
        }
        return null;
    };
    // 通过值添加子集
    function findAndAddChildrenByValue(
        tree: CascaderOptions[],
        value: string,
        children: CascaderOptions[]
    ): CascaderOptions[] {
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
    function findChildrenByValue(tree: CascaderOptions[], value: string): CascaderOptions[] {
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
        let _tree: CascaderOptions[] = [];
        if (props.onload && !state.loading) {
            state.loading = true;
            _tree = (await props.onload()) || [];
            state.loading = false;
        } else if (props.options && props.options.length > 0) {
            _tree =
                ((props.options &&
                    props.options.map((e: CascaderOptions) => {
                        return {
                            ...e,
                            isLeaf: !e.children || (e.children && e.children.length === 0) // 没有孩子
                        };
                    })) as CascaderOptions[]) || [];
        }
        const __tree: CascaderOptions[] = formatTree(_tree);
        state.optionsGroup = [__tree];
        state.optionsTree = __tree;
    };

    init();

    // 选择
    const selectItem = async (item: CascaderOptions, level: number) => {
        if (!item.isLeaf && item.labelPaths !== state.activelabels) {
            state.optionsGroup = state.optionsGroup.slice(0, level + 1);
            if (props.onload && !item.isLeaf) {
                item.loading = true;
                state.okLoading = true;
                const new_options = (await props.onload(cloneDeep({ ...item, level }))) || [];
                let _tree = findAndAddChildrenByValue(
                    cloneDeep(state.optionsTree),
                    cloneDeep(item.value),
                    new_options
                );
                state.optionsTree = formatTree(_tree);
                const _options = findChildrenByValue(state.optionsTree, item.value);
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
    const checkItem = (item: CascaderOptions) => {
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
        cascaderValue.value = undefined as any;
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

    const getCascaderClassName = computed(() => {
        let { clearable, size } = props;
        clearable = clearable ? !!cascaderValue.value : false;
        return object2class('lew-cascader', { clearable, size });
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

    // 获取图标大小
    const getIconSize = computed(() => {
        const size: Record<string, number> = {
            small: 13,
            medium: 14,
            large: 16
        };
        return size[props.size];
    });

    const getTextTrimOffset = computed(() => {
        switch (props.size) {
            case 'small':
                return [-15, 12];
            case 'medium':
                return [-14, 12];
            case 'large':
                return [-14, 12];
            default:
                return [-14, 12];
        }
    });

    // 展示
    const showHandle = () => {
        state.visible = true;
    };

    // 隐藏
    const hideHandle = () => {
        state.visible = false;
        if (!cascaderValue.value) {
            state.tobelabels = [];
            state.activelabels = [];
            state.optionsGroup = [state.optionsGroup[0]];
        }
        emit('blur');
    };

    // 获取宽度
    const getCascaderWidth = computed(() => {
        const _hasChildOptions = state.optionsGroup.filter((e) => e && e.length > 0).length;
        if (_hasChildOptions > 1) {
            return _hasChildOptions * 180;
        }
        return _hasChildOptions * 180;
    });

    const getLabel = computed(() => {
        const item = findObjectByValue(state.optionsTree, cascaderValue.value as string);
        return item?.labelPaths || [];
    });

    const ok = () => {
        const item = findObjectByValue(state.optionsTree, state.tobeItem.value);
        cascaderValue.value = state.tobeItem.value;
        emit('change', cloneDeep(item));
        hide();
    };

    const cancel = () => {
        cascaderValue.value = '';
        state.tobelabels = [];
        state.activelabels = [];
        hide();
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
        :offset="[-1, 10]"
        :loading="state.loading"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div ref="lewCascaderRef" class="lew-cascader" :class="getCascaderClassName">
                <transition name="lew-form-icon-ani">
                    <lew-icon
                        v-if="!(clearable && getLabel && getLabel.length > 0)"
                        :size="getIconSize"
                        type="chevron-down"
                        class="icon-cascader"
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
                        <lew-text-trim :offset="getTextTrimOffset" :text="getLabel.join(' / ')" />
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
                class="lew-cascader-body"
                :style="{
                    width: `${getCascaderWidth}px`
                }"
                :class="getBodyClassName"
            >
                <slot name="header"></slot>
                <div
                    class="lew-cascader-options-box"
                    :style="{ height: free ? 'calc(100% - 40px)' : '100%' }"
                >
                    <template v-for="(oItem, oIndex) in state.optionsGroup" :key="oIndex">
                        <use-virtual-list
                            v-if="oItem.length > 0"
                            class="lew-cascader-item-warpper lew-scrollbar-hover"
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
                                <div class="lew-cascader-item-padding">
                                    <div
                                        class="lew-cascader-item"
                                        :class="{
                                            'lew-cascader-item-disabled': templateProps.disabled,
                                            'lew-cascader-item-hover': state.activelabels.includes(
                                                templateProps.label
                                            ),
                                            'lew-cascader-item-active': free
                                                ? state.activelabels.includes(
                                                      templateProps.label
                                                  ) &&
                                                  state.tobelabels.includes(templateProps.label)
                                                : state.activelabels.includes(templateProps.label),
                                            'lew-cascader-item-tobe': state.tobelabels.includes(
                                                templateProps.label
                                            ),
                                            'lew-cascader-item-selected':
                                                getLabel && getLabel.includes(templateProps.label)
                                        }"
                                        @click="selectItem(templateProps, oIndex)"
                                    >
                                        <lew-checkbox
                                            v-if="free"
                                            class="lew-cascader-checkbox"
                                            :checked="
                                                state.tobelabels.includes(templateProps.label)
                                            "
                                        />
                                        <div
                                            class="lew-cascader-label"
                                            :class="{
                                                'lew-cascader-label-free': free
                                            }"
                                        >
                                            {{ templateProps.label }}
                                        </div>
                                        <lew-icon
                                            v-if="templateProps.loading"
                                            size="14px"
                                            animation="spin"
                                            animation-speed="fast"
                                            class="lew-cascader-loading-icon"
                                            type="loader"
                                        />
                                        <lew-icon
                                            v-else-if="!templateProps.isLeaf"
                                            size="14px"
                                            class="lew-cascader-icon"
                                            type="chevron-right"
                                        />
                                    </div>
                                </div>
                            </template>
                        </use-virtual-list>
                    </template>
                </div>
                <lew-flex v-if="free" x="end" class="lew-cascader-control">
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
    .lew-cascader-view {
        width: 100%;
        border-radius: var(--lew-border-radius-small);
        background-color: var(--lew-form-bgcolor);
        transition: var(--lew-form-transition);
        box-sizing: border-box;
        outline: 0px var(--lew-color-primary-light) solid;
        border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

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
            user-select: none;
            box-sizing: border-box;

            .icon-cascader {
                position: absolute;
                top: 50%;
                right: 7px;
                transform: translateY(-50%) rotate(0deg);
                transition: var(--lew-form-transition);
            }

            .icon-cascader {
                opacity: var(--lew-form-icon-opacity);
            }

            .icon-cascader-hide {
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
                box-sizing: border-box;
                transition: var(--lew-form-transition);
                gap: 2px;
                overflow: hidden;

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
                width: calc(100% - 20px);
                padding: var(--lew-form-input-padding-small);
                height: var(--lew-form-item-height-small);
                line-height: var(--lew-form-input-line-height-small);
                font-size: var(--lew-form-font-size-small);
            }
        }

        .lew-cascader-size-medium {
            .value,
            .placeholder {
                width: calc(100% - 22px);
                padding: var(--lew-form-input-padding-medium);
                line-height: var(--lew-form-input-line-height-medium);
                height: var(--lew-form-item-height-medium);
                font-size: var(--lew-form-font-size-medium);
            }
        }

        .lew-cascader-size-large {
            .value,
            .placeholder {
                width: calc(100% - 24px);
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
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
        outline: var(--lew-form-ouline);

        .icon-cascader {
            transform: translateY(-50%) rotate(180deg);
            color: var(--lew-text-color-1);
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
            user-select: text;
        }
    }

    .lew-cascader-view-disabled:hover {
        background-color: var(--lew-form-bgcolor);
        outline: 0px var(--lew-color-primary-light) solid;
        border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    }

    .lew-cascader-item:hover {
        :deep(.lew-checkbox) {
            .icon-checkbox-box {
                border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
                outline: var(--lew-form-ouline);
                background: var(--lew-form-bgcolor);
            }
        }
    }

    .lew-cascader-item-tobe:hover {
        :deep(.lew-checkbox) {
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

    .lew-cascader-item-selected:hover {
        :deep(.lew-checkbox) {
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
<style lang="scss">
    .lew-cascader-body {
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

        .lew-cascader-options-box {
            position: relative;
            display: flex;
            box-sizing: border-box;

            .lew-cascader-item-warpper {
                position: absolute;
                left: 0px;
                top: 2px;
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
                margin-top: -4px;
            }

            .lew-cascader-item-warpper:last-child {
                border-right: 0px var(--lew-form-border-color) solid;
            }
            .lew-cascader-item-padding {
                padding: 2px 0px;
            }
            .lew-cascader-item {
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
                color: var(--lew-text-color-1);
                box-sizing: border-box;
                border-radius: 6px;
                height: 30px;
                padding: 0px 10px;
                flex-shrink: 0;

                .lew-cascader-icon {
                    position: absolute;
                    right: 2px;
                    top: 8.5px;
                    opacity: 0.4;
                }
                .lew-cascader-loading-icon {
                    position: absolute;
                    right: 5px;
                    top: 8.5px;
                }
                .lew-cascader-checkbox {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }

                .lew-cascader-label {
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

                .lew-cascader-label-free {
                    padding: 0px 8px 0px 25px;
                }
            }

            .lew-cascader-item:hover {
                .icon {
                    opacity: 1;
                }
            }

            .lew-cascader-item-disabled {
                opacity: 0.3;
                pointer-events: none;
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

            .lew-cascader-item:hover {
                color: var(--lew-text-color-0);
                background-color: var(--lew-backdrop-bg-active);
            }

            .lew-cascader-slot-item {
                border-radius: 6px;
            }

            .lew-cascader-slot-item:hover {
                color: var(--lew-text-color-0);
                background-color: var(--lew-backdrop-bg-active);
            }

            .lew-cascader-item-hover {
                background-color: var(--lew-backdrop-bg-active);
                .icon-check {
                    margin-right: 10px;
                }
            }
            .lew-cascader-item-active {
                color: var(--lew-checkbox-color);
                font-weight: bold;
                .lew-cascader-icon {
                    opacity: 1;
                }
                .icon-check {
                    margin-right: 10px;
                }
            }

            .lew-cascader-item-active:hover {
                color: var(--lew-checkbox-color);
                font-weight: bold;
            }
        }

        .lew-cascader-control {
            border-top: var(--lew-popover-border);
            height: 40px;
            padding-right: 10px;
        }
    }
</style>
