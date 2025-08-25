<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewButton } from 'lew-ui'
import { object2class } from 'lew-ui/utils'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'HH:mm:ss',
  },
})
const emit = defineEmits(['change', 'confirm', 'cancel'])

const timeValue = ref()
const hourRef = ref()
const minuteRef = ref()
const secondRef = ref()

const timeState = reactive({
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  second: dayjs().second(),
})

const tempTimeState = reactive({
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  second: dayjs().second(),
})

// 生成小时列表 (00-23)
const hourList = computed(() => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push({
      value: i,
      label: i.toString().padStart(2, '0'),
    })
  }
  return hours
})

// 生成分钟列表 (00-59)
const minuteList = computed(() => {
  const minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push({
      value: i,
      label: i.toString().padStart(2, '0'),
    })
  }
  return minutes
})

// 生成秒钟列表 (00-59)
const secondList = computed(() => {
  const seconds = []
  for (let i = 0; i < 60; i++) {
    seconds.push({
      value: i,
      label: i.toString().padStart(2, '0'),
    })
  }
  return seconds
})

// 检查是否显示秒钟
const showSeconds = computed(() => {
  return props.valueFormat.includes('s')
})

const lewTimeItemClassNames = computed(() => (type: string, value: number) => {
  let selected = false
  if (type === 'hour')
    selected = tempTimeState.hour === value
  if (type === 'minute')
    selected = tempTimeState.minute === value
  if (type === 'second')
    selected = tempTimeState.second === value
  return object2class('lew-time-item', { selected })
})

function init(time: string | undefined = '') {
  if (time) {
    const parsedTime = dayjs(time, props.valueFormat)
    if (parsedTime.isValid()) {
      timeState.hour = parsedTime.hour()
      timeState.minute = parsedTime.minute()
      timeState.second = parsedTime.second()
      tempTimeState.hour = parsedTime.hour()
      tempTimeState.minute = parsedTime.minute()
      tempTimeState.second = parsedTime.second()
    }
    else {
      const fallbackTime = dayjs(time)
      if (fallbackTime.isValid()) {
        timeState.hour = fallbackTime.hour()
        timeState.minute = fallbackTime.minute()
        timeState.second = fallbackTime.second()
        tempTimeState.hour = fallbackTime.hour()
        tempTimeState.minute = fallbackTime.minute()
        tempTimeState.second = fallbackTime.second()
      }
    }
  }
  else {
    const now = dayjs()
    timeState.hour = now.hour()
    timeState.minute = now.minute()
    timeState.second = now.second()
    tempTimeState.hour = now.hour()
    tempTimeState.minute = now.minute()
    tempTimeState.second = now.second()
  }
  nextTick(() => {
    scrollToSelected(false) // 初始化时不使用滚动动画
  })
}

function updateTimeValue() {
  timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat)
  emit('change', timeValue.value)
}

function selectHour(hour: number) {
  tempTimeState.hour = hour
  scrollToValue('hour', hour)
}

function selectMinute(minute: number) {
  tempTimeState.minute = minute
  scrollToValue('minute', minute)
}

function selectSecond(second: number) {
  tempTimeState.second = second
  scrollToValue('second', second)
}

