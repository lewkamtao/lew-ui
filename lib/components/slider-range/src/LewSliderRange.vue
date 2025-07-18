<script setup lang="ts">
import { dragmove } from 'lew-ui/utils'
import { throttle } from 'lodash-es'
import { sliderRangeProps } from './props'

const props = defineProps(sliderRangeProps)
const emit = defineEmits(['change'])

const modelValue = defineModel<number[]>('modelValue', {
  get(val) {
    // 确保返回有效的数组，避免 null、undefined 或空数组
    if (
      Array.isArray(val)
      && val.length === 2
      && val.every(v => v !== null && v !== undefined)
    ) {
      return val
    }
    return [getMin.value, getMax.value] // 初始值设置为可选范围内的最小值和最大值
  },
})

// 新增 _modelValue 来维护位置
const _modelValue = ref<number[]>([0, 0])

// 添加拖拽标志，用于过滤拖拽过程中的更新
const isDragging = ref(false)

// 安全的数组访问函数
function safeGetArrayValue(arr: number[] | null | undefined, index: number, defaultValue: number): number {
  if (
    !Array.isArray(arr)
    || arr.length <= index
    || arr[index] === null
    || arr[index] === undefined
  ) {
    return defaultValue
  }
  return arr[index]
}

// 安全的 _modelValue 访问
function getInternalValueAt(index: number, defaultValue: number): number {
  return safeGetArrayValue(_modelValue.value, index, defaultValue)
}

// 修改为数组以支持范围
const dotRef1 = ref<HTMLElement | null>(null) // 左侧滑块
const dotRef2 = ref<HTMLElement | null>(null) // 右侧滑块
const trackRef = ref<HTMLElement | null>(null)
const dotX = ref(0)

// 创建节流函数，用于更新modelValue，并在最后进行排序
const throttledUpdateModelValue = throttle(
  (leftValue: number, rightValue: number) => {
    if (!modelValue.value) {
      modelValue.value = [0, 0]
    }
    // 在最后节流赋值时进行排序，从小到大
    const sortedValues = [leftValue, rightValue].sort((a, b) => a - b)
    modelValue.value = sortedValues
    emit('change', modelValue.value)
  },
  16,
) // 约60fps的更新频率

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
  // 确保 values 是有效的数组
  if (
    !Array.isArray(values)
    || values.length !== 2
    || values.some(v => v === null || v === undefined)
  ) {
    return
  }

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
          getInternalValueAt(0, getMin.value),
          getInternalValueAt(1, getMax.value),
        ]
        newValue[0] = calculateValue(e.x)
        _modelValue.value = [newValue[0], newValue[1]]
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
          getInternalValueAt(0, getMin.value),
          getInternalValueAt(1, getMax.value),
        ]
        newValue[1] = calculateValue(e.x)
        _modelValue.value = [newValue[0], newValue[1]]
        throttledUpdateModelValue(newValue[0], newValue[1])
        // 实时更新点的位置，不进行节流
        updateDotsByModelValue([newValue[0], newValue[1]])
      },
    })
  }
  updateDotsByModelValue(_modelValue.value || [getMin.value, getMax.value])
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

