import type { ExtractPropTypes, PropType } from 'vue'

export type TextTrimPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TextTrimAlignment = 'left' | 'center' | 'right'

export const textTrimProps = {
    text: {
        type: [String, Number],
        default: '',
    },
    lineClamp: {
        type: Number,
        default: undefined,
        validator(value: number): boolean {
            if (value <= 0) {
                console.warn('[LewTextTrim] lineClamp 属性必须大于 0')
                return false
            }
            return true
        },
    },
    allowHTML: {
        type: Boolean,
        default: false,
    },
    placement: {
        type: String as PropType<TextTrimPlacement>,
        default: 'top',
        typeDesc: 'top | bottom | left | right',
        validator(value: TextTrimPlacement): boolean {
            const validPlacements: TextTrimPlacement[] = [
                'top',
                'bottom',
                'left',
                'right',
            ]
            if (!validPlacements.includes(value)) {
                console.warn(
                    `[LewTextTrim] 无效的 placement 值: ${value}。请使用 ${validPlacements.join(', ')} 中的一个。`,
                )
                return false
            }
            return true
        },
    },
    offset: {
        type: Array as PropType<number[]>,
        default: [0, 15],
        validator(value: [number, number]): boolean {
            if (
                !Array.isArray(value) ||
                value.length !== 2 ||
                !value.every((item) => typeof item === 'number')
            ) {
                console.warn(
                    '[LewTextTrim] offset 属性必须是包含两个数字的数组',
                )
                return false
            }
            return true
        },
    },
    textAlign: {
        type: String as PropType<TextTrimAlignment>,
        typeDesc: 'left | center | right',
        default: 'left',
        validator(value: TextTrimAlignment): boolean {
            const validAlignments: TextTrimAlignment[] = [
                'left',
                'center',
                'right',
            ]
            if (!validAlignments.includes(value)) {
                console.warn(
                    `[LewTextTrim] 无效的 x 值: ${value}。请使用 ${validAlignments.join(', ')} 中的一个。`,
                )
                return false
            }
            return true
        },
    },
    delay: {
        type: Array as PropType<number[]>,
        default: [120, 120],
        validator(value: [number, number]): boolean {
            if (
                !Array.isArray(value) ||
                value.length !== 2 ||
                !value.every((item) => typeof item === 'number' && item >= 0)
            ) {
                console.warn(
                    '[LewTextTrim] delay 属性必须是包含两个非负数的数组',
                )
                return false
            }
            return true
        },
    },
    reserveEnd: {
        type: Number,
        default: 0,
        validator(value: number): boolean {
            if (value < 0) {
                console.warn('[LewTextTrim] reserveEnd 属性必须大于等于 0')
                return false
            }
            return true
        },
    },
}

export type TextTrimProps = ExtractPropTypes<typeof textTrimProps>
