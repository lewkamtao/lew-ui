<script lang="ts" setup>
    import { object2class } from 'lew-ui/utils';
    import { LewPopover, LewIcon, LewDate, LewTooltip } from 'lew-ui';
    import { datePickerProps } from './props';

    // 获取app
    const app = getCurrentInstance()?.appContext.app;
    if (app && !app.directive('tooltip')) {
        app.use(LewTooltip);
    }
    const emit = defineEmits(['change', 'clear']);
    const props = defineProps(datePickerProps);
    const modelValue: Ref<string | undefined> = defineModel<string | undefined>();

    const visible = ref(false);

    const lewPopoverRef = ref();
    const lewDateRef = ref();

    const show = () => {
        lewPopoverRef.value.show();
    };

    const hide = () => {
        lewPopoverRef.value.hide();
    };

    const change = (date: string | undefined) => {
        emit('change', { date, show, hide });
        hide();
    };

    const getIconSize = computed(() => {
        const size: Record<string, number> = {
            small: 13,
            medium: 14,
            large: 15
        };
        return size[props.size];
    });

    const lewDateClassNames = computed(() => {
        const focus = visible.value;
        const { size, readonly, disabled } = props;
        return object2class('lew-date-picker', { focus, size, readonly, disabled });
    });

    const clearHandle = () => {
        modelValue.value = undefined;
        change(modelValue.value);
        emit('clear');
    };

    const showHandle = () => {
        visible.value = true;
        lewDateRef.value.init();
    };
    const hideHandle = () => {
        visible.value = false;
    };

    defineExpose({ show, hide });
</script>
<template>
    <lew-popover
        ref="lewPopoverRef"
        trigger="click"
        placement="bottom-start"
        :disabled="disabled || readonly"
        :offset="[0, 8]"
        @show="showHandle"
        @hide="hideHandle"
    >
        <template #trigger>
            <div class="lew-date-picker-view" :class="lewDateClassNames">
                <div class="lew-date-picker-input">
                    <div v-show="!modelValue" class="lew-date-picker-placeholder">
                        {{ placeholder }}
                    </div>
                    <div v-show="modelValue" class="lew-date-picker-dateValue">
                        {{ modelValue }}
                    </div>
                    <lew-icon
                        v-if="!readonly"
                        class="icon-calendar"
                        :size="getIconSize"
                        :class="{
                            'icon-calendar-hide': modelValue && clearable
                        }"
                        type="calendar"
                    />
                    <transition name="lew-form-icon-ani">
                        <lew-icon
                            v-if="modelValue && clearable && !readonly"
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
            <lew-date ref="lewDateRef" v-model="modelValue" @change="change" />
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-radius: var(--lew-border-radius-small);
            background-color: var(--lew-form-bgcolor);
            box-sizing: border-box;
            transition: all 0.15s ease;
            cursor: pointer;
            user-select: none;
            outline: 0px var(--lew-form-border-color) solid;
            border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
        }

        .lew-date-picker-input {
            width: 100%;
            display: inline-flex;
            align-items: center;
            box-sizing: border-box;

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

        .lew-date-picker-size-small {
            .lew-date-picker-input {
                height: var(--lew-form-item-height-small);
                padding: var(--lew-form-input-padding-small);
                font-size: var(--lew-form-font-size-small);
                line-height: var(--lew-form-input-line-height-small);
            }
        }

        .lew-date-picker-size-medium {
            .lew-date-picker-input {
                height: var(--lew-form-item-height-medium);
                padding: var(--lew-form-input-padding-medium);
                font-size: var(--lew-form-font-size-medium);
                line-height: var(--lew-form-input-line-height-medium);
            }
        }

        .lew-date-picker-size-large {
            .lew-date-picker-input {
                height: var(--lew-form-item-height-large);
                padding: var(--lew-form-input-padding-large);
                font-size: var(--lew-form-font-size-large);
                line-height: var(--lew-form-input-line-height-large);
            }
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
