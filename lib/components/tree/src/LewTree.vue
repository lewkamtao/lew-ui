<script lang="ts" setup>
    import LewTree from './LewTree.vue';
    import { LewFlex, LewIcon } from 'lew-ui';
    import { treeProps } from './props';
    import type { TreeDataSource } from './props';
    import { formatPathsToTreeList } from 'lew-ui/utils';
    import _ from 'lodash';

    const modelValue: any = defineModel<string[] | number[]>();
    const expandedKeys: any = defineModel<string[] | number[]>('expandedKeys', {
        default: []
    });
    const certainKeys: any = defineModel<string[]>('certainKeys', {
        default: []
    });

    const props = defineProps(treeProps);

    const emit = defineEmits([]);

    let treeDataSource: TreeDataSource[] = [];
    if (props.dataSource && props.dataSource.length > 0 && !props.dataSource[0].valuePaths) {
        treeDataSource = formatPathsToTreeList(props.dataSource);
    } else {
        treeDataSource = props.dataSource;
    }

    const showhide = (id: any) => {
        let _expandedKeys = _.cloneDeep(expandedKeys.value) || [];
        let i = _expandedKeys.findIndex((e: any) => e === id);
        if (i >= 0) {
            _expandedKeys.splice(i, 1);
        } else {
            _expandedKeys.push(id);
        }
        expandedKeys.value = _expandedKeys;
    };

    const checkShowTree = computed(() => (id: any) => {
        let i = (expandedKeys.value || []).findIndex((e: any) => e == id);
        return i >= 0;
    });

    const select = (item: any) => {
        if (props.multiple) {
            if (modelValue.value.includes(item.value)) {
                let i = modelValue.value.findIndex((e: any) => e == item.value);
                modelValue.value.splice(i, 1);
            } else {
                modelValue.value.push(item.value);
            }
        } else {
            if (modelValue.value === item.value) {
                modelValue.value = '';
            } else {
                modelValue.value = item.value;
            }
        }
        recursiveArrayTree(_.cloneDeep(props.tree), (node: any) => {
            if (
                node.children &&
                node.children.length > 0 &&
                _.every(_.map(node.children, 'value'), (e) => _.includes(modelValue.value, e))
            ) {
                modelValue.value.push(node.value);
            } else {
                const i = modelValue.value.findIndex(
                    (e: any) => e === node.value && node.value !== item.value
                );
                if (i >= 0) {
                    modelValue.value.splice(i, 1);
                }
            }
        });
    };
    // 定义一个函数，传入一个数组树、方法和需要遍历的属性名
    const recursiveArrayTree = (tree: any, method: any): any => {
        tree.forEach((item: any) => {
            // 如果有 children，那么就递归调用自身
            if (item.children && item.children.length > 0) {
                recursiveArrayTree(item.children, method);
            }
            method(item);
        });
    };
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
                    'lew-tree-item-selected': multiple
                        ? modelValue.includes(item.value)
                        : modelValue === item.value,
                    'lew-tree-item-leaf':
                        !item.children ||
                        (item.children && item.children.length === 0) ||
                        item.isLeaf
                }"
            >
                <div @click.stop="showhide(item.value)" class="lew-tree-chevron-right">
                    <lew-icon
                        class="lew-tree-chevron-right-icon"
                        size="14px"
                        type="chevron-right"
                    />
                </div>
                <div @click="select(item)" class="lew-tree-item-label">
                    <lew-checkbox
                        :checked="
                            multiple ? modelValue.includes(item.value) : modelValue === item.value
                        "
                        v-if="showCheckbox"
                        class="lew-tree-checkbox"
                    />
                    <span>{{ item.label }}</span>
                </div>
            </div>
            <div v-show="checkShowTree(item.value)" style="margin-left: 20px" direction="y">
                <lew-tree
                    v-bind="$props"
                    v-model="modelValue"
                    v-model:expanded-keys="expandedKeys"
                    :tree="tree"
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
