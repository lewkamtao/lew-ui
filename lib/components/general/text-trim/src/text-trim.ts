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

interface FontStyle {
  font: string
  letterSpacing: number
}

// Constants
const TOLERANCE_RATIO = 0.98
const MIN_WIDTH_DIFFERENCE = 2
const ELLIPSIS = '.....'
const MIN_VISIBLE_CHARS = 1
const WIDTH_SAFETY_MARGIN = 12
const MAX_CACHE_SIZE = 500

// Cache for measurement results
const measureCache = new Map<string, number>()

// Shared canvas context for text measurement (faster than DOM)
let canvasContext: CanvasRenderingContext2D | null = null

// Get or create canvas context
function getCanvasContext(): CanvasRenderingContext2D {
  if (!canvasContext) {
    const canvas = document.createElement('canvas')
    canvasContext = canvas.getContext('2d')!
  }
  return canvasContext
}

// Extract font style from computed style
function extractFontStyle(style: CSSStyleDeclaration): FontStyle {
  const fontWeight = style.fontWeight || 'normal'
  const fontSize = style.fontSize || '14px'
  const fontFamily = style.fontFamily || 'sans-serif'
  const letterSpacing = Number.parseFloat(style.letterSpacing) || 0

  return {
    font: `${fontWeight} ${fontSize} ${fontFamily}`,
    letterSpacing,
  }
}

// Utility function to measure text width using Canvas API
function measureText(text: string, fontStyle: FontStyle): number {
  if (!text)
    return 0

  // Generate cache key
  const cacheKey = `${text}|${fontStyle.font}|${fontStyle.letterSpacing}`
  const cachedWidth = measureCache.get(cacheKey)
  if (cachedWidth !== undefined) {
    return cachedWidth
  }

  const ctx = getCanvasContext()
  ctx.font = fontStyle.font

  // Measure base width
  let width = ctx.measureText(text).width

  // Add letter spacing
  if (fontStyle.letterSpacing !== 0) {
    width += fontStyle.letterSpacing * (text.length - 1)
  }

  // Cache result with LRU eviction
  if (measureCache.size >= MAX_CACHE_SIZE) {
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
    return { text: text || '', isEllipsis: false }
  }

  const textLength = text.length
  if (reserveEnd >= textLength) {
    return { text, isEllipsis: false }
  }

  const normalizedReserveEnd = Math.max(0, reserveEnd)

  // Get target element styles and dimensions (cache style extraction)
  const style = window.getComputedStyle(target)
  const fontStyle = extractFontStyle(style)
  const targetWidth = target.offsetWidth
  const toleratedWidth = targetWidth / TOLERANCE_RATIO

  // Measure full text width
  const fullWidth = measureText(text, fontStyle)

  // Check if truncation is needed
  const needsTruncation = fullWidth - targetWidth > MIN_WIDTH_DIFFERENCE
  if (!needsTruncation || normalizedReserveEnd === 0) {
    return { text, isEllipsis: false }
  }

  // Pre-calculate ellipsis width for reuse
  const ellipsisWidth = measureText(ELLIPSIS, fontStyle)

  // Get end text
  const endText = text.slice(-normalizedReserveEnd)
  const endTextWidth = measureText(endText, fontStyle)
  const ellipsisWithEndWidth = ellipsisWidth + endTextWidth

  // If end text with ellipsis exceeds container width
  if (ellipsisWithEndWidth - targetWidth > MIN_WIDTH_DIFFERENCE) {
    // Binary search for appropriate end text length
    let left = MIN_VISIBLE_CHARS
    let right = normalizedReserveEnd
    let finalEndText = ''

    while (left <= right) {
      const mid = (left + right) >>> 1 // Faster than Math.floor
      const tempEndText = text.slice(-mid)
      const tempWidth = ellipsisWidth + measureText(tempEndText, fontStyle)

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

  // Pre-calculate suffix width (ellipsis + endText)
  const suffixWidth = ellipsisWithEndWidth

  // Binary search for appropriate prefix text length
  let left = 0
  let right = textLength - normalizedReserveEnd
  let startText = ''

  while (left <= right) {
    const mid = (left + right) >>> 1 // Faster than Math.floor
    const tempText = text.slice(0, mid)
    const tempWidth = measureText(tempText, fontStyle) + suffixWidth

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
 * Clear measurement cache
 */
export function clearMeasureCache(): void {
  measureCache.clear()
}
