export const baseSchema = [
  {
    label: '字段标识',
    as: 'input',
    field: 'field'
  },
  {
    label: '标题',
    as: 'input',
    field: 'label'
  },
  {
    label: '是否必填',
    as: 'switch',
    field: 'required'
  },
  {
    label: '是否只读',
    as: 'switch',
    field: 'readonly'
  },
  {
    label: '是否禁用',
    as: 'switch',
    field: 'disabled'
  },
  {
    label: '校验规则',
    as: 'textarea',
    direction: 'y',
    tips: '参考 Yup 官方文档',
    field: 'rule'
  },
  {
    label: '提示信息',
    as: 'textarea',
    direction: 'y',
    field: 'tips'
  }
]
