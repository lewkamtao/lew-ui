<script setup lang="ts">
import type { LewMenuTreeItemOption, LewMenuTreeItemOptions } from 'lew-ui/types'
import { any2px } from 'lew-ui/utils'
import { cloneDeep } from 'lodash-es'
import { computed, h, onMounted, provide, resolveDirective, withDirectives } from 'vue'
import LewMenuTreeItem from './LewMenuTreeItem.vue'
import { menuTreeProps } from './props'

// Types
interface MenuTreeEmits {
  change: [item: LewMenuTreeItemOption]
  select: [value: string | number, item: LewMenuTreeItemOption]
  expand: [expandKeys: (string | number)[]]
  collapse: [expandKeys: (string | number)[]]
}

// Props & Emits
const props = defineProps(menuTreeProps)
const emit = defineEmits<MenuTreeEmits>()

// Models
const modelValue = defineModel<string>({ default: '' })
const expandKeys = defineModel<(string)[]>('expandKeys', { default: () => [] })
const collapsed = defineModel<boolean>('collapsed', { default: false })

// Computed
const getModelValueKeyPath = computed(() => {
  function findKeyPath(
    items: LewMenuTreeItemOptions,
    parentPath: (string | number)[] = [],
  ): (string | number)[] | undefined {
    for (const item of items) {
      const currentPath = [...parentPath, item.value]

      if (item.value === modelValue.value) {
        return currentPath
      }

      if (item.children?.length) {
        const found = findKeyPath(item.children, currentPath)
        if (found) {
          return found
        }
      }
    }
  }

  return findKeyPath(props.options) || []
})

const menuTreeStyle = computed(() => ({
  width: collapsed.value ? any2px(44) : any2px(props.width),
}))

// Provide data for child components
provide('lew-menu-tree', {
  modelValue,
  expandKeys,
  collapsed,
  modelValueKeyPath: getModelValueKeyPath,
})

// Directives
const hoverMenu = resolveDirective('hover-menu')

// Methods
function handleMenuSelect(item: LewMenuTreeItemOption): void {
  if (item.disabled) {
    return
  }

  if (item.children?.length) {
    // Handle expand/collapse
    const index = expandKeys.value.indexOf(item.value as never)
    const wasExpanded = index > -1

    if (wasExpanded) {
      expandKeys.value.splice(index, 1)
      emit('collapse', [...expandKeys.value])
    }
    else {
      expandKeys.value.push(item.value as never)
      emit('expand', [...expandKeys.value])
    }
  }
  else {
    // Handle selection
    const newValue = modelValue.value !== item.value ? item.value : ''
    modelValue.value = newValue
    emit('select', newValue, item)
  }

  // Clone to trigger reactivity
  expandKeys.value = cloneDeep(expandKeys.value)
  emit('change', item)
}
function transformTree(tree: LewMenuTreeItemOptions = []): LewMenuTreeItemOptions {
  return tree.map(item => ({
    ...item,
    active:
      item.value === modelValue.value
      || getModelValueKeyPath.value?.includes(item.value as never),
    onClick: handleMenuSelect,
    children: item.children?.length ? transformTree(item.children) : undefined,
  }))
}

function renderMenuTreeItem(item: LewMenuTreeItemOption, level: number = 1): any {
  function buildHoverMenuOptions(item: LewMenuTreeItemOption) {
    return [
      { label: item.label, disabled: true },
      { isDividerLine: true },
      ...(transformTree(item.children as LewMenuTreeItemOptions) || []),
    ]
  }

  const directives: any = level === 1
    ? [[
        hoverMenu,
        {
          options: buildHoverMenuOptions(item),
          disabled: !collapsed.value,
        },
      ]]
    : []

  const { disabled, icon, label, value, tagProps } = item

  return withDirectives(
    h(
      LewMenuTreeItem,
      {
        label,
        value,
        level,
        isLeaf: !item.children?.length,
        disabled,
        icon,
        tagProps,
        onChange: () => emit('change', item),
      },
      () =>
        item.children?.length
          ? item.children.map(child => renderMenuTreeItem(child, level + 1))
          : [],
    ),
    directives,
  )
}

// Lifecycle
onMounted(() => {
  expandKeys.value = cloneDeep(expandKeys.value)
  modelValue.value = cloneDeep(modelValue.value)
})
</script>

<template>
  <div :style="menuTreeStyle" class="lew-menu-tree">
    <template v-for="item in props.options" :key="item.value">
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
  transition: width 0.2s;
  padding: 4px;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-0);
}
</style>
