/*
 * @Author: sonders
 * @Date: 2022-07-13 14:08:50
 * @LastEditors: sonders
 * @LastEditTime: 2022-07-13 14:56:57
 * @Description:
 *
 */
export const DrawerProps = {
    visible: {
        type: Boolean,
        default: false,
    },
    width: {
        type: Number,
        default: 30,
    },
    height: {
        type: Number,
        default: 30,
    },
    position: {
        type: String,
        default: '',
    },
};

export const getStyle = (position: string, width: number, height: number) => {
    switch (true) {
        case !position:
            return `width:30%;height:100%`;

        case position==='left':
            return `width:${width}%;height:100%`;

        case position==='right':
            return `width:${width}%;height:100%`;

        case position==='top':
            return `width:100%;height:${height}%`;

        case position==='bottom':
            return `width:100%;height:${height}%`;

        default:
            break;
    }
};

export const getPosition = (position: string) => {
    switch (position) {
        case 'left':
            return 0;
        case 'right':
            return 0;
        case 'top':
            return 1;
        case 'bottom':
            return 1;
        default:
            return 0;
    }
};

export const getClass = (position: string) => {
    return position ? 'lew-drawer-main-' + position : 'lew-drawer-main-right';
};
