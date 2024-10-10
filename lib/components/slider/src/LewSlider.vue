<script setup lang="ts">
import { sliderProps } from './props'
import { dragmove } from 'lew-ui/utils'

const props = defineProps(sliderProps)

// @ts-ignore
const modelValue: Ref<number> = defineModel()
const dotRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const dotX = ref(0)
const delay = ref([0, 1000])

const calculateValue = (position: number) => {
  if (!trackRef.value) return 0
  const trackWidth = trackRef.value.clientWidth
  const percentage = position / trackWidth
  dotX.value = position
  return (
    Math.ceil(
      percentage * (Number(props.max) - Number(props.min)) + Number(props.min)
    ) || 0
  )
}

const setDot = (e: MouseEvent) => {
  if (!trackRef.value || !dotRef.value) return
  delay.value = [0, 0]
  dotRef.value.style.transition = 'all var(--lew-form-transition-ease)'
  const trackRect = trackRef.value.getBoundingClientRect()
  const clickX = Math.max(
    0,
    Math.min(e.clientX - trackRect.left, trackRect.width)
  )
  const dotWidth = dotRef.value.offsetWidth
  dotRef.value.style.left = `${clickX - dotWidth / 2}px`
  modelValue.value = calculateValue(clickX)
  setTimeout(() => {
    if (dotRef.value)
      dotRef.value.style.transition =
        'transform var(--lew-form-transition-ease)'
    delay.value = [0, 1000]
  }, 250)
}

onMounted(() => {
  const el = dotRef.value
  const parentEl = trackRef.value
  if (el && parentEl) {
    dragmove({
      el,
      parentEl,
      direction: 'horizontal',
      callback: (e: any) => {
        modelValue.value = calculateValue(e.x)
      }
    })
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
            left: `calc(${(Number(item.value) / (Number(max) - Number(min))) * 100}% - 3px)`
          }"
        ></div>
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-label"
          :style="{
            left: `${(Number(item.value) / (Number(max) - Number(min))) * 100}%`
          }"
        >
          <div class="lew-slider-track-step-label-text">
            {{ item.label }}
          </div>
        </div>
      </div>
      <div
        ref="dotRef"
        v-tooltip="{
          content: modelValue,
          placement: 'top',
          trigger: 'mouseenter',
          delay,
          key: dotX
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
  .lew-slider-track:hover {
    .lew-slider-track-line {
      background: var(--lew-form-bgcolor-hover);
      border-left: 8px solid var(--lew-form-bgcolor-hover);
      border-right: 8px solid var(--lew-form-bgcolor-hover);
    }
    .lew-slider-track-step-mark {
      background-color: var(--lew-bgcolor-7);
    }
  }
  .lew-slider-track-line {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: var(--lew-form-bgcolor);
    border-left: 8px solid var(--lew-form-bgcolor);
    border-right: 8px solid var(--lew-form-bgcolor);
    transition: all var(--lew-form-transition-ease);
    .lew-slider-track-step-mark {
      position: absolute;
      top: -1px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--lew-bgcolor-4);
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
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: var(--lew-color-blue) solid 2px;
    background: var(--lew-bgcolor-0);
    transition: transform var(--lew-form-transition-ease);
    cursor: grab;
    box-sizing: border-box;
  }
  .lew-slider-track-dot:hover {
    transform: translateY(-50%) scale(1.1);
  }
  .lew-slider-track-dot:active {
    cursor: grabbing;
    transform: translateY(-50%) scale(1.05);
  }
}
</style>
