<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useDebounceFn, useMagicKeys } from '@vueuse/core'
import { LewTooltip, locale } from 'lew-ui'
import CloseIcon from 'lew-ui/_components/CloseIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { textareaEmits } from './emits'
import { textareaProps } from './props'

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)
const { shift, enter } = useMagicKeys()
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const lewTextareaRef = ref<HTMLTextAreaElement>()
const wrapperRef = ref<HTMLElement>()

const modelValue: Ref<string | undefined> = defineModel()
const state = reactive({
  isFocus: false,
})

/** 用户拖动手柄后的像素尺寸；未拖动轴向沿用 props（如 width: 100%） */
const userBoxPx = reactive<{ w?: number, h?: number }>({})

let resizeSession: {
  pointerId: number
  startX: number
  startY: number
  startW: number
  startH: number
  minW: number
  maxW: number
  minH: number
  maxH: number
} | null = null

function clear(): void {
  modelValue.value = undefined
  emit('clear')
  emit('change', undefined)
}

function focus() {
  lewTextareaRef.value?.focus()
}

function blur() {
  lewTextareaRef.value?.blur()
}

const getTextareaClassNames = computed(() => {
  const { size, readonly, disabled } = props
  return object2class('lew-textarea-view', {
    size,
    readonly,
    disabled,
  })
})

function _focus(e: any) {
  if (props.selectByFocus) {
    e?.currentTarget?.select()
  }
  state.isFocus = true
}

function _blur() {
  state.isFocus = false
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('input', target.value)
}

function handleChange(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('change', target.value)
}

const resizeHoriz = computed(
  () => props.resize === 'horizontal' || props.resize === 'both',
)
const resizeVert = computed(
  () => props.resize === 'vertical' || props.resize === 'both',
)
const showResizeHandle = computed(
  () => props.resize !== 'none' && !props.disabled,
)

function parseCssBoundPx(raw: string, kind: 'min' | 'max'): number {
  const s = raw?.trim() ?? ''
  if (kind === 'max' && (s === '' || s === 'none')) {
    return Number.POSITIVE_INFINITY
  }
  if (kind === 'min' && (s === '' || s === 'auto')) {
    return 0
  }
  const n = Number.parseFloat(s)
  if (!Number.isFinite(n)) {
    return kind === 'min' ? 0 : Number.POSITIVE_INFINITY
  }
  return n
}

function clamp(n: number, min: number, max: number): number {
  if (max < min) {
    return n
  }
  return Math.min(max, Math.max(min, n))
}

function readResizeBounds(el: HTMLElement) {
  const cs = getComputedStyle(el)
  return {
    minW: parseCssBoundPx(cs.minWidth, 'min'),
    maxW: parseCssBoundPx(cs.maxWidth, 'max'),
    minH: parseCssBoundPx(cs.minHeight, 'min'),
    maxH: parseCssBoundPx(cs.maxHeight, 'max'),
  }
}

