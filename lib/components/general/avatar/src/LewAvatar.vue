<script setup lang="ts">
import { useImage } from '@vueuse/core'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, parseDimension } from 'lew-ui/utils'
import { computed } from 'vue'
import { avatarProps } from './props'

const props = defineProps(avatarProps)

const emit = defineEmits<{
  load: []
  error: []
}>()

// Constants
const BORDER_RADIUS_MAP: Record<string, string> = {
  circle: '50%',
  sharp: '0',
  square: 'var(--lew-border-radius-small)',
}

const STATUS_PLACEMENT_CONFIG_CIRCLE: Record<string, Record<string, string>> = {
  'top-left': {
    top: '-0.05rem',
    left: '-0.05rem',
    bottom: 'auto',
    right: 'auto',
  },
  'top-right': {
    top: '-0.05rem',
    left: 'auto',
    bottom: 'auto',
    right: '-0.05rem',
  },
  'bottom-left': {
    top: 'auto',
    left: '-0.05rem',
    bottom: '-0.05rem',
    right: 'auto',
  },
  'bottom-right': {
    top: 'auto',
    left: 'auto',
    bottom: '-0.05rem',
    right: '-0.05rem',
  },
}

const STATUS_PLACEMENT_CONFIG_SQUARE: Record<string, Record<string, string>> = {
  'top-left': {
    top: '-0.25rem',
    left: '-0.25rem',
    bottom: 'auto',
    right: 'auto',
  },
  'top-right': {
    top: '-0.25rem',
    left: 'auto',
    bottom: 'auto',
    right: '-0.25rem',
  },
  'bottom-left': {
    top: 'auto',
    left: '-0.25rem',
    bottom: '-0.25rem',
    right: 'auto',
  },
  'bottom-right': {
    top: 'auto',
    left: 'auto',
    bottom: '-0.25rem',
    right: '-0.25rem',
  },
}

const STATUS_COLOR_CONFIG: Record<string, string> = {
  online: 'var(--lew-color-success)',
  busy: 'var(--lew-color-error)',
  offline: 'var(--lew-color-normal-dark)',
  processing: 'var(--lew-color-info)',
  away: 'var(--lew-color-warning)',
}

// Image handling
const { isLoading, error } = useImage({
  src: props.src,
  onLoaded: () => emit('load'),
  onError: () => emit('error'),
})

// Image loading watch is handled by useImage hook

// Computed
const avatarStyleObject = computed(() => ({
  width: any2px(props.size),
  height: any2px(props.size),
}))

const avatarBoxStyleObject = computed(() => ({
  borderRadius: BORDER_RADIUS_MAP[props.shape],
}))

const imageStyleObject = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}))

const textStyleObject = computed(() => {
  const size = typeof props.size === 'number' ? props.size : Number.parseInt(props.size)
  return {
    fontSize: `${size * 0.45}px`,
    lineHeight: `${size - 2}px`,
    textAlign: 'center' as const,
    color: 'var(--lew-color-text-2)',
    userSelect: 'none' as const,
  }
})

const altText = computed(() => {
  if (!props.alt)
    return ''
  const result = props.alt
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
  return result.length > 2 ? result.charAt(0) : result
})

const dotStyleObject = computed(() => {
  const { status, statusPlacement, shape, size } = props
  if (!status)
    return {}
  const statusPlacementConfig
    = shape === 'circle' ? STATUS_PLACEMENT_CONFIG_CIRCLE : STATUS_PLACEMENT_CONFIG_SQUARE
  return {
    ...statusPlacementConfig[statusPlacement],
    backgroundColor: STATUS_COLOR_CONFIG[status],
    position: 'absolute',
    content: '',
    width: any2px(parseDimension(size) * 0.2),
    height: any2px(parseDimension(size) * 0.2),
    borderRadius: '50%',
    zIndex: 19,
    border: 'var(--lew-form-border-width) var(--lew-color-white) solid',
  }
})

const getIconSize = computed(() => {
  const { size } = props
  return typeof size === 'number' ? size * 0.5 : Number.parseInt(size) * 0.5
})
</script>

<template>
  <div class="lew-avatar" :style="avatarStyleObject">
    <div class="lew-avatar-box" :style="avatarBoxStyleObject">
      <template v-if="src">
        <div v-if="isLoading || loading" class="skeletons" />
        <img v-else-if="!error" :alt="alt" :src="src" lazy :style="imageStyleObject">
        <div v-else-if="alt" class="lew-avatar-text" :style="textStyleObject">
          {{ altText }}
        </div>
        <CommonIcon v-else class="lew-avatar-user-icon" :size="getIconSize" type="user" />
      </template>
      <template v-else-if="alt">
        <div class="lew-avatar-text" :style="textStyleObject">
          {{ altText }}
        </div>
      </template>
      <template v-else>
        <CommonIcon class="lew-avatar-user-icon" :size="getIconSize" type="user" />
      </template>
    </div>
    <i v-if="status" :style="dotStyleObject" />
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  position: relative;
  display: inline-block;
  flex-shrink: 0;

  .lew-avatar-box {
    width: 100%;
    height: 100%;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
    background-color: var(--lew-bgcolor-2);
    border: var(--lew-pop-border);
    box-sizing: border-box;
  }

  .lew-avatar-text {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    animation: img-enter 0.1s ease;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  img {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    animation: img-enter 0.1s ease;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  .lew-avatar-user-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: img-enter 0.1s ease;
    animation-fill-mode: forwards;
    opacity: 0;
  }

  @keyframes img-enter {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
