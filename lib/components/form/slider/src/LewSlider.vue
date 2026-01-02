<script setup lang="ts">
import { any2px, dragmove } from 'lew-ui/utils'
import { throttle } from 'lodash-es'
import { sliderEmits } from './emits'

import { sliderProps } from './props'

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

function safeNumber(value: unknown, defaultValue: number = 0): number {
  if (value === null || value === undefined || value === '') {
    return defaultValue
  }
  const num = Number(value)
  return Number.isNaN(num) ? defaultValue : num
}

function safeArray<T>(value: unknown, defaultValue: T[] = []): T[] {
  return Array.isArray(value) ? value : defaultValue
}

function safeFunction(
  value: unknown,
  defaultValue: (val: number) => string,
): (val: number) => string {
  return typeof value === 'function' ? (value as (val: number) => string) : defaultValue
}

const getTrackMax = computed(() => {
  const options = safeArray(props.options)
  if (options.length > 0) {
    const values = options.map((option: any) => safeNumber(option.value))
    return Math.max(...values)
  }
  return safeNumber(props.max, 100)
})

const getTrackMin = computed(() => {
  const options = safeArray(props.options)
  if (options.length > 0) {
    const values = options.map((option: any) => safeNumber(option.value))
    return Math.min(...values)
  }
  return safeNumber(props.min, 0)
})

const getMax = computed(() => {
  const max = safeNumber(props.max, getTrackMax.value)
  return Math.max(max, getTrackMin.value + safeNumber(props.step, 1))
})

const getMin = computed(() => {
  return safeNumber(props.min, getTrackMin.value)
})

const modelValue = defineModel<number>('modelValue', {
  get(val) {
    const defaultValue = getMin.value
    const safeVal = safeNumber(val, defaultValue)
    return Math.max(getMin.value, Math.min(getMax.value, safeVal))
  },
  set(val) {
    const safeVal = safeNumber(val, getMin.value)
    return Math.max(getMin.value, Math.min(getMax.value, safeVal))
  },
})

// 内部视图状态，用于快速响应用户交互
const internalViewValue = ref<number>(0)
const dotRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const dotX = ref(0)

// 视图更新节流：50ms 更新频率，用于流畅的视觉反馈
const throttledUpdateView = throttle((newValue: number) => {
  const clampedValue = Math.max(getMin.value, Math.min(getMax.value, newValue))
  internalViewValue.value = clampedValue
  setDotByValue(clampedValue)
}, 50)

// 数据更新节流：250ms 更新频率，用于减少外部状态更新频率
const throttledUpdateModelValue = throttle((newValue: number) => {
  const clampedValue = Math.max(getMin.value, Math.min(getMax.value, newValue))
  modelValue.value = clampedValue
  emit('change', clampedValue)
}, 250)

function getMarkPosition(value: number | string): number {
  const trackMax = getTrackMax.value
  const trackMin = getTrackMin.value
  const range = trackMax - trackMin

  if (range <= 0)
    return 0

  const safeValue = safeNumber(value, trackMin)
  const percentage = ((safeValue - trackMin) / range) * 100
  return Math.max(0, Math.min(100, percentage))
}

function calculateValue(position: number): number {
  if (!trackRef.value)
    return getMin.value

  const trackWidth = trackRef.value.clientWidth
  if (trackWidth <= 0)
    return getMin.value

  const percentage = Math.max(0, Math.min(1, position / trackWidth))
  dotX.value = position

  const trackMax = getTrackMax.value
  const trackMin = getTrackMin.value
  const range = trackMax - trackMin

  const value = percentage * range + trackMin
  const step = safeNumber(props.step, 1)

  if (step <= 0)
    return value

  const decimalPlaces = (step.toString().split('.')[1] || '').length
  return Number(value.toFixed(decimalPlaces))
}

