<script setup lang="ts">
import { any2px, dragmove } from 'lew-ui/utils'
import { throttle } from 'lodash-es'
import { sliderRangeEmits } from './emits'
import { sliderRangeProps } from './props'

const props = defineProps(sliderRangeProps)
const emit = defineEmits(sliderRangeEmits)

// 获取滑块轨道的最大值
const getTrackMax = computed(() => {
  const { options, max } = props
  if (options && options.length > 0) {
    return Math.max(...options.map(option => Number(option.value)))
  }
  return Number(max)
})

// 获取滑块轨道的最小值
const getTrackMin = computed(() => {
  const { options, min } = props
  if (options && options.length > 0) {
    return Math.min(...options.map(option => Number(option.value)))
  }
  return Number(min)
})

const getMax = computed(() => {
  return Number(props.max) || getTrackMax.value
})

const getMin = computed(() => {
  return Number(props.min) || getTrackMin.value
})

const modelValue = defineModel<number[]>('modelValue', {
  get(val) {
    if (val)
      return val
    return [getMin.value, getMax.value] // 初始值设置为可选范围内的最小值和最大值
  },
})

// 修改为数组以支持范围
const dotRef1 = ref<HTMLElement | null>(null) // 左侧滑块
const dotRef2 = ref<HTMLElement | null>(null) // 右侧滑块
const trackRef = ref<HTMLElement | null>(null)
const dotX = ref(0)

// 创建节流函数，用于更新modelValue
const throttledUpdateModelValue = throttle(
  (leftValue: number, rightValue: number) => {
    if (!modelValue.value) {
      modelValue.value = [0, 0]
    }
    // 保持原始位置，不进行自动排序
    modelValue.value = [leftValue, rightValue]
    emit('change', modelValue.value)
  },
  16,
) // 约60fps的更新频率

// 获取 mark 位置
function getMarkPosition(value: number | string) {
  const range = getTrackMax.value - getTrackMin.value
  const percentage = ((Number(value) - getTrackMin.value) / range) * 100
  return Math.max(0, Math.min(100, percentage))
}

function calculateValue(position: number) {
  if (!trackRef.value)
    return 0
  const trackWidth = trackRef.value.clientWidth
  const percentage = position / trackWidth
  dotX.value = position
  const value
    = percentage * (Number(getTrackMax.value) - Number(getTrackMin.value))
      + Number(getTrackMin.value)
  const step = Number(props.step)
  const decimalPlaces = (step.toString().split('.')[1] || '').length
  return Number(value.toFixed(decimalPlaces)) || 0
}

// 根据当前值计算最近的刻度位置
function calculateNearestStep(value: number) {
  const steps = Math.round(
    (value - Number(getTrackMin.value)) / Number(props.step),
  )
  return (
    ((steps * Number(props.step)
      + Number(getTrackMin.value)
      - Number(getTrackMin.value))
    / (Number(getTrackMax.value) - Number(getTrackMin.value)))
  * 100
  )
}

function setDotByValue(value: number, isLeft: boolean) {
  if (isLeft) {
    if (!dotRef1.value)
      return
    const nearestStepPercentage = calculateNearestStep(value)
    dotRef1.value.style.left = `${nearestStepPercentage}%`
  }
  else {
    if (!dotRef2.value)
      return
    const nearestStepPercentage = calculateNearestStep(value)
    dotRef2.value.style.left = `${nearestStepPercentage}%`
  }
}

// 根据modelValue更新两个滑块的位置
function updateDotsByModelValue(values: number[]) {
  if (!values || values.length !== 2)
    return

  const [leftValue, rightValue] = values

  // 直接使用传入的值，不进行排序
  // 左侧滑块对应第一个值，右侧滑块对应第二个值
  setDotByValue(leftValue, true)
  setDotByValue(rightValue, false)
}

let _dragmove = () => {}

