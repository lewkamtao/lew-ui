<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { avatarProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'
const props = defineProps(avatarProps)
const errorSrc =
  'https://cdn.jsdelivr.net/gh/lewkamtao/LewCloud@master/lew/860c86003d44981cd2c120d3440774e_6hkjkl_.jpeg'

const avatarBoxStyleObject = computed(() => {
  const { shape } = props
  return {
    borderRadius: shape === 'circle' ? '50%' : 'var(--lew-border-radius-small)'
  }
})

const avatarStyleObject = computed(() => {
  return {
    width: any2px(props.size),
    height: any2px(props.size)
  }
})

const imageStyleObject = computed(() => {
  return {
    objectFit: props.objectFit,
    objectPosition: props.objectPosition
  }
})

const textStyleObject = computed(() => {
  const size =
    typeof props.size === 'number' ? props.size : parseInt(props.size)
  return {
    fontSize: `${size * 0.45}px`,
    lineHeight: `${size}px`,
    textAlign: 'center' as const,
    color: 'var(--lew-color-text-2)',
    userSelect: 'none' as const
  }
})

const altText = computed(() => {
  if (!props.alt) return ''
  return props.alt
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
})

// 状态点位置配置
const STATUS_PLACEMENT_CONFIG_CIRCLE = {
  'top-left': {
    top: '-0.05rem',
    left: '-0.05rem',
    bottom: 'auto',
    right: 'auto'
  },
  'top-right': {
    top: '-0.05rem',
    left: 'auto',
    bottom: 'auto',
    right: '-0.05rem'
  },
  'bottom-left': {
    top: 'auto',
    left: '-0.05rem',
    bottom: '-0.05rem',
    right: 'auto'
  },
  'bottom-right': {
    top: 'auto',
    left: 'auto',
    bottom: '-0.05rem',
    right: '-0.05rem'
  }
}

const STATUS_PLACEMENT_CONFIG_SQUARE = {
  'top-left': {
    top: '-0.25rem',
    left: '-0.25rem',
    bottom: 'auto',
    right: 'auto'
  },
  'top-right': {
    top: '-0.25rem',
    left: 'auto',
    bottom: 'auto',
    right: '-0.25rem'
  },
  'bottom-left': {
    top: 'auto',
    left: '-0.25rem',
    bottom: '-0.25rem',
    right: 'auto'
  },
  'bottom-right': {
    top: 'auto',
    left: 'auto',
    bottom: '-0.25rem',
    right: '-0.25rem'
  }
}

// 状态点颜色配置
const STATUS_COLOR_CONFIG = {
  online: 'var(--lew-color-success)',
  busy: 'var(--lew-color-error)',
  offline: 'var(--lew-color-normal-dark)',
  processing: 'var(--lew-color-info)',
  away: 'var(--lew-color-warning)'
}

const dotStyleObject: any = computed(() => {
  const { status, statusPlacement } = props
  const STATUS_PLACEMENT_CONFIG =
    props.shape === 'circle'
      ? STATUS_PLACEMENT_CONFIG_CIRCLE
      : STATUS_PLACEMENT_CONFIG_SQUARE

  return {
    ...(STATUS_PLACEMENT_CONFIG[statusPlacement] || {}),
    backgroundColor: status ? STATUS_COLOR_CONFIG[status] : '',
    position: 'absolute',
    content: '',
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: '50%',
    zIndex: 9,
    border: 'var(--lew-form-border-width) var(--lew-color-white) solid'
  }
})

let _loading = ref()
let _error = ref()

const init = () => {
  const { isLoading, error } = useImage({
    src: props.src as string
  })
  _loading = isLoading
  _error = error
}

const getIconSize = computed(() => {
  const { size } = props
  return typeof size === 'number' ? size * 0.5 : parseInt(size) * 0.5
})

init()

watch(
  () => props.src,
  () => {
    const { isLoading, error } = useImage({
      src: props.src as string
    })
    _loading = isLoading
    _error = error
  }
)
</script>

<template>
  <div class="lew-avatar" :style="avatarStyleObject">
    <div class="lew-avatar-box" :style="avatarBoxStyleObject">
      <template v-if="alt && (!src || _error)">
        <div class="lew-avatar-text" :style="textStyleObject">
          {{ altText }}
        </div>
      </template>
      <template v-else>
        <div class="skeletons" v-if="_loading || loading"></div>
        <Icon v-else-if="_error || !src" :size="getIconSize" type="user" />
        <img
          v-else-if="src"
          :src="src"
          :alt="alt"
          lazy
          :style="imageStyleObject"
        />
      </template>
    </div>
    <i v-if="status" :style="dotStyleObject"> </i>
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

  img {
    width: 100%;
    height: 100%;
    background-color: var(--lew-bgcolor-2);
    border-radius: var(--lew-border-radius-small);
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
