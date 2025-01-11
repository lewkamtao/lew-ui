<script lang="ts" setup name="Modal">
import { useMagicKeys, onClickOutside } from '@vueuse/core'
import { any2px, getUniqueId } from 'lew-ui/utils'
import { LewFlex, LewButton, LewTextTrim } from 'lew-ui'
import { useDOMCreate } from 'lew-ui/hooks'
import { modalProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

const { Escape } = useMagicKeys()
useDOMCreate('lew-modal')

const props = defineProps(modalProps)

const emit = defineEmits(['ok', 'cancel', 'close'])

const visible: Ref<boolean | undefined> = defineModel('visible')

const modalBodyRef = ref(null)
const modalId = `lew-modal-${getUniqueId()}`

onClickOutside(modalBodyRef, (e) => {
  if (visible.value && props.closeOnClickOverlay) {
    const { parentElement } = e?.target as Element
    if (parentElement?.id === modalId) {
      visible.value = false
    }
  }
})

const getModalStyle = computed(() => {
  const { width, top } = props
  return {
    width: any2px(width),
    top: any2px(top)
  }
})

const ok = () => {
  emit('ok')
}

const close = () => {
  visible.value = false
  emit('close')
}

const cancel = () => {
  emit('cancel')
}

if (props.closeByEsc) {
  watch(Escape, (v) => {
    if (!visible.value || !v) {
      return
    }

    const dialogEl = document.getElementById('lew-dialog')
    const modalEl = document.getElementById(modalId)
    const hasDialog = dialogEl && dialogEl.children.length > 0

    const isOpenModal = Array.from(modalEl?.parentElement?.childNodes ?? [])
      .filter((e): e is Element => e instanceof Element)
      .filter((e) => e.children.length > 0)

    const topModal =
      isOpenModal[isOpenModal.length - 1]?.id === modalId && modalEl

    if (!hasDialog && topModal) {
      visible.value = false
    }
  })
}
</script>

<template>
  <teleport to="#lew-modal">
    <div class="lew-modal-container" :id="modalId">
      <transition name="lew-modal-mask">
        <div :style="{ zIndex }" v-if="visible" class="lew-modal-mask"></div>
      </transition>
      <transition name="lew-modal">
        <div v-if="visible" :style="{ zIndex }" class="lew-modal">
          <div ref="modalBodyRef" :style="getModalStyle" class="lew-modal-body">
            <div v-if="$slots.header" class="lew-modal-header-slot">
              <slot name="header"></slot>
            </div>
            <lew-flex
              v-else-if="title"
              mode="between"
              y="center"
              class="lew-modal-header"
            >
              <lew-text-trim class="lew-modal-title" :text="title" />
              <Icon
                :size="18"
                class="lew-form-icon-close lew-modal-icon-close"
                type="close"
                @click="close"
              />
            </lew-flex>
            <div class="lew-modal-body-main lew-scrollbar">
              <slot></slot>
            </div>
            <div v-if="$slots.footer" class="lew-modal-footer-slot">
              <slot name="footer"></slot>
            </div>
            <lew-flex
              v-else-if="!hideFooter"
              x="end"
              y="center"
              class="lew-modal-footer"
            >
              <lew-button
                v-if="!hideCancelButton"
                v-bind="{
                  type: 'light',
                  color: 'gray',
                  text: '取消',
                  ...(cancelProps as any)
                }"
                @click="cancel"
              />
              <lew-button
                v-if="!hideOkButton"
                v-bind="{
                  text: '确定',
                  color: 'primary',
                  ...(okProps as any)
                }"
                @click="ok"
              />
            </lew-flex>
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
      max-height: 80vh;
      overflow-y: auto;
    }
    .lew-modal-header {
      position: relative;
      height: 50px;
      padding: 10px 20px;
      border-bottom: var(--lew-modal-header-border);

      .lew-modal-title {
        font-size: 16px;
        font-weight: bold;
      }
      .lew-modal-icon-close {
        right: 15px;
      }
      .lew-modal-icon-close:hover {
        background-color: var(--lew-bgcolor-5);
      }
    }

    .lew-modal-footer {
      padding: 10px 20px;
      border-top: var(--lew-modal-footer-border);
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
  transition: all var(--lew-form-transition-ease);
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
  transform: translateY(-30px);
}
</style>
