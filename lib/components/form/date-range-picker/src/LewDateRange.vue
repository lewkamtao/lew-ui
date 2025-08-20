<script lang="ts" setup>
import type { RetItemType } from '../../date-picker/src/date'
import dayjs from 'dayjs'
import { LewButton, LewFlex, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { cloneDeep } from 'lodash-es'
import { getMonthDate } from '../../date-picker/src/date'
import { dateRangeEmits } from './emits'
import { dateRangeProps } from './props'
// Props
const props = defineProps(dateRangeProps)

// Emits
const emit = defineEmits(dateRangeEmits)

// Model
const modelValue = defineModel<
  | {
    [key: string]: string
  }
  | undefined
>()

// Refs
const hoverValue = ref<{
  [key: string]: string
}>({})

// Destructuring
const { startKey, endKey } = props

// Constants
const today = new Date()
const curYear = today.getFullYear()
const curMonth = today.getMonth() + 1
const curDay = today.getDate()
const _curDate = dayjs(`${curYear}-${curMonth}-${curDay}`)

// Reactive state
const dateState = reactive({
  year1: 0,
  year2: 0,
  month1: 0,
  month2: 0,
})

const state = reactive({
  leftPanel: getMonthDate(1),
  rightPanel: getMonthDate(2),
})

// Computed
const object2class = computed(() => (type: string, item: RetItemType) => {
  if (!item.year || !item.month || !item.showDate) {
    return
  }

  const _date = dayjs(`${item.year}-${item.month}-${item.showDate}`)
  const hoverStart = dayjs(hoverValue.value[startKey])
  const hoverEnd = dayjs(hoverValue.value[endKey])

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
      if (
        (hoverStart.isSame(_date) || hoverEnd.isSame(_date))
        && item.date === item.showDate
      ) {
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
        if (
          hoverStart.isBefore(_date)
          && hoverEnd.isAfter(_date)
          && item.date === item.showDate
        ) {
          return 'lew-date-label-selected'
        }
      }
      else if (hoverEnd.isBefore(_date) && hoverStart.isAfter(_date)) {
        return 'lew-date-label-selected'
      }
      break
    default:
      return ''
  }
})

// Methods
function setMonthDate(type: string) {
  if (type === 'left') {
    state.leftPanel = getMonthDate(dateState.year1, dateState.month1)
  }
  else {
    state.rightPanel = getMonthDate(dateState.year2, dateState.month2)
  }
}

function prveMonth1() {
  if (dateState.month1 > 1) {
    dateState.month1 -= 1
  }
  else {
    dateState.year1 -= 1
    dateState.month1 = 12
  }
  setMonthDate('left')
}

