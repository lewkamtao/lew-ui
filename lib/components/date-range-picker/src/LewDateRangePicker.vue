<script lang="ts" setup>
import { LewPopover, LewDateRange, LewTooltip } from 'lew-ui'
import { dateRangePickerProps } from './props'
import { object2class } from 'lew-ui/utils'
import type { LewSize } from 'lew-ui'
import Icon from 'lew-ui/utils/Icon.vue'
import { locale } from 'lew-ui'
import { any2px } from 'lew-ui/utils'
// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
    app.use(LewTooltip)
}

type DateRangePickerModel =
    | {
          [key in typeof startKey | typeof endKey]: string
      }
    | undefined

const modelValue = defineModel<DateRangePickerModel>()
const props = defineProps(dateRangePickerProps)
const emit = defineEmits(['change', 'clear'])
const visible = ref(false)
const lewPopoverRef = ref()
const { startKey, endKey } = props

const lewDateRangePanelRef = ref()

const show = () => {
    lewPopoverRef.value.show()
}

const hide = () => {
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

const change = (e?: any) => {
    emit('change', { e, show, hide })
    hide()
}

const showHandle = () => {
    visible.value = true
    lewDateRangePanelRef.value && lewDateRangePanelRef.value.init()
}
const hideHandle = () => {
    visible.value = false
}

const clearHandle = () => {
    modelValue.value = undefined
    change(modelValue.value)
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
    return (
        ((modelValue.value && modelValue.value[startKey]) ||
            (modelValue.value && modelValue.value[endKey])) &&
        props.clearable
    )
})

defineExpose({ show, hide })
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
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
                        <div
                            v-if="!modelValue || !modelValue[startKey]"
                            class="lew-date-range-picker-placeholder"
                        >
                            {{
                                placeholderStart
                                    ? placeholderStart
                                    : locale.t(
                                          'dateRangePicker.placeholderStart',
                                      )
                            }}
                        </div>
                        <div
                            v-else
                            class="lew-date-range-picker-dateValue lew-date-range-picker-start"
                        >
                            {{ modelValue[startKey] }}
                        </div>
                        <div class="lew-date-range-picker-mid">
                            <Icon :size="14" type="minus" />
                        </div>
                        <div
                            v-if="!modelValue || !modelValue[endKey]"
                            class="lew-date-range-picker-placeholder"
                        >
                            {{
                                placeholderEnd
                                    ? placeholderEnd
                                    : locale.t('dateRangePicker.placeholderEnd')
                            }}
                        </div>
                        <div
                            v-else
                            class="lew-date-range-picker-dateValue lew-date-range-picker-end"
                        >
                            {{ modelValue[endKey] }}
                        </div>
                        <Icon
                            class="lew-date-range-picker-icon-calendar"
                            :size="getIconSize"
                            :class="{
                                'lew-date-range-picker-icon-calendar-hide':
                                    checkClear,
                            }"
                            type="calendar"
                        />
                    </lew-flex>
                    <transition name="lew-form-icon-ani">
                        <Icon
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
            <lew-date-range
                ref="lewDateRangePanelRef"
                v-bind="props"
                v-model="modelValue"
                @change="change"
            />
        </template>
    </lew-popover>
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
            right: 9px;
            transform: translateY(-50%);
            transition: all var(--lew-form-transition-bezier);
            opacity: var(--lew-form-icon-opacity);
        }

        .lew-date-range-picker-icon-calendar-hide {
            opacity: 0;
            transform: translateY(-50%) translateX(100%);
        }

        .lew-date-range-picker-placeholder {
            color: rgb(165, 165, 165);
        }
    }

    .lew-date-range-picker:hover {
        background-color: var(--lew-form-bgcolor-hover);
    }

    .lew-date-range-picker-focus {
        background-color: var(--lew-form-bgcolor-focus);
        border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
            solid;
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
