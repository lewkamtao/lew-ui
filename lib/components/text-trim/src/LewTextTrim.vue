<script setup lang="ts">
import tippy, { roundArrow } from 'tippy.js'
import { watchDebounced } from '@vueuse/core'
import { object2class } from 'lew-ui/utils'
import { textTrimProps } from './props'
import { escape } from 'lodash-es'

function sanitizeHtml(html: string) {
  return escape(html)
}

const props = defineProps(textTrimProps)

const textTrimRef = ref()
let instance: any

const watchOptions = { debounce: 250, maxWait: 1000 }

const init = () => {
  const element = textTrimRef.value
  if (!element) {
    return
  }
  if (instance) {
    instance.destroy()
    instance = null
  }
  let isEllipsis = false
  const { placement, allowHtml, text, offset }: any = props

  if (props.lineClamp) {
    isEllipsis = element.offsetHeight < element.scrollHeight
  } else {
    isEllipsis = element.offsetWidth < element.scrollWidth
  }
  if (isEllipsis) {
    instance = tippy(element, {
      theme: 'light',
      delay: props.delay as any,
      duration: [250, 250],
      content: text,
      animation: 'scale',
      hideOnClick: false,
      interactive: true,
      appendTo: () => document.body,
      placement,
      offset,
      allowHTML: allowHtml,
      arrow: roundArrow,
      maxWidth: 250
    })
    instance.popper.children[0].setAttribute('data-lew', 'tooltip')
  }
}
// 监听变化 清除初始化
watchDebounced(
  () => props.text,
  () => init(),
  watchOptions
)
watchDebounced(
  () => props.allowHtml,
  () => init(),
  watchOptions
)
watchDebounced(
  () => props.placement,
  () => init(),
  watchOptions
)
watchDebounced(
  () => props.allowHtml,
  () => init(),
  watchOptions
)
watchDebounced(
  () => props.offset,
  () => init(),
  watchOptions
)

const getTextTrimStyleObject = computed(() => {
  if (props.lineClamp) {
    return `display: -webkit-box;-webkit-line-clamp: ${props.lineClamp};-webkit-box-orient: vertical;`
  }
  return 'white-space: nowrap;'
})

const getClassNames = computed(() => {
  const { x } = props
  return object2class('lew-text-trim', { x })
})

let width = 0
const check = () => {
  if (!instance) {
    init()
    return
  }
  const element = textTrimRef.value
  if (width === element.offsetWidth) {
    return
  }
  let isEllipsis = false
  if (props.lineClamp) {
    isEllipsis = element.offsetHeight < element.scrollHeight
  } else {
    isEllipsis = element.offsetWidth < element.scrollWidth
  }
  if (isEllipsis) {
    element.style.cursor = 'pointer'
    instance.enable()
  } else {
    element.style.cursor = 'text'
    instance.disable()
  }
  width = element.offsetWidth
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<template>
  <div
    ref="textTrimRef"
    class="lew-text-trim-wrapper"
    :class="getClassNames"
    :style="getTextTrimStyleObject"
    @mouseenter="check"
    v-html="sanitizeHtml(text as any)"
  ></div>
</template>

<style lang="scss" scoped>
.lew-text-trim-wrapper {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
}

.lew-text-trim-x-start {
  text-align: left;
}

.lew-text-trim-x-center {
  text-align: center;
}

.lew-text-trim-x-end {
  text-align: right;
}
</style>
