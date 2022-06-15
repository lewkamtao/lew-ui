<template>
    <label class="lew-checkbox">
        <div class="icon-checkbox-box" :class="{ 'icon-checked-box': checked }">
            <svg
                class="icon-checkbox"
                :class="{ 'icon-checked': checked }"
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
    margin: 0px 20px 20px 0px;
    cursor: pointer;
    color: var(--text-color);
    font-size: 14px;

    .icon-checkbox-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 2px rgba($color: #000000, $alpha: 0.1) solid;
        box-sizing: border-box;
        border-radius: 5px;
        margin-right: 5px;
        transition: all 0.25s ease;

        .icon-checkbox {
            transform: scale(0.6) translateY(50%);
            transition: all 0.25s ease;
            opacity: 0;
            color: #fff;
            font-size: 12px;
        }
    }

    .icon-checked-box {
        border: 2px var(--primary-bgcolor) solid;
        background: var(--primary-bgcolor);

        .icon-checkbox {
            transform: scale(0.9) translateY(0px);
            opacity: 1;
        }
    }
}

.lew-checkbox:hover {
    .icon-checkbox-box {
        border: 2px rgba($color: #000000, $alpha: 0.2) solid;
    }

    .icon-checked-box {
        border: 2px var(--primary-bgcolor) solid;
        background: var(--primary-bgcolor);
    }
}
</style>
