<template>
    <label
        class="lew-checkbox"
        :class="`${block ? 'lew-checkbox-block' : ''} ${
            round ? 'lew-checkbox-round' : ''
        } ${_checked ? 'lew-checkbox-checked' : ''} 
        ${!iconable ? 'lew-checkbox-unicon' : ''}
        `"
    >
        <div class="icon-checkbox-box" v-if="iconable">
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
    checked: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
});

watch(
    () => props.checked,
    (v) => {
        if (v != _checked.value) {
            _checked.value = v;
        }
    },
);

let _checked = ref(props.checked || false);

const emit = defineEmits(['change']);

const setChecked = (e: Event) => {
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
    transition: all 0.25s ease;
    white-space: nowrap;
    .icon-checkbox-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px var(--lew-form-border-color-hover) solid;
        box-sizing: border-box;
        border-radius: var(--lew-form-border-radius);
        transition: all 0.25s ease;
        background-color: var(--lew-bgcolor-0);

        .icon-checkbox {
            transform: scale(0.6) translateY(50%);
            transition: all 0.25s ease;
            opacity: 0;
            color: var(--lew-white-color);
            font-size: 12px;
        }
    }
    .lew-checkbox-label {
        margin-left: 6px;
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
    border-radius: var(--lew-form-border-radius);
    .lew-checkbox-label {
        margin-left: 3px;
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
            transform: scale(0.9) translateY(0px);
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
