<script setup lang="ts">
import {
  LewCheckbox,
  LewCollapseTransition,
  LewMessage,
  LewTextTrim,
} from 'lew-ui'
import {
  findAllChildrenKeys,
  findNodeByKey,
  formatComponent,
  insertChildByKey,
  isVueComponent,
} from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { cloneDeep } from 'lodash-es'
import { treeItemProps } from './props'
import transformTree, { formatTree } from './transformTree'

const props = defineProps(treeItemProps)

const emit = defineEmits(['change', 'expand'])

const {
  modelValue,
  expandKeys,
  multiple,
  checkable,
  expandAll,
  _dataSource,
  loadMethod,
  keyField,
  labelField,
  free,
  cacheDataSource,
}: any = inject('lew-tree')

const loading = ref(false)
const loaded = ref(false)

function areSomeChildrenSelected(node: any): boolean {
  if (!node.children || node.children.length === 0)
    return false

  const childKeys = findAllChildrenKeys(node)
  return (
    childKeys.some(key => modelValue.value.includes(key))
    && !childKeys.every(key => modelValue.value.includes(key))
  )
}

function select() {
  if (props.disabled)
    return
  // 创建一个变量来存储最终的绑定值
  let newModelValue = cloneDeep(modelValue.value)

  if (multiple) {
    const index = newModelValue.indexOf(props.__key)
    if (free) {
      if (index > -1) {
        newModelValue.splice(index, 1)
      }
      else {
        newModelValue.push(props.__key)
      }
    }
    else {
      if (index > -1) {
        newModelValue.splice(index, 1)
        if (
          props.extend
          && props.extend.children
          && props.extend.children.length > 0
        ) {
          const childKeys = findAllChildrenKeys(props.extend)
          newModelValue = newModelValue.filter(
            (key: string | number) => !childKeys.includes(key),
          )
        }
        if (
          props.extend
          && props.extend.parentKeyPaths
          && props.extend.parentKeyPaths.length > 0
        ) {
          props.extend.parentKeyPaths.forEach((parentKey: string | number) => {
            const parentIndex = newModelValue.indexOf(parentKey)
            if (parentIndex > -1) {
              newModelValue.splice(parentIndex, 1)
            }
          })
        }
      }
      else {
        newModelValue.push(props.__key)
        if (
          props.extend
          && props.extend.children
          && props.extend.children.length > 0
        ) {
          const childKeys = findAllChildrenKeys(props.extend)
          childKeys.forEach((key: string | number) => {
            if (!newModelValue.includes(key)) {
              newModelValue.push(key)
            }
          })
        }
      }
      if (
        props.extend
        && props.extend.parentKey
        && props.extend.parentKeyPaths
      ) {
        const parentKey = props.extend.parentKey
        const parentNode = findNodeByKey(parentKey, _dataSource.value)
        const siblingKeys = (parentNode?.children || []).map((e: any) => e.key)
        if (
          siblingKeys.length > 0
          && siblingKeys.every((key: string | number) =>
            newModelValue.includes(key),
          )
        ) {
          if (!newModelValue.includes(parentKey)) {
            newModelValue.push(parentKey)
          }
        }
        else {
          newModelValue = newModelValue.filter(
            (key: string | number) => key !== parentKey,
          )
        }
      }
    }
  }
  else {
    newModelValue = props.__key
  }

  // 最终结果赋值给modelValue
  modelValue.value = newModelValue
  emit('change')
}

async function expand() {
  if (!props.isLeaf) {
    const index = expandKeys.value.indexOf(props.__key)
    if (index > -1) {
      expandKeys.value.splice(index, 1)
    }
    else if (loadMethod && !loading.value && !loaded.value) {
      loading.value = true
      const _tree
        = ((await loadMethod(
          cloneDeep({
            ...props,
            key: props.__key,
            value: props.__key,
            extend: props.extend,
          }) as any,
        )) as any) || []

      const { status, result, error } = (await transformTree({
        dataSource: _tree,
        keyField,
        labelField,
        free,
      })) as any
      if (status === 'success') {
        loaded.value = true
        insertChildByKey(
          _dataSource.value,
          props.__key as string | number,
          result,
        )

        _dataSource.value = formatTree({
          dataSource: _dataSource.value,
          keyField,
          labelField,
          free,
        })

        cacheDataSource.value = cloneDeep(_dataSource.value)

        console.log(_dataSource.value, 'lew-tree-item')
        expandKeys.value = [
          ...(expandKeys.value as (string | number)[]),
          props.__key,
        ]
      }
      else {
        loaded.value = false
        LewMessage.error(error.message)
      }
      loading.value = false
    }
    else {
      expandKeys.value.push(props.__key)
    }
  }
  expandKeys.value = cloneDeep(expandKeys.value)
  emit('expand')
}

// 计算节点的选中状态
const isNodeSelected = computed(() => {
  if (multiple) {
    return modelValue.value.includes(props.__key)
  }
  else {
    return modelValue.value === props.__key
  }
})

// 计算节点的部分选中状态
const isNodePartiallySelected = computed(() => {
  if (!multiple || free)
    return false

  return props.extend && areSomeChildrenSelected(props.extend)
})
</script>

<template>
  <div
    class="lew-tree-item"
    :class="{
      'lew-tree-item-expand-all': expandAll,
      'lew-tree-item-expand': (expandKeys || []).includes(__key),
      'lew-tree-item-certain': isNodePartiallySelected,
      'lew-tree-item-selected': isNodeSelected,
      'lew-tree-item-leaf': isLeaf,
      'lew-tree-item-disabled': disabled,
    }"
  >
    <div class="lew-tree-chevron-right" @click.stop="expand">
      <Icon
        v-if="loading"
        :size="14"
        loading
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
    <div class="lew-tree-item-label" @click="select">
      <LewCheckbox
        v-if="checkable"
        :certain="isNodePartiallySelected"
        :checked="isNodeSelected"
        class="lew-tree-checkbox"
      />
      <slot
        v-if="$slots.item"
        name="item"
        :props="{
          ...props,
          checked: isNodeSelected,
          certain: isNodePartiallySelected,
        }"
      />
      <template v-else>
        <component :is="formatComponent(icon)" v-if="isVueComponent(icon)" />
        <LewTextTrim
          v-else
          placement="right"
          :text="label"
          :delay="[250, 250]"
        />
      </template>
    </div>
  </div>
  <LewCollapseTransition v-if="!isLeaf">
    <div
      v-if="
        ((expandKeys || []).length > 0 && expandKeys.includes(__key))
          || expandAll
      "
      class="lew-tree-item-main"
    >
      <slot />
    </div>
  </LewCollapseTransition>
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
    background-color: var(--lew-pop-bgcolor-hover);
  }
  .lew-tree-item-label {
    position: relative;
    padding: 4px 10px 4px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: calc(var(--lew-border-radius-small) - 1px);
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
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
    background-color: var(--lew-pop-bgcolor-hover);
    user-select: none;
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
      border: var(--lew-form-border-width)
        var(--lew-checkbox-border-color-hover) solid;

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
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
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
    .lew-checkbox:deep(.lew-checkbox-icon-box) {
      border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      background: var(--lew-checkbox-color);
    }
  }
}

.lew-tree-item-leaf {
  .lew-tree-chevron-right {
    opacity: 0;
  }
  .lew-tree-chevron-right {
    cursor: default;
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
.lew-tree-item-main {
  display: flex;
  flex-direction: column;
  margin-left: 15.5px;
  width: calc(100% - 15.5px);
  box-sizing: border-box;
}
</style>
