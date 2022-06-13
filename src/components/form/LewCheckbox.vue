<template>
    <label>
        <input
            type="checkbox"
            :checked="checked"
            @input="(event) => emit('update:checked', event.target.checked)"
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
</script>

<style></style>
