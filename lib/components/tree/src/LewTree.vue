<script lang="ts" setup>
    import { LewFlex, LewIcon } from 'lew-ui';
    import { treeProps } from './props';
    import type { TreeDataSource } from './props';
    import _ from 'lodash';

    const props = defineProps(treeProps);

    // 递归将树形结构数组转换成展开列表，按照树结构的顺序存储，同时保存父节点
    function flattenTree(tree: TreeDataSource[]): TreeDataSource[] {
        return _.flatMap(tree, (node: TreeDataSource) => {
            const { children }: any = node;
            return [node, ...flattenTree(children)];
        });
    }

    // 格式化路径逻辑
    const flattenAndFormatTree = (
        tree: TreeDataSource[],
        parent: any = null,
        parentKeyPaths: String[] = [],
        parentLabelPaths: String[] = []
    ): TreeDataSource[] => {
        return tree.map((node: TreeDataSource, index: number) => {
            const { children, ...rest }: any = node;

            const currentNode = {
                ...rest,
                key: rest[props.keyField],
                label: rest[props.labelField],
                leafNodeValues: findLeafNodes(children),
                allNodeValues: findAllNodes(children),
                isLeaf: (children || []).length === 0,
                parentKey: parent ? parent[props.keyField] : null,
                keyPaths: [...parentKeyPaths, rest[props.keyField]],
                labelPaths: [...parentLabelPaths, rest[props.labelField]],
                level: parentKeyPaths.length,
                parentKeyPaths,
                parentLabelPaths,
                treeIndex: index
            };

            const formattedNode = {
                ...currentNode,
                children: children
                    ? flattenAndFormatTree(
                          children,
                          currentNode,
                          currentNode.keyPaths,
                          currentNode.labelPaths
                      )
                    : []
            };

            return formattedNode;
        });
    };

    const treeList: any = ref<TreeDataSource[]>(
        flattenTree(flattenAndFormatTree(_.cloneDeep(props.dataSource)))
    );

    const modelValue: any = defineModel<string[] | number[] | string>();

    const expandedKeys: any = defineModel<string[] | number[]>('expandedKeys', {
        default: []
    });

    const certainKeys: any = ref<string[]>([]);

    const emit = defineEmits([]);

    const loadingKeys = ref<string[]>([]);
    const expandHandle = (item: TreeDataSource) => {
        if (props.expandAll) {
            return;
        }
        let _expandedKeys = _.cloneDeep(expandedKeys.value);
        let i = _expandedKeys.findIndex((e: string) => e === item.key);
        if (i >= 0) {
            _expandedKeys.splice(i, 1);
            expandedKeys.value = _expandedKeys;
        } else {
            if (props.onload && !loadingKeys.value.includes(item.key)) {
                loadingKeys.value.push(item.key);
                setTimeout(() => {
                    const i = loadingKeys.value.findIndex((e: string) => e === item.key);
                    if (i >= 0) {
                        loadingKeys.value.splice(i, 1);
                    }
                    expandedKeys.value.push(item.key);
                }, 150);
            } else {
                expandedKeys.value = [..._expandedKeys, item.key];
            }
        }
    };

    const select = (item: TreeDataSource) => {
        let _modelValue: string[] = _.cloneDeep(modelValue.value) || [];
        if (props.multiple) {
            if (_modelValue.includes(item.key)) {
                const i = _modelValue.findIndex((e: string) => e === item.key);
                _modelValue.splice(i, 1);
                if (!props.free) {
                    _modelValue = _.uniq(_.difference(_modelValue, item.allNodeValues)) as string[];
                }
            } else {
                _modelValue.push(item.key);
                if (!props.free) {
                    _modelValue = _.uniq([..._modelValue, ...item.allNodeValues]) as string[];
                }
            }
            if (!props.free) {
                const { __certainKeys, __modelValue } = formatValues({
                    tree: treeList.value,
                    values: _modelValue
                });
                certainKeys.value = __certainKeys;
                modelValue.value = __modelValue;
            } else {
                modelValue.value = _modelValue;
            }
        } else {
            modelValue.value = modelValue.value === item.key ? '' : item.key;
        }
    };
    function findAllNodes(tree: TreeDataSource[] = []) {
        let nodes = new Set();
        function traverse(node: TreeDataSource) {
            nodes.add(node.key);
            if (node.children && node.children.length > 0) {
                node.children.forEach((child: TreeDataSource) => {
                    traverse(child);
                });
            }
        }

        tree.forEach((node) => {
            traverse(node);
        });

        return Array.from(nodes) || [];
    }

    function findLeafNodes(tree: TreeDataSource[] = []) {
        let leafNodes = new Set();
        function traverse(node: TreeDataSource) {
            if (!node.children || node.children.length === 0) {
                leafNodes.add(node.key);
            } else {
                node.children.forEach((child: TreeDataSource) => {
                    traverse(child);
                });
            }
        }
        tree.forEach((node) => {
            traverse(node);
        });
        return Array.from(leafNodes) || [];
    }

    // 定义一个函数，传入数组树arrayTree和value列表values
    const formatValues = ({ tree, values }: any): any => {
        let _modelValue = new Set(values); // 使用Set来存储结果值
        let _certainKeys = new Set(values);
        const stack = _.cloneDeep(tree); // 使用展开运算符创建栈，并初始化为数组树

        while (stack.length > 0) {
            const currentNode: any = stack.pop();
            const key = currentNode.key;
            const childValues = currentNode.leafNodeValues || [];
            const isAllChildValuesInValues = childValues.every((value: string) =>
                _modelValue.has(value)
            );
            if (!isAllChildValuesInValues && childValues.length > 0) {
                _modelValue.delete(key);
            } else if (childValues.length > 0) {
                _modelValue.add(key);
            }
            const array1 = Array.from(childValues);
            const array2 = Array.from(_modelValue);
            if (_.intersection(array1, array2).length > 0 && !_modelValue.has(key)) {
                _certainKeys.add(key);
            } else {
                _certainKeys.delete(key);
            }
        }
        return {
            __certainKeys: Array.from(_certainKeys),
            __modelValue: Array.from(_modelValue)
        }; // 将Set转换为数组并返回
    };
