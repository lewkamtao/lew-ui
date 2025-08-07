#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 组件优先级定义（从基础到高级）
const componentPriority = {
  // 基础组件
  'LewButton': 1,
  'LewTag': 2,
  'LewAvatar': 3,
  'LewImage': 4,
  'LewIcon': 5,
  'LewText': 6,
  'LewTitle': 7,
  'LewMark': 8,
  'LewBadge': 9,
  'LewEmpty': 10,
  'LewLoading': 11,
  'LewMagicNumber': 12,
  'LewTextTrim': 13,
  'LewSpace': 14,
  'LewFlex': 15,
  'LewDivider': 16,
  'LewBackTop': 17,
  'LewTooltip': 18,
  'LewPopover': 19,
  'LewPopok': 20,
  'LewModal': 21,
  'LewDialog': 22,
  'LewDrawer': 23,
  'LewNotification': 24,
  'LewMessage': 25,
  'LewAlert': 26,
  'LewActionBox': 27,
  'LewBreadcrumb': 28,
  'LewSteps': 29,
  'LewTabs': 30,
  'LewCollapse': 31,
  'LewMenu': 32,
  'LewMenuTree': 33,
  'LewContextMenu': 34,
  'LewHoverMenu': 35,
  'LewDropdown': 36,
  'LewTable': 37,
  'LewDesc': 38,
  'LewForm': 39,
  'LewInput': 40,
  'LewInputNumber': 41,
  'LewInputTag': 42,
  'LewInputTable': 43,
  'LewTextarea': 44,
  'LewSelect': 45,
  'LewSelectMultiple': 46,
  'LewCheckbox': 47,
  'LewRadio': 48,
  'LewSwitch': 49,
  'LewSlider': 50,
  'LewSliderRange': 51,
  'LewRate': 52,
  'LewColorPicker': 53,
  'LewDatePicker': 54,
  'LewDateRangePicker': 55,
  'LewCascader': 56,
  'LewTree': 57,
  'LewTreeSelect': 58,
  'LewUpload': 59,
  'LewPagination': 60,
}

// 类型优先级定义
const typePriority = {
  // 基础类型
  'LewButtonType': 1,
  'LewButtonSize': 2,
  'LewTagType': 3,
  'LewAvatarPlacement': 4,
  'LewAvatarStatus': 5,
  'LewAvatarShape': 6,
  'LewImageObjectFit': 7,
  'LewImageObjectPosition': 8,
  'LewInputType': 9,
  'LewInputPrefixesType': 10,
  'LewInputSuffixType': 11,
  'LewTextareaResize': 12,
  'LewTabsType': 13,
  'LewBreadcrumbSeparator': 14,
  'LewUploadStatus': 15,
  'LewFormItemAs': 16,
  'LewSelectMultipleValueLayout': 17,
  'LewStepsStatus': 18,
  // 选项类型
  'LewButtonOption': 100,
  'LewTagOption': 101,
  'LewAvatarOption': 102,
  'LewImageOption': 103,
  'LewIconOption': 104,
  'LewTextOption': 105,
  'LewTitleOption': 106,
  'LewMarkOption': 107,
  'LewBadgeOption': 108,
  'LewEmptyOption': 109,
  'LewLoadingOption': 110,
  'LewMagicNumberOption': 111,
  'LewTextTrimOption': 112,
  'LewSpaceOption': 113,
  'LewFlexOption': 114,
  'LewDividerOption': 115,
  'LewBackTopOption': 116,
  'LewTooltipOption': 117,
  'LewPopoverOption': 118,
  'LewPopokOption': 119,
  'LewModalOption': 120,
  'LewDialogOption': 121,
  'LewDrawerOption': 122,
  'LewNotificationOption': 123,
  'LewMessageOption': 124,
  'LewAlertOption': 125,
  'LewActionBoxOption': 126,
  'LewBreadcrumbOption': 127,
  'LewBreadcrumbOptions': 128,
  'LewStepsOption': 129,
  'LewTabsOption': 130,
  'LewCollapseOption': 131,
  'LewMenuOption': 132,
  'LewMenuTreeOption': 133,
  'LewContextMenusOption': 134,
  'LewHoverMenusOption': 135,
  'LewDropdownOption': 136,
  'LewTableColumn': 137,
  'LewDescOption': 138,
  'LewFormOption': 139,
  'LewInputOption': 140,
  'LewInputNumberOption': 141,
  'LewInputTagOption': 142,
  'LewInputTableColumn': 143,
  'LewTextareaOption': 144,
  'LewSelectOption': 145,
  'LewSelectMultipleOption': 146,
  'LewCheckboxOption': 147,
  'LewRadioOption': 148,
  'LewSwitchOption': 149,
  'LewSliderOption': 150,
  'LewSliderRangeOption': 151,
  'LewRateOption': 152,
  'LewColorPickerOption': 153,
  'LewDatePickerPresetsOption': 154,
  'LewDateRangePickerOption': 155,
  'LewCascaderOption': 156,
  'LewTreeDataSource': 157,
  'LewTreeSelectOption': 158,
  'LewUploadFileItem': 159,
  'LewPaginationOption': 160,
  // 搜索参数类型
  'LewSelectSearchMethodParams': 200,
  'LewSelectSearchMultipleMethodParams': 201,
  'LewTreeSelectSearchMethodParams': 202,
}

