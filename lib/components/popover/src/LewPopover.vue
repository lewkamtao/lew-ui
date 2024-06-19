<script setup lang="ts">
import tippy from 'tippy.js'
import { watchDebounced } from '@vueuse/core'
import { LewLoading } from 'lew-ui'
import { popoverProps } from './props'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('loading')) {
  app.use(LewLoading)
}

const props = defineProps(popoverProps)
const triggerRef = ref()
const bodyRef = ref()
let instance: any
const watchOptions = { debounce: 250, maxWait: 1000 }

// 方向
watchDebounced(
  () => props.placement,
  (value: string) => {
    instance.setProps({
      placement: value
    })
  },
  watchOptions
)

// 禁用
watchDebounced(
  () => props.disabled,
  (value: boolean) => {
    if (value) {
      instance.disable()
    } else {
      instance.enable()
    }
  },
  watchOptions
)

// trigger
watchDebounced(
  () => props.trigger,
  (value: string) => {
    if (instance) {
      instance.setProps({
        trigger: value
      })
    }
  },
  watchOptions
)

// trigger
watchDebounced(
  () => props.triggerTarget,
  (value: Element | string) => {
    if (instance) {
      instance.setProps({
        triggerTarget: value
      })
    }
  },
  watchOptions
)
// offset
watchDebounced(
  () => props.offset,
  (value: number[]) => {
    if (instance) {
      instance.setProps({
        offset: value
      })
    }
  },
  watchOptions
)
const initTippy = () => {
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
    }
  })
  instance.popper.children[0].setAttribute('data-lew', 'popover')

  // 判断入参
  if (disabled && instance) {
    instance.disable()
  }
}

onMounted(() => {
  initTippy()
})

const emit = defineEmits(['show', 'hide'])

const show = () => {
  instance.show()
}

const hide = () => {
  instance.hide()
}

const refresh = () => {
  instance.setProps({})
}

defineExpose({ show, hide, refresh })
</script>

<template>
  <div class="lew-popover">
    <div ref="triggerRef" class="trigger">
      <slot name="trigger"></slot>
    </div>
    <div
      ref="bodyRef"
      v-loading="{
        visible: loading,
        iconSize: 16
      }"
      class="lew-popover-body"
      :class="popoverBodyClassName"
    >
      <slot name="popover-body" :show="show" :hide="hide"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.lew-popover {
  .trigger {
    display: flex;
  }
}
.lew-popover-body {
  overflow: hidden;
  border-radius: var(--lew-border-radius-small);
}
</style>
