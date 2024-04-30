import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject
): void {
  onMounted(() => target.addEventListener(event, callback, true))
  onUnmounted(() => target.removeEventListener(event, callback, true))
}
