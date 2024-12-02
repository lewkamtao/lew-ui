<script setup lang="ts">
import { computed, h } from 'vue'
import { any2px } from 'lew-ui/utils'
import { menuTreeProps } from './props'
import type { MenuTreeItem } from './props'
import LewMenuTreeItem from './LewMenuTreeItem.vue'

const props = defineProps(menuTreeProps)
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })

provide('menu-tree', { modelValue, expandKeys })

const menuTreeStyle = computed(() => ({
  width: any2px(props.width)
}))

const renderMenuTreeItem = (item: MenuTreeItem, level: number = 1): any => {
  return h(
    LewMenuTreeItem,
    {
      menuKey: item.key,
      title: item.title,
      level,
      isLeaf: !item.children?.length,
      disabled: item.disabled,
      renderIcon: () => item.renderIcon,
      onChange: () => emit('change', item)
    },
    () => {
      return (item.children || []).map((child: MenuTreeItem) =>
        renderMenuTreeItem(child, level + 1)
      )
    }
  )
}
const emit = defineEmits(['change'])
</script>

<template>
  <div :style="menuTreeStyle" class="lew-menu-tree">
    <template v-for="item in options" :key="item.id">
      <component :is="renderMenuTreeItem(item)" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.lew-menu-tree {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 5px;
}
</style>
