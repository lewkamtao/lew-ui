import type { ComputedRef, Ref, ShallowRef } from 'vue'
import { tryOnScopeDispose } from '@vueuse/core'
import {
  computed,
  nextTick,
  shallowRef,
  unref,
  watch,
} from 'vue'

export interface UseVirtualScrollOptions {
  /** 每项固定高度（px） */
  itemSize: number | Ref<number> | ComputedRef<number>
  /** 视口外预渲染条数，默认 5 */
  buffer?: number | Ref<number> | ComputedRef<number>
  /** 预估容器高度，首屏 ResizeObserver 前使用，默认 0 */
  estimatedContainerHeight?: number
  /**
   * 滚动容器内固定占位高度（如 sticky 表头）。
   * 从 scrollTop / clientHeight 中扣除后再计算可见窗口。
   */
  scrollOffset?: number | Ref<number> | ComputedRef<number>
}

export interface VirtualScrollItem<T> {
  data: T
  index: number
}

export interface UseVirtualScrollReturn<T> {
  containerRef: Ref<HTMLElement | null>
  /** 当前需要渲染的切片 */
  visibleItems: ShallowRef<VirtualScrollItem<T>[]>
  /** 内容区 translateY */
  offsetY: ShallowRef<number>
  /** 占位总高度，撑开滚动条 */
  totalHeight: ComputedRef<number>
  scrollToIndex: (index: number, align?: 'auto' | 'start' | 'center' | 'end') => void
  reset: () => void
  /** 强制根据当前 scrollTop 重算可见区间 */
  update: () => void
}

/**
 * 固定高度虚拟滚动核心逻辑。
 *
 * 性能要点：
 * - 仅在可见窗口索引变化时更新切片（避免逐像素触发渲染）
 * - scroll 使用 passive + rAF 合并
 * - 定位交给 transform: translate3d，由组件层应用
 */
