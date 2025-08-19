<script setup lang="ts">
import type { LewContextMenusOption } from "lew-ui";
import { useMagicKeys } from "@vueuse/core";
import { LewDropdown, LewFlex, LewMessage, LewTooltip, locale } from "lew-ui";
import CommonIcon from "lew-ui/_components/CommonIcon.vue";
import { any2px, object2class } from "lew-ui/utils";
import { inputEmits } from "./emits";
import { inputProps } from "./props";

const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);
const { enter } = useMagicKeys();
const app = getCurrentInstance()?.appContext.app;
if (app && !app.directive("tooltip")) {
  app.use(LewTooltip);
}

const modelValue = defineModel({ required: true });
const prefixValue = defineModel("prefixValue");
const suffixValue: any = defineModel("suffixValue");

const lewInputRef = ref();
const lewInputCountRef = ref();
const isCopy = ref(false);
const _type = ref(props.type);
const isFocus = ref(false);
const state = reactive({
  prefixesDropdown: "hide",
  suffixDropdown: "hide",
});

let timer: NodeJS.Timeout | null = null;

watch(
  () => props.type,
  (v) => {
    if (v === "password") {
      _type.value = "password";
    }
  }
);

function clear() {
  modelValue.value = undefined;
  emit("clear");
}

const toFocus = () => lewInputRef.value?.focus();
const toBlur = () => lewInputRef.value?.blur();

function showPasswordFn() {
  _type.value = _type.value === "text" ? "password" : "text";
}

function focus(e: FocusEvent) {
  if (props.selectByFocus) {
    (e.currentTarget as HTMLInputElement)?.select();
  }
  emit("focus");
  isFocus.value = true;
}

function blur() {
  emit("blur", modelValue.value);
  isFocus.value = false;
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("change", target.value);
}

const getIconSize = computed(
  () =>
    ({
      small: 13,
      medium: 14,
      large: 16,
    }[props.size])
);

const getInputStyle = computed(() => {
  const { clearable, showCount } = props;
  const countWidth = lewInputCountRef.value?.offsetWidth || 0;
  return {
    width: `calc(100% - ${clearable ? 20 + countWidth + (showCount ? 12 : 0) : 0}px)`,
  };
});

const getType = computed(() => (props.type === "password" ? _type.value : props.type));

const getInputClassNames = computed(() => {
  const { size, readonly, disabled, align, autoWidth } = props;
  return object2class("lew-input-view", {
    size,
    readonly,
    disabled,
    align,
    autoWidth,
  });
});

function prefixesChange(item: LewContextMenusOption) {
  prefixValue.value = item.value;
}

function suffixChange(item: LewContextMenusOption) {
  suffixValue.value = item.value;
}

const getPrefixesLabel = computed(() => {
  return props.prefixesOptions.find((e) => e.value === prefixValue.value)?.label || "";
});

const getSuffixLabel = computed(() => {
  return props.suffixOptions.find((e) => e.value === suffixValue.value)?.label || "";
});

function copy() {
  const textarea = document.createElement("textarea");
  textarea.style.cssText = "position:fixed;top:-200vh;";
  textarea.value = modelValue.value as string;

  document.body.appendChild(textarea);
  textarea.select();

  if (document.execCommand("copy")) {
    LewMessage.success(locale.t("input.copySuccess"));
    isCopy.value = true;
    timer = setTimeout(() => {
      isCopy.value = false;
    }, 2000);
  } else {
    LewMessage.error(locale.t("input.copyFailed"));
  }

  document.body.removeChild(textarea);
}

if (props.okByEnter) {
  watch(enter, (v) => {
    if (v && isFocus.value) {
      // 失焦
      lewInputRef.value?.blur();
      emit("ok", modelValue.value);
    }
  });
}

const computedPrefixesOptions = computed(() => {
  return props.prefixesOptions.map((e) => {
    return {
      ...e,
      onClick: () => {
        prefixValue.value = e.value;
      },
    };
  });
});

