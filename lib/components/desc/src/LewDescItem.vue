<script setup lang="ts">
import { any2px, object2class } from 'lew-ui/utils'
import { LewTooltip, LewTextTrim } from 'lew-ui'
import type { TextTrimAlignment } from 'lew-ui'
import { cloneDeep, isString } from 'lodash-es'
import { descItemProps } from './props'
import Icon from 'lew-ui/utils/Icon.vue'
import { tipsIconSizeMap } from 'lew-ui/components/form/src/props'

// 获取app实例并注册tooltip指令
const app = getCurrentInstance()?.appContext.app
if (app && !app.directive('tooltip')) {
  app.use(LewTooltip)
}

const props = defineProps(descItemProps)
const descItemRef = ref()

// 计算class名称
const getDescItemClassNames = computed(() => {
  const { direction, size } = cloneDeep(props)
  return object2class('lew-desc-item', { direction, size })
})

// 处理显示文本和空值
const showTextAndEmpty = () => {
  const text = props.dataSource[props.field]
  if (text === null || text === undefined || text === '') {
    return '--'
  }
  return isString(text) ? text : JSON.stringify(text)
}

// 渲染内容
const renderItem = () => {
  if (props.customRender) {
    const { field, label } = props
    return props.customRender({ field, label, dataSource })
  }
  return props.type === 'text-trim'
    ? h(LewTextTrim, {
        x: props.valueX as TextTrimAlignment,
        style: 'width: 100%',
        text: showTextAndEmpty()
      })
    : showTextAndEmpty()
}
</script>

<template>
  <div
    class="lew-desc-item"
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
      <div
        class="lew-label-box"
        :style="{
          'justify-content': labelX === 'center' ? labelX : `flex-${labelX}`
        }"
      >
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
      class="lew-desc-item-main"
      :style="{
        width:
          direction === 'x'
            ? `calc(${descItemRef?.offsetWidth}px - ${any2px(labelWidth)} - 10px)`
            : '100%',
        justifyContent: valueX === 'center' ? valueX : `flex-${valueX}`
      }"
    >
      <renderItem />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 基础样式
.lew-desc-item {
  position: relative;
  transition: opacity 0.25s;

  .lew-label-box-wrapper {
    transition: all 0.25s;
    height: 100%;

    .lew-label-box {
      display: inline-flex;
      gap: 5px;
      color: var(--lew-color-gray);
      width: 100%;
      height: 100%;

      .lew-label-tips-icon {
        cursor: pointer;
        margin-top: 3px;
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
  .lew-label-box-wrapper {
    font-size: var(--lew-form-font-size-small);
  }
}

.lew-desc-item-size-medium {
  .lew-label-box-wrapper {
    font-size: var(--lew-form-font-size-medium);
  }
}

.lew-desc-item-size-large {
  .lew-label-box-wrapper {
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

// 错误状态样式
.lew-desc-item-error {
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
</style>
