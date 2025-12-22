<script setup lang="ts">
import type { LewCheckboxOption } from "lew-ui";
import { LewCheckbox, LewFlex } from "lew-ui";
import { object2class } from "lew-ui/utils";
import { checkboxGroupEmits } from "./emits";
import { checkboxGroupProps } from "./props";

// Props and Emits
const props = defineProps(checkboxGroupProps);
const emit = defineEmits(checkboxGroupEmits);

// v-model
const modelValue = defineModel<string[]>({
  default: () => [],
  required: true,
});

// State
const checkList = ref<boolean[]>([]);

// Computed properties
const getCheckboxGroupClassName = computed(() => {
  const { size, readonly, disabled } = props;
  return object2class("lew-checkbox-group", {
    size,
    readonly,
    disabled,
  });
});

// Methods
function getItemDisabled(item: LewCheckboxOption): boolean {
  return item.disabled || !!props.disabled;
}

function change({ item, checked }: { item: LewCheckboxOption; checked: boolean }) {
  const currentValue = modelValue.value || [];
  let newValue: string[];

  if (checked) {
    newValue = [...currentValue, item.value];
  } else {
    newValue = currentValue.filter((value) => value !== item.value);
  }

  modelValue.value = newValue;
  emit("change", newValue, item);
}

function initCheckbox() {
  if (!props.options) {
    return;
  }
  checkList.value = props.options.map((item: LewCheckboxOption) => {
    return modelValue.value?.includes(item.value) ?? false;
  });
}

// Watchers
watch(
  () => modelValue.value,
  () => {
    initCheckbox();
  },
  {
    deep: true,
  }
);

// Lifecycle
initCheckbox();
</script>

<template>
  <LewFlex
    x="start"
    gap="10"
    wrap
    :direction
    class="lew-checkbox-group"
    :class="getCheckboxGroupClassName"
  >
    <LewCheckbox
      v-for="(item, index) in options"
      :key="item.value"
      v-model="checkList[index]"
      :block="block"
      :iconable="iconable"
      :round="round"
      :size="size"
      :label="item.label"
      :disabled="getItemDisabled(item)"
      @change="change({ item, checked: $event })"
    />
  </LewFlex>
</template>

<style lang="scss" scoped>
.lew-checkbox-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lew-checkbox-group-size-small {
  min-height: var(--lew-form-item-height-small);
}

.lew-checkbox-group-size-medium {
  min-height: var(--lew-form-item-height-medium);
}

.lew-checkbox-group-size-large {
  min-height: var(--lew-form-item-height-large);
}

.lew-checkbox-group-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-checkbox-group-readonly {
  pointer-events: none;
}
</style>
