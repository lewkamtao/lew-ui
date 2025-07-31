<script setup lang="ts">
import type { Instance } from 'tippy.js'
import type { CSSProperties } from 'vue'
import { useDebounceFn, useMouse, useResizeObserver } from '@vueuse/core'
import { escape } from 'lodash-es'
import tippy, { roundArrow } from 'tippy.js'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { textTrimProps } from './props'
import { clearMeasureCache, getDisplayText } from './text-trim'

// Types
interface TextTrimEmits {
  click: [event: MouseEvent]
  mouseenter: []
  mouseleave: []
}

// Props & Emits
const props = defineProps(textTrimProps)
const emit = defineEmits<TextTrimEmits>()

// Refs
const lewTextTrimRef = ref<HTMLDivElement>()
const lewTextTrimPopRef = ref<HTMLDivElement>()

// Reactive state
const displayText = ref('')
const isEllipsisByTextTrim = ref(false)

// Instance
let tippyInstance: Instance | null = null

// Computed
const textTrimStyle = computed((): CSSProperties | string => {
  if (props.lineClamp) {
    return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`
  }
  return {
    textOverflow: (props.reserveEnd || 0) > 0 ? '' : 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: props.textAlign,
  }
})

// Methods
function initTippy(): void {
  const element = lewTextTrimRef.value
  if (!element)
    return

  const { placement, allowHTML, text, offset } = props
  let isEllipsis = false

  if (props.lineClamp) {
    isEllipsis = element.offsetHeight < element.scrollHeight
  }
  else {
    isEllipsis = element.offsetWidth < element.scrollWidth
  }

  // Handle overflow state
  if (isEllipsis || isEllipsisByTextTrim.value) {
    element.style.cursor = 'pointer'

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
    element.style.cursor = ''
    destroyTippy()
  }
}

function showTippy(): void {
  const { x, y } = useMouse()

  if (props.delay && Array.isArray(props.delay) && props.delay[0] > 0) {
    setTimeout(() => {
      try {
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
      }
      catch (error) {
        console.error('Error showing tooltip:', error)
      }
    }, props.delay[0])
  }
  else {
    try {
      tippyInstance?.show()
    }
    catch (error) {
      console.error('Error showing tooltip:', error)
    }
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

// Event handlers
function handleClick(event: MouseEvent): void {
  emit('click', event)
}

function handleMouseEnter(): void {
  emit('mouseenter')
  initTippy()
}

function handleMouseLeave(): void {
  emit('mouseleave')
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
watch(
  () => [props.text, props.reserveEnd],
  calculateDisplayText,
  { flush: 'post' },
)
</script>

<template>
  <div
    ref="lewTextTrimRef"
    class="lew-text-trim-wrapper"
    :style="textTrimStyle"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
  .lew-text-trim-pop {
    position: fixed;
    opacity: 0;
    z-index: -9;
  }
}
</style>
