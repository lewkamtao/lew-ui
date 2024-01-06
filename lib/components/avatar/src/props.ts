import { ExtractPropTypes, PropType } from 'vue';

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
        description: '是否为圆形',
    },
    status: {
        type: String as PropType<AvatarStatus>,
        default: '',
        description: '状态',
    },
    statusPosition: {
        type: String as PropType<AvatarPosition>,
        default: '',
        description: '位置',
    },
    width: {
        type: [Number, String],
        default: 40,
        description: '宽度',
    },
    height: {
        type: [Number, String],
        default: 40,
        description: '高度',
    },
    errorSrc: {
        type: String,
        default:
            'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        description: '错误图',
    },
    src: {
        type: String,
        default: '',
        description: '图片链接',
    },
    alt: {
        type: String,
        default: '',
        description: '图像的备选文本,供图像无法显示时采用',
    },
};

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;
