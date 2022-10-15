<template>
    <label
        class="lew-checkbox"
        :class="`
        ${block ? 'lew-checkbox-block' : ''} 
        ${round ? 'lew-checkbox-round' : ''} 
        ${_checked ? 'lew-checkbox-checked' : ''} 
        ${!iconable ? 'lew-checkbox-unicon' : ''}
        ${size ? 'lew-checkbox-' + size : ''}
        `"
    >
        <div v-if="iconable" class="icon-checkbox-box">
            <svg
                class="icon-checkbox"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <input
            v-show="false"
            type="checkbox"
            :checked="_checked"
            @input="setChecked"
        />
        <span v-if="label" class="lew-checkbox-label"> {{ label }}</span>
    </label>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
const props = defineProps({
    label: {
        type: String,
        default: () => {
            return '';
        },
    },
    block: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    round: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    iconable: {
        type: Boolean,
        default: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    checked: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    size: {
        type: String,
        default: 'medium',
    },
});

watch(
    () => props.checked,
    (v) => {
        if (v != _checked.value) {
            _checked.value = v;
        }
    }
);

let _checked = ref(props.checked || false);

const emit = defineEmits(['change']);

const setChecked = (e: Event) => {
    if (props.disabled) {
        return;
    }
    _checked.value = (e.target as HTMLInputElement).checked;
    emit('change', _checked.value);
};
</script>

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
    .icon-checkbox-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px var(--lew-form-border-color-hover) solid;
        box-sizing: border-box;
        border-radius: 3px;
        transition: var(--lew-form-transition);
        background-color: var(--lew-bgcolor-0);

        .icon-checkbox {
            transform: scale(0.7) translateY(50%);
            transition: var(--lew-form-transition);
            opacity: 0;
            color: var(--lew-white-color);
            font-size: 12px;
        }
    }
    .lew-checkbox-label {
        margin-left: 6px;
    }
}

.lew-checkbox-small {
    font-size: 13px;
    .icon-checkbox-box {
        width: 14px;
        height: 14px;
    }
}

.lew-checkbox-medium {
    font-size: 14px;

    .icon-checkbox-box {
        width: 16px;
        height: 16px;
    }
}

.lew-checkbox-large {
    font-size: 15px;

    .icon-checkbox-box {
        width: 18px;
        height: 18px;
    }
}

.lew-checkbox-unicon.lew-checkbox-block {
    padding: 4px 12px;
    .lew-checkbox-label {
        color: var(--lew-text-color-6);
    }
}

.lew-checkbox-unicon.lew-checkbox-checked.lew-checkbox-block {
    .lew-checkbox-label {
        color: var(--lew-primary-color-dark);
    }
}

.lew-checkbox:hover {
    .icon-checkbox-box {
        border: 2px var(--lew-form-border-color-active) solid;
    }
}

.lew-checkbox-block {
    background: var(--lew-form-bgcolor);
    padding: 3px 8px 3px 4px;
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    border-radius: var(--lew-border-radius);
    .lew-checkbox-label {
        margin-left: 2px;
    }
}
.lew-checkbox-checked.lew-checkbox-block {
    border: var(--lew-form-border-width) var(--lew-primary-color) solid;
    background: var(--lew-primary-color-light);
    color: var(--lew-primary-color-dark);
}
.lew-checkbox-checked.lew-checkbox-block:hover {
    border: var(--lew-form-border-width) var(--lew-primary-color) solid;
    background: var(--lew-primary-color-light);
    color: var(--lew-primary-color-dark);
}
.lew-checkbox-round {
    border-radius: 50px;
    .icon-checkbox-box {
        border-radius: 50%;
    }
}

.lew-checkbox-block:hover {
    background: var(--lew-form-bgcolor-hover);
}

.lew-checkbox-block:active {
    background: var(--lew-form-bgcolor-active);
}

.lew-checkbox-checked {
    .icon-checkbox-box {
        border: 2px var(--lew-primary-color) solid;
        background: var(--lew-primary-color);

        .icon-checkbox {
            transform: scale(0.85) translateY(0px);
            opacity: 1;
        }
    }
}

.lew-checkbox-checked:hover {
    .icon-checkbox-box {
        border: 2px var(--lew-primary-color) solid;
        background: var(--lew-primary-color);
    }
}
.lew-checkbox-block.lew-checkbox-checked {
    .icon-checkbox-box {
        border: 2px var(--lew-primary-color-light) solid;
        background: var(--lew-primary-color-light);

        .icon-checkbox {
            color: var(--lew-primary-color-dark);
            opacity: 1;
        }
    }
}

.lew-checkbox-block.lew-checkbox-checked:hover {
    background: var(--lew-primary-color-light);
    .icon-checkbox-box {
        border: 2px var(--lew-primary-color-light) solid;
    }
    .icon-checkbox {
        color: var(--lew-primary-color-dark);
        opacity: 1;
    }
}
</style>
