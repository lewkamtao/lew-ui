export default [
    {
        label: '评分总数',
        as: 'input-number',
        field: 'count',
        componentWidth: 110,
        props: {
            min: 3,
            max: 10,
            align: 'center',
            placeholder: '评分总数',
        },
    },
    {
        label: '评分提示',
        as: 'textarea',
        field: 'tips',
        tips: '使用逗号分隔每个等级的提示文字',
        direction: 'y',
        props: {
            placeholder: '例如: 很差,较差,一般,良好,优秀',
        },
    },
]
