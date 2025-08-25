<script lang="ts" setup>
import dayjs from "dayjs";
import { LewButton } from "lew-ui";
import LewDate from "./LewDate.vue";
import LewTime from "./LewTime.vue";

const props = defineProps({
  valueFormat: {
    type: String,
    default: "YYYY-MM-DD HH:mm:ss",
  },
});

const emit = defineEmits(["change", "confirm", "cancel"]);

const dateTimeValue = ref();
const dateRef = ref();
const timeRef = ref();

// 移除面板切换逻辑，改为同时显示

// 临时存储的日期和时间值
const tempDateTime = reactive({
  date: "",
  time: "",
});

// 检查格式是否包含时间
const hasTime = computed(() => {
  return (
    props.valueFormat.includes("H") ||
    props.valueFormat.includes("m") ||
    props.valueFormat.includes("s")
  );
});

// 检查格式是否包含日期
const hasDate = computed(() => {
  return (
    props.valueFormat.includes("Y") ||
    props.valueFormat.includes("M") ||
    props.valueFormat.includes("D")
  );
});

// 获取日期格式
const dateFormat = computed(() => {
  return (
    props.valueFormat.replace(/\s*H+:?m*:?s*\s*/g, "").trim() || "YYYY-MM-DD"
  );
});

// 获取时间格式
const timeFormat = computed(() => {
  const timeMatch = props.valueFormat.match(/H+:?m*:?s*/g);
  return timeMatch ? timeMatch[0] : "HH:mm:ss";
});

// 移除显示值计算属性，不再需要顶部显示

function init(value: string | undefined = "") {
  if (value) {
    const parsedDateTime = dayjs(value, props.valueFormat);
    if (parsedDateTime.isValid()) {
      if (hasDate.value) {
        tempDateTime.date = parsedDateTime.format(dateFormat.value);
      }
      if (hasTime.value) {
        tempDateTime.time = parsedDateTime.format(timeFormat.value);
      }
    } else {
      // 尝试使用默认解析
      const fallbackDateTime = dayjs(value);
      if (fallbackDateTime.isValid()) {
        if (hasDate.value) {
          tempDateTime.date = fallbackDateTime.format(dateFormat.value);
        }
        if (hasTime.value) {
          tempDateTime.time = fallbackDateTime.format(timeFormat.value);
        }
      }
    }
  } else {
    // 使用当前时间初始化
    const now = dayjs();
    if (hasDate.value) {
      tempDateTime.date = now.format(dateFormat.value);
    }
    if (hasTime.value) {
      tempDateTime.time = now.format(timeFormat.value);
    }
  }

  // 初始化子组件
  nextTick(() => {
    if (dateRef.value && hasDate.value) {
      dateRef.value.init(tempDateTime.date);
    }
    if (timeRef.value && hasTime.value) {
      timeRef.value.init(tempDateTime.time);
    }
  });
}

// 移除面板切换函数

function onDateChange(date: string) {
  tempDateTime.date = date;
  updateDateTime();
}

function onTimeChange(time: string) {
  tempDateTime.time = time;
  updateDateTime();
}

// 移除时间组件的确认取消逻辑，统一由底部按钮处理

function updateDateTime() {
  if (hasDate.value && hasTime.value) {
    // 日期时间模式
    if (tempDateTime.date && tempDateTime.time) {
      const combinedDateTime = dayjs(
        `${tempDateTime.date} ${tempDateTime.time}`
      );
      dateTimeValue.value = combinedDateTime.format(props.valueFormat);
    }
  } else if (hasDate.value && !hasTime.value) {
    // 仅日期模式
    if (tempDateTime.date) {
      dateTimeValue.value = dayjs(tempDateTime.date).format(props.valueFormat);
    }
  } else if (!hasDate.value && hasTime.value) {
    // 仅时间模式
    if (tempDateTime.time) {
      dateTimeValue.value = dayjs(tempDateTime.time, timeFormat.value).format(
        props.valueFormat
      );
    }
  }

  if (dateTimeValue.value) {
    emit("change", dateTimeValue.value);
  }
}

function confirmDateTime() {
  // 同时获取日期和时间的最新值
  if (hasDate.value && hasTime.value) {
    // 确保获取到最新的日期和时间值
    if (tempDateTime.date && tempDateTime.time) {
      const combinedDateTime = dayjs(
        `${tempDateTime.date} ${tempDateTime.time}`
      );
      dateTimeValue.value = combinedDateTime.format(props.valueFormat);
    }
  } else if (hasDate.value && !hasTime.value) {
    // 仅日期模式
    if (tempDateTime.date) {
      dateTimeValue.value = dayjs(tempDateTime.date).format(props.valueFormat);
    }
  } else if (!hasDate.value && hasTime.value) {
    // 仅时间模式
    if (tempDateTime.time) {
      dateTimeValue.value = dayjs(tempDateTime.time, timeFormat.value).format(
        props.valueFormat
      );
    }
  }

  emit("confirm", dateTimeValue.value);
}

function cancelDateTime() {
  // 取消时重置到初始值
  emit("cancel");
}

function getNow() {
  const now = dayjs();
  if (hasDate.value) {
    tempDateTime.date = now.format(dateFormat.value);
    if (dateRef.value) {
      dateRef.value.init(tempDateTime.date);
    }
  }
  if (hasTime.value) {
    tempDateTime.time = now.format(timeFormat.value);
    if (timeRef.value) {
      timeRef.value.init(tempDateTime.time);
    }
  }
  updateDateTime();
}

defineExpose({ init });
</script>

<template>
  <div class="lew-datetime">
    <!-- 内容面板 - 左右布局 -->
    <div class="lew-datetime-content">
      <!-- 日期面板 -->
      <div v-if="hasDate" class="lew-datetime-panel lew-datetime-date-panel">
        <LewDate
          ref="dateRef"
          :value-format="dateFormat"
          @change="onDateChange"
        />
      </div>

      <!-- 时间面板 -->
      <div v-if="hasTime" class="lew-datetime-panel lew-datetime-time-panel">
        <LewTime
          ref="timeRef"
          :visible-count="9"
          :value-format="timeFormat"
          @change="onTimeChange"
        />
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="lew-datetime-actions">
      <div class="lew-datetime-actions-left">
        <LewButton type="light" color="gray" size="mini" @click="getNow">
          现在
        </LewButton>
      </div>
      <div class="lew-datetime-actions-right">
        <LewButton
          type="light"
          color="gray"
          size="mini"
          @click="cancelDateTime"
        >
          取消
        </LewButton>
        <LewButton
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
  background: var(--lew-bgcolor-0);
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
    background: var(--lew-form-border-color);

    .lew-datetime-panel {
      flex: 1;
      background: var(--lew-bgcolor-0);

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
