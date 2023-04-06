<script lang="ts" setup>
import { useVModel, watchArray } from '@vueuse/core';
import { checkboxGroupProps } from './checkbox';
import type { CheckboxOptions } from './checkbox';

import LewCheckbox from './LewCheckbox.vue';

const props = defineProps(checkboxGroupProps);
const emit = defineEmits(['change', 'update:modelValue']);
const modelValue = useVModel(props, 'modelValue', emit);
const checkList = ref([] as any);

const change = (item: CheckboxOptions, checked: boolean) => {
    if (checked) {
        modelValue.value.push(item.value);
    } else {
        const index = props.modelValue.findIndex((e: any) => e === item.value);
        if (index >= 0) {
            modelValue.value.splice(index, 1);
        }
    }
    emit('change', {
        value: toRaw(modelValue.value),
        item: toRaw(item),
    });
};

watchArray(modelValue.value, () => {
    initCheckbox();
});

const initCheckbox = () => {
    checkList.value = props.options.map((item) => {
        if (modelValue.value.includes(item.value)) {
            return true;
        }
        return false;
    });
};

initCheckbox();
</script>
<template>
    <lew-flex
        x="start"
        gap="15"
        :direction="direction"
        class="lew-checkbox-group"
    >
        <lew-checkbox
            v-for="(item, index) in options"
            :key="item.value"
            v-model="checkList[index]"
            :block="block"
            :iconable="iconable"
            :round="round"
            :size="size"
            :label="item.label"
            :disabled="item.disabled"
            @change="change(item, $event)"
        />
    </lew-flex>
</template>

<style lang="scss" scoped>
.lew-checkbox-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.lew-checkbox-group-small {
    min-height: var(--lew-form-item-height-small);
}

.lew-checkbox-group-medium {
    min-height: var(--lew-form-item-height-medium);
}

.lew-checkbox-group-large {
    min-height: var(--lew-form-item-height-large);
}

.lew-checkbox-group.lew-checkbox-group-x {
    flex-direction: row;
}

.lew-checkbox-group.lew-checkbox-group-y {
    align-items: flex-start;
    flex-direction: column;
}
</style>
