<script setup lang="ts">
// 1. 第三方库导入
import { onClickOutside } from '@vueuse/core'

// 2. 组件导入
import { LewButton, LewFlex, locale } from 'lew-ui'
import CloseButton from 'lew-ui/_components/CloseButton.vue'

// 3. Hooks 导入
import { useDOMCreate, usePopupManager } from 'lew-ui/hooks'

// 4. 工具函数导入
import { any2px, getUniqueId, object2class } from 'lew-ui/utils'

// 5. 组件配置导入
import { drawerEmits } from './emits'
import { drawerProps } from './props'

// Props & Emits
const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

// Composables
useDOMCreate('lew-drawer')

// v-model
const visible = defineModel<boolean>('visible', { default: false })

// 响应式状态
const drawerBodyRef = ref<HTMLElement | null>(null)

// 常量
const drawerId = `lew-drawer-${getUniqueId()}`

// Slots 检测
const slots: ReturnType<typeof useSlots> = useSlots()

// 使用全局弹出层管理器
const { zIndex: managedZIndex, isTop } = usePopupManager({
  id: drawerId,
  type: 'drawer',
  visible,
  closeByEsc: props.closeByEsc,
  onClose: () => emit('close'),
})

// 计算最终使用的 z-index
// 如果用户手动设置了 zIndex（非默认值），则使用用户设置的值
// 否则使用管理器分配的值
const actualZIndex = computed(() => {
  // 默认值为 2001，如果用户传入了其他值，优先使用用户的值
  if (props.zIndex !== 2001) {
    return props.zIndex
  }
  return managedZIndex.value || props.zIndex
})

// 计算属性
const drawerStyle = computed(() => {
  const { position, width, height } = props
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

  styleParts.push(`z-index:${actualZIndex.value}`)
  return styleParts.join(';')
})

const drawerBodyClass = computed(() => {
  return object2class('lew-drawer-body', {
    position: props.position,
  })
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
  if (visible.value && props.closeOnClickOverlay && isTop()) {
    const target = e?.target as Element | undefined
    const parentElement = target?.parentElement
    if (parentElement?.id === drawerId) {
      visible.value = false
    }
  }
})
</script>

<template>
  <teleport to="#lew-drawer">
    <div :id="drawerId" class="lew-drawer">
      <transition name="lew-drawer-mask">
        <div
          v-if="visible"
          :style="{ zIndex: actualZIndex }"
          class="lew-drawer-mask"
        />
      </transition>
      <transition :name="`lew-drawer-${props.position}`">
        <div
          v-if="visible"
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
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
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
}

.lew-drawer-body-position-right {
  right: 0;
  top: 0;
  border-left: var(--lew-drawer-border-color) 1px solid;
}

.lew-drawer-body-position-top {
  left: 0;
  top: 0;
  border-bottom: var(--lew-drawer-border-color) 1px solid;
}

.lew-drawer-body-position-left {
  left: 0;
  top: 0;
  border-right: var(--lew-drawer-border-color) 1px solid;
}

.lew-drawer-body-position-bottom {
  left: 0;
  bottom: 0;
  border-top: var(--lew-drawer-border-color) 1px solid;
}

// Mask transition
.lew-drawer-mask-enter-active,
.lew-drawer-mask-leave-active {
  transition: opacity var(--lew-form-transition-ease);
}

.lew-drawer-mask-enter-from,
.lew-drawer-mask-leave-to {
  opacity: 0;
}

// Right drawer transition
.lew-drawer-right-enter-active,
.lew-drawer-right-leave-active {
  transition: transform var(--lew-form-transition-bezier);
}

.lew-drawer-right-enter-from,
.lew-drawer-right-leave-to {
  transform: translateX(100%);
}

// Left drawer transition
.lew-drawer-left-enter-active,
.lew-drawer-left-leave-active {
  transition: transform var(--lew-form-transition-bezier);
}

.lew-drawer-left-enter-from,
.lew-drawer-left-leave-to {
  transform: translateX(-100%);
}

// Top drawer transition
.lew-drawer-top-enter-active,
.lew-drawer-top-leave-active {
  transition: transform var(--lew-form-transition-bezier);
}

.lew-drawer-top-enter-from,
.lew-drawer-top-leave-to {
  transform: translateY(-100%);
}

// Bottom drawer transition
.lew-drawer-bottom-enter-active,
.lew-drawer-bottom-leave-active {
  transition: transform var(--lew-form-transition-bezier);
}

.lew-drawer-bottom-enter-from,
.lew-drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
