// Returns the icon type to be used in a tooltip.
// type: The type of message to display in the tooltip.
export const getIconType = (type: string): string => {
    let map = {
        normal: 'info',
        warning: 'alert-triangle',
        success: 'check',
        error: 'alert-circle',
        info: 'bell',
    };
    // @ts-ignore
    return map[type] || 'info';
};

// getPx takes a string or number and returns a string with 'px' appended to it.
// num: string | number
// return: string
export const getPx = (num: string) => {
    return typeof num === 'string' ? num : num + 'px';
};

export const getClass = (prefix: String, props: Object) => {
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
    var str = num.toString().split('.');
    var integerPart = str[0];
    var decimalPart = str[1] ? '.' + str[1] : '';
    var reg = /(\d+)(\d{3})/;
    while (reg.test(integerPart)) {
        integerPart = integerPart.replace(reg, '$1' + ',' + '$2');
    }
    return integerPart + decimalPart;
};
