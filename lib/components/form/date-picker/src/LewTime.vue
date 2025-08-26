<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewButton } from 'lew-ui'
import { debounce, throttle } from 'lodash-es'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'HH:mm:ss',
  },
  showActions: {
    type: Boolean,
    default: true,
  },
  visibleCount: {
    type: Number,
    default: 7,
    validator: (value: number) => value >= 3 && value % 2 === 1, // 必须是奇数且至少为3
  },
})
const emit = defineEmits(['change', 'cancel'])

// 时间选择器配置常量
const ITEM_HEIGHT = 28 // 每项的高度
const visibleCount = computed(() => props.visibleCount)
const containerHeight = computed(() => visibleCount.value * ITEM_HEIGHT)
const paddingHeight = computed(() => (containerHeight.value - ITEM_HEIGHT) / 2)

const timeValue = ref()
const hourRef = ref()
const minuteRef = ref()
const secondRef = ref()
const _timeValue = ref('') // 预选时间

const timeState = reactive({
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  second: dayjs().second(),
})

// 拖拽状态管理
const dragState = reactive({
  isDragging: false,
  startY: 0,
  startScrollTop: 0,
  currentType: '',
  currentRef: null as HTMLElement | null,
  hasMoved: false, // 标记是否发生了实际的拖拽移动
})

// 生成小时列表 (00-23)
function createTimeList(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    value: i,
    label: i.toString().padStart(2, '0'),
  }))
}

const hourList = computed(() => createTimeList(24))
const minuteList = computed(() => createTimeList(60))
const secondList = computed(() => createTimeList(60))

// 检查是否显示秒钟
const showSeconds = computed(() => props.valueFormat.includes('s'))

// 移除高亮样式计算属性，依靠遮罩显示选中状态

function init(time: string | undefined = '') {
  if (time) {
    const parsedTime = dayjs(time, props.valueFormat)
    if (parsedTime.isValid()) {
      timeState.hour = parsedTime.hour()
      timeState.minute = parsedTime.minute()
      timeState.second = parsedTime.second()
    }
    else {
      const fallbackTime = dayjs(time)
      if (fallbackTime.isValid()) {
        timeState.hour = fallbackTime.hour()
        timeState.minute = fallbackTime.minute()
        timeState.second = fallbackTime.second()
      }
    }
  }
  else {
    const now = dayjs()
    timeState.hour = now.hour()
    timeState.minute = now.minute()
    timeState.second = now.second()
  }
  nextTick(() => {
    scrollToSelected(false) // 初始化时不使用滚动动画
  })
}

function selectHour(hour: number) {
  // 如果发生了拖拽，则不执行点击选择
  if (dragState.hasMoved)
    return

  timeState.hour = hour // 同时更新确认状态
  scrollToValue('hour', hour)
}

function selectMinute(minute: number) {
  // 如果发生了拖拽，则不执行点击选择
  if (dragState.hasMoved)
    return

  timeState.minute = minute // 同时更新确认状态
  scrollToValue('minute', minute)
}

function selectSecond(second: number) {
  // 如果发生了拖拽，则不执行点击选择
  if (dragState.hasMoved)
    return

  timeState.second = second // 同时更新确认状态
  scrollToValue('second', second)
}

function scrollToValue(type: string, value: number, smooth: boolean = true) {
  const refMap = {
    hour: hourRef.value,
    minute: minuteRef.value,
    second: secondRef.value,
  }
  const ref = refMap[type as keyof typeof refMap]

  if (!ref)
    return

  nextTick(() => {
    const itemTop = paddingHeight.value + value * ITEM_HEIGHT
    const containerCenter = containerHeight.value / 2
    const itemCenter = ITEM_HEIGHT / 2
    const targetScrollTop = itemTop - (containerCenter - itemCenter)

    ref.scrollTo({
      top: targetScrollTop,
      behavior: smooth ? 'smooth' : 'auto',
    })
  })
}

