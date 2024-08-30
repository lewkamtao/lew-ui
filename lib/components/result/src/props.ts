export type ResultType = 'success' | 'warning' | 'error' | 'info' | 'normal' | 'primary'

export const resultProps = {
  type: {
    type: String,
    default: 'info',
    validator(value: ResultType): boolean {
      const validTypes = ['success', 'warning', 'error', 'info', 'normal']
      if (!validTypes.includes(value)) {
        console.warn(
          `[LewResult] 无效的结果类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    },
    description: '结果的类型，用于设置不同状态下的图标和颜色样式。'
  },
  title: {
    type: String,
    default: '',
    validator(value: string): boolean {
      if (value.length > 50) {
        console.warn('[LewResult] 标题长度不应超过50个字符。')
        return false
      }
      return true
    },
    description: '结果的主标题，用于简明扼要地展示结果信息。建议不超过50个字符。'
  },
  content: {
    type: String,
    default: '',
    validator(value: string): boolean {
      if (value.length > 200) {
        console.warn('[LewResult] 内容长度不应超过200个字符。')
        return false
      }
      return true
    },
    description: '结果的详细内容，用于提供额外的说明或后续操作指引。建议不超过200个字符。'
  }
}