function scrollToValue(type: string, value: number, smooth: boolean = true) {
  nextTick(() => {
    const itemHeight = 32
    const containerHeight = 208
    // padding应该等于容器高度的一半减去半个项目高度，这样第一个和最后一个项目都能居中
    const paddingHeight = containerHeight / 2 - itemHeight / 2
    let ref = null

    if (type === 'hour')
      ref = hourRef.value
    else if (type === 'minute')
      ref = minuteRef.value
    else if (type === 'second')
      ref = secondRef.value

    if (ref) {
      const centerOffset = containerHeight / 2
      // 计算目标位置：padding + 目标项的位置 - 容器中心偏移 + 项目中心偏移
      const targetScrollTop
        = paddingHeight + value * itemHeight - centerOffset + itemHeight / 2

      ref.scrollTo({
        top: targetScrollTop,
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  })
}

function getCurrentTime() {
  const now = dayjs()
  tempTimeState.hour = now.hour()
  tempTimeState.minute = now.minute()
  tempTimeState.second = now.second()
  scrollToSelected()
}

function confirmTime() {
  timeState.hour = tempTimeState.hour
  timeState.minute = tempTimeState.minute
  timeState.second = tempTimeState.second
  updateTimeValue()
  emit('confirm', timeValue.value)
}

function cancelTime() {
  // 恢复到之前的状态
  tempTimeState.hour = timeState.hour
  tempTimeState.minute = timeState.minute
  tempTimeState.second = timeState.second
  scrollToSelected()
  emit('cancel')
}

function scrollToSelected(smooth: boolean = true) {
  scrollToValue('hour', tempTimeState.hour, smooth)
  scrollToValue('minute', tempTimeState.minute, smooth)
  if (showSeconds.value) {
    scrollToValue('second', tempTimeState.second, smooth)
  }
}

function handleScrollEnd(type: string, event: Event) {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  const itemHeight = 32
  const containerHeight = 208
  const paddingHeight = containerHeight / 2 - itemHeight / 2
  const centerOffset = containerHeight / 2

  // 计算最近的对齐位置，考虑padding
  const centerIndex = Math.round(
    (scrollTop - paddingHeight + centerOffset - itemHeight / 2) / itemHeight,
  )
  const alignedScrollTop
    = paddingHeight + centerIndex * itemHeight - centerOffset + itemHeight / 2

  // 只在滚动结束时更新状态
  if (type === 'hour') {
    const value = Math.max(0, Math.min(23, centerIndex))
    tempTimeState.hour = value
  }
  else if (type === 'minute') {
    const value = Math.max(0, Math.min(59, centerIndex))
    tempTimeState.minute = value
  }
  else if (type === 'second') {
    const value = Math.max(0, Math.min(59, centerIndex))
    tempTimeState.second = value
  }

  target.scrollTo({
    top: alignedScrollTop,
    behavior: 'smooth',
  })
}

let scrollTimer: any = null

function onScroll(type: string, event: Event) {
  // 防抖处理滚动结束，减少防抖时间以提高响应性
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    handleScrollEnd(type, event)
  }, 250)
}

defineExpose({ init })
</script>

<template>
  <div class="lew-time">
    <div class="lew-time-control">
      <div class="cur-time">
        {{
          dayjs()
            .hour(tempTimeState.hour)
            .minute(tempTimeState.minute)
            .second(tempTimeState.second)
            .format(valueFormat)
        }}
      </div>
      <LewButton type="light" color="gray" size="mini" @click="getCurrentTime">
        现在
      </LewButton>
    </div>

    <div class="lew-time-container">
      <!-- 中心遮罩 -->
      <div class="lew-time-mask">
        <div class="lew-time-mask-content" />
      </div>

      <!-- 上下渐变遮罩 -->
      <div class="lew-time-gradient-top" />
      <div class="lew-time-gradient-bottom" />

      <!-- 小时列表 -->
      <div class="lew-time-column">
        <div ref="hourRef" class="lew-time-list" @scroll="onScroll('hour', $event)">
          <div class="lew-time-padding" />
          <div
            v-for="hour in hourList"
            :key="hour.value"
            :data-value="hour.value"
            class="lew-time-item"
            :class="lewTimeItemClassNames('hour', hour.value)"
            @click="selectHour(hour.value)"
          >
            <div class="lew-time-value">
              {{ hour.label }}
            </div>
          </div>
          <div class="lew-time-padding" />
        </div>
      </div>

      <!-- 分钟列表 -->
      <div class="lew-time-column">
        <div ref="minuteRef" class="lew-time-list" @scroll="onScroll('minute', $event)">
          <div class="lew-time-padding" />
          <div
            v-for="minute in minuteList"
            :key="minute.value"
            :data-value="minute.value"
            class="lew-time-item"
            :class="lewTimeItemClassNames('minute', minute.value)"
            @click="selectMinute(minute.value)"
          >
            <div class="lew-time-value">
              {{ minute.label }}
            </div>
          </div>
          <div class="lew-time-padding" />
        </div>
      </div>

      <!-- 秒钟列表 -->
      <div v-if="showSeconds" class="lew-time-column">
        <div ref="secondRef" class="lew-time-list" @scroll="onScroll('second', $event)">
          <div class="lew-time-padding" />
          <div
            v-for="second in secondList"
            :key="second.value"
            :data-value="second.value"
            class="lew-time-item"
            :class="lewTimeItemClassNames('second', second.value)"
            @click="selectSecond(second.value)"
          >
            <div class="lew-time-value">
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
  height: 312px;
  user-select: none;
  padding: 12px;
  box-sizing: border-box;

  .lew-time-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    height: 28px;
    margin-bottom: 12px;

    .cur-time {
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
    }
  }

  .lew-time-container {
    position: relative;
    display: flex;
    height: 208px;
    background: var(--lew-bgcolor-1);
    overflow: hidden;

    .lew-time-mask {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 32px;
      transform: translateY(-50%);
      z-index: 2;
      pointer-events: none;
      margin: 0 6px;
      mix-blend-mode: multiply;

      .lew-time-mask-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--lew-form-bgcolor-hover);
        border-radius: var(--lew-border-radius-small);
      }
    }

    // 上下渐变遮罩
    .lew-time-gradient-top,
    .lew-time-gradient-bottom {
      position: absolute;
      left: 0;
      right: 0;
      height: 24px;
      z-index: 99;
      pointer-events: none;
    }

    .lew-time-gradient-top {
      top: 0;
      background-image: linear-gradient(to top, transparent 0%, var(--lew-bgcolor-0));
    }

    .lew-time-gradient-bottom {
      bottom: 0;
      background-image: linear-gradient(to bottom, transparent 0%, var(--lew-bgcolor-0));
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

        .lew-time-padding {
          height: calc(208px / 2 - 32px / 2);
          /* 104px - 16px = 88px，让第一个和最后一个项目都能居中 */
          flex-shrink: 0;
        }

        .lew-time-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          cursor: pointer;
          color: var(--lew-text-color-2);
          transition: all 0.2s ease;
          flex-shrink: 0;
          scroll-snap-align: center;
          position: relative;

          .lew-time-value {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 32px;
            font-size: 14px;
            transition: all 0.2s ease;
            position: relative;
            z-index: 1;
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
    margin-top: 12px;

    .lew-button {
      min-width: 60px;
      height: 28px;
      font-size: 12px;
    }
  }
}
</style>
