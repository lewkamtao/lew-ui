import { cascaderProps } from 'lew-ui';
import { convertProps } from '@/lib/utils';

export default {
    title: 'Props',
    columnsKey: 'props',
    data: convertProps(cascaderProps)
};
