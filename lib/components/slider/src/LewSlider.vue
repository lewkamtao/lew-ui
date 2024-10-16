<script setup lang="ts">
import { sliderProps } from './props'
import { dragmove } from 'lew-ui/utils'

const props = defineProps(sliderProps)

// @ts-ignore
const modelValue: Ref<number> = defineModel()
const dotRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const dotX = ref(0)

// 获取滑块轨道的最大值
const getTrackMax = computed(() => {
  const { options, max } = props
  if (options && options.length > 0) {
    return Math.max(...options.map((option) => Number(option.value)))
  }
  return Number(max)
})

// 获取滑块轨道的最小值
const getTrackMin = computed(() => {
  const { options, min } = props
  if (options && options.length > 0) {
    return Math.min(...options.map((option) => Number(option.value)))
  }
  return Number(min)
})

const getMax = computed(() => {
  return Number(props.max) || getTrackMax.value
})

const getMin = computed(() => {
  return Number(props.min) || getTrackMin.value
})

// 获取 mark 位置
const getMarkPosition = (value: number | string) => {
  const range = getTrackMax.value - getTrackMin.value
  const percentage = ((Number(value) - getTrackMin.value) / range) * 100
  return Math.max(0, Math.min(100, percentage))
}

const calculateValue = (position: number) => {
  if (!trackRef.value) return 0
  const trackWidth = trackRef.value.clientWidth
  const percentage = position / trackWidth
  dotX.value = position
  const value =
    percentage * (Number(getTrackMax.value) - Number(getTrackMin.value)) +
    Number(getTrackMin.value)
  const step = Number(props.step)
  const decimalPlaces = (step.toString().split('.')[1] || '').length
  return Number(value.toFixed(decimalPlaces)) || 0
}

const setDot = (e: MouseEvent) => {
  if (props.readonly || props.disabled || !trackRef.value || !dotRef.value)
    return
  const trackRect = trackRef.value.getBoundingClientRect()
  const clickX = Math.max(
    0,
    Math.min(e.clientX - trackRect.left, trackRect.width)
  )

  // 计算刻度大小
  const stepSize =
    trackRect.width / (Number(getTrackMax.value) / Number(props.step))

  // 计算最近的刻度位置
  const nearestStep = Math.round(clickX / stepSize) * stepSize

  // 更新值
  let _modelValue = calculateValue(nearestStep)

  if (_modelValue >= getMin.value && _modelValue <= getMax.value) {
    // 设置点的位置
    dotRef.value.style.left = `${nearestStep}px`
    modelValue.value = _modelValue
  }
}

// 根据当前值计算最近的刻度位置
const calculateNearestStep = (value: number) => {
  const trackWidth = trackRef.value?.clientWidth || 0
  const stepSize =
    (trackWidth / (Number(getTrackMax.value) - Number(getTrackMin.value))) *
    Number(props.step)
  const steps = Math.round(
    (value - Number(getTrackMin.value)) / Number(props.step)
  )
  return steps * stepSize
}

const setDotByClick = (value: number) => {
  if (props.readonly || props.disabled) return
  if (value >= getMin.value && value <= getMax.value) {
    modelValue.value = value
    setDotByValue(value)
  }
}

const setDotByValue = (value: number) => {
  if (!dotRef.value) return
  const nearestStep = calculateNearestStep(value)
  dotRef.value.style.left = `${nearestStep}px`
}

let _dragmove = () => {}

const init = () => {
  const el = dotRef.value
  const parentEl = trackRef.value
  const { step } = props
  if (el && parentEl && !props.readonly && !props.disabled) {
    _dragmove = dragmove({
      el,
      parentEl,
      direction: 'horizontal',
      step: () => Number(step),
      max: () => getMax.value,
      min: () => getMin.value,
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        modelValue.value = calculateValue(e.x)
      }
    })
  }
  setDotByValue(modelValue.value)
}

// 监听 max、min、step、readonly、disabled 的变化，重新初始化
watch(
  [
    () => props.max,
    () => props.min,
    () => props.step,
    () => props.readonly,
    () => props.disabled
  ],
  () => {
    init()
  }
)

onMounted(() => {
  init()
})

onUnmounted(() => {
  _dragmove()
})

