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
    label: '是否只读',
    as: 'switch',
    field: 'readonly',
  },
  {
    label: '是否禁用',
    as: 'switch',
    field: 'disabled',
  },
  {
    label: '校验规则',
    as: 'textarea',
    direction: 'y',
    tips: () => {
      // 参考文档 a 点击
      return h('span', [
        '参考 ',
        h('a', { href: 'https://github.com/lewkamtao/lew-ui/blob/main/docs/views/form-engine/yup.md', style: { textDecoration: 'underline' }, target: '_blank' }, 'Yup 速查表'),
      ])
    },
    field: 'rule',
  },
  {
    label: '提示信息',
    as: 'textarea',
    direction: 'y',
    field: 'tips',
  },
]
