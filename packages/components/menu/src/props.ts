import { ExtractPropTypes, PropType } from 'vue';

export type MenuOptions = {
    id: string | number;
    label: string;
    value: string;
    children?: MenuOptions[];
    disabled?: boolean;
    level?: number;
    icon?: string;
};

export const menuProps = {
    options: {
        type: Array as PropType<MenuOptions[]>,
        default: [],
        typeDesc: ``,
        description: '颜色',
    },
    selectKey: {
        type: [String, Number] as PropType<string | number>,
        default: '',
        typeDesc: ``,
        description: '选中的值',
    },
    openKeys: {
        type: Array as PropType<string[]>,
        default: [],
        typeDesc: ``,
        description: '展开的值',
    },
};

export type MenuProps = ExtractPropTypes<typeof menuProps>;
