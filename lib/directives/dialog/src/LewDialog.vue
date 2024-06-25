<script lang="ts" setup name="dialog">
import { LewButton, LewFlex } from 'lew-ui'
import { useMagicKeys } from '@vueuse/core'
import { dialogProps } from './props'
import { getStatusIcon } from 'lew-ui/utils'
import { useDOMCreate } from 'lew-ui/hooks'

const { Escape } = useMagicKeys()
useDOMCreate('lew-dialog')
const props = defineProps(dialogProps)
const emit = defineEmits(['close', 'show'])
const visible = ref<boolean>(false)
const okLoading = ref<boolean>(false)
const cancelLoading = ref<boolean>(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const maskClick = () => {
  if (props?.closeOnClickOverlay) {
    visible.value = false
  }
}

onMounted(() => {
  visible.value = true
})

watch(
  () => visible.value,
  (newVal) => {
    if (newVal) {
      emit('show')
    } else {
      setTimeout(() => {
        emit('close')
      }, 500)
    }
  }
)

const ok = async () => {
  if (typeof props.ok === 'function') {
    okLoading.value = true
    const isOk = await props.ok()
    if (isOk !== false) {
      visible.value = false
    }
    okLoading.value = false
  }
}

const cancel = async () => {
  if (typeof props.cancel === 'function') {
    cancelLoading.value = true
    const isCancel = await props.cancel()
    if (isCancel !== false) {
      visible.value = false
    }
    cancelLoading.value = false
  }
}

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
        <div v-if="visible" class="lew-dialog-mask"></div>
      </transition>
      <transition name="lew-dialog">
        <div v-if="visible" class="lew-dialog" @click="maskClick">
          <div v-if="layout === 'normal'" class="lew-dialog-box lew-dialog-box-normal" @click.stop>
            <div class="left">
              <div
                :class="`lew-dialog-icon lew-dialog-icon-${type}`"
                v-html="getStatusIcon(type)"
              ></div>
            </div>
            <div class="right">
              <header>
                <slot name="title"></slot>
                <span class="gulu-dialog-close" @click="visible = false"></span>
              </header>
              <main>
                <slot name="content"></slot>
              </main>
              <footer>
                <lew-button
                  v-if="cancelText"
                  :text="cancelText"
                  type="text"
                  color="gray"
                  round
                  :loading="cancelLoading"
                  @click.stop="cancel"
                />
                <lew-button
                  v-if="okText"
                  :text="okText"
                  type="fill"
                  round
                  :color="type"
                  :loading="okLoading"
                  @click.stop="ok"
                />
              </footer>
            </div>
          </div>

          <div v-if="layout === 'mini'" class="lew-dialog-box lew-dialog-box-mini" @click.stop>
            <div class="left">
              <div
                :class="`lew-dialog-icon lew-dialog-icon-${type}`"
                v-html="getStatusIcon(type)"
              ></div>
            </div>
            <lew-flex class="right" y="start">
              <main>
                <slot name="content"></slot>
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
                  v-if="okText"
                  :text="okText"
                  type="fill"
                  size="small"
                  round
                  :color="type"
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
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2002;

  .lew-dialog-box {
    position: relative;
    display: flex;
    width: 350px;
    height: auto;
    padding: 20px;
    border-radius: var(--lew-border-radius-medium);
    background-color: var(--lew-modal-box-bgcolor);
    border: var(--lew-dialog-box-border);
    box-shadow: var(--lew-dialog-box-shadow);
    .lew-dialog-icon:deep() {
      svg {
        width: 32px;
        height: 32px;
      }
    }

    .lew-dialog-icon-success {
      color: var(--lew-color-success);
    }

    .lew-dialog-icon-warning {
      color: var(--lew-color-warning);
    }

    .lew-dialog-icon-normal {
      color: var(--lew-color-normal);
    }

    .lew-dialog-icon-info {
      color: var(--lew-color-info);
    }

    .lew-dialog-icon-error {
      color: var(--lew-color-error);
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
      justify-content: end;
      width: 100%;

      .lew-button {
        margin-left: 10px;
      }
    }

    .btn-close {
      position: absolute;
      top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      right: 10px;
      border-radius: var(--lew-border-radius-small);
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;
      z-index: 2051;
      color: var(--lew-text-color-5);
    }

    .btn-close:hover {
      background: rgba($color: #000000, $alpha: 0.05);
      color: var(--lew-text-color-1);
    }

    .btn-close:active {
      background: rgba($color: #000000, $alpha: 0.15);
      color: var(--lew-text-color-0);
    }
  }

  .lew-dialog-box-normal {
    .left {
      margin-right: 15px;
      width: 30px;
    }

    .right {
      position: relative;
      top: 1px;
      width: 310px;
      header {
        margin-top: 4px;
      }
    }

    main {
      padding: 10px 0px 20px 0px;
    }
  }

  .lew-dialog-box-mini {
    padding: 12px 20px;
    border-radius: 50px;
    max-width: 480px;
    width: auto;
    align-items: center;

    .left {
      margin-top: 6px;
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
    }

    .right {
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
