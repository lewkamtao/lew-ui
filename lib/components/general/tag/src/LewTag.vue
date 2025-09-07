<script lang="ts" setup>
import type { LewSize } from 'lew-ui'
import type { LewTagType } from 'lew-ui/types'
import type { CSSProperties } from 'vue'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import { getColorType } from 'lew-ui/utils'
import { computed, ref } from 'vue'
import { tagEmits } from './emits'
import { tagProps } from './props'

interface SizeConfig {
  minHeight: string
  minWidth: string
  lineHeight: string
  fontSize: string
  borderRadius: string
  padding: string
  oversizePadding: string
  gap: string
  closeIconSize: number
}

interface TagStyle extends CSSProperties {
  closeIconSize?: number
}

interface TagStyleFunction {
  (color: string): CSSProperties
}

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)
const isClosing = ref(false)

const SIZE_CONFIG: Record<LewSize, SizeConfig> = {
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
} as const

const TYPE_STYLES: Record<LewTagType, TagStyleFunction> = {
  fill: (color: string): CSSProperties => ({
    backgroundColor: `var(--lew-color-${color})`,
    color: 'var(--lew-color-white)',
  }),
  light: (color: string): CSSProperties => ({
    backgroundColor: `var(--lew-color-${color}-light)`,
    color: `var(--lew-color-${color}-dark)`,
  }),
  ghost: (color: string): CSSProperties => ({
    backgroundColor: 'transparent',
    border: `var(--lew-form-border-width) solid var(--lew-color-${color}-dark)`,
    color: `var(--lew-color-${color}-dark)`,
    boxShadow: 'none',
  }),
} as const

const tagStyle = computed(
  (): TagStyle => {
    const { round, type, color, size, disabled, oversize } = props
    const resolvedColor = getColorType(color) || 'primary'
    const sizeConfig = SIZE_CONFIG[size] || SIZE_CONFIG.medium
    const styleFunction = TYPE_STYLES[type] || TYPE_STYLES.fill

    return {
      ...styleFunction(resolvedColor),
      ...sizeConfig,
      padding: oversize ? sizeConfig.oversizePadding : sizeConfig.padding,
      borderRadius: round ? '20px' : sizeConfig.borderRadius,
      opacity: disabled ? 'var(--lew-disabled-opacity)' : undefined,
      pointerEvents: disabled ? 'none' : undefined,
    }
  },
)

async function handleClose(): Promise<void> {
  if (props.disabled || isClosing.value)
    return

  if (props.close) {
    try {
      isClosing.value = true
      await props.close()
    }
    catch (error) {
      console.error('[LewTag] Error in close function:', error)
    }
    finally {
      emit('close')
      isClosing.value = false
    }
  }
  else {
    emit('close')
  }
}
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

    <div v-if="closeable" class="lew-tag-close" @click.stop="handleClose">
      <CommonIcon
        v-if="isClosing"
        :size="tagStyle.closeIconSize"
        type="loading"
        class="lew-tag-loading"
      />
      <CommonIcon v-else :size="tagStyle.closeIconSize" type="close" />
    </div>
  </div>
</template>

<style lang="scss">
.lew-tag {
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  transition: all var(--lew-form-transition-ease);

  .lew-tag-value {
    box-sizing: border-box;
    font-weight: normal;
    white-space: nowrap;
  }

  .lew-tag-close {
    display: inline-flex;
    padding: 2px;
    border-radius: var(--lew-border-radius-small);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--lew-form-transition-ease);

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .lew-tag-loading {
      animation: spin 1s linear infinite;
    }
  }

  .lew-tag-left,
  .lew-tag-right {
    display: inline-flex;
    box-sizing: border-box;
    align-items: center;
  }

  &.lew-tag-bold {
    font-weight: bold;

    .lew-tag-value {
      font-weight: bold;
    }
  }
}

.lew-dark {
  .lew-tag-close {
    &:hover {
      background-color: rgba(0, 0, 0, 0.45);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}

.lew-tag-to {
  cursor: pointer;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
