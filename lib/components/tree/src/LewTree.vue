<script lang="ts" setup>
import { LewFlex, LewEmpty, LewLoading, LewCheckbox } from 'lew-ui'
import { treeProps } from './props'
import type { TreeDataSource } from './props'
import {
  forEach,
  cloneDeep,
  isArray,
  findIndex,
  difference,
  uniq,
  intersection
} from 'lodash-es'
import { tree2List } from './tree2list'
import Icon from 'lew-ui/utils/Icon.vue'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('loading')) {
  app.use(LewLoading)
}
const props = defineProps(treeProps)
const emit = defineEmits(['change', 'initStart', 'initEnd'])

// 定义异步处理函数
const modelValue: Ref<string | (string | number)[] | undefined> = defineModel({
  default: undefined
})

const expandedKeys: Ref<(string | number)[] | undefined> = defineModel(
  'expandedKeys',
  {
    default: []
  }
)
const certainKeys: any = ref<string[]>([])
const loadingKeys = ref<string[]>([])
const loading = ref<boolean>(false)
const treeList: any = ref<TreeDataSource[]>([])

// 初始化
let treeBackup: TreeDataSource[] = []
const init = async (keyword = '') => {
  let _treeList = []
  if (!props.isSelect) {
    loading.value = true
  }
  emit('initStart')
  const { dataSource, initTree, keyField, labelField, free } = props
  const { newTreeList, newTree }: any = (await tree2List({
    initTree,
    dataSource,
    keyField,
    labelField,
    free,
    keyword
  })) as any
  treeBackup = newTree
  _treeList = newTreeList
  treeList.value = _treeList
  expandedKeys.value = []
  certainKeys.value = []
  loadingKeys.value = []
  loading.value = false
  emit('initEnd')
  return _treeList
}
init()

const expandHandle = async (item: TreeDataSource) => {
  if (props.expandAll) {
    return
  }
  let _expandedKeys = cloneDeep(expandedKeys.value || [])
  let i = _expandedKeys.findIndex((e: string | number) => e === item.key)
  if (i >= 0) {
    _expandedKeys.splice(i, 1)
    expandedKeys.value = _expandedKeys
  } else if (props.onload && !loadingKeys.value.includes(item.key)) {
    const index = treeList.value.findIndex(
      (e: TreeDataSource) => e.parentKey === item.key
    )
    if (index < 0) {
      loadingKeys.value.push(item.key)
      let _tree =
        ((await props.onload(cloneDeep(item) as TreeDataSource)) as any) || []
      insertChildByKey(treeBackup, item.key, _tree)
      const { newTree, newTreeList }: any = (await tree2List({
        dataSource: treeBackup,
        keyField: props.keyField,
        labelField: props.labelField,
        free: props.free
      })) as any
      treeBackup = newTree
      treeList.value = newTreeList
      const i = loadingKeys.value.findIndex((e: string) => e === item.key)
      if (i >= 0) {
        loadingKeys.value.splice(i, 1)
      }
    }
    expandedKeys.value = [
      ...(expandedKeys.value as (string | number)[]),
      item.key
    ]
  } else {
    expandedKeys.value = [..._expandedKeys, item.key]
  }
}

// 定义插入子节点的函数
const insertChildByKey = (
  tree: TreeDataSource[],
  key: string,
  newChild: TreeDataSource[]
) => {
  const index = findIndex(tree, (node: TreeDataSource) => node.key === key)
  if (index !== -1) {
    tree[index].children = newChild
  } else {
    forEach(tree, (node: any) => {
      insertChildByKey(node.children, key, newChild)
    })
  }
}

const select = (item: TreeDataSource) => {
  let _modelValue: (string | number)[] | undefined | string =
    cloneDeep(modelValue.value) || []
  if (props.multiple && isArray(_modelValue)) {
    if (_modelValue && isArray(_modelValue) && _modelValue.includes(item.key)) {
      // @ts-ignore
      const i = _modelValue.findIndex((e: string | number) => e === item.key)
      // @ts-ignore
      _modelValue.splice(i, 1)
      if (!props.free) {
        _modelValue = uniq(
          difference(_modelValue, item.allNodeValues)
        ) as string[]
      }
    } else {
      // @ts-ignore
      _modelValue && _modelValue.push(item.key)
      if (!props.free && isArray(_modelValue)) {
        // @ts-ignore
        _modelValue = uniq([..._modelValue, ...item.allNodeValues]) as string[]
      }
    }
    if (!props.free) {
      const { __certainKeys, __modelValue } = formatValues({
        tree: treeList.value,
        values: _modelValue
      })
      certainKeys.value = __certainKeys
      modelValue.value = __modelValue
    } else {
      modelValue.value = _modelValue
    }
  } else {
    modelValue.value = modelValue.value === item.key ? '' : item.key
  }
  emit('change', { item, value: modelValue.value })
}

