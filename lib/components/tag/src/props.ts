import type { ExtractPropTypes, PropType } from 'vue'
import { validColors, validSizes } from 'lew-ui/constants'
import type { LewColor, LewSize } from 'lew-ui'

export type TagType = 'fill' | 'light' | 'ghost'

export const tagProps = {
    text: {
        type: String,
        default: '',
    },
    oversize: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String as PropType<TagType>,
        default: 'light',
        typeDesc: `fill | light | ghost`,
        validator(value: TagType): boolean {
            const validTypes: TagType[] = ['fill', 'light', 'ghost']
            if (!validTypes.includes(value)) {
                console.warn(
                    `[LewTag] 无效的标签类型: ${value}。请使用 ${validTypes.join(', ')} 中的一个。`,
                )
                return false
            }
            return true
        },
    },
    color: {
        type: String as PropType<LewColor>,
        default: 'primary',
        validator(value: LewColor): boolean {
            if (!validColors.includes(value)) {
                console.warn(
                    `[LewTag] 无效的颜色值: ${value}。请使用 ${validColors.join(', ')} 中的一个。`,
                )
                return false
            }
            return true
        },
    },
    size: {
        type: String as PropType<LewSize>,
        default: 'medium',
        validator(value: LewSize): boolean {
            if (!validSizes.includes(value)) {
                console.warn(
                    `[LewTag] 无效的标签尺寸: ${value}。请使用 ${validSizes.join(', ')} 中的一个。`,
                )
                return false
            }
            return true
        },
    },

    round: {
        type: Boolean,
        default: false,
    },
    closable: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
}

export type TagProps = ExtractPropTypes<typeof tagProps>
