<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { badgeProps } from './props'
import { getColorType } from 'lew-ui/utils'

const props = defineProps(badgeProps)
const getStyle = computed<CSSProperties>(() => {
  const { color, offset, text } = props
  const _color = getColorType(color)

  if (text) {
    return {
      backgroundColor: `var(--lew-color-${_color})`,
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }

  return {
    backgroundColor: `var(--lew-color-${_color})`,
    ...(offset?.length === 2 && {
      transform: `translate(calc(-50% + ${offset[0]}px), ${offset[1]}px)`
    })
  }
})

const getBadgeStyle = computed(() => {
  const { text } = props
  return {
    paddingLeft: text ? '15px' : '0px'
  }
})

const displayValue = computed(() => {
  const { value, max } = props
  const numberValue = Number(value)
  if (!isNaN(numberValue) && numberValue > max) {
    return `${max}+`
  }
  return value
})
</script>

<template>
  <div class="lew-badge" :style="getBadgeStyle">
    <span v-if="value" class="lew-badge-value" :style="getStyle">
      {{ displayValue }}
    </span>
    <i
      v-else
      class="lew-badge-dot"
      :class="{ 'is-processing': processing }"
      :style="getStyle"
    ></i>
    <span v-if="text" class="lew-badge-text">{{ text }}</span>
    <slot v-else></slot>
  </div>
</template>

<style lang="scss">
.lew-badge {
  position: relative;
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
    color: var(--lew-color-white-text);
    background-color: var(--lew-color-error-dark);
  }
}

.lew-badge-value {
  border-radius: 25px;
}

.lew-badge-dot {
  border-radius: 50%;
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
