<script setup lang="ts" name="LewContextMenu">
import type { LewContextMenusOption } from 'lew-ui/types'
import type { Instance as TippyInstance } from 'tippy.js'
import { LewEmpty, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import _LewContextMenu from 'lew-ui/directives/context-menu/src/LewContextMenu.vue'
import { getUniqueId } from 'lew-ui/utils'
import { isFunction } from 'lodash-es'
import tippy from 'tippy.js'
import { initLewContextMenu } from '../index'
import { contextMenuEmits } from './emits'
import { contextMenuProps } from './props'

const props = defineProps(contextMenuProps)
const emit = defineEmits(contextMenuEmits)

const _options = computed(() => props.options)
const hasCheckableItems = computed(() => _options.value.some(item => item.checkable))
const hasChildrenItems = computed(() =>
  _options.value.some(item => item.children?.length),
)

const proxyCache = new WeakMap<LewContextMenusOption, LewContextMenusOption>()

function createItemProxy(item: LewContextMenusOption): LewContextMenusOption {
  if (proxyCache.has(item)) {
    return proxyCache.get(item)!
  }

  const proxy = new Proxy(item, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver)
    },
  })

  proxyCache.set(item, proxy)
  return proxy
}

function clickItem(item: LewContextMenusOption) {
  if (item.disabled)
    return

  const instance = props.dropdownInstance || window.LewContextMenu?.instance || null

  if (isFunction(item.onClick)) {
    try {
      const proxyItem = createItemProxy(item)
      const proxyOptions = new Proxy(_options.value, {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver)
        },
      })

      item.onClick?.(proxyItem, proxyOptions, instance)
    }
    catch (error) {
      console.error('[LewContextMenu] Error in onClick handler:', error)
    }
  }
  else {
    instance?.hide()
  }

  emit('change', item)
}

const TIPPY_CONFIG = {
  theme: 'light' as const,
  animation: 'shift-away-subtle' as const,
  trigger: 'mouseenter' as const,
  interactive: true,
  placement: 'right-start' as const,
  duration: [250, 250] as [number, number],
  delay: [120, 120] as [number, number],
  arrow: false,
  offset: [0, 0] as [number, number],
  allowHTML: true,
  hideOnClick: false,
  zIndex: 2001,
}

const uniqueId = getUniqueId()
const subMenuInstances = new Map<number, { app: any, tippy: TippyInstance }>()
const itemRefs = shallowRef<HTMLElement[]>([])

function setItemRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el && el instanceof HTMLElement) {
    itemRefs.value[index] = el
  }
}

function createSubMenu(
  options: LewContextMenusOption[],
): { element: HTMLElement, app: any } {
  const menuDom = document.createElement('div')
  const app = createApp({
    render() {
      return h(_LewContextMenu, {
        options,
        onChange: (item: LewContextMenusOption) => emit('change', item),
      })
    },
  })

  app.mount(menuDom)
  return { element: menuDom, app }
}

function initTippy() {
  itemRefs.value.forEach((el, index) => {
    const option = _options.value[index]

    if (!el || option?.disabled || !option?.children?.length) {
      return
    }

    try {
      if (!window.LewContextMenu) {
        initLewContextMenu()
      }

      const { element: menuDom, app } = createSubMenu(option.children)

      const tippyInstances = tippy(el as Element, {
        ...TIPPY_CONFIG,
        content: menuDom,
      })

      const tippyInstance = Array.isArray(tippyInstances)
        ? tippyInstances[0]
        : tippyInstances

      subMenuInstances.set(index, { app, tippy: tippyInstance })
      window.LewContextMenu.menuInstance[`${uniqueId}-${index}`] = tippyInstance

      const popperElement = tippyInstance.popper?.children?.[0] as HTMLElement
      popperElement?.setAttribute('data-lew', 'popover')
    }
    catch (error) {
      console.error('[LewContextMenu] Failed to initialize submenu:', error)
    }
  })
}

function cleanup() {
  subMenuInstances.forEach(({ app, tippy }, index) => {
    try {
      app?.unmount?.()
      tippy?.destroy?.()

      const key = `${uniqueId}-${index}`
      if (window.LewContextMenu?.menuInstance?.[key]) {
        delete window.LewContextMenu.menuInstance[key]
      }
    }
    catch (error) {
      console.warn('[LewContextMenu] Failed to cleanup submenu instance:', error)
    }
  })

  subMenuInstances.clear()
  // WeakMap 会自动垃圾回收，无需手动清理
}

onMounted(() => {
  nextTick(() => {
    initTippy()
  })
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <LewFlex direction="y" gap="0" class="lew-context-menu">
    <template v-if="_options.length > 0">
      <div
        v-for="(item, index) in _options"
        :key="`menu-item-${index}`"
        class="lew-context-menu-box"
        :class="{
          'lew-context-menu-box-disabled': item.disabled,
          'lew-context-menu-box-divider-line': item.isDividerLine,
        }"
      >
        <div
          :ref="(el: Element | ComponentPublicInstance | null) => setItemRef(el, index)"
          class="lew-context-menu-item"
          :style="{ 'animation-delay': `${index * 10}ms` }"
          :class="{
            'lew-context-menu-item-active': item.active,
            'lew-context-menu-item-disabled': item.disabled,
          }"
          @click="clickItem(item)"
        >
          <div v-if="hasCheckableItems" class="lew-context-menu-checkable">
            <CommonIcon v-if="item.checked" :size="12" :stroke-width="2.5" type="check" />
          </div>

          <div class="lew-context-menu-label">
            <RenderComponent v-if="item.icon" :render-fn="item.icon" />
            <RenderComponent
              class="lew-context-menu-label-text"
              :render-fn="item.label"
            />
          </div>

          <CommonIcon
            v-if="hasChildrenItems"
            class="lew-context-menu-item-chevron"
            :size="14"
            :style="{
              opacity: item.children?.length ? 1 : 0,
            }"
            type="chevron-right"
          />
        </div>
      </div>
    </template>

    <LewEmpty
      v-else
      width="120px"
      padding="5px"
      font-size="12px"
      type="search"
      title="暂无操作"
    />
  </LewFlex>
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
    width: 100%;

    .lew-context-menu-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--lew-text-color-1);
      box-sizing: border-box;
      border-radius: calc(var(--lew-border-radius-small) - 1px);
      padding: 0px 5px;
      animation: enterAni 0.3s cubic-bezier(0.3, 1.3, 0.3, 1) forwards;
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

      .lew-context-menu-checkable {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }

      .lew-context-menu-label {
        display: flex;
        align-items: center;
        flex: 1;
        gap: 5px;
        width: fit-content;
        user-select: none;
        font-size: 14px;
        height: 30px;
        padding: 0px 10px 0px 5px;
        line-height: 30px;
        box-sizing: border-box;
        cursor: pointer !important;

        .lew-context-menu-label-text {
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .lew-context-menu-item-chevron {
        flex-shrink: 0;
      }
    }

    .lew-context-menu-item-disabled {
      opacity: var(--lew-disabled-opacity);
      cursor: no-drop;
    }

    .lew-context-menu-item:hover {
      color: var(--lew-text-color-0);
      background-color: var(--lew-pop-bgcolor-hover);
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
    height: 0px;
    border-bottom: var(--lew-pop-border);
  }
}

.lew-context-menu-item-active {
  .lew-context-menu-label-text {
    color: var(--lew-color-primary-dark);
  }
}
</style>
