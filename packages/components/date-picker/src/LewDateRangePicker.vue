<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { dateRangePickerProps } from './datePicker'

const props = defineProps(dateRangePickerProps)
const emit = defineEmits(['change', 'update:modelValue'])
const modelValue = useVModel(props, 'modelValue', emit)
const isShowPicker = ref(false)
const lewPopoverRef = ref()
const { startKey, endKey } = props
const lewDateRangePanelRef = ref()

function show() {
  lewPopoverRef.value.show()
}

function hide() {
  lewPopoverRef.value.hide()
}

const getIconSize = computed(() => {
  const size: any = {
    small: 13,
    medium: 14,
    large: 16,
  }
  return size[props.size]
})

function change(e?: any) {
  emit('change', { e, show, hide })
  hide()
}

function showHandle() {
  isShowPicker.value = true
}
function hideHandle() {
  isShowPicker.value = false
  lewDateRangePanelRef.value.init()
}

const classObject = computed(() => {
  return {
    'lew-date-picker-focus': isShowPicker.value,
    [`lew-date-picker-${props.size}`]: props.size,
  }
})

defineExpose({ show, hide })
</script>

<template>
  <lew-popover
    ref="lewPopoverRef"
    trigger="click"
    placement="bottom-start"
    @show="showHandle"
    @hide="hideHandle"
  >
    <template #trigger>
      <div class="lew-date-picker-view" :class="classObject">
        <div class="lew-date-picker-input">
          <div
            v-if="!modelValue[startKey]"
            class="lew-date-picker-placeholder"
          >
            请选择日期
          </div>
          <div
            v-else
            class="lew-date-picker-dateValue lew-date-picker-start"
          >
            {{ modelValue[startKey] }}
          </div>
          <div class="lew-date-picker-mid">
            -
          </div>
          <div
            v-if="!modelValue[endKey]"
            class="lew-date-picker-placeholder"
          >
            请选择日期
          </div>
          <div
            v-else
            class="lew-date-picker-dateValue lew-date-picker-end"
          >
            {{ modelValue[endKey] }}
          </div>
          <lew-icon
            class="lew-date-picker-icon"
            :size="getIconSize"
            type="calendar"
          />
        </div>
      </div>
    </template>
    <template #popover-body>
      <lew-date-range
        ref="lewDateRangePanelRef"
        v-model="modelValue"
        @change="change"
      />
    </template>
  </lew-popover>
</template>

<style lang="scss" scoped>
.lew-popover {
    width: 273px;

    .lew-date-picker-view {
        display: inline-flex;
        align-items: center;
        position: relative;
        width: 100%;
        padding: 0px 45px 0px 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-radius: var(--lew-border-radius);
        background-color: var(--lew-form-bgcolor);
        box-sizing: border-box;
        transition: all 0.15s ease;
        cursor: pointer;
        user-select: none;
        box-shadow: var(--lew-form-box-shadow);
        border: var(--lew-form-border-width) transparent solid;
        outline: 0px var(--lew-primary-color-light) solid;
    }
    .lew-date-picker-input {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;
        box-sizing: border-box;
        .lew-date-picker-icon {
            position: absolute;
            top: 50%;
            right: 7px;
            transform: translateY(-50%);
            transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
            color: var(--lew-text-color-7);
        }
        .lew-date-picker-placeholder {
            color: rgb(165, 165, 165);
            margin-left: 7px;
        }
    }

    .lew-date-picker-view:hover {
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-date-picker-view.lew-date-picker-focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
            solid;
        outline: var(--lew-form-ouline);
    }

    .lew-date-picker-small {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-small);
            padding: var(--lew-form-input-padding-small);
            font-size: var(--lew-form-font-size-small);
            line-height: var(--lew-form-input-line-height-small);
        }
    }
    .lew-date-picker-medium {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-medium);
            padding: var(--lew-form-input-padding-medium);
            font-size: var(--lew-form-font-size-medium);
            line-height: var(--lew-form-input-line-height-medium);
        }
    }
    .lew-date-picker-large {
        .lew-date-picker-input {
            height: var(--lew-form-item-height-large);
            padding: var(--lew-form-input-padding-large);
            font-size: var(--lew-form-font-size-large);
            line-height: var(--lew-form-input-line-height-large);
        }
    }
}
</style>
