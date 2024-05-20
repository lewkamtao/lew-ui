<script lang="ts" setup>
import dayjs from 'dayjs'
import { getMonthDate, getHeadDate } from './date'
import type { RetItemType } from './date'

import { dateRangeProps } from './props'
import { LewFlex, LewButton } from 'lew-ui'
import { cloneDeep } from 'lodash-es'

const emit = defineEmits(['change'])
const props = defineProps(dateRangeProps)
const modelValue: Ref<any> = defineModel()
const hoverValue: Ref<any> = ref(toRaw(modelValue.value))
const { startKey, endKey } = props

// 获取当天日期对象
const today = new Date()
// 获取当前年份
const curYear = today.getFullYear()
// 获取当前月份
const curMonth = today.getMonth() + 1
const curDay = today.getDate()
const _curDate = dayjs(`${curYear}-${curMonth}-${curDay}`)

const dateState = reactive({
  year1: 0,
  year2: 0,
  month1: 0,
  month2: 0
})

const state = reactive({
  leftPanel: getMonthDate(1),
  rightPanel: getMonthDate(2)
})

const prveMonth1 = () => {
  if (dateState.month1 > 1) {
    dateState.month1 -= 1
  } else {
    dateState.year1 -= 1
    dateState.month1 = 12
  }
  setMonthDate('left')
}

