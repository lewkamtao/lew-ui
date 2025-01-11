<script lang="ts" setup>
import { rateProps } from './props'
import { any2px, object2class } from 'lew-ui/utils'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(rateProps)
const modelValue: Ref<number | undefined> = defineModel()
const tobeValue = ref(modelValue.value)
const iconRef: any = ref<Element[]>([])

const handleMouseMove = (e: MouseEvent, index: number) => {
  if (props.disabled || props.readonly) return

  if (props.allowHalf) {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const half = e.clientX - rect.left < rect.width / 2
    tobeValue.value = half ? index - 0.5 : index
  } else {
    tobeValue.value = index
  }
}

const handleMouseLeave = () => {
  if (props.disabled || props.readonly) return
  tobeValue.value = modelValue.value
}

const handleClick = async (index: number) => {
  if (props.disabled || props.readonly) return

  let newValue: number
  if (props.allowHalf) {
    newValue = modelValue.value === index ? index - 0.5 : index
  } else {
    newValue = index
  }

  modelValue.value = newValue

  // 创建动画效果
  const selectedIcons = iconRef.value.slice(0, newValue)
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

const getRateClass = () => {
  const { size, disabled, readonly } = props
  return object2class('lew-rate', {
    size,
    disabled,
    readonly
  })
}

const getRateIconStyle = computed(() => {
  const { size } = props
  const sizeMap = {
    small: 22,
    medium: 26,
    large: 30
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
</script>
<template>
  <lew-flex :gap="10" x="start" class="lew-rate" :class="getRateClass">
    <div
      v-for="i in count"
      :key="i"
      :ref="(el) => (iconRef[i - 1] = el)"
      @mousemove="handleMouseMove($event, i)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(i)"
      :style="getRateIconStyle"
      class="lew-rate-icon"
    >
      <icon
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
.lew-rate-icon:hover {
  transform: scale(1.1);
}
</style>