// 监听 modelValue 的变化，同步到 _modelValue
watch(
  modelValue,
  (newValue) => {
    // 如果正在拖拽，则不处理外部更新，避免冲突
    if (isDragging.value) {
      return
    }
    // 确保 newValue 是有效的数组
    if (
      Array.isArray(newValue)
      && newValue.length === 2
      && newValue.every(v => v !== null && v !== undefined)
    ) {
      _modelValue.value = [...newValue]
      updateDotsByModelValue(_modelValue.value)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

onMounted(() => {
  // 初始化 _modelValue，确保有有效的值
  const currentModelValue = modelValue.value
  if (
    Array.isArray(currentModelValue)
    && currentModelValue.length === 2
    && currentModelValue.every(v => v !== null && v !== undefined)
  ) {
    _modelValue.value = [...currentModelValue]
  }
  else {
    _modelValue.value = [getMin.value, getMax.value]
  }
  init()
})

onUnmounted(() => {
  _dragmove()
  // 取消节流函数
  throttledUpdateModelValue.cancel()
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
    '--lew-slider-height': `var(--lew-form-item-height-${size})`,
  }
})

// 计算选中区域的样式
const selectedAreaStyle = computed(() => {
  const leftValue = getInternalValueAt(0, getMin.value)
  const rightValue = getInternalValueAt(1, getMax.value)
  const minValue = Math.min(leftValue, rightValue)

  const width = Math.max(
    0,
    Math.min(
      100,
      (Math.abs(rightValue - leftValue)
        / (getTrackMax.value - getTrackMin.value))
      * 100,
    ),
  )

  const left = getMarkPosition(minValue)

  return {
    width: `${width}%`,
    left: `${left}%`,
  }
})

// 计算范围区域的样式
const rangeAreaStyle = computed(() => {
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

// 判断步进标记是否被选中
function isStepMarkSelected(value: number | string) {
  const leftValue = getInternalValueAt(0, getMin.value)
  const rightValue = getInternalValueAt(1, getMax.value)
  const minValue = Math.min(leftValue, rightValue)
  const maxValue = Math.max(leftValue, rightValue)

  return Number(value) >= minValue && Number(value) <= maxValue
}

// 判断步进标签是否被禁用
function isStepLabelDisabled(value: number | string) {
  return (
    Number(value) < Number(getMin.value) || Number(value) > Number(getMax.value)
  )
}

// 创建 tooltip 配置
function createTooltipConfig(value: number) {
  return {
    content: props.formatTooltip(value),
    placement: 'top' as const,
    trigger: 'mouseenter' as const,
    delay: [0, 1000] as [number, number],
    key: dotX.value,
  }
}

// 左侧滑块的 tooltip 配置
const leftDotTooltip = computed(() =>
  createTooltipConfig(getInternalValueAt(0, getMin.value)),
)

// 右侧滑块的 tooltip 配置
const rightDotTooltip = computed(() =>
  createTooltipConfig(getInternalValueAt(1, getMax.value)),
)

// 左侧禁用区域样式
const leftDisabledAreaStyle = computed(() => ({
  width: `${getMarkPosition(getMin.value)}%`,
}))

// 右侧禁用区域样式
const rightDisabledAreaStyle = computed(() => ({
  width: `${100 - getMarkPosition(getMax.value)}%`,
}))

// 步进标签样式
function createStepLabelStyle(value: number | string) {
  return {
    left: `${getMarkPosition(value)}%`,
    top: `calc(var(--lew-slider-height) - 20px)`,
  }
}

// 步进标记样式
function createStepMarkStyle(value: number | string) {
  return {
    left: `${getMarkPosition(value)}%`,
  }
}

// 左侧滑块的样式
const leftDotStyle = computed(() => ({
  opacity: getInternalValueAt(0, getMin.value) !== undefined ? '1' : '0',
}))

// 右侧滑块的样式
const rightDotStyle = computed(() => ({
  opacity: getInternalValueAt(1, getMax.value) !== undefined ? '1' : '0',
}))
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
        :style="leftDisabledAreaStyle"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-left"
        @click.stop
      />
      <div
        :style="rightDisabledAreaStyle"
        class="lew-slider-track-disabled-area lew-slider-track-disabled-area-right"
        @click.stop
      />

      <div class="lew-slider-track-line">
        <div
          class="lew-slider-track-line-range"
          :style="rangeAreaStyle"
        />
        <div
          class="lew-slider-track-line-selected"
          :style="selectedAreaStyle"
        />

        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-mark"
          :class="{
            'lew-slider-track-step-mark-selected': isStepMarkSelected(
              item.value,
            ),
          }"
          :style="createStepMarkStyle(item.value)"
        />
        <div
          v-for="(item, index) in options"
          :key="index"
          class="lew-slider-track-step-label"
          :style="createStepLabelStyle(item.value)"
        >
          <div
            class="lew-slider-track-step-label-text"
            :class="{
              'lew-slider-track-step-label-text-disabled': isStepLabelDisabled(
                item.value,
              ),
            }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
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
            ) /
            2 * -1
        )
      );
      border-radius: 50%;
      background-color: var(--lew-bgcolor-9);
      box-sizing: border-box;
    }
    .lew-slider-track-step-mark-selected {
      background-color: var(--lew-color-blue);
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
                        ) /
                        2 * -1
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
        transform: translate(
            calc(var(--lew-slider-track-dot-size) / 2 * -1),
            -50%
        );
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
        transform: translate(
                calc(var(--lew-slider-track-dot-size) / 2 * -1),
                -50%
            )
            scale(1.1);
    }
    .lew-slider-track-dot:active {
        transform: translate(
                calc(var(--lew-slider-track-dot-size) / 2 * -1),
                -50%
            )
            scale(1.05);
        border-width: 4px;
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
