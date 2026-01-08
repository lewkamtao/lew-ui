<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewButton, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'

const props = defineProps({
  valueFormat: {
    type: String,
    default: 'YYYY',
  },
})
const emit = defineEmits(['change'])

const yearValue = ref()

const _year = dayjs().year()

const yearState = reactive({
  startYear: Math.floor(_year / 10) * 10, // 当前年代的起始年份
})

// 生成年份列表（显示12个年份，3行4列）
const yearList = computed(() => {
  const years = []
  for (let i = 0; i < 12; i++) {
    years.push(yearState.startYear + i)
  }
  return years
})

const checkCurrentYear = computed(() => (year: number) => {
  const today = dayjs()
  return today.year() === year
})

const lewYearItemClassNames = computed(() => (year: number) => {
  let selected = false
  if (yearValue.value) {
    const selectedDate = dayjs(yearValue.value, props.valueFormat)
    selected = selectedDate.year() === year
  }
  return object2class('lew-year-item', { selected })
})

function init(date: string | undefined = '') {
  if (date) {
    const parsedDate = dayjs(date, props.valueFormat)
    if (parsedDate.isValid()) {
      const year = parsedDate.year()
      yearState.startYear = Math.floor(year / 10) * 10
      yearValue.value = date
    }
    else {
      const fallbackDate = dayjs(date)
      if (fallbackDate.isValid()) {
        const year = fallbackDate.year()
        yearState.startYear = Math.floor(year / 10) * 10
        yearValue.value = fallbackDate.format(props.valueFormat)
      }
    }
  }
  else {
    const now = dayjs()
    const year = now.year()
    yearState.startYear = Math.floor(year / 10) * 10
  }
}

function prveDecade() {
  yearState.startYear -= 10
}

function nextDecade() {
  yearState.startYear += 10
}

function selectYear(year: number) {
  yearValue.value = dayjs().year(year).format(props.valueFormat)
  emit('change', yearValue.value)
}

defineExpose({ init })
</script>

<template>
  <div class="lew-year">
    <LewFlex x="start" mode="between" class="lew-year-control">
      <div class="lew-year-control-left">
        <!-- 上一年代 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="prveDecade">
          <CommonIcon type="chevron-left" />
        </LewButton>
      </div>
      <!-- 年代范围 -->
      <div class="cur-decade">
        {{ yearState.startYear }} - {{ yearState.startYear + 11 }}
      </div>
      <div class="lew-year-control-right">
        <!-- 下一年代 -->
        <LewButton type="light" color="gray" size="small" single-icon @click="nextDecade">
          <CommonIcon type="chevron-right" />
        </LewButton>
      </div>
    </LewFlex>

    <div class="lew-year-list">
      <div
        v-for="year in yearList"
        :key="year"
        class="lew-year-item"
        :class="lewYearItemClassNames(year)"
        @click="selectYear(year)"
      >
        <div class="lew-year-label">
          <i v-if="checkCurrentYear(year)" class="lew-year-item-current" />
          <div class="lew-year-value">
            {{ year }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-year {
  width: 260px;
  user-select: none;
  padding: 10px;
  box-sizing: border-box;

  .lew-year-control {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;

    .cur-decade {
      display: flex;
      align-items: center;
      font-size: 14px;
      white-space: nowrap;
      color: var(--lew-text-color-0);
      letter-spacing: 1.7px;
    }

    .lew-year-control-left,
    .lew-year-control-right {
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

  .lew-year-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 6px;
    box-sizing: border-box;

    .lew-year-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      color: var(--lew-text-color-1);

      .lew-year-label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        transition: all 0.1s ease;

        .lew-year-value {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          line-height: 100%;
          border-radius: 6px;
          transition: all 0.1s ease;
          border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
        }

        .lew-year-value:active {
          transform: scale(0.9);
        }
      }
    }

    .lew-year-item-current {
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

    .lew-year-item:hover {
      .lew-year-label {
        .lew-year-value {
          background-color: color-mix(in srgb, var(--lew-color-primary-light) 50%, var(--lew-bgcolor-0));
          color: var(--lew-color-primary);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-year-item:active {
      .lew-year-label {
        .lew-year-value {
          transform: scale(0.9);
        }
      }
    }

    .lew-year-item-selected {
      .lew-year-label {
        .lew-year-value {
          background: var(--lew-color-datepicker-primary-selected-bg);
          color: var(--lew-color-datepicker-primary-selected-text);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-year-item-selected:active {
      .lew-year-label {
        .lew-year-value {
          background: var(--lew-color-datepicker-primary-selected-bg-active);
          color: var(--lew-color-datepicker-primary-selected-text-active);
          border: var(--lew-form-border-width) var(--lew-color-primary) solid;
        }
      }
    }

    .lew-year-item-selected:hover {
      .lew-year-label {
        .lew-year-value {
          background: var(--lew-color-datepicker-primary-selected-bg);
          color: var(--lew-color-datepicker-primary-selected-text);
        }
      }
    }
  }
}
</style>
