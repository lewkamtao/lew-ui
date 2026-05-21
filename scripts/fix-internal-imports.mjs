import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const libDir = path.resolve(__dirname, '../lib')

const symbolPaths = {
  locale: 'lew-ui/locals',
  getLocale: 'lew-ui/locals',
  LewButton: 'lew-ui/components/general/button',
  LewFlex: 'lew-ui/components/general/flex',
  LewTextTrim: 'lew-ui/components/general/text-trim',
  LewImage: 'lew-ui/components/general/image',
  LewTag: 'lew-ui/components/general/tag',
  LewBadge: 'lew-ui/components/general/badge',
  LewAvatar: 'lew-ui/components/general/avatar',
  LewCheckbox: 'lew-ui/components/form/checkbox',
  LewCheckboxGroup: 'lew-ui/components/form/checkbox',
  LewPopover: 'lew-ui/components/feedback/popover',
  LewPopok: 'lew-ui/components/feedback/popok',
  LewModal: 'lew-ui/components/feedback/modal',
  LewDrawer: 'lew-ui/components/feedback/drawer',
  LewTooltip: 'lew-ui/directives/tooltip',
  LewLoading: 'lew-ui/directives/loading',
  LewMessage: 'lew-ui/methods/message',
  LewCollapseTransition: 'lew-ui/components/data/collapse',
  LewCollapse: 'lew-ui/components/data/collapse',
  LewSelect: 'lew-ui/components/form/select',
  LewInput: 'lew-ui/components/form/input',
  LewInputTag: 'lew-ui/components/form/input-tag',
  LewInputNumber: 'lew-ui/components/form/input-number',
  LewTree: 'lew-ui/components/data/tree',
  LewTreeSelect: 'lew-ui/components/form/tree-select',
  LewDropdown: 'lew-ui/components/navigation/dropdown',
  LewDateRange: 'lew-ui/components/form/date-range-picker',
  LewDateRangePicker: 'lew-ui/components/form/date-range-picker',
  LewCascader: 'lew-ui/components/form/cascader',
  LewColorPicker: 'lew-ui/components/form/color-picker',
  LewDatePicker: 'lew-ui/components/form/date-picker',
  LewRadioGroup: 'lew-ui/components/form/radio',
  LewRate: 'lew-ui/components/form/rate',
  LewSlider: 'lew-ui/components/form/slider',
  LewSliderRange: 'lew-ui/components/form/slider-range',
  LewSwitch: 'lew-ui/components/form/switch',
  LewTabs: 'lew-ui/components/form/tabs',
  LewTextarea: 'lew-ui/components/form/textarea',
  LewUpload: 'lew-ui/components/form/upload',
  LewForm: 'lew-ui/components/form/form',
  LewFormItem: 'lew-ui/components/form/form',
  LewPagination: 'lew-ui/components/data/pagination',
  LewTable: 'lew-ui/components/data/table',
  LewMenu: 'lew-ui/components/navigation/menu',
  LewActionBox: 'lew-ui/components/navigation/action-box',
}

const typeSymbols = new Set([
  'LewModalFooterButtonItem',
  'LewTabsOption',
  'LewColor',
  'LewOffset',
  'LewCheckboxOption',
  'LewDirection',
  'LewSize',
  'LewComponentSource',
  'LewDescOption',
  'LewSelectMultipleOption',
  'LewSelectOption',
  'LewContextMenusOption',
  'LewSelectSearchMethodParams',
  'LewTrigger',
  'LewButtonSize',
  'LewButtonType',
  'LewTreeDataSource',
  'LewMenuOption',
  'LewTextareaResize',
  'LewDatePickerPresetsOption',
  'LewCollapseModelValue',
  'LewCascaderOption',
  'LewPlacement',
  'LewAvatarPlacement',
  'LewAvatarShape',
  'LewAvatarStatus',
  'LewImageObjectFit',
  'LewImageObjectPosition',
  'LewTableColumn',
  'LewXAlignment',
  'LewStatusColor',
  'LewMenuTreeOption',
  'LewTagProps',
  'LewButtonProps',
  'LewFormItemAs',
  'LewFormOption',
])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory())
      walk(full, files)
    else if (/\.(vue|ts)$/.test(entry.name))
      files.push(full)
  }
  return files
}

function parseImport(line) {
  const typeMatch = line.match(/^import\s+type\s+\{([^}]+)\}\s+from\s+['"]lew-ui['"]/)
  if (typeMatch) {
    return {
      isType: true,
      symbols: typeMatch[1].split(',').map(s => s.trim()).filter(Boolean),
    }
  }
  const match = line.match(/^import\s+\{([^}]+)\}\s+from\s+['"]lew-ui['"]/)
  if (match) {
    return {
      isType: false,
      symbols: match[1].split(',').map(s => s.trim()).filter(Boolean),
    }
  }
  return null
}

function getPath(symbol) {
  if (symbolPaths[symbol])
    return symbolPaths[symbol]
  if (typeSymbols.has(symbol) || symbol.startsWith('Lew'))
    return 'lew-ui/types'
  return 'lew-ui/types'
}

function groupImports(symbols, isType) {
  const groups = new Map()
  for (const symbol of symbols) {
    const p = getPath(symbol)
    if (!groups.has(p))
      groups.set(p, [])
    groups.get(p).push(symbol)
  }
  const lines = []
  for (const [p, syms] of groups) {
    const prefix = isType ? 'import type' : 'import'
    lines.push(`${prefix} { ${syms.join(', ')} } from '${p}'`)
  }
  return lines.join('\n')
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes('from \'lew-ui\'') && !content.includes('from "lew-ui"'))
    return false

  const lines = content.split('\n')
  const newLines = []
  let changed = false

  for (const line of lines) {
    const parsed = parseImport(line)
    if (parsed) {
      newLines.push(groupImports(parsed.symbols, parsed.isType))
      changed = true
    }
    else {
      newLines.push(line)
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, newLines.join('\n'))
    console.log('Fixed:', path.relative(libDir, filePath))
  }
  return changed
}

const files = walk(libDir)
let count = 0
for (const file of files) {
  if (processFile(file))
    count++
}
console.log(`Updated ${count} files`)
