<script setup lang="ts">
import { inputProps } from './input';
import { useVModel } from '@vueuse/core';
import { object2class } from 'lew-ui/utils';

const emit = defineEmits([
    'update:modelValue',
    'update:prefixesValue',
    'update:suffixValue',
    'update:type',
    'clear',
    'blur',
    'focus',
    'change',
    'input',
]);

const props = defineProps(inputProps);
const modelValue = useVModel(props, 'modelValue', emit);
const prefixesValue = useVModel(props, 'prefixesValue', emit);
const suffixValue = useVModel(props, 'suffixValue', emit);
const lewInputRef = ref();
const _type = ref(props.type);
const state = ref({
    prefixesDropdown: 'hide',
    suffixDropdown: 'hide',
});

watch(
    () => props.type,
    (v) => {
        if (v === 'password') {
            _type.value = 'password';
        }
    }
);

const updateValue = () => {
    if (
        props.maxLength &&
        props.renderCount(modelValue.value) >= Number(props.maxLength)
    ) {
        modelValue.value = modelValue.value.slice(0, props.maxLength);
    }
};

const inputFn = () => {
    updateValue();
    emit('input', modelValue.value);
};

const clear = (): void => {
    modelValue.value = '';
    emit('clear');
};

const toFocus = () => {
    lewInputRef.value?.focus();
};

const showPasswordFn = (): void => {
    if (_type.value === 'text') {
        _type.value = 'password';
    } else {
        _type.value = 'text';
    }
};

const getCheckNumStr = computed(() => {
    if (props.showCount && props.maxLength) {
        return `${props.renderCount(modelValue.value)} / ${props.maxLength}`;
    }
    if (props.showCount) {
        return props.renderCount(modelValue.value);
    }
    return false;
});

const focus = (e: any) => {
    if (props.focusSelect) {
        e?.currentTarget?.select();
    }
    emit('focus');
};

const getIconSize = computed(() => {
    const size: any = {
        small: 13,
        medium: 14,
        large: 16,
    };
    return size[props.size];
});

const getType = computed(() => {
    if (props.type === 'password') {
        return _type.value;
    } else {
        return props.type;
    }
});

const getInputClassNames = computed(() => {
    const { size, readonly, disabled, align, autoWidth } = props;
    return object2class('lew-input-view', {
        size,
        readonly,
        disabled,
        align,
        autoWidth,
    });
});

const prefixesChange = (item: any) => {
    prefixesValue.value = item.value;
};
const suffixChange = (item: any) => {
    suffixValue.value = item.value;
};
const getPrefixesLabel = computed(() => {
    const item: any = props.prefixesOptions.find(
        (e: any) => e.value === prefixesValue.value
    );
    return item?.label || '';
});
const getSuffixLabel = computed(() => {
    const item: any = props.suffixOptions.find(
        (e: any) => e.value === suffixValue.value
    );
    return item?.label || '';
});
defineExpose({ toFocus });
</script>

