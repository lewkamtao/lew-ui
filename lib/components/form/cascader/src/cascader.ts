import type { LewCascaderOption } from 'lew-ui/types'

export class CascaderNodeCache {
  private nodeCache = new Map<string, LewCascaderOption>()

  get(value: string): LewCascaderOption | undefined {
    return this.nodeCache.get(value)
  }

  set(value: string, node: LewCascaderOption): void {
    this.nodeCache.set(value, node)
  }

  has(value: string): boolean {
    return this.nodeCache.has(value)
  }

  clear(): void {
    this.nodeCache.clear()
  }
}

export function formatTree(
  tree: LewCascaderOption[],
  parentValuePaths: string[] = [],
  parentLabelPaths: string[] = [],
): LewCascaderOption[] {
  return tree.map((node: LewCascaderOption) => {
    const { value, label, children = [] } = node
    const valuePaths: string[] = [...parentValuePaths, value]
    const labelPaths: string[] = [...parentLabelPaths, label]
    const level = valuePaths.length - 1

    const formattedNode: LewCascaderOption = {
      ...node,
      valuePaths,
      labelPaths,
      level,
      parentValuePaths,
      parentLabelPaths,
      isLeaf: !children.length,
    }

    if (children.length > 0) {
      formattedNode.children = formatTree(children, valuePaths, labelPaths)
    }

    return formattedNode
  })
}

export function findObjectByValue(
  treeList: LewCascaderOption[],
  value: string,
  cache?: CascaderNodeCache,
): LewCascaderOption | null {
  if (cache?.has(value)) {
    return cache.get(value) || null
  }

  const stack: LewCascaderOption[] = [...treeList]

  while (stack.length > 0) {
    const node = stack.pop()!

    if (node.value === value) {
      cache?.set(value, node)
      return node
    }

    if (node.children?.length) {
      stack.push(...node.children)
    }
  }

  return null
}

export function findAndAddChildrenByValue(
  tree: LewCascaderOption[],
  value: string,
  children: LewCascaderOption[],
  cache?: CascaderNodeCache,
): LewCascaderOption[] {
  // Work directly on the original tree (like the original implementation)
  const stack: {
    node: LewCascaderOption
    parent?: LewCascaderOption
  }[] = tree.map(node => ({ node }))

  while (stack.length > 0) {
    const { node } = stack.pop()!

    if (node.value === value) {
      node.children = children
      cache?.set(value, node)
      return tree
    }

    if (node.children?.length) {
      stack.push(...node.children.map(child => ({ node: child, parent: node })))
    }
  }

  return tree
}

export function findChildrenByValue(
  tree: LewCascaderOption[],
  value: string,
  cache?: CascaderNodeCache,
): LewCascaderOption[] {
  const cachedNode = cache?.get(value)
  if (cachedNode) {
    return cachedNode.children || []
  }

  const stack: LewCascaderOption[] = [...tree]

  while (stack.length > 0) {
    const node = stack.pop()!

    if (node.value === value) {
      cache?.set(value, node)
      return node.children || []
    }

    if (node.children?.length) {
      stack.push(...node.children)
    }
  }

  return []
}

export function createCascaderCache(): CascaderNodeCache {
  return new CascaderNodeCache()
}

export function validateCascaderTree(tree: LewCascaderOption[]): boolean {
  if (!Array.isArray(tree)) {
    return false
  }

  const stack: LewCascaderOption[] = [...tree]

  while (stack.length > 0) {
    const node = stack.pop()!

    if (!node.value || !node.label) {
      return false
    }

    if (node.children) {
      if (!Array.isArray(node.children)) {
        return false
      }
      stack.push(...node.children)
    }
  }

  return true
}

// 根据指定 value，查找其所有子节点（包括子孙节点），返回一个扁平数组
export function findAllChildrenByValue(
  tree: LewCascaderOption[],
  value: string,
): LewCascaderOption[] {
  // 首先找到目标节点
  let targetNode: LewCascaderOption | null = null
  const stack: LewCascaderOption[] = [...tree]

  while (stack.length > 0) {
    const node = stack.pop()!
    if (node.value === value) {
      targetNode = node
      break
    }
    if (node.children?.length) {
      stack.push(...node.children)
    }
  }

  if (!targetNode || !targetNode.children) {
    return []
  }

  // 扁平化所有子孙节点
  const result: LewCascaderOption[] = []
  const childrenStack: LewCascaderOption[] = [...targetNode.children]

  while (childrenStack.length > 0) {
    const child = childrenStack.pop()!
    result.push(child)
    if (child.children?.length) {
      childrenStack.push(...child.children)
    }
  }

  return result
}
