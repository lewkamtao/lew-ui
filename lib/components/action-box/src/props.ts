import type { ExtractPropTypes, PropType } from 'vue'
import type { FlexXAlignment } from 'lew-ui'
export interface ActionBoxOption {
    label: string | (() => any)
    icon?: string | (() => any)
    customRender?: () => any
    onClick?: () => void
}

export const actionBoxProps = {
    options: {
        type: Array as PropType<ActionBoxOption[]>,
        default: () => [],
    },
    x: {
        type: String as PropType<FlexXAlignment>,
        default: 'start',
        typeDesc: 'start | center | end',
        validator(value: FlexXAlignment): boolean {
            if (!['start', 'center', 'end', 'left', 'right'].includes(value)) {
                console.warn(
                    `[LewFlex] 无效的水平对齐值: ${value}。请使用 'start'、'center'、'end'、'left' 或 'right'。`,
                )
                return false
            }
            return true
        },
    },
    dropdownThreshold: {
        type: [Number, String],
        default: 0,
    },
    dropdownLabel: {
        type: [String, Function, Object] as PropType<
            string | (() => any) | any
        >,
        default: 'More',
    },
    dropdownIcon: {
        type: [Function, Object] as PropType<(() => any) | any>,
        default: undefined,
    },
    divider: {
        type: Boolean,
        default: true,
    },
    iconOnly: {
        type: Boolean,
        default: false,
    },
}

export type ActionBoxProps = ExtractPropTypes<typeof actionBoxProps>
