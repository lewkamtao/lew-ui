import { ExtractPropTypes, PropType } from 'vue';
import { widthValidator } from 'lew-ui/utils';

const DocsUrl = 'https://lew.kamtao.com/#/Avatar';

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

type avatarStatus = 'online' | 'processing' | 'away' | 'offline' | 'busy';

export const avatarProps = {
    round: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String as PropType<avatarStatus>,
        validator: (value: string) => {
            const status: string[] = [
                'online',
                'processing',
                'away',
                'offline',
                'busy',
            ];

            if (value && !status.includes(value)) {
                console.warn(
                    `oooh! Warning!\n lew-avatar status${value} 为非法值。\n请参考官方文档 ${DocsUrl}\n\n`
                );
            }
            return true;
        },
        default: '',
    },
    statusPosition: {
        type: String as PropType<AvatarPosition>,
        validator: (value: string) => {
            const position: string[] = [
                'top',
                'left',
                'right',
                'bottom',
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'left-top',
                'left-bottom',
                'right-top',
                'right-bottom',
            ];

            if (value && !position.includes(value)) {
                console.warn(
                    `oooh! Warning!\nlew-avatar statusPosition：${value} 为非法值。\n请参考官方文档 ${DocsUrl}\n\n`
                );
            }
            return true;
        },
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
