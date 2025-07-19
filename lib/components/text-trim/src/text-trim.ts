// 缓存计算结果
const measureCache = new Map<string, number>()

// 创建一个共享的测量用 span 元素
let sharedMeasureSpan: HTMLSpanElement | null = null

// 测量文本宽度的工具函数
function measureText(text: string, style: CSSStyleDeclaration): number {
  // 使用缓存
  const cacheKey = `${text}-${style.fontSize || ''}-${style.fontFamily || ''}`
  if (measureCache.has(cacheKey)) {
    return measureCache.get(cacheKey)!
  }
  // 懒加载创建共享的测量 span
  if (!sharedMeasureSpan) {
    sharedMeasureSpan = document.createElement('span')
    sharedMeasureSpan.style.position = 'fixed'
    sharedMeasureSpan.style.visibility = 'hidden'
    sharedMeasureSpan.style.whiteSpace = 'nowrap'
    document.body.appendChild(sharedMeasureSpan)
  }

  // 设置样式和文本
  sharedMeasureSpan.style.cssText = style.cssText
  sharedMeasureSpan.style.position = 'fixed'
  sharedMeasureSpan.style.visibility = 'hidden'
  sharedMeasureSpan.style.whiteSpace = 'nowrap'
  sharedMeasureSpan.textContent = text

  const width = sharedMeasureSpan.offsetWidth

  // 缓存结果（限制缓存大小）
  if (measureCache.size > 1000) {
    const firstKey: any = measureCache.keys().next().value
    measureCache.delete(firstKey)
  }
  measureCache.set(cacheKey, width)
  return width
}

// 配置参数
const TOLERANCE_RATIO = 0.98 // 容忍度
const MIN_WIDTH_DIFFERENCE = 2 // 最小宽度差
const ELLIPSIS = '.....' // 省略号
const MIN_VISIBLE_CHARS = 1 // 最小可见字符数
const WIDTH_SAFETY_MARGIN = 12 // 宽度安全边距

export function getDisplayText({
  text,
  reserveEnd = 0,
  target,
}: {
  text: string
  reserveEnd: number
  target: HTMLElement
}) {
  // 快速返回条件
  if (!text || !target)
    return { text, isEllipsis: false }
  if (reserveEnd >= text.length)
    return { text, isEllipsis: false }
  if (reserveEnd < 0)
    reserveEnd = 0

  // 获取目标元素的样式
  const style = window.getComputedStyle(target)
  const targetWidth = target.offsetWidth
  const toleratedWidth = targetWidth / TOLERANCE_RATIO

  // 测量完整文本宽度
  const fullWidth = measureText(text, style)

  // 检查是否需要截断
  const isEllipsis = fullWidth - targetWidth > MIN_WIDTH_DIFFERENCE
  if (!isEllipsis || reserveEnd === 0) {
    return { text, isEllipsis: false }
  }

  // 获取末尾文本
  const endText = text.slice(-reserveEnd)
  const ellipsisWithEndWidth = measureText(ELLIPSIS + endText, style)

  // 如果末尾文本加省略号已经超出容器宽度
  if (ellipsisWithEndWidth - targetWidth > MIN_WIDTH_DIFFERENCE) {
    // 二分查找合适的末尾文本长度
    let left = MIN_VISIBLE_CHARS
    let right = reserveEnd
    let finalEndText = ''

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const tempEndText = text.slice(-mid)
      const tempWidth = measureText(ELLIPSIS + tempEndText, style)

      if (tempWidth <= toleratedWidth + WIDTH_SAFETY_MARGIN) {
        finalEndText = tempEndText
        left = mid + 1
      }
      else {
        right = mid - 1
      }
    }

    return {
      text: finalEndText ? ELLIPSIS + finalEndText : ELLIPSIS,
      isEllipsis: true,
    }
  }

  // 二分查找前缀文本的合适长度
  let left = 0
  let right = text.length - reserveEnd
  let startText = ''

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const tempText = text.slice(0, mid)
    const tempWidth = measureText(tempText + ELLIPSIS + endText, style)

    if (tempWidth + WIDTH_SAFETY_MARGIN <= toleratedWidth) {
      startText = tempText
      left = mid + 1
    }
    else {
      right = mid - 1
    }
  }

  // 确保至少显示最小字符数
  if (startText.length < MIN_VISIBLE_CHARS) {
    startText = text.slice(0, MIN_VISIBLE_CHARS)
  }

  return {
    text: startText + ELLIPSIS + endText,
    isEllipsis: true,
  }
}

// 清理缓存的工具函数
export function clearMeasureCache() {
  measureCache.clear()
  if (sharedMeasureSpan) {
    document.body.removeChild(sharedMeasureSpan)
    sharedMeasureSpan = null
  }
}
