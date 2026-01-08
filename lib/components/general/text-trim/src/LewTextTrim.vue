<script setup lang="ts">
import type { Instance } from 'tippy.js'
import type { CSSProperties } from 'vue'
import { useDebounceFn, useMouse, useResizeObserver } from '@vueuse/core'
import { escape } from 'lodash-es'
import tippy, { roundArrow } from 'tippy.js'
import { textTrimEmits } from './emits'
import { textTrimProps } from './props'
import { clearMeasureCache, getDisplayText } from './text-trim'

const props = defineProps(textTrimProps)
const _emit = defineEmits(textTrimEmits)

const lewTextTrimRef = ref<HTMLDivElement>()
const lewTextTrimPopRef = ref<HTMLDivElement>()
const displayText = ref('')
const isEllipsisByTextTrim = ref(false)
const isEllipsis = ref(false)

let tippyInstance: Instance | null = null

// 缓存上一次计算的输入，避免重复计算
let lastCalculateInput = { text: '', reserveEnd: 0, width: 0 }

// 在组件顶层调用 useMouse，避免每次 showTippy 时重复创建
const { x: mouseX, y: mouseY } = useMouse()

// 使用 shallowRef 避免深度响应式
const hasEllipsis = computed(() => isEllipsis.value || isEllipsisByTextTrim.value)

const textTrimClass = computed(() => ({
  'lew-text-trim-wrapper': true,
  'lew-text-trim-wrapper--line-clamp': props.lineClamp,
  'lew-text-trim-wrapper--single-line': !props.lineClamp,
  'lew-text-trim-wrapper--ellipsis': hasEllipsis.value,
  [`lew-text-trim-wrapper--align-${props.textAlign}`]:
    props.textAlign && props.textAlign !== 'left',
}))

const textTrimStyle = computed((): CSSProperties | string => {
  if (props.lineClamp) {
    return `-webkit-line-clamp: ${props.lineClamp};`
  }
  return {
    textOverflow: (props.reserveEnd || 0) > 0 ? '' : 'ellipsis',
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

function initTippy(): void {
  const element = lewTextTrimRef.value
  if (!element)
    return

  // 如果 tippy 已存在，直接显示
  if (tippyInstance) {
    showTippy()
    return
  }

  // 计算是否需要省略
  isEllipsis.value = checkEllipsis()

  if (hasEllipsis.value) {
    const { placement, allowHTML, text, offset } = props

    tippyInstance = tippy(element, {
      theme: 'light',
      delay: props.delay,
      duration: [250, 250],
      content: text ? escape(String(text)) : lewTextTrimPopRef.value,
      animation: 'scale-subtle',
      hideOnClick: false,
      interactive: true,
      appendTo: () => document.body,
      placement,
      offset,
      allowHTML,
      arrow: roundArrow,
      maxWidth: 250,
    })
    tippyInstance?.popper.children[0].setAttribute('data-lew', 'tooltip')
    showTippy()
  }
}

function showTippy(): void {
  if (!tippyInstance)
    return

  const { delay } = props
  if (delay && Array.isArray(delay) && delay[0] > 0) {
    setTimeout(() => {
      const element = lewTextTrimRef.value
      if (!element)
        return

      const rect = element.getBoundingClientRect()
      if (
        mouseX.value >= rect.left
        && mouseX.value <= rect.right
        && mouseY.value >= rect.top
        && mouseY.value <= rect.bottom
      ) {
        tippyInstance?.show()
      }
    }, delay[0])
  }
  else {
    tippyInstance?.show()
  }
}

function destroyTippy(): void {
  if (tippyInstance) {
    tippyInstance.destroy()
    tippyInstance = null
  }
}

function calculateDisplayText(): void {
  const element = lewTextTrimRef.value
  if (!element)
    return

  const { text, reserveEnd = 0 } = props
  const textStr = String(text || '')
  const currentWidth = element.offsetWidth

  // 输入未变化时跳过计算
  if (
    lastCalculateInput.text === textStr
    && lastCalculateInput.reserveEnd === reserveEnd
    && lastCalculateInput.width === currentWidth
  ) {
    return
  }

  // 更新缓存
  lastCalculateInput = { text: textStr, reserveEnd, width: currentWidth }

  const result = getDisplayText({
    text: textStr,
    reserveEnd,
    target: element,
  })
  displayText.value = result.text
  isEllipsisByTextTrim.value = result.isEllipsis

  // 文本变化后重新检查省略状态，如果不再省略则销毁 tippy
  isEllipsis.value = checkEllipsis()
  if (!hasEllipsis.value) {
    destroyTippy()
  }
}

const debouncedCalculate = useDebounceFn(calculateDisplayText, 150)

function handleMouseEnter(): void {
  initTippy()
}

onMounted(() => {
  requestAnimationFrame(calculateDisplayText)
  useResizeObserver(lewTextTrimRef, debouncedCalculate)
})

onUnmounted(() => {
  destroyTippy()
  clearMeasureCache()
})

watch(
  () => [props.text, props.reserveEnd],
  () => {
    // 文本变化时先销毁旧的 tippy，清除缓存，再重新计算
    destroyTippy()
    lastCalculateInput = { text: '', reserveEnd: 0, width: 0 }
    calculateDisplayText()
  },
  { flush: 'post' },
)
</script>

<template>
  <div
    ref="lewTextTrimRef"
    :class="textTrimClass"
    :style="textTrimStyle"
    @mouseenter="handleMouseEnter"
  >
    <template v-if="props.text">
      {{ displayText }}
    </template>
    <slot v-else />
    <div ref="lewTextTrimPopRef" class="lew-text-trim-pop">
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
  }
}
</style>
