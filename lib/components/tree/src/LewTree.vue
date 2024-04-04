<script lang="ts" setup>
    import LewTree from './LewTree.vue';
    import { LewFlex, LewIcon } from 'lew-ui';
    import { treeProps } from './props';
    import type { TreeDataSource } from './props';
    import { getUUId } from 'lew-ui/utils';
    import _ from 'lodash';

    // 格式化 获取 path
    const formatTree = (
        tree: TreeDataSource[],
        parentValuePaths: String[] = [],
        parentLabelPaths: String[] = []
    ): TreeDataSource[] => {
        return tree.map((node: TreeDataSource) => {
            const { value, label, children = [] } = node;
            const valuePaths: String[] = [...parentValuePaths, value];
            const labelPaths: String[] = [...parentLabelPaths, label];
            const level = valuePaths.length - 1;
            const _node = {
                ...node,
                valuePaths,
                labelPaths,
                level
            };
            if ((children || []).length > 0) {
                return {
                    ..._node,
                    leafNodeValues: findLeafNodes(children),
                    children: formatTree(children, valuePaths, labelPaths)
                };
            }
            return _node;
        }) as TreeDataSource[];
    };

    const props = defineProps(treeProps);

    let _treeId = '';
    let treeDataSource: TreeDataSource[] = [];

    const modelValue: any = defineModel<string[] | number[] | string>();
    const tree: any = defineModel<TreeDataSource[]>('tree', {
        default: []
    });
    const expandedKeys: any = defineModel<string[] | number[]>('expandedKeys', {
        default: []
    });
    const certainKeys: any = defineModel<string[]>('certainKeys', {
        default: []
    });

    const emit = defineEmits([]);

    if (!props.treeId) {
        _treeId = getUUId();
        // @ts-ignore
        window[_treeId] = formatTree(_.cloneDeep(props.dataSource));
        // @ts-ignore
        treeDataSource = window[_treeId];
    } else {
        _treeId = props.treeId;
        treeDataSource = _.cloneDeep(props.dataSource);
    }
    // @ts-ignore
    tree.value = window[_treeId];
    const loadingKeys = ref<string[]>([]);

    const expandHandle = (item: TreeDataSource) => {
        if (props.expandAll) {
            return;
        }
        let _expandedKeys = _.cloneDeep(expandedKeys.value);
        let i = expandedKeys.value.findIndex((e: string) => e === item.value);
        if (i >= 0) {
            _expandedKeys.splice(i, 1);
            expandedKeys.value = _expandedKeys;
        } else {
            if (props.onload && !loadingKeys.value.includes(item.value)) {
                loadingKeys.value.push(item.value);
                setTimeout(() => {
                    const i = loadingKeys.value.findIndex((e: string) => e === item.value);
                    if (i >= 0) {
                        loadingKeys.value.splice(i, 1);
                    }
                    expandedKeys.value.push(item.value);
                }, 150);
            } else {
                expandedKeys.value = [..._expandedKeys, item.value];
            }
        }
    };

    const checkShowTree = computed(() => (id: string) => {
        let i = (expandedKeys.value || []).findIndex((e: string) => e == id);
        return i >= 0;
    });

    const select = (item: TreeDataSource) => {
        let _modelValue: string[] = _.cloneDeep(modelValue.value) || [];
        if (props.multiple) {
            if (_modelValue.includes(item.value)) {
                const i = _modelValue.findIndex((e: string) => e === item.value);
                _modelValue.splice(i, 1);
                if (!props.free) {
                    if (item.children && item.children.length > 0) {
                        _modelValue = _.uniq(
                            _.difference(_modelValue, findNodes(item.children))
                        ) as string[];
                    }
                }
            } else {
                _modelValue.push(item.value);
                if (!props.free) {
                    if (item.children && item.children.length > 0) {
                        _modelValue = _.uniq([
                            ..._modelValue,
                            ...findNodes(item.children)
                        ]) as string[];
                    }
                }
            }
            if (!props.free) {
                const { __certainKeys, __modelValue } = formatValues(
                    _.cloneDeep(tree.value),
                    _modelValue
                );
                certainKeys.value = __certainKeys;
                modelValue.value = __modelValue;
            } else {
                modelValue.value = _modelValue;
            }
        } else {
            modelValue.value = modelValue.value === item.value ? '' : item.value;
        }
    };
    function findNodes(tree: TreeDataSource[]) {
        let nodes = new Set();

        function traverse(node: TreeDataSource) {
            nodes.add(node.value);
            if (node.children && node.children.length > 0) {
                node.children.forEach((child: TreeDataSource) => {
                    traverse(child);
                });
            }
        }

        tree.forEach((node) => {
            traverse(node);
        });

        return Array.from(nodes);
    }

    function findLeafNodes(tree: TreeDataSource[]) {
        let leafNodes = new Set();
        function traverse(node: TreeDataSource) {
            if (!node.children || node.children.length === 0) {
                leafNodes.add(node.value);
            } else {
                node.children.forEach((child: TreeDataSource) => {
                    traverse(child);
                });
            }
        }
        tree.forEach((node) => {
            traverse(node);
        });
        return Array.from(leafNodes);
    }

    // 定义一个函数，传入数组树arrayTree和value列表values
    const formatValues = (arrayTree: TreeDataSource[], values: any) => {
        let resultValues = new Set(values); // 使用Set来存储结果值
        let certainKeys = new Set(values);

        const stack = [...arrayTree]; // 使用展开运算符创建栈，并初始化为数组树

        while (stack.length > 0) {
            const currentNode: any = stack.pop();
            const childValues = currentNode.leafNodeValues || [];
            const isAllChildValuesInValues = childValues.every((value: string) =>
                resultValues.has(value)
            );
            if (!isAllChildValuesInValues && childValues.length > 0) {
                resultValues.delete(currentNode.value);
            } else if (childValues.length > 0) {
                resultValues.add(currentNode.value);
            }
            const array1 = Array.from(childValues);
            const array2 = Array.from(resultValues);
            if (_.intersection(array1, array2).length > 0 && !resultValues.has(currentNode.value)) {
                certainKeys.add(currentNode.value);
            } else {
                certainKeys.delete(currentNode.value);
            }
            if (currentNode.children) {
                stack.push(...currentNode.children); // 使用展开运算符将子节点加入栈中
            }
        }
        return {
            __certainKeys: Array.from(certainKeys),
            __modelValue: Array.from(resultValues)
        }; // 将Set转换为数组并返回
    };
