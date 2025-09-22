<script lang="ts" setup name="dialog">
import type { LewColor } from 'lew-ui'
import { useMagicKeys } from '@vueuse/core'
import { LewButton, LewFlex, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { useDOMCreate } from 'lew-ui/hooks'
import { dialogEmits } from './emits'
import { dialogProps } from './props'

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const { Escape } = useMagicKeys()
useDOMCreate('lew-dialog')

const visible = ref(false)
const okLoading = ref(false)
const cancelLoading = ref(false)
const okRef = ref()

function maskClick() {
  if (props.closeOnClickOverlay) {
    visible.value = false
  }
}

onMounted(() => {
  visible.value = true
  nextTick(() => {
    if (okRef.value)
      okRef.value.$el.focus()
  })
})

watch(visible, (newVal) => {
  if (!newVal) {
    setTimeout(() => emit('close'), 500)
  }
})

async function handleAction(action: 'ok' | 'cancel') {
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
        '--lew-dialog-transform-origin': transformOrigin,
      }"
    >
      <transition name="lew-dialog-mask">
        <div v-if="visible" class="lew-dialog-mask" />
      </transition>
      <transition name="lew-dialog">
        <div v-if="visible" class="lew-dialog" @click="maskClick">
          <LewFlex direction="y" gap="20px" class="lew-dialog-box" @click.stop>
            <LewFlex y="start">
              <div v-if="!hideIcon" class="lew-dialog-box-left">
                <CommonIcon v-if="!icon" :type :size="24" />
                <RenderComponent v-else :render-fn="icon" />
              </div>
              <div class="lew-dialog-box-right">
                <div class="lew-dialog-box-right-header">
                  <RenderComponent :render-fn="title" />
                </div>
                <div class="lew-dialog-box-right-main">
                  <RenderComponent :render-fn="content" />
                </div>
              </div>
            </LewFlex>
            <div class="lew-dialog-box-footer">
              <LewButton
                :text="cancelText || locale.t('dialog.cancelText')"
                color="gray"
                type="light"
                size="small"
                :loading="cancelLoading"
                @click.stop="cancel"
              />
              <LewButton
                ref="okRef"
                :text="okText || locale.t('dialog.okText')"
                type="fill"
                size="small"
                :color="type as LewColor"
                :loading="okLoading"
                @click.stop="ok"
              />
            </div>
          </LewFlex>
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

    .lew-dialog-box-left {
      width: 28px;
      margin-left: -2.5px;
    }

    .lew-dialog-box-right {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 7px;
      width: calc(450px - 15px - 30px);

      .lew-dialog-box-right-header {
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        font-weight: 600;
      }

      .lew-dialog-box-right-main {
        height: auto;
        font-size: 14px;
        color: var(--lew-text-color-5);
      }
    }

    .lew-dialog-box-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      width: 100%;
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
