# 开发工具脚本

本目录包含用于 lew-ui 项目开发和维护的 Node.js 工具脚本。

## 📁 目录结构

```
scripts/
├── README.md              # 本文档
├── extract-types.js       # TypeScript 类型提取工具
└── sort-components.js     # 类型定义排序工具
```

---

## 🔧 工具脚本说明

### 1. `extract-types.js` - TypeScript 类型提取工具

#### 📝 功能说明

自动从 `lib/types/` 目录下的所有 TypeScript 文件中提取类型定义（类型别名、接口、枚举），并生成统一的类型文档文件 `docs/assets/all-types.ts`，供在线文档系统使用。

#### 🎯 使用场景

- **在线文档生成**：为文档系统提供类型定义的字符串表示，用于在文档中展示类型信息
- **类型预览**：用户在查看组件 API 时，可以直接看到类型定义的完整代码
- **自动化维护**：无需手动维护类型文档，确保文档与代码同步

#### 🔍 工作原理

1. **扫描类型文件**：递归遍历 `lib/types/` 目录，找到所有 `.ts` 文件（排除 `.d.ts`）
2. **使用 ts-morph 解析**：利用 TypeScript 编译器 API 解析 AST，提取类型信息
3. **提取类型定义**：
   - 类型别名（`type`）
   - 接口（`interface`）
   - 枚举（`enum`）
4. **生成文档文件**：将所有类型转换为字符串键值对，输出到 `docs/assets/all-types.ts`

#### 📂 输入输出

- **输入**：`lib/types/**/*.ts`（所有组件类型定义文件）
- **输出**：`docs/assets/all-types.ts`（统一的类型文档对象）
- **配置**：`tsconfig.json`（TypeScript 配置）

#### 🚀 使用方法

```bash
# 运行脚本
node scripts/extract-types.js

# 或在 package.json 中添加 script
npm run extract-types
```

#### 📋 输出示例

```typescript
// docs/assets/all-types.ts
// 此文件由 extract-types.js 自动生成，请勿手动修改

export default {
  "LewButtonType": `export type LewButtonType = 'fill' | 'light' | 'ghost' | 'text'`,
  "LewButtonSize": `export type LewButtonSize = 'mini' | 'small' | 'medium' | 'large'`,
  "LewButtonProps": `export interface LewButtonProps {\n  type?: LewButtonType\n  size?: LewButtonSize\n  // ...\n}`,
  // ... 更多类型
}
```

#### ⚠️ 注意事项

- 输出文件 `docs/assets/all-types.ts` 是自动生成的，**请勿手动修改**
- 每次修改 `lib/types/` 下的类型定义后，应运行此脚本更新文档
- 确保 TypeScript 配置正确，以便 ts-morph 能正确解析类型

---

### 2. `sort-components.js` - 类型定义排序工具

#### 📝 功能说明

自动按照预定义的优先级规则，对 `lib/types/components.ts` 文件中的类型定义进行排序，确保类型按照**从基础到高级、从简单到复杂**的逻辑顺序排列。

#### 🎯 使用场景

- **代码组织**：保持类型定义的有序性，提高代码可读性
- **依赖管理**：基础类型在前，组合类型在后，符合阅读和理解的自然顺序
- **自动化维护**：避免手动排序的繁琐和错误

#### 🔍 工作原理

1. **定义优先级规则**：
   - **组件优先级**（1-72）：基础组件（Button、Avatar）→ 表单组件（Input、Select）→ 数据展示（Table、Tree）
   - **类型优先级**（1-202）：
     - 基础类型（1-18）：如 `LewButtonType`、`LewButtonSize`
     - 选项类型（100-160）：如 `LewButtonOption`、`LewSelectOption`
     - 参数类型（200+）：如 `LewSelectSearchMethodParams`

2. **解析文件内容**：
   - 保留 `import` 语句
   - 识别 `export type` 和 `export interface` 定义
   - 处理多行类型定义（带括号、联合类型等）

3. **智能匹配优先级**：
   - 根据类型名称（如 `LewButton`）匹配预定义优先级
   - 自动处理组件相关类型（优先级 = 组件优先级 + 50）
   - 未匹配的类型默认优先级 999（排在最后）

4. **重新生成文件**：
   - 按优先级排序所有类型
   - 保持原有格式和空行
   - 写回到 `lib/types/components.ts`

#### 📂 输入输出

- **输入**：`lib/types/components.ts`（包含所有导出的组件类型）
- **输出**：`lib/types/components.ts`（同一文件，类型已排序）

#### 🚀 使用方法

```bash
# 运行脚本
node scripts/sort-components.js

