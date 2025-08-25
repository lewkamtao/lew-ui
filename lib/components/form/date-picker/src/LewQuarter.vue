<script lang="ts" setup>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import { LewButton, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { formatDate } from './formatters'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY-[Q]Q',
  },
})

const emit = defineEmits(['change'])

dayjs.extend(quarterOfYear)
dayjs.extend(customParseFormat)

const quarterValue = ref()
const yearValue = ref()
const currentYear = ref(dayjs().year())

// 生成季度列表
const quarterList = computed(() => {
  return [
    { value: 1, label: 'Q1', months: 'Jan - Mar' },
    { value: 2, label: 'Q2', months: 'Apr - Jun' },
    { value: 3, label: 'Q3', months: 'Jul - Sep' },
    { value: 4, label: 'Q4', months: 'Oct - Dec' },
  ]
})

const checkCurrentQuarter = computed(() => (quarter: number) => {
  const today = dayjs()
  return today.year() === currentYear.value && today.quarter() === quarter
})

const lewQuarterItemClassNames = computed(() => (item: { value: number }) => {
  let selected = false
  if (quarterValue.value) {
    selected = quarterValue.value === item.value && yearValue.value === currentYear.value
  }
  return object2class('lew-quarter-item', { selected })
})

function init(date: string | undefined = '') {
  if (date) {
    const parsedDate = formatDate(date, props.valueFormat, false)
    currentYear.value = parsedDate?.year() || dayjs().year()
    quarterValue.value = parsedDate?.quarter() || dayjs().quarter()
  }
  else {
    const now = dayjs()
    currentYear.value = now.year()
  }
}

function prveYear() {
  currentYear.value -= 1
}

function nextYear() {
  currentYear.value += 1
}

function selectQuarter(quarter: number) {
  quarterValue.value = quarter
  yearValue.value = cloneDeep(currentYear.value)

  const quarterMap: Record<number, string> = {
    1: '01-01',
    2: '04-01',
    3: '07-01',
    4: '10-01',
  }
  const _value = `${currentYear.value}-${quarterMap[quarter]}`

  emit('change', _value)
}

defineExpose({ init })
</script>

<template>
  <div class="lew-quarter">
    <LewFlex x="start" mode="between" class="lew-quarter-control">
      <div class="lew-quarter-control-left">
        <!-- 上一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="prveYear">
          <CommonIcon type="chevron-left" />
        </LewButton>
      </div>
      <!-- 年份 -->
      <div class="cur-year">
        {{ currentYear }}
      </div>
      <div class="lew-quarter-control-right">
        <!-- 下一年 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="nextYear">
          <CommonIcon type="chevron-right" />
        </LewButton>
      </div>
    </LewFlex>
    <div class="lew-quarter-list">
      <div
        v-for="item in quarterList"
        :key="item.value"
        class="lew-quarter-item"
        :class="lewQuarterItemClassNames(item)"
        @click="selectQuarter(item.value)"
      >
        <div class="lew-quarter-label">
          <i v-if="checkCurrentQuarter(item.value)" class="lew-quarter-item-current" />
          <div class="lew-quarter-value">
            <div class="lew-quarter-main">
              {{ item.label }}
            </div>
            <div class="lew-quarter-months">
              {{ item.months }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-quarter {
  width: 260px;
  user-select: none;
  padding: 10px;
  box-sizing: border-box;

  .lew-quarter-control {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0px 5px;
    box-sizing: border-box;
    height: 30px;
    margin-bottom: 10px;

    .cur-year {
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: bold;
      font-size: 15px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
    }

    .lew-quarter-control-left,
    .lew-quarter-control-right {
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

  .lew-quarter-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    padding: 6px;
    box-sizing: border-box;

    .lew-quarter-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      line-height: 45px;
      cursor: pointer;
      color: var(--lew-text-color-1);

      .lew-quarter-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        transition: all 0.1s ease;

        .lew-quarter-value {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;

          border-radius: 6px;
          transition: all 0.1s ease;
          border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
          padding: 4px 6px;
          box-sizing: border-box;

          .lew-quarter-main {
            font-size: 14px;
            font-weight: bold;
            line-height: 1;
          }

          .lew-quarter-months {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 1px;
            line-height: 1;
          }
        }

        .lew-quarter-value:active {
          transform: scale(0.9);
        }
      }
    }

    .lew-quarter-item-current {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba($color: #19c175, $alpha: 0.8);
      left: 50%;
      transform: translateX(-50%);
      bottom: 2px;
      box-shadow: 0px 0px 12px #0e7346;
    }

    .lew-quarter-item:hover {
      .lew-quarter-label {
        .lew-quarter-value {
          background-color: var(--lew-color-primary-light);
          color: var(--lew-color-primary-dark);
          border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
        }
      }
    }

    .lew-quarter-item:active {
      .lew-quarter-label {
        .lew-quarter-value {
          transform: scale(0.95);
        }
      }
    }

    .lew-quarter-item-selected {
      .lew-quarter-label {
        .lew-quarter-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white);
          border: var(--lew-form-border-width) var(--lew-color-primary-light) solid;

          .lew-quarter-months {
            opacity: 0.9;
          }
        }
      }
    }

    .lew-quarter-item-selected:active {
      .lew-quarter-label {
        .lew-quarter-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white);
          border: var(--lew-form-border-width) var(--lew-color-primary-light) solid;
        }
      }
    }

    .lew-quarter-item-selected:hover {
      .lew-quarter-label {
        .lew-quarter-value {
          background: var(--lew-color-primary);
          color: var(--lew-color-white);
          border: var(--lew-form-border-width) var(--lew-color-primary-light) solid;
        }
      }
    }
  }
}
</style>
