<template>
    <label
        class="lew-radio"
        :class="`${block ? 'lew-radio-block' : ''}  ${
            checked ? 'lew-radio-checked' : ''
        } `"
    >
        <div class="icon-radio-box" :class="{ 'icon-checked-box': checked }">
            <div class="icon-radio"></div>
        </div>
        <input
            v-show="false"
            type="radio"
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

    checked: {
        type: Boolean,
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
    margin: 0px 20px 15px 0px;
    cursor: pointer;
    color: var(--lew-text-color-1);
    font-size: 14px;
    border-radius: 50px;
    transition: all 0.25s ease;
    .icon-radio-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px var(--lew-form-border-color-hover) solid;
        box-sizing: border-box;
        margin-right: 5px;
        transition: all 0.25s ease;
        overflow: hidden;
        border-radius: 50%;
        background-color: var(--lew-bgcolor-0);
        .icon-radio {
            width: 7px;
            height: 7px;
            background-color: #fff;
            transform: translateY(100%);
            opacity: 0;
            transition: all 0.25s ease;
            font-size: 12px;
            border-radius: 50%;
        }
    }
}
.lew-radio:hover {
    .icon-radio-box {
        border: 2px var(--lew-form-border-color-active) solid;
    }
}
.lew-radio-block {
    background: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
    padding: 3px 8px 3px 4px;
    border-radius: 50px;
}

.lew-radio-block:hover {
    background: var(--lew-form-bgcolor-hover);
}

.lew-radio-block:active {
    background: var(--lew-form-bgcolor-active);
}

.lew-radio-checked.lew-radio-block {
    border: var(--lew-form-border-width) var(--lew-primary-color) solid;
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
</style>
