<script lang="ts" setup name="Modal">
import { useMagicKeys, useMouse } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { LewFlex, LewButton, LewIcon } from 'lew-ui'
import { useDOMCreate } from '../../../hooks'
import { LewTextTrim } from '../../text-trim'
import { modalProps } from './props'

const { x, y } = useMouse()
const { Escape } = useMagicKeys()
useDOMCreate('lew-modal')

const props = defineProps(modalProps)

const emit = defineEmits(['ok', 'cancel', 'close'])

const visible: Ref<boolean | undefined> = defineModel('visible')
const transformOrigin = ref('0 0')

const maskClick = () => {
  if (props.closeOnClickOverlay) {
    visible.value = false
  }
}

const getModalStyle = computed(() => {
  return {
    width: any2px(props.width),
    height: any2px(props.height)
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

watch(
  () => visible.value,
  (newVal) => {
    if (newVal) {
      transformOrigin.value = `${x.value}px ${y.value}px`
    }
  }
)

if (props.closeByEsc) {
  watch(Escape, (v) => {
    const dialogEl = document.getElementById('lew-dialog')
    const hasDialog = dialogEl && dialogEl.children.length > 0
    // 且 dialogEl 不为空
    if (v && visible.value && !hasDialog) {
      visible.value = false
    }
  })
}
</script>

<template>
  <teleport to="#lew-modal">
    <div
      :style="{
        '--lew-modal-transform-origin': transformOrigin
      }"
      class="lew-modal-container"
    >
      <transition name="lew-modal-mask">
        <div v-if="visible" class="lew-modal-mask"></div>
      </transition>
      <transition name="lew-modal">
        <div v-if="visible" class="lew-modal" @click="maskClick">
          <div :style="getModalStyle" class="lew-modal-box" @click.stop>
            <div v-if="$slots.header" class="header-slot">
              <slot name="header"></slot>
            </div>
            <lew-flex v-else-if="title" mode="between" y="center" class="header">
              <lew-text-trim class="title" :text="title" />
              <lew-icon size="18" class="lew-form-icon-clear" type="x" @click="close" />
            </lew-flex>

            <slot></slot>

            <div v-if="$slots.footer" class="footer-slot">
              <slot name="footer"></slot>
            </div>
            <lew-flex v-else-if="!hideFooter" x="end" y="center" class="footer">
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
  z-index: 2001;
}

.lew-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2001;

  .lew-modal-box {
    border-radius: var(--lew-border-radius-large);
    background-color: var(--lew-modal-box-bgcolor);
    border: var(--lew-modal-border);
    overflow: hidden;

    .header {
      position: relative;
      height: 50px;
      padding: 10px 20px;
      border-bottom: var(--lew-modal-header-border);

      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .lew-form-icon-clear {
        right: 15px;
      }
      .lew-form-icon-clear:hover {
        background-color: var(--lew-bgcolor-5);
      }
    }

    .footer {
      padding: 10px 20px;
      border-top: var(--lew-modal-footer-border);
    }

    .header-slot {
      background-color: var(--lew-bgcolor-1);
    }

    .footer-slot {
      background-color: var(--lew-bgcolor-1);
    }
  }
}

.lew-modal-mask-enter-active,
.lew-modal-mask-leave-active {
  transition: all 0.25s;
}

.lew-modal-mask-enter-from,
.lew-modal-mask-leave-to {
  opacity: 0;
}

.lew-modal-enter-active,
.lew-modal-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.3, 1.3, 0.3, 1),
    transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
  transform-origin: var(--lew-modal-transform-origin);
}

.lew-modal-leave-to,
.lew-modal-enter-from {
  opacity: 0;
  transform: scale(0.2);
}
</style>
