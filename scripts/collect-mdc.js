import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

// 路径常量定义
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const OUTPUT_DIR = path.resolve(PROJECT_ROOT, 'mdc-rules')

// 需要排除的目录
const EXCLUDE_DIRS = [
  '.cursor',
  'node_modules',
  'dist',
  '.git',
  'mdc-rules', // 排除输出目录本身
]

/**
 * 递归获取所有 .mdc 文件
 * @param {string} dir - 当前目录
 * @param {string[]} mdcFiles - 收集的文件列表
 * @returns {string[]}
 */
function getAllMdcFiles(dir, mdcFiles = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      // 跳过排除的目录
      if (EXCLUDE_DIRS.includes(entry.name)) {
        continue
      }
      getAllMdcFiles(fullPath, mdcFiles)
    }
    else if (entry.isFile() && entry.name.endsWith('.mdc')) {
      mdcFiles.push(fullPath)
    }
  }

  return mdcFiles
}

/**
 * 收集并复制 .mdc 文件（平铺到第一层）
 */
function collectMdcFiles() {
  console.log('🔍 开始收集 .mdc 文件...')

  // 确保输出目录存在（先清空再创建）
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true })
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  // 获取所有 .mdc 文件
  const mdcFiles = getAllMdcFiles(PROJECT_ROOT)

  if (mdcFiles.length === 0) {
    console.log('⚠️ 未找到任何 .mdc 文件')
    return
  }

  console.log(`📦 找到 ${mdcFiles.length} 个 .mdc 文件`)

  // 直接复制文件到第一层
  for (const filePath of mdcFiles) {
    const relativePath = path.relative(PROJECT_ROOT, filePath)
    const fileName = path.basename(filePath)
    const targetPath = path.join(OUTPUT_DIR, fileName)

    // 复制文件
    fs.copyFileSync(filePath, targetPath)
    console.log(`  ✅ ${relativePath} -> ${fileName}`)
  }

  console.log(`\n✨ 已将 ${mdcFiles.length} 个 .mdc 文件收集到 ${path.relative(PROJECT_ROOT, OUTPUT_DIR)} 目录`)
}

// 执行
collectMdcFiles()
