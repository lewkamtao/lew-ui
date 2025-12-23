<script setup lang="ts">
// 1. 第三方库导入
import { onClickOutside, useMagicKeys } from '@vueuse/core'

// 2. 组件导入
import { LewButton, LewFlex, LewTextTrim, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

// 3. Hooks 导入
import { useDOMCreate } from 'lew-ui/hooks'

// 4. 工具函数导入
import { any2px, getUniqueId } from 'lew-ui/utils'

// 5. 组件配置导入
import { modalEmits } from './emits'
import { modalProps } from './props'

// Props & Emits
const props = defineProps(modalProps)
const emit = defineEmits(modalEmits)

// Composables
const { Escape } = useMagicKeys()
useDOMCreate('lew-modal')

// v-model
const visible = defineModel<boolean>('visible', { default: false })

// 响应式状态
const modalBodyRef = ref<HTMLElement | null>(null)
const recomputeTrigger = ref<number>(0)

// 常量
const modalId = `lew-modal-${getUniqueId()}`

// Slots 检测
const slots = useSlots()

// 计算属性
const isTopModal = computed(() => {
  // 添加 recomputeTrigger 作为依赖，确保能够触发重新计算
  void recomputeTrigger.value

  if (!visible.value) {
    return false
  }

  const modalEl = document.getElementById(modalId)
  if (!modalEl) {
    return false
  }

  // 检查是否有 dialog 在顶层
  const dialogEl = document.getElementById('lew-dialog')
  const hasDialog = dialogEl && dialogEl.children.length > 0
  if (hasDialog) {
    return false
  }

  // 获取所有 modal 元素
  const modalContainer = modalEl?.parentElement
  if (!modalContainer) {
    return false
  }

  const openModals = Array.from(modalContainer.childNodes)
    .filter((e): e is Element => e instanceof Element)
    .filter((e) => e.children.length > 0)
    .filter((e) => {
      // 只考虑可见的 modal
      const modalBody = e.querySelector('.lew-modal') as HTMLElement
      return modalBody && modalBody.style.display !== 'none'
    })

  // 检查当前 modal 是否是最后一个（顶层）
  return (
    openModals.length > 0 && openModals[openModals.length - 1]?.id === modalId
  )
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
function forceRecomputeTopModal() {
  recomputeTrigger.value++
}

function handleClose(): void {
  visible.value = false
  emit('close')
}

// 监听全局 modal 状态变化（通过定时器检查）
let globalCheckTimer: ReturnType<typeof setInterval> | null = null

function startGlobalCheck() {
  if (globalCheckTimer) {
    clearInterval(globalCheckTimer)
  }

  globalCheckTimer = setInterval(() => {
    if (visible.value) {
      forceRecomputeTopModal()
    }
  }, 100) // 每100ms检查一次
}

function stopGlobalCheck() {
  if (globalCheckTimer) {
    clearInterval(globalCheckTimer)
    globalCheckTimer = null
  }
}

// 监听器
watch(
  modalBodyRef,
  async (newVal) => {
    if (newVal && visible.value) {
      await nextTick()
      forceRecomputeTopModal()
    }
  },
  { immediate: true },
)

watch(visible, async (newVal) => {
  await nextTick()
  // modal 状态变化时，强制重新计算
  forceRecomputeTopModal()

  // 控制全局检查定时器
  if (newVal) {
    startGlobalCheck()
  } else {
    stopGlobalCheck()
  }
})

onClickOutside(modalBodyRef, (e: any) => {
  if (visible.value && props.closeOnClickOverlay) {
    const { parentElement } = e?.target as Element
    if (parentElement?.id === modalId) {
      visible.value = false
    }
  }
})

if (props.closeByEsc) {
  watch(Escape, (v) => {
    if (!visible.value || !v || !isTopModal.value) {
      return
    }
    visible.value = false
  })
}

// 生命周期
onMounted(() => {
  if (visible.value) {
    startGlobalCheck()
  }
})

onUnmounted(() => {
  stopGlobalCheck()
})
</script>

<template>
  <teleport to="#lew-modal">
    <div :id="modalId" class="lew-modal-container">
      <transition name="lew-modal-mask">
        <div v-if="visible" :style="{ zIndex: props.zIndex }" class="lew-modal-mask" />
      </transition>
      <transition name="lew-modal">
        <div v-if="visible" :style="{ zIndex: props.zIndex }" class="lew-modal">
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
              <LewTextTrim class="lew-modal-title" :text="props.title" />
              <LewButton
                type="light"
                color="gray"
                round
                single-icon
                size="small"
                class="lew-modal-icon-close"
                @click="handleClose"
              >
                <CommonIcon :size="14" type="close" />
              </LewButton>
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
      }

      .lew-modal-icon-close {
        position: absolute;
        width: auto;
        height: auto;
        padding: 5px;
        top: 10px;
        right: 10px;
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
  transition: all var(--lew-form-transition-bezier);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
