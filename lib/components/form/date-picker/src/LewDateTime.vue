<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewButton } from 'lew-ui'
import LewDate from './LewDate.vue'
import LewTime from './LewTime.vue'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss',
  },
})

const emit = defineEmits(['change', 'cancel'])

const dateRef = ref()
const timeRef = ref()

// 本地追踪已选中的日期，避免在模板中调用子组件方法导致跨组件响应式追踪
const selectedDate = ref('')

// 获取日期格式
const dateFormat = computed(() => {
  return props.valueFormat.replace(/\s*H+:?m*:?s*\s*/g, '').trim() || 'YYYY-MM-DD'
})

// 获取时间格式
const timeFormat = computed(() => {
  // 更精确的时间格式匹配
  const timeMatch = props.valueFormat.match(/H+:?m*:?s*/g)
  if (timeMatch) {
    const matched = timeMatch[0]
    // 如果匹配到的是 HH:mm 格式，确保返回 HH:mm
    if (matched.includes('H') && matched.includes('m') && !matched.includes('s')) {
      return 'HH:mm'
    }
    return matched
  }
  return 'HH:mm:ss'
})

function onDateChange(value: string) {
  selectedDate.value = value
}

function init(value: string | undefined = '') {
  if (value) {
    const parsedDateTime = dayjs(value, props.valueFormat)
    if (parsedDateTime.isValid()) {
      selectedDate.value = parsedDateTime.format(dateFormat.value)
      nextTick(() => {
        dateRef.value?.init(parsedDateTime.format(dateFormat.value))
        timeRef.value?.init(parsedDateTime.format(timeFormat.value))
      })
    }
    else {
      // 尝试使用默认解析
      const fallbackDateTime = dayjs(value)
      if (fallbackDateTime.isValid()) {
        selectedDate.value = fallbackDateTime.format(dateFormat.value)
        nextTick(() => {
          dateRef.value?.init(fallbackDateTime.format(dateFormat.value))
          timeRef.value?.init(fallbackDateTime.format(timeFormat.value))
        })
      }
    }
  }
  else {
    // 无预设值时默认选中今日，与日历视觉保持一致
    const now = dayjs()
    selectedDate.value = now.format(dateFormat.value)
    nextTick(() => {
      dateRef.value?.init(now.format(dateFormat.value))
      timeRef.value?.init(now.format(timeFormat.value))
    })
  }
}

function confirmDateTime() {
  // 在事件处理函数中调用 getValue() 是安全的，不会产生响应式追踪问题
  const date = dateRef.value?.getValue() || ''
  const time = timeRef.value?.getValue() || ''
  if (date && time) {
    emit('change', `${date} ${time}`)
  }
}

function initNow() {
  const now = dayjs()
  // 点击"现在"即为显式选择当前日期，启用确认按钮
  selectedDate.value = now.format(dateFormat.value)
  nextTick(() => {
    dateRef.value?.init(now.format(dateFormat.value))
    timeRef.value?.initCurrentTime()
  })
}

function cancelDateTime() {
  emit('cancel')
}

defineExpose({ init })
</script>

<template>
  <div class="lew-datetime">
    <!-- 内容面板 - 左右布局 -->
    <div class="lew-datetime-content">
      <!-- 日期面板 -->
      <div class="lew-datetime-panel lew-datetime-date-panel">
        <LewDate ref="dateRef" :value-format="dateFormat" @change="onDateChange" />
      </div>

      <!-- 时间面板 -->
      <div class="lew-datetime-panel lew-datetime-time-panel">
        <LewTime
          ref="timeRef"
          :visible-count="9"
          :value-format="timeFormat"
          :show-actions="false"
        />
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="lew-datetime-actions">
      <div class="lew-datetime-actions-left">
        <LewButton type="light" color="gray" size="mini" @click="initNow">
          现在
        </LewButton>
      </div>
      <div class="lew-datetime-actions-right">
        <LewButton type="light" color="gray" size="mini" @click="cancelDateTime">
          取消
        </LewButton>
        <LewButton
          :disabled="!selectedDate"
          type="fill"
          color="primary"
          size="mini"
          @click="confirmDateTime"
        >
          确定
        </LewButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-datetime {
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-box-shadow);
  user-select: none;
  overflow: hidden;

  // 移除头部样式

  // 移除标签页样式，改为左右布局

  .lew-datetime-content {
    position: relative;
    display: flex;
    gap: 1px;

    .lew-datetime-panel {
      flex: 1;

      &.lew-datetime-date-panel {
        :deep(.lew-date) {
          box-shadow: none;
          border-radius: 0;
          padding: 8px;
        }
      }

      &.lew-datetime-time-panel {
        :deep(.lew-time) {
          box-shadow: none;
          border-radius: 0;
          padding: 12px;
          height: auto;

          .lew-time-control {
            display: flex;
            justify-content: center;

            .lew-button {
              display: none;
            }
          }

          .lew-time-actions {
            display: none; // 隐藏时间组件自己的操作按钮，使用统一的底部按钮
          }
        }
      }

      // 当只有一个面板时占满宽度
      &:only-child {
        flex: none;
        width: 100%;
      }
    }
  }

  .lew-datetime-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px 12px 12px;

    .lew-datetime-actions-left {
      display: flex;
      align-items: center;
    }

    .lew-datetime-actions-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .lew-button {
      min-width: 60px;
      height: 28px;
      font-size: 12px;
    }
  }
}

// 响应式适配
@media (max-width: 640px) {
  .lew-datetime {
    .lew-datetime-content {
      flex-direction: column;
      gap: 1px;

      .lew-datetime-panel {
        &.lew-datetime-date-panel {
          :deep(.lew-date) {
            padding: 6px;
          }
        }

        &.lew-datetime-time-panel {
          :deep(.lew-time) {
            padding: 6px;
            // 移动端时间容器高度由 visibleCount 动态计算，无需固定
          }
        }
      }
    }

    .lew-datetime-actions {
      padding: 10px 12px;

      .lew-button {
        min-width: 50px;
        height: 28px;
        font-size: 11px;
      }
    }
  }
}
</style>