function setDot(e: MouseEvent): void {
  if (props.readonly || props.disabled || !trackRef.value || !dotRef.value) {
    return
  }

  const trackRect = trackRef.value.getBoundingClientRect()
  const clickX = Math.max(0, Math.min(e.clientX - trackRect.left, trackRect.width))

  const step = safeNumber(props.step, 1)
  if (step <= 0)
    return

  const trackMax = getTrackMax.value
  const trackMin = getTrackMin.value
  const range = trackMax - trackMin

  if (range <= 0)
    return

  const stepSize = trackRect.width / (range / step)

  const nearestStep = Math.round(clickX / stepSize) * stepSize

  const newValue = calculateValue(nearestStep)
  const clampedValue = Math.max(getMin.value, Math.min(getMax.value, newValue))

  if (clampedValue >= getMin.value && clampedValue <= getMax.value) {
    // 立即更新视图状态
    throttledUpdateView(clampedValue)
    // 延迟更新数据绑定
    throttledUpdateModelValue(clampedValue)
  }
}

function calculateNearestStep(value: number): number {
  const trackMax = getTrackMax.value
  const trackMin = getTrackMin.value
  const range = trackMax - trackMin
  const step = safeNumber(props.step, 1)

  if (range <= 0 || step <= 0)
    return 0

  const steps = Math.round((value - trackMin) / step)
  return ((steps * step) / range) * 100
}

function setDotByClick(value: number): void {
  if (props.readonly || props.disabled)
    return

  const safeValue = safeNumber(value, getMin.value)
  const clampedValue = Math.max(getMin.value, Math.min(getMax.value, safeValue))

  if (clampedValue >= getMin.value && clampedValue <= getMax.value) {
    // 立即更新视图状态
    throttledUpdateView(clampedValue)
    // 延迟更新数据绑定
    throttledUpdateModelValue(clampedValue)
  }
}

function setDotByValue(value: number): void {
  if (!dotRef.value)
    return

  const safeValue = safeNumber(value, getMin.value)
  const clampedValue = Math.max(getMin.value, Math.min(getMax.value, safeValue))
  const nearestStep = calculateNearestStep(clampedValue)
  const clampedStep = Math.max(0, Math.min(100, nearestStep))

  dotRef.value.style.left = `${clampedStep}%`
}

let _dragmove = (): void => {}

function init(): void {
  const el = dotRef.value
  const parentEl = trackRef.value
  const step = safeNumber(props.step, 1)

  if (el && parentEl && !props.readonly && !props.disabled) {
    _dragmove = dragmove({
      el,
      parentEl,
      direction: 'horizontal',
      step: () => step,
      max: () => getMax.value,
      min: () => getMin.value,
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        const newValue = calculateValue(e.x)
        const clampedValue = Math.max(getMin.value, Math.min(getMax.value, newValue))
        // 立即更新视图状态
        throttledUpdateView(clampedValue)
        // 延迟更新数据绑定
        throttledUpdateModelValue(clampedValue)
      },
    })
  }

  const currentValue = modelValue.value || getMin.value
  internalViewValue.value = currentValue
  setDotByValue(currentValue)
}

watch(
  [
    () => props.max,
    () => props.min,
    () => props.step,
    () => props.readonly,
    () => props.disabled,
    () => props.options,
  ],
  () => {
    nextTick(() => {
      init()
    })
  },
  { deep: true },
)

onMounted(() => {
  nextTick(() => {
    init()
  })
})

onUnmounted(() => {
  _dragmove()
  throttledUpdateView.cancel()
  throttledUpdateModelValue.cancel()
})

watch(
  modelValue,
  (newValue) => {
    const safeValue = safeNumber(newValue, getMin.value)
    internalViewValue.value = safeValue
    setDotByValue(safeValue)
  },
  { immediate: true },
)

const getStyle = computed(() => {
  const { size, width } = props
  const safeSize = size || 'medium'

  let objStyle: Record<string, string> = {}

  switch (safeSize) {
    case 'small':
      objStyle = {
        '--lew-slider-track-dot-size': '12px',
        '--lew-slider-track-line-height': '3px',
        '--lew-slider-track-step-mark-size': '6px',
        '--lew-slider-track-step-label-size': '12px',
      }
      break
    case 'medium':
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '7px',
        '--lew-slider-track-step-label-size': '14px',
      }
      break
    case 'large':
      objStyle = {
        '--lew-slider-track-dot-size': '20px',
        '--lew-slider-track-line-height': '5px',
        '--lew-slider-track-step-mark-size': '8px',
        '--lew-slider-track-step-label-size': '16px',
      }
      break
    default:
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '10px',
        '--lew-slider-track-step-label-size': '14px',
      }
      break
  }

  return {
    ...objStyle,
    'width': any2px(width),
    '--lew-slider-height': `var(--lew-form-item-height-${safeSize})`,
  }
})

