<script lang="ts" setup>
    import { LewFlex, LewIcon, LewEmpty, LewLoading } from 'lew-ui';
    import { treeProps } from './props';
    import type { TreeDataSource } from './props';
    import _ from 'lodash';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('loading')) {
        app.use(LewLoading);
    }

    const props = defineProps(treeProps);

    // 定义异步处理函数
    const modelValue: any = defineModel<string[] | number[] | string>({
        default: []
    });
    const expandedKeys: any = defineModel<string[] | number[]>('expandedKeys', {
        default: []
    });
    const certainKeys: any = ref<string[]>([]);
    const loadingKeys = ref<string[]>([]);
    const loading = ref<boolean>(true);
    const treeList: any = ref<TreeDataSource[]>([]);
    let tree: TreeDataSource[] = [];
    // 递归将树形结构数组转换成展开列表，按照树结构的顺序存储，同时保存父节点
    function flattenTree(tree: TreeDataSource[]): TreeDataSource[] {
        return _.flatMap(_.cloneDeep(tree), (node: TreeDataSource) => {
            const { children }: any = node;
            delete node.children;
            return [node, ...flattenTree(children)];
        });
    }

    // 格式化路径逻辑
    const formatTree = (
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
                keyPaths: [...parentKeyPaths, rest[props.keyField]],
                labelPaths: [...parentLabelPaths, rest[props.labelField]],
                isLeaf: _.has(rest, 'isLeaf') ? rest.isLeaf : (children || []).length === 0,
                parentKey: parent ? parent[props.keyField] : null,
                level: parentKeyPaths.length,
                parentKeyPaths,
                parentLabelPaths,
                treeIndex: index
            };
            if (props.free) {
                currentNode['leafNodeValues'] = findLeafNodes(children);
                currentNode['allNodeValues'] = findAllNodes(children);
            }
            const formattedNode = {
                ...currentNode,
                children: children
                    ? formatTree(
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
    // 初始化
    const init = async () => {
        if (props.onload) {
            tree = formatTree((await props.onload()) || []);
        } else if (props.dataSource && props.dataSource.length > 0) {
            tree = formatTree(props.dataSource);
        }
        treeList.value = flattenTree(tree);
        loading.value = false;
    };
    init();

    const expandHandle = async (item: TreeDataSource) => {
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
                const index = treeList.value.findIndex(
                    (e: TreeDataSource) => e.parentKey === item.key
                );
                if (index < 0) {
                    loadingKeys.value.push(item.key);
                    let _tree = (await props.onload(_.cloneDeep(item))) || [];
                    insertChildByKey(tree, item.key, _tree);
                    tree = formatTree(tree);
                    treeList.value = flattenTree(tree);
                    const i = loadingKeys.value.findIndex((e: string) => e === item.key);
                    if (i >= 0) {
                        loadingKeys.value.splice(i, 1);
                    }
                }
                expandedKeys.value = [...expandedKeys.value, item.key];
            } else {
                expandedKeys.value = [..._expandedKeys, item.key];
            }
        }
    };

    // 定义插入子节点的函数
    const insertChildByKey = (tree: TreeDataSource[], key: string, newChild: TreeDataSource[]) => {
        const index = _.findIndex(tree, (node: TreeDataSource) => node.key === key);
        if (index !== -1) {
            tree[index].children = newChild;
        } else {
            _.forEach(tree, (node: any) => {
                insertChildByKey(node.children, key, newChild);
            });
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
        function traverse(node: any) {
            nodes.add(node[props.keyField]);
            (node.children || []).forEach((child: TreeDataSource) => {
                traverse(child);
            });
        }

        tree.forEach((node) => {
            traverse(node);
        });

        return Array.from(nodes) || [];
    }

    function findLeafNodes(tree: TreeDataSource[] = []) {
        let leafNodes = new Set();
        function traverse(node: any) {
            if (!node.children || node.children.length === 0) {
                leafNodes.add(node[props.keyField]);
            }
            (node.children || []).forEach((child: TreeDataSource) => {
                traverse(child);
            });
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
    <div
        v-loading="{ visible: loading, tip: '加载中' }"
        :style="{
            minHeight: loading ? '250px' : ''
        }"
        class="lew-tree-wrapper"
    >
        <template v-if="treeList && treeList.length > 0 && !loading">
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
                        (expandedKeys.includes(item.parentKey) &&
                            _.intersection(item.parentKeyPaths, expandedKeys).length ===
                                (item.parentKeyPaths || []).length)
                    "
                    class="lew-tree-item"
                    :class="{
                        'lew-tree-item-expand-all': expandAll,
                        'lew-tree-item-expand': expandedKeys.includes(item.key),
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
                        paddingLeft: `${item.level * 26}px`
                    }"
                >
                    <div class="lew-tree-chevron-right" @click.stop="expandHandle(item)">
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
                    <div class="lew-tree-item-label" @click="select(item)">
                        <div v-if="item.level > 0 && showLine" class="lew-tree-line"></div>
                        <lew-checkbox
                            v-if="showCheckbox"
                            :certain="
                                multiple &&
                                certainKeys.includes(item.key) &&
                                !modelValue.includes(item.key)
                            "
                            :checked="
                                multiple ? modelValue.includes(item.key) : modelValue === item.key
                            "
                            class="lew-tree-checkbox"
                        />
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </lew-flex>
        </template>
        <template v-else-if="!loading">
            <lew-flex>
                <lew-empty />
            </lew-flex>
        </template>
    </div>
</template>
<style lang="scss" scoped>
    .lew-tree-wrapper {
    }
    .lew-tree-item {
        display: inline-flex;
        align-items: center;
        padding: 0px 16px 0px 8px;
        cursor: pointer;
        white-space: nowrap;
        user-select: none;

        .lew-tree-chevron-right {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: var(--lew-form-transition);
            width: 14px;
            height: 14px;
            padding: 4px;
            border-radius: var(--lew-border-radius-small);
            margin-left: 5px;
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
            position: relative;
            padding: 4px 10px 4px 8px;
            display: flex;
            align-items: center;
            border-radius: var(--lew-border-radius-small);
            cursor: pointer;
            .lew-tree-line {
                position: absolute;
                left: -37px;
                top: 0px;
                background-color: var(--lew-bgcolor-5);
                height: 100%;
                width: 1px;
            }
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
    .lew-tree-item-expand-all {
        cursor: default;
        .lew-tree-chevron-right {
            pointer-events: none;
            .lew-tree-chevron-right-icon {
                transform: rotate(90deg);
            }
        }
    }
</style>