</script>

<template>
    <div class="lew-tree-wrapper">
        <lew-flex
            v-for="(item, index) in (treeList as TreeDataSource[])"
            :key="index"
            direction="y"
            gap="0px"
            x="start"
        >
            <div
                v-if="
                    expandAll ||
                    item.level === 0 ||
                    ((expandedKeys || []).includes(item.parentKey) &&
                        _.intersection(item.parentKeyPaths, expandedKeys).length ===
                            (item.parentKeyPaths || []).length)
                "
                class="lew-tree-item"
                :class="{
                    'lew-tree-item-expand': expandAll || (expandedKeys || []).includes(item.key),
                    'lew-tree-item-certain':
                        multiple &&
                        certainKeys.includes(item.key) &&
                        !modelValue.includes(item.key),
                    'lew-tree-item-selected': multiple
                        ? modelValue.includes(item.key)
                        : modelValue === item.key,
                    'lew-tree-item-leaf': item.isLeaf
                }"
                :style="{
                    animationDelay: `${(item.treeIndex || 0) * 0.02}s`,
                    paddingLeft: `${item.level * 26}px`
                }"
            >
                <div @click.stop="expandHandle(item)" class="lew-tree-chevron-right">
                    <lew-icon
                        v-if="loadingKeys.includes(item.key)"
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
                            certainKeys.includes(item.key) &&
                            !modelValue.includes(item.key)
                        "
                        :checked="
                            multiple ? modelValue.includes(item.key) : modelValue === item.key
                        "
                        v-if="showCheckbox"
                        class="lew-tree-checkbox"
                    />
                    <span>{{ item.label }}</span>
                </div>
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
        animation: lewTreeItem 0.25s;
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