<template>
    <div class="lew-input-view" :class="getInputClassNames">
        <div
            v-tooltip="{
                content: prefixesTooltip,
                trigger: 'mouseenter',
            }"
            v-if="prefixes"
            class="lew-input-prefixes"
        >
            <div v-if="prefixes === 'text'" class="lew-input-prefixes-text">
                {{ prefixesValue }}
            </div>
            <div v-if="prefixes === 'icon'" class="lew-input-prefixes-icon">
                <lew-icon :size="getIconSize" :type="prefixesValue"> </lew-icon>
            </div>
            <div v-if="prefixes === 'select'" class="lew-input-prefixes-select">
                <lew-dropdown
                    placement="bottom"
                    trigger="click"
                    :options="prefixesOptions"
                    @change="prefixesChange"
                    @show="state.prefixesDropdown = 'show'"
                    @hide="state.prefixesDropdown = 'hide'"
                >
                    <lew-flex
                        gap="5px"
                        x="start"
                        class="lew-input-prefixes-dropdown"
                        :class="{
                            'lew-input-prefixes-dropdown-open':
                                state.prefixesDropdown === 'show',
                        }"
                    >
                        {{ getPrefixesLabel }}
                        <lew-icon
                            :size="getIconSize"
                            type="chevron-down"
                            class="icon-select"
                        />
                    </lew-flex>
                </lew-dropdown>
            </div>
        </div>
        <input
            ref="lewInputRef"
            class="lew-input"
            autocomplete="new-password"
            v-model="modelValue"
            :disabled="disabled"
            :placeholder="placeholder"
            :type="getType"
            :readonly="readonly"
            onkeypress="if(window.event.keyCode==13) this.blur()"
            @input="inputFn"
            @change="emit('change', modelValue)"
            @blur="emit('blur', modelValue)"
            @focus="focus"
        />
        <div
            v-tooltip="{
                content: suffixTooltip,
                trigger: suffixTooltip ? 'mouseenter' : '',
            }"
            v-if="suffix"
            class="lew-input-suffix"
        >
            <div v-if="suffix === 'text'" class="lew-input-suffix-text">
                {{ suffixValue }}
            </div>
            <div v-if="suffix === 'icon'" class="lew-input-suffix-icon">
                <lew-icon :size="getIconSize" :type="suffixValue"> </lew-icon>
            </div>
            <div v-if="suffix === 'select'" class="lew-input-suffix-select">
                <lew-dropdown
                    placement="bottom"
                    trigger="click"
                    :options="suffixOptions"
                    @change="suffixChange"
                    @show="state.suffixDropdown = 'show'"
                    @hide="state.suffixDropdown = 'hide'"
                >
                    <lew-flex
                        gap="5px"
                        x="start"
                        class="lew-input-suffix-dropdown"
                        :class="{
                            'lew-input-suffix-dropdown-open':
                                state.suffixDropdown === 'show',
                        }"
                    >
                        {{ getSuffixLabel }}
                        <lew-icon
                            :size="getIconSize"
                            type="chevron-down"
                            class="icon-select"
                        />
                    </lew-flex>
                </lew-dropdown>
            </div>
        </div>
        <label v-if="autoWidth" class="lew-input-auto-width">
            {{ modelValue }}
        </label>
        <div
            v-if="showPassword || clearable || showCount"
            class="lew-input-controls"
        >
            <div v-if="getCheckNumStr" class="lew-input-count">
                {{ getCheckNumStr }}
            </div>
            <div
                v-if="showPassword && type === 'password'"
                class="lew-input-show-password"
                @mousedown.prevent=""
                @click="showPasswordFn"
            >
                <lew-icon
                    v-show="_type === 'text'"
                    :size="getIconSize"
                    type="eye"
                />
                <lew-icon
                    v-show="_type === 'password'"
                    :size="getIconSize"
                    type="eye-off"
                />
            </div>
            <transition name="clear-hid">
                <div
                    v-if="clearable && modelValue"
                    class="lew-input-clear"
                    @mousedown.prevent=""
                    @click="clear"
                >
                    <lew-icon :size="getIconSize" type="x-circle" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    border-radius: var(--lew-border-radius);
    background-color: var(--lew-form-bgcolor);
    transition: var(--lew-form-transition);
    box-sizing: border-box;
    outline: 0px transparent solid;
    border: var(--lew-form-border-width) transparent solid;
    box-shadow: var(--lew-form-box-shadow);
    overflow: hidden;
    .lew-input-prefixes,
    .lew-input-suffix {
        white-space: nowrap;
        user-select: none;
        display: inline-flex;
        align-items: center;
        .icon-select {
            transition: var(--lew-form-transition);
        }
        .icon-select-up {
            transform: rotate(180deg);
        }
    }
    .lew-input-prefixes-dropdown,
    .lew-input-suffix-dropdown {
        cursor: pointer;
    }
    .lew-input-prefixes-dropdown-open,
    .lew-input-suffix-dropdown-open {
        opacity: 0.4;
        .icon-select {
            transform: rotate(180deg);
        }
    }

    .lew-input-prefixes-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .lew-input-suffix-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }

    .lew-input {
        width: 100%;
        text-overflow: ellipsis;
        border: none;
        background: none;
        color: var(--lew-text-color-2);
        outline: none;
        box-sizing: border-box;
    }

    .lew-input {
        overflow: hidden;
    }

    .lew-input::placeholder {
        color: rgb(165, 165, 165);
    }
    .lew-input-controls {
        display: inline-flex;
        align-items: center;
        margin-right: 3px;
        > div {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            padding: 0px 4px;
        }
        .lew-input-count {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            opacity: var(--lew-form-icon-opacity);
            transition: all 0.25s;
            z-index: 2;
        }
        .lew-input-clear {
            opacity: var(--lew-form-icon-opacity);
            cursor: pointer;
        }

        .lew-input-show-password {
            opacity: var(--lew-form-icon-opacity);
            transition: all 0.25s;
            cursor: pointer;
        }

        .lew-input-show-password:hover,
        .lew-input-clear:hover {
            opacity: var(--lew-form-icon-opacity-hover);
        }
    }
}

