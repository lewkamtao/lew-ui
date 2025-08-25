<script setup lang="ts">
import type { LewSize } from 'lew-ui'
import { LewTextTrim, LewTooltip } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { tipsIconSizeMap } from 'lew-ui/components/form/form/src/props'
import { any2px, object2class, retrieveNestedFieldValue } from 'lew-ui/utils'
import { isString } from 'lodash-es'
import { computed, getCurrentInstance, ref } from 'vue'
import { descItemProps, lewDescSizePaddingMap } from './props'

const props = defineProps(descItemProps)

// Register tooltip directive
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

// Refs
const descItemRef = ref<HTMLElement>()

// Constants
const GAP_X_MAP: Record<LewSize, number> = {
  small: 10,
  medium: 14,
  large: 16,
}

const GAP_Y_MAP: Record<LewSize, number> = {
  small: 8,
  medium: 10,
  large: 12,
}

// Computed
const getDescItemClassNames = computed(() => {
  const { direction, size, bordered } = props
  return object2class('lew-desc-item', { direction, size, bordered })
})

const getGap = computed(() => {
  const { size, direction } = props
  return direction === 'x' ? GAP_X_MAP[size] : GAP_Y_MAP[size]
})

const getPadding = computed(() => {
  const { bordered, size } = props
  return bordered
    ? `${any2px(lewDescSizePaddingMap[size] - 10)} ${any2px(lewDescSizePaddingMap[size])}`
    : 0
})

const getDescItemStyle = computed(() => {
  const { bordered, gridArea } = props
  return {
    gap: bordered ? 0 : any2px(getGap.value),
    gridArea: gridArea || undefined,
  }
})

const getLabelBoxStyle = computed(() => {
  const { labelX } = props
  return {
    justifyContent: labelX === 'center' ? labelX : `flex-${labelX}`,
    padding: getPadding.value,
  }
})

const getDescItemMainStyle = computed(() => {
  const { direction, labelWidth, valueX } = props
  return {
    width:
      direction === 'x'
        ? `calc(${descItemRef.value?.offsetWidth || 0}px - ${any2px(labelWidth)} - 10px)`
        : '100%',
    justifyContent: valueX === 'center' ? valueX : `flex-${valueX}`,
    padding: getPadding.value,
  }
})

const getLabelBoxWidth = computed(() => {
  const { direction, labelWidth } = props
  return direction === 'x' ? any2px(labelWidth) : '100%'
})

// Methods
function showTextAndEmpty(): string {
  const text = retrieveNestedFieldValue(props.dataSource, props.field!)
  if (text === null || text === undefined || text === '') {
    return '-'
  }
  return isString(text) ? text : JSON.stringify(text)
}
</script>

<template>
  <div
    ref="descItemRef"
    class="lew-desc-item"
    :class="getDescItemClassNames"
    :style="getDescItemStyle"
  >
    <div :style="{ width: getLabelBoxWidth }" class="lew-label-box-wrapper">
      <div class="lew-label-box" :style="getLabelBoxStyle">
        {{ label }}
        <CommonIcon
          v-if="tips"
          v-tooltip="{ content: tips }"
          class="lew-label-tips-icon"
          :size="tipsIconSizeMap[size]"
          type="normal"
        />
      </div>
    </div>
    <div class="lew-desc-item-main" :style="getDescItemMainStyle">
      <slot
        v-if="$slots.default"
        :field="field"
        :label="label"
        :data-source="dataSource"
        :value="showTextAndEmpty()"
      />
      <RenderComponent
        v-else-if="customRender"
        :render-fn="customRender({ field: field!, label: label!, dataSource })"
      />
      <template v-else-if="type === 'text-trim'">
        <LewTextTrim :x="valueX" style="width: 100%" :text="showTextAndEmpty()" />
      </template>
      <template v-else>
        {{ showTextAndEmpty() }}
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 基础样式
.lew-desc-item {
  position: relative;
  transition: opacity 0.25s;
  flex-shrink: 0;

  .lew-label-box-wrapper {
    transition: all 0.25s;
    height: 100%;

    .lew-label-box {
      display: inline-flex;
      white-space: nowrap;
      gap: 5px;
      color: var(--lew-text-color-6);
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      .lew-label-tips-icon {
        cursor: pointer;
        margin-top: 4px;
        flex-shrink: 0;
      }
    }
  }

  .lew-desc-item-main {
    height: 100%;
    display: flex;
    word-break: break-word;
    position: relative;
  }

  .lew-error-message {
    position: absolute;
    left: 0px;
    bottom: 0px;
    font-size: 12px;
    transition: all 0.1s;
    transform: translateY(calc(100% + 2px));
    color: var(--lew-color-error-dark);
  }
}

// 尺寸相关样式
.lew-desc-item-size-small {
  .lew-label-box-wrapper,
  .lew-desc-item-main {
    font-size: var(--lew-form-font-size-small);
  }
}

.lew-desc-item-size-medium {
  .lew-label-box-wrapper,
  .lew-desc-item-main {
    font-size: var(--lew-form-font-size-medium);
  }
}

.lew-desc-item-size-large {
  .lew-label-box-wrapper,
  .lew-desc-item-main {
    font-size: var(--lew-form-font-size-large);
  }
}

// 布局方向相关样式
.lew-desc-item-direction-x {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .lew-label-box-wrapper {
    display: inline-flex;
    justify-content: flex-end;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .lew-desc-item-main {
    flex: 1;
  }
}

.lew-desc-item-direction-y {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 5px;

  .lew-label-box-wrapper {
    display: inline-flex;
    justify-content: flex-start;
    box-sizing: border-box;
    margin-top: 0px;
    white-space: nowrap;
  }
}

// 动画相关样式
.lew-slide-fade-leave-active,
.lew-slide-fade-enter-active {
  transition: all 0.15s ease;
}

.lew-slide-fade-enter-from,
.lew-slide-fade-leave-to {
  transform: translateY(100%) !important;
  opacity: 0;
}

// 状态相关样式
.lew-desc-item-readonly {
  pointer-events: none;
}

.lew-desc-item-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
  user-select: none;
}

.lew-desc-item-bordered {
  .lew-label-box-wrapper,
  .lew-desc-item-main {
    box-sizing: border-box;
    outline: var(--lew-desc-border);
  }

  .lew-label-box-wrapper {
    background-color: var(--lew-desc-label-bgcolor);

    .lew-label-box {
      color: var(--lew-text-color-2);

      .lew-label-tips-icon {
        color: var(--lew-text-color-4);
      }
    }
  }

  .lew-desc-item-main {
    background: var(--lew-bgcolor-0);
  }
}

.lew-desc-item-bordered:last-child {
  border-bottom: none;
}
</style>
