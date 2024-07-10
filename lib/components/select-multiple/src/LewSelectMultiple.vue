<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { LewPopover, LewIcon, LewTooltip } from 'lew-ui'
import { object2class, numFormat } from 'lew-ui/utils'
import { UseVirtualList } from '@vueuse/components'
import type { SelectMultipleOptions } from './props'
import { selectMultipleProps } from './props'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const props = defineProps(selectMultipleProps)
const emit = defineEmits(['change', 'select', 'clear', 'delete', 'blur'])
const selectValue: any = defineModel()

const lewSelectRef = ref()
const lewPopverRef = ref()
const lewPopverValueRef = ref()
const searchInputRef = ref()

const state = reactive({
  selectWidth: 0,
  visible: false,
  loading: false,
  options: props.options,
  keyword: ''
})

const getSelectWidth = () => {
  state.selectWidth = lewSelectRef.value?.clientWidth - 12
  if (props.searchable) {
    setTimeout(() => {
      searchInputRef.value && searchInputRef.value.focus()
    }, 100)
  }
}

const show = () => {
  lewPopverRef.value && lewPopverRef.value.show()
}

const hide = () => {
  lewPopverRef.value && lewPopverRef.value.hide()
}

const searchDebounce = useDebounceFn(async (e: any) => {
  search(e)
}, props.searchDelay)

const search = async (e?: any) => {
  // loading
  state.loading = true
  const keyword = e?.target.value
  if (props.searchable) {
    let result: any = []
    // 如果没输入关键词
    if (!keyword && props.options.length > 0) {
      result = props.options
    } else {
      result = await props.searchMethod({
        options: props.options,
        keyword
      })
    }
    state.options = result
  }
  state.loading = false
}

const clearHandle = () => {
  selectValue.value = []
  emit('clear')
  // 刷新位置
  setTimeout(() => {
    lewPopverRef.value && lewPopverRef.value.refresh()
  }, 100)
  emit('change', selectValue.value)
}

const deleteTag = (index: number) => {
  const item = selectValue.value[index]
  selectValue.value && selectValue.value.splice(index, 1)
  emit('delete', item)
  // 刷新位置
  if (selectValue.value.length === 0) {
    lewPopverValueRef.value && lewPopverValueRef.value.hide()
  }
  setTimeout(() => {
    lewPopverRef.value && lewPopverRef.value.refresh()
  }, 100)
  emit('change', selectValue.value)
}

const selectHandle = (item: SelectMultipleOptions) => {
  if (item.disabled) {
    return
  }

  const _value = selectValue.value || []

  const index = _value.findIndex((e: string | number) => e === item.value)

  if (index >= 0) {
    _value.splice(index, 1)
  } else {
    _value.push(item.value)
  }

  selectValue.value = _value
  emit('select', item)
  // 刷新位置
  setTimeout(() => {
    lewPopverRef.value && lewPopverRef.value.refresh()
  }, 100)
  emit('change', selectValue.value)
}

const getChecked = computed(() => (value: string | number) => {
  if (selectValue.value) {
    return JSON.parse(JSON.stringify(selectValue.value.includes(value)))
  }
  return false
})

const getLabels = computed(() => {
  if (state.options.length > 0) {
    const labels =
      selectValue.value &&
      selectValue.value.map((v: number | string) => {
        return state.options.find((e: SelectMultipleOptions) => v === e.value)?.label
      })
    return labels || []
  }
  return props?.defaultValue || selectValue.value || []
})

const getSelectClassName = computed(() => {
  let { clearable, size, align } = props
  clearable = clearable ? !!selectValue.value : false
  return object2class('lew-select', { clearable, size, align })
})

const getBodyClassName = computed(() => {
  const { size, disabled } = props
  return object2class('lew-select-body', { size, disabled })
})

const getSelectViewClassName = computed(() => {
  const { disabled, readonly } = props
  const focus = state.visible
  return object2class('lew-select-view', { focus, disabled, readonly })
})

const getSelectItemClassName = (e: any) => {
  const { disabled } = e
  const active = getChecked.value(e.value)
  const { align } = props

  return object2class('lew-select-item', {
    disabled,
    align,
    active
  })
}

const getIconSize = computed(() => {
  const size: any = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size[props.size]
})

const showHandle = () => {
  state.visible = true

  getSelectWidth()
  if (state.options && state.options.length === 0 && props.searchable) {
    search({ target: { value: '' } })
  }
}
const getVirtualHeight = computed(() => {
  let height = state.options.length * props.itemHeight
  height = height >= 280 ? 280 : height
  return `${height}px`
})