</script>

<template>
    <div class="lew-tree-wrapper">
        <lew-flex
            v-for="(item, index) in (treeDataSource as TreeDataSource[])"
            :key="index"
            direction="y"
            gap="0px"
            x="start"
        >
            <div
                class="lew-tree-item"
                :class="{
                    'lew-tree-item-expand':
                        checkShowTree(item.value) && item.children && item.children.length > 0,
                    'lew-tree-item-certain':
                        multiple &&
                        certainKeys.includes(item.value) &&
                        !modelValue.includes(item.value),
                    'lew-tree-item-selected': multiple
                        ? modelValue.includes(item.value)
                        : modelValue === item.value,
                    'lew-tree-item-leaf':
                        !item.children ||
                        (item.children && item.children.length === 0) ||
                        item.isLeaf
                }"
                :style="{
                    animationDelay: `${index * 0.05}s`
                }"
            >
                <div @click.stop="expandHandle(item)" class="lew-tree-chevron-right">
                    <lew-icon
                        v-if="loadingKeys.includes(item.value)"
                        size="14px"
                        animation="spin"
                        animation-speed="fast"
                        class="lew-cascader-loading-icon"
                        type="loader"
                    />
                    <lew-icon
                        v-else
                        class="lew-tree-chevron-right-icon"
                        size="14px"
                        type="chevron-right"
                    />
                </div>
                <div @click="select(item)" class="lew-tree-item-label">
                    <lew-checkbox
                        :certain="
                            multiple &&
                            certainKeys.includes(item.value) &&
                            !modelValue.includes(item.value)
                        "
                        :checked="
                            multiple ? modelValue.includes(item.value) : modelValue === item.value
                        "
                        v-if="showCheckbox"
                        class="lew-tree-checkbox"
                    />
                    <span>{{ item.label }}</span>
                </div>
            </div>
            <div
                v-if="checkShowTree(item.value) || expandAll"
                :style="{ marginLeft: '26px' }"
                class="lew-tree-item-children"
            >
                <lew-tree
                    v-bind="$props"
                    v-model="modelValue"
                    v-model:expanded-keys="expandedKeys"
                    v-model:certain-keys="certainKeys"
                    :tree="tree"
                    :tree-id="_treeId"
                    :data-source="item.children"
                />
            </div>
        </lew-flex>
    </div>
</template>
<style lang="scss" scoped>
    .lew-tree-item {
        display: inline-flex;
        align-items: center;
        padding: 0px 16px 0px 8px;
        cursor: pointer;
        white-space: nowrap;
        user-select: none;
        margin: 2px 0px;
        animation: lewTreeItem 0.35s;
        animation-fill-mode: forwards;
        opacity: 0;
        transform: translateX(-4px);
        @keyframes lewTreeItem {
            0% {
                opacity: 0;
                transform: translateX(-4px);
            }
            100% {
                opacity: 1;
                transform: translateX(0px);
            }
        }
        .lew-tree-chevron-right {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: var(--lew-form-transition);
            width: 14px;
            height: 14px;
            padding: 4px;
            border-radius: var(--lew-border-radius-small);
            .lew-tree-chevron-right-icon {
                transform: rotate(0deg);
                transition: var(--lew-form-transition);
            }
        }
        .lew-tree-chevron-right:hover {
            background-color: var(--lew-bgcolor-3);
        }
        .lew-tree-item-label {
            position: relative;
            padding: 4px 10px 4px 8px;
            display: flex;
            align-items: center;
            border-radius: var(--lew-border-radius-small);
        }
        .lew-tree-item-label::after {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 9;
            content: '';
            width: 100%;
            height: 100%;
        }
        .lew-tree-checkbox {
            margin-right: 6px;
        }
        .lew-tree-item-label:hover {
            background-color: var(--lew-bgcolor-3);
            user-select: none;
            :deep(.lew-checkbox) {
                .icon-checkbox-box {
                    border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover)
                        solid;
                    outline: var(--lew-form-ouline);
                    background: var(--lew-form-bgcolor);
                }
            }
        }
    }
    .lew-tree-item-selected {
        .lew-tree-item-label {
            color: var(--lew-color-blue-dark);
            font-weight: 600;
        }
        .lew-tree-item-label:hover {
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
    }

    .lew-tree-item-certain {
        .lew-tree-item-label:hover {
            :deep(.lew-checkbox) {
                .icon-checkbox-box {
                    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
                    background: var(--lew-checkbox-color);
                }
            }
        }
    }

    .lew-tree-item-leaf {
        .lew-tree-chevron-right {
            opacity: 0;
        }
    }
    .lew-tree-item-expand {
        .lew-tree-chevron-right {
            .lew-tree-chevron-right-icon {
                transform: rotate(90deg);
            }
        }
    }
</style>
