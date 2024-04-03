<script lang="ts" setup>
    import LewTree from './LewTree.vue';
    import { LewFlex, LewIcon } from 'lew-ui';
    import { treeProps } from './props';
    import type { TreeDataSource } from './props';
    import { getUUId } from 'lew-ui/utils';
    import _ from 'lodash';

    const props = defineProps(treeProps);

    let _treeId = '';
    let tree = ref([]);
    let treeDataSource: TreeDataSource[] = [];
    if (!props.treeId) {
        _treeId = getUUId();
        // @ts-ignore
        window[_treeId] = _.cloneDeep(props.dataSource);
        // @ts-ignore
        treeDataSource = window[_treeId];
    } else {
        _treeId = props.treeId;
        treeDataSource = _.cloneDeep(props.dataSource);
    }
    // @ts-ignore
    tree.value = window[_treeId];

    const modelValue: any = defineModel<string[] | number[] | string>();
    const selectedKey: any = defineModel<string[] | number[]>('selectedKey', {
        default: []
    });
    const expandedKeys: any = defineModel<string[] | number[]>('expandedKeys', {
        default: []
    });
    const selectedKeys: any = defineModel<string[]>('selectedKeys', {
        default: []
    });
    const hasChildSelected: any = defineModel<string[]>('hasChildSelected', {
        default: []
    });

    const emit = defineEmits([]);

    const showhide = (item: any) => {
        let _expandedKeys = _.cloneDeep(expandedKeys.value) || [];
        let i = _expandedKeys.findIndex((e: any) => e === item.value);
        if (i >= 0) {
            _expandedKeys.splice(i, 1);
        } else {
            _expandedKeys.push(item.value);
        }

        expandedKeys.value = _expandedKeys;
    };

    const checkShowTree = computed(() => (id: any) => {
        let i = (expandedKeys.value || []).findIndex((e: any) => e == id);

        return i >= 0;
    });

    const getAllValuesFromTree = (arrayTree: any) => {
        const valuesArray = _.flatMap(arrayTree, (item) => {
            const values = [item.value];
            if (item.children && item.children.length > 0) {
                values.push(...getAllValuesFromTree(item.children));
            }
            return values;
        });
        return valuesArray;
    };

    const select = (item: any) => {
        if (props.multiple) {
            let _selected = _.cloneDeep(selectedKey.value) || [];
            let _modelValue = _.cloneDeep(modelValue.value) || [];
            if (_modelValue.includes(item.value)) {
                let i = _selected.findIndex((e: any) => e == item.value);
                _selected.splice(i, 1);
                if (item.children && item.children.length > 0) {
                    _selected = _.uniq(
                        _.difference(_selected, getAllValuesFromTree(item.children))
                    );
                }
            } else {
                _selected.push(item.value);
                if (item.children && item.children.length > 0) {
                    _selected = _.uniq([..._selected, ...getAllValuesFromTree(item.children)]);
                }
            }
            const { _allChildSelected } = calculateParentNodes(tree.value, _selected);
            formatModelValue(_.uniq([..._selected, ..._allChildSelected]));
            selectedKey.value = _selected;
        } else {
            if (modelValue.value === item.value) {
                modelValue.value = '';
            } else {
                modelValue.value = item.value;
            }
        }
    };

    const formatModelValue = (_keys: any) => {
        const { _hasChildSelected, _allChildSelected } = calculateParentNodes(tree.value, _keys);
        modelValue.value = _.uniq([..._keys, ..._allChildSelected]);
        hasChildSelected.value = _hasChildSelected;
    };

    function calculateParentNodes(
        tree: any[],
        _selectedKey: string[]
    ): { _hasChildSelected: string[]; _allChildSelected: string[] } {
        let _hasChildSelected: Set<string> = new Set();
        let _allChildSelected: Set<string> = new Set();

        function findParentNodes(
            node: any,
            _selectedKey: string[],
            visitedNodes: Set<string>
        ): void {
            if (visitedNodes.has(node.value)) {
                return;
            }

            visitedNodes.add(node.value);

            if (_selectedKey.includes(node.value)) {
                _hasChildSelected.add(node.value);
            }

            let childrenValues = node.children
                ? node.children.map((child: any) => child.value)
                : [];
            if (
                node.children &&
                childrenValues.every((childValue: any) => _selectedKey.includes(childValue))
            ) {
                _allChildSelected.add(node.value);
            }

            if (node.children) {
                for (let child of node.children) {
                    findParentNodes(child, _selectedKey, visitedNodes);
                    if (_hasChildSelected.has(child.value)) {
                        _hasChildSelected.add(node.value);
                    }
                }
            }
        }

        for (let node of tree) {
            findParentNodes(node, _selectedKey, new Set());
        }

        _hasChildSelected = new Set(
            [..._hasChildSelected].filter((item) => !_selectedKey.includes(item))
        );

        return {
            _hasChildSelected: Array.from(_hasChildSelected),
            _allChildSelected: Array.from(_allChildSelected)
        };
    }
</script>

<template>
    <div class="lew-tree-wrapper">
        <lew-flex
            v-for="(item, index) in (treeDataSource as any)"
            :key="index"
            direction="y"
            gap="0px"
            x="start"
        >
            <div
                class="lew-tree-item"
                :class="{
                    'lew-tree-item-expand': checkShowTree(item.value) && item.children.length > 0,
                    'lew-tree-item-certain':
                        multiple &&
                        hasChildSelected.includes(item.value) &&
                        !modelValue.includes(item.value),
                    'lew-tree-item-selected': multiple
                        ? modelValue.includes(item.value)
                        : modelValue === item.value,
                    'lew-tree-item-leaf':
                        !item.children ||
                        (item.children && item.children.length === 0) ||
                        item.isLeaf
                }"
            >
                <div @click.stop="showhide(item)" class="lew-tree-chevron-right">
                    <lew-icon
                        class="lew-tree-chevron-right-icon"
                        size="14px"
                        type="chevron-right"
                    />
                </div>
                <div @click="select(item)" class="lew-tree-item-label">
                    <lew-checkbox
                        :certain="
                            multiple &&
                            hasChildSelected.includes(item.value) &&
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
                v-if="checkShowTree(item.value)"
                :style="{ marginLeft: '20px' }"
                class="lew-tree-item-children"
            >
                <lew-tree
                    v-bind="$props"
                    v-model="modelValue"
                    v-model:selectedKey="selectedKey"
                    v-model:expanded-keys="expandedKeys"
                    v-model:selected-keys="selectedKeys"
                    v-model:has-child-selected="hasChildSelected"
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

    .lew-tree-item-selected {
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
