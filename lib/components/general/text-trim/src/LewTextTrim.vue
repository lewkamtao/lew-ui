<script setup lang="ts">
import type { Instance } from 'tippy.js'
import type { CSSProperties } from 'vue'
import { useDebounceFn, useMouse, useResizeObserver } from '@vueuse/core'
import { escape } from 'lodash-es'
import tippy, { roundArrow } from 'tippy.js'
import { textTrimProps } from './props'
import { clearMeasureCache, getDisplayText } from './text-trim'

const props = defineProps(textTrimProps)

// Refs
const lewTextTrimRef = ref<HTMLDivElement>()
const lewTextTrimPopRef = ref<HTMLDivElement>()

// Reactive state
const displayText = ref('')
const isEllipsisByTextTrim = ref(false)
const isEllipsis = ref(false)

// Instance
let tippyInstance: Instance | null = null

// 计算类名（静态配置用 class）
const textTrimClass = computed(() => {
  const classes = ['lew-text-trim-wrapper']

  // Text align（静态配置）
  if (props.textAlign && props.textAlign !== 'left') {
    classes.push(`lew-text-trim-wrapper--align-${props.textAlign}`)
  }

  // Line clamp 模式
  if (props.lineClamp) {
    classes.push('lew-text-trim-wrapper--line-clamp')
  }
  else {
    // 单行模式
    classes.push('lew-text-trim-wrapper--single-line')
  }

  // Ellipsis 状态（用于控制 cursor）
  if (isEllipsis.value || isEllipsisByTextTrim.value) {
    classes.push('lew-text-trim-wrapper--ellipsis')
  }

  return classes.join(' ')
})

// 只计算动态样式
const textTrimStyle = computed((): CSSProperties | string => {
  if (props.lineClamp) {
    return `-webkit-line-clamp: ${props.lineClamp};`
  }
  return {
    textOverflow: (props.reserveEnd || 0) > 0 ? '' : 'ellipsis',
  }
})

// Methods
function initTippy(): void {
  const element = lewTextTrimRef.value
  if (!element)
    return

  const { placement, allowHTML, text, offset } = props

  if (props.lineClamp) {
    isEllipsis.value = element.offsetHeight < element.scrollHeight
  }
  else {
    isEllipsis.value = element.offsetWidth < element.scrollWidth
  }

  // Handle overflow state
  if (isEllipsis.value || isEllipsisByTextTrim.value) {
    // Initialize tippy if not already created
    if (!tippyInstance) {
      tippyInstance = tippy(element, {
        theme: 'light',
        delay: props.delay,
        duration: [250, 250],
        content: text ? sanitizeHtml(String(text)) : lewTextTrimPopRef.value,
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
  else {
    destroyTippy()
  }
}

function showTippy(): void {
  const { x, y } = useMouse()

  if (props.delay && Array.isArray(props.delay) && props.delay[0] > 0) {
    setTimeout(() => {
      const element = lewTextTrimRef.value
      if (!element)
        return

      const rect = element.getBoundingClientRect()
      // Check if mouse is within element bounds
      if (
        x.value >= rect.left
        && x.value <= rect.right
        && y.value >= rect.top
        && y.value <= rect.bottom
      ) {
        tippyInstance?.show()
      }
    }, props.delay[0])
  }
  else {
    tippyInstance?.show()
  }
}

function sanitizeHtml(html: string): string {
  return escape(html)
}

function destroyTippy(): void {
  if (tippyInstance) {
    tippyInstance.destroy()
    tippyInstance = null
  }
}

function calculateDisplayText(): void {
  const { text, reserveEnd } = props
  if (lewTextTrimRef.value) {
    const result = getDisplayText({
      text: String(text || ''),
      reserveEnd: reserveEnd || 0,
      target: lewTextTrimRef.value,
    })
    displayText.value = result.text
    isEllipsisByTextTrim.value = result.isEllipsis
  }
}

function initCalculateDisplayText(): void {
  requestAnimationFrame(calculateDisplayText)
}

const debouncedCalculate = useDebounceFn(calculateDisplayText, 250)

function handleMouseEnter(): void {
  initTippy()
}

// Lifecycle hooks
onMounted(() => {
  initCalculateDisplayText()

  // Use ResizeObserver only in client environment
  useResizeObserver(lewTextTrimRef, debouncedCalculate)
})

onUnmounted(() => {
  destroyTippy()
  clearMeasureCache()
})

// Watchers
watch(() => [props.text, props.reserveEnd], calculateDisplayText, {
  flush: 'post',
})
</script>

<template>
  <div
    ref="lewTextTrimRef"
    :class="textTrimClass"
    :style="textTrimStyle"
    @mouseenter="handleMouseEnter"
  >
    <template v-if="text">
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

  // 单行模式（静态配置）
  &--single-line {
    white-space: nowrap;
  }

  // Line clamp 模式（静态配置）
  &--line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  // Text align 配置（静态）
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

  // Ellipsis 状态（用于控制 cursor）
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
