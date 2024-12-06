<script setup lang="ts">
import { computed, h, resolveDirective, withDirectives } from 'vue'
import { any2px } from 'lew-ui/utils'
import { menuTreeProps } from './props'
import type { MenuTreeItem } from './props'
import LewMenuTreeItem from './LewMenuTreeItem.vue'
import { cloneDeep } from 'lodash-es'

const props = defineProps(menuTreeProps)
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })
const collapsed = defineModel('collapsed', { required: false, default: false })

const getModelValueKeyPath = computed(() => {
  const findKeyPath = (
    items: MenuTreeItem[],
    parentPath: (string | number)[] = []
  ): (string | number)[] | undefined => {
    for (const item of items) {
      const currentPath = [...parentPath, item.key]
      if (item.key === modelValue.value) {
        return currentPath
      }
      if (item.children?.length) {
        const found = findKeyPath(item.children, currentPath)
        if (found) return found
      }
    }
  }
  return findKeyPath(props.options) || []
})

provide('menu-tree', {
  modelValue,
  expandKeys,
  collapsed,
  modelValueKeyPath: getModelValueKeyPath
})

const menuTreeStyle = computed(() => ({
  width: collapsed.value ? any2px(48) : any2px(props.width)
}))

const hoverMenu = resolveDirective('hover-menu')

// 写一个方法，把树中的某些字段转换成另外的字段 传入一个对象 key是转换后的字段  value是需要转换的字段
const transformTree = (
  tree: MenuTreeItem[],
  options: Record<string, string>
) => {
  return tree.map((item) => {
    const newItem = { ...item } as Record<string, any>
    Object.entries(options).forEach(([key, value]) => {
      newItem[key] = newItem[value]
      newItem.active =
        newItem[value] === modelValue.value ||
        getModelValueKeyPath.value.includes(item.key as never)
    })
    if (item.children?.length) {
      newItem.children = transformTree(item.children, options)
    }
    return newItem
  })
}

const renderMenuTreeItem = (item: MenuTreeItem, level: number = 1): any => {
  const contextOptions = transformTree(item.children || [], {
    label: 'title',
    value: 'key'
  })
  const directives: any =
    level === 1
      ? [
          [
            hoverMenu,
            {
              options:
                level === 1
                  ? [
                      { label: item.title, disabled: true },
                      {
                        isDividerLine: true
                      },
                      ...contextOptions
                    ]
                  : contextOptions,
              type: 'mouseover',
              disabled: !collapsed.value,
              selectHandler: (item: any) => {
                if (item.disabled) return
                if (item.children?.length) {
                  const index = expandKeys.value.indexOf(item.key as never)
                  if (index > -1) {
                    expandKeys.value.splice(index, 1)
                  } else {
                    expandKeys.value.push(item.key as never)
                  }
                } else {
                  if (modelValue.value !== item.key) {
                    modelValue.value = item.key
                  } else {
                    modelValue.value = ''
                  }
                }
                expandKeys.value = cloneDeep(expandKeys.value)
              }
            }
          ]
        ]
      : []
  return withDirectives(
    h(
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
    ),
    directives
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
  transition: width 0.2s;
  padding: 4px;
  box-sizing: border-box;
  background-color: var(--lew-bgcolor-0);
}
</style>