function safeFormatTooltip(value: number): string {
  const formatFn = safeFunction(props.formatTooltip, (val: number) => val.toString())
  return formatFn(value)
}

function isValidOption(option: any): boolean {
  return (
    option
    && typeof option === 'object'
    && 'label' in option
    && 'value' in option
    && typeof option.label === 'string'
    && !Number.isNaN(safeNumber(option.value))
  )
}

const validOptions = computed(() => {
  const options = safeArray(props.options)
  return options.filter(isValidOption) as Array<{
    label: string
    value: string | number
  }>
})

const disabledAreaStyles = computed(() => {
  const leftWidth = getMarkPosition(getMin.value)
  const rightWidth = 100 - getMarkPosition(getMax.value)

  return {
    left: {
      width: `${leftWidth}%`,
    },
    right: {
      width: `${rightWidth}%`,
    },
  }
})

const trackRangeStyles = computed(() => {
  const trackMax = getTrackMax.value
  const trackMin = getTrackMin.value
  const range = trackMax - trackMin

  if (range <= 0) {
    return {
      width: '0%',
      left: '0%',
    }
  }

  const width = Math.max(0, Math.min(100, ((getMax.value - getMin.value) / range) * 100))
  const left = getMarkPosition(getMin.value)

  return {
    width: `${width}%`,
    left: `${left}%`,
  }
})

const selectedTrackStyles = computed(() => {
  const currentValue = internalViewValue.value || getMin.value
  const width = getMarkPosition(currentValue)

  return {
    width: `${width}%`,
  }
})

const dotStyles = computed(() => {
  const currentValue = internalViewValue.value
  const opacity = currentValue !== undefined && currentValue !== null ? '1' : '0'

  return {
    opacity,
  }
})

const tooltipConfig = computed(() => {
  const currentValue = safeNumber(internalViewValue.value)

  return {
    content: safeFormatTooltip(currentValue),
    placement: 'top' as const,
    trigger: 'mouseenter' as const,
    delay: [0, 1000] as [number, number],
    key: dotX.value,
  }
})

const optionMarkStyles = computed(() => {
  return validOptions.value.map((item) => {
    const value = safeNumber(item.value)
    const currentValue = safeNumber(internalViewValue.value)
    const isSelected = value <= currentValue

    return {
      key: `mark-${item.value}`,
      style: {
        left: `${getMarkPosition(item.value)}%`,
      },
      class: {
        'lew-slider-track-step-mark-selected': isSelected,
      },
    }
  })
})

const optionLabelStyles = computed(() => {
  return validOptions.value.map((item) => {
    const value = safeNumber(item.value)
    const isDisabled = value < getMin.value || value > getMax.value
    const displayText = item.label || value.toString()

    return {
      key: `label-${item.value}`,
      style: {
        left: `${getMarkPosition(item.value)}%`,
        top: `calc(var(--lew-slider-height) - 20px)`,
      },
      textClass: {
        'lew-slider-track-step-label-text-disabled': isDisabled,
      },
      displayText,
      value,
    }
  })
})
</script>

