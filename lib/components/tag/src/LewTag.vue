<script lang="ts" setup>
import { LewTextTrim } from 'lew-ui'
import { getColorType } from 'lew-ui/utils'
import { tagProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'

// Props & Emits
const props = defineProps(tagProps)
const emit = defineEmits(['close'])

// Constants
const SIZE_CONFIG = {
  small: {
    height: '20px',
    minWidth: '20px',
    fontSize: '13px',
    borderRadius: '5px',
    padding: '0px 2px',
    closeIconSize: 12,
    closeMargin: '-2px 4px -2px -2px',
    contentPadding: '0px 3px',
    leftMargin: '4px'
  },
  medium: {
    height: '24px',
    minWidth: '24px',
    fontSize: '14px',
    borderRadius: '6px',
    padding: '0px 2px',
    closeIconSize: 14,
    closeMargin: '-3px 2px -3px -3px',
    contentPadding: '0px 4px',
    leftMargin: '4px'
  },
  large: {
    height: '28px',
    minWidth: '28px',
    fontSize: '15px',
    borderRadius: '8px',
    padding: '0px 6px',
    closeIconSize: 16,
    closeMargin: '-4px 0 -4px -4px',
    contentPadding: '0px 5px',
    leftMargin: '4px'
  }
}

const TYPE_STYLES = {
  fill: (color: string) => ({
    backgroundColor: `var(--lew-color-${color})`,
    color: 'var(--lew-color-white)'
  }),
  light: (color: string) => ({
    backgroundColor: `var(--lew-color-${color}-light)`,
    color: `var(--lew-color-${color}-dark)`
  }),
  ghost: (color: string) => ({
    backgroundColor: 'transparent',
    border: `var(--lew-form-border-width) solid var(--lew-color-${color}-dark)`,
    color: `var(--lew-color-${color}-dark)`,
    boxShadow: 'none'
  }),
  default: (color: string) => ({
    backgroundColor: `var(--lew-color-${color})`,
    color: 'var(--lew-color-white)'
  })
}

// Methods
const close = () => {
  if (props.disabled) return
  emit('close')
}

// Computed
const tagStyle: any = computed(() => {
  const { round, type, color, size, disabled } = props
  const _color = getColorType(color) || 'primary'
  const sizeConfig = SIZE_CONFIG[size] || SIZE_CONFIG.medium

  return {
    ...(TYPE_STYLES[type] || TYPE_STYLES.default)(_color),
    ...sizeConfig,
    borderRadius: round ? '20px' : sizeConfig.borderRadius,
    opacity: disabled ? 'var(--lew-disabled-opacity)' : undefined,
    pointerEvents: disabled ? 'none' : undefined
  }
})
</script>

<template>
  <div class="lew-tag" :style="tagStyle">
    <div
      class="lew-tag-left"
      v-if="$slots.left"
      :style="{ marginLeft: tagStyle.leftMargin }"
    >
      <slot name="left" />
    </div>

    <div class="lew-tag-value" :style="{ padding: tagStyle.contentPadding }">
      <lew-text-trim v-if="text" :text="text" />
      <lew-text-trim v-else>
        <slot />
      </lew-text-trim>
    </div>

    <div v-if="$slots.right" class="lew-tag-right">
      <slot name="right" />
    </div>

    <div
      v-if="closable"
      class="lew-tag-close"
      :style="{ margin: tagStyle.closeMargin }"
      @click.stop="close"
    >
      <Icon :size="tagStyle.closeIconSize" type="close" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-tag {
  // Positioning
  position: relative;

  // Display & Box Model
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;

  // Other
  align-items: center;
  justify-content: center;
  user-select: none;

  .lew-tag-value {
    // Display & Box Model
    box-sizing: border-box;
    max-width: 250px;
    padding: 0 3px;
    // Text
    font-weight: normal;
    white-space: nowrap;
  }

  .lew-tag-close {
    // Display & Box Model
    display: inline-flex;
    padding: 2px;
    border-radius: var(--lew-border-radius-small);

    // Other
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .lew-tag-left,
  .lew-tag-right {
    // Display & Box Model
    display: inline-flex;
    box-sizing: border-box;

    // Other
    align-items: center;
  }

  &.lew-tag-bold {
    font-weight: bold;

    .lew-tag-value {
      font-weight: bold;
    }
  }
}

.lew-tag-to {
  cursor: pointer;
}
</style>

<style lang="scss">
.lew-dark .lew-tag-color-black.lew-tag-type-fill {
  color: #000 !important;
}
</style>
