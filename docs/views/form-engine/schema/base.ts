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
    label: '校验规则',
    as: 'textarea',
    direction: 'y',
    props: {
      placeholder: '请输入 Yup 表达式',
    },
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
    label: '是否显示',
    as: 'textarea',
    direction: 'y',
    props: {
      placeholder: '请输入 expr-eval 表达式',
    },
    tips: () => {
      // 参考文档 a 点击
      return h('span', [
        '参考 ',
        h('a', { href: 'https://github.com/lewkamtao/lew-ui/blob/main/docs/views/form-engine/expr-eval.md', style: { textDecoration: 'underline' }, target: '_blank' }, 'expr-eval 速查表'),
      ])
    },
    field: 'visible',
  },
  {
    label: '是否只读',
    as: 'textarea',
    direction: 'y',
    props: {
      placeholder: '请输入 expr-eval 表达式',
    },
    tips: () => {
      // 参考文档 a 点击
      return h('span', [
        '参考 ',
        h('a', { href: 'https://github.com/lewkamtao/lew-ui/blob/main/docs/views/form-engine/expr-eval.md', style: { textDecoration: 'underline' }, target: '_blank' }, 'expr-eval 速查表'),
      ])
    },
    field: 'readonly',
  },
  {
    label: '是否禁用',
    as: 'textarea',
    direction: 'y',
    props: {
      placeholder: '请输入 expr-eval 表达式',
    },
    tips: () => {
      // 参考文档 a 点击
      return h('span', [
        '参考 ',
        h('a', { href: 'https://github.com/lewkamtao/lew-ui/blob/main/docs/views/form-engine/expr-eval.md', style: { textDecoration: 'underline' }, target: '_blank' }, 'expr-eval 速查表'),
      ])
    },
    field: 'disabled',
  },

  {
    label: '提示信息',
    as: 'textarea',
    props: {
      placeholder: '请输入文本',
    },
    direction: 'y',
    field: 'tips',
  },
]
