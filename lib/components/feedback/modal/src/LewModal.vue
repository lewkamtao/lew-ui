<script setup lang="ts">
// 1. 第三方库导入
import { onClickOutside } from '@vueuse/core'

// 2. 组件导入
import { LewButton, LewFlex, locale } from 'lew-ui'
import CloseButton from 'lew-ui/_components/CloseButton.vue'

// 3. Hooks 导入
import { useDOMCreate, usePopupManager } from 'lew-ui/hooks'

// 4. 工具函数导入
import { any2px, getUniqueId } from 'lew-ui/utils'

// 5. 组件配置导入
import { modalEmits } from './emits'
import { modalProps } from './props'

// Props & Emits
const props = defineProps(modalProps)
const emit = defineEmits(modalEmits)

// Composables
useDOMCreate('lew-modal')

// v-model
const visible = defineModel<boolean>('visible', { default: false })

// 响应式状态
const modalBodyRef = ref<HTMLElement | null>(null)

// 常量
const modalId = `lew-modal-${getUniqueId()}`

// Slots 检测
const slots: ReturnType<typeof useSlots> = useSlots()

// 使用全局弹出层管理器
const { zIndex: managedZIndex, isTop } = usePopupManager({
  id: modalId,
  type: 'modal',
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

const modalStyle = computed(() => {
  const { width, top } = props
  return {
    width: any2px(width),
    top: any2px(top),
  }
})

const modalBodyMainStyle = computed(() => ({
  maxHeight: any2px(props.maxHeight),
}))

// 方法
function handleClose(): void {
  visible.value = false
  emit('close')
}

// 监听器
watch(visible, async () => {
  await nextTick()
})

onClickOutside(modalBodyRef, (e: any) => {
  if (visible.value && props.closeOnClickOverlay && isTop()) {
    const { parentElement } = e?.target as Element
    if (parentElement?.id === modalId) {
      visible.value = false
    }
  }
})
</script>

<template>
  <teleport to="#lew-modal">
    <div :id="modalId" class="lew-modal-container">
      <transition name="lew-modal-mask">
        <div
          v-if="visible"
          :style="{ zIndex: actualZIndex }"
          class="lew-modal-mask"
        />
      </transition>
      <transition name="lew-modal">
        <div v-if="visible" :style="{ zIndex: actualZIndex }" class="lew-modal">
          <div ref="modalBodyRef" :style="modalStyle" class="lew-modal-body">
            <div v-if="slots.header" class="lew-modal-header-slot">
              <slot name="header" />
            </div>
            <LewFlex
              v-else-if="props.title"
              mode="between"
              y="center"
              class="lew-modal-header"
            >
              <div class="lew-modal-title" :title="props.title">
                {{ props.title }}
              </div>
              <CloseButton
                size="large"
                color="gray"
                round
                class="lew-modal-icon-close"
                @click="handleClose"
              />
            </LewFlex>
            <div
              class="lew-modal-body-main lew-scrollbar"
              :style="modalBodyMainStyle"
            >
              <slot />
            </div>
            <div v-if="slots.footer" class="lew-modal-footer-slot">
              <slot name="footer" />
            </div>
            <LewFlex
              v-else-if="!props.hideFooter"
              x="end"
              y="center"
              class="lew-modal-footer"
            >
              <LewButton
                v-if="!props.hideCloseButton"
                v-bind="{
                  size: 'small',
                  type: 'light',
                  color: 'gray',
                  text: locale.t('modal.closeText'),
                  ...(props.closeButtonProps as any),
                }"
              />
              <LewButton
                v-if="!props.hideOkButton"
                v-bind="{
                  size: 'small',
                  text: locale.t('modal.okText'),
                  color: 'primary',
                  ...(props.okButtonProps as any),
                }"
              />
            </LewFlex>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.lew-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--lew-modal-bgcolor);
}

.lew-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;

  .lew-modal-body {
    position: relative;
    border-radius: var(--lew-border-radius-large);
    background-color: var(--lew-modal-body-bgcolor);
    border: var(--lew-modal-border);
    overflow: hidden;

    .lew-modal-body-main {
      overflow-y: auto;
    }

    .lew-modal-header {
      position: relative;
      padding: 15px 20px;

      .lew-modal-title {
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        min-width: 0;
      }

      .lew-modal-icon-close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 9;
      }
    }

    .lew-modal-footer {
      padding: 20px;
    }

    .lew-modal-header-slot {
      background-color: var(--lew-bgcolor-1);
    }

    .lew-modal-footer-slot {
      background-color: var(--lew-bgcolor-1);
    }
  }
}

.lew-modal-mask-enter-active,
.lew-modal-mask-leave-active {
  transition: all 0.1s;
}

.lew-modal-mask-enter-from,
.lew-modal-mask-leave-to {
  opacity: 0;
}

.lew-modal-enter-active,
.lew-modal-leave-active {
  transition:
    opacity var(--lew-form-transition-ease),
    transform var(--lew-form-transition-bezier);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
