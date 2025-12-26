<script setup lang="ts">
// 1. 第三方库导入
import { onClickOutside, useMagicKeys } from '@vueuse/core'

// 3. 组件导入
import { LewButton, LewFlex, locale } from 'lew-ui'
import CloseButton from 'lew-ui/_components/CloseButton.vue'

// 4. Hooks 导入
import { useDOMCreate } from 'lew-ui/hooks'

// 5. 工具函数导入
import { any2px, getUniqueId, object2class } from 'lew-ui/utils'

// 6. 组件配置导入
import { drawerEmits } from './emits'
import { drawerProps } from './props'

// Props & Emits
const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

// Composables
const { Escape } = useMagicKeys()
useDOMCreate('lew-drawer')

// v-model
const visible = defineModel<boolean>('visible', { default: false })

// 响应式状态
const drawerBodyRef = ref<HTMLElement | null>(null)

// 常量
const drawerId = `lew-drawer-${getUniqueId()}`

// Slots 检测
const slots = useSlots()

// 计算属性
const isTopDrawer = computed(() => {
  if (!visible.value) {
    return false
  }

  const drawerEl = document.getElementById(drawerId)
  if (!drawerEl) {
    return false
  }

  // 检查是否有 dialog 在顶层
  const dialogEl = document.getElementById('lew-dialog')
  const hasDialog = dialogEl && dialogEl.children.length > 0
  if (hasDialog) {
    return false
  }

  // 获取所有 drawer 元素
  const drawerContainer = drawerEl?.parentElement
  if (!drawerContainer) {
    return false
  }

  const openDrawers = Array.from(drawerContainer.childNodes)
    .filter((e): e is Element => e instanceof Element)
    .filter(e => e.children.length > 0)
    .filter((e) => {
      // 只考虑可见的 drawer
      const drawerBody = e.querySelector('.lew-drawer-body')
      return drawerBody && drawerBody.classList.contains('lew-drawer-body-show')
    })

  // 检查当前 drawer 是否是最后一个（顶层）
  return openDrawers.length > 0 && openDrawers[openDrawers.length - 1]?.id === drawerId
})

// 计算属性
const drawerStyle = computed(() => {
  const { position, width, height, zIndex } = props
  const styleParts: string[] = []

  switch (position) {
    case 'left':
    case 'right':
      styleParts.push(`width:${any2px(width)}`)
      styleParts.push('height:100vh')
      break
    case 'top':
    case 'bottom':
      styleParts.push('width:100vw')
      styleParts.push(`height:${any2px(height)}`)
      break
    default:
      styleParts.push('width:30%')
      styleParts.push('height:100%')
  }

  styleParts.push(`z-index:${zIndex}`)
  return styleParts.join(';')
})

const drawerBodyClass = computed(() => {
  return [
    object2class('lew-drawer-body', {
      position: props.position,
    }),
    visible.value ? 'lew-drawer-body-show' : '',
  ]
    .filter(Boolean)
    .join(' ')
})

// 方法
function handleClose(): void {
  visible.value = false
  emit('close')
}

// 监听器
watch(visible, async () => {
  await nextTick()
})

onClickOutside(drawerBodyRef, (e: any) => {
  if (visible.value && props.closeOnClickOverlay) {
    const target = e?.target as Element | undefined
    const parentElement = target?.parentElement
    if (parentElement?.id === drawerId) {
      visible.value = false
    }
  }
})

if (props.closeByEsc) {
  watch(Escape, (v: boolean) => {
    if (!visible.value || !v || !isTopDrawer.value) {
      return
    }
    visible.value = false
  })
}
</script>

<template>
  <teleport to="#lew-drawer">
    <div :id="drawerId" class="lew-drawer">
      <transition name="lew-drawer-mask">
        <div v-if="visible" :style="{ zIndex: props.zIndex }" class="lew-drawer-mask" />
      </transition>
      <div
        ref="drawerBodyRef"
        :style="drawerStyle"
        class="lew-drawer-body"
        :class="drawerBodyClass"
      >
        <div v-if="slots.header" class="lew-drawer-header-slot">
          <slot name="header" />
        </div>
        <LewFlex
          v-else-if="props.title"
          mode="between"
          y="center"
          class="lew-drawer-header"
        >
          <div class="lew-drawer-title">
            {{ props.title }}
          </div>
          <CloseButton
            size="large"
            color="gray"
            round
            class="lew-drawer-icon-close"
            @click="handleClose"
          />
        </LewFlex>
        <div class="lew-drawer-body-slot">
          <slot />
        </div>
        <div v-if="slots.footer" class="lew-drawer-footer-slot">
          <slot name="footer" />
        </div>
        <LewFlex
          v-else-if="!props.hideFooter"
          x="end"
          y="center"
          class="lew-drawer-footer"
        >
          <LewButton
            v-if="!props.hideCloseButton"
            v-bind="{
              size: 'small',
              text: locale.t('drawer.closeText'),
              type: 'light',
              color: 'normal',
              request: handleClose,
              ...(props.closeButtonProps as any),
            }"
          />
          <LewButton
            v-if="!props.hideOkButton"
            v-bind="{
              size: 'small',
              text: locale.t('drawer.okText'),
              color: 'primary',
              ...(props.okButtonProps as any),
            }"
          />
        </LewFlex>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.lew-drawer {
  .lew-drawer-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--lew-drawer-bgcolor);
  }

  .lew-drawer-body {
    position: fixed;
    transition: all 0.3s;
    background: var(--lew-drawer-body-bgcolor);
    display: flex;
    flex-direction: column;

    .lew-drawer-header {
      position: relative;
      padding: 15px 20px;
      flex: 0;

      .lew-drawer-title {
        width: calc(100% - 30px);
        font-size: 16px;
        font-weight: bold;
      }

      .lew-drawer-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 9;
      }
    }
  }

  .lew-drawer-body-slot {
    flex: 1;
    overflow: hidden;
  }

  .lew-drawer-footer {
    padding: 20px;
    flex: 0;
  }

  .lew-drawer-header-slot {
    background-color: var(--lew-bgcolor-1);
    flex: 0;
  }

  .lew-drawer-footer-slot {
    background-color: var(--lew-bgcolor-1);
    flex: 0;
  }

  .lew-drawer-body-position-right {
    right: 0;
    top: 0;
  }

  .lew-drawer-body-position-right:not(.lew-drawer-body-show) {
    transform: translateX(100%);
  }

  .lew-drawer-body-position-top {
    left: 0;
    top: 0;
  }

  .lew-drawer-body-position-top:not(.lew-drawer-body-show) {
    transform: translateY(-100%);
  }

  .lew-drawer-body-position-left {
    left: 0;
    top: 0;
  }

  .lew-drawer-body-position-left:not(.lew-drawer-body-show) {
    transform: translateX(-100%);
  }

  .lew-drawer-body-position-bottom {
    left: 0;
    bottom: 0;
  }

  .lew-drawer-body-position-bottom:not(.lew-drawer-body-show) {
    transform: translateY(100%);
  }

  .lew-drawer-mask-enter-active,
  .lew-drawer-mask-leave-active {
    transition: all var(--lew-form-transition-ease);
  }

  .lew-drawer-mask-enter-from,
  .lew-drawer-mask-leave-to {
    opacity: 0;
  }
}
</style>
