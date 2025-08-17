<script lang="ts" setup>
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { checkboxEmits } from './emits'
import { checkboxProps } from './props'

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const modelValue: Ref<boolean | undefined> = defineModel({
  default: false,
})

const getIconSize = computed(() => {
  const { size, block } = props
  switch (size) {
    case 'small':
      return block ? 14 : 12
    case 'medium':
      return block ? 16 : 14
    case 'large':
      return block ? 18 : 16
    default:
      return block ? 16 : 14
  }
})

const getCheckboxClassName = computed(() => {
  const { block, round, iconable, size, disabled, certain, readonly } = props
  const checked = modelValue.value || props.checked
  const unicon = !iconable && block

  return object2class('lew-checkbox', {
    block,
    round,
    size,
    checked,
    unicon,
    disabled,
    certain,
    readonly,
  })
})

const shouldShowIconBox = computed(() => {
  return props.iconable || (!props.iconable && !props.block)
})

function setChecked() {
  if (props.disabled || props.readonly)
    return

  const newValue = !modelValue.value
  modelValue.value = newValue
  emit('change', cloneDeep(newValue))
}
</script>

<template>
  <div
    class="lew-checkbox"
    :class="getCheckboxClassName"
    @click.stop="setChecked"
  >
    <div v-if="shouldShowIconBox" class="lew-checkbox-icon-box">
      <i v-show="certain" class="lew-checkbox-icon-certain" />
      <CommonIcon
        :stroke-width="4"
        class="lew-checkbox-icon"
        type="check"
        :size="getIconSize"
      />
    </div>
    <span v-if="label" class="lew-checkbox-label"> {{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.lew-checkbox {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--lew-text-color-1);
  font-size: 0px;
  transition: all var(--lew-form-transition-ease);
  white-space: nowrap;
  box-sizing: border-box;
  border: var(--lew-form-border-width) transparent solid;

  .lew-checkbox-icon-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: var(--lew-form-border-width) var(--lew-checkbox-border-color) solid;
    box-sizing: border-box;
    border-radius: 6px;
    transition: all var(--lew-form-transition-bezier);
    background-color: var(--lew-bgcolor-1);
    overflow: hidden;
    box-shadow: var(--lew-form-box-shadow);

    .lew-checkbox-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 5px) scale(0);
      transition: all var(--lew-form-transition-bezier);
      opacity: 0;
      color: var(--lew-color-white);
    }
  }

  .lew-checkbox-label {
    margin-left: 6px;
  }
}

.lew-checkbox-size-small {
  .lew-checkbox-label {
    font-size: 13px;
  }

  .lew-checkbox-icon-box {
    width: 16px;
    height: 16px;
    border-radius: 6px;
  }
}

.lew-checkbox-size-medium {
  .lew-checkbox-label {
    font-size: 14px;
  }

  .lew-checkbox-icon-box {
    width: 18px;
    height: 18px;
    border-radius: 7px;
  }
}

.lew-checkbox-size-large {
  .lew-checkbox-label {
    font-size: 15px;
  }

  .lew-checkbox-icon-box {
    width: 20px;
    height: 20px;
    border-radius: 8px;
  }
}

.lew-checkbox-unicon.lew-checkbox-block {
  padding: 4px 12px;

  .lew-checkbox-label {
    margin-left: 0px;
  }
}

.lew-checkbox-size-small.lew-checkbox-block {
  height: var(--lew-form-item-height-small);
  padding: 3px 8px 3px 7px;
}

.lew-checkbox-size-medium.lew-checkbox-block {
  height: var(--lew-form-item-height-medium);
  padding: 3px 10px 3px 8px;
}

.lew-checkbox-size-large.lew-checkbox-block {
  height: var(--lew-form-item-height-large);
  padding: 3px 12px 3px 9px;
}

.lew-checkbox-unicon.lew-checkbox-checked.lew-checkbox-block {
  .lew-checkbox-label {
    color: var(--lew-checkbox-color);
  }
}

.lew-checkbox:hover {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
    background: var(--lew-form-bgcolor);
  }
}

.lew-checkbox-block {
  background: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) transparent solid;
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);

  .lew-checkbox-icon-box {
    box-shadow: none;

    .lew-checkbox-icon {
      padding: 1px;
    }
  }

  .lew-checkbox-label {
    margin-left: 4px;
  }
}

.lew-checkbox-checked.lew-checkbox-block {
  border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
  background: var(--lew-checkbox-color-light);
  color: var(--lew-checkbox-color);
}

.lew-checkbox-checked.lew-checkbox-block:hover {
  border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
  background: var(--lew-checkbox-color-light);
}

.lew-checkbox-round {
  border-radius: 50px;

  .lew-checkbox-icon-box {
    border-radius: 50%;
  }
}

.lew-checkbox-block:hover {
  background: var(--lew-form-bgcolor-hover);

  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-border-color-hover) solid;
  }
}

.lew-checkbox-checked {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);

    .lew-checkbox-icon {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
    }
  }
}

.lew-checkbox-checked:hover {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);
  }
}

.lew-checkbox-block.lew-checkbox-checked {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    background: transparent;

    .lew-checkbox-icon {
      color: var(--lew-checkbox-color);
      opacity: 1;
    }
  }
}

.lew-checkbox-block.lew-checkbox-checked:hover {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }
}

.lew-checkbox-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-checkbox-readonly {
  pointer-events: none; //鼠标点击不可修改
}

.lew-checkbox-certain {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);

    .lew-checkbox-icon-certain {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 55%;
      height: 2px;
      border-radius: 4px;
      background-color: var(--lew-color-white);
    }
  }
}

.lew-checkbox-certain:hover {
  .lew-checkbox-icon-box {
    border: var(--lew-form-border-width) var(--lew-checkbox-color) solid;
    background: var(--lew-checkbox-color);
  }
}
</style>
