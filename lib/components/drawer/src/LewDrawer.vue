<script lang="ts" setup>
import { ref, watch } from 'vue'
import { object2class, any2px, getUniqueId } from 'lew-ui/utils'
import { useDOMCreate } from 'lew-ui/hooks'
import { LewButton, LewFlex } from 'lew-ui'
import { drawerProps } from './props'
import { useMagicKeys, onClickOutside } from '@vueuse/core'
import Icon from 'lew-ui/utils/Icon.vue'
import { isString } from 'lodash-es'
const { Escape } = useMagicKeys()

useDOMCreate('lew-drawer')
const emit = defineEmits(['ok', 'cancel'])

const visible: Ref<boolean | undefined> = defineModel('visible')

const props = defineProps(drawerProps)
const drawerBodyRef = ref(null)
const drawerId = `lew-drawer-${getUniqueId()}`

onClickOutside(drawerBodyRef, (e) => {
  if (visible.value && props.closeOnClickOverlay) {
    const { className } = e?.target as Element
    if (isString(className) && className.indexOf(drawerId) >= 0) {
      visible.value = false
    }
  }
})

const ok = () => {
  emit('ok')
}

const cancel = () => {
  emit('cancel')
}

if (props.closeByEsc) {
  watch(Escape, (v) => {
    if (v && visible.value) {
      visible.value = false
    }
  })
}

const getStyle = (
  position: string,
  width: number | string,
  height: number | string
) => {
  switch (true) {
    case !position:
      return 'width:30%;height:100%'

    case position === 'left':
      return `width:${any2px(width)};height:100vh`

    case position === 'right':
      return `width:${any2px(width)};height:100vh`

    case position === 'top':
      return `width:100vw;height:${any2px(height)}`

    case position === 'bottom':
      return `width:100vw;height:${any2px(height)}`

    default:
      break
  }
}
</script>
<template>
  <teleport to="#lew-drawer">
    <div class="lew-modal-container">
      <transition name="lew-drawer-mask">
        <div
          :style="{ zIndex }"
          v-if="visible"
          class="lew-drawer-mask"
          :class="drawerId"
        ></div>
      </transition>
      <div
        ref="drawerBodyRef"
        :style="`${getStyle(position, width, height)}; z-index:${zIndex}`"
        class="lew-drawer-body"
        :class="`${object2class('lew-drawer-body', { position })} ${visible ? 'lew-drawer-body-show' : ''}`"
      >
        <div v-if="$slots.header" class="lew-drawer-header-slot">
          <slot name="header"></slot>
        </div>
        <lew-flex
          v-else-if="title"
          mode="between"
          y="center"
          class="lew-drawer-header"
        >
          <lew-text-trim class="lew-drawer-title" :text="title" />
          <Icon
            :size="18"
            class="lew-form-icon-close lew-drawer-icon-close"
            type="close"
            @click="visible = false"
          />
        </lew-flex>
        <div class="lew-drawer-body-slot">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="lew-drawer-footer-slot">
          <slot name="footer"></slot>
        </div>
        <lew-flex
          v-else-if="!hideFooter"
          x="end"
          y="center"
          class="lew-drawer-footer"
        >
          <lew-button
            v-bind="{
              type: 'text',
              text: '取消',
              round: true,
              color: 'normal',
              ...(cancelProps as any)
            }"
            @click="cancel"
          />
          <lew-button
            v-bind="{
              text: '确定',
              color: 'primary',
              round: true,
              ...(okProps as any)
            }"
            @click="ok"
          />
        </lew-flex>
      </div>
    </div>
  </teleport>
</template>
<style lang="scss">
.lew-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--lew-modal-bgcolor);
}

.lew-drawer-body {
  position: fixed;
  transition: all 0.25s ease;
  background: var(--lew-modal-body-bgcolor);
  display: flex;
  flex-direction: column;
}
.lew-drawer-body-slot {
  flex: 1;
  overflow: hidden;
}
.lew-drawer-header {
  position: relative;
  height: 50px;
  padding: 10px 20px;
  border-bottom: var(--lew-modal-header-border);
  flex: 0;

  .lew-drawer-title {
    font-size: 16px;
    font-weight: bold;
  }
  .lew-drawer-icon-close {
    right: 15px;
  }
  .lew-drawer-icon-close:hover {
    background-color: var(--lew-bgcolor-5);
  }
}

.lew-drawer-footer {
  padding: 10px 20px;
  border-top: var(--lew-modal-footer-border);
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
</style>
