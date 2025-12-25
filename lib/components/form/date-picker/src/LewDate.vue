<script lang="ts" setup>
import type { RetItemType, RetType } from './date'
import dayjs from 'dayjs'
import { LewButton, LewFlex, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { getMonthDate } from './date'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  isTime: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['change'])

const dateValue = ref()

const _year = dayjs().year()
const _month = dayjs().month() + 1

const dateData: Ref<RetType> = ref(getMonthDate())

const dateState = reactive({
  year: _year,
  month: _month,
})

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

const checkToday = computed(() => (item: RetItemType) => {
  const today = dayjs()
  return today.isSame(dayjs(`${item.year}-${item.month}-${item.date}`), 'day')
})

const lewDateItemClassNames = computed(() => (item: RetItemType) => {
  const unselect = item.date !== item.showDate
  let selected = false
  if (item.date > 0 && item.date <= item.showDate) {
    const v = `${dateState.year}-${dateState.month}-${item.showDate}`
    if (dateValue.value) {
      const currentDate = dayjs(v)
      const selectedDate = dayjs(dateValue.value, props.valueFormat)
      selected = currentDate.isSame(selectedDate, 'day')
    }
  }
  return object2class('lew-date-item', { unselect, selected })
})

function setMonthDate() {
  dateData.value = getMonthDate(dateState.year, dateState.month)
}

function init(date: string | undefined = '') {
  if (date) {
    const parsedDate = dayjs(date, props.valueFormat)
    if (parsedDate.isValid()) {
      dateState.year = parsedDate.year()
      dateState.month = parsedDate.month() + 1
      dateValue.value = parsedDate.format(props.valueFormat)
    }
    else {
      const fallbackDate = dayjs(date)
      if (fallbackDate.isValid()) {
        dateState.year = fallbackDate.year()
        dateState.month = fallbackDate.month() + 1
        dateValue.value = fallbackDate.format(props.valueFormat)
      }
    }
  }
  else {
    const now = dayjs()
    dateState.year = now.year()
    dateState.month = now.month() + 1
  }
  setMonthDate()
}

function prveMonth() {
  if (dateState.month > 1) {
    dateState.month -= 1
  }
  else {
    dateState.year -= 1
    dateState.month = 12
  }
  setMonthDate()
}

function nextMonth() {
  if (dateState.month < 12) {
    dateState.month += 1
  }
  else {
    dateState.year += 1
    dateState.month = 1
  }
  setMonthDate()
}

function prveYear() {
  dateState.year -= 1
  setMonthDate()
}

function nextYear() {
  dateState.year += 1
  setMonthDate()
}

function select(item: RetItemType) {
  dateValue.value = dayjs(`${item.year}-${item.month}-${item.showDate}`).format(
    'YYYY-MM-DD',
  )
  emit('change', dateValue.value)
}

function getValue() {
  return dateValue.value
}

defineExpose({ init, getValue })
</script>

<template>
  <div class="lew-date">
    <LewFlex x="start" mode="between" class="lew-date-control">
      <div class="lew-date-control-left">
        <!-- 上一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="prveYear">
          <CommonIcon type="chevrons-left" />
        </LewButton>
        <!-- 上一月 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="prveMonth">
          <CommonIcon type="chevron-left" />
        </LewButton>
      </div>
      <!-- 日期 -->
      <div class="cur-date">
        {{ dayjs(`${dateState.year}-${dateState.month}`).format("YYYY-MM") }}
      </div>
      <div class="lew-date-control-right">
        <!-- 下一月 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="nextMonth">
          <CommonIcon type="chevron-right" />
        </LewButton>
        <!-- 下一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="nextYear">
          <CommonIcon type="chevrons-right" />
        </LewButton>
      </div>
    </LewFlex>
    <div class="lew-date-box">
      <!-- 表头 周 -->
      <div
        v-for="(item, index) in headDate"
        :key="`h${index}`"
        class="lew-date-item lew-date-item-unselect"
      >
        <div class="lew-date-num">
          {{ item }}
        </div>
      </div>

      <!-- 表格 -->
      <div
        v-for="(item, index) in dateData"
        :key="`d${index}`"
        class="lew-date-item"
        :class="lewDateItemClassNames(item)"
        @click="select(item)"
      >
        <div class="lew-date-label">
          <i v-if="checkToday(item)" class="lew-date-item-today" />
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
  width: 260px;
  user-select: none;
  padding: 10px;
  box-sizing: border-box;

  .lew-date-control {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;

    .cur-date {
      display: flex;
      align-items: center;
      font-size: 14px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
      letter-spacing: 1.7px;
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
      line-height: 36px;
      cursor: pointer;
      color: var(--lew-text-color-1);

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
          border-radius: 50%;
          transition: all 0.1s ease;
          border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
        }

        .lew-date-value:active {
          transform: scale(0.9);
        }
      }
    }

    .lew-date-item-unselect {
      pointer-events: none;
      color: var(--lew-text-color-5);
    }

    .lew-date-item-today {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--lew-color-success);
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
      opacity: 0.8;
      box-shadow: 0px 0px 8px var(--lew-color-success-light);
    }

    .lew-date-item:hover {
      .lew-date-label {
        .lew-date-value {
          background-color: color-mix(in srgb, var(--lew-color-primary-light) 50%, var(--lew-bgcolor-0));
          color: var(--lew-color-primary);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-date-item:active {
      .lew-date-label {
        .lew-date-value {
          transform: scale(0.9);
        }
      }
    }

    .lew-date-item-selected {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-datepicker-primary-selected-bg);
          color: var(--lew-color-datepicker-primary-selected-text);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-date-item-selected:active {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-datepicker-primary-selected-bg-active);
          color: var(--lew-color-datepicker-primary-selected-text-active);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-date-item-selected:hover {
      .lew-date-label {
        .lew-date-value {
          background: var(--lew-color-datepicker-primary-selected-bg-hover);
          color: var(--lew-color-datepicker-primary-selected-text-hover);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }
  }
}
</style>
