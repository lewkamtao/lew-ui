<script setup lang="ts">
import { useImage } from '@vueuse/core'
import { any2px } from 'lew-ui/utils'
import { avatarProps } from './props'

const props = defineProps(avatarProps)
const errorSrc =
  'data:image/png;base64,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'

const avatarBoxStyleObject = computed(() => {
  const { shape } = props
  return {
    borderRadius: shape === 'circle' ? '50%' : '0px'
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

// 状态点位置配置
const STATUS_PLACEMENT_CONFIG = {
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
      <div class="skeletons" v-if="_loading || loading || !src"></div>
      <img
        v-else-if="_error"
        :src="errorSrc"
        alt=""
        srcset=""
        :style="imageStyleObject"
      />
      <img
        v-else-if="src"
        :src="src"
        :alt="alt"
        lazy
        :style="imageStyleObject"
      />
    </div>
    <i v-if="status" :style="dotStyleObject"> </i>
  </div>
</template>

<style lang="scss" scoped>
.lew-avatar {
  position: relative;
  display: inline-block;

  .lew-avatar-box {
    width: 100%;
    height: 100%;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
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
