export function dragmove({
  el,
  parentEl,
  direction = 'both',
  callback,
  max,
  min,
  step = () => 1,
  trackMax,
  trackMin,
}: {
  el: HTMLElement
  parentEl: HTMLElement
  direction?: 'horizontal' | 'vertical' | 'both'
  callback?: (position: {
    x: number
    y: number
    percentX: number
    percentY: number
  }) => void
  max: () => number
  min: () => number
  step?: () => number
  trackMax: () => number
  trackMin: () => number
}) {
  let isDragging = false
  let startX: number, startY: number
  let parentRect: DOMRect

  const getClampedValues = () => {
    const clampedMinValue = Math.max(min(), trackMin())
    const clampedMaxValue = Math.min(max(), trackMax())
    return { clampedMinValue, clampedMaxValue }
  }

  const snapToGrid = (value: number, gridSize: number) => {
    return Math.round(value / gridSize) * gridSize
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging)
      return

    let newX = e.clientX - startX
    let newY = e.clientY - startY
    const { clampedMinValue, clampedMaxValue } = getClampedValues()

    if (direction === 'horizontal' || direction === 'both') {
      const trackWidth = parentRect.width
      const minX
        = ((clampedMinValue - trackMin()) / (trackMax() - trackMin()))
          * trackWidth
      const maxX
        = ((clampedMaxValue - trackMin()) / (trackMax() - trackMin()))
          * trackWidth
      newX = Math.max(minX, Math.min(newX, maxX))
      const stepSize = trackWidth / ((trackMax() - trackMin()) / step())
      newX = snapToGrid(newX, stepSize)
      el.style.left = `${newX}px`
    }

    if (direction === 'vertical' || direction === 'both') {
      const trackHeight = parentRect.height
      const minY
        = ((clampedMinValue - trackMin()) / (trackMax() - trackMin()))
          * trackHeight
      const maxY
        = ((clampedMaxValue - trackMin()) / (trackMax() - trackMin()))
          * trackHeight
      newY = Math.max(minY, Math.min(newY, maxY))
      const stepSize = trackHeight / ((trackMax() - trackMin()) / step())
      newY = snapToGrid(newY, stepSize)
      el.style.top = `${newY}px`
    }

    if (callback) {
      callback({
        x: Number(newX.toFixed(2)),
        y: Number(newY.toFixed(2)),
        percentX: Number((newX / parentRect.width).toFixed(2)),
        percentY: Number((newY / parentRect.height).toFixed(2)),
      })
    }
  }

  const onMouseUp = () => {
    isDragging = false
    document.body.style.userSelect = 'auto'
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  const onMouseDown = (e: MouseEvent) => {
    isDragging = true
    startX = e.clientX - el.offsetLeft
    startY = e.clientY - el.offsetTop

    parentRect = parentEl.getBoundingClientRect()
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  el.addEventListener('mousedown', onMouseDown)

  return () => {
    el.removeEventListener('mousedown', onMouseDown)
  }
}
