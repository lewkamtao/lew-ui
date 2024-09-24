import type { ExtractPropTypes, PropType } from 'vue'
import { validColors, validSizes } from 'lew-ui/constants'
import type { LewColor, LewSize } from 'lew-ui'

export type TagType = 'fill' | 'light' | 'ghost'

export const tagProps = {
  text: {
    type: String,
    default: '',
    description: '标签的文本，优先级大于插槽，超出宽度会触发 text-trim 效果'
  },
  type: {
    type: String as PropType<TagType>,
    default: 'fill',
    description: '标签的样式类型',
    validator(value: TagType): boolean {
      const validTypes: TagType[] = ['fill', 'light', 'ghost']
      if (!validTypes.includes(value)) {
        console.warn(
          `[LewTag] 无效的标签类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  color: {
    type: String as PropType<LewColor>,
    default: 'primary',
    description: '标签的颜色主题',
    validator(value: LewColor): boolean {
      if (!validColors.includes(value)) {
        console.warn(
          `[LewTag] 无效的颜色值: ${value}。请使用 ${validColors.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },
  size: {
    type: String as PropType<LewSize>,
    default: 'medium',
    description: '标签的尺寸',
    validator(value: LewSize): boolean {
      if (!validSizes.includes(value)) {
        console.warn(
          `[LewTag] 无效的标签尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`
        )
        return false
      }
      return true
    }
  },

  round: {
    type: Boolean,
    default: false,
    description: '是否为圆角标签'
  },
  closable: {
    type: Boolean,
    default: false,
    description: '是否可关闭标签'
  },
  disabled: {
    type: Boolean,
    default: false,
    description: '是否禁用标签'
  }
}

export type TagProps = ExtractPropTypes<typeof tagProps>
