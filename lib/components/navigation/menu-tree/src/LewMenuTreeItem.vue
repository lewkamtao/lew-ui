<script setup lang="ts">
import { LewCollapseTransition, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { isValidComponent } from 'lew-ui/utils/render'
import { cloneDeep } from 'lodash-es'
import { inject } from 'vue'
import { menuTreeItemEmits } from './menuTreeItemEmits'

import { menuTreeItemProps } from './props'

interface MenuTreeContext {
  modelValue: { value: string }
  expandKeys: { value: string[] | undefined }
  modelValueKeyPath: { value: string[] | undefined }
  collapsed: { value: boolean }
}

const props = defineProps(menuTreeItemProps)
const emit = defineEmits(menuTreeItemEmits)

const menuTreeContext = inject<MenuTreeContext>('lew-menu-tree')
if (!menuTreeContext) {
  throw new Error('LewMenuTreeItem must be used within LewMenuTree')
}

// Type assertion after null check
const context = menuTreeContext as Required<MenuTreeContext>

// Methods
function handleChange(): void {
  if (props.disabled) {
    return
  }

  if (!props.isLeaf) {
    // Handle expand/collapse for parent nodes
    if (!context.expandKeys.value) {
      context.expandKeys.value = []
    }

    const index = context.expandKeys.value.indexOf(props.value as never)
    if (index > -1) {
      context.expandKeys.value.splice(index, 1)
    }
    else {
      context.expandKeys.value.push(props.value as never)
    }
  }
  else {
    if (context.modelValue.value !== props.value) {
      context.modelValue.value = props.value as never
    }
  }

  context.expandKeys.value = cloneDeep(context.expandKeys.value || [])
  emit('change')
}
</script>

<template>
  <div class="lew-menu-tree-item">
    <LewFlex
      x="start"
      y="center"
      class="lew-menu-tree-item-label"
      :class="{
        'lew-menu-tree-item-label-active': context.modelValue.value === props.value,
        'lew-menu-tree-item-label-selected': context.modelValueKeyPath.value?.includes(
          props.value as never,
        ),
        'lew-menu-tree-item-label-leaf': props.isLeaf,
        'lew-menu-tree-item-label-disabled': props.disabled,
        'lew-menu-tree-item-label-collapsed': context.collapsed.value,
      }"
      :style="{
        paddingLeft: context.collapsed.value
          ? '0px'
          : isValidComponent(props.icon)
            ? '36px'
            : '11.5px',
      }"
      @click.stop="handleChange"
    >
      <RenderComponent :render-fn="props.icon" class="lew-menu-tree-item-icon" />
      <RenderComponent
        :render-fn="props.label"
        type="text-trim"
        :component-props="{
          placement: 'right',
          delay: [250, 250],
        }"
        :style="{
          maxWidth: `calc(100% - ${isValidComponent(props.icon) ? 30 : 0}px)`,
        }"
        class="lew-menu-tree-item-text"
      />
      <lew-tag
        v-if="props.tagProps?.text"
        v-bind="{ ...props.tagProps, size: props.tagProps.size || 'small' }"
      />
      <CommonIcon
        v-if="!props.isLeaf && !context.collapsed.value"
        class="lew-menu-tree-item-chevron-right"
        :size="14"
        :style="{
          transform: `rotate(${context.expandKeys.value?.includes(props.value as never) ? 270 : 90}deg)`,
          transition: 'all 0.2s',
        }"
        type="chevron-right"
      />
    </LewFlex>
    <LewCollapseTransition v-if="!props.isLeaf">
      <div
        v-if="context.expandKeys.value?.includes(props.value as never) && !context.collapsed.value"
        :style="{
          marginTop: props.level === 1 ? '5px' : 0,
        }"
        class="lew-menu-tree-item-main"
      >
        <slot />
      </div>
    </LewCollapseTransition>
  </div>
</template>

