import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Project } from 'ts-morph'

// 维护性常量定义
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TS_CONFIG_PATH = path.resolve(__dirname, './tsconfig.json')
const TYPES_DIR_PATH = path.resolve(__dirname, './lib/types')
const OUTPUT_PATH = path.resolve(__dirname, './docs/assets/all-types.ts')

// 获取 types 目录下所有 .ts 文件（不包括 .d.ts）
function getAllTypeFiles(dir) {
  const files = fs.readdirSync(dir)
  const tsFiles = []
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      tsFiles.push(...getAllTypeFiles(fullPath))
    }
    else if (
      file.endsWith('.ts')
      && !file.endsWith('.d.ts')
    ) {
      tsFiles.push(fullPath)
    }
  }
  return tsFiles
}

async function extractAllTypes() {
  // 1. 初始化 ts-morph 项目
  const project = new Project({
    tsConfigFilePath: TS_CONFIG_PATH,
    skipAddingFilesFromTsConfig: false,
  })

  // 2. 加载 types 目录下所有 ts 文件
  const typeFiles = getAllTypeFiles(TYPES_DIR_PATH)
  const sourceFiles = typeFiles.map(file => project.addSourceFileAtPath(file))

  // 3. 存储所有类型的容器
  const allTypes = {}

  // 4. 遍历所有 sourceFile，提取类型别名、接口、枚举
  for (const sourceFile of sourceFiles) {
    // 类型别名
    sourceFile.getTypeAliases().forEach((alias) => {
      const typeName = alias.getName()
      const typeCode = alias.getText()
      allTypes[typeName] = typeCode
    })
    // 接口
    sourceFile.getInterfaces().forEach((iface) => {
      const ifaceName = iface.getName()
      const ifaceCode = iface.getText()
      allTypes[ifaceName] = ifaceCode
    })
    // 枚举
    sourceFile.getEnums().forEach((enumDecl) => {
      const enumName = enumDecl.getName()
      const enumCode = enumDecl.getText()
      allTypes[enumName] = enumCode
    })
    // 可扩展：类型字面量等
  }

  // 5. 生成 TS 文件内容
  const lines = [
    '// 此文件由 extract-types.js 自动生成，请勿手动修改',
    '',
    'export default {',
    ...Object.entries(allTypes).map(([key, value]) => {
      // value 需要做字符串转义
      const escaped = value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/\r?\n/g, '\\n')
      return `  "${key}": \`${escaped}\`,`
    }),
    '}',
    '',
  ]
  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'), 'utf-8')
  console.log(`已提取 ${Object.keys(allTypes).length} 个类型，保存至 ${OUTPUT_PATH}`)
}

extractAllTypes().catch(err => console.error('提取失败：', err))
