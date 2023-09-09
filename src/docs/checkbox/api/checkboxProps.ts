import { checkboxProps } from 'lew-ui';
import { convertProps } from '@/lib/utils';

export default {
    title: 'props (checkbox)',
    columnsKey: 'props',
    orderNum: 10,
    data: convertProps(checkboxProps),
};
