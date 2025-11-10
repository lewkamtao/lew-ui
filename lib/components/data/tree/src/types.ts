// Tree 组件的类型定义
import type { LewTreeDataSource } from 'lew-ui/types'
import type { InjectionKey, Ref } from 'vue'

/**
 * Tree 组件通过 provide/inject 传递的上下文类型
 */
export interface TreeContext {
  // 只读属性
  readonly multiple: boolean
  readonly checkable: boolean
  readonly expandAll: boolean
  readonly free: boolean
  readonly showLine: boolean
  readonly onlyLeafSelectable: boolean
  readonly keyField: string
  readonly labelField: string

  // 可变状态的 getter/setter
  modelValue: Ref<string | string[] | undefined>
  expandKeys: Ref<string[]>
  dataSource: Ref<LewTreeDataSource[]>
  cacheDataSource: Ref<LewTreeDataSource[]>

  // 方法
  loadMethod?: (item: LewTreeDataSource) => void | Promise<LewTreeDataSource[]>

  // Tree Selection Hook 方法
  treeSelection?: {
    isSelected: (key: string) => boolean
    isIndeterminate: (key: string) => boolean
    toggleKey: (key: string) => void
    addKey: (key: string) => void
    removeKey: (key: string) => void
  }
}

/**
 * Tree 组件的 Symbol Key，用于类型安全的 inject
 */
export const TREE_INJECTION_KEY: InjectionKey<TreeContext> = Symbol('lew-tree')
