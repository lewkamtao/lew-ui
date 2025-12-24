<script lang="ts" setup>
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { object2class } from 'lew-ui/utils'
import { radioEmits } from './emits'
import { radioProps } from './props'

const props = defineProps(radioProps)

const emit = defineEmits(radioEmits)

function setChecked() {
  emit('change')
}

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
    readonly,
  })
})
</script>

<template>
  <div class="lew-radio" :class="getRadioClassName" @click.stop="setChecked">
    <div v-if="iconable || (!iconable && !block)" class="lew-radio-icon-box">
      <CommonIcon
        :stroke-width="4"
        class="lew-radio-icon"
        type="check"
        :size="getIconSize"
      />
    </div>
    <span v-if="label" class="lew-radio-label"> {{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.lew-radio {
  // 组件级 CSS 变量定义
  --lew-radio-icon-bg: var(--lew-radio-bgcolor);
  --lew-radio-icon-border: var(--lew-radio-border-color);
  --lew-radio-icon-color: transparent;
  --lew-radio-icon-bg-hover: var(--lew-radio-bgcolor-hover);
  --lew-radio-icon-border-hover: var(--lew-radio-border-color-hover);
  
  // checked 状态（非 block）- 使用 radio 特定颜色
  --lew-radio-checked-icon-bg: var(--lew-color-radio-primary-checked-icon-bg);
  --lew-radio-checked-icon-border: var(--lew-color-radio-primary-checked-icon-border);
  --lew-radio-checked-icon-color: var(--lew-color-radio-primary-checked-icon-color);
  --lew-radio-checked-icon-bg-hover: var(--lew-color-radio-primary-checked-icon-bg-hover);
  --lew-radio-checked-icon-border-hover: var(--lew-color-radio-primary-checked-icon-border-hover);
  --lew-radio-checked-icon-color-hover: var(--lew-color-radio-primary-checked-icon-color-hover);
  
  // block 模式 checked 状态 - 使用 radio 特定颜色
  --lew-radio-block-checked-bg: var(--lew-color-radio-primary-block-checked-bg);
  --lew-radio-block-checked-border: var(--lew-color-radio-primary-block-checked-border);
  --lew-radio-block-checked-color: var(--lew-color-radio-primary-block-checked-color);
  --lew-radio-block-checked-icon-bg: transparent;
  --lew-radio-block-checked-icon-border: var(--lew-form-border-color);
  --lew-radio-block-checked-icon-color: var(--lew-color-radio-primary-block-checked-icon-color);

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

  .lew-radio-icon-box {
    position: relative;
    width: 18px;
    height: 18px;
    border: var(--lew-form-border-width) var(--lew-radio-icon-border) solid;
    box-sizing: border-box;
    border-radius: 6px;
    transition: all var(--lew-form-transition-bezier);
    background-color: var(--lew-radio-icon-bg);
    overflow: hidden;
    box-shadow: var(--lew-form-box-shadow);

    .lew-radio-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 5px) scale(0);
      transition: all var(--lew-form-transition-bezier);
      opacity: 0;
      color: var(--lew-radio-icon-color);
    }
  }

  .lew-radio-label {
    margin-left: 6px;
  }
}

.lew-radio-size-small {
  .lew-radio-label {
    font-size: 13px;
  }

  .lew-radio-icon-box {
    width: 16px;
    height: 16px;
    border-radius: 6px;
  }
}

.lew-radio-size-medium {
  .lew-radio-label {
    font-size: 14px;
  }

  .lew-radio-icon-box {
    width: 18px;
    height: 18px;
    border-radius: 7px;
  }
}

.lew-radio-size-large {
  .lew-radio-label {
    font-size: 15px;
  }

  .lew-radio-icon-box {
    width: 20px;
    height: 20px;
    border-radius: 8px;
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
  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-icon-border-hover) solid;
    background: var(--lew-radio-icon-bg-hover);
  }
}

.lew-radio-block {
  background: var(--lew-form-bgcolor);
  border: var(--lew-form-border-width) transparent solid;
  border-radius: var(--lew-border-radius-small);
  box-shadow: var(--lew-form-box-shadow);

  .lew-radio-icon-box {
    box-shadow: none;
    background-color: var(--lew-radio-block-bgcolor);

    .lew-radio-icon {
      padding: 1px;
    }
  }

  .lew-radio-label {
    margin-left: 4px;
  }
}

.lew-radio-checked.lew-radio-block {
  border: var(--lew-form-border-width) var(--lew-radio-block-checked-border) solid;
  background: var(--lew-radio-block-checked-bg);
  color: var(--lew-radio-block-checked-color);
}

.lew-radio-checked.lew-radio-block:hover {
  border: var(--lew-form-border-width) var(--lew-radio-block-checked-border) solid;
  background: var(--lew-radio-block-checked-bg);
}

.lew-radio-round {
  border-radius: 50px;

  .lew-radio-icon-box {
    border-radius: 50%;
  }
}

.lew-radio-block:hover {
  background: var(--lew-form-bgcolor-hover);

  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-border-color-hover) solid;
  }
}

.lew-radio-checked:not(.lew-radio-block) {
  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-checked-icon-border) solid;
    background: var(--lew-radio-checked-icon-bg);

    .lew-radio-icon {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
      color: var(--lew-radio-checked-icon-color);
    }
  }
}

.lew-radio-checked:not(.lew-radio-block):hover {
  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-checked-icon-border-hover) solid;
    background: var(--lew-radio-checked-icon-bg-hover);

    .lew-radio-icon {
      color: var(--lew-radio-checked-icon-color-hover);
    }
  }
}

.lew-radio-block.lew-radio-checked {
  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-block-checked-icon-border) solid;
    background: var(--lew-radio-block-checked-icon-bg);

    .lew-radio-icon {
      transform: translate(-50%, -50%) scale(0.7);
      opacity: 1;
      color: var(--lew-radio-block-checked-icon-color);
    }
  }
}

.lew-radio-block.lew-radio-checked:hover {
  .lew-radio-icon-box {
    border: var(--lew-form-border-width) var(--lew-radio-block-checked-icon-border) solid;
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
