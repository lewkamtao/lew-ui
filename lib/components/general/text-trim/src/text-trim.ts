// Types
interface DisplayTextResult {
  text: string
  isEllipsis: boolean
}

interface GetDisplayTextParams {
  text: string
  reserveEnd: number
  target: HTMLElement
}

// Constants
const TOLERANCE_RATIO = 0.98
const MIN_WIDTH_DIFFERENCE = 2
const ELLIPSIS = '.....'
const MIN_VISIBLE_CHARS = 1
const WIDTH_SAFETY_MARGIN = 12
const MAX_CACHE_SIZE = 1000

// Cache for measurement results
const measureCache = new Map<string, number>()

// Shared measurement span element
let sharedMeasureSpan: HTMLSpanElement | null = null

// Utility function to measure text width
function measureText(text: string, style: CSSStyleDeclaration): number {
  // Use cache for performance
  const cacheKey = `${text}-${style.fontSize || ''}-${style.fontFamily || ''}`
  const cachedWidth = measureCache.get(cacheKey)
  if (cachedWidth !== undefined) {
    return cachedWidth
  }

  // Lazy initialization of shared measurement span
  if (!sharedMeasureSpan) {
    sharedMeasureSpan = document.createElement('span')
    sharedMeasureSpan.style.position = 'fixed'
    sharedMeasureSpan.style.visibility = 'hidden'
    sharedMeasureSpan.style.whiteSpace = 'nowrap'
    document.body.appendChild(sharedMeasureSpan)
  }

  // Apply styles and set text content
  sharedMeasureSpan.style.cssText = style.cssText
  sharedMeasureSpan.style.position = 'fixed'
  sharedMeasureSpan.style.visibility = 'hidden'
  sharedMeasureSpan.style.whiteSpace = 'nowrap'
  sharedMeasureSpan.textContent = text

  const width = sharedMeasureSpan.offsetWidth

  // Cache result with size limit
  if (measureCache.size > MAX_CACHE_SIZE) {
    const firstKey = measureCache.keys().next().value
    if (firstKey) {
      measureCache.delete(firstKey)
    }
  }
  measureCache.set(cacheKey, width)
  return width
}

/**
 * Calculate display text with ellipsis based on container width
 * @param params - Parameters for text calculation
 * @returns Object containing processed text and ellipsis state
 */
export function getDisplayText(params: GetDisplayTextParams): DisplayTextResult {
  const { text, reserveEnd = 0, target } = params
  // Early return conditions
  if (!text || !target) {
    return { text, isEllipsis: false }
  }
  if (reserveEnd >= text.length) {
    return { text, isEllipsis: false }
  }

  const normalizedReserveEnd = Math.max(0, reserveEnd)

  // Get target element styles and dimensions
  const style = window.getComputedStyle(target)
  const targetWidth = target.offsetWidth
  const toleratedWidth = targetWidth / TOLERANCE_RATIO

  // Measure full text width
  const fullWidth = measureText(text, style)

  // Check if truncation is needed
  const needsTruncation = fullWidth - targetWidth > MIN_WIDTH_DIFFERENCE
  if (!needsTruncation || normalizedReserveEnd === 0) {
    return { text, isEllipsis: false }
  }

  // Get end text
  const endText = text.slice(-normalizedReserveEnd)
  const ellipsisWithEndWidth = measureText(ELLIPSIS + endText, style)

  // If end text with ellipsis exceeds container width
  if (ellipsisWithEndWidth - targetWidth > MIN_WIDTH_DIFFERENCE) {
    // Binary search for appropriate end text length
    let left = MIN_VISIBLE_CHARS
    let right = normalizedReserveEnd
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

  // Binary search for appropriate prefix text length
  let left = 0
  let right = text.length - normalizedReserveEnd
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

  // Ensure minimum visible characters
  if (startText.length < MIN_VISIBLE_CHARS) {
    startText = text.slice(0, MIN_VISIBLE_CHARS)
  }

  return {
    text: startText + ELLIPSIS + endText,
    isEllipsis: true,
  }
}

/**
 * Clear measurement cache and cleanup resources
 */
export function clearMeasureCache(): void {
  measureCache.clear()
  if (sharedMeasureSpan && sharedMeasureSpan.parentNode) {
    sharedMeasureSpan.parentNode.removeChild(sharedMeasureSpan)
    sharedMeasureSpan = null
  }
}
