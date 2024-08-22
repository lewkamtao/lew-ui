<script lang="ts" setup>
import type { Ref } from 'vue'
import { getMonthDate, getHeadDate } from './date'
import type { RetType, RetItemType } from './date'
import { dateProps } from './props'
import dayjs from 'dayjs'
import { object2class } from 'lew-ui/utils'
import { LewFlex, LewButton } from 'lew-ui'

const emit = defineEmits(['change'])
const props = defineProps(dateProps)
const modelValue: Ref<string | undefined> = defineModel()

// 获取当前年份
const _year = dayjs().year()
// 获取当前月份
const _month = dayjs().month() + 1

const dateData: Ref<RetType> = ref(getMonthDate())

const dateState = reactive({
  year: _year,
  month: _month
})

const setMonthDate = () => {
  dateData.value = getMonthDate(dateState.year, dateState.month)
}

const init = (date: string | undefined = '') => {
  dateState.year = dayjs(date || undefined).year()
  dateState.month = dayjs(date || undefined).month() + 1
  setMonthDate()
}

init(modelValue.value)

defineExpose({ init })

const prveMonth = () => {
  if (dateState.month > 1) {
    dateState.month -= 1
  } else {
    dateState.year -= 1
    dateState.month = 12
  }
  setMonthDate()
}

const nextMonth = () => {
  if (dateState.month < 12) {
    dateState.month += 1
  } else {
    dateState.year += 1
    dateState.month = 1
  }
  setMonthDate()
}

const prveYear = () => {
  dateState.year -= 1
  setMonthDate()
}

const nextYear = () => {
  dateState.year += 1
  setMonthDate()
}

const selectDateFn = (item: RetItemType) => {
  const v = `${item.year}-${item.month}-${item.showDate}`
  let _v = dayjs(v).format(props.valueFormat)
  modelValue.value = _v
  emit('change', _v)
}

const checkToday = computed(() => (item: RetItemType) => {
  const today = dayjs()
  return today.isSame(dayjs(`${item.year}-${item.month}-${item.date}`), 'day')
})

const lewDateItemClassNames = computed(() => (item: RetItemType) => {
  let e = item.date === item.showDate
  let selected = false
  if (item.date > 0 && item.date <= item.showDate) {
    const v = `${dateState.year}-${dateState.month}-${item.showDate}`
    selected = dayjs(v).isSame(dayjs(modelValue.value))
  }
  return object2class('lew-date-item', { e, selected })
})
</script>
<template>
  <div class="lew-date">
    <lew-flex x="start" mode="between" class="lew-date-control">
      <div class="lew-date-control-left">
        <!-- 上一年 -->
        <lew-button type="light" icon="chevrons-left" round @click="prveYear" />
        <!-- 上一月 -->
        <lew-button type="light" icon="chevron-left" round @click="prveMonth" />
      </div>
      <!-- 日期 -->
      <div class="cur-date">{{ dateState.year }} 年 {{ dateState.month }} 月</div>
      <div class="lew-date-control-right">
        <!-- 下一月 -->
        <lew-button type="light" icon="chevron-right" round @click="nextMonth" />
        <!-- 下一年 -->
        <lew-button type="light" icon="chevrons-right" round @click="nextYear" />
      </div>
    </lew-flex>
    <div class="lew-date-box">
      <!-- 表头 周 -->
      <div v-for="(item, index) in getHeadDate" :key="`h${index}`" class="lew-date-item">
        <div class="lew-date-num">{{ item }}</div>
      </div>

      <!-- 表格 -->
      <div
        v-for="(item, index) in dateData"
        :key="`d${index}`"
        class="lew-date-item"
        :class="lewDateItemClassNames(item)"
        @click="selectDateFn(item)"
      >
        <div class="lew-date-label">
          <i v-if="checkToday(item)" class="lew-date-item-today"></i>
          <div class="lew-date-value">
            {{ item.showDate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-date {
  width: 280px;
  user-select: none;
  padding: 15px;
  box-sizing: border-box;

  .lew-date-control {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 5px;
    box-sizing: border-box;
    height: 30px;
    margin-bottom: 10px;

    .cur-date {
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: bold;
      font-size: 15px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
    }

    .lew-date-control-left,
    .lew-date-control-right {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .lew-button {
      min-width: auto;
      width: 26px;
      height: 26px;

      svg {
        width: 16px;
        margin-right: 0px;
      }
    }
  }

  .lew-date-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;

    .lew-date-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 7);
      height: 36px;
      line-height: 36px;

      .lew-date-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100%;
        height: 24px;
        box-sizing: border-box;
        transition: all 0.1s ease;

        .lew-date-value {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          line-height: 24px;
          color: var(--lew-text-color-7);
          border-radius: 50%;
          transition: all 0.1s ease;
          border: var(--lew-form-border-width)  var(--lew-form-border-color) solid;
        }
        .lew-date-value:active {
          transform: scale(1.1);
        }
      }
    }

    .lew-date-item-e {
      cursor: pointer;

      .lew-date-label {
        .lew-date-value {
          color: var(--lew-text-color-1);
        }
      }
    }

    .lew-date-item-today {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba($color: #19c175, $alpha: 0.8);
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
      box-shadow: 0px 0px 12px #0e7346;
    }

    .lew-date-item-e:hover {
      .lew-date-label {
        .lew-date-value {
          background-color: var(--lew-color-primary-light);
          color: var(--lew-color-primary-dark);
        }
      }
    }

    .lew-date-item-e:active {
      .lew-date-label {
        .lew-date-value {
          transform: scale(0.9);
        }
      }
    }

    .lew-date-item-selected {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
          border: var(--lew-form-border-width)  var(--lew-color-primary-light) solid;
        }
      }
    }
    .lew-date-item-selected:active {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
          border: var(--lew-form-border-width)  var(--lew-color-primary-light) solid;
        }
      }
    }
    .lew-date-item-selected:hover {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
          border: var(--lew-form-border-width)  var(--lew-color-primary-light) solid;
        }
      }
    }
  }
}
</style>
