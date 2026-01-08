<script setup lang="ts">
import { LewPopover, LewTooltip, LewTree } from 'lew-ui'
import CommonInput from 'lew-ui/_components/CommonInput.vue'
import { any2px, findNodeByKey, object2class } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import { treeSelectEmits } from './emits'
import { treeSelectProps } from './props'

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const treeSelectValue = defineModel<string | string[]>()

const lewSelectRef = ref()
const lewPopoverRef = ref()
const lewTreeRef = ref()

const formMethods: any = inject('formMethods', {})

const _initMethod = computed(() => {
  if (isFunction(props.initMethod)) {
    return props.initMethod
  }
  else if (props.initMethodId) {
    return formMethods[props.initMethodId]
  }
  return undefined
})

const state = reactive({
  selectWidth: 0, // 选择框宽度
  visible: false, // 弹出框是否显示
  searchLoading: false, // 树加载
  initLoading: true, // 初始化 loading
  resultText: '',
})

function getSelectWidth() {
  if (lewSelectRef.value?.$el) {
    // 多选模式使用 CommonInput，需要访问 $el
    state.selectWidth = lewSelectRef.value.$el.clientWidth - 12
  }
  else if (lewSelectRef.value?.clientWidth) {
    // 单选模式直接访问 DOM
    state.selectWidth = lewSelectRef.value.clientWidth - 12
  }
}

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

function change(e: any) {
  emit('change', e)
  // 单选模式才自动关闭
  if (!props.multiple) {
    setTimeout(() => {
      hide()
    }, 100)
  }
  else {
    // 多选模式：刷新 popover 位置（因为 tag 数量可能变化）
    setTimeout(() => {
      if (lewPopoverRef.value) {
        lewPopoverRef.value.refresh()
      }
    }, 100)
  }
}

function clearHandle() {
  treeSelectValue.value = props.multiple ? [] : undefined
  emit('clear')
  emit('change', undefined)
  // 刷新 popover 位置（因为 tag 被清空）
  if (props.multiple) {
    setTimeout(() => {
      if (lewPopoverRef.value) {
        lewPopoverRef.value.refresh()
      }
    }, 100)
  }
}

// 格式化显示的标签（参考 Cascader 实现）
const formatItems = computed(() => {
  if (!treeSelectValue.value) {
    return props.multiple ? [] : ''
  }

  const tree = lewTreeRef.value?.getTree()
  if (!tree) {
    return props.multiple ? [] : ''
  }

  // 单选模式
  if (!props.multiple && treeSelectValue.value) {
    const treeItem: any = findNodeByKey(treeSelectValue.value as string, tree)
    if (!treeItem) {
      return ''
    }
    const { labelPaths, label } = treeItem
    return props.showAllLevels && labelPaths?.length > 0 ? labelPaths.join(' / ') : label
  }

  // 多选模式
  if (!Array.isArray(treeSelectValue.value)) {
    return []
  }

  return treeSelectValue.value.map((value: string) => {
    const treeItem: any = findNodeByKey(value, tree)
    if (!treeItem) {
      return {
        value,
        label: value,
      }
    }
    const { label, labelPaths } = treeItem
    return {
      value,
      // 多选模式只显示节点名称，不显示完整路径
      label: props.multiple
        ? label
        : props.showAllLevels && labelPaths?.length > 0
          ? labelPaths.join(' / ')
          : label,
    }
  })
})

// 删除标签
function deleteTag(value: string) {
  if (Array.isArray(treeSelectValue.value)) {
    treeSelectValue.value = treeSelectValue.value.filter(v => v !== value)
    emit('change', treeSelectValue.value)
    // 刷新 popover 位置（因为 tag 数量减少）
    setTimeout(() => {
      if (lewPopoverRef.value) {
        lewPopoverRef.value.refresh()
      }
    }, 100)
  }
}

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

function showHandle() {
  state.visible = true
  getSelectWidth()
}

function hideHandle() {
  state.visible = false
  // 如果有搜索功能，重置搜索（不清空选中值）
  if (props.searchable) {
    lewTreeRef.value.search('')
  }
}

// 监听 multiple 变化，确保多选模式下 modelValue 始终是数组
watch(
  () => props.multiple,
  (isMultiple) => {
    if (isMultiple && !Array.isArray(treeSelectValue.value)) {
      treeSelectValue.value = treeSelectValue.value
        ? [treeSelectValue.value as string]
        : []
    }
  },
  { immediate: true },
)

defineExpose({ show, hide })
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    popover-body-class-name="lew-select-popover-body"
    class="lew-select-view"
    :style="{ width: any2px(width) }"
    :trigger="trigger"
    :trigger-width="width"
    :disabled="disabled || readonly || state.initLoading"
    placement="bottom-start"
    :hide-on-click="searchable || multiple ? false : true"
    :loading="state.searchLoading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <CommonInput
        ref="lewSelectRef"
        v-model="treeSelectValue"
        :multiple
        :loading="state.initLoading"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled || state.initLoading"
        :size
        :placeholder
        :width="any2px(width)"
        :focus="state.visible"
        :format-items="formatItems"
        @clear="clearHandle"
        @delete="deleteTag"
      />
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="`width:${state.selectWidth}px`"
      >
        <slot name="header" />

        <div class="lew-select-options-box">
          <div v-if="searchable && state.resultText" class="result-count">
            {{ state.resultText }}
          </div>
          <div class="tree-select-wrapper lew-scrollbar">
            <LewTree
              ref="lewTreeRef"
              v-model="treeSelectValue"
              v-bind="{
                keyField,
                labelField,
                disabledField,
                showLine,
                checkable,
                searchable,
                dataSource,
                loadMethod,
                initMethod: _initMethod,
                expandAll,
                multiple,
                onlyLeafSelectable,
                free,
              }"
              :is-select="true"
              @load-start="state.searchLoading = true"
              @load-end="
                (state.searchLoading = false),
                (state.initLoading = false),
                (state.resultText = $event)
              "
              @change="change"
            >
              <template v-if="$slots.empty" #empty>
                <slot name="empty" />
              </template>
              <template v-if="$slots.item" #item="{ props: itemProps }">
                <slot name="item" :props="itemProps" />
              </template>
            </LewTree>
          </div>
        </div>
        <slot name="footer" />
      </div>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  > div {
    width: 100%;
  }
}
</style>

<style lang="scss">
.lew-select-popover-body {
  padding: 6px;
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;

  .tree-select-wrapper {
    padding: 5px 0px;
    max-height: 280px;
    overflow: auto;
  }

  .result-count {
    padding-left: 8px;
    margin: 5px 0px;
    opacity: 0.4;
    font-size: 13px;
  }

  .lew-select-options-box {
    overflow-y: auto;
    overflow-x: hidden;
    height: auto;
    box-sizing: border-box;
    transition: all 0.25s ease;
  }
}
</style>
