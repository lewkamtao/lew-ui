import { computed, ref, unref } from 'vue'

export interface TreeNode {
  key: string
  children?: TreeNode[]
  disabled?: boolean
  [key: string]: any
}

/**
 * 树形选择 Hook - 参考 Ant Design 和 Element UI 的实现
 *
 * 核心规则：
 * 1. 选中状态和半选状态互斥
 * 2. 选中节点时，所有子节点自动选中
 * 3. 取消选中节点时，所有子节点自动取消选中
 * 4. 子节点状态变化时，自动更新所有祖先节点状态
 */
export function useTreeSelection() {
  const tree = ref([])

  // 映射关系
  const parentMap = new Map<string, string | null>()
  const childrenMap = new Map<string, string[]>()
  const allDescendantsMap = new Map<string, string[]>() // 所有后代节点
  const disabledMap = new Map<string, boolean>() // 禁用状态映射

  // 状态集合
  const selectedSet = new Set<string>()
  const indeterminateSet = new Set<string>() // 半选状态（不确定状态）

  // 响应式状态
  const selectedKeys = ref<string[]>([])
  const indeterminateKeys = ref<string[]>([])

  /**
   * 构建节点映射关系
   */
  function buildMaps() {
    parentMap.clear()
    childrenMap.clear()
    allDescendantsMap.clear()
    disabledMap.clear()

    const dfs = (node: TreeNode, parent: string | null) => {
      parentMap.set(node.key, parent)
      const directChildren = node.children?.map(c => c.key) || []
      childrenMap.set(node.key, directChildren)
      disabledMap.set(node.key, !!node.disabled) // 记录禁用状态

      // 收集所有后代节点
      const allDescendants: string[] = []
      const collectDescendants = (n: TreeNode) => {
        n.children?.forEach((child) => {
          allDescendants.push(child.key)
          collectDescendants(child)
        })
      }
      collectDescendants(node)
      allDescendantsMap.set(node.key, allDescendants)

      // 递归处理子节点
      node.children?.forEach(child => dfs(child, node.key))
    }

      ; (unref(tree) as TreeNode[]).forEach(root => dfs(root, null))
  }

  buildMaps()

  /**
   * 同步响应式状态
   */
  function flush() {
    selectedKeys.value = Array.from(selectedSet)
    indeterminateKeys.value = Array.from(indeterminateSet)
  }

  /**
   * 检查节点是否为叶子节点
   */
  function isLeafNode(key: string): boolean {
    const children = childrenMap.get(key) || []
    return children.length === 0
  }

  /**
   * 检查节点是否被禁用
   */
  function isNodeDisabled(key: string): boolean {
    return disabledMap.get(key) || false
  }

  /**
   * 更新单个节点的状态（不触发级联）
   * @param key 节点key
   */
  function updateNodeState(key: string) {
    const children = childrenMap.get(key) || []

    if (children.length === 0) {
      // 叶子节点：不会有半选状态
      indeterminateSet.delete(key)
      return
    }

    // 过滤出未禁用的子节点
    const enabledChildren = children.filter(child => !isNodeDisabled(child))

    if (enabledChildren.length === 0) {
      // 如果所有子节点都被禁用，当前节点也不能被选中
      selectedSet.delete(key)
      indeterminateSet.delete(key)
      return
    }

    const selectedChildren = enabledChildren.filter(child => selectedSet.has(child))
    const indeterminateChildren = enabledChildren.filter(child => indeterminateSet.has(child))

    if (selectedChildren.length === enabledChildren.length) {
      // 所有未禁用的子节点都选中 -> 当前节点选中
      selectedSet.add(key)
      indeterminateSet.delete(key)
    }
    else if (selectedChildren.length > 0 || indeterminateChildren.length > 0) {
      // 部分子节点选中或有半选子节点 -> 当前节点半选
      selectedSet.delete(key)
      indeterminateSet.add(key)
    }
    else {
      // 没有子节点选中 -> 当前节点未选中
      selectedSet.delete(key)
      indeterminateSet.delete(key)
    }
  }

  /**
   * 递归更新祖先链状态
   * @param key 起始节点
   */
  function updateAncestors(key: string) {
    let parent = parentMap.get(key)
    while (parent !== undefined && parent !== null) {
      updateNodeState(parent)
      parent = parentMap.get(parent)
    }
  }

  /**
   * 选中节点及其所有后代（跳过禁用的节点）
   * @param key 节点key
   */
  function selectNodeAndDescendants(key: string) {
    // 如果当前节点被禁用，则不进行任何操作
    if (isNodeDisabled(key)) {
      return
    }

    // 选中当前节点
    selectedSet.add(key)
    indeterminateSet.delete(key)

    // 选中所有未禁用的后代节点
    const descendants = allDescendantsMap.get(key) || []
    descendants.forEach((descendant) => {
      if (!isNodeDisabled(descendant)) {
        selectedSet.add(descendant)
        indeterminateSet.delete(descendant)
      }
    })
  }

  /**
   * 取消选中节点及其所有后代
   * @param key 节点key
   */
  function deselectNodeAndDescendants(key: string) {
    // 取消选中当前节点
    selectedSet.delete(key)
    indeterminateSet.delete(key)

    // 取消选中所有后代节点（包括禁用的节点，因为取消选择不受禁用状态限制）
    const descendants = allDescendantsMap.get(key) || []
    descendants.forEach((descendant) => {
      selectedSet.delete(descendant)
      indeterminateSet.delete(descendant)
    })
  }

  function init({ tree: _tree, keys }: { tree?: TreeNode[], keys: string[] }) {
    if ((_tree || []).length > 0) {
      tree.value = _tree as any
    }
    buildMaps()
    // 清理不存在的节点
    for (const key of selectedSet) {
      if (!parentMap.has(key) && !childrenMap.has(key)) {
        selectedSet.delete(key)
      }
    }
    for (const key of indeterminateSet) {
      if (!parentMap.has(key) && !childrenMap.has(key)) {
        indeterminateSet.delete(key)
      }
    }
    recompute()

    selectedSet.clear()
    indeterminateSet.clear()

    if (Array.isArray(keys)) {
      // 对每个传入的key执行完整的级联选择逻辑
      keys.forEach((key: string) => {
        if (parentMap.has(key) || childrenMap.has(key)) {
          // 如果节点被禁用，跳过
          if (isNodeDisabled(key)) {
            return
          }

          // 选中节点及其所有后代节点
          selectNodeAndDescendants(key)
        }
      })

      // 重新计算所有祖先节点的状态
      const processedAncestors = new Set<string>()
      keys.forEach((key) => {
        if (parentMap.has(key) || childrenMap.has(key)) {
          // 更新祖先链状态，避免重复处理
          let parent = parentMap.get(key)
          while (parent !== undefined && parent !== null && !processedAncestors.has(parent)) {
            updateNodeState(parent)
            processedAncestors.add(parent)
            parent = parentMap.get(parent)
          }
        }
      })
    }

    flush()
  }

  /**
   * 重新计算整个树的状态
   */
  function recompute() {
    // 清空半选状态
    indeterminateSet.clear()

    // 从叶子节点开始，自底向上更新状态
    const allKeys = Array.from(parentMap.keys())

    // 按层级排序，叶子节点优先
    const sortedKeys = allKeys.sort((a, b) => {
      const aChildren = childrenMap.get(a) || []
      const bChildren = childrenMap.get(b) || []
      return aChildren.length - bChildren.length
    })

    sortedKeys.forEach((key) => {
      updateNodeState(key)
    })

    flush()
  }

  /**
   * 添加选中节点
   * @param key 节点key
   */
  function addKey(key: string) {
    if (!parentMap.has(key) && !childrenMap.has(key)) {
      return
    }

    // 如果节点被禁用，不能选中
    if (isNodeDisabled(key)) {
      return
    }

    // 选中节点及其所有子孙节点
    selectNodeAndDescendants(key)

    // 更新祖先链状态
    updateAncestors(key)

    flush()
  }

  /**
   * 移除选中节点
   * @param key 节点key
   */
  function removeKey(key: string) {
    if (!selectedSet.has(key) && !indeterminateSet.has(key)) {
      return
    }

    // 取消选中节点及其所有子孙节点
    deselectNodeAndDescendants(key)

    // 更新祖先链状态
    updateAncestors(key)

    flush()
  }

  /**
   * 切换节点选中状态
   * @param key 节点key
   */
  function toggleKey(key: string) {
    // 如果节点被禁用，不能切换状态
    if (isNodeDisabled(key)) {
      return
    }

    if (selectedSet.has(key)) {
      removeKey(key)
    }
    else {
      addKey(key)
    }
  }

  /**
   * 检查节点是否选中（响应式）
   */
  const isSelected = computed(() => {
    return (key: string): boolean => {
      return selectedKeys.value.includes(key)
    }
  })

  /**
   * 检查节点是否半选（响应式）
   */
  const isIndeterminate = computed(() => {
    return (key: string): boolean => {
      return indeterminateKeys.value.includes(key)
    }
  })

  /**
   * 获取所有叶子节点中被选中的节点
   */
  function getSelectedLeafKeys(): string[] {
    return Array.from(selectedSet).filter(key => isLeafNode(key))
  }

  /**
   * 根据值数组查找对应的树节点
   * @param values 要查找的值数组
   * @returns 找到的节点信息数组，包含key、disabled和isLeaf状态
   */
  function findItemsByValues(values: string[]): Array<{ key: string, disabled?: boolean, isLeaf: boolean }> {
    const foundItems: Array<{ key: string, disabled?: boolean, isLeaf: boolean }> = []

    const findInTree = (nodes: TreeNode[], targetValues: string[]): void => {
      for (const node of nodes) {
        if (targetValues.includes(node.key)) {
          const item = {
            ...node,
            isLeaf: !node.children || node.children.length === 0,
          }
          delete item.children
          foundItems.push(item)
        }

        if (node.children && node.children.length > 0) {
          findInTree(node.children, targetValues)
        }
      }
    }

    findInTree(unref(tree) as TreeNode[], values)
    return foundItems
  }

  flush()

  return {
    selectedKeys,
    indeterminateKeys,
    init,
    addKey,
    removeKey,
    toggleKey,
    isSelected,
    isIndeterminate,
    isNodeDisabled,
    getSelectedLeafKeys,
    findItemsByValues,
  }
}
