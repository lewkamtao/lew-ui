<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewPopover, LewTooltip, locale } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { any2px, object2class } from 'lew-ui/utils'
import { datePickerEmits } from './emits'
import { formatDate, isValidDate } from './formatters'
import LewPanel from './LewPanel.vue'
import { datePickerProps } from './props'

const props = defineProps(datePickerProps)

const emit = defineEmits(datePickerEmits)

const modelValue: Ref<string | undefined> = defineModel({ required: true })

const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const visible = ref(false)
const lewPopoverRef = ref()
const lewPanelRef = ref()
const inputRef = ref()
let cacheValue: string | undefined

const isInputFocused = ref(false)
const valueBeforeFocus = ref<string | undefined>('')

const getPanelType = computed(() => {
  const format = props.valueFormat

  // 判断是否包含时间部分（HH、mm、ss）
  const hasTime = /[Hh]+|m+|s+/.test(format)

  // 判断是否包含日期部分（DD、D）
  const hasDay = /D+/.test(format)

  // 判断是否包含月份部分（MM、M）
  const hasMonth = /M+/.test(format)

  // 判断是否包含季度部分（Q）
  const hasQuarter = /Q+/.test(format)

  // 判断是否只有年份（YYYY、YY）
  const hasYear = /Y+/.test(format)

  // 根据格式判断面板类型
  if (hasTime && !hasDay && !hasMonth && !hasYear) {
    // 只包含时间，使用time面板
    return 'time'
  }
  else if (hasTime && (hasDay || hasMonth || hasYear)) {
    // 如果包含时间和日期，使用date-time面板
    return 'date-time'
  }
  else if (hasDay && hasMonth) {
    // 包含日期和月份，使用date面板
    return 'date'
  }
  else if (hasQuarter) {
    // 包含季度，使用quarter面板
    return 'quarter'
  }
  else if (hasMonth && !hasDay) {
    // 只包含月份，使用month面板
    return 'month'
  }
  else if (hasYear && !hasMonth && !hasDay && !hasQuarter) {
    // 只包含年份，使用year面板
    return 'year'
  }

  // 默认返回date面板
  return 'date'
})

const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 13,
    medium: 14,
    large: 15,
  }
  return size[props.size]
})

const lewDatePickerClassNames = computed(() => {
  const focus = visible.value || isInputFocused.value
  const { size, readonly, disabled } = props
  return object2class('lew-date-picker', {
    focus,
    size,
    readonly,
    disabled,
  })
})