// 定义一个函数，传入数组树arrayTree和value列表values
const formatValues = ({ tree, values }: any): any => {
  let _modelValue = new Set(values) // 使用Set来存储结果值
  let _certainKeys = new Set(values)
  const stack = cloneDeep(tree) // 使用展开运算符创建栈，并初始化为数组树

  while (stack.length > 0) {
    const currentNode: any = stack.pop()
    const key = currentNode.key
    const childValues = currentNode.leafNodeValues || []
    const isAllChildValuesInValues = childValues.every((value: string) =>
      _modelValue.has(value)
    )
    if (!isAllChildValuesInValues && childValues.length > 0) {
      _modelValue.delete(key)
    } else if (childValues.length > 0) {
      _modelValue.add(key)
    }
    const array1 = Array.from(childValues)
    const array2 = Array.from(_modelValue)
    if (intersection(array1, array2).length > 0 && !_modelValue.has(key)) {
      _certainKeys.add(key)
    } else {
      _certainKeys.delete(key)
    }
  }
  return {
    __certainKeys: Array.from(_certainKeys),
    __modelValue: Array.from(_modelValue)
  } // 将Set转换为数组并返回
}
const getTreeList = () => {
  return cloneDeep(treeList.value)
}
defineExpose({ init, getTreeList })
</script>

<template>
  <div
    v-loading="{ visible: loading }"
    :style="{
      minHeight: loading ? '250px' : ''
    }"
  >
    <template v-if="treeList && treeList.length > 0 && !loading">
      <lew-flex
        v-for="(item, index) in treeList"
        :key="index"
        direction="y"
        gap="0px"
        x="start"
      >
        <div
          v-if="
            expandAll ||
            item.level === 0 ||
            ((expandedKeys || []).includes(item.parentKey as string | number) &&
              intersection(item.parentKeyPaths, expandedKeys).length ===
                (item.parentKeyPaths || []).length)
          "
          class="lew-tree-item"
          :class="{
            'lew-tree-item-expand-all': expandAll,
            'lew-tree-item-expand': (expandedKeys || []).includes(item.key),
            'lew-tree-item-certain':
              multiple &&
              certainKeys.includes(item.key) &&
              !(modelValue || []).includes(item.key),
            'lew-tree-item-selected': multiple
              ? (modelValue || []).includes(item.key)
              : modelValue === item.key,
            'lew-tree-item-leaf': item.isLeaf,
            'lew-tree-item-disabled': item.disabled
          }"
          :style="{
            paddingLeft: `${item.level * 26}px`
          }"
        >
          <div class="lew-tree-chevron-right" @click.stop="expandHandle(item)">
            <Icon
              v-if="loadingKeys.includes(item.key)"
              :size="14"
              animation="spin"
              animationSpeed="fast"
              class="lew-cascader-loading-icon"
              type="loader"
            />
            <Icon
              v-else
              class="lew-tree-chevron-right-icon"
              :size="14"
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
                !(modelValue || []).includes(item.key)
              "
              :checked="
                multiple
                  ? (modelValue || []).includes(item.key)
                  : modelValue === item.key
              "
              class="lew-tree-checkbox"
            />
            <slot
              v-if="$slots.item"
              name="item"
              :props="{
                ...item,
                checked: multiple
                  ? (modelValue || []).includes(item.key)
                  : modelValue === item.key
              }"
            ></slot>
            <span v-else>{{ item.label }}</span>
          </div>
        </div>
      </lew-flex>
    </template>
    <template v-else-if="!loading">
      <lew-flex>
        <slot v-if="$slots.empty" name="empty"></slot>
        <lew-empty v-else />
      </lew-flex>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.lew-tree-item {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  width: 100%;
  box-sizing: border-box;
  .lew-tree-chevron-right {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all var(--lew-form-transition-bezier);
    width: 14px;
    height: 14px;
    padding: 4px;
    border-radius: var(--lew-border-radius-small);
    margin-left: 5px;
    .lew-tree-chevron-right-icon {
      transform: rotate(0deg);
      transition: all var(--lew-form-transition-bezier);
    }
  }
  .lew-tree-chevron-right:hover {
    background-color: var(--lew-bgcolor-3);
  }
  .lew-tree-item-label {
    position: relative;
    padding: 4px 10px 4px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: var(--lew-border-radius-small);
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
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
    .lew-checkbox:deep(.icon-checkbox-box) {
      border: var(--lew-form-border-width)
        var(--lew-checkbox-border-color-hover) solid;
      outline: var(--lew-form-outline);
      background: var(--lew-form-bgcolor);
    }
  }
}
.lew-tree-item-selected {
  .lew-tree-item-label {
    color: var(--lew-color-primary);
    font-weight: 600;
  }
  .lew-tree-item-label:hover {
    .lew-checkbox:deep(.icon-checkbox-box) {
      border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      background: var(--lew-checkbox-color);
      .icon-checkbox {
        transform: translate(-50%, -50%) scale(0.7);
        opacity: 1;
      }
    }
  }
}

.lew-tree-item-certain {
  .lew-tree-item-label:hover {
    .lew-checkbox:deep(.icon-checkbox-box) {
      border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      background: var(--lew-checkbox-color);
    }
  }
}

.lew-tree-item-leaf {
  .lew-tree-chevron-right {
    opacity: 0;
  }
}
.lew-tree-item-disabled {
  .lew-tree-chevron-right {
    cursor: pointer;
  }
  .lew-tree-item-label {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
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
