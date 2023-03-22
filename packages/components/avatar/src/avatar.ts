import { ExtractPropTypes, PropType } from 'vue';
import { widthValidator } from 'lew-ui/utils';

type AvatarPosition =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'left-top'
    | 'left-bottom'
    | 'right-top'
    | 'right-bottom';

type AvatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy';

export const avatarProps = {
    round: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String as PropType<AvatarStatus>,
        default: '',
    },
    statusPosition: {
        type: String as PropType<AvatarPosition>,
        default: '',
    },
    width: {
        type: [String, Number],
        validator: widthValidator,
        default: 40,
    },
    height: {
        type: [String, Number],
        validator: widthValidator,
        default: 40,
    },
    errorSrc: {
        type: String,
        default:
            'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
    },
    src: {
        type: String,
        default: '',
    },
    alt: {
        type: String,
        default: '',
    },
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;
