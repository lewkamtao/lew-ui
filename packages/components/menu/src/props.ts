import { ExtractPropTypes, PropType } from 'vue';

export type MenuOptions = {
    label: string;
    value?: string;
    children?: MenuOptions[];
    disabled?: boolean;
    level?: number;
    icon?: string;
    tagText?: string;
    tagColor?: string;
};

export const menuProps = {
    options: {
        type: Array as PropType<MenuOptions[]>,
        default: [],
        typeDesc: ``,
        description: '颜色',
    },
    actived: {
        type: String,
        default: '',
        typeDesc: ``,
        description: '选中的值',
    },
};

export type MenuProps = ExtractPropTypes<typeof menuProps>;