<style scoped lang="scss">
.lew-menu-tree-item {
  // CSS 变量定义
  --lew-menu-tree-item-bg: var(--lew-color-menu-primary-item-bg);
  --lew-menu-tree-item-bg-hover: var(--lew-color-menu-primary-item-bg-hover);
  --lew-menu-tree-item-bg-active: var(--lew-color-menu-primary-item-bg-active);
  --lew-menu-tree-item-text: var(--lew-color-menu-primary-item-text);
  --lew-menu-tree-item-text-hover: var(--lew-color-menu-primary-item-text-hover);
  --lew-menu-tree-item-text-active: var(--lew-color-menu-primary-item-text-active);
  --lew-menu-tree-item-selected-bg: var(--lew-color-menu-primary-item-selected-bg);
  --lew-menu-tree-item-selected-bg-hover: var(--lew-color-menu-primary-item-selected-bg-hover);
  --lew-menu-tree-item-selected-text: var(--lew-color-menu-primary-item-selected-text);
  --lew-menu-tree-item-selected-text-hover: var(--lew-color-menu-primary-item-selected-text-hover);
  --lew-menu-tree-item-icon: var(--lew-color-menu-primary-item-icon);
  --lew-menu-tree-item-icon-hover: var(--lew-color-menu-primary-item-icon-hover);
  --lew-menu-tree-item-icon-selected: var(--lew-color-menu-primary-item-icon-selected);
  --lew-menu-tree-item-icon-selected-hover: var(--lew-color-menu-primary-item-icon-selected-hover);

  position: relative;
  user-select: none;
  font-size: 14px;
  color: var(--lew-menu-tree-item-text);

  .lew-menu-tree-item-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 11.5px;
    height: 36px;
    box-sizing: border-box;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
    background-color: var(--lew-menu-tree-item-bg);
  }

  .lew-menu-tree-item-label:hover:not(.lew-menu-tree-item-label-active) {
    background-color: var(--lew-menu-tree-item-bg-hover);

    :deep(.lew-menu-tree-item-icon) {
      color: var(--lew-menu-tree-item-icon-hover);
    }

    :deep(.lew-menu-tree-item-text) {
      color: var(--lew-menu-tree-item-text-hover);
    }
  }

  .lew-menu-tree-item-label:active {
    background-color: var(--lew-menu-tree-item-bg-active);

    :deep(.lew-menu-tree-item-text) {
      color: var(--lew-menu-tree-item-text-active);
    }
  }

  .lew-menu-tree-item-label-active {
    background-color: var(--lew-color-primary-light);

    :deep(.lew-menu-tree-item-icon) {
      color: var(--lew-color-primary);
    }

    :deep(.lew-menu-tree-item-text) {
      color: var(--lew-color-primary);
    }
  }

  .lew-menu-tree-item-label-active:hover {
    background-color: var(--lew-color-primary-light);

    :deep(.lew-menu-tree-item-icon) {
      color: var(--lew-color-primary);
    }

    :deep(.lew-menu-tree-item-text) {
      color: var(--lew-color-primary);
    }
  }

  .lew-menu-tree-item-label-selected {
    :deep(.lew-menu-tree-item-icon) {
      color: var(--lew-color-primary);
    }

    :deep(.lew-menu-tree-item-text) {
      color: var(--lew-color-primary);
    }
  }

  .lew-menu-tree-item-main {
    box-sizing: border-box;

    .lew-menu-tree-item-label:hover:not(.lew-menu-tree-item-label-active) {
      background-color: var(--lew-menu-tree-item-bg-hover);
    }
  }

  :deep(.lew-menu-tree-item-icon) {
    position: absolute;
    left: 11px;
    top: 11px;
    color: var(--lew-menu-tree-item-icon);
  }

  .lew-menu-tree-item-chevron-right {
    flex-shrink: 0;
    color: var(--lew-text-color-3);
  }

  .lew-menu-tree-item-label:hover .lew-menu-tree-item-chevron-right {
    color: var(--lew-text-color-1);
  }

  .lew-menu-tree-item-label-active .lew-menu-tree-item-chevron-right,
  .lew-menu-tree-item-label-selected .lew-menu-tree-item-chevron-right {
    color: var(--lew-color-primary);
  }

  .lew-menu-tree-item-label-disabled {
    cursor: not-allowed;
    opacity: var(--lew-disabled-opacity);
  }

  .lew-menu-tree-item-label-disabled:hover {
    background-color: transparent;
    color: var(--lew-menu-tree-item-text);
  }

  .lew-menu-tree-item-label-collapsed {
    padding: 0px;
    width: 36px;

    :deep(.lew-menu-tree-item-text) {
      opacity: 0;
      transition: opacity 0.15s ease;
    }
  }

  .lew-menu-tree-item-label:not(.lew-menu-tree-item-label-collapsed) {
    :deep(.lew-menu-tree-item-text) {
      opacity: 1;
      transition: opacity 0.15s ease;
    }
  }
}

.lew-menu-tree-item:last-child {
  border-bottom: none;
}

.lew-menu-tree-item-main {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: var(--lew-form-bgcolor);
  border-radius: var(--lew-border-radius-medium);
  padding: 5px;
  margin-left: 20px;
  width: calc(100% - 20px);
  box-sizing: border-box;
}
</style>
