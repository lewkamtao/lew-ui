<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewButton, LewFlex, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY-MM',
  },
})
const emit = defineEmits(['change'])

const monthValue = ref()

const _year = dayjs().year()

const monthState = reactive({
  year: _year,
})

// 生成月份列表
const monthList = computed(() => {
  return [
    { value: 1, label: locale.t('datePicker.Jan') || 'Jan' },
    { value: 2, label: locale.t('datePicker.Feb') || 'Feb' },
    { value: 3, label: locale.t('datePicker.Mar') || 'Mar' },
    { value: 4, label: locale.t('datePicker.Apr') || 'Apr' },
    { value: 5, label: locale.t('datePicker.May') || 'May' },
    { value: 6, label: locale.t('datePicker.Jun') || 'Jun' },
    { value: 7, label: locale.t('datePicker.Jul') || 'Jul' },
    { value: 8, label: locale.t('datePicker.Aug') || 'Aug' },
    { value: 9, label: locale.t('datePicker.Sep') || 'Sep' },
    { value: 10, label: locale.t('datePicker.Oct') || 'Oct' },
    { value: 11, label: locale.t('datePicker.Nov') || 'Nov' },
    { value: 12, label: locale.t('datePicker.Dec') || 'Dec' },
  ]
})

const checkCurrentMonth = computed(() => (month: number) => {
  const today = dayjs()
  return today.isSame(dayjs(`${monthState.year}-${month}`), 'month')
})

const lewMonthItemClassNames = computed(() => (month: number) => {
  let selected = false
  if (monthValue.value) {
    const selectedDate = dayjs(monthValue.value, props.valueFormat)
    selected
      = selectedDate.year() === monthState.year && selectedDate.month() + 1 === month
  }
  return object2class('lew-month-item', { selected })
})

function init(date: string | undefined = '') {
  if (date) {
    const parsedDate = dayjs(date, props.valueFormat)
    if (parsedDate.isValid()) {
      monthState.year = parsedDate.year()
      monthValue.value = date
    }
    else {
      const fallbackDate = dayjs(date)
      if (fallbackDate.isValid()) {
        monthState.year = fallbackDate.year()
        monthValue.value = fallbackDate.format(props.valueFormat)
      }
    }
  }
  else {
    const now = dayjs()
    monthState.year = now.year()
  }
}

function prveYear() {
  monthState.year -= 1
}

function nextYear() {
  monthState.year += 1
}

function selectMonth(month: number) {
  monthValue.value = dayjs(`${monthState.year}-${month}`).format(props.valueFormat)
  emit('change', monthValue.value)
}

defineExpose({ init })
</script>

<template>
  <div class="lew-month">
    <LewFlex x="start" mode="between" class="lew-month-control">
      <div class="lew-month-control-left">
        <!-- 上一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="prveYear">
          <CommonIcon type="chevron-left" />
        </LewButton>
      </div>
      <!-- 年份 -->
      <div class="cur-year">
        {{ monthState.year }}
      </div>
      <div class="lew-month-control-right">
        <!-- 下一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="nextYear">
          <CommonIcon type="chevron-right" />
        </LewButton>
      </div>
    </LewFlex>
    <div class="lew-month-list">
      <div
        v-for="month in monthList"
        :key="month.value"
        class="lew-month-item"
        :class="lewMonthItemClassNames(month.value)"
        @click="selectMonth(month.value)"
      >
        <div class="lew-month-label">
          <i v-if="checkCurrentMonth(month.value)" class="lew-month-item-current" />
          <div class="lew-month-value">
            {{ month.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-month {
  width: 260px;
  user-select: none;
  padding: 10px;
  box-sizing: border-box;

  .lew-month-control {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;

    .cur-year {
      display: flex;
      align-items: center;
      font-size: 14px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
      letter-spacing: 1.7px;
    }

    .lew-month-control-left,
    .lew-month-control-right {
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

  .lew-month-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 6px;
    box-sizing: border-box;
    .lew-month-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      color: var(--lew-text-color-1);

      .lew-month-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100%;
        height: 32px;
        box-sizing: border-box;
        transition: all 0.1s ease;

        .lew-month-value {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 32px;
          line-height: 32px;
          border-radius: 6px;
          transition: all 0.1s ease;
          border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
        }

        .lew-month-value:active {
          transform: scale(0.9);
        }
      }
    }

    .lew-month-item-current {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--lew-color-success);
      left: 50%;
      transform: translateX(-50%);
      bottom: 2px;
      z-index: 10;
      opacity: 1;
      border: 1.5px solid var(--lew-bgcolor-0);
      box-shadow:
        0px 0px 8px var(--lew-color-success-light),
        0px 0px 3px rgba(0, 0, 0, 0.15),
        inset 0px 0px 2px rgba(255, 255, 255, 0.2);
    }

    .lew-month-item:hover {
      .lew-month-label {
        .lew-month-value {
          background-color: color-mix(in srgb, var(--lew-color-primary-light) 50%, var(--lew-bgcolor-0));
          color: var(--lew-color-primary);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-month-item:active {
      .lew-month-label {
        .lew-month-value {
          transform: scale(0.9);
        }
      }
    }

    .lew-month-item-selected {
      .lew-month-label {
        .lew-month-value {
          background: var(--lew-color-datepicker-primary-selected-bg);
          color: var(--lew-color-datepicker-primary-selected-text);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-month-item-selected:active {
      .lew-month-label {
        .lew-month-value {
          background: var(--lew-color-datepicker-primary-selected-bg-active);
          color: var(--lew-color-datepicker-primary-selected-text-active);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-month-item-selected:hover {
      .lew-month-label {
        .lew-month-value {
          background: var(--lew-color-datepicker-primary-selected-bg);
          color: var(--lew-color-datepicker-primary-selected-text);
        }
      }
    }
  }
}
</style>
