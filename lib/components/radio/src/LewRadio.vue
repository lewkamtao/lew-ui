<script lang="ts" setup>
import { object2class } from 'lew-ui/utils'
import { radioProps } from './props'

const props = defineProps(radioProps)

const emit = defineEmits(['change'])

const setChecked = () => {
  emit('change')
}

const getIconSize = computed(() => {
  const { size, block } = props
  switch (size) {
    case 'small':
      return block ? 16 : 12
    case 'medium':
      return block ? 18 : 14
    case 'large':
      return block ? 20 : 16
    default:
      return block ? 18 : 14
  }
})

const getRadioClassName = computed(() => {
  const { block, checked, iconable, size, disabled, round, readonly } = props
  const unicon = !iconable && block
  return object2class('lew-radio', {
    block,
    checked,
    unicon,
    size,
    disabled,
    round,
    readonly
  })
})
</script>

<template>
  <label class="lew-radio" :class="getRadioClassName">
    <div v-if="iconable || (!iconable && !block)" class="icon-radio-box">
      <lew-icon stroke-width="4" class="icon-radio" type="check" :size="getIconSize" />
    </div>
    <input v-show="false" type="radio" :checked="checked" @change="setChecked" />
    <span v-if="label" class="lew-radio-label"> {{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.lew-radio {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  color: var(--lew-text-color-1);
  font-size: 14px;
  transition: var(--lew-form-transition);
  white-space: nowrap;
  box-sizing: border-box;

  .icon-radio-box {
    position: relative;
    width: 18px;
    height: 18px;
    border: var(--lew-form-border-width) var(--lew-radio-border-color) solid;
    box-sizing: border-box;
    border-radius: 6px;
    transition: var(--lew-form-transition);
    background-color: var(--lew-bgcolor-1);
    overflow: hidden;

    .icon-radio {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 5px) scale(0);
      transition: var(--lew-form-transition);
      opacity: 0;
      color: var(--lew-color-white);
    }
  }

  .lew-radio-label {
    margin-left: 6px;
  }
}

.lew-radio-size-small {
  font-size: 13px;

  .icon-radio-box {
    width: 16px;
    height: 16px;
    border-radius: 4px;
  }
}

.lew-radio-size-medium {
  font-size: 14px;

  .icon-radio-box {
    width: 18px;
    height: 18px;
    border-radius: 5px;
  }
}

.lew-radio-size-large {
  font-size: 15px;

  .icon-radio-box {
    width: 20px;
    height: 20px;
    border-radius: 6px;
  }
}

.lew-radio-size-small.lew-radio-block {
  height: var(--lew-form-item-height-small);
  padding: 3px 8px 3px 7px;
}
.lew-radio-size-medium.lew-radio-block {
  height: var(--lew-form-item-height-medium);
  padding: 3px 10px 3px 8px;
}
.lew-radio-size-large.lew-radio-block {
  height: var(--lew-form-item-height-large);
  padding: 3px 12px 3px 9px;
}

.lew-radio-unicon.lew-radio-block {
  padding: 4px 12px;
  .lew-radio-label {
    margin-left: 0px;
  }
}

.lew-radio-unicon.lew-radio-checked.lew-radio-block {
  .lew-radio-label {
    color: var(--lew-radio-color);
  }
}

.lew-radio:hover {
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-radio-border-color-hover) solid;
    background: var(--lew-form-bgcolor);
  }
}

.lew-radio-block {
  background: var(--lew-radio-block-color);
  border: var(--lew-form-border-width) transparent solid;
  border-radius: var(--lew-border-radius-small);
  .icon-radio-box {
    .icon-radio {
      padding: 1px;
    }
  }
  .lew-radio-label {
    margin-left: 4px;
  }
}

.lew-radio-checked.lew-radio-block {
  border: var(--lew-form-border-width) var(--lew-radio-color) solid;
  background: var(--lew-radio-color-light);
  color: var(--lew-radio-color);
}

.lew-radio-checked.lew-radio-block:hover {
  border: var(--lew-form-border-width) var(--lew-radio-color) solid;
  background: var(--lew-radio-color-light);
}

.lew-radio-round {
  border-radius: 50px;

  .icon-radio-box {
    border-radius: 50%;
  }
}

.lew-radio-block:hover {
  background: var(--lew-form-bgcolor-hover);
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-radio-border-color-hover) solid;
  }
}

.lew-radio-checked {
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-radio-color) solid;
    background: var(--lew-radio-color);

    .icon-radio {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
    }
  }
}

.lew-radio-checked:hover {
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-radio-color) solid;
    background: var(--lew-radio-color);
  }
}

.lew-radio-block.lew-radio-checked {
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
    background: transparent;

    .icon-radio {
      color: var(--lew-radio-color);
      opacity: 1;
    }
  }
}

.lew-radio-block.lew-radio-checked:hover {
  .icon-radio-box {
    border: var(--lew-form-border-width) var(--lew-form-border-color) solid;
  }
}

.lew-radio-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none; //鼠标点击不可修改
}

.lew-radio-readonly {
  pointer-events: none; //鼠标点击不可修改
}
</style>
