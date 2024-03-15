<script lang="ts" setup>
    import { useVModel } from '@vueuse/core';
    import { object2class } from 'lew-ui/utils';
    import { checkboxProps } from './props';

    const props = defineProps(checkboxProps);

    const emit = defineEmits(['change', 'update:modelValue']);
    const modelValue = useVModel(props, 'modelValue', emit);

    const setChecked = (e: Event) => {
        if (props.disabled) {
            return;
        }
        const { checked } = e.target as HTMLInputElement;
        modelValue.value = checked;
        emit('change', checked);
    };

    const getIconSize = computed(() => {
        const { size } = props;
        switch (size) {
            case 'small':
                return 9;
            case 'medium':
                return 11;
            case 'large':
                return 13;
            default:
                return 11;
        }
    });
    const getCheckboxClassName = computed(() => {
        const { block, round, iconable, size, disabled, certain } = props;
        const checked = modelValue.value || props.checked;
        const unicon = !iconable && block;

        return object2class('lew-checkbox', {
            block,
            round,
            size,
            checked,
            unicon,
            disabled,
            certain
        });
    });
</script>
<template>
    <label class="lew-checkbox" :class="getCheckboxClassName">
        <div v-if="iconable || (!iconable && !block)" class="icon-checkbox-box">
            <i v-show="certain" class="icon-certain"></i>
            <lew-icon stroke-width="4" class="icon-checkbox" type="check" :size="getIconSize" />
        </div>
        <input v-show="false" type="checkbox" :checked="modelValue" @change="setChecked" />
        <span v-if="label" class="lew-checkbox-label"> {{ label }}</span>
    </label>
</template>

<style lang="scss" scoped>
    .lew-checkbox {
        display: inline-flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        color: var(--lew-text-color-1);
        font-size: 14px;
        transition: var(--lew-form-transition);
        white-space: nowrap;
        box-sizing: border-box;

        .icon-checkbox-box {
            position: relative;
            width: 18px;
            height: 18px;
            border: var(--lew-form-border-width) var(--lew-checkbox-border-color) solid;
            box-sizing: border-box;
            border-radius: 6px;
            transition: var(--lew-form-transition);
            background-color: var(--lew-bgcolor-1);
            outline: 0px var(--lew-checkbox-color-light) solid;
            overflow: hidden;

            .icon-checkbox {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, calc(-50% + 10px)) rotate(-10deg) scale(0.2);
                transform-origin: 50%;
                transition: var(--lew-form-transition);
                opacity: 0;
                color: var(--lew-color-white);
            }
        }

        .lew-checkbox-label {
            margin-left: 6px;
        }
    }

    .lew-checkbox-size-small {
        font-size: 13px;

        .icon-checkbox-box {
            width: 14px;
            height: 14px;
            border-radius: 4px;
        }
    }

    .lew-checkbox-size-medium {
        font-size: 14px;

        .icon-checkbox-box {
            width: 16px;
            height: 16px;
            border-radius: 5px;
        }
    }

    .lew-checkbox-size-large {
        font-size: 15px;

        .icon-checkbox-box {
            width: 18px;
            height: 18px;
            border-radius: 6px;
        }
    }

    .lew-checkbox-unicon.lew-checkbox-block {
        padding: 4px 12px;
        .lew-checkbox-label {
            margin-left: 0px;
        }
    }

    .lew-checkbox-unicon.lew-checkbox-checked.lew-checkbox-block {
        .lew-checkbox-label {
            color: var(--lew-checkbox-color-dark);
        }
    }

    .lew-checkbox:hover {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
            outline: var(--lew-form-ouline);
            background: var(--lew-form-bgcolor);
        }
    }

    .lew-checkbox-block {
        background: var(--lew-checkbox-block-color);
        padding: 3px 8px 3px 4px;
        border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
        border-radius: var(--lew-border-radius-small);
        .icon-checkbox-box {
            .icon-checkbox {
                padding: 1px;
            }
        }
        .lew-checkbox-label {
            margin-left: 4px;
        }
    }

    .lew-checkbox-checked.lew-checkbox-block {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
        background: var(--lew-checkbox-color-light);
        color: var(--lew-checkbox-color-dark);
    }

    .lew-checkbox-checked.lew-checkbox-block:hover {
        border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
        background: var(--lew-checkbox-color-light);
    }

    .lew-checkbox-round {
        border-radius: 50px;

        .icon-checkbox-box {
            border-radius: 50%;
        }
    }

    .lew-checkbox-block:hover {
        background: var(--lew-form-bgcolor-hover);
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
        }
    }

    .lew-checkbox-checked {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
            background: var(--lew-checkbox-color);

            .icon-checkbox {
                transform: translate(-50%, -50%) rotate(0deg) scale(1);
                opacity: 1;
            }
        }
    }

    .lew-checkbox-checked:hover {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
            background: var(--lew-checkbox-color);
        }
    }

    .lew-checkbox-block.lew-checkbox-checked {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) transparent solid;
            background: transparent;

            .icon-checkbox {
                color: var(--lew-checkbox-color-dark);
                opacity: 1;
            }
        }
    }

    .lew-checkbox-block.lew-checkbox-checked:hover {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) transparent solid;
        }
    }

    .lew-checkbox-disabled {
        opacity: var(--lew-disabled-opacity);
        pointer-events: none; //鼠标点击不可修改
    }

    .lew-checkbox-certain {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
            background: var(--lew-checkbox-color);
            .icon-certain {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 60%;
                height: 2px;
                border-radius: 2px;
                background-color: var(--lew-color-white);
            }
        }
    }
    .lew-checkbox-certain:hover {
        .icon-checkbox-box {
            border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
            background: var(--lew-checkbox-color);
        }
    }
</style>