const nextMonth1 = () => {
  if (dateState.month1 < 12) {
    dateState.month1 += 1
  } else {
    dateState.year1 += 1
    dateState.month1 = 1
  }
  if (dateState.year1 > dateState.year2) {
    dateState.year2 = dateState.year1
  }
  if (dateState.year1 === dateState.year2 && dateState.month1 >= dateState.month2) {
    if (dateState.month1 === 12) {
      dateState.month2 = 1
      dateState.year2 += 1
    } else {
      dateState.month2 = dateState.month1 + 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}
const prveMonth2 = () => {
  if (dateState.month2 > 1) {
    dateState.month2 -= 1
  } else {
    dateState.year2 -= 1
    dateState.month2 = 12
  }
  if (dateState.year2 < dateState.year1) {
    dateState.year1 = dateState.year2
  }
  if (dateState.year1 === dateState.year2 && dateState.month2 <= dateState.month1) {
    if (dateState.month2 === 1) {
      dateState.month1 = 12
      dateState.year1 -= 1
    } else {
      dateState.month1 = dateState.month2 - 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}

const nextMonth2 = () => {
  if (dateState.month2 < 12) {
    dateState.month2 += 1
  } else {
    dateState.year2 += 1
    dateState.month2 = 1
  }
  setMonthDate('right')
}

const prveYear1 = () => {
  dateState.year1 -= 1
  setMonthDate('left')
}

const nextYear1 = () => {
  dateState.year1 += 1
  if (dateState.year1 > dateState.year2) {
    dateState.year2 = dateState.year1
  }
  if (dateState.year1 === dateState.year2 && dateState.month1 >= dateState.month2) {
    if (dateState.month1 === 12) {
      dateState.month2 = 1
      dateState.year2 += 1
    } else {
      dateState.month2 = dateState.month1 + 1
    }
  }

  setMonthDate('left')
  setMonthDate('right')
}
const prveYear2 = () => {
  dateState.year2 -= 1
  if (dateState.year2 < dateState.year1) {
    dateState.year1 = dateState.year2
  }
  if (dateState.year1 === dateState.year2 && dateState.month2 <= dateState.month1) {
    if (dateState.month2 === 1) {
      dateState.month1 = 12
      dateState.year1 -= 1
    } else {
      dateState.month1 = dateState.month2 - 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}

const nextYear2 = () => {
  dateState.year2 += 1
  setMonthDate('right')
}

const setMonthDate = (type: string) => {
  if (type === 'left') {
    state.leftPanel = getMonthDate(dateState.year1, dateState.month1)
  } else {
    state.rightPanel = getMonthDate(dateState.year2, dateState.month2)
  }
}

setMonthDate('left')
setMonthDate('right')

let i = 0
let startBackup = ''
const hoverValueFn = (item: RetItemType) => {
  if (item.date != item.showDate || i % 2 === 0) {
    return
  }
  const end = `${item.year}-${item.month}-${item.showDate}`
  hoverValue.value = {
    [startKey]: startBackup,
    [endKey]: end
  }
}

const setValue = (item: RetItemType) => {
  i += 1

  if (!hoverValue.value) {
    return
  }

  if (item.date != item.showDate) {
    return
  }
  const __dateStr = `${item.year}-${item.month}-${item.showDate}`
  const __date = dayjs(__dateStr)
  if (i % 2 === 0) {
    if (__date.isBefore(dayjs(hoverValue.value[startKey]))) {
      hoverValue.value[startKey] = dayjs(__dateStr).format(props.valueFormat)
      hoverValue.value[endKey] = dayjs(startBackup).format(props.valueFormat)
    } else {
      hoverValue.value[startKey] = dayjs(startBackup).format(props.valueFormat)
      hoverValue.value[endKey] = dayjs(__dateStr).format(props.valueFormat)
    }
    modelValue.value = cloneDeep(hoverValue.value)
    emit('change', hoverValue.value)
  } else {
    hoverValue.value[startKey] = __dateStr
    hoverValue.value[endKey] = ''
    startBackup = __dateStr
  }
}

const object2class = computed(() => (type: string, item: RetItemType) => {
  if (!item.year || !item.month || !item.showDate) {
    return
  }

  const _date = dayjs(`${item.year}-${item.month}-${item.showDate}`)
  const hoverStart = dayjs(hoverValue.value?.start)
  const hoverEnd = dayjs(hoverValue.value?.end)

  switch (type) {
    case 'today':
      if (_curDate.isSame(_date) && item.date === item.showDate) {
        return true
      }
      break
    case 'rangeMonth':
      if (item.date === item.showDate) {
        return 'lew-date-item-curMonth'
      }
      break
    case 'notRangeMonth':
      if (item.date !== item.showDate) {
        return ''
      }
      break
    case 'selected':
      if ((hoverStart.isSame(_date) || hoverEnd.isSame(_date)) && item.date === item.showDate) {
        return 'lew-date-value-selected'
      }
      break
    case 'rangeSelected':
      if (item.date !== item.showDate) {
        return
      }
      if (hoverStart.isSame(_date)) {
        if (hoverStart.isAfter(hoverEnd)) {
          return 'lew-date-label-selected-end'
        }
        return 'lew-date-label-selected-start'
      }
      if (hoverEnd.isSame(_date)) {
        if (hoverStart.isAfter(hoverEnd)) {
          return 'lew-date-label-selected-start'
        }
        return 'lew-date-label-selected-end'
      }
      if (hoverStart.isBefore(hoverEnd)) {
        if (hoverStart.isBefore(_date) && hoverEnd.isAfter(_date) && item.date === item.showDate) {
          return 'lew-date-label-selected'
        }
      } else if (hoverEnd.isBefore(_date) && hoverStart.isAfter(_date)) {
        return 'lew-date-label-selected'
      }
      break
    default:
      return ''
  }
})

const init = () => {
  let _value = cloneDeep(modelValue.value)

  if (!_value) {
    _value = {
      [startKey]: undefined,
      [endKey]: undefined
    }
  }

  hoverValue.value = _value

  // 年
  dateState.year1 = dayjs(_value[startKey]).year()
  // 月
  dateState.month1 = dayjs(_value[startKey]).month() + 1
  // 年
  dateState.year2 = dayjs(_value[endKey]).year()
  // 月
  dateState.month2 = dayjs(_value[endKey]).month() + 1
  if (dateState.year1 === dateState.year2 && dateState.month1 === dateState.month2) {
    dateState.month2 += 1
  }
  if (dateState.month2 > 12) {
    dateState.year2 += 1
    dateState.month2 = 1
  }
  setMonthDate('left')
  setMonthDate('right')
}

init()

defineExpose({ init })
</script>
<template>
  <div class="lew-date-range">
    <div class="lew-date">
      <lew-flex x="start" mode="between" class="lew-date-control">
        <div class="lew-date-control-left">
          <!-- 上一年 -->
          <lew-button type="light" icon="chevrons-left" @click="prveYear1" />
          <!-- 上一月 -->
          <lew-button type="light" icon="chevron-left" @click="prveMonth1" />
        </div>
        <!-- 日期 -->
        <div class="cur-date">{{ dateState.year1 }} 年 {{ dateState.month1 }} 月</div>
        <div class="lew-date-control-right">
          <!-- 下一月 -->
          <lew-button type="light" icon="chevron-right" @click="nextMonth1" />
          <!-- 下一年 -->
          <lew-button type="light" icon="chevrons-right" @click="nextYear1" />
        </div>
      </lew-flex>
      <div class="lew-date-box">
        <!-- 表头 周 -->
        <div v-for="(item, index) in getHeadDate" :key="`h${index}`" class="lew-date-item">
          <div class="lew-date-num">{{ item }}</div>
        </div>

        <!-- 表格 -->
        <div
          v-for="(item, index) in state.leftPanel"
          :key="`d${index}`"
          class="lew-date-item"
          :class="object2class('rangeMonth', item)"
          @click="setValue(item)"
          @mouseenter="hoverValueFn(item)"
        >
          <div class="lew-date-label" :class="object2class('rangeSelected', item)">
            <div v-if="object2class('today', item)" class="lew-date-item-today"></div>
            <div class="lew-date-value" :class="object2class('selected', item)">
              {{ item.showDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lew-date">
      <lew-flex x="start" mode="between" class="lew-date-control">
        <div class="lew-date-control-left">
          <!-- 上一年 -->
          <lew-button type="light" icon="chevrons-left" size="small" @click="prveYear2" />
          <!-- 上一月 -->
          <lew-button type="light" icon="chevron-left" size="small" @click="prveMonth2" />
        </div>
        <!-- 日期 -->
        <div class="cur-date">{{ dateState.year2 }} 年 {{ dateState.month2 }} 月</div>
        <div class="lew-date-control-right">
          <!-- 下一月 -->
          <lew-button type="light" icon="chevron-right" size="small" @click="nextMonth2" />
          <!-- 下一年 -->
          <lew-button type="light" icon="chevrons-right" size="small" @click="nextYear2" />
        </div>
      </lew-flex>
      <div class="lew-date-box">
        <!-- 表头 周 -->
        <div v-for="(item, index) in getHeadDate" :key="`h${index}`" class="lew-date-item">
          <div class="lew-date-num">{{ item }}</div>
        </div>

        <!-- 表格 -->
        <div
          v-for="(item, index) in state.rightPanel"
          :key="`d${index}`"
          class="lew-date-item"
          :class="object2class('rangeMonth', item)"
          @click="setValue(item)"
          @mouseenter="hoverValueFn(item)"
        >
          <div class="lew-date-label" :class="object2class('rangeSelected', item)">
            <div v-if="object2class('today', item)" class="lew-date-item-today"></div>
            <div class="lew-date-value" :class="object2class('selected', item)">
              {{ item.showDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-date-range {
  display: flex;
}

.lew-date {
  width: 273px;
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
      font-size: 15px;
      font-weight: bold;
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
      padding: 2px;
      width: 24px;
      height: 24px;

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

      .lew-date-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100%;
        height: 26px;
        box-sizing: border-box;
        transition: all 0.1s ease;

        .lew-date-value {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          line-height: 24px;
          color: var(--lew-text-color-7);
          border-radius: 50%;
          transition: all 0.1s ease;
          border: 2px var(--lew-form-border-color) solid;
        }

        .lew-date-value-selected {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
          border: 2px var(--lew-color-primary-light) solid;
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
      }

      .lew-date-label-selected-start {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 50%,
          var(--lew-color-primary-light) 51%,
          var(--lew-color-primary-light) 100%
        );
      }

      .lew-date-label-selected-end {
        background: linear-gradient(
          to right,
          var(--lew-color-primary-light) 0%,
          var(--lew-color-primary-light) 50%,
          rgba(0, 0, 0, 0) 51%,
          rgba(0, 0, 0, 0) 100%
        );
      }
    }

    .lew-date-item-curMonth {
      cursor: pointer;

      .lew-date-label {
        .lew-date-value {
          color: var(--lew-text-color-1);
        }

        .lew-date-value-selected {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
        }
      }

      .lew-date-label-selected {
        background: var(--lew-color-primary-light);

        .lew-date-value {
          color: var(--lew-text-color-0);
        }
      }
    }

    .lew-date-item-today:hover {
      .lew-date-label {
        .lew-date-value {
          position: relative;
          color: var(--lew-color-success-dark);
          font-weight: 900;
          background-color: var(--lew-color-success-light);
        }

        .lew-date-value-selected {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
        }
      }
    }

    .lew-date-item-curMonth:hover {
      .lew-date-label {
        .lew-date-value {
          background-color: var(--lew-color-primary-light);
          color: var(--lew-color-primary-dark);
        }

        .lew-date-value-selected {
          background: var(--lew-color-primary);
          color: var(--lew-color-white-text);
        }
      }
    }

    .lew-date-item-curMonth:active {
      .lew-date-label {
        .lew-date-value {
          transform: scale(0.9);
        }
      }
    }

    .lew-date-item-select {
      .lew-date-label {
        .lew-date-value {
          background-color: var(--lew-color-primary-light);
          color: var(--lew-color-primary-dark);
        }
      }
    }
  }
}

.lew-date:first-child {
  border-right: var(--lew-popover-border);
}
</style>
