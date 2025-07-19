<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { avatarProps } from './props'

const props = defineProps(avatarProps)

const avatarBoxStyleObject = computed(() => {
  const { shape } = props

  const borderRadiusMap = {
    circle: '50%',
    sharp: '0',
    square: 'var(--lew-border-radius-small)',
  }

  return {
    borderRadius: borderRadiusMap[shape],
  }
})

const avatarStyleObject = computed(() => {
  return {
    width: any2px(props.size),
    height: any2px(props.size),
  }
})

const imageStyleObject = computed(() => {
  return {
    objectFit: props.objectFit,
    objectPosition: props.objectPosition,
  }
})

const textStyleObject = computed(() => {
  const size
    = typeof props.size === 'number' ? props.size : Number.parseInt(props.size)
  return {
    fontSize: `${size * 0.45}px`,
    lineHeight: `${size}px`,
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

// 状态点位置配置
const STATUS_PLACEMENT_CONFIG_CIRCLE = {
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

const STATUS_PLACEMENT_CONFIG_SQUARE = {
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

// 状态点颜色配置
const STATUS_COLOR_CONFIG = {
  online: 'var(--lew-color-success)',
  busy: 'var(--lew-color-error)',
  offline: 'var(--lew-color-normal-dark)',
  processing: 'var(--lew-color-info)',
  away: 'var(--lew-color-warning)',
}

const dotStyleObject: any = computed(() => {
  const { status, statusPlacement, size } = props
  const STATUS_PLACEMENT_CONFIG
    = props.shape === 'circle'
      ? STATUS_PLACEMENT_CONFIG_CIRCLE
      : STATUS_PLACEMENT_CONFIG_SQUARE

  return {
    ...STATUS_PLACEMENT_CONFIG[statusPlacement],
    backgroundColor: status ? STATUS_COLOR_CONFIG[status] : '',
    position: 'absolute',
    content: '',
    width: any2px(Number(size) * 0.2),
    height: any2px(Number(size) * 0.2),
    borderRadius: '50%',
    zIndex: 19,
    border: 'var(--lew-form-border-width) var(--lew-color-white) solid',
  }
})

// 修复响应性问题：直接使用 useImage 返回的响应式引用
const { isLoading, error } = useImage({ src: props.src })

const getIconSize = computed(() => {
  const { size } = props
  return typeof size === 'number' ? size * 0.5 : Number.parseInt(size) * 0.5
})
</script>

<template>
  <div class="lew-avatar" :style="avatarStyleObject">
    <div class="lew-avatar-box" :style="avatarBoxStyleObject">
      <template v-if="src">
        <div v-if="isLoading || loading" class="skeleton" />
        <img
          v-else-if="!error"
          :src="src"
          :alt="alt"
          lazy
          :style="imageStyleObject"
        >
        <div v-else-if="alt" class="lew-avatar-text" :style="textStyleObject">
          {{ altText }}
        </div>
        <Icon v-else :size="getIconSize" type="user" />
      </template>
      <template v-else-if="alt">
        <div class="lew-avatar-text" :style="textStyleObject">
          {{ altText }}
        </div>
      </template>
      <template v-else>
        <Icon :size="getIconSize" type="user" />
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
    background-color: var(--lew-bgcolor-2);
  }

  .lew-avatar-text {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
  }

  // 添加 skeleton 样式
  .skeleton {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      var(--lew-bgcolor-3) 25%,
      var(--lew-bgcolor-2) 50%,
      var(--lew-bgcolor-3) 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  img {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    animation: img-enter 0.25s ease;
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
