export default [
  {
    label: '视图模式',
    as: 'tabs',
    field: 'viewMode',
    props: {
      itemWidth: '50px',
      options: [
        {
          label: '列表',
          value: 'list'
        },
        {
          label: '卡片',
          value: 'card'
        }
      ]
    }
  },
  {
    label: '接受上传的文件类型',
    as: 'input',
    field: 'accept'
  },
  {
    label: '是否允许多选文件',
    as: 'switch',
    field: 'multiple'
  },
  {
    label: '最大上传文件大小',
    as: 'input-number',
    componentWidth: 110,
    tips: '单位为字节',
    props: { min: 0, align: 'center', placeholder: '' },
    field: 'maxFileSize'
  },
  {
    label: '最大上传数量',
    as: 'input-number',
    componentWidth: 110,
    tips: '至少上传一个文件',
    props: { min: 1, align: 'center', placeholder: '' },
    field: 'limit'
  },
  {
    label: '提示信息',
    as: 'textarea',
    field: 'tips'
  }
]
