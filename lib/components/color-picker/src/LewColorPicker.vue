<script setup lang="ts">
import { any2px, object2class } from 'lew-ui/utils';
import { colorPickerProps } from './props';
const props = defineProps(colorPickerProps);

const modelValue = defineModel();
const emit = defineEmits(['change']);

const isFocus = ref(false);

const getPickerClassName = computed(() => {
  const { disabled, readonly } = props;
  return object2class('lew-color-picker', {
    disabled,
    readonly,
    focus: isFocus.value,
  });
});

const getPickerViewStyle = computed(() => {
  const { size, width } = props;
  const _width = {
    small: 110,
    medium: 117,
    large: 130,
  };
  return {
    width: width === 'auto' || !width ? any2px(_width[size]) : any2px(width),
  };
});

const getPickerStyle = computed(() => {
  const { size } = props;
  return {
    height: `var(--lew-form-item-height-${size})`,
    padding: `var(--lew-form-input-padding-${size})`,
    fontSize: `var(--lew-form-font-size-${size})`,
    lineHeight: `var(--lew-form-input-line-height-${size})`,
  };
});

const getPickerInputStyle = computed(() => {
  const { size } = props;
  return {
    width: `calc(var(--lew-form-item-height-${size}) - 12px)`,
    height: `calc(var(--lew-form-item-height-${size}) - 12px)`,
  };
});

const getPickerValueInputStyle = computed(() => {
  const { size } = props;
  return {
    fontSize: `var(--lew-form-font-size-${size})`,
  };
});
let pickerValueInputRef = ref();
const focus = () => {
  isFocus.value = true;
  // 全选选中值
  pickerValueInputRef.value.select();
};

const blur = () => {
  isFocus.value = false;
  // 转化成有效的色值
  modelValue.value = convertToHex(modelValue.value as string);
  emit('change', modelValue.value);
};

// 将任意格式的颜色值转换为标准的hex格式
const convertToHex = (color: string): string => {
  // 去除空格
  color = color.trim();

  // 如果已经是6位hex格式,直接返回(添加#号)
  if (/^#?[0-9a-fA-F]{6}$/.test(color)) {
    return color.startsWith('#') ? color : `#${color}`;
  }

  // 处理3位hex缩写,例如#f93
  if (/^#?[0-9a-fA-F]{3}$/.test(color)) {
    const hex = color.replace('#', '');
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  // 处理rgb/rgba格式
  const rgbMatch = color.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+(?:\.\d+)?)?\)$/
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  // 无效的颜色值返回黑色
  return '';
};

const change = () => {
  emit('change', modelValue.value);
};
</script>

<template>
  <div class="lew-color-picker-view" :style="getPickerViewStyle">
    <div
      class="lew-color-picker"
      :style="getPickerStyle"
      :class="getPickerClassName"
    >
      <input
        class="lew-color-picker-input"
        :style="getPickerInputStyle"
        type="color"
        v-model="modelValue"
        @change="change"
      />
      <input
        ref="pickerValueInputRef"
        :style="getPickerValueInputStyle"
        class="lew-color-value-input"
        type="text"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
        v-model="modelValue"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-color-picker-view {
  .lew-color-picker {
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    background-color: var(--lew-form-bgcolor);
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    border-radius: var(--lew-border-radius-small);
    box-shadow: var(--lew-form-box-shadow);
    transition: all var(--lew-form-transition-ease);
  }

  .lew-color-picker-input {
    border: none;
    outline: none;
    margin-left: -4px;
    flex-shrink: 0;
  }

  .lew-color-value-input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    background-color: transparent;
    padding-left: 8px;
    color: var(--lew-text-color-1);
  }

  .lew-color-value {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div {
    width: 100%;
  }

  .lew-color-picker {
    position: relative;
    width: auto;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;

    .lew-color-preview {
      width: 24px;
      height: 24px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .lew-color-value {
      margin-left: 8px;
      font-size: 14px;
      color: var(--lew-text-color);
    }
  }
  .lew-color-picker:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-color-picker:active {
    background-color: var(--lew-form-bgcolor-active);
  }

  .lew-color-picker-focus {
    background-color: var(--lew-form-bgcolor-focus);
    border: var(--lew-form-border-width) var(--lew-form-border-color-focus)
      solid;
  }

  .lew-color-picker-focus:hover {
    background-color: var(--lew-form-bgcolor-focus-hover);
  }

  .lew-color-picker-disabled {
    opacity: var(--lew-disabled-opacity);
    pointer-events: none;
  }

  .lew-color-picker-readonly {
    pointer-events: none;
  }
}
</style>