const computedSuffixOptions = computed(() => {
  return props.suffixOptions.map((e) => {
    return {
      ...e,
      onClick: () => {
        suffixValue.value = e.value;
      },
    };
  });
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});

defineExpose({ toFocus, toBlur });
</script>

<template>
  <div
    class="lew-input-view"
    :class="getInputClassNames"
    :style="{ width: autoWidth ? 'auto' : any2px(width) }"
  >
    <div
      v-if="prefixes"
      v-tooltip="{
        content: prefixesTooltip,
        trigger: 'mouseenter',
      }"
      class="lew-input-prefixes"
    >
      <div v-if="prefixes === 'text'">
        {{ prefixValue }}
      </div>
      <div v-if="prefixes === 'icon'" class="lew-input-prefixes-icon">
        <CommonIcon :size="getIconSize" :type="prefixValue as string" />
      </div>
      <div v-if="prefixes === 'select'" class="lew-input-prefixes-select">
        <LewDropdown
          placement="bottom"
          trigger="click"
          :options="computedPrefixesOptions"
          @change="prefixesChange"
          @show="state.prefixesDropdown = 'show'"
          @hide="state.prefixesDropdown = 'hide'"
        >
          <LewFlex
            gap="5px"
            x="start"
            class="lew-input-prefixes-dropdown"
            :class="{
              'lew-input-prefixes-dropdown-open': state.prefixesDropdown === 'show',
            }"
            :style="{
              fontSize: `var(--lew-form-font-size-${size})`,
            }"
          >
            <div>
              {{ getPrefixesLabel }}
            </div>
            <CommonIcon :size="getIconSize" type="chevron-down" class="icon-select" />
          </LewFlex>
        </LewDropdown>
      </div>
    </div>
    <div
      v-if="copyable && readonly && modelValue && !suffix"
      class="lew-input-copy-btn"
      @click="copy"
    >
      <CommonIcon
        :size="getIconSize"
        :type="isCopy ? 'check' : 'copy'"
        :class="{ 'lew-input-copy-btn-check': isCopy }"
      />
    </div>
    <div
      class="lew-input-box"
      :style="{
        minWidth: any2px(minWidth),
      }"
    >
      <input
        ref="lewInputRef"
        v-model="modelValue"
        class="lew-input"
        :style="getInputStyle"
        autocomplete="new-password"
        :disabled="disabled"
        :placeholder="placeholder ? placeholder : locale.t('input.placeholder')"
        :type="getType"
        :readonly="readonly"
        :maxlength="maxLength"
        @input="handleInput"
        @change="handleChange"
        @blur="blur"
        @focus="focus"
      />
      <label v-if="autoWidth" class="lew-input-auto-width">
        {{ modelValue }}
      </label>
      <label v-if="autoWidth && clearable" class="lew-input-auto-width-clear" />
      <div v-if="showPassword || clearable || showCount" class="lew-input-controls">
        <div
          v-if="modelValue && showCount"
          ref="lewInputCountRef"
          class="lew-input-count"
          :class="{
            'lew-input-count-clearable': clearable && modelValue,
          }"
        >
          {{ typeof modelValue === "string" ? modelValue.length : 0
          }}{{ maxLength ? ` / ${maxLength}` : "" }}
        </div>
        <div
          v-if="showPassword && type === 'password'"
          class="lew-input-show-password"
          @mousedown.prevent=""
          @click="showPasswordFn"
        >
          <CommonIcon v-show="_type === 'text'" :size="getIconSize" type="eye" />
          <CommonIcon v-show="_type === 'password'" :size="getIconSize" type="eye_off" />
        </div>
        <transition name="lew-form-icon-ani">
          <CommonIcon
            v-if="clearable && modelValue && !readonly"
            class="lew-form-icon-close"
            :class="{
              'lew-form-icon-close-focus': isFocus,
            }"
            :size="getIconSize"
            type="close"
            @mousedown.prevent=""
            @click="clear"
          />
        </transition>
      </div>
    </div>
    <div
      v-if="suffix"
      v-tooltip="{
        content: suffixTooltip,
        trigger: suffixTooltip ? 'mouseenter' : '',
      }"
      class="lew-input-suffix"
    >
      <div v-if="suffix === 'text'">
        {{ suffixValue }}
      </div>
      <div v-if="suffix === 'icon'" class="lew-input-suffix-icon">
        <CommonIcon :size="getIconSize" :type="suffixValue" />
      </div>
      <div v-if="suffix === 'select'" class="lew-input-suffix-select">
        <LewDropdown
          placement="bottom"
          trigger="click"
          :options="computedSuffixOptions"
          @change="suffixChange"
          @show="state.suffixDropdown = 'show'"
          @hide="state.suffixDropdown = 'hide'"
        >
          <LewFlex
            gap="5px"
            x="start"
            class="lew-input-suffix-dropdown"
            :class="{
              'lew-input-suffix-dropdown-open': state.suffixDropdown === 'show',
            }"
            :style="{
              fontSize: `var(--lew-form-font-size-${size})`,
            }"
          >
            <div>{{ getSuffixLabel }}</div>
            <CommonIcon :size="getIconSize" type="chevron-down" class="icon-select" />
          </LewFlex>
        </LewDropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-input-view {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);
  transition: all var(--lew-form-transition-ease);

  .lew-input-box {
    position: relative;
    display: inline-flex;
    flex: 1;
    flex-shrink: 0;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .lew-input {
      height: 100%;
    }
  }

  .lew-input-copy-btn {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    pointer-events: all;
    opacity: var(--lew-form-icon-opacity);
    cursor: pointer;
    transform: translateY(-50%);
  }

  .lew-input-copy-btn:hover {
    opacity: var(--lew-form-icon-opacity-hover);
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    user-select: none;

    .icon-select {
      transition: all var(--lew-form-transition-bezier);
    }

    .icon-select-up {
      transform: rotate(180deg);
    }
  }

  .lew-input-prefixes::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: var(--lew-bgcolor-4);
    content: "";
    transition: all var(--lew-form-transition-ease);
  }

  .lew-input-suffix::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: var(--lew-bgcolor-4);
    content: "";
    transition: all var(--lew-form-transition-ease);
  }

  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    cursor: pointer;
  }

  .lew-input-prefixes-dropdown-open,
  .lew-input-suffix-dropdown-open {
    opacity: 0.4;

    .icon-select {
      transform: rotate(180deg);
    }
  }

  .lew-input-prefixes-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .lew-input-suffix-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .lew-input {
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    color: var(--lew-text-color-1);
    text-overflow: ellipsis;
    background: none;
    border: none;
    outline: none;
  }

  .lew-input:invalid {
    text-decoration: line-through;
  }

  .lew-input::placeholder {
    color: rgb(165, 165, 165);
  }

  .lew-input-controls {
    z-index: 9;
    display: inline-flex;
    align-items: center;

    > div {
      display: inline-flex;
      white-space: nowrap;
      justify-content: center;
      align-items: center;
    }

    .lew-input-count {
      z-index: 2;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      opacity: var(--lew-form-icon-opacity);
      transition: transform 0.25s;
    }

    .lew-input-show-password {
      opacity: var(--lew-form-icon-opacity);
      cursor: pointer;
      transition: all 0.25s;
    }

    .lew-input-show-password:hover {
      opacity: var(--lew-form-icon-opacity-hover);
    }
  }
}

