<script setup lang="ts">
import { LewCollapseTransition, LewFlex } from 'lew-ui'
import { CommonIcon, isValidComponent, RenderComponent } from 'lew-ui/render'
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
  position: relative;
  user-select: none;
  font-size: 14px;
  color: var(--lew-text-color-1);

  .lew-menu-tree-item-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 11.5px;
    height: 36px;
    box-sizing: border-box;
    transition:
      background-color 0.25s,
      color 0.25s;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
  }

  .lew-menu-tree-item-label:hover {
    background-color: var(--lew-form-bgcolor-hover);
  }

  .lew-menu-tree-item-label-active {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
    font-weight: 600;
  }

  .lew-menu-tree-item-label-active:hover {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
  }

  .lew-menu-tree-item-label-selected {
    color: var(--lew-color-primary-dark);
    font-weight: 600;
  }

  .lew-menu-tree-item-label-selected:hover {
    color: var(--lew-color-primary-dark);
  }

  .lew-menu-tree-item-main {
    box-sizing: border-box;
  }

  :deep(.lew-menu-tree-item-icon) {
    position: absolute;
    left: 11px;
    top: 11px;
  }

  .lew-menu-tree-item-chevron-right {
    flex-shrink: 0;
  }

  .lew-menu-tree-item-label-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .lew-menu-tree-item-label-disabled:hover {
    background-color: transparent;
  }

  .lew-menu-tree-item-label-collapsed {
    padding: 0px;
    width: 36px;

    :deep(.lew-menu-tree-item-text) {
      opacity: 0;
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
