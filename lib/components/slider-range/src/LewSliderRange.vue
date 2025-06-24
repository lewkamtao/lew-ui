<script setup lang="ts">
import { sliderRangeProps } from './props';
import { dragmove } from 'lew-ui/utils';

const props = defineProps(sliderRangeProps);

// @ts-ignore
const modelValue: Ref<number[] | undefined> = defineModel('modelValue', {
  get(val) {
    if (val) return val;
    return [getMin.value, getMax.value]; // 初始值设置为可选范围内的最小值和最大值
  },
});
// 修改为数组以支持范围
const dotRef1 = ref<HTMLElement | null>(null); // 左侧滑块
const dotRef2 = ref<HTMLElement | null>(null); // 右侧滑块
const trackRef = ref<HTMLElement | null>(null);
const dotX = ref(0);

// 获取滑块轨道的最大值
const getTrackMax = computed(() => {
  const { options, max } = props;
  if (options && options.length > 0) {
    return Math.max(...options.map((option) => Number(option.value)));
  }
  return Number(max);
});

// 获取滑块轨道的最小值
const getTrackMin = computed(() => {
  const { options, min } = props;
  if (options && options.length > 0) {
    return Math.min(...options.map((option) => Number(option.value)));
  }
  return Number(min);
});

const getMax = computed(() => {
  return Number(props.max) || getTrackMax.value;
});

const getMin = computed(() => {
  return Number(props.min) || getTrackMin.value;
});

// 获取 mark 位置
const getMarkPosition = (value: number | string) => {
  const range = getTrackMax.value - getTrackMin.value;
  const percentage = ((Number(value) - getTrackMin.value) / range) * 100;
  return Math.max(0, Math.min(100, percentage));
};

const calculateValue = (position: number) => {
  if (!trackRef.value) return 0;
  const trackWidth = trackRef.value.clientWidth;
  const percentage = position / trackWidth;
  dotX.value = position;
  const value =
    percentage * (Number(getTrackMax.value) - Number(getTrackMin.value)) +
    Number(getTrackMin.value);
  const step = Number(props.step);
  const decimalPlaces = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimalPlaces)) || 0;
};

// 根据当前值计算最近的刻度位置
const calculateNearestStep = (value: number) => {
  const steps = Math.round(
    (value - Number(getTrackMin.value)) / Number(props.step)
  );
  return (
    ((steps * Number(props.step) +
      Number(getTrackMin.value) -
      Number(getTrackMin.value)) /
      (Number(getTrackMax.value) - Number(getTrackMin.value))) *
    100
  );
};

const setDotByValue = (value: number, isLeft: boolean) => {
  if (isLeft) {
    if (!dotRef1.value) return;
    const nearestStepPercentage = calculateNearestStep(value);
    dotRef1.value.style.left = `${nearestStepPercentage}%`;
  } else {
    if (!dotRef2.value) return;
    const nearestStepPercentage = calculateNearestStep(value);
    dotRef2.value.style.left = `${nearestStepPercentage}%`;
  }
};

let _dragmove = () => {};

const init = () => {
  const el1 = dotRef1.value;
  const el2 = dotRef2.value;
  const parentEl = trackRef.value;
  const { step } = props;
  if (el1 && el2 && parentEl && !props.readonly && !props.disabled) {
    _dragmove = dragmove({
      el: el1,
      parentEl,
      direction: 'horizontal',
      step: () => Number(step),
      max: () =>
        Math.min(
          getMax.value,
          modelValue.value ? modelValue.value[1] : getMax.value
        ), // 动态最大值
      min: () => getMin.value,
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        modelValue.value = modelValue.value || [0, 0];
        modelValue.value[0] = calculateValue(e.x);
      },
    });
    _dragmove = dragmove({
      el: el2,
      parentEl,
      direction: 'horizontal',
      step: () => Number(step),
      max: () => getMax.value,
      min: () =>
        Math.max(
          getMin.value,
          modelValue.value ? modelValue.value[0] : getMin.value
        ), // 动态最小值
      trackMax: () => getTrackMax.value,
      trackMin: () => getTrackMin.value,
      callback: (e: any) => {
        modelValue.value = modelValue.value || [0, 0];
        modelValue.value[1] = calculateValue(e.x);
      },
    });
  }
  setDotByValue(modelValue.value ? modelValue.value[0] : 0, true);
  setDotByValue(modelValue.value ? modelValue.value[1] : 0, false);
};

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
    init();
  }
);

