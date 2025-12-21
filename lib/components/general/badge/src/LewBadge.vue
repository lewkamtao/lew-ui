<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { getColorType } from 'lew-ui/utils'
import { badgeProps } from './props'

const props = defineProps(badgeProps)

// 计算类名（静态配置用 class）
const badgeClass = computed(() => {
  return ['lew-badge', props.text && 'lew-badge--has-text']
    .filter(Boolean)
    .join(' ')
})

// 计算 badge value/dot 的类名
const badgeValueClass = computed(() => {
  return [
    props.value ? 'lew-badge-value' : 'lew-badge-dot',
    props.text && 'lew-badge-value--with-text',
    props.processing && 'is-processing',
  ]
    .filter(Boolean)
    .join(' ')
})

// 只计算动态样式（color 和 offset）
const badgeStyle = computed<CSSProperties>(() => {
  const { color, offset, text } = props
  const _color = getColorType(color) || 'red'

  const style: CSSProperties = {
    backgroundColor: `var(--lew-color-${_color})`,
  }

  // 只有在非 text 模式且有 offset 时才应用动态 transform
  if (!text && offset?.length === 2) {
    style.transform = `translate(calc(-50% + ${offset[0]}px), ${offset[1]}px)`
  }

  return style
})

// 显示值计算（逻辑计算，保留）
const displayValue = computed(() => {
  const { value, max } = props
  const numberValue = Number(value)
  const maxValue = Number(max)
  if (
    !Number.isNaN(numberValue)
    && !Number.isNaN(maxValue)
    && numberValue > maxValue
  ) {
    return `${maxValue}+`
  }
  return value
})
</script>

<template>
  <div :class="badgeClass">
    <span v-if="value" :class="badgeValueClass" :style="badgeStyle">
      {{ displayValue }}
    </span>
    <i v-else :class="badgeValueClass" :style="badgeStyle" />
    <span v-if="text" class="lew-badge-text">{{ text }}</span>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.lew-badge {
  position: relative;

  // 有 text 时的 padding
  &--has-text {
    padding-left: 15px;
  }

  .lew-badge-dot {
    position: absolute;
    left: 100%;
    width: 6px;
    height: 6px;
    top: -2.5px;
    z-index: 1;
    cursor: normal;
    border-radius: 50%;
    box-sizing: border-box;

    &.is-processing {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: inherit;
        animation: badge-processing 1.2s infinite ease-in-out;
      }
    }
  }

  .lew-badge-value {
    position: absolute;
    display: inline-flex;
    align-items: center;
    left: 100%;
    bottom: calc(100% - 9px);
    transform: translateX(-50%);
    border-radius: 25px;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    text-align: center;
    padding: 0px 5px;
    font-size: 12px;
    cursor: normal;
    z-index: 1;
    font-weight: normal;
    box-sizing: border-box;
    color: var(--lew-color-white);

    // 有 text 时的定位样式（静态配置）
    &--with-text {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

@keyframes badge-processing {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>
