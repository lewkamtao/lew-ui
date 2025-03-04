<script setup lang="ts">
import tippy, { roundArrow } from 'tippy.js'
import { textTrimProps } from './props'
import { escape } from 'lodash-es'
import { useMouse, useDebounceFn } from '@vueuse/core'
import { getDisplayText, clearMeasureCache } from './text-trim'

const props = defineProps(textTrimProps)

const lewTextTrimRef = ref()
const lewTextTrimPopRef = ref()

let instance: any

const initTippy = () => {
  const element = lewTextTrimRef.value
  if (!element) {
    return
  }
  const { placement, allowHTML, text, offset }: any = props
  let isEllipsis = false
  if (props.lineClamp) {
    isEllipsis = element.offsetHeight < element.scrollHeight
  } else {
    isEllipsis = element.offsetWidth < element.scrollWidth
  }
  // 如果溢出
  if (isEllipsis || isEllipsisByTextTrim.value) {
    element.style.cursor = 'pointer'
    // 如果没有init
    if (!instance) {
      instance = tippy(element, {
        theme: 'light',
        delay: props.delay as any,
        duration: [250, 250],
        content: text ? sanitizeHtml(text) : lewTextTrimPopRef.value,
        animation: 'scale',
        hideOnClick: false,
        interactive: true,
        appendTo: () => document.body,
        placement,
        offset,
        allowHTML: allowHTML,
        arrow: roundArrow,
        maxWidth: 250
      })
      instance.popper.children[0].setAttribute('data-lew', 'tooltip')
      showTippy()
    }
  } else {
    element.style.cursor = ''
    // 如果没溢出
    destroyTippy()
  }
}

const showTippy = () => {
  const { x, y } = useMouse()
  if (props.delay && Array.isArray(props.delay) && props.delay[0] > 0) {
    setTimeout(() => {
      try {
        // 判断当前鼠标是否在元素范围内
        const element = lewTextTrimRef.value
        if (!element) return

        const rect = element.getBoundingClientRect()
        // 检查鼠标坐标是否在元素矩形区域内
        if (
          x.value >= rect.left &&
          x.value <= rect.right &&
          y.value >= rect.top &&
          y.value <= rect.bottom
        ) {
          instance?.show()
        }
      } catch (error) {
        console.error('显示提示时发生错误:', error)
      }
    }, props.delay[0])
  } else {
    try {
      instance?.show()
    } catch (error) {
      console.error('显示提示时发生错误:', error)
    }
  }
}

const sanitizeHtml = (html: string) => {
  return escape(html)
}

const getTextTrimStyleObject = computed(() => {
  if (props.lineClamp) {
    return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`
  }
  return {
    'text-overflow': props.reserveEnd > 0 ? '' : 'ellipsis',
    'white-space': 'nowrap',
    'text-align': props.textAlign
  }
})

const destroyTippy = () => {
  instance && instance.destroy()
  instance = null
}

const displayText = ref('')
const isEllipsisByTextTrim = ref(false)

// 计算显示文本
const calculateDisplayText = () => {
  const { text, reserveEnd } = props
  if (lewTextTrimRef.value) {
    const result = getDisplayText({
      text: String(text),
      reserveEnd,
      target: lewTextTrimRef.value
    })
    displayText.value = result.text
    isEllipsisByTextTrim.value = result.isEllipsis
  }
}

// 使用 requestAnimationFrame 优化初始化计算
const initCalculateDisplayText = () => {
  requestAnimationFrame(() => {
    calculateDisplayText()
  })
}

// 使用 VueUse 的防抖函数处理后续更新
const debouncedCalculate = useDebounceFn(calculateDisplayText, 150)

// 监听窗口大小变化
const setupResizeObserver = () => {
  if (!lewTextTrimRef.value) return

  const resizeObserver = new ResizeObserver(() => {
    debouncedCalculate()
  })

  resizeObserver.observe(lewTextTrimRef.value)

  // 在组件卸载时清理
  onBeforeUnmount(() => {
    resizeObserver.disconnect()
  })
}

onMounted(() => {
  initCalculateDisplayText()
  setupResizeObserver()
})

onUnmounted(() => {
  destroyTippy()
  clearMeasureCache()
})

// 监听 text 和 reserveEnd 的变化
watch(
  () => [props.text, props.reserveEnd],
  () => {
    calculateDisplayText()
  }
)
</script>

<template>
  <div
    ref="lewTextTrimRef"
    class="lew-text-trim-wrapper"
    :style="getTextTrimStyleObject"
    @mouseenter="initTippy"
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