const hideHandle = () => {
  state.visible = false
  emit('blur')
}
onMounted(() => {
  getSelectWidth()
})

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopverRef"
    popoverBodyClassName="lew-select-multiple-popover-body"
    class="lew-select-view"
    :class="getSelectViewClassName"
    :trigger="trigger"
    :disabled="disabled"
    placement="bottom-start"
    style="width: 100%"
    :offset="[-1, 10]"
    :loading="state.loading"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div ref="lewSelectRef" class="lew-select" :class="getSelectClassName">
        <lew-icon
          v-if="!readonly"
          :size="getIconSize"
          type="chevron-down"
          class="icon-select"
          :class="{
            'icon-select-hide': clearable && getLabels && getLabels.length > 0
          }"
        />
        <transition name="lew-form-icon-ani">
          <lew-icon
            v-if="clearable && getLabels && getLabels.length > 0 && !readonly"
            :size="getIconSize"
            type="x"
            class="lew-form-icon-clear"
            :class="{
              'lew-form-icon-clear-focus': state.visible
            }"
            @click.stop="clearHandle"
          />
        </transition>
        <template v-if="getLabels && getLabels.length > 0">
          <lew-flex
            v-if="valueLayout === 'tag'"
            style="padding: 5px"
            x="start"
            y="center"
            :gap="5"
            wrap
            class="value"
          >
            <TransitionGroup name="list">
              <lew-tag
                v-for="(item, index) in getLabels"
                :key="index"
                type="light"
                :size="size"
                closable
                @close="deleteTag(index)"
              >
                {{ item }}
              </lew-tag>
            </TransitionGroup>
          </lew-flex>
          <template v-else>
            <lew-popover
              ref="lewPopverValueRef"
              trigger="hover"
              popoverBodyClassName="lew-select-multiple-popover-tag"
              :offset="[-1, 10]"
              placement="top-start"
              style="width: 100%"
            >
              <template #trigger>
                <div class="lew-select-multiple-text-value">
                  {{ getLabels.join(valueTextSplit) }}
                </div>
              </template>
              <template #popover-body>
                <lew-flex
                  x="start"
                  y="center"
                  :gap="5"
                  wrap
                  :style="`max-width:${state.selectWidth + 12}px`"
                  class="lew-select-multiple-tag-value"
                >
                  <lew-tag
                    v-for="(item, index) in getLabels"
                    :key="index"
                    type="light"
                    :size="size"
                    closable
                    @close="deleteTag(index)"
                  >
                    {{ item }}
                  </lew-tag>
                </lew-flex>
              </template>
            </lew-popover>
          </template>
        </template>
        <div v-show="getLabels && getLabels.length === 0" class="placeholder">
          {{ placeholder }}
        </div>
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-select-body"
        :class="getBodyClassName"
        :style="`width:${state.selectWidth}px`"
      >
        <slot name="header"></slot>
        <div v-if="searchable" class="search-input">
          <input
            ref="searchInputRef"
            v-model="state.keyword"
            placeholder="输入搜索关键词"
            @input="searchDebounce"
          />
        </div>
        <div class="lew-select-options-box">
          <template v-if="state.options && state.options.length === 0">
            <slot v-if="$slots.empty" name="empty"></slot>
            <lew-flex v-else direction="y" class="not-found">
              <lew-empty title="暂无结果" />
            </lew-flex>
          </template>
          <div v-if="searchable && state.options && state.options.length > 0" class="reslut-count">
            共
            {{ numFormat(state.options && state.options.length) }}
            条结果
          </div>

          <use-virtual-list
            v-if="state.options.length > 0"
            :key="getVirtualHeight"
            class="lew-select-options-list lew-scrollbar"
            :list="state.options"
            :options="{
              itemHeight
            }"
            :overscan="100"
            :height="getVirtualHeight"
          >
            <template #default="{ data: templateProps }">
              <!-- you can get current item of list here -->
              <div :style="{ height: itemHeight + 'px' }" @click="selectHandle(templateProps)">
                <slot
                  v-if="$slots.item"
                  name="item"
                  :props="{
                    ...templateProps,
                    checked: getChecked(templateProps.value)
                  }"
                ></slot>
                <div
                  v-else
                  class="lew-select-item lew-select-item-mul"
                  :class="getSelectItemClassName(templateProps)"
                >
                  <lew-checkbox
                    :key="templateProps.value"
                    class="lew-select-checkbox"
                    :checked="getChecked(templateProps.value)"
                  />
                  <lew-text-trim
                    :text="templateProps.label"
                    :delay="[500, 0]"
                    class="lew-select-label"
                  />
                </div>
              </div>
            </template>
          </use-virtual-list>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-select-view {
  width: 100%;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: all 0.15s ease;
  box-sizing: border-box;
  outline: 0px var(--lew-color-primary-light) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

  > div {
    width: 100%;
  }

  .lew-select {
    position: relative;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;

    .icon-select {
      position: absolute;
      top: 50%;
      right: 9px;
      transform: translateY(-50%) rotate(0deg);
      transition: var(--lew-form-transition);
      opacity: var(--lew-form-icon-opacity);
      padding: 2px;
    }

    .icon-select-hide {
      opacity: 0;
      transform: translate(100%, -50%);
    }

    .placeholder {
      color: rgb(165, 165, 165);
    }

    .lew-select-label-multiple {
      width: 100%;
      display: flex;
      align-items: center;

      .lew-popover {
        display: flex;
        align-items: center;

        > div {
          display: flex;
          align-items: center;
        }
      }
    }
    :deep() {
      .lew-tag {
        background-color: var(--lew-bgcolor-0) !important;
      }
    }
    .placeholder,
    .value {
      width: calc(100% - 24px);
      transition: all 0.2s;
      height: 100%;
    }
    .lew-select-multiple-text-value {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .lew-select-align-left {
    text-align: left;
  }

  .lew-select-align-center {
    text-align: center;
  }

  .lew-select-align-right {
    text-align: right;
  }

  .lew-select-size-small {
    min-height: var(--lew-form-item-height-small);

    .placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-small);
      line-height: var(--lew-form-item-height-small);
      margin-left: 10px;
    }
    .lew-select-multiple-text-value {
      padding-right: 26px;
    }
  }

  .lew-select-size-medium {
    min-height: var(--lew-form-item-height-medium);

    .placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-medium);
      line-height: var(--lew-form-item-height-medium);
      margin-left: 12px;
    }
    .lew-select-multiple-text-value {
      padding-right: 28px;
    }
  }

  .lew-select-size-large {
    min-height: var(--lew-form-item-height-large);

    .placeholder,
    .lew-select-multiple-text-value {
      font-size: var(--lew-form-font-size-large);
      line-height: var(--lew-form-item-height-large);
      margin-left: 14px;
    }
    .lew-select-multiple-text-value {
      padding-right: 30px;
    }
  }
}

