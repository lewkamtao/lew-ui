<script lang="ts" setup>
import { rateProps } from './props'
import { any2px, object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'
import { LewTooltip } from 'lew-ui'
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const props = defineProps(rateProps)
const modelValue: Ref<number | undefined> = defineModel()
const tobeValue = ref(modelValue.value)
const iconRef: any = ref<Element[]>([])

const handleMouseMove = (e: MouseEvent, index: number) => {
  if (props.disabled || props.readonly) return
  tobeValue.value = index
}

const handleMouseLeave = () => {
  if (props.disabled || props.readonly) return
  tobeValue.value = modelValue.value
}

const handleClick = async (index: number) => {
  if (props.disabled || props.readonly) return

  modelValue.value = index

  // 创建动画效果
  const selectedIcons = iconRef.value.slice(0, index)
  selectedIcons.forEach((icon: any, index: number) => {
    setTimeout(() => {
      // 放大动画
      icon.style.transform = 'scale(1.25)'
      setTimeout(() => {
        // 缩小动画
        icon.style.transform = 'scale(1)'
      }, 100)
    }, index * 50) // 每个图标错开30ms开始动画
  })
}

const getRateClass = computed(() => {
  const { disabled, readonly } = props
  return object2class('lew-rate', {
    disabled,
    readonly
  })
})

const getRateIconStyle = computed(() => {
  const { size } = props
  const sizeMap = {
    small: 24,
    medium: 30,
    large: 34
  }
  return {
    width: any2px(sizeMap[size]),
    height: any2px(sizeMap[size])
  }
})

const getRateIconSize = computed(() => {
  const { size } = props
  const sizeMap = {
    small: 24,
    medium: 30,
    large: 34
  }
  return sizeMap[size]
})

watch(
  () => modelValue.value,
  (v) => {
    tobeValue.value = v
  }
)

const getCount = computed(() => {
  // 最大十个 最小三个
  const count = Number(props.count)
  if (count > 10) return 10
  if (count < 3) return 3
  return count
})

const getTips = computed(() => (index: number) => {
  const tips = props.tips
  if (Array.isArray(tips)) {
    return tips[index - 1]
  } else if (typeof tips === 'string') {
    return tips.split(',')[index - 1]
  }
})
</script>
<template>
  <lew-flex :gap="5" x="start" class="lew-rate" :class="getRateClass">
    <div
      v-for="i in getCount"
      :key="i"
      :ref="(el) => (iconRef[i - 1] = el)"
      @mousemove="handleMouseMove($event, i)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(i)"
      :style="getRateIconStyle"
      class="lew-rate-icon"
    >
      <icon
        v-tooltip="{
          content: getTips(i),
          trigger: 'hover'
        }"
        class="lew-rate-star"
        :style="{
          fill:
            Number(tobeValue) >= i
              ? 'var(--lew-color-yellow)'
              : 'var(--lew-text-color-9)'
        }"
        type="star"
        :strokeWidth="0"
        :size="getRateIconSize"
      />
    </div>
  </lew-flex>
</template>

<style lang="scss" scoped>
.lew-rate-icon {
  position: relative;
  transition: all var(--lew-form-transition-ease);
  cursor: pointer;
  .lew-rate-star {
    position: absolute;
    transition: all var(--lew-form-transition-ease);
  }
}
.lew-rate-star:hover {
  transform: scale(1.1);
}

.lew-rate-disabled {
  opacity: var(--lew-disabled-opacity);
  .lew-rate-icon {
    cursor: default;
  }
}
.lew-rate-readonly {
  .lew-rate-icon {
    cursor: default;
  }
}
.lew-rate-readonly,
.lew-rate-disabled {
  .lew-rate-star:hover {
    transform: scale(1);
  }
}
</style>
