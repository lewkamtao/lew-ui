export default {
  title: 'FormOptions',
  columnsKey: 'props',
  data: [
    {
      name: 'field',
      description: '表单字段',
      type: 'string',
      default: '-'
    },
    {
      name: 'label',
      description: '表单标题',
      type: 'small ｜ medium ｜ large',
      default: 'medium'
    },
    {
      name: 'rules',
      description: '校验规则',
      type: 'yup*',
      default: ''
    },
    {
      name: 'value',
      description: '值，此处用于回显数据。',
      type: 'any',
      default: ''
    },
    {
      name: 'as',
      description: '组件名',
      type: 'input | textarea | select | select-multiple | input-tag | checkbox | checkbox-group | radio-group | date-picker | date-range-picker | tabs | switch | button',
      default: ''
    },
    {
      name: 'props',
      description: '组件props',
      type: 'object',
      default: '{}'
    }
  ]
}
