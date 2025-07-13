export const baseSchema = [
    {
        label: '字段标识',
        as: 'input',
        field: 'field',
    },
    {
        label: '标题',
        as: 'input',
        field: 'label',
    },
    {
        label: '提示信息',
        as: 'textarea',
        direction: 'y',
        field: 'tips',
    },
    {
        label: '方向',
        as: 'tabs',
        field: 'direction',
        componentWidth: 'auto',
        props: {
            itemWidth: '50px',
            options: [
                { label: '水平', value: 'x' },
                { label: '垂直', value: 'y' },
            ],
        },
    },
]