// 获取类型优先级
function getTypePriority(typeName) {
  // 移除 Lew 前缀来匹配
  const cleanName = typeName.replace(/^Lew/, '')
  
  // 检查是否在类型优先级中
  for (const [key, priority] of Object.entries(typePriority)) {
    if (key.includes(cleanName) || cleanName.includes(key.replace(/^Lew/, ''))) {
      return priority
    }
  }
  
  // 检查是否在组件优先级中
  for (const [key, priority] of Object.entries(componentPriority)) {
    if (key.includes(cleanName) || cleanName.includes(key.replace(/^Lew/, ''))) {
      return priority + 50 // 给组件类型稍高的优先级
    }
  }
  
  return 999 // 默认优先级
}

// 检查是否是多行类型定义的开始
function isMultiLineTypeStart(line) {
  return line.includes('export type ') && (line.includes('=') || line.includes('|'))
}

// 检查是否是类型定义的结束
function isTypeDefinitionEnd(line, braceCount, parenCount, bracketCount) {
  // 如果所有括号都闭合了，说明类型定义结束
  return braceCount <= 0 && parenCount <= 0 && bracketCount <= 0 && 
         !line.includes('|') && !line.includes('=') && 
         !line.includes('export type ') && !line.includes('export interface ')
}

// 解析 TypeScript 文件内容
function parseTypeScriptContent(content) {
  const lines = content.split('\n')
  const imports = []
  const typeDefinitions = []
  
  let currentType = null
  let braceCount = 0
  let parenCount = 0
  let bracketCount = 0
  let inTypeDefinition = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // 收集导入语句
    if (trimmedLine.startsWith('import ')) {
      imports.push(lines[i])
      continue
    }
    
    // 检测类型定义开始
    if (trimmedLine.startsWith('export type ') || trimmedLine.startsWith('export interface ')) {
      if (currentType) {
        typeDefinitions.push(currentType)
      }
      
      const nameMatch = trimmedLine.match(/export (type|interface) (Lew\w+)/)
      if (nameMatch) {
        const typeName = nameMatch[2]
        currentType = {
          name: typeName,
          content: [lines[i]],
          priority: getTypePriority(typeName)
        }
        inTypeDefinition = true
        
        // 重置计数器
        braceCount = 0
        parenCount = 0
        bracketCount = 0
        
        // 计算当前行的括号
        const openBraces = (lines[i].match(/\{/g) || []).length
        const closeBraces = (lines[i].match(/\}/g) || []).length
        braceCount += openBraces - closeBraces
        
        const openParens = (lines[i].match(/\(/g) || []).length
        const closeParens = (lines[i].match(/\)/g) || []).length
        parenCount += openParens - closeParens
        
        const openBrackets = (lines[i].match(/\[/g) || []).length
        const closeBrackets = (lines[i].match(/\]/g) || []).length
        bracketCount += openBrackets - closeBrackets
        
        // 检查是否是单行类型定义
        if (braceCount <= 0 && parenCount <= 0 && bracketCount <= 0 && 
            !isMultiLineTypeStart(lines[i])) {
          typeDefinitions.push(currentType)
          currentType = null
          inTypeDefinition = false
        }
      }
    } else if (inTypeDefinition && currentType) {
      currentType.content.push(lines[i])
      
      // 计算当前行的括号
      const openBraces = (lines[i].match(/\{/g) || []).length
      const closeBraces = (lines[i].match(/\}/g) || []).length
      braceCount += openBraces - closeBraces
      
      const openParens = (lines[i].match(/\(/g) || []).length
      const closeParens = (lines[i].match(/\)/g) || []).length
      parenCount += openParens - closeParens
      
      const openBrackets = (lines[i].match(/\[/g) || []).length
      const closeBrackets = (lines[i].match(/\]/g) || []).length
      bracketCount += openBrackets - closeBrackets
      
      // 检查类型定义是否结束
      if (isTypeDefinitionEnd(lines[i], braceCount, parenCount, bracketCount)) {
        typeDefinitions.push(currentType)
        currentType = null
        inTypeDefinition = false
      }
    }
  }
  
  // 添加最后一个类型定义
  if (currentType) {
    typeDefinitions.push(currentType)
  }
  
  return { imports, typeDefinitions }
}

// 重新生成文件内容
function regenerateContent(imports, typeDefinitions) {
  // 按优先级排序
  typeDefinitions.sort((a, b) => a.priority - b.priority)
  
  const lines = []
  
  // 添加导入语句
  lines.push(...imports)
  lines.push('') // 空行分隔
  
  // 添加排序后的类型定义
  typeDefinitions.forEach((typeDef, index) => {
    lines.push(...typeDef.content)
    if (index < typeDefinitions.length - 1) {
      lines.push('') // 类型定义之间添加空行
    }
  })
  
  return lines.join('\n')
}

// 主函数
function main() {
  const filePath = path.join(__dirname, 'components.ts')
  
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // 解析内容
    const { imports, typeDefinitions } = parseTypeScriptContent(content)
    
    // 重新生成内容
    const newContent = regenerateContent(imports, typeDefinitions)
    
    // 写回文件
    fs.writeFileSync(filePath, newContent, 'utf-8')
    
    console.log('✅ 类型定义排序完成！')
    console.log(`📊 共处理了 ${typeDefinitions.length} 个类型定义`)
    
    // 显示排序结果
    console.log('\n📋 排序后的类型定义顺序：')
    typeDefinitions
      .sort((a, b) => a.priority - b.priority)
      .forEach((typeDef, index) => {
        console.log(`${index + 1}. ${typeDef.name} (优先级: ${typeDef.priority})`)
      })
      
  } catch (error) {
    console.error('❌ 处理文件时出错：', error)
    process.exit(1)
  }
}

// 运行脚本
main() 
