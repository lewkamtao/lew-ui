export const widthValidator = (value: number | string): boolean => {
    // 如果传入的是数字类型，将其转换为像素单位
    if (typeof value === 'number') {
        value = `${value}px`;
    }
    // 如果传入的是字符串类型，检查字符串是否以数字结尾，如果是则添加像素单位
    if (typeof value === 'string') {
        const lastChar = value.charAt(value.length - 1);
        if (!isNaN(parseInt(lastChar))) {
            value = `${value}px`;
        }
    }
    // 验证最终的宽度值是否有效
    return /^[1-9][0-9]*px$/.test(value);
};
