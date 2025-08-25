<script lang="ts" setup>
import dayjs from "dayjs";
import { LewButton } from "lew-ui";

const props = defineProps({
  valueFormat: {
    type: String,
    default: "HH:mm:ss",
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
});
const emit = defineEmits(["change", "cancel"]);

// 时间选择器配置常量
const ITEM_HEIGHT = 28; // 每项的高度
const visibleCount = computed(() => props.visibleCount);
const containerHeight = computed(() => visibleCount.value * ITEM_HEIGHT);
const paddingHeight = computed(() => (containerHeight.value - ITEM_HEIGHT) / 2);

const timeValue = ref();
const hourRef = ref();
const minuteRef = ref();
const secondRef = ref();
const _timeValue = ref(""); // 预选时间

const timeState = reactive({
  hour: dayjs().hour(),
  minute: dayjs().minute(),
  second: dayjs().second(),
});

// 生成小时列表 (00-23)
const hourList = computed(() => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push({
      value: i,
      label: i.toString().padStart(2, "0"),
    });
  }
  return hours;
});

// 生成分钟列表 (00-59)
const minuteList = computed(() => {
  const minutes = [];
  for (let i = 0; i < 60; i++) {
    minutes.push({
      value: i,
      label: i.toString().padStart(2, "0"),
    });
  }
  return minutes;
});

// 生成秒钟列表 (00-59)
const secondList = computed(() => {
  const seconds = [];
  for (let i = 0; i < 60; i++) {
    seconds.push({
      value: i,
      label: i.toString().padStart(2, "0"),
    });
  }
  return seconds;
});

// 检查是否显示秒钟
const showSeconds = computed(() => {
  return props.valueFormat.includes("s");
});

// 移除高亮样式计算属性，依靠遮罩显示选中状态

function init(time: string | undefined = "") {
  if (time) {
    const parsedTime = dayjs(time, props.valueFormat);
    if (parsedTime.isValid()) {
      timeState.hour = parsedTime.hour();
      timeState.minute = parsedTime.minute();
      timeState.second = parsedTime.second();
    } else {
      const fallbackTime = dayjs(time);
      if (fallbackTime.isValid()) {
        timeState.hour = fallbackTime.hour();
        timeState.minute = fallbackTime.minute();
        timeState.second = fallbackTime.second();
      }
    }
  } else {
    const now = dayjs();
    timeState.hour = now.hour();
    timeState.minute = now.minute();
    timeState.second = now.second();
  }
  nextTick(() => {
    scrollToSelected(false); // 初始化时不使用滚动动画
  });
}

function selectHour(hour: number) {
  timeState.hour = hour; // 同时更新确认状态
  scrollToValue("hour", hour);
}

function selectMinute(minute: number) {
  timeState.minute = minute; // 同时更新确认状态
  scrollToValue("minute", minute);
}

function selectSecond(second: number) {
  timeState.second = second; // 同时更新确认状态
  scrollToValue("second", second);
}

