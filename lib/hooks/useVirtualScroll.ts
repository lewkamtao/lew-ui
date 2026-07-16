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
  /**
   * 按视口屏数计算基础缓冲条数，默认 0。
   * 适合快速滚动场景，最终基础缓冲会取 buffer 与该值计算结果的较大者。
   */
  bufferScreens?: number | Ref<number> | ComputedRef<number>
  /** 预估容器高度，首屏 ResizeObserver 前使用，默认 0 */
  estimatedContainerHeight?: number
  /**
   * 滚动容器内占用视口的固定高度（如 sticky 表头）。
   * 仅从 clientHeight 中扣除；scrollTop 仍是内容区的真实滚动坐标。
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
 * - 渲染窗口带安全区，仅在视口接近窗口边缘时更新切片
 * - 快速跳跃滚动同步更新窗口，避免原生滚动先于下一帧产生空白
 * - 缓冲区按滚动方向动态分配，给前进方向更多预渲染空间
 * - 只输出 offset，由组件层选择 spacer 或 translate3d 定位
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
  let scheduledForce = false
  let resizeObserver: ResizeObserver | null = null
  let boundEl: HTMLElement | null = null
  let rangeInitialized = false
  let lastScrollTop = 0

  const getList = (): T[] => {
    if (typeof list === 'function')
      return list()
    return unref(list) ?? []
  }

  const getItemSize = () => Math.max(1, Number(unref(options.itemSize)) || 1)
  const getBuffer = () => Math.max(0, Number(unref(options.buffer ?? 5)) || 0)
  const getBufferScreens = () => Math.max(0, Number(unref(options.bufferScreens ?? 0)) || 0)
  const getScrollOffset = () => Math.max(0, Number(unref(options.scrollOffset ?? 0)) || 0)

  const totalHeight = computed(() => getList().length * getItemSize())

  type ScrollDirection = 'up' | 'down' | 'none'

  interface ViewportRange {
    visibleStart: number
    visibleEnd: number
    buffer: number
    length: number
  }

  function computeViewportRange(scrollTop: number, clientHeight: number): ViewportRange {
    const size = getItemSize()
    const length = getList().length
    const safeScrollTop = Math.max(0, scrollTop)
    const visibleStart = Math.min(length, Math.floor(safeScrollTop / size))
    const visibleEnd = Math.min(
      length,
      Math.max(visibleStart, Math.ceil((safeScrollTop + clientHeight) / size)),
    )
    const screenItemCount = Math.ceil(clientHeight / size)
    const screenBuffer = Math.ceil(screenItemCount * getBufferScreens())

    return {
      visibleStart,
      visibleEnd,
      buffer: Math.max(getBuffer(), screenBuffer),
      length,
    }
  }

  function computeRange(viewport: ViewportRange, direction: ScrollDirection) {
    const { visibleStart, visibleEnd, buffer, length } = viewport
    const size = getItemSize()

    if (length === 0) {
      return { start: 0, end: 0, offset: 0 }
    }

    let before = buffer
    let after = buffer

    // 总缓冲条数不变，只把更多空间留给当前滚动方向。
    if (buffer > 1 && direction !== 'none') {
      const trailingBuffer = Math.max(1, Math.floor(buffer / 2))
      const leadingBuffer = buffer * 2 - trailingBuffer
      if (direction === 'down') {
        before = trailingBuffer
        after = leadingBuffer
      }
      else {
        before = leadingBuffer
        after = trailingBuffer
      }
    }

    let start = Math.max(0, visibleStart - before)
    let end = Math.min(length, visibleEnd + after)
    const targetCount = Math.min(
      length,
      visibleEnd - visibleStart + buffer * 2,
    )

    // 到达首尾时把无法使用的缓冲量补到另一侧，保持窗口大小稳定。
    if (end - start < targetCount) {
      if (start === 0)
        end = Math.min(length, targetCount)
      else if (end === length)
        start = Math.max(0, length - targetCount)
    }

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
    rangeInitialized = true

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

    return {
      scrollTop,
      bodyClientHeight: Math.max(0, clientHeight - scrollOffset),
      clientHeight,
    }
  }

  function canReuseRange(
    viewport: ViewportRange,
    direction: ScrollDirection,
  ): boolean {
    if (!rangeInitialized)
      return false

    const { visibleStart, visibleEnd, buffer, length } = viewport
    if (visibleStart < startIndex || visibleEnd > endIndex)
      return false

    const guard = buffer > 0 ? Math.max(1, Math.floor(buffer / 2)) : 0
    const hasLeadingRoom
      = endIndex === length || visibleEnd + guard <= endIndex
    const hasTrailingRoom
      = startIndex === 0 || visibleStart - guard >= startIndex

    if (direction === 'down')
      return hasLeadingRoom
    if (direction === 'up')
      return hasTrailingRoom
    return hasLeadingRoom && hasTrailingRoom
  }

  function update(force = false) {
    const { scrollTop, bodyClientHeight, clientHeight } = resolveViewportMetrics()

    if (containerRef.value && clientHeight > 0)
      containerHeight.value = clientHeight

    let viewportHeight = bodyClientHeight
    if (viewportHeight <= 0) {
      if (!force)
        return

      viewportHeight = Math.max(
        getItemSize(),
        Math.max(0, containerHeight.value - getScrollOffset()),
        Math.max(0, (options.estimatedContainerHeight ?? 0) - getScrollOffset()),
        getItemSize() * 10,
      )
    }

    const direction: ScrollDirection
      = scrollTop > lastScrollTop
        ? 'down'
        : scrollTop < lastScrollTop
          ? 'up'
          : 'none'
    lastScrollTop = scrollTop

    const viewport = computeViewportRange(scrollTop, viewportHeight)
    if (!force && canReuseRange(viewport, direction))
      return

    const range = computeRange(viewport, direction)
    applyRange(range.start, range.end, range.offset, force)
  }

  function scheduleUpdate(force = false) {
    scheduledForce ||= force
    if (rafId)
      return
    rafId = requestAnimationFrame(() => {
      rafId = 0
      const shouldForce = scheduledForce
      scheduledForce = false
      update(shouldForce)
    })
  }

  function onScroll() {
    // scroll 事件发生时浏览器已经移动了原生滚动层；这里同步推进数据窗口，
    // Vue 会在本次事件后的微任务中完成 DOM patch，避免再等待一个 rAF。
    update()
  }

  function getMaxScrollTop(el: HTMLElement) {
    return Math.max(
      0,
      getScrollOffset() + getList().length * getItemSize() - el.clientHeight,
    )
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

    const target = Math.max(0, Math.min(index, length - 1))
    const viewportHeight = Math.max(0, el.clientHeight - getScrollOffset())
    const itemTop = target * size
    const itemBottom = itemTop + size
    const viewTop = el.scrollTop
    const viewBottom = viewTop + viewportHeight

    let nextTop = itemTop

    if (align === 'center') {
      nextTop = itemTop - (viewportHeight - size) / 2
    }
    else if (align === 'end') {
      nextTop = itemBottom - viewportHeight
    }
    else if (align === 'auto') {
      if (itemTop >= viewTop && itemBottom <= viewBottom)
        return
      if (itemTop < viewTop)
        nextTop = itemTop
      else
        nextTop = itemBottom - viewportHeight
    }

    const maxScroll = getMaxScrollTop(el)
    el.scrollTop = Math.max(0, Math.min(nextTop, maxScroll))
    update(true)
  }

  function reset() {
    const el = containerRef.value
    if (el)
      el.scrollTop = 0
    lastScrollTop = 0
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
        scheduleUpdate(true)
      })
      resizeObserver.observe(el)
    }

    containerHeight.value = el.clientHeight
    lastScrollTop = el.scrollTop
    update(true)
  }

  watch(containerRef, el => bindContainer(el))

  watch(
    () => getList(),
    async () => {
      await nextTick()
      const el = containerRef.value
      if (el) {
        const maxScroll = getMaxScrollTop(el)
        if (el.scrollTop > maxScroll)
          el.scrollTop = maxScroll
      }
      update(true)
    },
  )

  watch(
    () => [getItemSize(), getBuffer(), getBufferScreens(), getScrollOffset()] as const,
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
