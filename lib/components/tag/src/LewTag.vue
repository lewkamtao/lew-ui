<script lang="ts" setup>
import { object2class, getColorType } from 'lew-ui/utils'
import { tagProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(tagProps)
const emit = defineEmits(['close'])
const close = () => {
  if (props.disabled) {
    return
  }
  emit('close')
}

const getSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 12
    case 'medium':
      return 14
    case 'large':
      return 16
    default:
      return 14
  }
})

const tagClassName = computed(() => {
  const { size, disabled, color, type } = props
  return object2class('lew-tag', { size, color, disabled, type })
})

const getStyle = computed(() => {
  const { round, type, color } = props
  const styleObj = {} as any
  const _color = getColorType(color) || 'primary'
  switch (type) {
    case 'fill':
      styleObj.backgroundColor = `var(--lew-color-${_color})`
      styleObj.color = 'var(--lew-color-white)'
      break
    case 'light':
      styleObj.backgroundColor = `var(--lew-color-${_color}-light)`
      styleObj.color = `var(--lew-color-${_color}-dark)`
      break
    case 'ghost':
      styleObj.backgroundColor = 'transparent'
      styleObj.border = `1px solid var(--lew-color-${_color}-dark)`
      styleObj.color = `var(--lew-color-${_color}-dark)`
      styleObj.boxShadow = 'none'
      break
    default:
      styleObj.color = 'var(--lew-color-white)'
      styleObj.backgroundColor = `var(--lew-color-${_color})`
      break
  }
  styleObj.borderRadius = round ? '20px' : 'none'
  return styleObj
})
</script>

<template>
  <div class="lew-tag" :class="tagClassName" :style="getStyle">
    <div class="lew-tag-left">
      <slot name="left"></slot>
    </div>
    <div class="lew-tag-value">
      <lew-text-trim v-if="text" :text="text"></lew-text-trim>
      <lew-text-trim v-else><slot /></lew-text-trim>
    </div>
    <div class="lew-tag-right">
      <slot name="right"></slot>
    </div>
    <div v-if="closable" class="lew-tag-close" @click.stop="close">
      <Icon :size="getSize" type="close" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;

  .lew-tag-value {
    font-weight: normal;
    padding: 0px 3px;
    box-sizing: border-box;
    white-space: nowrap;
    max-width: 250px;
  }

  .lew-tag-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--lew-border-radius-small);
    padding: 2px;
    margin-left: -3px;
    cursor: pointer;
  }

  .lew-tag-close:hover {
    background-color: rgba($color: #000, $alpha: 0.1);
  }

  .lew-tag-close:active {
    background-color: rgba($color: #000, $alpha: 0.2);
  }

  .lew-tag-left {
    margin-left: 3px;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
  }

  .lew-tag-right {
    margin-right: 3px;
    display: inline-flex;
    align-items: center;
  }
}

.lew-tag-to {
  cursor: pointer;
}

.lew-tag-size-small {
  height: 20px;
  min-width: 20px;
  line-height: 20px;
  padding: 0px;
  font-size: 11px;
  border-radius: 5px;

  .lew-tag-close {
    margin-left: -2px;
    font-size: 12px;
    margin-right: 4px;
  }

  .lew-tag-value {
    padding: 0px 3px;
  }
  .lew-tag-left {
    margin-left: 4px;
  }
}

.lew-tag-bold {
  font-weight: bold;

  .lew-tag-value {
    font-weight: bold;
  }
}

.lew-tag-size-medium {
  height: 24px;
  min-width: 24px;
  line-height: 24px;
  padding: 0px 2px;
  font-size: 13px;
  border-radius: 6px;

  .lew-tag-close {
    margin-left: -3px;
    font-size: 13px;
    margin-right: 2px;
  }

  .lew-tag-value {
    padding: 0px 4px;
  }
  .lew-tag-left {
    margin-left: 4px;
  }
}

.lew-tag-size-large {
  height: 28px;
  min-width: 28px;
  line-height: 28px;
  padding: 0px 4px;
  font-size: 15px;
  border-radius: 8px;

  .lew-tag-close {
    margin-left: -4px;
    font-size: 14px;
  }

  .lew-tag-value {
    padding: 0px 5px;
  }
  .lew-tag-left {
    margin-left: 4px;
  }
}

.lew-tag-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
}
</style>
<style lang="scss">
.lew-dark .lew-tag-color-black.lew-tag-type-fill {
  color: #000 !important;
}
</style>
