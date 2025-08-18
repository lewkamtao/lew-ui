<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { LewLoading } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
import tippy from 'tippy.js'
import { popoverEmits } from './emits'
import { popoverProps } from './props'

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('loading')) {
  app.use(LewLoading)
}

const triggerRef = ref()
const bodyRef = ref()
let instance: any
const watchOptions = { debounce: 250, maxWait: 1000 }

// 方向
watchDebounced(
  () => props.placement,
  (value: string) => {
    instance?.setProps({
      placement: value,
    })
  },
  watchOptions,
)

// 禁用
watchDebounced(
  () => props.disabled,
  (value: boolean) => {
    if (value) {
      instance?.disable()
    }
    else {
      instance?.enable()
    }
  },
  watchOptions,
)

// trigger
watchDebounced(
  () => props.trigger,
  (value: string) => {
    instance?.setProps({
      trigger: value,
    })
  },
  watchOptions,
)

// trigger
watchDebounced(
  () => props.triggerTarget,
  (value: Element | string) => {
    console.log(value)
    instance?.setProps({
      triggerTarget: value,
    })
  },
  watchOptions,
)
// offset
watchDebounced(
  () => props.offset,
  (value: number[]) => {
    instance?.setProps({
      offset: value,
    })
  },
  watchOptions,
)
function initTippy() {
  if (instance) {
    return
  }

  let { placement, triggerTarget, offset, trigger, disabled }: any = props
  if (trigger === 'hover') {
    trigger = 'mouseenter'
  }
  if (!trigger) {
    trigger = 'mouseenter'
  }
  instance = tippy(triggerRef.value, {
    theme: 'light',
    trigger,
    triggerTarget,
    content: bodyRef.value,
    animation: 'shift-away-subtle',
    interactive: true,
    hideOnClick: trigger !== 'mouseenter' ? props.hideOnClick : (false as any),
    placement,
    duration: [250, 250],
    arrow: false,
    offset,
    delay: trigger === 'mouseenter' ? [120, 120] : undefined,
    appendTo: () => document.body,
    allowHTML: true,
    maxWidth: 'none',
    onShow() {
      emit('show')
    },
    onHide() {
      emit('hide')
    },
  })
  instance?.popper.children[0].setAttribute('data-lew', 'popover')
  // 判断入参
  if (disabled && instance) {
    instance.disable()
  }
}

onActivated(() => {
  initTippy()
})

onMounted(() => {
  initTippy()
})

onDeactivated(() => {
  instance?.hide()
  instance?.destroy()
  instance = null
})

function show() {
  instance?.show()
}

function hide() {
  instance?.hide()
}

function refresh() {
  instance?.setProps({})
}

onUnmounted(() => {
  instance?.hide()
  instance?.destroy()
})

defineExpose({ show, hide, refresh })
</script>

<template>
  <div class="lew-popover">
    <div
      ref="triggerRef"
      class="lew-popover-trigger"
      :style="{
        width: any2px(triggerWidth),
        display: $slots.trigger ? 'inline-block' : '',
      }"
    >
      <slot name="trigger" />
    </div>
    <div
      ref="bodyRef"
      v-loading="{
        visible: loading,
        iconSize: 16,
      }"
      class="lew-popover-body"
      :class="popoverBodyClassName"
      :style="{
        borderRadius: 'var(--lew-border-radius-small)',
        overflow: loading ? 'hidden' : '',
      }"
    >
      <slot name="popover-body" :show="show" :hide="hide" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-popover {
  font-size: 0;
}

.lew-popover-body {
  border-radius: var(--lew-border-radius-small);
}
</style>
