import type { LewButtonEmits } from './src/emits'
import type { LewButtonProps } from './src/props'
import { buttonEmits } from './src/emits'
import LewButton from './src/LewButton.vue'
import { buttonProps } from './src/props'

// ✅ 具名导出组件
export { LewButton }

// ✅ 具名导出类型
export type { LewButtonEmits, LewButtonProps }

// ✅ 导出 props 和 emits 对象（用于文档生成）
export { buttonEmits, buttonProps }

// ✅ 默认导出
export default LewButton
