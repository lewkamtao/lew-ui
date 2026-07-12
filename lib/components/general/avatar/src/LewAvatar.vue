<script setup lang="ts">
// 1. 第三方库导入
import { useImage } from '@vueuse/core'

// 2. 组件导入
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'

// 3. 工具函数导入
import { any2px } from 'lew-ui/utils'

// 4. 组件配置导入
import { avatarEmits } from './emits'
import { avatarProps } from './props'

// Props / Emits
const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)
const slots = useSlots()

function parseSize(size: string | number): number {
  if (typeof size === 'number')
    return size
  const parsed = Number.parseFloat(size)
  return Number.isFinite(parsed) ? parsed : 40
}

const normalizedSrc = computed(() => props.src?.trim() || '')

// Composables
const imageOptions = ref({
  src: normalizedSrc.value,
})

watch(
  normalizedSrc,
  (newVal: string) => {
    imageOptions.value.src = newVal
  },
  { immediate: true },
)

const { isLoading, error } = useImage(imageOptions)

watch(error, (err) => {
  if (err && normalizedSrc.value)
    emit('error', err)
})

watch(isLoading, (loading, wasLoading) => {
  if (wasLoading && !loading && !error.value && normalizedSrc.value)
    emit('load')
})

// 常量
const BORDER_RADIUS_MAP: Record<string, string> = {
  circle: '50%',
  sharp: '0',
  square: 'var(--lew-border-radius-small)',
}

// 计算属性
const sizeValue = computed(() => parseSize(props.size))

const avatarStyle = computed(() => ({
  width: any2px(props.size),
  height: any2px(props.size),
}))

const avatarBoxStyle = computed(() => ({
  borderRadius: BORDER_RADIUS_MAP[props.shape],
}))

const imageStyle = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}))

const textStyle = computed(() => {
  const size = sizeValue.value
  return {
    fontSize: `${size * 0.45}px`,
    lineHeight: `${size - 2}px`,
    textAlign: 'center' as const,
    color: 'var(--lew-color-text-2)',
    userSelect: 'none' as const,
  }
})

/** 文字头像来源：优先 name，兼容旧用法回退 alt */
const displayName = computed(() => props.name || props.alt || '')

/** 图片无障碍文案：优先 alt，回退 name */
const imageAlt = computed(() => props.alt || props.name || '')

const altText = computed(() => {
  if (!displayName.value)
    return ''
  const result = displayName.value
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
  return result.length > 2 ? result.charAt(0) : result
})

const statusDotClass = computed(() => {
  if (!props.status)
    return ''
  return `lew-avatar-status-dot lew-avatar-status-dot--${props.shape}-${props.statusPlacement} lew-avatar-status-dot--${props.status}`
})

const statusDotStyle = computed(() => {
  if (!props.status)
    return {}

  const dotSize = sizeValue.value * 0.2

  return {
    width: any2px(dotSize),
    height: any2px(dotSize),
  }
})

const iconSize = computed(() => sizeValue.value * 0.5)

const showSkeleton = computed(
  () => (Boolean(normalizedSrc.value) && isLoading.value) || props.loading,
)
const showImage = computed(
  () => normalizedSrc.value && !error.value && !showSkeleton.value,
)
const showAltText = computed(
  () => !normalizedSrc.value && displayName.value && !showSkeleton.value,
)
const showIcon = computed(
  () => !normalizedSrc.value && !displayName.value && !showSkeleton.value,
)
const showFallback = computed(
  () => Boolean(normalizedSrc.value) && Boolean(error.value) && !showSkeleton.value,
)

const accessibleLabel = computed(() => {
  if (imageAlt.value)
    return imageAlt.value
  if (props.status)
    return `avatar ${props.status}`
  return 'avatar'
})
</script>

<template>
  <div
    class="lew-avatar"
    role="img"
    :aria-label="accessibleLabel"
    :style="avatarStyle"
  >
    <div class="lew-avatar-box" :style="avatarBoxStyle">
      <slot v-if="slots.default" />
      <template v-else>
        <div v-if="showSkeleton" class="skeletons" />
        <img
          v-else-if="showImage"
          :alt="imageAlt"
          :src="normalizedSrc"
          loading="lazy"
          :style="imageStyle"
        >
        <slot v-else-if="showFallback && slots.error" name="error" />
        <div
          v-else-if="showAltText || (showFallback && displayName)"
          class="lew-avatar-text"
          :style="textStyle"
        >
          {{ altText }}
        </div>
        <slot v-else-if="(showIcon || showFallback) && slots.icon" name="icon" />
        <CommonIcon
          v-else-if="showIcon || showFallback"
          class="lew-avatar-user-icon"
          :size="iconSize"
          type="user"
        />
      </template>
    </div>
    <i
      v-if="props.status"
      :class="statusDotClass"
      :style="statusDotStyle"
      aria-hidden="true"
    />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  position: relative;
  display: inline-block;
  flex-shrink: 0;

  .lew-avatar-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: var(--lew-bgcolor-2);
    border: var(--lew-pop-border);
    border-radius: var(--lew-border-radius-small);
  }

  .lew-avatar-text {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
  }

  img {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
  }

  .lew-avatar-user-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    animation: fade-in 0.2s ease forwards;
    transform: translate(-50%, -50%);
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes lew-avatar-status-pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    70% {
      transform: scale(1.65);
      opacity: 0;
    }

    100% {
      transform: scale(1.65);
      opacity: 0;
    }
  }

  // Status dot (使用 class 而非 computed style，性能更好)
  .lew-avatar-status-dot {
    position: absolute;
    border-radius: 50%;
    z-index: 19;
    border: var(--lew-form-border-width) var(--lew-color-white) solid;
    content: '';
  }

  // Status colors (静态配置，使用 CSS class)
  .lew-avatar-status-dot--online {
    background-color: var(--lew-color-success);
  }

  .lew-avatar-status-dot--busy {
    background-color: var(--lew-color-error);
  }

  .lew-avatar-status-dot--offline {
    background-color: var(--lew-color-normal-dark);
  }

  .lew-avatar-status-dot--processing {
    background-color: var(--lew-color-info);

    &::after {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background-color: var(--lew-color-info);
      content: '';
      animation: lew-avatar-status-pulse 1.2s ease-out infinite;
    }
  }

  .lew-avatar-status-dot--away {
    background-color: var(--lew-color-warning);
  }

  // Circle shape positioning
  .lew-avatar-status-dot--circle-top-left {
    top: -0.05rem;
    left: -0.05rem;
  }

  .lew-avatar-status-dot--circle-top-right {
    top: -0.05rem;
    right: -0.05rem;
  }

  .lew-avatar-status-dot--circle-bottom-left {
    bottom: -0.05rem;
    left: -0.05rem;
  }

  .lew-avatar-status-dot--circle-bottom-right {
    bottom: -0.05rem;
    right: -0.05rem;
  }

  // Square / sharp shape positioning
  .lew-avatar-status-dot--square-top-left,
  .lew-avatar-status-dot--sharp-top-left {
    top: -0.25rem;
    left: -0.25rem;
  }

  .lew-avatar-status-dot--square-top-right,
  .lew-avatar-status-dot--sharp-top-right {
    top: -0.25rem;
    right: -0.25rem;
  }

  .lew-avatar-status-dot--square-bottom-left,
  .lew-avatar-status-dot--sharp-bottom-left {
    bottom: -0.25rem;
    left: -0.25rem;
  }

  .lew-avatar-status-dot--square-bottom-right,
  .lew-avatar-status-dot--sharp-bottom-right {
    bottom: -0.25rem;
    right: -0.25rem;
  }
}
</style>
