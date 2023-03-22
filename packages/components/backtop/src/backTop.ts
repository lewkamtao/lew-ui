import { ExtractPropTypes, PropType } from 'vue';
import { widthValidator } from 'lew-ui/utils';

export const backTopProps = {
    right: {
        type: String,
        validator: widthValidator,
        default: 40,
    },
    bottom: {
        type: String,
        validator: widthValidator,
        default: 40,
    },
    valveHeight: {
        type: String,
        validator: widthValidator,
        default: 50,
    },
    target: {
        type: String,
        default: '',
    },
};

export type BackTopProps = ExtractPropTypes<typeof backTopProps>;
