<script setup lang="ts">
import { h } from 'vue'
import { treeProps, TreeDataSource } from './props'
import LewTreeItem from './LewTreeItem.vue'
import { LewFlex } from 'lew-ui'
import { cloneDeep } from 'lodash-es'
import transformTree from './transformTree'
const props = defineProps(treeProps)
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })
const _dataSource: any = ref<TreeDataSource[]>([])
const loading = ref<boolean>(false)

provide('lew-tree', {
  modelValue,
  expandKeys,
  multiple: props.multiple,
  checkable: props.checkable,
  expandAll: props.expandAll,
  free: props.free,
  showLine: props.showLine,
  loadMethod: props.loadMethod,
  keyField: props.keyField,
  labelField: props.labelField,
  _dataSource: _dataSource
})

const renderMenuTreeItem = (item: TreeDataSource, level: number = 0): any => {
  const { disabled, label, key, isLeaf, children } = item
  return h(
    LewTreeItem,
    {
      label,
      key,
      __key: key,
      level,
      isLeaf: isLeaf !== undefined ? isLeaf : (children || []).length === 0,
      disabled,
      extend: item,
      onChange: () => emit('change', item)
    },
    () =>
      (item.children || []).map((child: TreeDataSource) =>
        renderMenuTreeItem(child, level + 1)
      )
  )
}
const emit = defineEmits(['change', 'initStart', 'initEnd'])

const init = async (keyword = '') => {
  if (!props.isSelect) {
    loading.value = true
  }
  emit('initStart')
  const { dataSource, initTree, keyField, labelField, free } = props
  const { status, result, error } = (await transformTree({
    initTree,
    dataSource,
    keyField,
    labelField,
    free,
    keyword
  })) as any
  if (status === 'success') {
    _dataSource.value = result
  } else {
    LewMessage.error(error.message)
  }
  expandKeys.value = cloneDeep(expandKeys.value)
  modelValue.value = cloneDeep(modelValue.value)
  loading.value = false
  emit('initEnd')
}

init()
onMounted(() => {})
</script>

<template>
  <lew-flex
    direction="y"
    gap="0"
    class="lew-tree"
    :class="{ 'lew-tree-line': showLine }"
    v-loading="{
      visible: loading,
      text: '加载中...'
    }"
  >
    <template v-for="item in _dataSource" :key="item.key">
      <component :is="renderMenuTreeItem(item)" />
    </template>
  </lew-flex>
</template>

<style scoped lang="scss">
.lew-tree {
  width: 100%;
  box-sizing: border-box;
  transition: width 0.2s;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-0);
}
.lew-tree-line {
  :deep(.lew-tree-item-main) {
    border-left: 1px solid var(--lew-bgcolor-5);
    padding-left: 10px;
  }
}
</style>
