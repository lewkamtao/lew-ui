import type { ExtractPropTypes } from 'vue'
import type { TagProps } from 'lew-ui'

export type MenuOptions = {
    label: string // 标题
    value?: string // 值
    children?: MenuOptions[] // 子菜单
    disabled?: boolean // 是否禁用
    icon?: () => any
    tagProps?: TagProps
}

export const menuModel = {
    modelValue: {
        type: String,
        default: '',
        description: '双向绑定值',
        validator(value: string): boolean {
            if (typeof value !== 'string') {
                console.warn('[LewMenuTree] modelValue 必须是字符串类型。')
                return false
            }
            return true
        },
    },
}

export const menuProps = {
    options: {
        type: Array as PropType<MenuOptions[]>,
        default: [],
        description: '菜单选项配置',
        typeGhost: 'MenuOptions[]',
        validator: (value: unknown): boolean => {
            if (!Array.isArray(value)) {
                console.warn('[LewMenu] options 必须是一个数组')
                return false
            }
            return true
        },
    },
}

export type MenuProps = ExtractPropTypes<typeof menuProps>