function onResizePointerDown(e: PointerEvent) {
  if (!showResizeHandle.value) {
    return
  }
  e.preventDefault()
  e.stopPropagation()
  const wrap = wrapperRef.value
  if (!wrap) {
    return
  }
  const rect = wrap.getBoundingClientRect()
  const b = readResizeBounds(wrap)
  resizeSession = {
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    startW: rect.width,
    startH: rect.height,
    minW: b.minW,
    maxW: b.maxW,
    minH: b.minH,
    maxH: b.maxH,
  }
  document.body.style.userSelect = 'none'
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onResizePointerMove(e: PointerEvent) {
  if (!resizeSession || e.pointerId !== resizeSession.pointerId) {
    return
  }
  const dx = e.clientX - resizeSession.startX
  const dy = e.clientY - resizeSession.startY
  if (resizeHoriz.value) {
    userBoxPx.w = clamp(
      resizeSession.startW + dx,
      resizeSession.minW,
      resizeSession.maxW,
    )
  }
  if (resizeVert.value) {
    userBoxPx.h = clamp(
      resizeSession.startH + dy,
      resizeSession.minH,
      resizeSession.maxH,
    )
  }
}

function endResize(e: PointerEvent) {
  if (!resizeSession || e.pointerId !== resizeSession.pointerId) {
    return
  }
  const target = e.currentTarget as HTMLElement
  try {
    target.releasePointerCapture(e.pointerId)
  }
  catch {
    /* ignore */
  }
  resizeSession = null
  document.body.style.userSelect = ''
}

function onResizeLostCapture(e: PointerEvent) {
  if (resizeSession && e.pointerId === resizeSession.pointerId) {
    resizeSession = null
    document.body.style.userSelect = ''
  }
}

const wrapperStyle = computed((): CSSProperties => {
  const { width, height, minWidth, minHeight, maxWidth, maxHeight } = props
  const style: CSSProperties = {
    minWidth: any2px(minWidth),
    maxWidth: any2px(maxWidth),
    minHeight: any2px(minHeight),
    maxHeight: any2px(maxHeight),
  }
  if (userBoxPx.w != null && resizeHoriz.value) {
    style.width = `${userBoxPx.w}px`
  }
  else {
    const w = any2px(width)
    if (w) {
      style.width = w
    }
  }
  if (userBoxPx.h != null && resizeVert.value) {
    style.height = `${userBoxPx.h}px`
  }
  else {
    const h = any2px(height)
    if (h) {
      style.height = h
    }
  }
  return style
})

const textareaStyle = computed(
  (): CSSProperties => ({
    resize: 'none',
    width: '100%',
    height: '100%',
    minHeight: 0,
    maxHeight: 'none',
  }),
)

const resizeHandleCursor = computed(() => {
  if (props.resize === 'vertical') {
    return 'ns-resize'
  }
  if (props.resize === 'horizontal') {
    return 'ew-resize'
  }
  return 'nwse-resize'
})

watch(
  () =>
    [
      props.width,
      props.height,
      props.minWidth,
      props.minHeight,
      props.maxWidth,
      props.maxHeight,
      props.resize,
    ] as const,
  () => {
    userBoxPx.w = undefined
    userBoxPx.h = undefined
  },
)

const ok = useDebounceFn(() => {
  emit('ok', modelValue.value)
}, 250)

if (props.okByEnter) {
  watchEffect(() => {
    if (shift.value && enter.value) {
      // Do nothing when shift+enter is pressed
    }
    else if (enter.value && state.isFocus) {
      lewTextareaRef.value?.blur()
      ok()
    }
  })
}

defineExpose({ focus, blur })
</script>

<template>
  <div
    ref="wrapperRef"
    class="lew-textarea-view"
    :class="[
      getTextareaClassNames,
      { 'lew-textarea-view--clearable': clearable && !readonly },
    ]"
    :style="wrapperStyle"
  >
    <textarea
      ref="lewTextareaRef"
      v-model="modelValue"
      class="lew-textarea lew-scrollbar"
      :style="textareaStyle"
      :placeholder="
        placeholder ? placeholder : locale.t('textarea.placeholder')
      "
      :maxlength="maxLength"
      :disabled="disabled"
      :readonly="readonly"
      @focus="_focus"
      @blur="_blur"
      @input="handleInput"
      @change="handleChange"
    />

    <button
      v-if="showResizeHandle"
      type="button"
      class="lew-textarea-resize-handle"
      :style="{ cursor: resizeHandleCursor }"
      :aria-label="locale.t('textarea.resizeHandle')"
      tabindex="-1"
      @pointerdown="onResizePointerDown"
      @pointermove="onResizePointerMove"
      @pointerup="endResize"
      @pointercancel="endResize"
      @lostpointercapture="onResizeLostCapture"
    />

    <div
      v-if="modelValue && showCount"
      class="lew-textarea-count"
      :class="{ 'lew-textarea-count--with-handle': showResizeHandle }"
    >
      {{ modelValue.length }}{{ maxLength ? ` / ${maxLength}` : "" }}
    </div>
    <CloseIcon
      v-if="clearable && modelValue && !readonly"
      :size="size"
      class="lew-form-icon-close"
      @click.stop="clear"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-textarea-view {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: var(--lew-border-radius-small);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  background-color: var(--lew-form-bgcolor);
  box-shadow: var(--lew-form-box-shadow);
  transition:
    all var(--lew-form-transition-ease),
    width 0s,
    height 0s;

  .lew-textarea {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    text-overflow: ellipsis;
    border: none;
    background: none;
    color: var(--lew-text-color-1);
    outline: none;
    box-sizing: border-box;
  }

  .lew-textarea::placeholder {
    color: var(--lew-form-placeholder-color);
  }

  .lew-textarea-resize-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
    width: 14px;
    height: 14px;
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 0 0 var(--lew-border-radius-small) 0;
    background: transparent;
    touch-action: none;

    &::after {
      content: '';
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 7px;
      height: 7px;
      border-right: 2px solid var(--lew-text-color-5);
      border-bottom: 2px solid var(--lew-text-color-5);
      opacity: 0.55;
      pointer-events: none;
    }

    &:hover::after {
      opacity: 0.85;
    }
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
    transition: opacity var(--lew-form-transition-ease);
  }

  .lew-textarea-count--with-handle {
    right: 16px;
  }

  .lew-textarea-count:hover {
    opacity: 0.2;
  }

  .lew-form-icon-close {
    position: absolute;
    right: 10px;
  }
}

.lew-textarea-view-size-small {
  min-height: var(--lew-form-item-height-small);
  .lew-textarea {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-textarea-count {
    font-size: 12px;
    line-height: 18px;
  }
  .lew-form-icon-close {
    top: 5px;
  }
}

.lew-textarea-view-size-medium {
  min-height: var(--lew-form-item-height-medium);
  .lew-textarea {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-textarea-count {
    font-size: 13px;
    line-height: 20px;
  }
  .lew-form-icon-close {
    top: 6px;
  }
}

.lew-textarea-view-size-large {
  line-height: var(--lew-form-input-line-height-large);
  .lew-textarea {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-textarea-count {
    font-size: 14px;
    line-height: 22px;
  }
  .lew-form-icon-close {
    top: 7px;
  }
}

/* clearable：为右上角关闭按钮预留右侧空间；未开启时保持表单默认左右对称 padding，内容占满可用宽度 */
.lew-textarea-view--clearable.lew-textarea-view-size-small .lew-textarea {
  padding-right: 32px;
}

.lew-textarea-view--clearable.lew-textarea-view-size-medium .lew-textarea {
  padding-right: 34px;
}

.lew-textarea-view--clearable.lew-textarea-view-size-large .lew-textarea {
  padding-right: 36px;
}

.lew-textarea-view:hover {
  background-color: var(--lew-form-bgcolor-hover);
}

.lew-textarea-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  background-color: var(--lew-form-bgcolor-focus);

  .lew-textarea-controls {
    background: var(--lew-form-bgcolor-focus);
  }
}

.lew-textarea-view-readonly {
  user-select: text;
  /* 保留选择与复制，仅依赖 readonly 属性禁止编辑 */
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
