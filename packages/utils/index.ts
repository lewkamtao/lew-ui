export const getIconType = (type: string) => {
    switch (type) {
        case 'normal':
            return 'info';
        case 'warning':
            return 'alert-triangle';
        case 'success':
            return 'check';
        case 'error':
            return 'alert-circle';
        case 'info':
            return 'bell';
        default:
            return 'info';
    }
};

export const getPx = (num: string) => {
    return typeof num == 'string' ? num : num + 'px';
};
