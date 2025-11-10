<script setup lang="ts">
import type { LewTreeDataSource } from 'lew-ui/types'
import type { TreeContext } from './types'
import { useDebounceFn } from '@vueuse/core'
import { LewFlex, LewMessage, locale } from 'lew-ui'
import { useTreeSelection } from 'lew-ui/hooks'
import { any2px, numFormat } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { treeEmits } from './emits'
import LewTreeItem from './LewTreeItem.vue'
import { treeProps } from './props'
import transformTree from './transformTree'
import { TREE_INJECTION_KEY } from './types'

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
const modelValue = defineModel<string | string[]>()
const expandKeys = defineModel<string[]>('expandKeys', { required: false, default: [] })
const dataSource = ref<LewTreeDataSource[]>([])
const loading = ref<boolean>(false)
const keyword = ref<string>('')
const lastSearchKeyword = ref<string>('')
const cacheDataSource = ref<LewTreeDataSource[]>([])

// 使用 useTreeSelection Hook 管理选中和半选状态
let isInternalUpdate = false // 标记是否为内部更新，避免循环触发
const {
  selectedKeys,
  init: initTreeSelection,
  isSelected,
  isIndeterminate,
  toggleKey,
  addKey,
  removeKey,
  findItemsByValues,
} = useTreeSelection()

// 创建类型安全的 context
const treeContext: TreeContext = {
  // 只读配置
  multiple: props.multiple,
  checkable: props.checkable,
  expandAll: props.expandAll,
  free: props.free,
  showLine: props.showLine,
  onlyLeafSelectable: props.onlyLeafSelectable,
  keyField: props.keyField,
  labelField: props.labelField,

  // 状态 refs
  modelValue,
  expandKeys,
  dataSource,
  cacheDataSource,

  // 方法
  loadMethod: props.loadMethod,

  // Tree Selection - 只在多选且非 free 模式下提供
  treeSelection:
    props.multiple && !props.free
      ? {
          isSelected: isSelected.value,
          isIndeterminate: isIndeterminate.value,
          toggleKey,
          addKey,
          removeKey,
        }
      : undefined,
}

provide(TREE_INJECTION_KEY, treeContext)

const getResultText = computed(() => {
  return dataSource.value.length > 0
    ? locale.t('tree.resultCount', {
        num: numFormat(dataSource.value.length),
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
      onChange: () => {
        // 使用 nextTick 确保 modelValue 已更新
        nextTick(() => {
          // 在多选模式下发出完整的 modelValue，单选模式发出单个值
          const value = props.multiple ? modelValue.value : key
          emit('change', cloneDeep({ extend: item, key, value }))
        })
      },
      onExpand: () => emit('expand', cloneDeep({ extend: item, key, value: key })),
    },
    () =>
      (item.children || []).map((child: LewTreeDataSource) =>
        renderMenuTreeItem(child, level + 1),
      ),
  )
}

// 更新 modelValue 的函数
function updateModelValue() {
  isInternalUpdate = true

  if (!props.multiple) {
    // 单选模式：直接使用 selectedKeys 的第一个值
    modelValue.value = selectedKeys.value[0] || undefined
  }
  else if (props.onlyLeafSelectable) {
    // 多选模式 + 只能选择叶子节点：过滤出叶子节点
    const items = findItemsByValues(selectedKeys.value).filter(
      (item: any) => item.isLeaf,
    )
    modelValue.value = items.map((item: any) => item.key)
  }
  else {
    // 多选模式：使用所有选中的 keys
    modelValue.value = cloneDeep(selectedKeys.value)
  }

  nextTick(() => {
    isInternalUpdate = false
  })
}

// 初始化树结构和选中状态
function initTreeStructure() {
  if (dataSource.value.length > 0 && props.multiple && !props.free) {
    const currentKeys
      = modelValue.value && Array.isArray(modelValue.value) ? modelValue.value : []
    initTreeSelection({ tree: dataSource.value, keys: currentKeys })
  }
}

async function init(searchKeyword = '') {
  if (searchKeyword === '' && cacheDataSource.value.length > 0) {
    dataSource.value = cacheDataSource.value
    initTreeStructure() // 初始化选中状态
    emit('loadEnd', getResultText.value)
    return
  }

  if (!props.isSelect) {
    loading.value = true
  }
  emit('loadStart')

  // 记录当前搜索的关键词
  lastSearchKeyword.value = searchKeyword

  const { dataSource: propsDataSource, initMethod, keyField, labelField, free } = props
  const { status, result, error } = (await transformTree({
    initMethod,
    dataSource: propsDataSource,
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
    dataSource.value = result
    if (searchKeyword === '' && cacheDataSource.value.length === 0) {
      cacheDataSource.value = cloneDeep(result)
    }
    // 初始化选中状态
    initTreeStructure()
  }
  else {
    LewMessage.error(error.message)
  }
  loading.value = false
  emit('loadEnd', getResultText.value)
}

function reset() {
  // 重置数据源
  dataSource.value = cloneDeep(cacheDataSource.value)

  // 重置选中状态
  if (props.multiple && !props.free) {
    initTreeSelection({ keys: [] })
  }
  else {
    modelValue.value = props.multiple ? [] : undefined
  }

  // 重置搜索关键词
  keyword.value = ''
  lastSearchKeyword.value = ''

  emit('loadEnd', getResultText.value)
}

// 使用 useDebounceFn 进行防抖搜索
const search = useDebounceFn((keyword: string) => {
  init(keyword)
}, 250)

// 监听 selectedKeys 变化，同步到 modelValue
// 注意：数组的变化会自动触发 watch，不需要 deep: true
watch(selectedKeys, () => {
  if (!isInternalUpdate && props.multiple && !props.free) {
    updateModelValue()
  }
})

// 监听外部 modelValue 变化，同步到 Hook
watch(
  () => modelValue.value,
  (newValue) => {
    if (isInternalUpdate) {
      return
    }
    if (props.multiple && !props.free && dataSource.value.length > 0) {
      const keys = Array.isArray(newValue) ? newValue : []
      initTreeSelection({ keys })
    }
  },
  { immediate: false, deep: true },
)

// 监听 multiple 变化，确保多选模式下 modelValue 始终是数组
watch(
  () => props.multiple,
  (isMultiple) => {
    if (isMultiple && !Array.isArray(modelValue.value)) {
      modelValue.value = modelValue.value ? [modelValue.value as string] : []
    }
  },
  { immediate: true },
)

defineExpose({
  search,
  reset,
  getTree: () => dataSource.value,
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
    <template v-if="dataSource && dataSource.length === 0">
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
      <template v-for="item in dataSource" :key="item.key">
        <component :is="renderMenuTreeItem(item)" />
      </template>
    </LewFlex>
  </LewFlex>
</template>

<style scoped lang="scss">
.lew-tree {
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  padding-right: 5px;
  transition: width 0.2s;
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
