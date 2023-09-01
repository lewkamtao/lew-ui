import { textareaProps } from 'lew-ui';
import { convertProps } from '@/lib/utils';

export default {
    title: 'textareaProps',
    columnsKey: 'props',
    data: convertProps(textareaProps),
};
