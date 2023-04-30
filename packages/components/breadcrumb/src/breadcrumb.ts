import { PropType, ExtractPropTypes } from 'vue';

export type BreadcrumbOptions = {
    label: string;
    to: string;
    active: boolean;
};

export type BreadcrumbIconType = 'shoulder' | 'sprit';

export const breadcrumbProps = {
    options: {
        type: Array as PropType<BreadcrumbOptions[]>,
        default() {
            return [];
        },
    },
    iconType: {
        type: String as PropType<BreadcrumbIconType>,
        default() {
            return 'sprit'; // shoulder ｜ sprit
        },
    },
};

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>;