function init() {
  const el1 = dotRef1.value
  const el2 = dotRef2.value
  const parentEl = trackRef.value
  const { step } = props
  if (el1 && el2 && parentEl && !props.readonly && !props.disabled) {
    _dragmove = dragmove({
      el: el1,
      parentEl,
      direction: 'horizontal',
      step: () => Number(step),
      max: () => getMax.value,
      min: () => getMin.value,
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        const newValue = [
          modelValue.value?.[0] || getMin.value,
          modelValue.value?.[1] || getMax.value,
        ]
        newValue[0] = calculateValue(e.x)
        throttledUpdateModelValue(newValue[0], newValue[1])
        // 实时更新点的位置，不进行节流
        updateDotsByModelValue([newValue[0], newValue[1]])
      },
    })
    _dragmove = dragmove({
      el: el2,
      parentEl,
      direction: 'horizontal',
      step: () => Number(step),
      max: () => getMax.value,
      min: () => getMin.value,
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        const newValue = [
          modelValue.value?.[0] || getMin.value,
          modelValue.value?.[1] || getMax.value,
        ]
        newValue[1] = calculateValue(e.x)
        throttledUpdateModelValue(newValue[0], newValue[1])
        // 实时更新点的位置，不进行节流
        updateDotsByModelValue([newValue[0], newValue[1]])
      },
    })
  }
  updateDotsByModelValue(modelValue.value || [getMin.value, getMax.value])
}

// 监听 max、min、step、readonly、disabled 的变化，重新初始化
watch(
  [
    () => props.max,
    () => props.min,
    () => props.step,
    () => props.readonly,
    () => props.disabled,
  ],
  () => {
    init()
  },
)

onMounted(() => {
  init()
})

onUnmounted(() => {
  _dragmove()
  // 取消节流函数
  throttledUpdateModelValue.cancel()
})

// 监听 modelValue 的变化，实时更新 dot 的位置
watch(
  modelValue,
  (newValue) => {
    updateDotsByModelValue(newValue || [getMin.value, getMax.value])
  },
  {
    deep: true,
  },
)

const getStyle = computed(() => {
  const { size, width } = props
  let objStyle = {}
  switch (size) {
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
      }
      break
  }
  return {
    ...objStyle,
    'width': any2px(width),
    '--lew-slider-height': `var(--lew-form-item-height-${size})`,
  }
})

// 计算禁用区域的样式
const disabledAreaStyles = computed(() => {
  return {
    left: {
      width: `${getMarkPosition(getMin.value)}%`,
    },
    right: {
      width: `${100 - getMarkPosition(getMax.value)}%`,
    },
  }
})

// 计算范围线的样式
const rangeLineStyle = computed(() => {
  const width = Math.max(
    0,
    Math.min(
      100,
      ((getMax.value - getMin.value)
        / (getTrackMax.value - getTrackMin.value))
      * 100,
    ),
  )
  return {
    width: `${width}%`,
    left: `${getMarkPosition(getMin.value)}%`,
  }
})

// 计算选中区域的样式
const selectedLineStyle = computed(() => {
  const currentMin = modelValue.value?.[0] ?? getMin.value
  const currentMax = modelValue.value?.[1] ?? getMax.value
  const width = Math.max(
    0,
    Math.min(
      100,
      (Math.abs(currentMax - currentMin)
        / (getTrackMax.value - getTrackMin.value))
      * 100,
    ),
  )
  const left = getMarkPosition(Math.min(currentMin, currentMax))
  return {
    width: `${width}%`,
    left: `${left}%`,
  }
})

// 计算选项的样式和状态
const optionStyles = computed(() => {
  return (
    props.options?.map((item, index) => {
      const itemValue = Number(item.value)
      const currentMin = modelValue.value?.[0] ?? getMin.value
      const currentMax = modelValue.value?.[1] ?? getMax.value
      const isSelected
        = itemValue >= Math.min(currentMin, currentMax)
          && itemValue <= Math.max(currentMin, currentMax)
      const isDisabled
        = itemValue < Number(getMin.value) || itemValue > Number(getMax.value)

      return {
        mark: {
          style: {
            left: `${getMarkPosition(item.value)}%`,
          },
          class: {
            'lew-slider-track-step-mark-selected': isSelected,
          },
        },
        label: {
          style: {
            left: `${getMarkPosition(item.value)}%`,
            top: `calc(var(--lew-slider-height) - 20px)`,
          },
          class: {
            'lew-slider-track-step-label-text-disabled': isDisabled,
          },
        },
        item,
        index,
      }
    }) || []
  )
})