.lew-select-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

.lew-select-view:active {
  background-color: var(--lew-form-bgcolor-active);
}

.lew-select-view.lew-select-view-focus {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-ouline);
  :deep() {
    .lew-tag {
      background-color: var(--lew-color-primary-light) !important;
    }
  }
  .icon-select {
    transform: translateY(-50%) rotate(180deg);
    color: var(--lew-text-color-1);
  }

  .icon-select-hide {
    opacity: 0;
    transform: translate(100%, -50%) rotate(180deg);
  }
}

.lew-select-view-readonly {
  pointer-events: none; //鼠标点击不可修改

  .lew-select {
    user-select: text;
  }
}

.lew-select-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-select-view-disabled:hover {
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  outline: 0px var(--lew-color-primary-light) solid;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.08s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}
</style>
<style lang="scss">
.lew-select-multiple-popover-body {
  padding: 6px;
}
.lew-select-multiple-popover-tag {
  .lew-select-multiple-tag-value {
    padding: 5px;
    box-sizing: border-box;
  }
}

.lew-select-body {
  width: 100%;
  box-sizing: border-box;
  .search-input {
    margin-bottom: 5px;

    input {
      outline: none;
      border: none;
      background-color: var(--lew-bgcolor-2);
      width: 100%;
      height: 32px;
      border-radius: var(--lew-border-radius-small);
      padding: 0px 10px;
      box-sizing: border-box;
      color: var(--lew-form-color);
      transition: var(--lew-form-transition);
    }

    input:focus {
      background-color: var(--lew-bgcolor-3);
    }
  }

  .reslut-count {
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
    margin-top: -4px;
    margin-bottom: -4px;

    .lew-select-item-mul {
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      margin-top: 2px;

      .lew-select-checkbox {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 12px;
      }

      .lew-select-label {
        position: relative;
        z-index: 5;
        height: 30px;
        line-height: 30px;
        padding-left: 38px;
        box-sizing: border-box;
        cursor: pointer !important;
      }
    }

    .lew-select-item-disabled {
      opacity: var(--lew-disabled-opacity);
      pointer-events: none; //鼠标点击不可修改
    }

    .lew-select-item-align-left {
      text-align: left;
    }

    .lew-select-item-align-center {
      text-align: center;
    }

    .lew-select-item-align-right {
      text-align: right;
    }

    .lew-select-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bg-active);
    }

    .lew-select-item-active {
      color: var(--lew-checkbox-color);
      font-weight: bold;
      background-color: var(--lew-pop-bg-active);

      .icon-check {
        margin-right: 10px;
      }
    }

    .lew-select-item-active:hover {
      color: var(--lew-checkbox-color);
      font-weight: bold;
      background-color: var(--lew-pop-bg-active);
    }
  }
}

.lew-select-item:hover {
  .lew-checkbox {
    .icon-checkbox-box {
      border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
      outline: var(--lew-form-ouline);
      background: var(--lew-form-bgcolor);
    }
  }
}

.lew-select-item-active:hover {
  .lew-checkbox {
    .icon-checkbox-box {
      border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
      background: var(--lew-checkbox-color);

      .icon-checkbox {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