export function useVirtualScroll<T>(
  list: Ref<T[]> | ComputedRef<T[]> | (() => T[]),
  options: UseVirtualScrollOptions,
): UseVirtualScrollReturn<T> {
  const containerRef = shallowRef<HTMLElement | null>(null)
  const visibleItems = shallowRef<VirtualScrollItem<T>[]>([]) as ShallowRef<
    VirtualScrollItem<T>[]
  >
  const offsetY = shallowRef(0)
  const containerHeight = shallowRef(options.estimatedContainerHeight ?? 0)

  let startIndex = 0
  let endIndex = 0
  let rafId = 0
  let resizeObserver: ResizeObserver | null = null
  let boundEl: HTMLElement | null = null
  let stableBodyClientHeight = 0
  let lastObservedWidth = 0

  const getList = (): T[] => {
    if (typeof list === 'function')
      return list()
    return unref(list) ?? []
  }

  const getItemSize = () => Math.max(1, Number(unref(options.itemSize)) || 1)
  const getBuffer = () => Math.max(0, Number(unref(options.buffer ?? 5)) || 0)
  const getScrollOffset = () => Math.max(0, Number(unref(options.scrollOffset ?? 0)) || 0)

  const totalHeight = computed(() => getList().length * getItemSize())

  function computeRange(scrollTop: number, clientHeight: number) {
    const size = getItemSize()
    const buffer = getBuffer()
    const length = getList().length

    if (length === 0) {
      return { start: 0, end: 0, offset: 0 }
    }

    if (clientHeight <= 0) {
      return null
    }

    const start = Math.max(0, Math.floor(scrollTop / size) - buffer)
    const visibleCount = Math.ceil(clientHeight / size) + buffer * 2
    const end = Math.min(length, start + visibleCount)
    return {
      start,
      end,
      offset: start * size,
    }
  }

  function applyRange(start: number, end: number, offset: number, force = false) {
    if (!force && start === startIndex && end === endIndex && offsetY.value === offset) {
      return
    }

    startIndex = start
    endIndex = end
    offsetY.value = offset

    const source = getList()
    const next: VirtualScrollItem<T>[] = Array.from({ length: Math.max(0, end - start) })
    for (let i = start; i < end; i++) {
      next[i - start] = { data: source[i]!, index: i }
    }
    visibleItems.value = next
  }

  function resolveViewportMetrics() {
    const el = containerRef.value
    const clientHeight = el?.clientHeight || containerHeight.value
    const scrollTop = el?.scrollTop ?? 0
    const scrollOffset = getScrollOffset()
    const clientWidth = el?.clientWidth ?? 0
    const rawBodyClientHeight = Math.max(0, clientHeight - scrollOffset)

    if (clientWidth > 0 && clientWidth !== lastObservedWidth) {
      lastObservedWidth = clientWidth
      stableBodyClientHeight = rawBodyClientHeight
    }
    else if (rawBodyClientHeight > 0 && stableBodyClientHeight === 0) {
      stableBodyClientHeight = rawBodyClientHeight
    }
    else if (
      rawBodyClientHeight > 0
      && Math.abs(rawBodyClientHeight - stableBodyClientHeight) > 24
    ) {
      stableBodyClientHeight = rawBodyClientHeight
    }

    const bodyClientHeight = stableBodyClientHeight > 0
      ? stableBodyClientHeight
      : rawBodyClientHeight

    return {
      scrollTop,
      bodyScrollTop: Math.max(0, scrollTop - scrollOffset),
      bodyClientHeight,
      clientHeight,
    }
  }

  function update(force = false) {
    const { bodyScrollTop, bodyClientHeight, clientHeight } = resolveViewportMetrics()

    if (containerRef.value && clientHeight > 0)
      containerHeight.value = clientHeight

    let range = computeRange(bodyScrollTop, bodyClientHeight)

    if (!range) {
      if (!force)
        return

      const fallbackHeight = Math.max(
        getItemSize(),
        bodyClientHeight
        || Math.max(0, containerHeight.value - getScrollOffset())
        || options.estimatedContainerHeight
        || getItemSize() * 10,
      )
      range = computeRange(bodyScrollTop, fallbackHeight)
      if (!range)
        return
    }

    applyRange(range.start, range.end, range.offset, force)
  }

  function scheduleUpdate() {
    if (rafId)
      return
    rafId = requestAnimationFrame(() => {
      rafId = 0
      update()
    })
  }

  function onScroll() {
    scheduleUpdate()
  }

  function scrollToIndex(
    index: number,
    align: 'auto' | 'start' | 'center' | 'end' = 'auto',
  ) {
    const el = containerRef.value
    if (!el)
      return

    const size = getItemSize()
    const length = getList().length
    if (length === 0)
      return

    const scrollOffset = getScrollOffset()
    const target = Math.max(0, Math.min(index, length - 1))
    const itemTop = scrollOffset + target * size
    const itemBottom = itemTop + size
    const viewTop = el.scrollTop
    const viewBottom = viewTop + el.clientHeight

    let nextTop = itemTop

    if (align === 'center') {
      nextTop = itemTop - (el.clientHeight - scrollOffset - size) / 2
    }
    else if (align === 'end') {
      nextTop = itemBottom - el.clientHeight
    }
    else if (align === 'auto') {
      if (itemTop >= viewTop && itemBottom <= viewBottom)
        return
      if (itemTop < viewTop)
        nextTop = itemTop
      else
        nextTop = itemBottom - el.clientHeight
    }

    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight)
    el.scrollTop = Math.max(0, Math.min(nextTop, maxScroll))
    update(true)
  }

  function reset() {
    const el = containerRef.value
    if (el)
      el.scrollTop = 0
    stableBodyClientHeight = 0
    lastObservedWidth = 0
    update(true)
  }

  function unbindContainer() {
    if (!boundEl)
      return
    boundEl.removeEventListener('scroll', onScroll)
    resizeObserver?.disconnect()
    resizeObserver = null
    boundEl = null
  }

  function bindContainer(el: HTMLElement | null) {
    if (boundEl === el)
      return

    unbindContainer()

    if (!el)
      return

    boundEl = el
    el.addEventListener('scroll', onScroll, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate()
      })
      resizeObserver.observe(el)
    }

    containerHeight.value = el.clientHeight
    stableBodyClientHeight = 0
    lastObservedWidth = 0
    update(true)
  }

  watch(containerRef, el => bindContainer(el))

  watch(
    () => getList(),
    async () => {
      await nextTick()
      update(true)
      await nextTick()
      const el = containerRef.value
      if (!el)
        return

      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight)
      if (el.scrollTop > maxScroll)
        el.scrollTop = maxScroll
    },
  )

  watch(
    () => [getItemSize(), getBuffer(), getScrollOffset()] as const,
    () => update(true),
  )

  tryOnScopeDispose(() => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    unbindContainer()
  })

  update(true)

  return {
    containerRef,
    visibleItems,
    offsetY,
    totalHeight,
    scrollToIndex,
    reset,
    update: () => update(false),
  }
}
