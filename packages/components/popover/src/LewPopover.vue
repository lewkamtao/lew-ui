<script setup lang="ts">
import tippy from 'tippy.js'
import { watchDebounced } from '@vueuse/core'
import { popoverProps } from './popover'

const props = defineProps(popoverProps)
const emit = defineEmits(['show', 'hide'])
const triggerRef = ref()
const bodyRef = ref()
let instance: any
const watchOptions = { debounce: 250, maxWait: 1000 }

// 方向
watchDebounced(
  () => props.placement,
  (value: any) => {
    instance.setProps({
      placement: value,
    })
  },
  watchOptions,
)

// 禁用
watchDebounced(
  () => props.disabled,
  (value: any) => {
    if (value)
      instance.disable()
    else
      instance.enable()
  },
  watchOptions,
)

// trigger
watchDebounced(
  () => props.trigger,
  (value: any) => {
    if (instance) {
      instance.setProps({
        trigger: value,
      })
    }
  },
  watchOptions,
)

// trigger
watchDebounced(
  () => props.triggerTarget,
  (value: any) => {
    if (instance) {
      instance.setProps({
        triggerTarget: value,
      })
    }
  },
  watchOptions,
)

function initTippy() {
  let { placement, triggerTarget, trigger, disabled }: any = props

  if (trigger === 'hover')
    trigger = 'mouseenter'

  instance = tippy(triggerRef.value, {
    theme: 'light',
    trigger,
    triggerTarget,
    content: bodyRef.value,
    animation: 'shift-away-subtle',
    interactive: true,
    placement,
    duration: [200, 200],
    arrow: false,
    delay: trigger === 'mouseenter' ? [250, 250] : undefined,
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
  instance.popper.children[0].setAttribute('data-lew', 'popover')

  // 判断入参
  if (disabled && instance)
    instance.disable()
}

onMounted(() => {
  initTippy()
})

function show() {
  instance.show()
}

function hide() {
  instance.hide()
}

function refresh() {
  instance.setProps({})
}

defineExpose({ show, hide, refresh })
</script>

<template>
  <div class="lew-popover">
    <label ref="triggerRef" style="font-size: 0px">
      <div class="trigger"><slot name="trigger" /></div>
    </label>
    <div
      ref="bodyRef"
      v-loading="{
        visible: loading,
        iconSize: 16,
      }"
      class="lew-popover-body"
    >
      <slot name="popover-body" :show="show" :hide="hide" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-popover {
    .trigger {
        > div {
            font-size: 14px;
        }
    }
}
.lew-popover-body {
    padding: 6px;
    overflow: hidden;
}
</style>
