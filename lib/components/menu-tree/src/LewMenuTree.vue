<script setup lang="ts">
import { computed, h, resolveDirective, withDirectives } from 'vue'
import { any2px } from 'lew-ui/utils'
import { menuTreeProps } from './props'
import type { MenuTreeItem } from './props'
import LewMenuTreeItem from './LewMenuTreeItem.vue'
import { cloneDeep } from 'lodash-es'

// 定义组件 props
const props = defineProps(menuTreeProps)
// 定义双向绑定的值
const modelValue = defineModel()
const expandKeys = defineModel('expandKeys', { required: false, default: [] })
const collapsed = defineModel('collapsed', { required: false, default: false })

// 计算当前选中项的路径
const getModelValueKeyPath = computed(() => {
  // 递归查找选中项的路径
  const findKeyPath = (
    items: MenuTreeItem[],
    parentPath: (string | number)[] = []
  ): (string | number)[] | undefined => {
    for (const item of items) {
      const currentPath = [...parentPath, item.value]
      // 找到选中项,返回路径
      if (item.value === modelValue.value) {
        return currentPath
      }
      // 递归查找子项
      if (item.children?.length) {
        const found = findKeyPath(item.children, currentPath)
        if (found) return found
      }
    }
  }
  // 从根节点开始查找,如果没找到返回空数组
  return findKeyPath(props.options) || []
})

// 注入菜单树相关的数据
provide('menu-tree', {
  modelValue,
  expandKeys,
  collapsed,
  modelValueKeyPath: getModelValueKeyPath
})

// 计算菜单树的样式
const menuTreeStyle = computed(() => ({
  width: collapsed.value ? any2px(44) : any2px(props.width)
}))

// 获取悬浮菜单指令
const hoverMenu = resolveDirective('hover-menu')

// 递归这棵树，给每个节点添加一个 active 字段，用于标识当前选中项
const transformTree = (tree: MenuTreeItem[]): MenuTreeItem[] => {
  return tree.map((item) => ({
    ...item,
    active:
      item.value === modelValue.value ||
      getModelValueKeyPath.value.includes(item.value as never),
    children: item.children?.length ? transformTree(item.children) : undefined
  }))
}
// 渲染菜单树项
const renderMenuTreeItem = (item: MenuTreeItem, level: number = 1): any => {
  // 构建悬浮菜单选项
  const buildHoverMenuOptions = (item: MenuTreeItem) => {
    return [
      { label: item.label, disabled: true },
      { isDividerLine: true },
      ...(transformTree(item.children as MenuTreeItem[]) || [])
    ]
  }

  // 处理菜单项选择
  const handleMenuSelect = (item: MenuTreeItem) => {
    if (item.disabled) return

    if (item.children?.length) {
      // 处理展开/收起
      const index = expandKeys.value.indexOf(item.value as never)
      if (index > -1) {
        expandKeys.value.splice(index, 1)
      } else {
        expandKeys.value.push(item.value as never)
      }
    } else {
      // 处理选中/取消选中
      modelValue.value = modelValue.value !== item.value ? item.value : ''
    }
    // 克隆展开键数组以触发响应式更新
    expandKeys.value = cloneDeep(expandKeys.value)
  }

  // 只有第一层级才添加悬浮菜单指令
  const directives: any =
    level === 1
      ? [
          [
            hoverMenu,
            {
              options: buildHoverMenuOptions(item),
              type: 'mouseover',
              disabled: !collapsed.value,
              selectHandler: handleMenuSelect
            }
          ]
        ]
      : []
  const { tagText, tagType,tagColor } = item
  // 渲染菜单项组件
  return withDirectives(
    h(
      LewMenuTreeItem,
      {
        menuKey: item.value,
        label: item.label,
        level,
        isLeaf: !item.children?.length,
        disabled: item.disabled,
        tagText,
        tagType,
        tagColor,
        renderIcon: () => item.renderIcon,
        renderLabel: () => item.renderLabel,
        onChange: () => emit('change', item)
      },
      // 递归渲染子项
      () =>
        (item.children || []).map((child) =>
          renderMenuTreeItem(child, level + 1)
        )
    ),
    directives
  )
}

// 定义事件
const emit = defineEmits(['change'])
</script>

<template>
  <div :style="menuTreeStyle" class="lew-menu-tree">
    <template v-for="item in options" :key="item.value">
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