.lew-input-view-align-left {
  .lew-input {
    text-align: left;
  }
}

.lew-input-view-align-center {
  .lew-input {
    text-align: center;
  }
}

.lew-input-view-align-right {
  .lew-input {
    text-align: right;
  }
}

.lew-input-view-autoWidth {
  position: relative;
  width: auto;

  .lew-input {
    position: absolute;
    top: 50%;
    left: 0px;
    display: inline-block;
    width: 100%;
    transform: translateY(-50%);
  }

  .lew-input-auto-width {
    box-sizing: border-box;
    width: auto;
    min-width: 60px;
    height: 1px;
    visibility: hidden;
  }

  .lew-input-box {
    padding: 0px;
  }
}

.lew-input-view-size-small {
  height: var(--lew-form-item-height-small);
  line-height: var(--lew-form-input-line-height-small);

  .lew-input-box {
    padding: var(--lew-form-input-padding-small);
    font-size: var(--lew-form-font-size-small);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-input-line-height-small);
  }

  .lew-input-copy-btn {
    right: 10px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 7px;
  }

  .lew-input {
    height: var(--lew-form-item-height-small);
    font-size: var(--lew-form-font-size-small);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-small);

    .lew-input-count {
      font-size: 12px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-small);
    line-height: var(--lew-form-input-line-height-small);
  }

  .lew-input-auto-width-close {
    width: 18px;
  }
}

