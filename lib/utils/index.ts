import _ from 'lodash';
// Returns the icon type to be used in a tooltip.

// type: The type of message to display in the tooltip.
export const getIconType = (type: string | undefined): string => {
    const map = {
        normal: 'info',
        warning: 'alert-triangle',
        success: 'check',
        error: 'alert-circle',
        info: 'bell'
    };
    // @ts-ignore
    return map[type] || 'info';
};
// type: The type of message to display in the tooltip.
export const getColorType = (type: string | undefined): string => {
    const typeMap = {
        normal: 'gray',
        warning: 'orange',
        success: 'green',
        error: 'red',
        danger: 'red',
        info: 'blue',
        primary: 'blue'
    };
    // @ts-ignore
    return typeMap[type] || type;
};
export const object2class = (prefix: string, props: Object) => {
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

export const any2px = (value: number | string | undefined): string => {
    if (!value) {
        return '';
    }

    const autoRegex = /^auto$/i;
    const calcRegex = /^calc\((.+)\)$/;
    const percentRegex = /^-?\d+(\.\d+)?%$/;
    const pixelRegex = /^-?\d+(\.\d+)?(px)?$/;
    const numericRegex = /^-?\d+(\.\d+)?$/;

    const _value = String(value);

    if (_value.startsWith('calc')) {
        return _value;
    }

    if (numericRegex.test(_value)) {
        return `${value}px`;
    }
    if (autoRegex.test(_value)) {
        return _value;
    }
    if (percentRegex.test(_value)) {
        return _value;
    }
    if (calcRegex.test(_value)) {
        return _value;
    }
    if (pixelRegex.test(_value)) {
        return `${_value}`;
    }
    const numValue = parseFloat(_value);
    if (!isNaN(numValue)) {
        return `${numValue}px`;
    }

    return '';
};

/** @func 生成uid */
let uid = 1;
export function genUid(): number {
    return Date.now() + uid++;
}

export const lewSetForm = ({
    formRef,
    params
}: {
    formRef: any; // 传入formRef.value
    params: any; // 需要设置的参数
}) => {
    let timeout = 0;
    const _fn = () => {
        timeout += 10;
        if (formRef && formRef.value) {
            formRef.value.setForm(params);
        } else {
            setTimeout(() => {
                _fn();
            }, timeout);
        }
    };
    _fn();
};

export type Tree = {
    label: string;
    value: [string, number];
    labelPaths?: string[];
    valuePaths?: string[];
    level: number;
    isLeaf?: boolean;
    loading?: boolean;
    disabled?: boolean;
    parentLabelPaths?: string[];
    parentValuePaths?: string[];
    parentValue?: string;
    parentLabel?: string;
    children?: Tree[];
};

// 格式化 获取 path
export const formatPathsToTreeList = (
    treeList: Tree[],
    parentValuePaths = [],
    parentLabelPaths = [],
    _keyPaths = ''
) => {
    let _tree = _.cloneDeep(treeList);
    let formatFn = (
        treeList: Tree[],
        parentValuePaths = [],
        parentLabelPaths = [],
        _parentKeyPaths = ''
    ) => {
        treeList.forEach((tree) => {
            const { value, label, children = [], isLeaf } = tree;
            const valuePaths: any = [...parentValuePaths, value];
            const labelPaths: any = [...parentLabelPaths, label];
            tree.parentValue =
                parentValuePaths.length > 0
                    ? parentValuePaths[parentValuePaths.length - 1]
                    : undefined;
            tree.parentLabel =
                parentLabelPaths.length > 0
                    ? parentLabelPaths[parentLabelPaths.length - 1]
                    : undefined;
            tree.valuePaths = valuePaths;
            tree.labelPaths = labelPaths;
            tree.parentValuePaths = parentValuePaths;
            tree.parentLabelPaths = parentLabelPaths;
            tree.level = valuePaths.length - 1;
            if (!isLeaf) {
                formatFn(children, valuePaths, labelPaths);
            }
        });
    };
    formatFn(_tree, parentValuePaths, parentLabelPaths);
    return _tree;
};
