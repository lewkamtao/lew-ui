<template>
    <label class="lew-radio" :class="`${block ? 'lew-radio-block' : ''} `">
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
    color: var(--text-color);
    font-size: 14px;
    border-radius: 50px;
    .icon-radio-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px rgba($color: #000000, $alpha: 0.1) solid;
        box-sizing: border-box;
        margin-right: 5px;
        transition: all 0.25s ease;
        overflow: hidden;
        border-radius: 50px;
        .icon-radio {
            width: 7px;
            height: 7px;
            background-color: #fff;
            transform: translateY(100%);
            opacity: 0;
            border-radius: 2px;
            transition: all 0.25s ease;
            font-size: 12px;
            border-radius: 50px;
        }
    }

    .icon-checked-box {
        border: 2px var(--primary-color) solid;
        background: var(--primary-color);

        .icon-radio {
            transform: translateY(0%);
            opacity: 1;
        }
    }
}

.lew-radio:hover {
    .icon-radio-box {
        border: 2px rgba($color: #000000, $alpha: 0.2) solid;
    }

    .icon-checked-box {
        border: 2px var(--primary-color) solid;
        background: var(--primary-color);
    }
}

.lew-radio-block {
    background: var(--form-bgcolor);
    padding: 4px 8px 4px 6px;
    border: var(--form-border);
    border-radius: 30px;
    .icon-radio-box {
        border: 2px rgba(0, 0, 0, 0) solid;
        background: var(--form-bgcolor-hover);
    }
    .icon-checked-box {
        border: 2px var(--primary-color) solid;
        background: var(--primary-color);
    }
}
.lew-radio-block:hover {
    .icon-radio-box {
        border: 2px rgba(0, 0, 0, 0) solid;
    }
}
.lew-radio-block:hover {
    background: var(--form-bgcolor-hover);
    border: var(--form-border-hover);
}

.lew-radio-block:active {
    background: var(--form-bgcolor-active);
    border: var(--form-border-active);
}
</style>
