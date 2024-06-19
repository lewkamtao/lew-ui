<script lang="ts" setup>
import { ref, watch } from 'vue'
import { object2class, any2px } from 'lew-ui/utils'
import { useDOMCreate } from '../../../hooks'
import { drawerProps } from './props'
import { useMagicKeys } from '@vueuse/core'
const { Escape } = useMagicKeys()

useDOMCreate('lew-drawer')
const emit = defineEmits(['ok', 'cancel'])

const visible: Ref<boolean | undefined> = defineModel('visible')

const props = defineProps(drawerProps)
const isShowMain = ref(false)
const _visible = ref(false)

watch(
  () => visible.value,
  (val) => {
    // 设置固定单元格的阴影
    nextTick(() => {
      setTimeout(() => {
        isShowMain.value = !!val
      }, 50)
    })
    if (val === false) {
      setTimeout(() => {
        _visible.value = false
      }, 150)
    } else {
      _visible.value = true
    }
  }
)

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

const getStyle = (position: string, width: number, height: number) => {
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
    <transition name="fade">
      <div
        v-if="_visible"
        class="lew-drawer"
        :class="{ 'lew-drawer-show': isShowMain }"
        @click="visible = false"
      >
        <div
          :style="getStyle(position, width, height)"
          class="lew-drawer-main"
          :class="object2class('lew-drawer-main', { position })"
          @click.stop
        >
          <div v-if="$slots.header" class="header-slot">
            <slot name="header"></slot>
          </div>
          <lew-flex v-else-if="title" mode="between" y="center" class="header">
            <lew-text-trim class="title" :text="title" />
            <lew-icon size="18" class="lew-form-icon-clear" type="x" @click="visible = false" />
          </lew-flex>
          <div class="main-slot">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="footer-slot">
            <slot name="footer"></slot>
          </div>
          <lew-flex v-else-if="!hideFooter" x="end" y="center" class="footer">
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
    </transition>
  </teleport>
</template>
<style lang="scss">
.lew-drawer {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--lew-drawer-bgcolor);
  outline: 200vw solid var(--lew-modal-bgcolor);
  z-index: 2002;
  .main-slot {
    flex: 1;
    overflow: hidden;
  }
  .header {
    position: relative;
    height: 50px;
    padding: 10px 20px;
    border-bottom: var(--lew-modal-header-border);
    flex: 0;

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
    flex: 0;
  }

  .header-slot {
    background-color: var(--lew-bgcolor-1);
    flex: 0;
  }

  .footer-slot {
    background-color: var(--lew-bgcolor-1);
    flex: 0;
  }
}

.lew-drawer-main {
  position: fixed;
  width: 100%;
  height: 100%;
  transition: all 0.25s ease;
  background: var(--lew-modal-box-bgcolor);
  z-index: 202;
  display: flex;
  flex-direction: column;
}

.lew-drawer-main-position-right {
  right: 0;
  top: 0;
  transform: translateX(100%);
}

.lew-drawer-main-position-top {
  left: 0;
  top: 0;
  transform: translateY(-100%);
}

.lew-drawer-main-position-left {
  left: 0;
  top: 0;
  transform: translateX(-100%);
}

.lew-drawer-main-position-bottom {
  left: 0;
  bottom: 0;
  transform: translateY(100%);
}

.lew-drawer-show {
  .lew-drawer-main {
    transform: translate(0, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
