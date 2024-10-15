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

// 获取 mark 位置
const getMarkPosition = (value: number | string) => {
  const range = getTrackMax.value - getTrackMin.value
  const percentage = ((Number(value) - getTrackMin.value) / range) * 100
  return percentage
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
  if (!trackRef.value || !dotRef.value) return
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

  // 设置点的位置
  dotRef.value.style.left = `${nearestStep}px`

  // 更新值
  modelValue.value = calculateValue(nearestStep)
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
  modelValue.value = value
  setDotByValue(value)
}

const setDotByValue = (value: number) => {
  if (!dotRef.value) return
  const nearestStep = calculateNearestStep(value)
  dotRef.value.style.left = `${nearestStep}px`
}

let _dragmove = () => {}
let isNew = false

onMounted(() => {
  const el = dotRef.value
  const parentEl = trackRef.value
  const { step, max, min } = props
  if (el && parentEl) {
    _dragmove = dragmove({
      el,
      parentEl,
      direction: 'horizontal',
      step: Number(step),
      max: Number(max) || getTrackMax.value,
      min: Number(min) || getTrackMin.value,
      trackMax: getTrackMax.value,
      trackMin: getTrackMin.value,
      callback: (e: any) => {
        isNew = true
        modelValue.value = calculateValue(e.x)
      }
    })
  }
  setDotByValue(modelValue.value)
})

onUnmounted(() => {
  _dragmove()
})

// 监听 modelValue 的变化，实时更新 dot 的位置
watch(modelValue, (newValue) => {
  if (!isNew) {
    setDotByValue(newValue)
  }
})
</script>

<template>
  <div class="lew-slider">
    <div ref="trackRef" @click="setDot" class="lew-slider-track">
      <div class="lew-slider-track-line">
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-mark"
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
  .lew-slider-track {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--lew-form-item-height-medium);
    position: relative;
    cursor: pointer;
  }

  .lew-slider-track-line {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    .lew-slider-track-step-mark {
      position: absolute;
      top: -1px;
      width: 6px;
      height: 6px;
      transform: translateX(-3px);
      border-radius: 50%;
      background-color: var(--lew-bgcolor-7);
      box-sizing: border-box;
    }
    .lew-slider-track-step-label {
      position: absolute;
      top: 15px;
      text-align: center;
      width: 0px;
      display: flex;
      justify-content: center;
      font-size: 14px;
      user-select: none;
      .lew-slider-track-step-label-text {
        text-align: center;
        color: var(--lew-color-text-2);
      }
    }
  }
  .lew-slider-track-dot {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) translateX(-8px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: var(--lew-color-blue) solid 2px;
    background: var(--lew-bgcolor-0);
    transition: transform var(--lew-form-transition-ease);
    cursor: pointer;
    box-sizing: border-box;
  }
  .lew-slider-track-dot:hover {
    transform: translateY(-50%) translateX(-8px) scale(1.1);
  }
  .lew-slider-track-dot:active {
    transform: translateY(-50%) translateX(-8px) scale(1.05);
  }
}
</style>
