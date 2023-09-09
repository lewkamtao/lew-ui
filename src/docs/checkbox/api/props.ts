import { checkboxGroupProps } from 'lew-ui';
import { convertProps } from '@/lib/utils';

export default {
    title: 'Props (checkbox-group)',
    columnsKey: 'props',
    orderNum: 1,
    data: convertProps(checkboxGroupProps),
};
