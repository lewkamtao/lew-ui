<script setup lang="ts">
import { LewFlex, LewIcon } from 'lew-ui/components'
import tippy from 'tippy.js'
import LewContextMenu from './LewContextMenu.vue'
interface ContextMenus {
  label?: string
  icon?: string
  value?: string
  children?: ContextMenus[]
  disabled?: boolean
  level?: number
  isDividerLine?: false
  [key: string]: any
}

const props = defineProps({
  menus: {
    type: Array as PropType<ContextMenus[]>,
    default: () => []
  }
})

const emit = defineEmits(['clickitem'])

const clickItem = (item: ContextMenus) => {
  emit('clickitem', item)
}

let instance: any
let itemRefs = ref<(Element | globalThis.ComponentPublicInstance | null)[]>([])
const initTippy = () => {
  itemRefs.value.forEach((el: any, index: number) => {
    const item = props.menus[index]
    if (!el || item.disabled || (item.children || []).length === 0) {
      return
    }
    const menuDom = document.createElement('div')
    createApp({
      render() {
        return h(LewContextMenu, {
          menus: item.children,
          onClickitem: (e: any) => {
            console.log(e)
          }
        })
      }
    }).mount(menuDom)
    instance = tippy(el, {
      theme: 'light',
      animation: 'shift-away-subtle',
      trigger: 'mouseenter',
      interactive: true,
      placement: 'right-start',
      duration: [250, 250],
      arrow: false,
      offset: [0, 0],
      allowHTML: true,
      hideOnClick: false,
      content: menuDom
    })
    instance.popper.children[0].setAttribute('data-lew', 'popover')
  })
}

onMounted(() => {
  initTippy()
})
</script>

<template>
  <lew-flex direction="y" gap="0" class="lew-context-menu">
    <div
      v-for="(item, index) in menus"
      :key="index"
      class="lew-context-menu-box"
      :class="{
        'lew-context-menu-box-disabled': item.disabled,
        'lew-context-menu-box-divider-line': item.isDividerLine
      }"
    >
      <div
        :ref="(el) => itemRefs.push(el)"
        @click="clickItem(item)"
        class="lew-context-menu-item"
        :style="{ 'animation-delay': index * 20 + 'ms' }"
      >
        <div class="lew-context-menu-label">
          <lew-icon v-if="item.icon" size="14" :type="item.icon"></lew-icon>
          {{ item.label }}
        </div>
        <lew-icon v-if="(item.children || []).length > 0" size="14" type="chevron-right"></lew-icon>
      </div>
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-context-menu {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;

  .lew-context-menu-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-sizing: border-box;
    transition: all 0.25s ease;
    width: 100%;

    .lew-context-menu-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: var(--lew-border-radius-small);
      padding: 0px 5px;
      animation: enterAni 0.2s ease forwards;
      opacity: 0;
      @keyframes enterAni {
        0% {
          transform: translateX(-10px);
          opacity: 0;
        }
        100% {
          transform: translateX(0px);
          opacity: 1;
        }
      }
      .lew-context-menu-label {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 100%;
        user-select: none;
        font-size: 14px;
        height: 30px;
        padding: 0px 10px 0px 5px;
        line-height: 30px;
        box-sizing: border-box;
        cursor: pointer !important;
      }
    }

    .lew-context-menu-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-context-menu-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bg-active);
    }
  }
  .lew-context-menu-box-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-context-menu-box-divider-line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12px;
    overflow: hidden;
    .lew-context-menu-item {
      display: none;
    }
  }
  .lew-context-menu-box-divider-line::after {
    content: '';
    width: calc(100% - 20px);
    height: 1px;
    background-color: var(--lew-bgcolor-2);
  }
}
</style>
