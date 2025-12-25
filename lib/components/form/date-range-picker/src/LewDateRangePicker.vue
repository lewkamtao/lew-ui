<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { LewDateRange, LewPopover, LewTooltip, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { dateRangePickerEmits } from './emits'
import { dateRangePickerProps } from './props'

const props = defineProps(dateRangePickerProps)
const emit = defineEmits(dateRangePickerEmits)

interface DateRange {
  start?: string
  end?: string
}

const modelValue = defineModel<DateRange | undefined>({ required: true })

const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const visible = ref(false)
const lewPopoverRef = ref()
const { startKey, endKey } = props

const lewDateRangePanelRef = ref()

// 将对象格式转换为内部使用的动态键名格式
const internalModelValue = computed({
  get: () => {
    if (!modelValue.value)
      return undefined
    return {
      [startKey]: modelValue.value.start || '',
      [endKey]: modelValue.value.end || '',
    }
  },
  set: (value) => {
    if (!value) {
      modelValue.value = undefined
    }
    else {
      modelValue.value = {
        start: value[startKey] || undefined,
        end: value[endKey] || undefined,
      }
    }
  },
})

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

const getIconSize = computed(() => {
  const size: { [key in LewSize]: number } = {
    small: 13,
    medium: 14,
    large: 15,
  }
  const _propsSize: LewSize = props.size as LewSize
  return size[_propsSize]
})

function change(e: { [key: string]: string } | undefined) {
  if (!e) {
    emit('change', undefined)
  }
  else {
    // 将内部格式转换为对象格式
    const dateRange: DateRange = {
      start: e[startKey] || undefined,
      end: e[endKey] || undefined,
    }
    emit('change', dateRange)
  }
  setTimeout(() => {
    hide()
  }, 100)
}

function showHandle() {
  visible.value = true
  lewDateRangePanelRef.value && lewDateRangePanelRef.value.init()
}

function hideHandle() {
  visible.value = false
}

function clearHandle() {
  modelValue.value = undefined
  emit('change', undefined)
  emit('clear')
}

const lewDateRangeClassNames = computed(() => {
  const focus = visible.value
  const { size, readonly, disabled } = props
  return object2class('lew-date-range-picker', {
    focus,
    size,
    readonly,
    disabled,
  })
})

const getDateRangePickerInputStyle = computed(() => {
  const { size } = props
  return {
    height: `var(--lew-form-item-height-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
  }
})

const checkClear = computed(() => {
  return (modelValue.value?.start || modelValue.value?.end) && props.clearable
})

defineExpose({ show, hide })
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    trigger="click"
    placement="bottom-start"
    :trigger-width="width"
    :offset="[1, 8]"
    :disabled="disabled || readonly"
    :style="{ width: any2px(width) }"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div class="lew-date-range-picker-view">
        <div
          class="lew-date-range-picker"
          :class="lewDateRangeClassNames"
          :style="getDateRangePickerInputStyle"
        >
          <lew-flex
            x="start"
            y="center"
            :style="{
              opacity: visible ? 0.6 : 1,
            }"
          >
            <div v-if="!modelValue?.start" class="lew-date-range-picker-placeholder">
              {{
                placeholderStart
                  ? placeholderStart
                  : locale.t("dateRangePicker.placeholderStart")
              }}
            </div>
            <div
              v-else
              class="lew-date-range-picker-dateValue lew-date-range-picker-start"
            >
              {{ modelValue.start }}
            </div>
            <div class="lew-date-range-picker-mid">
              <CommonIcon :size="14" type="minus" />
            </div>
            <div v-if="!modelValue?.end" class="lew-date-range-picker-placeholder">
              {{
                placeholderEnd
                  ? placeholderEnd
                  : locale.t("dateRangePicker.placeholderEnd")
              }}
            </div>
            <div v-else class="lew-date-range-picker-dateValue lew-date-range-picker-end">
              {{ modelValue.end }}
            </div>
            <CommonIcon
              class="lew-date-range-picker-icon-calendar"
              :size="getIconSize"
              :class="{
                'lew-date-range-picker-icon-calendar-hide': checkClear,
              }"
              type="calendar"
            />
          </lew-flex>
          <transition name="lew-form-icon-ani">
            <CommonIcon
              v-if="clearable && checkClear && !readonly"
              :size="getIconSize"
              type="close"
              class="lew-form-icon-close lew-date-range-picker-form-icon-close"
              :class="{
                'lew-form-icon-close-focus': visible,
              }"
              @click.stop="clearHandle"
            />
          </transition>
        </div>
      </div>
    </template>
    <template #popover-body>
      <LewDateRange
        ref="lewDateRangePanelRef"
        v-bind="props"
        v-model="internalModelValue"
        @change="change"
      />
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-popover {
  .lew-date-range-picker-view {
    width: 100%;
  }

  .lew-date-range-picker {
    width: 100%;
    display: inline-flex;
    gap: 5px;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 0px 30px 0px 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: var(--lew-border-radius-small);
    background-color: var(--lew-form-bgcolor);
    box-sizing: border-box;
    transition: all var(--lew-form-transition-ease);
    cursor: pointer;
    user-select: none;
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    box-shadow: var(--lew-form-box-shadow);

    .lew-date-range-picker-mid {
      display: flex;
      align-items: center;
      color: var(--lew-text-color-5);
    }

    .lew-date-range-picker-icon-calendar {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      transition: all var(--lew-form-transition-bezier);
      opacity: var(--lew-form-icon-opacity);
    }

    .lew-date-range-picker-icon-calendar-hide {
      opacity: 0;
      transform: translateY(-50%) translateX(100%);
    }

    .lew-date-range-picker-placeholder {
      color: var(--lew-text-color-5);
    }
  }

  .lew-date-range-picker:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-date-range-picker-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  }

  .lew-date-range-picker-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
  }
}

.lew-date-range-picker-readonly {
  pointer-events: none;
}

.lew-date-range-picker-disabled {
  pointer-events: none;
  opacity: var(--lew-disabled-opacity);
}
</style>
