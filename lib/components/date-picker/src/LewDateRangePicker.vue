<script lang="ts" setup>
    import { LewPopover, LewIcon, LewDateRange, LewTooltip } from 'lew-ui';
    import { useVModel } from '@vueuse/core';
    import { dateRangePickerProps } from './props';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(LewTooltip);
    }
    const props = defineProps(dateRangePickerProps);
    const emit = defineEmits(['change', 'clear', 'update:modelValue']);
    const modelValue = useVModel(props, 'modelValue', emit);
    const visible = ref(false);
    const lewPopoverRef = ref();
    const { startKey, endKey } = props;
    const lewDateRangePanelRef = ref();

    const show = () => {
        lewPopoverRef.value.show();
    };

    const hide = () => {
        lewPopoverRef.value.hide();
    };

    const getIconSize = computed(() => {
        const size: any = {
            small: 13,
            medium: 14,
            large: 15
        };
        return size[props.size];
    });

    const change = (e?: any) => {
        emit('change', { e, show, hide });
        hide();
    };

    const showHandle = () => {
        visible.value = true;
        lewDateRangePanelRef.value.init();
    };
    const hideHandle = () => {
        visible.value = false;
    };

    const clearHandle = () => {
        modelValue.value = {};
        emit('clear');
    };

    const classObject = computed(() => {
        return {
            'lew-date-picker-focus': visible.value,
            [`lew-date-picker-${props.size}`]: props.size
        };
    });

    const checkClear = computed(() => {
        return (modelValue.value[startKey] || modelValue.value[endKey]) && props.clearable;
    });

    defineExpose({ show, hide });
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
        :offset="[1, 8]"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div class="lew-date-picker-view" :class="classObject">
                <div class="lew-date-picker-input">
                    <div v-if="!modelValue[startKey]" class="lew-date-picker-placeholder">
                        请选择日期
                    </div>
                    <div v-else class="lew-date-picker-dateValue lew-date-picker-start">
                        {{ modelValue[startKey] }}
                    </div>
                    <div class="lew-date-picker-mid">
                        <lew-icon size="14" type="minus" />
                    </div>
                    <div v-if="!modelValue[endKey]" class="lew-date-picker-placeholder">
                        请选择日期
                    </div>
                    <div v-else class="lew-date-picker-dateValue lew-date-picker-end">
                        {{ modelValue[endKey] }}
                    </div>
                    <lew-icon
                        class="icon-calendar"
                        :size="getIconSize"
                        :class="{
                            'icon-calendar-hide': checkClear
                        }"
                        type="calendar"
                    />
                    <transition name="lew-form-icon-ani">
                        <lew-icon
                            v-if="clearable && checkClear && !readonly"
                            :size="getIconSize"
                            type="x"
                            class="lew-form-icon-clear"
                            :class="{
                                'lew-form-icon-clear-focus': visible
                            }"
                            @click.stop="clearHandle"
                        />
                    </transition>
                </div>
            </div>
        </template>
        <template #popover-body>
            <lew-date-range ref="lewDateRangePanelRef" v-model="modelValue" @change="change" />
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
            padding: 0px 30px 0px 0px;
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
            outline: 0px var(--lew-color-primary-light) solid;
        }

        .lew-date-picker-input {
            width: 100%;
            display: inline-flex;
            gap: 5px;
            align-items: center;
            box-sizing: border-box;

            .lew-date-picker-mid {
                display: flex;
                align-items: center;
                color: var(--lew-text-color-8);
            }

            .icon-calendar {
                position: absolute;
                top: 50%;
                right: 9px;
                transform: translateY(-50%);
                transition: var(--lew-form-transition);
                opacity: var(--lew-form-icon-opacity);
            }

            .icon-calendar-hide {
                opacity: 0;
                transform: translateY(-50%) translateX(100%);
            }

            .lew-date-picker-placeholder {
                color: rgb(165, 165, 165);
            }
        }

        .lew-date-picker-view:hover {
            background-color: var(--lew-form-bgcolor-hover);
        }

        .lew-date-picker-view.lew-date-picker-focus {
            background-color: var(--lew-form-bgcolor-focus);
            border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;
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
