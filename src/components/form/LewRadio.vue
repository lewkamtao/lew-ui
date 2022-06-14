<template>
    <label class="lew-radio">
        <div class="icon-radio-box" :class="{ 'icon-checked-box': checked }">
            <div class="icon-radio"></div>
        </div>
        <input v-show="false" type="radio" :checked="checked" @input="setChecked" />
        {{ label }}
    </label>
</template>

<script lang="ts" setup>
defineProps({
    label: {
        type: String,
        required: true,
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
    margin: 0px 15px 15px 0px;
    cursor: pointer;
    color: var(--text-color);
    font-size: 14px;

    .icon-radio-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px rgba($color: #000000, $alpha: 0.1) solid;
        box-sizing: border-box;
        border-radius: 50px;
        margin-right: 5px;
        transition: all 0.25s ease;
        overflow: hidden;

        .icon-radio {
            width: 7px;
            height: 7px;
            background-color: #fff;
            transform: translateY(100%);
            opacity: 0;
            border-radius: 50px;
            transition: all 0.25s ease;
            font-size: 12px;
        }
    }

    .icon-checked-box {
        border: 2px var(--primary-bgcolor) solid;
        background: var(--primary-bgcolor);

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
        border: 2px var(--primary-bgcolor) solid;
        background: var(--primary-bgcolor);
    }
}
</style>
