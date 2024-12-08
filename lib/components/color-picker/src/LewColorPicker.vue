<script setup lang="ts">
import { LewPopover } from 'lew-ui'
import { object2class } from 'lew-ui/utils'
import { colorPickerProps } from './props'
import { any2px } from 'lew-ui/utils'
const props = defineProps(colorPickerProps)

const modelValue = defineModel()
const emit = defineEmits(['change'])

const lewPickerRef = ref()
const lewPopoverRef = ref()

const state = reactive({
  pickerWidth: 0,
  visible: false
})

const show = () => {
  lewPopoverRef.value.show()
}

const hide = () => {
  lewPopoverRef.value.hide()
}

const getPickerClassName = computed(() => {
  return object2class('lew-color-picker', {})
})

const getPickerViewClassName = computed(() => {
  const { disabled } = props
  const focus = state.visible
  return object2class('lew-color-picker-view', {
    focus,
    disabled
  })
})

const getIconSize = computed(() => {
  const size = {
    small: 14,
    medium: 15,
    large: 16
  }
  return size.medium
})

const showHandle = () => {
  state.visible = true
}

const hideHandle = () => {
  state.visible = false
}
const getPickerStyle = computed(() => {
  const { size } = props
  return {
    height: `var(--lew-form-item-height-${size})`,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`
  }
})

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    popoverBodyClassName="lew-color-picker-popover-body"
    class="lew-color-picker-view"
    :class="getPickerViewClassName"
    :trigger="trigger"
    :disabled="disabled"
    placement="bottom-start"
    :style="{
      width: any2px(width)
    }"
    :offset="[-1, 10]"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div
        ref="lewPickerRef"
        class="lew-color-picker"
        :style="getPickerStyle"
        :class="getPickerClassName"
      >
        <div
          class="lew-color-preview"
          :style="{ backgroundColor: modelValue as string }"
        ></div>
        <div class="lew-color-value">{{ modelValue }}</div>
      </div>
    </template>
    <template #popover-body>
      <div
        class="lew-color-picker-body"
        :style="`width:${state.pickerWidth}px`"
      >
        <div class="lew-color-panel">
          <!-- 这里添加颜色选择面板的具体实现 -->
        </div>
      </div>
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-color-picker-view {
  width: 100%;
  box-sizing: border-box;
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  border-radius: var(--lew-border-radius-small);
  outline: 0px var(--lew-color-primary-light) solid;
  box-shadow: var(--lew-form-box-shadow);
  transition: all var(--lew-form-transition-ease);

  > div {
    width: 100%;
  }

  .lew-color-picker {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    padding: 0 8px;

    .lew-color-preview {
      width: 24px;
      height: 24px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .lew-color-value {
      margin-left: 8px;
      font-size: 14px;
      color: var(--lew-text-color);
    }
  }
}

.lew-color-picker-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

.lew-color-picker-view:active {
  background-color: var(--lew-form-bgcolor-active);
}

.lew-color-picker-view.lew-color-picker-view-focus {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-outline);
}

.lew-color-picker-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-color-picker-view-readonly {
  pointer-events: none;
}
</style>

<style lang="scss">
.lew-color-picker-popover-body {
  padding: 6px;
}

.lew-color-picker-body {
  width: 100%;
  box-sizing: border-box;

  .lew-color-panel {
    padding: 8px;
    border-radius: var(--lew-border-radius-small);
  }
}
</style>
