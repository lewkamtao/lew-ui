<template>
    <label
        class="lew-checkbox"
        :class="`${block ? 'lew-checkbox-block' : ''} ${
            round ? 'lew-checkbox-round' : ''
        } ${checked ? 'lew-checkbox-checked' : ''} `"
    >
        <div class="icon-checkbox-box">
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
            :checked="checked"
            @input="setChecked"
        />
        {{ label }}
    </label>
</template>

<script lang="ts" setup>
defineProps({
    label: {
        type: String,
        required: true,
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
    checked: {
        type: Boolean,
    },
});

const emit = defineEmits(['update:checked']);

const setChecked = (event: Event) => {
    emit('update:checked', (event.target as HTMLInputElement).checked);
};
</script>

<style lang="scss" scoped>
.lew-checkbox {
    display: inline-flex;
    align-items: center;
    user-select: none;
    margin: 0px 20px 15px 0px;
    cursor: pointer;
    color: var(--lew-text-color-1);
    font-size: 14px;
    transition: all 0.25s ease;
    .icon-checkbox-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px var(--lew-form-border-color-hover) solid;
        box-sizing: border-box;
        border-radius: var(--lew-form-border-radius);
        margin-right: 6px;
        transition: all 0.25s ease;
        background-color: var(--lew-bgcolor-0);
        .icon-checkbox {
            transform: scale(0.6) translateY(50%);
            transition: all 0.25s ease;
            opacity: 0;
            color: #fff;
            font-size: 12px;
        }
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
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-form-border-radius);
}

.lew-checkbox-round {
    border-radius: 50px;
    .icon-checkbox-box {
        border-radius: 50%;
    }
}

.lew-checkbox-block:hover {
    background: var(--lew-form-bgcolor-hover);
    border: var(--lew-form-border-width) var(--lew-form-border-color-hover)
        solid;
}

.lew-checkbox-block:active {
    background: var(--lew-form-bgcolor-active);
    border: var(--lew-form-border-width) var(--lew-form-border-color-active)
        solid;
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
</style>
