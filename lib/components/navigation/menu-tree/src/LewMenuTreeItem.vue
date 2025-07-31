<script setup lang="ts">
import { LewCollapseTransition, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { isValidComponent } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { inject } from 'vue'
import { menuTreeItemProps } from './props'

// Types
interface MenuTreeItemEmits {
  change: []
}

interface MenuTreeContext {
  modelValue: { value: string | number }
  expandKeys: { value: (string | number)[] | undefined }
  modelValueKeyPath: { value: (string | number)[] | undefined }
  collapsed: { value: boolean }
}

// Props & Emits
const props = defineProps(menuTreeItemProps)
const emit = defineEmits<MenuTreeItemEmits>()

// Inject
const menuTreeContext = inject<MenuTreeContext>('lew-menu-tree')!
if (!menuTreeContext) {
  throw new Error('LewMenuTreeItem must be used within LewMenuTree')
}

// 保持响应式，直接使用 menuTreeContext，不解构

// Methods
function handleChange(): void {
  if (props.disabled) {
    return
  }

  if (!props.isLeaf) {
    // Handle expand/collapse for parent nodes
    if (!menuTreeContext.expandKeys.value) {
      menuTreeContext.expandKeys.value = []
    }

    const index = menuTreeContext.expandKeys.value.indexOf(props.value as never)
    if (index > -1) {
      menuTreeContext.expandKeys.value.splice(index, 1)
    }
    else {
      menuTreeContext.expandKeys.value.push(props.value as never)
    }
  }
  else {
    // Handle selection for leaf nodes
    if (menuTreeContext.modelValue.value !== props.value) {
      menuTreeContext.modelValue.value = props.value as never
    }
  }

  menuTreeContext.expandKeys.value = cloneDeep(menuTreeContext.expandKeys.value || [])
  emit('change')
}
</script>

<template>
  <div class="lew-menu-tree-item">
    <LewFlex
      x="start" y="center" class="lew-menu-tree-item-label" :class="{
        'lew-menu-tree-item-label-active': menuTreeContext.modelValue.value === props.value,
        'lew-menu-tree-item-label-selected': menuTreeContext.modelValueKeyPath.value?.includes(
          props.value as never,
        ),
        'lew-menu-tree-item-label-leaf': props.isLeaf,
        'lew-menu-tree-item-label-disabled': props.disabled,
        'lew-menu-tree-item-label-collapsed': menuTreeContext.collapsed.value,
      }" :style="{
        paddingLeft: menuTreeContext.collapsed.value
          ? '0px'
          : isValidComponent(props.icon)
            ? '36px'
            : '11.5px',
      }" @click.stop="handleChange"
    >
      <slot v-if="$slots.label" name="label" :props="props" />
      <template v-else>
        <RenderComponent :render-fn="props.icon" class="lew-menu-tree-item-icon" />
        <RenderComponent
          :render-fn="props.label" type="text-trim" :component-props="{
            placement: 'right',
            delay: [250, 250],
          }" :style="{
            maxWidth: `calc(100% - ${isValidComponent(props.icon) ? 30 : 0}px)`,
          }" class="lew-menu-tree-item-text"
        />
        <lew-tag v-if="props.tagProps?.text" v-bind="{ ...props.tagProps, size: props.tagProps.size || 'small' }" />
        <CommonIcon
          v-if="!props.isLeaf && !menuTreeContext.collapsed.value" class="lew-menu-tree-item-chevron-right"
          :size="14" :style="{
            transform: `rotate(${menuTreeContext.expandKeys.value?.includes(props.value as never) ? 270 : 90}deg)`,
            transition: 'all 0.2s',
          }" type="chevron-right"
        />
      </template>
    </LewFlex>
    <LewCollapseTransition v-if="!props.isLeaf">
      <div
        v-if="menuTreeContext.expandKeys.value?.includes(props.value as never) && !menuTreeContext.collapsed.value"
        :style="{
          marginTop: props.level === 1 ? '5px' : 0,
        }" class="lew-menu-tree-item-main"
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
  background-color: var(--lew-bgcolor-1);
  border-radius: var(--lew-border-radius-medium);
  padding: 5px;
  margin-left: 20px;
  width: calc(100% - 20px);
  box-sizing: border-box;
}
</style>