function scrollToValue(type: string, value: number, smooth: boolean = true) {
  nextTick(() => {
    let ref = null;

    if (type === "hour") ref = hourRef.value;
    else if (type === "minute") ref = minuteRef.value;
    else if (type === "second") ref = secondRef.value;

    if (ref) {
      // 计算目标滚动位置：让指定的 value 项居中在遮罩中
      // 目标项的顶部位置 = padding + value * ITEM_HEIGHT
      // 要让目标项居中，需要滚动到：目标项顶部 - (容器高度/2 - ITEM_HEIGHT/2)
      const itemTop = paddingHeight.value + value * ITEM_HEIGHT;
      const containerCenter = containerHeight.value / 2;
      const itemCenter = ITEM_HEIGHT / 2;
      const targetScrollTop = itemTop - (containerCenter - itemCenter);

      ref.scrollTo({
        top: targetScrollTop,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  });
}

function getCurrentTime() {
  const now = dayjs();
  timeState.hour = now.hour();
  timeState.minute = now.minute();
  timeState.second = now.second();
  scrollToSelected();
}

function confirmTime() {
  timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat);

  emit("change", timeValue.value);
}

function cancelTime() {
  emit("cancel");
}

function scrollToSelected(smooth: boolean = true) {
  scrollToValue("hour", timeState.hour, smooth);
  scrollToValue("minute", timeState.minute, smooth);
  if (showSeconds.value) {
    scrollToValue("second", timeState.second, smooth);
  }
}

function handleScrollEnd(type: string, event: Event) {
  const target = event.target as HTMLElement;
  const scrollTop = target.scrollTop;

  // 计算当前滚动位置对应的索引（与 onScroll 保持一致）
  const containerCenter = containerHeight.value / 2;
  const itemCenter = ITEM_HEIGHT / 2;
  const adjustedScrollTop = scrollTop + (containerCenter - itemCenter);
  const currentIndex = Math.round(
    (adjustedScrollTop - paddingHeight.value) / ITEM_HEIGHT
  );

  // 限制索引范围并获取有效索引
  let validIndex = currentIndex;
  if (type === "hour") {
    validIndex = Math.max(0, Math.min(23, currentIndex));
  } else if (type === "minute") {
    validIndex = Math.max(0, Math.min(59, currentIndex));
  } else if (type === "second") {
    validIndex = Math.max(0, Math.min(59, currentIndex));
  }

  // 计算对齐后的滚动位置（与 scrollToValue 保持一致）
  const itemTop = paddingHeight.value + validIndex * ITEM_HEIGHT;
  const alignedScrollTop = itemTop - (containerCenter - itemCenter);

  // 如果当前位置与对齐位置不同，则滚动到对齐位置
  if (Math.abs(scrollTop - alignedScrollTop) > 2) {
    target.scrollTo({
      top: alignedScrollTop,
      behavior: "smooth",
    });
  }

  _timeValue.value = dayjs()
    .hour(timeState.hour)
    .minute(timeState.minute)
    .second(timeState.second)
    .format(props.valueFormat);
}

let scrollTimer: any = null;

function onScroll(type: string, event: Event) {
  // 实时更新时间显示（无防抖）
  const target = event.target as HTMLElement;
  const scrollTop = target.scrollTop;

  // 计算当前滚动位置对应的索引
  // 考虑到遮罩在容器中心，需要加上偏移量
  const containerCenter = containerHeight.value / 2;
  const itemCenter = ITEM_HEIGHT / 2;
  const adjustedScrollTop = scrollTop + (containerCenter - itemCenter);
  const currentIndex = Math.round(
    (adjustedScrollTop - paddingHeight.value) / ITEM_HEIGHT
  );

  // 实时更新临时状态（用于显示）
  if (type === "hour") {
    const value = Math.max(0, Math.min(23, currentIndex));
    timeState.hour = value;
  } else if (type === "minute") {
    const value = Math.max(0, Math.min(59, currentIndex));
    timeState.minute = value;
  } else if (type === "second") {
    const value = Math.max(0, Math.min(59, currentIndex));
    timeState.second = value;
  }

  // 防抖处理滚动结束对齐
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    handleScrollEnd(type, event);
  }, 150); // 减少防抖时间，提高响应性
}

defineExpose({ init });
</script>

<template>
  <div class="lew-time">
    <div class="lew-time-control">
      <div class="cur-time">
        {{ _timeValue }}
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
        <div
          ref="hourRef"
          class="lew-time-list"
          @scroll="onScroll('hour', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="hour in hourList"
            :key="hour.value"
            :data-value="hour.value"
            class="lew-time-item"
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
        <div
          ref="minuteRef"
          class="lew-time-list"
          @scroll="onScroll('minute', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="minute in minuteList"
            :key="minute.value"
            :data-value="minute.value"
            class="lew-time-item"
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
        <div
          ref="secondRef"
          class="lew-time-list"
          @scroll="onScroll('second', $event)"
        >
          <div class="lew-time-padding" />
          <div
            v-for="second in secondList"
            :key="second.value"
            :data-value="second.value"
            class="lew-time-item"
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
    height: v-bind("`${containerHeight}px`"); // 动态计算高度
    background: var(--lew-bgcolor-1);
    overflow: hidden;

    .lew-time-mask {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: v-bind("`${ITEM_HEIGHT}px`"); // 遮罩高度与项目高度一致
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
      height: 70px;
      z-index: 99;
      pointer-events: none;
    }

    .lew-time-gradient-top {
      top: 0;
      background-image: linear-gradient(
        to top,
        transparent 0%,
        var(--lew-bgcolor-0)
      );
    }

    .lew-time-gradient-bottom {
      bottom: 0;
      background-image: linear-gradient(
        to bottom,
        transparent 0%,
        var(--lew-bgcolor-0)
      );
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
          height: v-bind("`${paddingHeight}px`"); // 动态计算 padding 高度
          flex-shrink: 0;
        }

        .lew-time-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: v-bind("`${ITEM_HEIGHT}px`"); // 使用动态高度
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
            height: v-bind("`${ITEM_HEIGHT}px`"); // 使用动态高度
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
    margin-top: 5px;

    .lew-button {
      min-width: 60px;
      height: 28px;
      font-size: 12px;
    }
  }
}
</style>
