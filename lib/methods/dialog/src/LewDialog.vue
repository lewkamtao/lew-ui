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
            v-if="layout === 'normal'"
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
                :text="cancelText || locale.t('dialog.cancel')"
                color="gray"
                type="text"
                :loading="cancelLoading"
                @click.stop="cancel"
              />
              <lew-button
                ref="okRef1"
                :text="okText || locale.t('dialog.ok')"
                type="fill"
                :color="type as LewColor"
                :loading="okLoading"
                @click.stop="ok"
              />
            </footer>
          </lew-flex>

          <div
            v-if="layout === 'mini'"
            class="lew-dialog-box lew-dialog-box-mini"
            @click.stop
          >
            <div class="left">
              <Icon :size="20" :type />
            </div>
            <lew-flex class="right">
              <main>
                <slot name="content" />
              </main>
              <lew-flex x="end">
                <lew-button
                  v-if="cancelText"
                  :text="cancelText"
                  type="text"
                  size="small"
                  color="gray"
                  round
                  :loading="cancelLoading"
                  @click.stop="cancel"
                />
                <lew-button
                  ref="okRef2"
                  v-if="okText"
                  :text="okText"
                  type="fill"
                  size="small"
                  round
                  :color="type as LewColor"
                  :loading="okLoading"
                  @click.stop="ok"
                />
              </lew-flex>
            </lew-flex>
          </div>
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
    border-radius: var(--lew-border-radius-medium);
    background-color: var(--lew-modal-body-bgcolor);
    border: var(--lew-dialog-box-border);
    box-shadow: var(--lew-dialog-box-shadow);
    font-size: 0;

    .lew-dialog-icon:deep() {
      width: 36px;
      height: 36px;
      svg {
        width: 36px;
        height: 36px;
      }
    }

    @each $type in (success, warning, normal, info, error) {
      .lew-dialog-icon-#{$type} {
        color: var(--lew-color-#{$type});
      }
    }

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

    .btn-close {
      position: absolute;
      top: 8px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border-radius: var(--lew-border-radius-small);
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      z-index: 2051;
      color: var(--lew-text-color-5);

      &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: var(--lew-text-color-1);
      }

      &:active {
        background: rgba(0, 0, 0, 0.15);
        color: var(--lew-text-color-0);
      }
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

  .lew-dialog-box-mini {
    padding: 15px 20px;
    border-radius: 50px;
    max-width: 480px;
    width: auto;
    align-items: center;

    .left {
      margin-right: 10px;
      display: flex;

      .lew-dialog-icon:deep() {
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    .right {
      position: relative;
      top: 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      main {
        flex-shrink: 0;
        margin-right: 20px;
        max-width: calc(480px - 180px);
      }

      footer {
        width: 80px;
      }
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