.lew-input-view-size-medium {
  height: var(--lew-form-item-height-medium);
  line-height: var(--lew-form-input-line-height-medium);

  .lew-input-box {
    padding: var(--lew-form-input-padding-medium);
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-input-copy-btn {
    right: 12px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 9px;
  }

  .lew-input {
    height: var(--lew-form-item-height-medium);
    font-size: var(--lew-form-font-size-medium);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-medium);

    .lew-input-count {
      font-size: 13px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-medium);
    line-height: var(--lew-form-input-line-height-medium);
  }

  .lew-input-auto-width-close {
    width: 20px;
  }
}

.lew-input-view-size-large {
  height: var(--lew-form-item-height-large);
  line-height: var(--lew-form-input-line-height-large);

  .lew-input-box {
    padding: var(--lew-form-input-padding-large);
    font-size: var(--lew-form-font-size-large);
  }

  .lew-input-prefixes,
  .lew-input-suffix,
  .lew-input-prefixes-dropdown,
  .lew-input-suffix-dropdown {
    height: var(--lew-form-item-height-large);
    line-height: var(--lew-form-input-line-height-large);
  }

  .lew-input-copy-btn {
    right: 14px;
  }

  .lew-input-prefixes,
  .lew-input-suffix {
    padding: 0px 12px;
  }

  .lew-input {
    height: var(--lew-form-item-height-large);
    font-size: var(--lew-form-font-size-large);
  }

  .lew-input-controls {
    height: var(--lew-form-item-height-large);

    .lew-input-count {
      font-size: 14px;
    }

    .lew-input-count-clearable {
      transform: translateX(-18px);
    }
  }

  .lew-input-auto-width {
    font-size: var(--lew-form-font-size-large);
    line-height: var(--lew-form-input-line-height-large);
  }

  .lew-input-auto-width-close {
    width: 22px;
  }
}

.lew-input-view-size-small.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 12px);
    padding: var(--lew-form-input-padding-small);
  }
}

.lew-input-view-size-medium.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 18px);
    padding: var(--lew-form-input-padding-medium);
  }
}

.lew-input-view-size-large.lew-input-view-autoWidth {
  .lew-input {
    width: calc(100% - 24px);
    padding: var(--lew-form-input-padding-large);
  }
}

.lew-input-view:hover {
  background-color: var(--lew-form-bgcolor-hover);

  .lew-input-prefixes::after {
    background: var(--lew-bgcolor-6);
  }

  .lew-input-suffix::before {
    background: var(--lew-bgcolor-6);
  }
}

.lew-input-view:focus-within {
  background-color: var(--lew-form-bgcolor-focus);
  border: var(--lew-form-border-width) var(--lew-form-border-color-focus) solid;

  .lew-input-prefixes::after {
    background: var(--lew-bgcolor-4);
  }

  .lew-input-suffix::before {
    background: var(--lew-bgcolor-4);
  }
}

.lew-input-view-readonly {
  pointer-events: none;
}

.lew-input-view-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}

.lew-input-view-disabled:hover {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}

.lew-input-view-disabled:active {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}

.lew-input-view-disabled:focus-within {
  background-color: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) rgba(0, 0, 0, 0) solid;
}
</style>