const getDatePickerInputStyle = computed(() => {
  const { size } = props
  return {
    height: `var(--lew-form-item-height-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
  }
})

const getDisplayPlaceholder = computed(() => {
  return props.placeholder ? props.placeholder : locale.t('datePicker.placeholder')
})

const shouldShowClearIcon = computed(
  () => modelValue.value && props.clearable && !props.readonly,
)
const shouldShowCalendarIcon = computed(() => !(modelValue.value && props.clearable))

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

function panelChange(value?: string) {
  modelValue.value = formatDate(value!, props.valueFormat)! || cacheValue
  emit('change', value)
  setTimeout(() => {
    hide()
  }, 100)
}

function handlePanelCancel() {
  hide()
}

function selectPresets(item: { label: string, value: string }) {
  modelValue.value = formatDate(item.value, props.valueFormat)! || cacheValue
  lewPanelRef.value && lewPanelRef.value.init(modelValue.value)
  setTimeout(() => {
    nextTick(() => {
      panelChange(modelValue.value)
    })
  }, 100)
}

function clearHandle() {
  modelValue.value = undefined
  emit('clear')
  emit('change', undefined)
}

function showHandle() {
  visible.value = true
  inputRef.value?.focus()
  lewPanelRef.value && lewPanelRef.value.init(modelValue.value)
}

function hideHandle() {
  visible.value = false
}

function handleInputFocus() {
  if (props.readonly || props.disabled)
    return
  valueBeforeFocus.value = modelValue.value
  isInputFocused.value = true
  cacheValue = modelValue.value
}

function handleInputBlur(e: FocusEvent) {
  const target = e.target as HTMLInputElement
  const value = target.value

  isInputFocused.value = false
  modelValue.value = formatDate(value!, props.valueFormat)! || cacheValue
  emit('change', modelValue.value)
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const value = target.value

  // 检查输入值是否合法
  if (value && isValidDate(value, props.valueFormat)) {
    // 如果值合法，更新面板显示
    lewPanelRef.value && lewPanelRef.value.init(value)
  }
  else if (value) {
    // 如果输入的不是目标格式，但可能是其他有效日期格式，尝试解析并更新面板
    const formattedValue = formatDate(value, props.valueFormat, false)
    if (formattedValue) {
      lewPanelRef.value
      && lewPanelRef.value.init(formatDate(value, props.valueFormat, true))
    }
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    inputRef.value?.blur()
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    if (valueBeforeFocus.value !== undefined) {
      modelValue.value = valueBeforeFocus.value
      emit('change', valueBeforeFocus.value)
    }
    inputRef.value?.blur()
  }
}

onMounted(() => {
  if (modelValue.value) {
    if (isValidDate(modelValue.value, props.valueFormat)) {
      //
    }
    else {
      throw new Error('[LewDatePicker] modelValue Invalid date')
    }
  }
})

defineExpose({ show, hide })
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    placement="bottom-start"
    :hide-on-click="false"
    :trigger-width="width"
    :disabled="disabled || readonly"
    :offset="[0, 8]"
    :style="{ width: any2px(width) }"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div class="lew-date-picker-view">
        <div
          class="lew-date-picker"
          :class="lewDatePickerClassNames"
          :style="getDatePickerInputStyle"
        >
          <input
            ref="inputRef"
            v-model="modelValue"
            type="text"
            class="lew-date-picker-input"
            :placeholder="getDisplayPlaceholder"
            :readonly="readonly"
            :disabled="disabled"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            @input="handleInput"
            @keydown="handleKeydown"
          >
          <CommonIcon
            class="lew-date-picker-icon-calendar"
            :size="getIconSize"
            :class="{
              'lew-date-picker-icon-calendar-hide': !shouldShowCalendarIcon,
            }"
            type="calendar"
          />
          <transition name="lew-form-icon-ani">
            <CommonIcon
              v-if="shouldShowClearIcon"
              :size="getIconSize"
              type="close"
              class="lew-form-icon-close lew-date-picker-icon-close"
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
      <lew-flex gap="0">
        <lew-flex
          v-if="(presets || []).length > 0"
          direction="y"
          gap="7px"
          width="120px"
          y="start"
          class="lew-date-picker-presets lew-scrollbar"
        >
          <div
            v-for="(item, index) in presets"
            :key="index"
            :title="dayjs(item.value).format(valueFormat)"
            class="lew-date-picker-presets-item"
            :class="[
              dayjs(modelValue).isSame(item.value, 'day')
                ? 'lew-date-picker-presets-item-active'
                : '',
            ]"
            @click="selectPresets(item)"
          >
            {{ item.label }}
          </div>
        </lew-flex>
        <lew-flex class="lew-date-picker-date-panel">
          <LewPanel
            ref="lewPanelRef"
            :type="getPanelType"
            v-bind="props"
            @change="panelChange"
            @cancel="handlePanelCancel"
          />
        </lew-flex>
      </lew-flex>
    </template>
  </LewPopover>
</template>

<style lang="scss" scoped>
.lew-popover {
  .lew-date-picker-view {
    width: 100%;
  }

  .lew-date-picker {
    width: 100%;
    display: inline-flex;
    align-items: center;
    position: relative;
    width: 100%;
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

    .lew-date-picker-icon-calendar {
      position: absolute;
      top: 50%;
      right: 12px;
      transform: translateY(-50%);
      transition: all var(--lew-form-transition-bezier);
      opacity: var(--lew-form-icon-opacity);
    }

    .lew-date-picker-icon-calendar-hide {
      opacity: 0;
      transform: translateY(-50%) translateX(100%);
    }

    .lew-date-picker-input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      padding: 0;
      margin: 0;
      letter-spacing: 1.7px;
    }

    .lew-date-picker-input::placeholder {
      color: rgb(165, 165, 165);
      letter-spacing: 0;
    }

    .lew-date-picker-placeholder {
      color: rgb(165, 165, 165);
    }
  }

  .lew-date-picker:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-date-picker-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
  }

  .lew-date-picker-focus:hover {
    background-color: var(--lew-form-bgcolor-focus);
  }
}

.lew-date-picker-readonly {
  pointer-events: none;
}

.lew-date-picker-disabled {
  pointer-events: none;
  opacity: var(--lew-disabled-opacity);
}
</style>

<style lang="scss">
.lew-date-picker-presets {
  flex-shrink: 0;
  height: 325px;
  overflow-y: auto;
  padding: 7px;
  box-sizing: border-box;
  border-right: var(--lew-pop-border);

  .lew-date-picker-presets-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: var(--lew-border-radius-small);
    text-align: center;
    background-color: var(--lew-form-bgcolor);
    cursor: pointer;
  }

  .lew-date-picker-presets-item:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-date-picker-presets-item-active {
    background-color: var(--lew-color-primary) !important;
    color: var(--lew-color-white);
  }
}

.lew-date-picker-date-panel {
  width: 260px;
  flex-shrink: 0;
}
</style>
