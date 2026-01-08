import type { LewTreeDataSource } from 'lew-ui'
import { has } from 'lodash-es'

/**
 * 查找树中所有节点的值
 * @param tree 树数据
 * @param keyField 键字段名
 * @returns 所有节点值的数组（字符串类型）
 */
function findAllNodes(tree: LewTreeDataSource[] = [], keyField = 'key') {
  // 使用Set避免重复值
  const nodes = new Set()

  // 使用递归方式遍历树
  const traverse = (node: any) => {
    // 确保 key 是字符串类型
    nodes.add(String(node[keyField]))
    if (node.children?.length > 0) {
      node.children.forEach((child: any) => traverse(child))
    }
  }

  // 遍历每个根节点
  tree.forEach(node => traverse(node))

  return Array.from(nodes)
}

/**
 * 查找树中所有叶子节点的值
 * @param tree 树数据
 * @param keyField 键字段名
 * @returns 所有叶子节点值的数组（字符串类型）
 */
function findLeafNodes(tree: LewTreeDataSource[] = [], keyField = 'key') {
  const leafNodes = new Set()

  const traverse = (node: any) => {
    if (!node.children?.length) {
      // 确保 key 是字符串类型
      leafNodes.add(String(node[keyField]))
    }
    else {
      node.children.forEach((child: any) => traverse(child))
    }
  }

  tree.forEach(node => traverse(node))

  return Array.from(leafNodes)
}

export function formatTree({
  dataSource,
  parent = null,
  parentKeyPaths = [],
  parentLabelPaths = [],
  keyField = 'key',
  labelField = 'label',
  free = false,
}: {
  dataSource: LewTreeDataSource[]
  parent?: any
  parentKeyPaths?: string[]
  parentLabelPaths?: string[]
  keyField?: string
  labelField?: string
  free?: boolean
}): LewTreeDataSource[] {
  return dataSource.map((node: LewTreeDataSource, index: number) => {
    const { children, ...rest }: any = node
    // 确保 key 始终是字符串类型
    const key = String(rest[keyField])
    const label = rest[labelField]

    // 优化：使用扩展运算符创建新数组，避免修改原数组
    const keyPaths = [...parentKeyPaths, key]
    const labelPaths = [...parentLabelPaths, label]

    // 使用可选链简化判断
    const isLeaf = has(rest, 'isLeaf') ? rest.isLeaf : !children?.length

    // 创建当前节点对象
    const currentNode = {
      ...rest,
      key,
      label,
      keyPaths,
      labelPaths,
      isLeaf,
      parentKey: parent?.[keyField] ? String(parent[keyField]) : null,
      level: parentKeyPaths.length,
      parentKeyPaths,
      parentLabelPaths,
      treeIndex: index,
    }

    // 仅在需要时计算叶子节点值，避免不必要的计算
    if (!free && children?.length > 0) {
      // 性能优化：可以考虑使用记忆化来缓存计算结果
      currentNode.leafNodeValues = findLeafNodes(children, keyField)
      currentNode.allNodeValues = findAllNodes(children, keyField)
    }
    else if (!free) {
      currentNode.leafNodeValues = []
      currentNode.allNodeValues = []
    }

    // 递归处理子节点
    return {
      ...currentNode,
      children:
        children?.length > 0
          ? formatTree({
              dataSource: children,
              parent: currentNode,
              parentKeyPaths: keyPaths,
              parentLabelPaths: labelPaths,
              keyField,
              labelField,
              free,
            })
          : [],
    }
  })
}

async function transformTree({
  initMethod = null,
  dataSource = [],
  keyField = 'key',
  labelField = 'label',
  free = false,
  keyword = '',
}: {
  initMethod?: any
  dataSource?: LewTreeDataSource[]
  keyField?: string
  labelField?: string
  free?: boolean
  keyword?: string
}) {
  let tree: LewTreeDataSource[] = []
  const status = 'success'

  try {
    // 处理初始化树或使用提供的数据源
    if (initMethod) {
      try {
        const _tree: LewTreeDataSource[] = await initMethod()
        if (Array.isArray(_tree)) {
          tree = formatTree({
            dataSource: _tree,
            parentKeyPaths: [],
            parentLabelPaths: [],
            keyField,
            labelField,
            free,
          })
        }
        else {
          return {
            status: 'error',
            result: [],
            error: new Error(
              'The initMethod function should return a Promise that resolves to an array',
            ),
          }
        }
      }
      catch (error) {
        return {
          status: 'error',
          result: [],
          error: error instanceof Error ? error : new Error(String(error)),
        }
      }
    }
    else if (dataSource?.length > 0) {
      tree = formatTree({
        dataSource,
        parentKeyPaths: [],
        parentLabelPaths: [],
        keyField,
        labelField,
        free,
      })
    }

    // 关键词过滤
    if (keyword) {
      const _tree: LewTreeDataSource[] = []

      // 优化：使用更高效的过滤算法
      const filterTree = (nodes: LewTreeDataSource[]) => {
        nodes.forEach((node) => {
          const { labelPaths, children } = node

          // 检查当前节点是否匹配关键词
          if (
            labelPaths?.some((label: string) =>
              String(label).toLowerCase().includes(keyword.toLowerCase()),
            )
          ) {
            _tree.push(node)
          }
          else if (children && children.length > 0) {
            filterTree(children)
          }
        })
      }

      filterTree(tree)

      // 重新格式化过滤后的树
      if (_tree.length > 0) {
        tree = formatTree({
          dataSource: _tree,
          parentKeyPaths: [],
          parentLabelPaths: [],
          keyField,
          labelField,
          free,
        })
      }
      else {
        tree = []
      }
    }

    return { status, result: tree }
  }
  catch (error) {
    return {
      status: 'error',
      result: [],
      error: error instanceof Error ? error : new Error(String(error)),
    }
  }
}

export default transformTree