function initCurrentTime() {
  const now = dayjs()
  timeState.hour = now.hour()
  timeState.minute = now.minute()
  timeState.second = now.second()
  scrollToSelected()
}

function confirmTime() {
  timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat)

  emit('change', timeValue.value)
}

function cancelTime() {
  emit('cancel')
}

function scrollToSelected(smooth: boolean = true) {
  scrollToValue('hour', timeState.hour, smooth)
  scrollToValue('minute', timeState.minute, smooth)
  if (showSeconds.value) {
    scrollToValue('second', timeState.second, smooth)
  }
}

// 鼠标/触摸拖拽开始
function handleDragStart(type: string, event: MouseEvent | TouchEvent) {
  event.preventDefault()

  let clientY: number
  if (event instanceof MouseEvent) {
    clientY = event.clientY
  }
  else {
    clientY = event.touches[0].clientY
  }

  let ref: HTMLElement | null = null
  if (type === 'hour')
    ref = hourRef.value
  else if (type === 'minute')
    ref = minuteRef.value
  else if (type === 'second')
    ref = secondRef.value

  if (!ref)
    return

  dragState.isDragging = true
  dragState.startY = clientY
  dragState.startScrollTop = ref.scrollTop
  dragState.currentType = type
  dragState.currentRef = ref
  dragState.hasMoved = false

  // 添加全局事件监听
  if (event instanceof MouseEvent) {
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
  }
}

// 鼠标/触摸拖拽移动
function handleDragMove(event: MouseEvent | TouchEvent) {
  if (!dragState.isDragging || !dragState.currentRef)
    return

  event.preventDefault()

  let clientY: number
  if (event instanceof MouseEvent) {
    clientY = event.clientY
  }
  else {
    clientY = event.touches[0].clientY
  }

  const deltaY = clientY - dragState.startY

  // 检测是否发生了实际的移动（超过最小阈值才算拖拽）
  const DRAG_THRESHOLD = 3 // 像素阈值
  if (Math.abs(deltaY) > DRAG_THRESHOLD) {
    dragState.hasMoved = true
  }

  const newScrollTop = dragState.startScrollTop - deltaY

  // 设置滚动位置
  dragState.currentRef.scrollTop = newScrollTop
}

// 拖拽结束
function handleDragEnd() {
  if (!dragState.isDragging)
    return

  // 直接调用滚动结束对齐，不需要创建假的事件对象
  if (dragState.currentRef) {
    // 创建一个简化的事件对象来触发滚动结束处理
    const scrollEvent = ({ target: dragState.currentRef } as unknown) as Event
    handleScrollEnd(dragState.currentType, scrollEvent)
  }

  // 重置拖拽状态
  dragState.isDragging = false
  dragState.startY = 0
  dragState.startScrollTop = 0
  dragState.currentType = ''
  dragState.currentRef = null

  // 延迟重置 hasMoved 状态，防止拖拽结束时立即触发点击事件
  setTimeout(() => {
    dragState.hasMoved = false
  }, 50)

  // 移除全局事件监听
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
}

function updateTimeFromScroll(type: string, target: HTMLElement) {
  const scrollTop = target.scrollTop
  const containerCenter = containerHeight.value / 2
  const itemCenter = ITEM_HEIGHT / 2
  const adjustedScrollTop = scrollTop + (containerCenter - itemCenter)
  const currentIndex = Math.round(
    (adjustedScrollTop - paddingHeight.value) / ITEM_HEIGHT,
  )

  const maxValues = { hour: 23, minute: 59, second: 59 }
  const value = Math.max(
    0,
    Math.min(maxValues[type as keyof typeof maxValues], currentIndex),
  );

  (timeState as any)[type] = value
  _timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat)
}

function handleScroll(type: string, event: Event) {
  if (dragState.isDragging)
    return
  updateTimeFromScroll(type, event.target as HTMLElement)
}