# 或在 package.json 中添加 script
npm run sort-types
```

#### 📊 执行输出示例

```bash
✅ 类型定义排序完成！
📊 共处理了 68 个类型定义

📋 排序后的类型定义顺序：
1. LewButtonType (优先级: 1)
2. LewButtonSize (优先级: 2)
3. LewTagType (优先级: 3)
4. LewAvatarPlacement (优先级: 4)
...
68. LewTreeSelectSearchMethodParams (优先级: 202)
```

#### 🎨 优先级规则

```javascript
// 基础组件类型（优先级 1-18）
LewButtonType: 1
LewButtonSize: 2
LewAvatarShape: 6

// 选项/配置类型（优先级 100-160）
LewButtonOption: 100
LewSelectOption: 145
LewTableColumn: 137

// 方法参数类型（优先级 200+）
LewSelectSearchMethodParams: 200
```

#### ⚠️ 注意事项

- 脚本会**直接修改** `lib/types/components.ts` 文件，建议提交前先备份
- 新增组件时，需要在脚本的 `componentPriority` 或 `typePriority` 中添加优先级定义
- 优先级数字越小，排序越靠前
- 建议在提交前运行此脚本，确保类型顺序一致

---

## 🔄 开发工作流

### 添加新组件时

1. **创建组件类型文件**：`lib/types/your-component.ts`
2. **运行类型提取**：`node scripts/extract-types.js`
3. **更新组件类型文件**：在 `lib/types/components.ts` 中导出类型
4. **更新排序规则**：在 `scripts/sort-components.js` 中添加新组件的优先级
5. **运行类型排序**：`node scripts/sort-components.js`
6. **验证结果**：检查 `docs/assets/all-types.ts` 和 `lib/types/components.ts`

### 修改现有类型时

1. **修改类型文件**：在 `lib/types/` 中修改相应类型
2. **运行类型提取**：`node scripts/extract-types.js`
3. **验证文档**：在文档系统中确认类型显示正确

---

## 🛠️ 依赖说明

### `extract-types.js` 依赖

- **ts-morph**：TypeScript 编译器 API 封装，用于解析 AST
- **Node.js 内置模块**：`fs`、`path`、`url`

### `sort-components.js` 依赖

- **Node.js 内置模块**：`fs`、`path`、`url`
- 无外部依赖，纯 Node.js 实现

---

## 📚 技术细节

### 类型提取的字符串转义

为了将类型定义嵌入 JavaScript 对象中，需要进行字符串转义：

```javascript
const escaped = value
  .replace(/\\/g, '\\\\')    // 转义反斜杠
  .replace(/`/g, '\\`')      // 转义模板字符串
  .replace(/\$/g, '\\$')     // 转义变量插值
  .replace(/\r?\n/g, '\\n')  // 转义换行符
```

### 括号匹配算法

`sort-components.js` 使用括号计数器来判断多行类型定义的结束：

```javascript
braceCount   // 大括号 { }
parenCount   // 小括号 ( )
bracketCount // 方括号 [ ]

// 当所有计数器归零时，类型定义结束
```

---

## 🤖 与 AI 开发的关系

这两个脚本是 lew-ui 组件库**自动化文档系统**的核心工具：

1. **类型提取** → 为在线文档提供类型预览功能
2. **类型排序** → 确保代码的可维护性和一致性

在 `.cursor/rules/docs-test.mdc` 中，定义了文档系统的规范，这些脚本是规范落地的技术实现。

---

## 📖 相关文档

- `.cursor/rules/component-structure.mdc` - 组件结构规范
- `.cursor/rules/typescript.mdc` - TypeScript 类型设计规范
- `.cursor/rules/docs-test.mdc` - 文档与测试规范
- `docs/layout/LewDocsTables.vue` - 文档表格组件（使用 `all-types.ts`）

---

## 🔗 快速链接

| 脚本 | 输入 | 输出 | 运行命令 |
|------|------|------|----------|
| `extract-types.js` | `lib/types/**/*.ts` | `docs/assets/all-types.ts` | `node scripts/extract-types.js` |
| `sort-components.js` | `lib/types/components.ts` | `lib/types/components.ts` | `node scripts/sort-components.js` |

---

## 💡 贡献指南

如果需要修改或扩展这些脚本：

1. **保持向后兼容**：确保现有功能不受影响
2. **更新文档**：修改后同步更新本 README
3. **添加注释**：复杂逻辑应有充分的代码注释
4. **测试验证**：运行脚本后检查生成的文件是否正确

---

**最后更新**：2025-12-20  
**维护者**：lew-ui 开发团队