// 计算滑块的样式
const dotStyles = computed(() => {
  return {
    dot1: {
      opacity: modelValue.value?.[0] !== undefined ? '1' : '0',
    },
    dot2: {
      opacity: modelValue.value?.[1] !== undefined ? '1' : '0',
    },
  }
})

// 计算tooltip内容
const tooltipContent = computed(() => {
  return {
    dot1: props.formatTooltip(modelValue.value?.[0] ?? getMin.value),
    dot2: props.formatTooltip(modelValue.value?.[1] ?? getMax.value),
  }
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
    <div ref="trackRef" class="lew-slider-track">
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
        <div class="lew-slider-track-line-range" :style="rangeLineStyle" />
        <div
          class="lew-slider-track-line-selected"
          :style="selectedLineStyle"
        />

        <div
          v-for="option in optionStyles"
          :key="option.index"
          class="lew-slider-track-step-mark"
          :class="option.mark.class"
          :style="option.mark.style"
        />
        <div
          v-for="option in optionStyles"
          :key="option.index"
          class="lew-slider-track-step-label"
          :style="option.label.style"
        >
          <div
            class="lew-slider-track-step-label-text"
            :class="option.label.class"
          >
            {{ option.item.label }}
          </div>
        </div>
      </div>
      <div
        ref="dotRef1"
        v-tooltip="{
          content: tooltipContent.dot1,
          placement: 'top',
          trigger: 'mouseenter',
          delay: [0, 1000],
          key: dotX,
        }"
        :style="dotStyles.dot1"
        class="lew-slider-track-dot"
      />
      <div
        ref="dotRef2"
        v-tooltip="{
          content: tooltipContent.dot2,
          placement: 'top',
          trigger: 'mouseenter',
          delay: [0, 1000],
          key: dotX,
        }"
        :style="dotStyles.dot2"
        class="lew-slider-track-dot"
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
    position: relative;
    cursor: default;

    .lew-slider-track-disabled-area {
      position: absolute;
      cursor: not-allowed;
      top: 0px;
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
    transition: all var(--lew-form-transition-ease);

    .lew-slider-track-line-range {
      position: absolute;
      height: 100%;
      top: 0;
      background-color: var(--lew-form-bgcolor-hover);
    }
    .lew-slider-track-line-selected {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--lew-color-primary);
    }
    .lew-slider-track-step-mark {
      position: absolute;
      width: var(--lew-slider-track-step-mark-size);
      height: var(--lew-slider-track-step-mark-size);
      transform: translate(
        calc(var(--lew-slider-track-step-mark-size) / 2 * -1),
        calc((var(--lew-slider-track-step-mark-size) - var(--lew-slider-track-line-height)) / 2 * -1)
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
      width: 0px;
      display: flex;
      justify-content: center;
      font-size: var(--lew-slider-track-step-label-size);
      user-select: none;
      .lew-slider-track-step-label-text {
        text-align: center;
        color: var(--lew-color-text-2);
        white-space: nowrap;
      }
      .lew-slider-track-step-label-text-disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }
    }
  }
  .lew-slider-track-dot {
    position: absolute;
    top: 50%;
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%);
    width: var(--lew-slider-track-dot-size);
    height: var(--lew-slider-track-dot-size);
    border-radius: 50%;
    border: var(--lew-color-primary) solid 2px;
    background: var(--lew-bgcolor-0);
    transition:
      transform var(--lew-form-transition-ease),
      border-width 0.1s ease;
    cursor: pointer;
    box-sizing: border-box;
    z-index: 3;
  }
  .lew-slider-track-dot:hover {
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%) scale(1.1);
  }
  .lew-slider-track-dot:active {
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%) scale(1.05);
    border-width: 4px;
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
