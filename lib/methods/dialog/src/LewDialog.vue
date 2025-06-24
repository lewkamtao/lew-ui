<script lang="ts" setup name="dialog">
import { ref, watch, onMounted, nextTick } from 'vue'
import { LewButton, LewFlex } from 'lew-ui'
import { useMagicKeys } from '@vueuse/core'
import { dialogProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'
import { useDOMCreate } from 'lew-ui/hooks'
import type { LewColor } from 'lew-ui'
import { locale } from 'lew-ui'

const { Escape } = useMagicKeys()
useDOMCreate('lew-dialog')

const props = defineProps(dialogProps)
const emit = defineEmits(['close'])

const visible = ref(false)
const okLoading = ref(false)
const cancelLoading = ref(false)
const okRef1 = ref()
const okRef2 = ref()

const maskClick = () => {
  if (props.closeOnClickOverlay) {
    visible.value = false
  }
}

onMounted(() => {
  visible.value = true
  nextTick(() => {
    if (okRef1.value) okRef1.value.focus()
    if (okRef2.value) okRef2.value.focus()
  })
})

watch(visible, (newVal) => {
  if (!newVal) {
    setTimeout(() => emit('close'), 500)
  }
})

const handleAction = async (action: 'ok' | 'cancel') => {
  const actionFunction = props[action]
  const loadingRef = action === 'ok' ? okLoading : cancelLoading

  if (typeof actionFunction === 'function') {
    loadingRef.value = true
    const result = await actionFunction()
    if (result !== false) {
      visible.value = false
    }
    loadingRef.value = false
  }
}

const ok = () => handleAction('ok')
const cancel = () => handleAction('cancel')

if (props.closeByEsc) {
  watch(Escape, (v) => {
    if (v && visible.value) {
      visible.value = false
    }
  })
}
</script>

<template>
  <teleport to="#lew-dialog">
    <div
      class="lew-dialog-container"
      :style="{
        '--lew-dialog-transform-origin': transformOrigin
      }"
    >
      <transition name="lew-dialog-mask">
        <div v-if="visible" class="lew-dialog-mask" />
      </transition>
      <transition name="lew-dialog">
        <div v-if="visible" class="lew-dialog" @click="maskClick">
          <lew-flex
            direction="y"
            gap="20"
            class="lew-dialog-box lew-dialog-box-normal"
            @click.stop
          >
            <lew-flex y="start">
              <div class="left">
                <Icon :type :size="24" />
              </div>
              <div class="right">
                <header>
                  <slot name="title" />
                </header>
                <main>
                  <slot name="content" />
                </main>
              </div>
            </lew-flex>
            <footer>
              <lew-button
                :text="cancelText || locale.t('dialog.cancelText')"
                color="gray"
                type="light"
                size="small"
                :loading="cancelLoading"
                @click.stop="cancel"
              />
              <lew-button
                ref="okRef1"
                :text="okText || locale.t('dialog.okText')"
                type="fill"
                size="small"
                :color="type as LewColor"
                :loading="okLoading"
                @click.stop="ok"
              />
            </footer>
          </lew-flex>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.lew-dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--lew-modal-bgcolor);
  z-index: 2002;
}

.lew-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2002;

  .lew-dialog-box {
    position: relative;
    display: flex;
    width: 450px;
    height: auto;
    padding: 20px;
    border-radius: var(--lew-border-radius-large);
    background-color: var(--lew-modal-body-bgcolor);
    font-size: 0;

    header {
      width: 100%;
      font-size: 16px;
      font-weight: 600;
    }

    main {
      height: auto;
      font-size: 14px;
      color: var(--lew-text-color-5);
    }

    footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      width: 100%;
    }
  }

  .lew-dialog-box-normal {
    .left {
      width: 28px;
      margin-left: -2px;
    }

    .right {
      position: relative;
      top: 1px;
      width: calc(450px - 15px - 30px);
    }

    main {
      margin-top: 10px;
    }
  }
}

.lew-dialog-mask-enter-active,
.lew-dialog-mask-leave-active {
  transition: all 0.25s;
}

.lew-dialog-mask-enter-from,
.lew-dialog-mask-leave-to {
  opacity: 0;
}

.lew-dialog-enter-active,
.lew-dialog-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.3, 1.3, 0.3, 1),
    transform 0.4s cubic-bezier(0.3, 1.3, 0.3, 1);
  transform-origin: var(--lew-dialog-transform-origin);
}

.lew-dialog-leave-to,
.lew-dialog-enter-from {
  opacity: 0;
  transform: scale(0.2);
}
</style>
