<script setup lang="ts">
import { h } from 'vue'
import { treeProps, TreeDataSource } from './props'
import LewTreeItem from './LewTreeItem.vue'
import { LewFlex } from 'lew-ui'
import { cloneDeep } from 'lodash-es'
import transformTree from './transformTree'
import { any2px, numFormat } from 'lew-ui/utils'

const props = defineProps(treeProps)
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })
const _dataSource: any = ref<TreeDataSource[]>([])
const loading = ref<boolean>(false)
const keyword = ref<string>('')
const lastSearchKeyword = ref<string>('')
const searchTimer = ref<NodeJS.Timeout | null>(null)
const DEBOUNCE_TIME = 250
const cacheDataSource = ref<TreeDataSource[]>([])

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
  cacheDataSource: cacheDataSource,
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
      onChange: () =>
        emit('change', cloneDeep({ extend: item, key, value: key })),
      onExpand: () =>
        emit('expand', cloneDeep({ extend: item, key, value: key }))
    },
    () =>
      (item.children || []).map((child: TreeDataSource) =>
        renderMenuTreeItem(child, level + 1)
      )
  )
}

const emit = defineEmits(['change', 'expand', 'loadStart', 'loadEnd'])

const init = async (searchKeyword = '') => {
  if (searchKeyword === '' && cacheDataSource.value.length > 0) {
    _dataSource.value = cacheDataSource.value
    emit('loadEnd', getResultText.value)
    return
  }

  if (!props.isSelect) {
    loading.value = true
  }
  emit('loadStart')

  // 记录当前搜索的关键词
  lastSearchKeyword.value = searchKeyword

  const { dataSource, initTree, keyField, labelField, free } = props
  const { status, result, error } = (await transformTree({
    initTree,
    dataSource,
    keyField,
    labelField,
    free,
    keyword: searchKeyword
  })) as any

  // 如果在请求过程中关键词已经改变，则放弃这次结果
  if (lastSearchKeyword.value !== searchKeyword) {
    loading.value = false
    return
  }

  if (status === 'success') {
    _dataSource.value = result
    if (searchKeyword === '' && cacheDataSource.value.length === 0) {
      cacheDataSource.value = cloneDeep(result)
    }
  } else {
    LewMessage.error(error.message)
  }
  expandKeys.value = cloneDeep(expandKeys.value)
  modelValue.value = cloneDeep(modelValue.value)
  loading.value = false
  emit('loadEnd', getResultText.value)
}

const reset = () => {
  _dataSource.value = cloneDeep(cacheDataSource.value)
  emit('loadEnd', getResultText.value)
}

const search = (keyword: string) => {
  // 清除之前的定时器
  if (searchTimer.value !== null) {
    clearTimeout(searchTimer.value)
  }

  // 设置新的定时器
  searchTimer.value = setTimeout(() => {
    init(keyword)
    searchTimer.value = null
  }, DEBOUNCE_TIME)
}

const getResultText = computed(() => {
  return _dataSource.value.length > 0
    ? `共 ${numFormat(_dataSource.value.length)} 条结果`
    : ''
})

defineExpose({
  search,
  reset,
  getTree: () => _dataSource.value
})

onMounted(() => {
  init()
})
</script>

<template>
  <lew-flex
    v-loading="{
      visible: loading,
      text: '加载中...'
    }"
    direction="y"
    gap="0"
    class="lew-tree-wrapper"
  >
    <lew-flex
      v-if="searchable && !isSelect"
      direction="y"
      gap="0"
      class="lew-tree-header"
    >
      <lew-input
        width="100%"
        v-model="keyword"
        size="small"
        placeholder="搜索"
        @input="search(keyword)"
      />

      <div v-if="searchable && getResultText" class="lew-result-count">
        {{ getResultText }}
      </div>
    </lew-flex>
    <template v-if="_dataSource && _dataSource.length === 0">
      <slot v-if="$slots.empty" name="empty"></slot>
      <lew-flex v-else direction="y" x="center" class="lew-not-found">
        <lew-empty title="暂无结果" />
      </lew-flex>
    </template>
    <lew-flex
      direction="y"
      y="start"
      gap="0"
      class="lew-tree lew-scrollbar"
      :class="{ 'lew-tree-line': showLine }"
      :style="{ height: any2px(height) }"
    >
      <template v-for="item in _dataSource" :key="item.key">
        <component :is="renderMenuTreeItem(item)" />
      </template>
    </lew-flex>
  </lew-flex>
</template>

<style scoped lang="scss">
.lew-tree {
  width: 100%;
  box-sizing: border-box;
  transition: width 0.2s;
  box-sizing: border-box;
  overflow-y: auto;
  padding-right: 5px;
}
.lew-result-count {
  padding: 5px 12px;
  font-size: 13px;
  opacity: 0.4;
}
.lew-tree-line {
  :deep(.lew-tree-item-main) {
    border-left: 1px solid var(--lew-bgcolor-5);
    padding-left: 10px;
    width: calc(100% - 25.5px);
  }
}
</style>
