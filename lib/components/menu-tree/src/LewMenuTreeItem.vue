<script setup lang="ts">
import { menuTreeItemProps } from './props'
import { LewCollapseTransition } from 'lew-ui'
import { LewFlex } from 'lew-ui'
import Icon from 'lew-ui/utils/Icon.vue'

const props = defineProps(menuTreeItemProps)

const expandKeys: any = inject('expandKeys')
const modelValue: any = inject('modelValue')
const emit = defineEmits(['change'])

const change = () => {
  if (props.disabled) return
  
  if (!props.isLeaf) {
    const index = expandKeys.value.indexOf(props.menuKey)
    if (index > -1) {
      expandKeys.value.splice(index, 1)
    } else {
      expandKeys.value.push(props.menuKey)
    }
  } else {
    if (modelValue.value !== props.menuKey) {
      modelValue.value = props.menuKey
    } else {
      modelValue.value = ''
    }
  }
  emit('change')
}
</script>

<template>
  <div class="lew-menu-tree-item">
    <lew-flex
      x="start"
      y="center"
      class="lew-menu-tree-item-title"
      :class="{
        'lew-menu-tree-item-title-active': modelValue === menuKey,
        'lew-menu-tree-item-title-leaf': isLeaf,
        'lew-menu-tree-item-title-disabled': disabled
      }"
      @click="change"
    >
      <slot v-if="$slots.title" name="title" :props="props" />
      <template v-else>
        <component :is="renderIcon()" />
        <lew-text-trim
          placement="right"
          :style="{ width: `calc(100% - ${renderIcon() ? 50 : 20}px)` }"
          :text="title"
          :delay="[250, 250]"
        />
        <Icon
          v-if="!isLeaf"
          class="lew-menu-tree-item-title-icon"
          :size="14"
          :style="{
            transform: `rotate(${expandKeys.includes(menuKey) ? 90 : 0}deg)`,
            transition: 'all 0.2s'
          }"
          type="chevron-right"
        />
      </template>
    </lew-flex>
    <lew-collapse-transition v-if="!isLeaf">
      <div
        v-if="expandKeys.includes(menuKey)"
        :style="{
          marginTop: level === 1 ? '5px' : 0
        }"
        class="lew-menu-tree-item-main"
      >
        <slot />
      </div>
    </lew-collapse-transition>
  </div>
</template>
<style scoped lang="scss">
.lew-menu-tree-item {
  position: relative;
  user-select: none;

  .lew-menu-tree-item-title {
    cursor: pointer;
    padding: 10px 15px;
    box-sizing: border-box;
    transition: all 0.15s;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
  }
  .lew-menu-tree-item-title:hover {
    background-color: var(--lew-bgcolor-3);
  }
  .lew-menu-tree-item-title-active {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
    font-weight: bold;
  }
  .lew-menu-tree-item-title-active:hover {
    background-color: var(--lew-color-primary-light);
    color: var(--lew-color-primary-dark);
    font-weight: bold;
  }
  .lew-menu-tree-item-main {
    box-sizing: border-box;
  }
  .lew-menu-tree-item-title-icon {
    position: absolute;
    right: 15px;
    top: 12px;
  }
  .lew-menu-tree-item-title-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .lew-menu-tree-item-title-disabled:hover {
    background-color: transparent;
  }
}
.lew-menu-tree-item-title-leaf {
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
