<script setup lang="ts">
import type { CSSProperties } from 'vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { useEventListener } from 'lew-ui/hooks'
import { throttle } from 'lodash-es'
import { backTopEmits } from './emits'
import { backTopProps } from './props'

const props = defineProps(backTopProps)
const _emit = defineEmits(backTopEmits)

const dom = shallowRef<HTMLElement>()
const showBackTop = ref(false)

const backTopStyle = computed(
  (): CSSProperties => ({
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
  }),
)

function handleScroll(): void {
  if (!dom.value)
    return

  const shouldShow = dom.value.scrollTop >= props.valveHeight

  if (shouldShow !== showBackTop.value) {
    showBackTop.value = shouldShow
  }
}

function scrollToTop(): void {
  if (!dom.value)
    return

  const scrollElement = dom.value
  const startPosition = scrollElement.scrollTop
  const duration = 300
  const startTime = performance.now()

  function animate(currentTime: number): void {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const easeInOutCubic
      = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - (-2 * progress + 2) ** 3 / 2

    scrollElement.scrollTop = startPosition * (1 - easeInOutCubic)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function handleClick(): void {
  scrollToTop()
}

const throttledScrollHandler = throttle(handleScroll, 100)

useEventListener(window, 'scroll', throttledScrollHandler)

onMounted(() => {
  dom.value = document.documentElement

  if (props.target) {
    const targetElement = document.querySelector<HTMLElement>(`.${props.target}`)
    if (targetElement) {
      dom.value = targetElement
    }
    else {
      console.warn(
        `[LewBackTop] Target element not found: "${props.target}". Using document.documentElement as fallback.`,
      )
    }
  }
  handleScroll()
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="showBackTop"
      class="lew-back-top"
      :style="backTopStyle"
      @click="handleClick"
    >
      <slot>
        <CommonIcon :size="20" type="chevron-up" />
      </slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.lew-back-top {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--lew-bgcolor-0);
  box-shadow: var(--lew-box-shadow);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--lew-color-primary);
  transition: var(--lew-form-transition-bezier);

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: var(--lew-form-transition-bezier);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
