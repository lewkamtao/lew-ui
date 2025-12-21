import LewButton from './src/LewButton.vue'
import { buttonEmits, type LewButtonEmits } from './src/emits'
import { buttonProps, type LewButtonProps } from './src/props'

// ✅ 具名导出组件
export { LewButton }

// ✅ 具名导出类型
export type { LewButtonEmits, LewButtonProps }

// ✅ 导出 props 和 emits 对象（用于文档生成）
export { buttonEmits, buttonProps }

// ✅ 默认导出
export default LewButton
