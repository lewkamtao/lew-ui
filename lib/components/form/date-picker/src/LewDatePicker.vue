<script lang="ts" setup>
import dayjs from 'dayjs'
import { LewDate, LewPopover, LewTooltip, locale } from 'lew-ui'
import { any2px, object2class } from 'lew-ui/utils'
import LewCommonIcon from 'lew-ui/utils/LewCommonIcon.vue'
import { cloneDeep } from 'lodash-es'
import { datePickerProps } from './props'

const props = defineProps(datePickerProps)
const emit = defineEmits(['change', 'clear'])
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}
const modelValue: Ref<string | undefined> = defineModel()

const visible = ref(false)

const lewPopoverRef = ref()

const lewDateRef = ref()

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

function change(date: string | undefined) {
  emit('change', { date, value: cloneDeep(modelValue.value) })
  hide()
}

function selectPresets(item: { label: string, value: string }) {
  modelValue.value = dayjs(item.value).format(props.valueFormat)
  lewDateRef.value && lewDateRef.value.init(item.value)
  setTimeout(() => {
    nextTick(() => {
      change(modelValue.value)
    })
  }, 100)
}

if (props.valueFormat && modelValue.value) {
  modelValue.value = dayjs(modelValue.value).format(props.valueFormat)
}

const getIconSize = computed(() => {
  const size: Record<string, number> = {
    small: 13,
    medium: 14,
    large: 15,
  }
  return size[props.size]
})

const lewDatePickerClassNames = computed(() => {
  const focus = visible.value
  const { size, readonly, disabled } = props
  return object2class('lew-date-picker', { focus, size, readonly, disabled })
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

function clearHandle() {
  modelValue.value = undefined
  change(modelValue.value)
  emit('clear')
}

function showHandle() {
  visible.value = true
  lewDateRef.value && lewDateRef.value.init(modelValue.value)
}
function hideHandle() {
  visible.value = false
}

defineExpose({ show, hide })
</script>

<template>
  <LewPopover
    ref="lewPopoverRef"
    trigger="click"
    placement="bottom-start"
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
          <lew-flex
            x="start"
            y="center"
            :style="{
              opacity: visible ? 0.6 : 1,
            }"
          >
            <div v-show="!modelValue" class="lew-date-picker-placeholder">
              {{
                placeholder ? placeholder : locale.t('datePicker.placeholder')
              }}
            </div>
            <div v-show="modelValue" class="lew-date-picker-dateValue">
              {{ modelValue }}
            </div>
          </lew-flex>
          <LewCommonIcon
            class="lew-date-picker-icon-calendar"
            :size="getIconSize"
            :class="{
              'lew-date-picker-icon-calendar-hide': modelValue && clearable,
            }"
            type="calendar"
          />
          <transition name="lew-form-icon-ani">
            <LewCommonIcon
              v-if="modelValue && clearable && !readonly"
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
          gap="7"
          y="start"
          class="lew-date-picker-presets lew-scrollbar"
        >
          <div
            v-for="(item, index) in presets"
            :key="index"
            v-tooltip="{
              content: dayjs(item.value).format(valueFormat),
              placement: 'right',
              delay: [500, 80],
            }"
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
          <LewDate
            ref="lewDateRef"
            v-model="modelValue"
            v-bind="props"
            @change="change"
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
      right: 9px;
      transform: translateY(-50%);
      transition: all var(--lew-form-transition-bezier);
      opacity: var(--lew-form-icon-opacity);
    }

    .lew-date-picker-icon-calendar-hide {
      opacity: 0;
      transform: translateY(-50%) translateX(100%);
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

:deep() {
  .lew-date-picker-date-panel {
    width: 260px;
    flex-shrink: 0;
  }

  .lew-date-picker-presets {
    flex-shrink: 0;
    height: 325px;
    overflow-y: auto;
    padding: 7px;
    box-sizing: border-box;
    width: 120px;
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
      background-color: var(--lew-color-blue) !important;
      color: var(--lew-color-white);
    }
  }
}
</style>
