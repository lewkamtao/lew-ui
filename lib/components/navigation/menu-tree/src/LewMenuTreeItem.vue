<script setup lang="ts">
import { LewCollapseTransition, LewFlex } from 'lew-ui'
import CommonIcon from 'lew-ui/_components/CommonIcon.vue'
import RenderComponent from 'lew-ui/_components/RenderComponent.vue'
import { isValidComponent } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { menuTreeItemProps } from './props'

const props = defineProps(menuTreeItemProps)

const emit = defineEmits(['change'])
const { modelValue, expandKeys, modelValueKeyPath, collapsed }: any
  = inject('lew-menu-tree')

function change() {
  if (props.disabled)
    return

  if (!props.isLeaf) {
    const index = expandKeys.value.indexOf(props.value)
    if (index > -1) {
      expandKeys.value.splice(index, 1)
    }
    else {
      expandKeys.value.push(props.value)
    }
  }
  else {
    if (modelValue.value !== props.value) {
      modelValue.value = props.value
    }
  }
  expandKeys.value = cloneDeep(expandKeys.value)
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
        'lew-menu-tree-item-label-active': modelValue === value,
        'lew-menu-tree-item-label-selected': modelValueKeyPath?.includes(
          value as string | number,
        ),
        'lew-menu-tree-item-label-leaf': isLeaf,
        'lew-menu-tree-item-label-disabled': disabled,
        'lew-menu-tree-item-label-collapsed': collapsed,
      }"
      :style="{
        paddingLeft: collapsed
          ? '0px'
          : isValidComponent(icon)
            ? '36px'
            : '11.5px',
      }"
      @click.stop="change"
    >
      <slot v-if="$slots.label" name="label" :props="props" />
      <template v-else>
        <RenderComponent
          :render-fn="icon"
          class="lew-menu-tree-item-icon"
        />
        <RenderComponent
          :render-fn="label"
          type="text-trim"
          :component-props="{
            placement: 'right',
            delay: [250, 250],
          }"
          :style="{
            maxWidth: `calc(100% - ${isValidComponent(icon) ? 30 : 0}px)`,
          }"
          class="lew-menu-tree-item-text"
        />
        <lew-tag
          v-if="tagProps?.text"
          v-bind="{ ...tagProps, size: tagProps.size || 'small' }"
        />
        <CommonIcon
          v-if="!isLeaf && !collapsed"
          class="lew-menu-tree-item-chevron-right"
          :size="14"
          :style="{
            transform: `rotate(${expandKeys.includes(value) ? 270 : 90}deg)`,
            transition: 'all 0.2s',
          }"
          type="chevron-right"
        />
      </template>
    </LewFlex>
    <LewCollapseTransition v-if="!isLeaf">
      <div
        v-if="expandKeys.includes(value) && !collapsed"
        :style="{
          marginTop: level === 1 ? '5px' : 0,
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
  background-color: var(--lew-bgcolor-1);
  border-radius: var(--lew-border-radius-medium);
  padding: 5px;
  margin-left: 20px;
  width: calc(100% - 20px);
  box-sizing: border-box;
}
</style>
