<script setup lang="ts">
import type { LewTreeDataSource } from 'lew-ui/types'
import { LewFlex, LewMessage, locale } from 'lew-ui'
import { any2px, numFormat } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import LewTreeItem from './LewTreeItem.vue'
import { treeProps } from './props'
import transformTree from './transformTree'

const props = defineProps(treeProps)
const emit = defineEmits(['change', 'expand', 'loadStart', 'loadEnd'])
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })
const _dataSource: any = ref<LewTreeDataSource[]>([])
const loading = ref<boolean>(false)
const keyword = ref<string>('')
const lastSearchKeyword = ref<string>('')
const searchTimer = ref<NodeJS.Timeout | null>(null)
const DEBOUNCE_TIME = 250
const cacheDataSource = ref<LewTreeDataSource[]>([])

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
  cacheDataSource,
  _dataSource,
})

const getResultText = computed(() => {
  return _dataSource.value.length > 0
    ? locale.t('tree.resultCount', {
        num: numFormat(_dataSource.value.length),
      })
    : ''
})

function renderMenuTreeItem(item: LewTreeDataSource, level: number = 0): any {
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
      onChange: () => emit('change', cloneDeep({ extend: item, key, value: key })),
      onExpand: () => emit('expand', cloneDeep({ extend: item, key, value: key })),
    },
    () =>
      (item.children || []).map((child: LewTreeDataSource) =>
        renderMenuTreeItem(child, level + 1),
      ),
  )
}

async function init(searchKeyword = '') {
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

  const { dataSource, initMethod, keyField, labelField, free } = props
  const { status, result, error } = (await transformTree({
    initMethod,
    dataSource,
    keyField,
    labelField,
    free,
    keyword: searchKeyword,
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
  }
  else {
    LewMessage.error(error.message)
  }
  expandKeys.value = cloneDeep(expandKeys.value)
  modelValue.value = cloneDeep(modelValue.value)
  loading.value = false
  emit('loadEnd', getResultText.value)
}

function reset() {
  _dataSource.value = cloneDeep(cacheDataSource.value)
  emit('loadEnd', getResultText.value)
}

function search(keyword: string) {
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

defineExpose({
  search,
  reset,
  getTree: () => _dataSource.value,
})

onMounted(() => {
  init()
})
</script>

<template>
  <LewFlex
    v-loading="{
      visible: loading,
      text: '加载中...',
    }"
    direction="y"
    gap="0"
    class="lew-tree-wrapper"
  >
    <LewFlex v-if="searchable && !isSelect" direction="y" gap="0" class="lew-tree-header">
      <lew-input
        v-model="keyword"
        width="100%"
        size="small"
        :placeholder="locale.t('tree.searchPlaceholder')"
        @input="search(keyword)"
      />

      <div v-if="searchable && getResultText" class="lew-result-count">
        {{ getResultText }}
      </div>
    </LewFlex>
    <template v-if="_dataSource && _dataSource.length === 0">
      <slot v-if="$slots.empty" name="empty" />
      <LewFlex v-else direction="y" x="center" class="lew-not-found">
        <lew-empty :title="locale.t('tree.noResult')" />
      </LewFlex>
    </template>
    <LewFlex
      v-else
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
    </LewFlex>
  </LewFlex>
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
  opacity: 0.7;
}

.lew-tree-line {
  :deep(.lew-tree-item-main) {
    border-left: 1px solid var(--lew-bgcolor-5);
    padding-left: 10px;
    width: calc(100% - 25.5px);
  }
}
</style>