onMounted(() => {
  init();
});

onUnmounted(() => {
  _dragmove();
});

// 监听 modelValue 的变化，实时更新 dot 的位置
watch(
  modelValue,
  (newValue) => {
    setDotByValue(newValue ? newValue[0] : 0, true);
    setDotByValue(newValue ? newValue[1] : 0, false);
  },
  {
    deep: true,
  }
);

const getStyle = computed(() => {
  const { size } = props;
  let objStyle = {};
  switch (size) {
    case 'small':
      objStyle = {
        '--lew-slider-track-dot-size': '12px',
        '--lew-slider-track-line-height': '3px',
        '--lew-slider-track-step-mark-size': '6px',
        '--lew-slider-track-step-label-size': '12px',
      };
      break;
    case 'medium':
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '7px',
        '--lew-slider-track-step-label-size': '14px',
      };
      break;
    case 'large':
      objStyle = {
        '--lew-slider-track-dot-size': '20px',
        '--lew-slider-track-line-height': '5px',
        '--lew-slider-track-step-mark-size': '8px',
        '--lew-slider-track-step-label-size': '16px',
      };
      break;
    default:
      objStyle = {
        '--lew-slider-track-dot-size': '16px',
        '--lew-slider-track-line-height': '4px',
        '--lew-slider-track-step-mark-size': '10px',
      };
      break;
  }
  return {
    ...objStyle,
    '--lew-slider-height': `var(--lew-form-item-height-${size})`,
  };
});
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
        :style="{
          width: `${getMarkPosition(getMin)}%`,
        }"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-left"
        @click.stop
      ></div>
      <div
        :style="{
          width: `${100 - getMarkPosition(getMax)}%`,
        }"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-right"
        @click.stop
      ></div>

      <div class="lew-slider-track-line">
        <div
          class="lew-slider-track-line-range"
          :style="{
            width: `${Math.max(0, Math.min(100, ((getMax - getMin) / (getTrackMax - getTrackMin)) * 100))}%`,
            left: `${getMarkPosition(getMin)}%`,
          }"
        ></div>
        <div
          class="lew-slider-track-line-selected"
          :style="{
            width: `${Math.max(0, Math.min(100, (((modelValue?.[1] ?? 0) - (modelValue?.[0] ?? 0)) / (getTrackMax - getTrackMin)) * 100))}%`,
            left: `${getMarkPosition(modelValue?.[0] ?? 0)}%`,
          }"
        ></div>

        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-mark"
          :class="{
            'lew-slider-track-step-mark-selected':
              Number(item.value) <= Number(modelValue?.[1] ?? 0) &&
              Number(item.value) >= Number(modelValue?.[0] ?? 0),
          }"
          :style="{
            left: `${getMarkPosition(item.value)}%`,
          }"
        ></div>
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-label"
          :style="{
            left: `${getMarkPosition(item.value)}%`,
            top: `calc(var(--lew-slider-height) - 20px)`,
          }"
        >
          <div
            class="lew-slider-track-step-label-text"
            :class="{
              'lew-slider-track-step-label-text-disabled':
                Number(item.value) < Number(getMin) ||
                Number(item.value) > Number(getMax),
            }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div
        ref="dotRef1"
        v-tooltip="{
          content: formatTooltip(modelValue?.[0] ?? 0),
          placement: 'top',
          trigger: 'mouseenter',
          delay: [0, 1000],
          key: dotX,
        }"
        :style="{
          opacity: modelValue?.[0] !== undefined ? '1' : '0',
        }"
        class="lew-slider-track-dot"
      ></div>
      <div
        ref="dotRef2"
        v-tooltip="{
          content: formatTooltip(modelValue?.[1] ?? 0),
          placement: 'top',
          trigger: 'mouseenter',
          delay: [0, 1000],
          key: dotX,
        }"
        :style="{
          opacity: modelValue?.[1] !== undefined ? '1' : '0',
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
    border: var(--lew-color-blue) solid 2px;
    background: var(--lew-bgcolor-0);
    transition:
      transform var(--lew-form-transition-ease),
      border-width 0.1s ease;
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
