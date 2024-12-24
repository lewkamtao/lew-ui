<script setup lang="ts">
import { menuTreeItemProps } from './props'
import { LewCollapseTransition } from 'lew-ui'
import { LewFlex } from 'lew-ui'
import Icon from 'lew-ui/utils/Icon.vue'
import { cloneDeep } from 'lodash-es'

const props = defineProps(menuTreeItemProps)

const { modelValue, expandKeys, modelValueKeyPath, collapsed }: any =
  inject('menu-tree')
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
  expandKeys.value = cloneDeep(expandKeys.value)
  emit('change')
}
</script>

<template>
  <div class="lew-menu-tree-item">
    <lew-flex
      x="start"
      y="center"
      class="lew-menu-tree-item-label"
      :class="{
        'lew-menu-tree-item-label-active': modelValue === menuKey,
        'lew-menu-tree-item-label-selected': modelValueKeyPath?.includes(
          menuKey as string | number
        ),
        'lew-menu-tree-item-label-leaf': isLeaf,
        'lew-menu-tree-item-label-disabled': disabled,
        'lew-menu-tree-item-label-collapsed': collapsed
      }"
      :style="{
        paddingLeft: collapsed ? '0px' : renderIcon() ? '36px' : '15px'
      }"
      @click.stop="change"
    >
      <slot v-if="$slots.label" name="label" :props="props" />
      <template v-else>
        <component class="lew-menu-tree-item-icon" :is="renderIcon()" />
        <lew-text-trim
          class="lew-menu-tree-item-text"
          placement="right"
          :style="{ width: `calc(100% - ${renderIcon() ? 50 : 20}px)` }"
          :text="label"
          :delay="[250, 250]"
        />
        <Icon
          v-if="!isLeaf"
          class="lew-menu-tree-item-chevron-right"
          :size="14"
          :style="{
            transform: `rotate(${expandKeys.includes(menuKey) ? 270 : 90}deg)`,
            transition: 'all 0.2s'
          }"
          type="chevron-right"
        />
      </template>
    </lew-flex>
    <lew-collapse-transition v-if="!isLeaf">
      <div
        v-if="expandKeys.includes(menuKey) && !collapsed"
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

  .lew-menu-tree-item-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0px 15px;
    height: 36px;
    box-sizing: border-box;
    transition:
      background-color 0.25s,
      color 0.25s;
    border-radius: var(--lew-border-radius-small);
    overflow: hidden;
    .lew-menu-tree-item-text {
      transition: opacity 1s;
    }
  }
  .lew-menu-tree-item-label:hover {
    background-color: var(--lew-bgcolor-3);
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
  .lew-menu-tree-item-icon {
    position: absolute;
    left: 11px;
    top: 11px;
  }
  .lew-menu-tree-item-chevron-right {
    position: absolute;
    right: 15px;
    top: 12px;
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

    .lew-menu-tree-item-chevron-right {
      opacity: 0;
    }
    .lew-menu-tree-item-text {
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
