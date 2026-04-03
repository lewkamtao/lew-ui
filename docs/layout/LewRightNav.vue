<script setup lang="ts">
import { useDemoLoaded } from 'docs/composables/useDemoLoaded'
import { useRoute } from 'vue-router'

/** 与滚动、点击跳转对齐的视口偏移（与正文 padding / 吸顶预留一致） */
const SCROLL_MARGIN = 100

interface NavItem {
  /** 稳定唯一键，避免同文案标题导致激活错乱 */
  key: string
  label: string
  top: number
}

const route = useRoute()
const { demoAllLoaded } = useDemoLoaded()
const navMenus = ref<NavItem[]>([])
const activeKey = ref('')

const navListRef = ref<HTMLElement | null>(null)
const itemRefMap = new Map<string, HTMLElement>()
const indicatorStyle = ref({
  top: '0px',
  height: '0px',
  opacity: '0',
})

let listResizeObserver: ResizeObserver | null = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null
let scrollRaf = 0
let mo: MutationObserver | null = null
/** 点击目录 smooth 滚动期间忽略 scroll spy，避免高亮来回闪 */
let clickSpyLockUntil = 0

function setNavItemRef(el: unknown, key: string) {
  if (el instanceof HTMLElement)
    itemRefMap.set(key, el)
  else
    itemRefMap.delete(key)
}

function syncIndicator(retry = 0) {
  nextTick(() => {
    const list = navListRef.value
    const key = activeKey.value
    if (!list || !key || !navMenus.value.length) {
      indicatorStyle.value = { top: '0px', height: '0px', opacity: '0' }
      return
    }
    const el = itemRefMap.get(key)
    if (!el) {
      if (retry < 4)
        requestAnimationFrame(() => syncIndicator(retry + 1))
      return
    }
    const listRect = list.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const top = elRect.top - listRect.top + list.scrollTop
    const height = elRect.height
    indicatorStyle.value = {
      top: `${top}px`,
      height: `${height}px`,
      opacity: '1',
    }
  })
}

function getMainEl(): HTMLElement | null {
  return document.getElementById('component-main')
}

/** 元素相对滚动容器内容顶部的 scrollTop 偏移（不依赖 offsetParent） */
function getOffsetTopInScrollContainer(el: HTMLElement, scrollParent: HTMLElement): number {
  const p = scrollParent.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  return r.top - p.top + scrollParent.scrollTop
}

function refreshNav() {
  const main = getMainEl()
  if (!main) {
    navMenus.value = []
    return
  }
  // 示例区块：.demo-title（LewDemoBox）；API 表格：.demo-docs-title（LewDocsTables，默认 v-show 等 demo 全加载）
  const nodes = main.querySelectorAll('.demo-title, .demo-docs-title')
  navMenus.value = Array.from(nodes)
    .filter((node) => {
      const el = node as HTMLElement
      if (el.classList.contains('demo-docs-title'))
        return demoAllLoaded.value
      return true
    })
    .map((node, index) => {
      const el = node as HTMLElement
      const label = (el.textContent || '').trim() || `章节 ${index + 1}`
      return {
        key: `nav-${index}`,
        label,
        top: getOffsetTopInScrollContainer(el, main),
      }
    })
}

/** 当前应高亮的目录项：最后一个「标题顶 <= 滚动位置 + 边距」的条目 */
function updateActiveFromScroll() {
  if (performance.now() < clickSpyLockUntil)
    return
  const main = getMainEl()
  if (!main || !navMenus.value.length) {
    if (!navMenus.value.length)
      activeKey.value = ''
    return
  }
  const threshold = main.scrollTop + SCROLL_MARGIN
  let key = ''
  for (let i = navMenus.value.length - 1; i >= 0; i--) {
    if (navMenus.value[i].top <= threshold) {
      key = navMenus.value[i].key
      break
    }
  }
  if (!key)
    key = navMenus.value[0].key
  activeKey.value = key
}

function scheduleRefreshDebounced() {
  if (debounceTimer)
    clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debounceTimer = null
    refreshNav()
    updateActiveFromScroll()
    syncIndicator()
  }, 80)
}

function onScroll() {
  if (scrollRaf)
    return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    updateActiveFromScroll()
  })
}

function toScroll(item: NavItem) {
  const main = getMainEl()
  if (!main)
    return
  clickSpyLockUntil = performance.now() + 450
  activeKey.value = item.key
  main.scrollTo({ top: Math.max(0, item.top - SCROLL_MARGIN), behavior: 'smooth' })
}

function teardownMainListeners(main: HTMLElement) {
  main.removeEventListener('scroll', onScroll)
  mo?.disconnect()
  mo = null
  window.removeEventListener('resize', scheduleRefreshDebounced)
}

watch(
  () => route.path,
  () => {
    activeKey.value = ''
    nextTick(() => {
      refreshNav()
      updateActiveFromScroll()
      scheduleRefreshDebounced()
      syncIndicator()
    })
  },
)

watch(demoAllLoaded, () => {
  nextTick(() => {
    refreshNav()
    updateActiveFromScroll()
    syncIndicator()
  })
})

watch(activeKey, () => {
  syncIndicator()
})

watch(navMenus, () => {
  syncIndicator()
})

onMounted(() => {
  nextTick(() => {
    const main = getMainEl()
    if (!main)
      return
    refreshNav()
    updateActiveFromScroll()
    syncIndicator()
    main.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', scheduleRefreshDebounced, { passive: true })
    mo = new MutationObserver(() => scheduleRefreshDebounced())
    mo.observe(main, { childList: true, subtree: true })
    scheduleRefreshDebounced()

    nextTick(() => {
      if (navListRef.value) {
        listResizeObserver = new ResizeObserver(() => syncIndicator())
        listResizeObserver.observe(navListRef.value)
      }
    })
  })
})

onUnmounted(() => {
  if (debounceTimer)
    clearTimeout(debounceTimer)
  debounceTimer = null
  if (scrollRaf)
    cancelAnimationFrame(scrollRaf)
  scrollRaf = 0
  listResizeObserver?.disconnect()
  listResizeObserver = null
  itemRefMap.clear()
  const main = getMainEl()
  if (main)
    teardownMainListeners(main)
})
</script>

<template>
  <div class="right-nav">
    <lew-title class="nav-heading" size="14px">
      目录
    </lew-title>
    <div ref="navListRef" class="nav-list">
      <div class="nav-indicator" :style="indicatorStyle" aria-hidden="true" />
      <div
        v-for="item in navMenus"
        :key="item.key"
        :ref="(el) => setNavItemRef(el, item.key)"
        class="nav-item"
        :class="{ 'is-active': item.key === activeKey }"
        @click="toScroll(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.right-nav {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-1);
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-heading {
  display: block;
  padding: 5px 10px 10px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--lew-bgcolor-2);
  border-radius: 0;
}

.nav-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2px;
}

.nav-indicator {
  position: absolute;
  left: 0;
  right: 0;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-color-primary-light);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  pointer-events: none;
  z-index: 0;
  transition:
    top 0.32s cubic-bezier(0.33, 1, 0.68, 1),
    height 0.32s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.2s ease;
}

.nav-item {
  position: relative;
  z-index: 1;
  display: block;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: var(--lew-border-radius-small);
  color: var(--lew-text-color-1);
  transition: color 0.2s ease;

  &:hover:not(.is-active) {
    color: var(--lew-text-color-0);
    background-color: var(--lew-bgcolor-2);
  }

  &.is-active {
    font-weight: 600;
    color: var(--lew-color-primary-dark);
  }

  &.is-active:hover {
    color: var(--lew-color-primary-dark);
  }
}
</style>
