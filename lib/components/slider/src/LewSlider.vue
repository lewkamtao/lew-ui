<script setup lang="ts">
import { sliderProps } from './props'

const props = defineProps(sliderProps)
</script>

<template>
  <div class="lew-slider">
    <div class="lew-slider-track">
      <div class="lew-slider-track-line">
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-mark"
          :style="{
            left: `${(Number(item.value) / (Number(max) - Number(min))) * 100}%`
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
      <div class="lew-slider-track-dot"></div>
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
  }
  .lew-slider-track-line {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: var(--lew-form-bgcolor);
    border-left: 10px solid var(--lew-form-bgcolor);
    border-right: 10px solid var(--lew-form-bgcolor);
    .lew-slider-track-step-mark {
      position: absolute;
      top: -1px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--lew-bgcolor-8);
    }
    .lew-slider-track-step-label {
      position: absolute;
      top: 10px;
      text-align: center;
      width: 0px;
      display: flex;
      justify-content: center;
      .lew-slider-track-step-label-text {
        text-align: center;
        color: var(--lew-color-text-2);
      }
    }
  }
  .lew-slider-track-dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: var(--lew-form-bgcolor);
  }
}
</style>