// 监听 modelValue 的变化，实时更新 dot 的位置
watch(modelValue, (newValue) => {
  setDotByValue(newValue)
})
const getStyle = computed(() => {
  const { size } = props
  let objStyle = {}
  switch (size) {
    case 'small':
      objStyle = {
        '--lew-slider-track-dot-size': '12px',
        '--lew-slider-track-line-height': '3px',
        '--lew-slider-track-step-mark-size': '6px',
        '--lew-slider-track-step-label-size': '12px'
      }
      break
    case 'medium':
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '7px',
        '--lew-slider-track-step-label-size': '14px'
      }
      break
    case 'large':
      objStyle = {
        '--lew-slider-track-dot-size': '20px',
        '--lew-slider-track-line-height': '5px',
        '--lew-slider-track-step-mark-size': '8px',
        '--lew-slider-track-step-label-size': '16px'
      }
      break
    default:
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '10px'
      }
      break
  }
  return {
    ...objStyle,
    '--lew-slider-height': `var(--lew-form-item-height-${size})`
  }
})
</script>

<template>
  <div
    class="lew-slider"
    :style="getStyle"
    :class="{
      'lew-slider-disabled': disabled,
      'lew-slider-readonly': readonly
    }"
  >
    <div ref="trackRef" @click="setDot" class="lew-slider-track">
      <div
        :style="{
          width: `${getMarkPosition(getMin)}%`
        }"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-left"
        @click.stop
      ></div>
      <div
        :style="{
          width: `${100 - getMarkPosition(getMax)}%`
        }"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-right"
        @click.stop
      ></div>

      <div class="lew-slider-track-line">
        <div
          class="lew-slider-track-line-range"
          :style="{
            width: `${Math.max(0, Math.min(100, ((getMax - getMin) / (getTrackMax - getTrackMin)) * 100))}%`,
            left: `${getMarkPosition(getMin)}%`
          }"
        ></div>
        <div
          class="lew-slider-track-line-selected"
          :style="{ width: `${getMarkPosition(modelValue)}%` }"
        ></div>

        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-mark"
          :class="{
            'lew-slider-track-step-mark-selected':
              Number(item.value) <= Number(modelValue)
          }"
          :style="{
            left: `${getMarkPosition(item.value)}%`
          }"
        ></div>
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-label"
          :style="{
            left: `${getMarkPosition(item.value)}%`
          }"
        >
          <div
            @click.stop="setDotByClick(Number(item.value))"
            class="lew-slider-track-step-label-text"
            :class="{
              'lew-slider-track-step-label-text-disabled':
                Number(item.value) < Number(getMin) ||
                Number(item.value) > Number(getMax)
            }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div
        @click.stop
        ref="dotRef"
        v-tooltip="{
          content: modelValue,
          placement: 'top',
          trigger: 'mouseenter',
          delay: [0, 1000],
          key: dotX
        }"
        :style="{
          opacity: modelValue || modelValue === 0 ? '1' : '0'
        }"
        class="lew-slider-track-dot"
      ></div>
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
    cursor: pointer;

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
      background-color: var(--lew-form-bgcolor-active);
    }
    .lew-slider-track-line-selected {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--lew-color-blue);
    }
    .lew-slider-track-step-mark {
      position: absolute;
      width: var(--lew-slider-track-step-mark-size);
      height: var(--lew-slider-track-step-mark-size);
      transform: translate(
        calc(var(--lew-slider-track-step-mark-size) / 2 * -1),
        calc(
          (
              var(--lew-slider-track-step-mark-size) - var(
                  --lew-slider-track-line-height
                )
            ) / 2 * -1
        )
      );
      border-radius: 50%;
      background-color: var(--lew-bgcolor-9);
      box-sizing: border-box;
    }
    .lew-slider-track-step-mark-selected {
      background-color: var(--lew-color-blue);
    }

    .lew-slider-track-step-label {
      position: absolute;
      top: 10px;
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
    left: 0;
    top: 50%;
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%);
    width: var(--lew-slider-track-dot-size);
    height: var(--lew-slider-track-dot-size);
    border-radius: 50%;
    border: var(--lew-color-blue) solid 2px;
    background: var(--lew-bgcolor-0);
    transition: transform var(--lew-form-transition-ease);
    cursor: pointer;
    box-sizing: border-box;
    z-index: 3;
  }
  .lew-slider-track-dot:hover {
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%)
      scale(1.1);
  }
  .lew-slider-track-dot:active {
    transform: translate(calc(var(--lew-slider-track-dot-size) / 2 * -1), -50%)
      scale(1.05);
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
