#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function bumpVersion() {
  try {
    // 读取 package.json
    const packagePath = join(__dirname, 'package.json')
    const packageContent = readFileSync(packagePath, 'utf8')
    const packageJson = JSON.parse(packageContent)

    // 获取当前版本号
    const currentVersion = packageJson.version
    console.log(`当前版本: ${currentVersion}`)

    // 分割版本号
    const versionParts = currentVersion.split('.')
    if (versionParts.length !== 3) {
      throw new Error('版本号格式不正确，应为 x.y.z 格式')
    }

    // 增加小版本号
    const major = Number.parseInt(versionParts[0])
    const minor = Number.parseInt(versionParts[1])
    const patch = Number.parseInt(versionParts[2]) + 1

    const newVersion = `${major}.${minor}.${patch}`
    console.log(`新版本: ${newVersion}`)

    // 更新版本号
    packageJson.version = newVersion

    // 写回文件
    writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)

    console.log(`✅ 版本号已更新: ${currentVersion} → ${newVersion}`)

    return newVersion
  }
  catch (error) {
    console.error('❌ 更新版本号失败:', error.message)
    process.exit(1)
  }
}

bumpVersion()
