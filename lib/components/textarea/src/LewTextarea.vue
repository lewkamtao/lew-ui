<script setup lang="ts">
import { useMagicKeys, useDebounceFn } from '@vueuse/core'
import { object2class, any2px } from 'lew-ui/utils'
import { LewIcon, LewTooltip } from 'lew-ui'
import { textareaProps } from './props'
import { toNumber } from 'lodash-es'
import { useResizeObserver } from '@vueuse/core'

const { shift, enter } = useMagicKeys()
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const lewTextareaRef = ref()
const lewTextareaViewRef = ref()

let resizeObj = ref({
  height: 0,
  width: 0
})

useResizeObserver(lewTextareaViewRef, () => {
  if (props.resize !== 'none') {
    const { width, height } = lewTextareaViewRef.value.getBoundingClientRect()
    resizeObj.value = {
      width,
      height
    }
  }
})

const emit = defineEmits([
  'update:type',
  'clear',
  'blur',
  'input',
  'focus',
  'change',
  'textarea',
  'ok'
])

const props = defineProps(textareaProps)
const modelValue: Ref<string | undefined> = defineModel()
const state = reactive({
  isFocus: false
})

const clear = (): void => {
  modelValue.value = undefined
  emit('clear')
}

const toFocus = () => {
  lewTextareaRef.value?.focus()
}

const getTextareaClassNames = computed(() => {
  const { size, readonly, disabled } = props
  return object2class('lew-textarea-view', {
    size,
    readonly,
    disabled
  })
})

const focus = (e: any) => {
  if (props.selectByFocus) {
    e?.currentTarget?.select()
  }
  state.isFocus = true
  emit('focus')
}

const blur = () => {
  emit('blur', modelValue)
  state.isFocus = false
}

const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 12,
    medium: 14,
    large: 16
  }
  return size[props.size]
})

const getTextareaStyle = computed(() => {
  const { width, height, size, resize, maxHeight, minHeight, maxWidth, minWidth } = props
  const heightMap: Record<string, number> = {
    small: 60,
    medium: 75,
    large: 90
  }
  const obj = {
    resize,
    minWidth: any2px(minWidth || width),
    minHeight: any2px(minHeight || (height ? height : heightMap[size])),
    maxWidth: any2px(maxWidth),
    maxHeight: any2px(maxHeight),
    width: any2px(width),
    height: any2px(height ? height : heightMap[size])
  }
  if (resizeObj.value.width > 0) {
    obj.width = resizeObj.value.width + 'px'
    obj.height = resizeObj.value.height + 'px'
  }
  return obj
})

if (props.okByEnter) {
  watchEffect(() => {
    if (shift.value && enter.value) {
      return
    } else if (enter.value && state.isFocus) {
      lewTextareaRef.value?.blur()
      ok()
    }
  })
}

const ok = useDebounceFn(() => {
  emit('ok', modelValue.value)
}, 250)

defineExpose({ toFocus })
</script>

<template>
  <div
    ref="lewTextareaViewRef"
    class="lew-textarea-view"
    :style="getTextareaStyle"
    :class="getTextareaClassNames"
  >
    <textarea
      ref="lewTextareaRef"
      v-model="modelValue"
      class="lew-textarea lew-scrollbar"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :readonly="readonly"
      @focus="focus"
      @blur="blur"
      @input="emit('input', modelValue)"
      @change="emit('change', modelValue)"
    ></textarea>

    <div v-if="modelValue && showCount" class="lew-textarea-count">
      {{ modelValue.length }}{{ maxLength ? ' / ' + maxLength : '' }}
    </div>
    <transition name="lew-form-icon-ani">
      <lew-icon
        v-if="clearable && modelValue && !readonly"
        :size="getIconSize"
        type="x"
        class="lew-form-icon-clear"
        :class="{
          'lew-form-icon-clear-focus': state.isFocus
        }"
        style="top: 14px"
        @click="clear"
        @mousedown.prevent=""
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.lew-textarea-view {
  position: relative;
  display: inline-flex;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: var(--lew-border-radius-small);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  outline: 0px var(--lew-form-border-color) solid;
  background-color: var(--lew-form-bgcolor);
  box-shadow: var(--lew-form-box-shadow);
  transition:
    var(--lew-form-transition-ease),
    width 0s,
    height 0s;

  .lew-textarea {
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    border: none;
    background: none;
    color: var(--lew-text-color-1);
    outline: none;
    box-sizing: border-box;
    resize: none;
  }

  .lew-textarea::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-textarea-count {
    position: absolute;
    bottom: 2px;
    right: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: var(--lew-bgcolor-1);
    padding: 0px 4px;
    z-index: 2;
    user-select: none;
    transition: var(--lew-form-transition-ease);
  }
  .lew-textarea-count:hover {
    opacity: 0.2;
  }
}

.lew-textarea-view-size-small {
  .lew-textarea {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);
  }

  .lew-textarea {
    min-height: var(--lew-form-item-height-small);
  }

  .lew-textarea-count {
    font-size: 12px;
  }
}

.lew-textarea-view-size-medium {
  .lew-textarea {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-textarea {
    min-height: var(--lew-form-item-height-medium);
  }
  .lew-textarea-count {
    font-size: 13px;
  }
}

.lew-textarea-view-size-large {
  .lew-textarea {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
  }

  .lew-textarea {
    min-height: var(--lew-form-item-height-large);
  }

  .lew-textarea-count {
    font-size: 14px;
  }
}

.lew-textarea-view-textarea {
  position: relative;
  flex-direction: column;
  justify-content: center;
}

.lew-textarea-view {
  .resize-btn {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 10px;
    height: 10px;
    border-radius: 4px;
    content: '';
    z-index: 9;
    opacity: 1;
    display: none;
  }
}

.lew-textarea-view-resize-both {
  .resize-btn {
    display: block;
    cursor: nwse-resize;
  }
}

.lew-textarea-view-resize-vertical {
  .resize-btn {
    display: block;
    cursor: row-resize;
  }
}

.lew-textarea-view-resize-horizontal {
  .resize-btn {
    display: block;
    cursor: col-resize;
  }
}

.lew-textarea-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

.lew-textarea-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  outline: var(--lew-form-outline);
  background-color: var(--lew-form-bgcolor-focus);

  .lew-textarea-controls {
    background: var(--lew-form-bgcolor-focus);
  }
}

.lew-textarea-view-readonly {
  user-select: text;
  pointer-events: none; //鼠标点击不可修改
}

.lew-textarea-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-textarea-view-disabled:hover {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}

.lew-textarea-view-disabled:active {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}

.lew-textarea-view-disabled:focus-within {
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
  background-color: var(--lew-form-bgcolor);
}
</style>