<template>
  <div
    class="lew-slider"
    :style="getStyle"
    :class="{
      'lew-slider-disabled': disabled,
      'lew-slider-readonly': readonly,
    }"
  >
    <div ref="trackRef" class="lew-slider-track" @click="setDot">
      <div
        :style="disabledAreaStyles.left"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-left"
        @click.stop
      />
      <div
        :style="disabledAreaStyles.right"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-right"
        @click.stop
      />

      <div class="lew-slider-track-line">
        <div class="lew-slider-track-line-range" :style="trackRangeStyles" />
        <div class="lew-slider-track-line-selected" :style="selectedTrackStyles" />

        <div
          v-for="markStyle in optionMarkStyles"
          :key="markStyle.key"
          class="lew-slider-track-step-mark"
          :class="markStyle.class"
          :style="markStyle.style"
        />
        <div
          v-for="labelStyle in optionLabelStyles"
          :key="labelStyle.key"
          class="lew-slider-track-step-label"
          :style="labelStyle.style"
        >
          <div
            class="lew-slider-track-step-label-text"
            :class="labelStyle.textClass"
            @click.stop="setDotByClick(labelStyle.value)"
          >
            {{ labelStyle.displayText }}
          </div>
        </div>
      </div>
      <div
        ref="dotRef"
        v-tooltip="tooltipConfig"
        :style="dotStyles"
        class="lew-slider-track-dot"
        @click.stop
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-slider {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 10px;

  .lew-slider-track {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--lew-slider-height);
    cursor: pointer;

    .lew-slider-track-disabled-area {
      position: absolute;
      cursor: not-allowed;
      top: 0;
      height: 100%;
      z-index: 1;
    }
    .lew-slider-track-disabled-area-left {
      left: 0;
    }
    .lew-slider-track-disabled-area-right {
      right: 0;
    }
  }

  .lew-slider-track-line {
    position: relative;
    width: 100%;
    height: var(--lew-slider-track-line-height);
    border-radius: var(--lew-slider-track-line-height);
    background: var(--lew-form-bgcolor);
    transition: background-color var(--lew-form-transition-ease);

    .lew-slider-track-line-range {
      position: absolute;
      height: 100%;
      top: 0;
      background-color: var(--lew-form-bgcolor-hover);
      border-radius: inherit;
    }
    .lew-slider-track-line-selected {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--lew-color-primary);
      border-radius: inherit;
    }
    .lew-slider-track-step-mark {
      position: absolute;
      width: var(--lew-slider-track-step-mark-size);
      height: var(--lew-slider-track-step-mark-size);
      transform: translate(
        calc(var(--lew-slider-track-step-mark-size) / -2),
        calc((var(--lew-slider-track-step-mark-size) - var(--lew-slider-track-line-height)) / -2)
      );
      border-radius: 50%;
      background-color: var(--lew-bgcolor-9);
      box-sizing: border-box;
    }
    .lew-slider-track-step-mark-selected {
      background-color: var(--lew-color-primary);
    }

    .lew-slider-track-step-label {
      position: absolute;
      text-align: center;
      width: 0;
      display: flex;
      justify-content: center;
      font-size: var(--lew-slider-track-step-label-size);
      user-select: none;

      .lew-slider-track-step-label-text {
        text-align: center;
        color: var(--lew-color-text-2);
        white-space: nowrap;
        cursor: pointer;
        transition: color var(--lew-form-transition-ease);

        &:hover:not(.lew-slider-track-step-label-text-disabled) {
          color: var(--lew-color-primary);
        }
      }
      .lew-slider-track-step-label-text-disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }
  }

  .lew-slider-track-dot {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(calc(var(--lew-slider-track-dot-size) / -2), -50%);
    width: var(--lew-slider-track-dot-size);
    height: var(--lew-slider-track-dot-size);
    border-radius: 50%;
    border: 2px solid var(--lew-color-primary);
    background: var(--lew-bgcolor-0);
    transition:
      transform var(--lew-form-transition-bezier),
      border-width var(--lew-form-transition-ease);
    cursor: pointer;
    box-sizing: border-box;
    z-index: 3;

    &:hover {
      transform: translate(calc(var(--lew-slider-track-dot-size) / -2), -50%) scale(1.1);
    }

    &:active {
      transform: translate(calc(var(--lew-slider-track-dot-size) / -2), -50%) scale(1.05);
      border-width: 4px;
    }
  }
}

.lew-slider::before,
.lew-slider::after {
  content: '';
  width: calc(var(--lew-slider-track-dot-size) / 2);
  height: var(--lew-slider-track-line-height);
  background-color: var(--lew-form-bgcolor);
}

.lew-slider-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-slider-readonly {
  pointer-events: none;
}
</style>