.lew-input-view-align-left {
    .lew-input {
        text-align: left;
    }
}

.lew-input-view-align-center {
    .lew-input {
        text-align: center;
    }
}

.lew-input-view-align-right {
    .lew-input {
        text-align: right;
    }
}

.lew-input-view-autoWidth {
    position: relative;
    width: auto;

    .lew-input {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0px;
        display: inline-block;
        width: 100%;
    }

    .lew-input-auto-width {
        width: auto;
        min-width: 65px;
        height: 100%;
        visibility: hidden;
        box-sizing: border-box;
    }
}

.lew-input-view-size-small {
    .lew-input {
        padding: var(--lew-form-input-padding-small);
        font-size: var(--lew-form-font-size-small);
        line-height: var(--lew-form-input-line-height-small);
    }
    .lew-input-prefixes {
        font-size: var(--lew-form-font-size-small);
        margin-left: 7px;
    }
    .lew-input-suffix {
        font-size: var(--lew-form-font-size-small);
        margin-right: 7px;
    }
    .lew-input {
        height: var(--lew-form-item-height-small);
    }

    .lew-input-controls {
        height: var(--lew-form-item-height-small);
        .lew-input-count {
            font-size: 12px;
        }
    }

    .lew-input-auto-width {
        height: var(--lew-form-item-height-small);
        padding: var(--lew-form-input-padding-small);
        font-size: var(--lew-form-font-size-small);
        line-height: var(--lew-form-input-line-height-small);
    }
    .clear-hid-enter-from,
    .clear-hid-leave-to {
        opacity: 0;
        margin-right: -31px;
    }
}

.lew-input-view-size-medium {
    .lew-input {
        padding: var(--lew-form-input-padding-medium);
        font-size: var(--lew-form-font-size-medium);
        line-height: var(--lew-form-input-line-height-medium);
        height: var(--lew-form-item-height-medium);
    }
    .lew-input-prefixes {
        font-size: var(--lew-form-font-size-medium);
        margin-left: 9px;
    }
    .lew-input-suffix {
        font-size: var(--lew-form-font-size-medium);
        margin-right: 9px;
    }
    .lew-input-controls {
        height: var(--lew-form-item-height-medium);
        .lew-input-count {
            font-size: 13px;
        }
    }

    .lew-input-auto-width {
        height: var(--lew-form-item-height-medium);
        font-size: var(--lew-form-font-size-medium);
        line-height: var(--lew-form-input-line-height-medium);
        padding: var(--lew-form-input-padding-medium);
    }

    .clear-hid-enter-from,
    .clear-hid-leave-to {
        opacity: 0;
        margin-right: -32px;
    }
}

.lew-input-view-size-large {
    .lew-input {
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
        height: var(--lew-form-item-height-large);
    }
    .lew-input-prefixes {
        font-size: var(--lew-form-font-size-large);
        margin-left: 12px;
    }
    .lew-input-suffix {
        font-size: var(--lew-form-font-size-large);
        margin-right: 12px;
    }
    .lew-input-controls {
        height: var(--lew-form-item-height-large);
        .lew-input-count {
            font-size: 14px;
        }
    }

    .lew-input-auto-width {
        height: var(--lew-form-item-height-large);
        padding: var(--lew-form-input-padding-large);
        font-size: var(--lew-form-font-size-large);
        line-height: var(--lew-form-input-line-height-large);
    }

    .clear-hid-enter-from,
    .clear-hid-leave-to {
        opacity: 0;
        margin-right: -34px;
    }
}

.lew-input-view:hover {
    background-color: var(--lew-form-bgcolor-hover);
}

.lew-input-view:focus-within {
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
        solid;
    outline: var(--lew-form-ouline);
    background-color: var(--lew-form-bgcolor-focus);
}
.lew-input-view-readonly {
    user-select: text;
    pointer-events: none; //鼠标点击不可修改
}
.lew-input-view-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none; //鼠标点击不可修改
}

.lew-input-view-disabled:hover {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:active {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}

.lew-input-view-disabled:focus-within {
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    background-color: var(--lew-form-bgcolor);
}
.clear-hid-enter-active,
.clear-hid-leave-active {
    transition: var(--lew-form-transition);
}
</style>
