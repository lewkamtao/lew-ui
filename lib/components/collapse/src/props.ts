import type { ExtractPropTypes } from 'vue'
import { isValidCssValue } from 'lew-ui/utils'

export const collapseModel = {
    modelValue: {
        type: [Array, String],
        default: false,
        description:
            '折叠面板的当前值，用于双向绑定。数组类型表示多选模式，字符串类型表示手风琴模式。',
        validator(value: string[] | number[] | string): boolean {
            if (Array.isArray(value)) {
                if (
                    !value.every(
                        (item) =>
                            typeof item === 'string' ||
                            typeof item === 'number',
                    )
                ) {
                    console.warn(
                        '[LewCollapse] modelValue 数组中的元素必须是字符串或数字类型。',
                    )
                    return false
                }
            } else if (typeof value !== 'string') {
                console.warn(
                    '[LewCollapse] modelValue 必须是数组或字符串类型。',
                )
                return false
            }
            return true
        },
    },
}

export const collapseItemModel = {
    modelValue: {
        type: Boolean,
        default: false,
        description: '折叠项的展开状态，true 表示展开，false 表示折叠。',
    },
}

export const collapseProps = {
    width: {
        type: [String, Number],
        default: '100%',
        description: '折叠面板的宽度，支持 CSS 宽度值。',
        validator(value: string | number): boolean {
            return isValidCssValue({
                name: 'LewCollapseItem',
                field: 'radius',
                value,
            })
        },
    },
}

export const collapseItemProps = {
    collapseKey: {
        type: [String, Number],
        default: '',
        description: '折叠项的唯一标识符。在使用 Collapse 组件时必须提供。',
        validator(value: string | number): boolean {
            if (value === '') {
                console.warn('[LewCollapseItem] collapseKey 不能为空。')
                return false
            }
            return true
        },
    },
    title: {
        type: String,
        default: '',
        description:
            '折叠项的标题文本。也可以使用具名插槽 "title" 自定义标题内容。',
    },
    radius: {
        type: [String, Number],
        default: '0px',
        description: '折叠项的圆角大小，支持 CSS 圆角值。',
        validator(value: string | number): boolean {
            return isValidCssValue({
                name: 'LewCollapseItem',
                field: 'radius',
                value,
            })
        },
    },
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
