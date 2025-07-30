export function useEventListener(
  target: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject,
): void {
  onMounted(() => target.addEventListener(event, callback, true))
  onUnmounted(() => target.removeEventListener(event, callback, true))
}

export function useDOMCreate(nodeId: string): void {
  const node = document.getElementById(nodeId)
  if (node) {
    // Node already exists, do nothing
  }
  else {
    const newNode = document.createElement('div')
    newNode.id = nodeId
    document.body.appendChild(newNode)
  }
}