function nextMonth1() {
  if (dateState.month1 < 12) {
    dateState.month1 += 1
  }
  else {
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
    }
    else {
      dateState.month2 = dateState.month1 + 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}

function prveMonth2() {
  if (dateState.month2 > 1) {
    dateState.month2 -= 1
  }
  else {
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
    }
    else {
      dateState.month1 = dateState.month2 - 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}

function nextMonth2() {
  if (dateState.month2 < 12) {
    dateState.month2 += 1
  }
  else {
    dateState.year2 += 1
    dateState.month2 = 1
  }
  setMonthDate('right')
}

function prveYear1() {
  dateState.year1 -= 1
  setMonthDate('left')
}

function nextYear1() {
  dateState.year1 += 1
  if (dateState.year1 > dateState.year2) {
    dateState.year2 = dateState.year1
  }
  if (dateState.year1 === dateState.year2 && dateState.month1 >= dateState.month2) {
    if (dateState.month1 === 12) {
      dateState.month2 = 1
      dateState.year2 += 1
    }
    else {
      dateState.month2 = dateState.month1 + 1
    }
  }

  setMonthDate('left')
  setMonthDate('right')
}

function prveYear2() {
  dateState.year2 -= 1
  if (dateState.year2 < dateState.year1) {
    dateState.year1 = dateState.year2
  }
  if (dateState.year1 === dateState.year2 && dateState.month2 <= dateState.month1) {
    if (dateState.month2 === 1) {
      dateState.month1 = 12
      dateState.year1 -= 1
    }
    else {
      dateState.month1 = dateState.month2 - 1
    }
  }
  setMonthDate('left')
  setMonthDate('right')
}

function nextYear2() {
  dateState.year2 += 1
  setMonthDate('right')
}

let i = 0
let startBackup = ''

function hoverValueFn(item: RetItemType) {
  if (item.date !== item.showDate || i % 2 === 0) {
    return
  }
  const end = `${item.year}-${item.month}-${item.showDate}`
  hoverValue.value = {
    [startKey]: startBackup,
    [endKey]: end,
  }
}

function setValue(item: RetItemType) {
  i += 1

  if (item.date !== item.showDate) {
    return
  }
  const __dateStr = `${item.year}-${item.month}-${item.showDate}`
  const __date = dayjs(__dateStr)
  if (i % 2 === 0) {
    if (__date.isBefore(dayjs(hoverValue.value[startKey]))) {
      hoverValue.value[startKey] = dayjs(__dateStr).format(props.valueFormat)
      hoverValue.value[endKey] = dayjs(startBackup).format(props.valueFormat)
    }
    else {
      hoverValue.value[startKey] = dayjs(startBackup).format(props.valueFormat)
      hoverValue.value[endKey] = dayjs(__dateStr).format(props.valueFormat)
    }
    modelValue.value = cloneDeep(hoverValue.value)
    emit('change', hoverValue.value)
  }
  else {
    hoverValue.value[startKey] = __dateStr
    hoverValue.value[endKey] = ''
    startBackup = __dateStr
  }
}

function init() {
  let _value = cloneDeep(modelValue.value)

  if (!_value) {
    _value = {
      [startKey]: '',
      [endKey]: '',
    }
  }

  hoverValue.value = _value

  // 年
  dateState.year1 = _value[startKey] ? dayjs(_value[startKey]).year() : curYear
  // 月
  dateState.month1 = _value[startKey] ? dayjs(_value[startKey]).month() + 1 : curMonth
  // 年
  dateState.year2 = _value[endKey] ? dayjs(_value[endKey]).year() : curYear
  // 月
  dateState.month2 = _value[endKey] ? dayjs(_value[endKey]).month() + 1 : curMonth + 1
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

// Lifecycle hooks
init()

// Expose
defineExpose({ init })

const headDate = computed(() => {
  return [
    locale.t('datePicker.Mon'),
    locale.t('datePicker.Tue'),
    locale.t('datePicker.Wed'),
    locale.t('datePicker.Thu'),
    locale.t('datePicker.Fri'),
    locale.t('datePicker.Sat'),
    locale.t('datePicker.Sun'),
  ]
})
</script>

<template>
  <div class="lew-date-range">
    <div class="lew-date">
      <LewFlex x="start" mode="between" class="lew-date-control">
        <div class="lew-date-control-left">
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="prveYear1"
          >
            <CommonIcon type="chevrons-left" />
          </LewButton>
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="prveMonth1"
          >
            <CommonIcon type="chevron-left" />
          </LewButton>
        </div>
        <!-- 日期 -->
        <div class="cur-date">
          {{ dayjs(`${dateState.year1}-${dateState.month1}`).format("YYYY-MM") }}
        </div>
        <div class="lew-date-control-right">
          <!-- 下一月 -->
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="nextMonth1"
          >
            <CommonIcon type="chevron-right" />
          </LewButton>
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="nextYear1"
          >
            <CommonIcon type="chevrons-right" />
          </LewButton>
        </div>
      </LewFlex>
      <div class="lew-date-box">
        <!-- 表头 周 -->
        <div v-for="(item, index) in headDate" :key="`h${index}`" class="lew-date-item">
          <div class="lew-date-num">
            {{ item }}
          </div>
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
            <div v-if="object2class('today', item)" class="lew-date-item-today" />
            <div class="lew-date-value" :class="object2class('selected', item)">
              {{ item.showDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lew-date">
      <LewFlex x="start" mode="between" class="lew-date-control">
        <div class="lew-date-control-left">
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="prveYear2"
          >
            <CommonIcon type="chevrons-left" />
          </LewButton>
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="prveMonth2"
          >
            <CommonIcon type="chevron-left" />
          </LewButton>
        </div>
        <div class="cur-date">
          {{ dayjs(`${dateState.year2}-${dateState.month2}`).format("YYYY-MM") }}
        </div>
        <div class="lew-date-control-right">
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="nextMonth2"
          >
            <CommonIcon type="chevron-right" />
          </LewButton>
          <!-- 下一年 -->
          <LewButton
            type="light"
            color="gray"
            size="small"
            single-icon
            @click="nextYear2"
          >
            <CommonIcon type="chevrons-right" />
          </LewButton>
        </div>
      </LewFlex>
      <div class="lew-date-box">
        <div v-for="(item, index) in headDate" :key="`h${index}`" class="lew-date-item">
          <div class="lew-date-num">
            {{ item }}
          </div>
        </div>
        <div
          v-for="(item, index) in state.rightPanel"
          :key="`d${index}`"
          class="lew-date-item"
          :class="object2class('rangeMonth', item)"
          @click="setValue(item)"
          @mouseenter="hoverValueFn(item)"
        >
          <div class="lew-date-label" :class="object2class('rangeSelected', item)">
            <div v-if="object2class('today', item)" class="lew-date-item-today" />
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
  width: 260px;
  user-select: none;
  padding: 10px;
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
      white-space: nowrap;
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
        height: 28px;
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
          border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
        }

        .lew-date-value-selected {
          background: var(--lew-color-primary);
          color: var(--lew-color-white);
          border: var(--lew-form-border-width) var(--lew-color-primary-light) solid;
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
          color: var(--lew-color-white);
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
          color: var(--lew-color-white);
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
          color: var(--lew-color-white);
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
  border-right: var(--lew-pop-border);
}
</style>
