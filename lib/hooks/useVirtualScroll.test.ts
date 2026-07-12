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

    const startBefore = visibleItems.value[0]?.index
    const endBefore = visibleItems.value.at(-1)?.index
    el.scrollTop = 10
    update()
    expect(visibleItems.value[0]?.index).toBe(startBefore)
    expect(visibleItems.value.at(-1)?.index).toBe(endBefore)

    el.scrollTop = 80
    update()
    expect(offsetY.value).toBe(visibleItems.value[0]!.index * 20)
    expect(visibleItems.value[0]!.index).toBeGreaterThan(0)

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
})
