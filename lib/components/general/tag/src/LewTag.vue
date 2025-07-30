<script lang="ts" setup>
import { getColorType } from 'lew-ui/utils'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { tagProps } from './props'

// Props & Emits
const props = defineProps(tagProps)
const emit = defineEmits(['close'])

// Constants
const SIZE_CONFIG = {
  small: {
    minHeight: '20px',
    minWidth: '20px',
    lineHeight: '16px',
    fontSize: '13px',
    borderRadius: '5px',
    padding: '0px 4px',
    oversizePadding: '4px 10px',
    gap: '2px',
    closeIconSize: 12,
  },
  medium: {
    minHeight: '24px',
    minWidth: '24px',
    lineHeight: '18px',
    fontSize: '14px',
    borderRadius: '6px',
    padding: '0px 6px',
    oversizePadding: '5px 12px',
    closeIconSize: 14,
    gap: '3px',
  },
  large: {
    minHeight: '28px',
    minWidth: '28px',
    lineHeight: '20px',
    fontSize: '15px',
    borderRadius: '7px',
    padding: '0px 8px',
    oversizePadding: '6px 14px',
    closeIconSize: 16,
    gap: '4px',
  },
}

const TYPE_STYLES = {
  fill: (color: string) => ({
    backgroundColor: `var(--lew-color-${color})`,
    color: 'var(--lew-color-white)',
  }),
  light: (color: string) => ({
    backgroundColor: `var(--lew-color-${color}-light)`,
    color: `var(--lew-color-${color}-dark)`,
  }),
  ghost: (color: string) => ({
    backgroundColor: 'transparent',
    border: `var(--lew-form-border-width) solid var(--lew-color-${color}-dark)`,
    color: `var(--lew-color-${color}-dark)`,
    boxShadow: 'none',
  }),
  default: (color: string) => ({
    backgroundColor: `var(--lew-color-${color})`,
    color: 'var(--lew-color-white)',
  }),
}

// Methods
function close() {
  if (props.disabled)
    return
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
    padding: props.oversize ? sizeConfig.oversizePadding : sizeConfig.padding,
    borderRadius: round ? '20px' : sizeConfig.borderRadius,
    opacity: disabled ? 'var(--lew-disabled-opacity)' : undefined,
    pointerEvents: disabled ? 'none' : undefined,
  }
})
</script>

<template>
  <div class="lew-tag" :style="tagStyle">
    <div v-if="$slots.left" class="lew-tag-left">
      <slot name="left" />
    </div>

    <div class="lew-tag-value">
      <slot v-if="!text" />
      <template v-else>
        {{ text }}
      </template>
    </div>

    <div v-if="$slots.right" class="lew-tag-right">
      <slot name="right" />
    </div>

    <div v-if="closable" class="lew-tag-close" @click.stop="close">
      <CommonIcon :size="tagStyle.closeIconSize" type="close" />
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

  transition: all var(--lew-form-transition-ease);

  .lew-tag-value {
    // Display & Box Model
    box-sizing: border-box;
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
