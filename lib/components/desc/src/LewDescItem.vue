<script setup lang="ts">
import { any2px, object2class } from 'lew-ui/utils'
import { LewTooltip, LewTextTrim } from 'lew-ui'
import type { TextTrimAlignment } from 'lew-ui'
import { cloneDeep, isString } from 'lodash-es'
import { descItemProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'
import { tipsIconSizeMap } from 'lew-ui/components/form/src/props'

// 获取app
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const getDescItemClassNames = computed(() => {
  const { direction, size } = cloneDeep(props)
  return object2class('lew-form-item', { direction, size })
})

const descItemRef = ref()

const props = defineProps(descItemProps)

const renderItem = () => {
  if (props.customRender) {
    const { value, label } = props
    return props.customRender({ value, label })
  }
  return props.type === 'text-trim'
    ? h(LewTextTrim, {
        x: props.x as TextTrimAlignment,
        style: 'width: 100%',
        text: props.value
      })
    : showTextAndEmpty()
}

const showTextAndEmpty = () => {
  const text = props.value
  if (text === null || text === undefined || text === '') {
    return '--'
  } else {
    return isString(text) ? text : JSON.stringify(text)
  }
}
</script>

<template>
  <div
    class="lew-form-item"
    ref="descItemRef"
    :class="getDescItemClassNames"
    :style="{
      'grid-area': gridArea || ''
    }"
  >
    <div
      :style="direction === 'x' ? `width:${any2px(labelWidth)}` : ''"
      class="lew-label-box-wrapper"
    >
      <div class="lew-label-box" :style="{ 'justify-content': x }">
        {{ label }}
        <Icon
          class="lew-label-tips-icon"
          v-if="tips"
          v-tooltip="{
            content: tips
          }"
          :size="tipsIconSizeMap[size]"
          type="normal"
        ></Icon>
      </div>
    </div>
    <div
      class="lew-form-item-main"
      :style="{
        width:
          direction === 'x'
            ? `calc(${descItemRef?.offsetWidth}px - ${any2px(labelWidth)} - 10px)`
            : '100%',
        justifyContent: direction === 'x' && between ? 'flex-end' : 'flex-start'
      }"
    >
      {{ renderItem() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lew-form-item {
  position: relative;
  transition: opacity 0.25s;
  .lew-label-box-wrapper {
    transition: all 0.25s;
    height: 100%;
    .lew-label-box {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--lew-color-gray);
      width: 100%;
      height: 100%;
      .lew-label-tips-icon {
        cursor: pointer;
        margin-top: 1px;
      }
    }
  }
  .lew-form-item-main {
    height: 100%;
  }
}

.lew-form-item-size-small {
  min-height: var(--lew-form-item-height-small);
  .lew-label-box-wrapper {
    font-size: var(--lew-desc-font-size-small);
  }
}

.lew-form-item-size-medium {
  min-height: var(--lew-form-item-height-medium);
  .lew-label-box-wrapper {
    font-size: var(--lew-desc-font-size-medium);
  }
}

.lew-form-item-size-large {
  min-height: var(--lew-form-item-height-large);
  .lew-label-box-wrapper {
    font-size: var(--lew-desc-font-size-large);
  }
}
.lew-form-item-main {
  display: flex;
  align-items: center;
}

.lew-form-item-direction-x {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .lew-label-box-wrapper {
    display: inline-flex;
    justify-content: flex-end;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .lew-form-item-main {
    flex: 1;
  }
}

.lew-form-item-direction-y {
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
.lew-form-item {
  .lew-form-item-main {
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

.lew-form-item-error {
  --lew-desc-border-color-focus: var(--lew-color-error-dark);
  --lew-radio-border-color-hover: var(--lew-color-error);
  --lew-checkbox-border-color-hover: var(--lew-color-error);
  --lew-checkbox-color: var(--lew-color-error);
  --lew-checkbox-color: var(--lew-color-error-dark);
  --lew-checkbox-color-light: var(--lew-color-error-light);
  --lew-radio-color: var(--lew-color-error);
  --lew-radio-color: var(--lew-color-error-dark);
  --lew-radio-color-light: var(--lew-color-error-light);
  --lew-desc-outline: 0px var(--lew-color-error-light) solid;
}

.lew-slide-fade-leave-active,
.lew-slide-fade-enter-active {
  transition: all 0.15s ease;
}

.lew-slide-fade-enter-from,
.lew-slide-fade-leave-to {
  transform: translateY(100%) !important;
  opacity: 0;
}

.lew-form-item-readonly {
  pointer-events: none;
}
.lew-form-item-disabled {
  opacity: var(--lew-disabled-opacity);
  pointer-events: none;
  user-select: none;
}
</style>
