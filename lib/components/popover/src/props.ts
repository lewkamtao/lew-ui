import type { ExtractPropTypes, PropType } from 'vue'

export type PopoverTrigger = 'click' | 'hover' | 'focus'
export type PopoverPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

export const popoverProps = {
    trigger: {
        type: String as PropType<PopoverTrigger>,
        default: 'click',
        description: '触发弹出的方式',
        validator(value: PopoverTrigger): boolean {
            if (!['click', 'hover', 'focus'].includes(value)) {
                console.warn(
                    `[LewPopover] 无效的触发方式: ${value}。请使用 'click'、'hover' 或 'focus'。`,
                )
                return false
            }
            return true
        },
    },
    placement: {
        type: String as PropType<PopoverPlacement>,
        default: 'top',
        description: '弹出框的位置',
        validator(value: PopoverPlacement): boolean {
            const validPlacements = [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end',
            ]
            if (!validPlacements.includes(value)) {
                console.warn(
                    `[LewPopover] 无效的弹出位置: ${value}。请使用有效的位置值。`,
                )
                return false
            }
            return true
        },
    },
    disabled: {
        type: Boolean,
        default: false,
        description: '是否禁用弹出框',
    },
    loading: {
        type: Boolean,
        default: false,
        description: '是否显示加载状态',
    },
    hideOnClick: {
        type: [Boolean, String],
        default: true,
        description: '点击后是否隐藏弹出框',
        validator(value: boolean | string): boolean {
            if (typeof value !== 'boolean' && value !== 'outside') {
                console.warn(
                    `[LewPopover] hideOnClick 的值必须是布尔值或 'outside'。`,
                )
                return false
            }
            return true
        },
    },
    offset: {
        type: Array as PropType<number[]>,
        default: () => [0, 8],
        description: '弹出框的偏移量 [水平, 垂直]',
        validator(value: [number, number]): boolean {
            if (
                !Array.isArray(value) ||
                value.length !== 2 ||
                !value.every((item) => typeof item === 'number')
            ) {
                console.warn(`[LewPopover] offset 必须是包含两个数字的数组。`)
                return false
            }
            return true
        },
    },
    popoverBodyClassName: {
        type: String,
        default: 'lew-popover-body',
        description: '弹出框的自定义类名',
    },
    triggerTarget: {
        type: Object as PropType<Element>,
        default: null,
        description: '触发弹出框的目标元素',
    },
}

export type PopoverProps = ExtractPropTypes<typeof popoverProps>
