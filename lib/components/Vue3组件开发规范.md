# Vue3组件开发规范

## 目录结构规范

### 标准组件目录结构

```
component-name/
├── index.ts              # 组件导出文件
├── src/
│   ├── index.vue         # 主组件文件
│   ├── props.ts          # 属性定义
│   ├── emits.ts          # 事件定义
│   ├── model.ts          # 模型定义（不需要validator）
```

## 文件导出规范

### index.ts 导出规范

```typescript
// 导出所有事件定义
export * from './src/emits'
// 导出主组件
export { default as LewSelect } from './src/LewSelect.vue'
// 导出所有属性定义
export * from './src/props'
```

## Emits 定义规范

### 基础结构

```typescript
export const selectEmits = {
  // 值变化事件
  change: (value?: string | number | undefined) => value,

  // 基础事件
  blur: () => true,
  clear: () => true,
  focus: () => true,
} as const

export type LewSelectEmits = typeof selectEmits
```

### Emits 规范要点

1. **事件命名**：使用 `kebab-case` 命名事件（用引号包裹）
2. **参数类型**：为事件参数提供明确的类型定义
3. **返回值**：使用 `true` 或具体类型作为返回值
4. **类型导出**：导出事件类型供外部使用
5. **独立引入**：在组件中独立引入emits定义
6. **变量定义的顺序、ref等等的顺序** 遵循高可用维护的规范去完善这些定义的顺序
7. **不需要添加任何注释** 务必清除所有注释

## 组件文件结构规范

### 代码组织规范

**模板逻辑优化**：

- 复杂的 `v-if`、`v-show`、`class`、`style` 判断逻辑
- 需要在 `script` 中创建计算属性独立维护
- 避免在模板中写复杂的表达式

## 核心规范要点

### 1. 独立引入原则

```typescript
// 必须独立引入 props 和 emits
import { selectEmits } from './emits'
import { selectProps } from './props'

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
```

### 2. 模板逻辑优化原则

- 在template中的 `v-if`、`v-show`、`class`、`style` 等涉及判断的
- 如果判断过于复杂需要在script中创建一个计算属性去独立维护
- 避免在模板中写复杂的表达式

### 4. 计算属性优化示例

```typescript
// ❌ 错误：在模板中写复杂逻辑
<template>
  <div :class="{
    'active': isActive && !isDisabled && user.hasPermission,
    'disabled': isDisabled || !user.hasPermission
  }">
    {{ user.name || 'Unknown User' }}
  </div>
</template>

// ✅ 正确：使用计算属性
<template>
  <div :class="computedClass">
    {{ displayName }}
  </div>
</template>

<script setup>
const computedClass = computed(() => ({
  'active': isActive.value && !isDisabled.value && user.value.hasPermission,
  'disabled': isDisabled.value || !user.value.hasPermission
}))

const displayName = computed(() => user.value.name || 'Unknown User')
</script>
```

## 最佳实践总结

### 开发流程

1. **创建目录结构**：按照标准目录结构创建组件文件
2. **编写Props**：在 `props.ts` 中定义组件属性
3. **编写Emits**：在 `emits.ts` 中定义组件事件
4. **实现组件**：在 `index.vue` 中实现组件逻辑

### 代码质量保证

- **类型安全**：使用TypeScript确保类型安全
- **代码复用**：提取公共逻辑到工具函数
- **性能优化**：合理使用计算属性和缓存
- **可维护性**：清晰的代码结构和注释
- **可测试性**：组件逻辑可独立测试
- **单一职责**：每个函数只负责一个功能
- **错误处理**：合理处理边界情况和错误

## 总结

本规范基于 `LewSelect` 组件的实际实现，涵盖了Vue3组件开发的各个方面：

1. **目录结构**：标准化的文件组织方式
2. **Props定义**：类型安全、验证完善的属性定义，独立引入
3. **Emits定义**：清晰的事件定义和类型导出，独立引入
4. **组件结构**：规范的Script Setup组织方式
5. **模板结构**：清晰的模板组织和插槽使用，逻辑优化
6. **类型定义**：完善的TypeScript类型支持
7. **工具函数**：可复用的工具函数设计

**不需要添加任何注释** 务必清除所有注释
