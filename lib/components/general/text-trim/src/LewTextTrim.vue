<script setup lang="ts">
import type { Instance } from 'tippy.js'
import type { CSSProperties } from 'vue'
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import tippy, { roundArrow } from 'tippy.js'
import { textTrimEmits } from './emits'
import { textTrimProps } from './props'
import { getDisplayText } from './text-trim'

const props = defineProps(textTrimProps)
defineEmits(textTrimEmits)

const lewTextTrimRef = ref<HTMLDivElement>()
const lewTextTrimPopRef = ref<HTMLDivElement>()
const displayText = ref('')
const isEllipsisByTextTrim = ref(false)
const isEllipsis = ref(false)

let tippyInstance: Instance | null = null
let isHoveringTrigger = false
let isHoveringTooltip = false
let isSelectingInTooltip = false
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function isPointerOver(): boolean {
  return isHoveringTrigger || isHoveringTooltip || isSelectingInTooltip
}

// 缓存上一次计算的输入，避免重复计算
let lastCalculateInput = { text: '', reserveEnd: 0, width: 0, lineClamp: 0 }

function clearShowTimer(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer)
    showTimer = null
  }
}

function clearHideTimer(): void {
  if (hideTimer !== null) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function clearHoverTimers(): void {
  clearShowTimer()
  clearHideTimer()
}

function getDelay(): [number, number] {
  const delay = props.delay
  if (Array.isArray(delay) && delay.length >= 2) {
    return [delay[0] ?? 0, delay[1] ?? 0]
  }
  return [0, 0]
}

const hasEllipsis = computed(() => isEllipsis.value || isEllipsisByTextTrim.value)

const textTrimClass = computed(() => ({
  'lew-text-trim-wrapper': true,
  'lew-text-trim-wrapper--line-clamp': props.lineClamp,
  'lew-text-trim-wrapper--single-line': !props.lineClamp,
  'lew-text-trim-wrapper--ellipsis': hasEllipsis.value,
  [`lew-text-trim-wrapper--align-${props.textAlign}`]:
    props.textAlign && props.textAlign !== 'left',
}))

const textTrimStyle = computed((): CSSProperties => {
  if (props.lineClamp) {
    return {
      WebkitLineClamp: props.lineClamp,
    }
  }
  if ((props.reserveEnd || 0) > 0) {
    return {}
  }
  return {
    textOverflow: 'ellipsis',
  }
})

function checkEllipsis(): boolean {
  const element = lewTextTrimRef.value
  if (!element)
    return false

  if (props.lineClamp) {
    return element.offsetHeight < element.scrollHeight
  }
  return element.offsetWidth < element.scrollWidth
}

function getTooltipContent(): string | Element {
  if (props.text) {
    return String(props.text)
  }
  return lewTextTrimPopRef.value as HTMLDivElement
}

function getTippyProps() {
  const { placement, allowHTML, offset } = props
  // text 走字符串：allowHTML 控制是否按 HTML 解析；slot 为 DOM 节点时不受影响
  const resolvedAllowHTML = Boolean(props.text) && Boolean(allowHTML)

  return {
    placement,
    offset,
    allowHTML: resolvedAllowHTML,
  }
}

function createTippy(): void {
  const element = lewTextTrimRef.value
  if (!element || tippyInstance)
    return

  tippyInstance = tippy(element, {
    theme: 'light',
    // 懒创建时首次 mouseenter 已错过 tippy 原生触发，统一用 manual + 本地 delay
    trigger: 'manual',
    duration: [150, 150],
    content: getTooltipContent(),
    animation: 'scale-subtle',
    hideOnClick: false,
    interactive: true,
    interactiveBorder: 8,
    appendTo: () => document.body,
    arrow: roundArrow,
    maxWidth: 250,
    ...getTippyProps(),
    onMount(instance) {
      const { popper } = instance
      popper.addEventListener('mouseenter', handleTooltipMouseEnter)
      popper.addEventListener('mouseleave', handleTooltipMouseLeave)
      popper.addEventListener('mousedown', handleTooltipMouseDown)
    },
    onDestroy(instance) {
      const { popper } = instance
      popper.removeEventListener('mouseenter', handleTooltipMouseEnter)
      popper.removeEventListener('mouseleave', handleTooltipMouseLeave)
      popper.removeEventListener('mousedown', handleTooltipMouseDown)
    },
  })
  tippyInstance.popper.children[0].setAttribute('data-lew', 'tooltip')
}

function updateTippy(): void {
  if (!tippyInstance)
    return

  tippyInstance.setContent(getTooltipContent())
  tippyInstance.setProps(getTippyProps())
}

function destroyTippy(): void {
  clearHoverTimers()
  isHoveringTooltip = false
  isSelectingInTooltip = false
  document.removeEventListener('mouseup', handleDocumentMouseUp)
  if (tippyInstance) {
    tippyInstance.destroy()
    tippyInstance = null
  }
}

function scheduleShow(): void {
  clearHideTimer()
  clearShowTimer()
  const [showDelay] = getDelay()
  showTimer = setTimeout(() => {
    showTimer = null
    if (isPointerOver())
      tippyInstance?.show()
  }, showDelay)
}

function scheduleHide(): void {
  clearShowTimer()
  clearHideTimer()
  const [, hideDelay] = getDelay()
  hideTimer = setTimeout(() => {
    hideTimer = null
    if (!isPointerOver())
      tippyInstance?.hide()
  }, hideDelay)
}

function refreshEllipsisState(): void {
  isEllipsis.value = checkEllipsis()
  if (!hasEllipsis.value) {
    destroyTippy()
  }
  else {
    updateTippy()
  }
}

function calculateDisplayText(): void {
  const element = lewTextTrimRef.value
  if (!element)
    return

  const { text, reserveEnd = 0, lineClamp = 0 } = props
  const textStr = String(text || '')
  const currentWidth = element.offsetWidth

  // 输入未变化时跳过计算
  if (
    lastCalculateInput.text === textStr
    && lastCalculateInput.reserveEnd === reserveEnd
    && lastCalculateInput.width === currentWidth
    && lastCalculateInput.lineClamp === lineClamp
  ) {
    refreshEllipsisState()
    return
  }

  lastCalculateInput = {
    text: textStr,
    reserveEnd,
    width: currentWidth,
    lineClamp,
  }

  // 多行截断 / 无 text 时走 CSS，不做 Canvas 末端保留
  if (lineClamp || !textStr) {
    displayText.value = textStr
    isEllipsisByTextTrim.value = false
  }
  else {
    const result = getDisplayText({
      text: textStr,
      reserveEnd,
      target: element,
    })
    displayText.value = result.text
    isEllipsisByTextTrim.value = result.isEllipsis
  }

  // 等 DOM 更新后再检测省略状态
  nextTick(() => {
    refreshEllipsisState()
  })
}

const debouncedCalculate = useDebounceFn(calculateDisplayText, 150)

function handleMouseEnter(): void {
  isHoveringTrigger = true
  isEllipsis.value = checkEllipsis()
  if (!hasEllipsis.value)
    return

  if (!tippyInstance)
    createTippy()

  scheduleShow()
}

function handleMouseLeave(): void {
  isHoveringTrigger = false
  scheduleHide()
}

function handleTooltipMouseEnter(): void {
  isHoveringTooltip = true
  clearHideTimer()
}

function handleTooltipMouseLeave(): void {
  isHoveringTooltip = false
  if (!isSelectingInTooltip)
    scheduleHide()
}

function handleTooltipMouseDown(): void {
  isSelectingInTooltip = true
  clearHideTimer()
  document.addEventListener('mouseup', handleDocumentMouseUp)
}

function handleDocumentMouseUp(): void {
  document.removeEventListener('mouseup', handleDocumentMouseUp)
  isSelectingInTooltip = false
  if (!isPointerOver())
    scheduleHide()
}

onMounted(() => {
  requestAnimationFrame(calculateDisplayText)
  useResizeObserver(lewTextTrimRef, debouncedCalculate)
})

onUnmounted(() => {
  isHoveringTrigger = false
  isHoveringTooltip = false
  isSelectingInTooltip = false
  destroyTippy()
})

watch(
  () => [props.text, props.reserveEnd, props.lineClamp, props.allowHTML, props.placement, props.offset, props.delay],
  () => {
    destroyTippy()
    lastCalculateInput = { text: '', reserveEnd: 0, width: 0, lineClamp: 0 }
    calculateDisplayText()
  },
  { flush: 'post', deep: true },
)
</script>

<template>
  <div
    ref="lewTextTrimRef"
    :class="textTrimClass"
    :style="textTrimStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="props.text">
      {{ displayText }}
    </template>
    <slot v-else />
    <div
      v-if="!props.text"
      ref="lewTextTrimPopRef"
      class="lew-text-trim-pop"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
  width: 100%;
  overflow: hidden;

  &--single-line {
    white-space: nowrap;
  }

  &--line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  &--align-center {
    text-align: center;
  }

  &--align-end,
  &--align-right {
    text-align: right;
  }

  &--align-start,
  &--align-left {
    text-align: left;
  }

  &--ellipsis {
    cursor: pointer;
  }

  .lew-text-trim-pop {
    position: fixed;
    opacity: 0;
    z-index: -9;
    pointer-events: none;
  }
}
</style>
