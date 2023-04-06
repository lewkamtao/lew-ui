// Returns the icon type to be used in a tooltip.
// type: The type of message to display in the tooltip.
export const getIconType = (type: string): string => {
    const map = {
        normal: 'info',
        warning: 'alert-triangle',
        success: 'check',
        error: 'alert-circle',
        info: 'bell',
    };
    // @ts-ignore
    return map[type] || 'info';
};

export const getClass = (prefix: string, props: Object) => {
    let className = '';
    for (const [key, value] of Object.entries(props)) {
        if (typeof value === 'boolean' && value) {
            className += ` ${prefix}-${key}`;
        } else if (typeof value === 'string') {
            className += ` ${prefix}-${key}-${value}`;
        }
    }
    return className;
};

export const numFormat = (num: number) => {
    const str = num.toString().split('.');
    let integerPart = str[0];
    const decimalPart = str[1] ? `.${str[1]}` : '';
    const reg = /(\d+)(\d{3})/;
    while (reg.test(integerPart)) {
        integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
    }
    return integerPart + decimalPart;
};