function handleScrollEnd(type: string, event: Event) {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  const containerCenter = containerHeight.value / 2
  const itemCenter = ITEM_HEIGHT / 2
  const adjustedScrollTop = scrollTop + (containerCenter - itemCenter)
  const currentIndex = Math.round(
    (adjustedScrollTop - paddingHeight.value) / ITEM_HEIGHT,
  )

  const maxValues = { hour: 23, minute: 59, second: 59 }
  const validIndex = Math.max(
    0,
    Math.min(maxValues[type as keyof typeof maxValues], currentIndex),
  )

  const itemTop = paddingHeight.value + validIndex * ITEM_HEIGHT
  const alignedScrollTop = itemTop - (containerCenter - itemCenter)

  if (Math.abs(scrollTop - alignedScrollTop) > 2) {
    target.scrollTo({ top: alignedScrollTop, behavior: 'smooth' })
  }

  _timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat)
}

const throttledHandleScroll = throttle(handleScroll, 250)
const debouncedHandleScrollEnd = debounce(handleScrollEnd, 250)

function onScroll(type: string, event: Event) {
  if (dragState.isDragging)
    return
  throttledHandleScroll(type, event)
  debouncedHandleScrollEnd(type, event)
}

function getValue() {
  return timeValue.value || _timeValue.value
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  throttledHandleScroll.cancel()
  debouncedHandleScrollEnd.cancel()
})

defineExpose({ init, initCurrentTime, getValue })
</script>

