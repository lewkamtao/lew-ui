import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { useVirtualScroll } from './useVirtualScroll'

function createContainer(height = 200) {
  const el = document.createElement('div')
  Object.defineProperty(el, 'clientHeight', { value: height, configurable: true })
  Object.defineProperty(el, 'scrollHeight', {
    get() {
      return Number(el.dataset.scrollHeight || height)
    },
    configurable: true,
  })
  el.scrollTop = 0
  document.body.appendChild(el)
  return el
}

describe('useVirtualScroll', () => {
  it('只渲染视口内 + buffer 的项', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
    const { containerRef, visibleItems, totalHeight, update } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 2,
    })

    const el = createContainer(100)
    containerRef.value = el
    await nextTick()
    update()

    // 100 / 20 = 5 可见 + 上下各 2 buffer => 最多 9
    expect(totalHeight.value).toBe(2000)
    expect(visibleItems.value.length).toBeLessThanOrEqual(9)
    expect(visibleItems.value[0]?.index).toBe(0)
    expect(visibleItems.value.at(-1)?.index).toBeLessThanOrEqual(8)

    el.remove()
  })

  it('滚动后更新可见窗口，同窗口内索引保持不变', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
    const { containerRef, visibleItems, offsetY, update } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 1,
    })

    const el = createContainer(100)
    containerRef.value = el
    await nextTick()
    update()

    const windowBefore = visibleItems.value
    const startBefore = visibleItems.value[0]?.index
    const endBefore = visibleItems.value.at(-1)?.index
    el.scrollTop = 10
    update()
    expect(visibleItems.value).toBe(windowBefore)
    expect(visibleItems.value[0]?.index).toBe(startBefore)
    expect(visibleItems.value.at(-1)?.index).toBe(endBefore)

    el.scrollTop = 80
    update()
    expect(offsetY.value).toBe(visibleItems.value[0]!.index * 20)
    expect(visibleItems.value[0]!.index).toBeGreaterThan(0)

    el.remove()
  })

  it('scrollOffset 只扣除 sticky 表头占用的视口高度，并能渲染到列表末尾', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
    const { containerRef, visibleItems, offsetY, update } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 1,
      scrollOffset: 40,
    })

    const el = createContainer(200)
    containerRef.value = el
    await nextTick()
    update()

    expect(visibleItems.value[0]?.index).toBe(0)

    // 小幅滚动仍被首屏缓冲区覆盖
    el.scrollTop = 35
    update()
    expect(visibleItems.value[0]?.index).toBe(0)
    expect(offsetY.value).toBe(0)

    // sticky 表头只占用视口，不应再从 scrollTop 中重复扣除
    el.scrollTop = 40 + 40
    update()
    expect(visibleItems.value[0]?.index).toBe(3)
    expect(offsetY.value).toBe(60)

    // 内容总高度 2000 + 表头 40 - 容器 200 = 最大 scrollTop 1840
    el.scrollTop = 1840
    update()
    expect(visibleItems.value.at(-1)?.index).toBe(99)

    el.remove()
  })

  it('快速跳跃滚动时同步切换渲染窗口，不额外等待一帧', async () => {
    const requestFrame = vi.fn(() => 1)
    vi.stubGlobal('requestAnimationFrame', requestFrame)

    const list = ref(Array.from({ length: 1000 }, (_, i) => ({ id: i })))
    const { containerRef, visibleItems } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 2,
      bufferScreens: 1,
    })

    const el = createContainer(100)
    containerRef.value = el
    await nextTick()

    el.scrollTop = 1000
    el.dispatchEvent(new Event('scroll'))

    expect(requestFrame).not.toHaveBeenCalled()
    expect(visibleItems.value[0]!.index).toBeLessThanOrEqual(50)
    expect(visibleItems.value.at(-1)!.index).toBeGreaterThanOrEqual(54)

    el.remove()
    vi.unstubAllGlobals()
  })

  it('bufferScreens 会按一屏数据计算基础缓冲', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
    const { containerRef, visibleItems, update } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 1,
      bufferScreens: 1,
    })

    const el = createContainer(100)
    containerRef.value = el
    await nextTick()
    update()

    // 5 行视口 + 上下各 5 行缓冲
    expect(visibleItems.value).toHaveLength(15)

    el.remove()
  })

  it('scrollToIndex / reset 能定位滚动位置', async () => {
    vi.stubGlobal(
      'requestAnimationFrame',
      (cb: FrameRequestCallback) => {
        cb(0)
        return 1
      },
    )

    const list = ref(Array.from({ length: 50 }, (_, i) => ({ id: i })))
    const { containerRef, scrollToIndex, reset, update } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 1,
    })

    const el = createContainer(100)
    Object.defineProperty(el, 'scrollHeight', { value: 1000, configurable: true })
    containerRef.value = el
    await nextTick()
    update()

    scrollToIndex(20, 'start')
    expect(el.scrollTop).toBe(400)

    reset()
    expect(el.scrollTop).toBe(0)

    el.remove()
    vi.unstubAllGlobals()
  })

  it('scrollToIndex 在 sticky 表头下按真实内容坐标定位', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i })))
    const { containerRef, scrollToIndex } = useVirtualScroll(list, {
      itemSize: 20,
      buffer: 1,
      scrollOffset: 40,
    })

    const el = createContainer(200)
    containerRef.value = el
    await nextTick()

    scrollToIndex(20, 'start')
    expect(el.scrollTop).toBe(400)

    scrollToIndex(20, 'center')
    expect(el.scrollTop).toBe(330)

    scrollToIndex(20, 'end')
    expect(el.scrollTop).toBe(260)

    el.remove()
  })
})
