<script lang="ts" setup>
import type { LewDrawerPosition } from 'lew-ui/types'
import type { Ref } from 'vue'
import { onClickOutside, useMagicKeys } from '@vueuse/core'
import { LewButton, LewFlex, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { useDOMCreate } from 'lew-ui/hooks'
import { any2px, getUniqueId, object2class } from 'lew-ui/utils'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { drawerEmits } from './emits'

import { drawerProps } from './props'

// Props & Emits
const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

// Composables
const { Escape } = useMagicKeys()
useDOMCreate('lew-drawer')

// Models
const visible: Ref<boolean | undefined> = defineModel('visible')

// Refs
const drawerBodyRef = ref<HTMLElement | null>(null)

// Constants
const drawerId = `lew-drawer-${getUniqueId()}`
const recomputeTrigger = ref<number>(0)

// 计算当前 drawer 是否在顶层
const isTopDrawer = computed(() => {
  // 添加 recomputeTrigger 作为依赖，确保能够触发重新计算
  void recomputeTrigger.value

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

// 强制重新计算顶层状态的函数
function forceRecomputeTopDrawer() {
  recomputeTrigger.value++
}

// 监听 drawerBodyRef 变化，确保在 DOM 更新后重新计算顶层状态
watch(
  drawerBodyRef,
  async (newVal: HTMLElement | null) => {
    if (newVal && visible.value) {
      await nextTick()
      forceRecomputeTopDrawer()
    }
  },
  { immediate: true },
)

// 监听 visible 变化，确保状态正确更新
watch(visible, async (newVal: boolean | undefined) => {
  await nextTick()
  // drawer 状态变化时，强制重新计算
  forceRecomputeTopDrawer()

  // 控制全局检查定时器
  if (newVal) {
    startGlobalCheck()
  }
  else {
    stopGlobalCheck()
  }
})

// 监听全局 drawer 状态变化（通过定时器检查）
let globalCheckTimer: ReturnType<typeof setInterval> | null = null

function startGlobalCheck() {
  if (globalCheckTimer) {
    clearInterval(globalCheckTimer)
  }

  globalCheckTimer = setInterval(() => {
    if (visible.value) {
      forceRecomputeTopDrawer()
    }
  }, 100) // 每100ms检查一次
}

function stopGlobalCheck() {
  if (globalCheckTimer) {
    clearInterval(globalCheckTimer)
    globalCheckTimer = null
  }
}

onMounted(() => {
  if (visible.value) {
    startGlobalCheck()
  }
})

onUnmounted(() => {
  stopGlobalCheck()
})

onClickOutside(drawerBodyRef, (e: any) => {
  if (visible.value && props.closeOnClickOverlay) {
    const { parentElement } = e?.target as Element
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

// Methods
function getStyle(
  position: LewDrawerPosition,
  width: number | string,
  height: number | string,
): string {
  switch (position) {
    case 'left':
      return `width:${any2px(width)};height:100vh`
    case 'right':
      return `width:${any2px(width)};height:100vh`
    case 'top':
      return `width:100vw;height:${any2px(height)}`
    case 'bottom':
      return `width:100vw;height:${any2px(height)}`
    default:
      return 'width:30%;height:100%'
  }
}

function handleClose(): void {
  visible.value = false
  emit('close')
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
        :style="`${getStyle(props.position, props.width, props.height)}; z-index:${
          props.zIndex
        }`"
        class="lew-drawer-body"
        :class="`${object2class('lew-drawer-body', { position: props.position })} ${
          visible ? 'lew-drawer-body-show' : ''
        }`"
      >
        <div v-if="$slots.header" class="lew-drawer-header-slot">
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
          <LewButton
            type="light"
            color="gray"
            round
            single-icon
            size="small"
            class="lew-drawer-icon-close"
            @click="handleClose"
          >
            <CommonIcon :size="14" type="close" />
          </LewButton>
        </LewFlex>
        <div class="lew-drawer-body-slot">
          <slot />
        </div>
        <div v-if="$slots.footer" class="lew-drawer-footer-slot">
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
        width: auto;
        height: auto;
        padding: 5px;
        top: 10px;
        right: 10px;
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
    transform: translateX(100%);
  }

  .lew-drawer-body-position-top {
    left: 0;
    top: 0;
    transform: translateY(-100%);
  }

  .lew-drawer-body-position-left {
    left: 0;
    top: 0;
    transform: translateX(-100%);
  }

  .lew-drawer-body-position-bottom {
    left: 0;
    bottom: 0;
    transform: translateY(100%);
  }

  .lew-drawer-body-show {
    transform: translate(0, 0);
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
