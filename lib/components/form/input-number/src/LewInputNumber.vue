<script setup lang="ts">
import { LewFlex, LewTooltip, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import { any2px, object2class } from "lew-ui/utils";
import { cloneDeep } from "lodash-es";
import { inputNumberEmits } from "./emits";
import { inputNumberProps } from "./props";

// Props & Emits
const props = defineProps(inputNumberProps);
const emit = defineEmits(inputNumberEmits);

// Models
const modelValue = defineModel<number | undefined>({ required: true });

// Constants
const LONG_CLICK_DELAY = 250;
const LONG_CLICK_INTERVAL = 80;

// Refs
const lewInputRef = ref<HTMLInputElement>();
const isFocus = ref(false);
const validationMessage = ref("");
const longClickTimer = ref<NodeJS.Timeout>();

// Initialize tooltip directive
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive("tooltip")) {
  app.use(LewTooltip);
}

// Computed
const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align } = props;
  return object2class("lew-input-number-view", {
    focus: isFocus.value,
    size,
    readonly,
    disabled,
    align,
  });
});

const getInputNumberStyle = computed(() => {
  const { size, align } = props;
  return {
    textAlign: align,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
  };
});

const getInputNumberViewStyle = computed(() => {
  const { width, size } = props;
  return {
    width: any2px(width),
    height: `var(--lew-form-item-height-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`,
  };
});

const getIconSize = computed(() => {
  const { size } = props;
  const sizeMap: Record<string, number> = {
    small: 12,
    medium: 14,
    large: 16,
  };
  return sizeMap[size];
});

const getControlStyle = computed(() => {
  const { size } = props;
  return {
    height: `var(--lew-form-item-height-${size})`,
  };
});

// Methods
function focus() {
  lewInputRef.value?.focus();
}

function focusFn(e: FocusEvent) {
  if (props.selectByFocus) {
    (e.currentTarget as HTMLInputElement)?.select();
  }
}

function inputFn(e: Event) {
  const target = e.target as HTMLInputElement;
  checkValidationMessage();
  emit("input", target.value);
  validationMessage.value = lewInputRef.value?.validationMessage || "";
}

function changeFn() {
  emit("change", cloneDeep(modelValue.value));
}

function clearTimer() {
  if (longClickTimer.value) {
    clearInterval(longClickTimer.value);
  }
}

function checkValidationMessage() {
  validationMessage.value = lewInputRef.value?.validationMessage || "";
  return validationMessage.value.length === 0;
}

function validCheck() {
  return (lewInputRef.value?.validationMessage || "").length === 0;
}

function plus() {
  if (!lewInputRef.value) return;
  lewInputRef.value.stepUp();
  modelValue.value = Number(lewInputRef.value.value);
  longClickTimer.value = setTimeout(() => {
    longClickTimer.value = setInterval(() => {
      if (!lewInputRef.value) return;
      lewInputRef.value.stepUp();
      modelValue.value = Number(lewInputRef.value.value);
      emit("change", cloneDeep(modelValue.value));
      checkValidationMessage();
      const currentValue = Number(lewInputRef.value.value);
      if (props.max !== undefined && currentValue >= Number(props.max || 0)) {
        clearTimer();
      }
    }, LONG_CLICK_INTERVAL);
  }, LONG_CLICK_DELAY);
}

function minus() {
  if (!lewInputRef.value) return;
  lewInputRef.value.stepDown();
  modelValue.value = Number(lewInputRef.value.value);
  longClickTimer.value = setTimeout(() => {
    longClickTimer.value = setInterval(() => {
      if (!lewInputRef.value) return;
      lewInputRef.value.stepDown();
      modelValue.value = Number(lewInputRef.value.value);
      emit("change", cloneDeep(modelValue.value));
      checkValidationMessage();
      const currentValue = Number(lewInputRef.value.value);
      if (props.min !== undefined && currentValue <= Number(props.min || 0)) {
        clearTimer();
      }
    }, LONG_CLICK_INTERVAL);
  }, LONG_CLICK_DELAY);
}

// Lifecycle
onUnmounted(() => {
  clearTimer();
});

// Expose
defineExpose({ focus, validCheck });
</script>

<template>
  <div
    v-tooltip="{
      content: validationMessage,
      triggerFrom: 'input-number',
    }"
    class="lew-input-number-view"
    :class="getInputClassNames"
    :style="getInputNumberViewStyle"
    @wheel="(e: any) => e.preventDefault()"
    @mouseenter="checkValidationMessage"
  >
    <input
      ref="lewInputRef"
      v-model="modelValue"
      title=""
      type="number"
      class="lew-input-number"
      :placeholder="
        placeholder ? placeholder : locale.t('inputNumber.placeholder')
      "
      :min="min"
      :max="max"
      :step="step"
      :style="getInputNumberStyle"
      @input="inputFn"
      @change="changeFn"
      @focus="focusFn"
    />
    <LewFlex
      :style="getControlStyle"
      direction="y"
      x="end"
      gap="2px"
      class="lew-input-number-control"
      @mouseenter="isFocus = true"
      @mouseleave="isFocus = false"
    >
      <CommonIcon
        class="lew-input-number-icon"
        :size="getIconSize"
        type="chevron-up"
        @mousedown="plus"
        @mouseup="clearTimer"
        @mouseleave="clearTimer"
      />
      <CommonIcon
        class="lew-input-number-icon"
        :size="getIconSize"
        type="chevron-down"
        @mousedown="minus"
        @mouseup="clearTimer"
        @mouseleave="clearTimer"
      />
    </LewFlex>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-number-view {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: var(--lew-border-radius-small);
  background-color: var(--lew-form-bgcolor);
  transition: background-color var(--lew-form-transition-ease),
    border-color var(--lew-form-transition-ease);
  box-sizing: border-box;
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  box-shadow: var(--lew-form-box-shadow);
  overflow: hidden;

  .lew-input-number {
    width: calc(100% - 30px);
    text-overflow: ellipsis;
    border: none;
    background: none;
    color: var(--lew-text-color-1);
    outline: none;
    box-sizing: border-box;
    overflow: hidden;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .lew-input-number:invalid {
    text-decoration: line-through;
  }

  .lew-input-number::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-input-number-control {
    width: 30px;
    height: 100%;
    user-select: none;
    padding-right: 2px;

    .lew-input-number-icon {
      width: 100%;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
      transform: scale(1);
      opacity: 1;
    }

    .lew-input-number-icon:active {
      transform: scale(0.95);
      opacity: 0.7;
    }
  }
}

.lew-input-number-view:hover {
  background-color: var(--lew-form-bgcolor-hover);

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-0);
    }
  }
}

.lew-input-number-view:focus-within {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  background-color: var(--lew-form-bgcolor-focus);

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-3);
    }
  }
}

.lew-input-number-view-focus {
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  background-color: var(--lew-form-bgcolor-focus) !important;

  .lew-input-number-control {
    .lew-input-number-icon {
      background-color: var(--lew-bgcolor-3) !important;
    }
  }
}

.lew-input-number-view-readonly {
  pointer-events: none;
}

.lew-input-number-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}
</style>