<template>
  <div class="lew-time">
    <div class="lew-time-control">
      <div class="cur-time">
        {{ _timeValue || "00:00:00" }}
      </div>
      <LewButton type="light" color="gray" size="mini" @click="initCurrentTime">
        现在
      </LewButton>
    </div>

    <div class="lew-time-container">
      <!-- 中心遮罩背景 -->
      <div class="lew-time-center-mask" />

      <!-- 上下渐变遮罩 -->
      <div class="lew-time-gradient-top" />
      <div class="lew-time-gradient-bottom" />

      <!-- 小时列表 -->
      <div class="lew-time-column">
        <div
          ref="hourRef"
          class="lew-time-list"
          @scroll="onScroll('hour', $event)"
          @mousedown="handleDragStart('hour', $event)"
          @touchstart="handleDragStart('hour', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="hour in hourList"
            :key="hour.value"
            :data-value="hour.value"
            class="lew-time-item"
            @click="selectHour(hour.value)"
          >
            <div class="lew-time-value" :data-text="hour.label">
              {{ hour.label }}
            </div>
          </div>
          <div class="lew-time-padding" />
        </div>
      </div>

      <!-- 分钟列表 -->
      <div class="lew-time-column">
        <div
          ref="minuteRef"
          class="lew-time-list"
          @scroll="onScroll('minute', $event)"
          @mousedown="handleDragStart('minute', $event)"
          @touchstart="handleDragStart('minute', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="minute in minuteList"
            :key="minute.value"
            :data-value="minute.value"
            class="lew-time-item"
            @click="selectMinute(minute.value)"
          >
            <div class="lew-time-value" :data-text="minute.label">
              {{ minute.label }}
            </div>
          </div>
          <div class="lew-time-padding" />
        </div>
      </div>

      <!-- 秒钟列表 -->
      <div v-if="showSeconds" class="lew-time-column">
        <div
          ref="secondRef"
          class="lew-time-list"
          @scroll="onScroll('second', $event)"
          @mousedown="handleDragStart('second', $event)"
          @touchstart="handleDragStart('second', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="second in secondList"
            :key="second.value"
            :data-value="second.value"
            class="lew-time-item"
            @click="selectSecond(second.value)"
          >
            <div class="lew-time-value" :data-text="second.label">
              {{ second.label }}
            </div>
          </div>
          <div class="lew-time-padding" />
        </div>
      </div>
    </div>

    <div class="lew-time-actions">
      <LewButton type="light" color="gray" size="mini" @click="cancelTime">
        取消
      </LewButton>
      <LewButton type="fill" color="primary" size="mini" @click="confirmTime">
        确定
      </LewButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-time {
  width: 220px;
  user-select: none;
  padding: 12px;
  box-sizing: border-box;

  .lew-time-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    margin-bottom: 5px;

    .cur-time {
      display: flex;
      align-items: center;
      font-size: 14px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
      letter-spacing: 1.7px;
    }
  }

  .lew-time-container {
    position: relative;
    display: flex;
    height: v-bind('`${containerHeight}px`'); // 动态计算高度
    overflow: hidden;

    // 中心遮罩背景
    .lew-time-center-mask {
      position: absolute;
      top: 50%;
      left: 6px;
      right: 6px;
      height: v-bind('`${ITEM_HEIGHT}px`');
      transform: translateY(-50%);
      background: var(--lew-form-bgcolor-hover);
      border-radius: var(--lew-border-radius-small);
      z-index: 1;
      pointer-events: none;
    }

    // 上下渐变遮罩
    .lew-time-gradient-top,
    .lew-time-gradient-bottom {
      position: absolute;
      left: 0;
      right: 0;
      height: 70px;
      z-index: 9;
      pointer-events: none;
    }

    .lew-time-gradient-top {
      top: 0;
      background-image: linear-gradient(to top, transparent 0%, var(--lew-pop-bgcolor));
    }

    .lew-time-gradient-bottom {
      bottom: 0;
      background-image: linear-gradient(to bottom, transparent 0%, var(--lew-pop-bgcolor));
    }

    .lew-time-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;

      .lew-time-list {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        cursor: grab;
        user-select: none;

        &:active {
          cursor: grabbing;
        }

        // 隐藏滚动条
        &::-webkit-scrollbar {
          display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;

        .lew-time-padding {
          height: v-bind('`${paddingHeight}px`'); // 动态计算 padding 高度
          flex-shrink: 0;
        }

        .lew-time-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: v-bind('`${ITEM_HEIGHT}px`'); // 使用动态高度
          cursor: pointer;
          color: var(--lew-text-color-2);
          transition: all 0.15s ease;
          flex-shrink: 0;
          scroll-snap-align: center;
          position: relative;

          .lew-time-value {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: v-bind('`${ITEM_HEIGHT}px`'); // 使用动态高度
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
            position: relative;
            z-index: 2;

            // 基础文字样式 - 使用较暗的颜色作为底色
            background: var(--lew-text-color-3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;

            // 高亮层 - 使用伪元素实现中心高亮效果
            &::after {
              content: attr(data-text);
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--lew-text-color-0);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;

              // 使用简单的遮罩，基于父容器的位置计算中心高亮区域
              mask-image: linear-gradient(
                to bottom,
                transparent 0%,
                transparent calc(50% - 14px),
                black calc(50% - 14px),
                black calc(50% + 14px),
                transparent calc(50% + 14px),
                transparent 100%
              );
              -webkit-mask-image: linear-gradient(
                to bottom,
                transparent 0%,
                transparent calc(50% - 14px),
                black calc(50% - 14px),
                black calc(50% + 14px),
                transparent calc(50% + 14px),
                transparent 100%
              );
            }
          }

          &:hover {
            .lew-time-value {
              transform: scale(1.05);
            }
          }

          &:active {
            .lew-time-value {
              transform: scale(0.95);
            }
          }
        }
      }

      // 悬浮时才显示滚动条
      .lew-time-list {
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
      }

      .lew-time-list:hover {
        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(var(--lew-text-color-rgb-1), 0.3);
          border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--lew-text-color-rgb-1), 0.5);
        }
      }
    }
  }

  .lew-time-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 5px;

    .lew-button {
      min-width: 60px;
      height: 28px;
      font-size: 12px;
    }
  }
}
</style>
