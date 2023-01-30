<template>
    <label
        class="lew-radio"
        :class="`
    ${block ? 'lew-radio-block' : ''}  
    ${checked ? 'lew-radio-checked' : ''}   
    ${!iconable ? 'lew-radio-unicon' : ''}
    ${size ? 'lew-radio-' + size : ''} 
    `"
    >
        <div class="icon-radio-box" v-if="iconable">
            <div class="icon-radio"></div>
        </div>
        <input
            v-show="false"
            type="radio"
            :checked="checked"
            @input="setChecked"
        />
        <span v-if="label" class="lew-radio-label"> {{ label }}</span>
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
    iconable: {
        type: Boolean,
        default: true,
    },
    checked: {
        type: Boolean,
    },
    size: {
        type: String,
        default: 'medium',
    },
});

const emit = defineEmits(['update:checked']);

const setChecked = () => {
    emit('update:checked');
};
</script>

<style lang="scss" scoped>
.lew-radio {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    color: var(--lew-text-color-1);
    font-size: 14px;
    border-radius: 50px;
    transition: var(--lew-form-transition);

    .icon-radio-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px var(--lew-form-border-color-hover) solid;
        box-sizing: border-box;
        transition: var(--lew-form-transition);
        overflow: hidden;
        border-radius: 50%;
        background-color: var(--lew-bgcolor-0);
        outline: 0px var(--lew-primary-color-light) solid;
        .icon-radio {
            width: 50%;
            height: 50%;
            background-color: var(--lew-white-color);
            transform: translateY(100%);
            opacity: 0;
            transition: var(--lew-form-transition);
            font-size: 12px;
            border-radius: 50%;
        }
    }

    .lew-radio-label {
        margin-left: 6px;
    }
}

.lew-radio-small {
    font-size: 13px;

    .icon-radio-box {
        width: 14px;
        height: 14px;
    }
}

.lew-radio-medium {
    font-size: 14px;

    .icon-radio-box {
        width: 16px;
        height: 16px;
    }
}

.lew-radio-large {
    font-size: 15px;

    .icon-radio-box {
        width: 18px;
        height: 18px;
    }
}

.lew-radio-unicon.lew-radio-block {
    padding: 4px 12px;

    .lew-radio-label {
        color: var(--lew-text-color-6);
    }
}

.lew-radio-unicon.lew-radio-checked.lew-radio-block {
    .lew-radio-label {
        color: var(--lew-primary-color-dark);
    }
}

.lew-radio:hover {
    .icon-radio-box {
        border: 2px var(--lew-form-border-color-active) solid;
        outline: 3px var(--lew-primary-color-light) solid;
    }
}

.lew-radio-block {
    background: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    padding: 3px 8px 3px 4px;
    border-radius: 50px;

    .lew-radio-label {
        margin-left: 2px;
    }
}

.lew-radio-block:hover {
    background: var(--lew-form-bgcolor-hover);
}

.lew-radio-block:active {
    background: var(--lew-form-bgcolor-active);
}

.lew-radio-checked.lew-radio-block {
    border: var(--lew-form-border-width) var(--lew-primary-color) solid;
    background: var(--lew-primary-color-light);
    color: var(--lew-primary-color-dark);
}

.lew-radio-checked.lew-radio-block:hover {
    border: var(--lew-form-border-width) var(--lew-primary-color) solid;
    background: var(--lew-primary-color-light);
    color: var(--lew-primary-color-dark);
}

.lew-radio-checked {
    .icon-radio-box {
        border: 2px var(--lew-primary-color) solid;
        background: var(--lew-primary-color);

        .icon-radio {
            transform: translateY(0%);
            opacity: 1;
        }
    }
}

.lew-radio-checked:hover {
    .icon-radio-box {
        border: 2px var(--lew-primary-color) solid;
        background: var(--lew-primary-color);
    }
}

.lew-radio-block.lew-radio-checked {
    .icon-radio-box {
        border: 2px var(--lew-primary-color-light) solid;
        background: var(--lew-primary-color-light);

        .icon-radio {
            background-color: var(--lew-primary-color-dark);
            opacity: 1;
            transform: translateY(0%) scale(1.15);
        }
    }
}

.lew-radio-block.lew-radio-checked:hover {
    background: var(--lew-primary-color-light);

    .icon-radio-box {
        border: 2px var(--lew-primary-color-light) solid;
    }

    .icon-radio {
        background-color: var(--lew-primary-color-dark);
        opacity: 1;
        transform: translateY(0%) scale(1.15);
    }
}
</style>
