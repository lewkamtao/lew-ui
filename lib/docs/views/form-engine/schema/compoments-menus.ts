import inputScheme from './components/input'
import inputNumberScheme from './components/input-number'
import selectScheme from './components/select'
import selectMultipleScheme from './components/select-multiple'
import textareaScheme from './components/textarea'
import tabsScheme from './components/tabs'
import checkbox from './components/checkbox'
import checkboxGroup from './components/checkbox-group'
import radio from './components/radio'
import _switch from './components/switch'
import upload from './components/upload'
import cascader from './components/cascader'
import datePicker from './components/date-picker'
import datePickerRange from './components/date-range-picker'
import inputTag from './components/input-tag'

export const componentsMenusSchema = [
  {
    label: '占位盒子',
    as: ''
  },
  {
    label: '输入框',
    fieldType: '',
    as: 'input',
    schema: inputScheme,
    props: {
      clearable: true,
      type: 'text',
      align: 'left'
    }
  },
  {
    label: '数字输入',
    fieldType: '',
    as: 'input-number',
    schema: inputNumberScheme,
    props: {}
  },
  {
    label: '文本域',
    fieldType: '',
    as: 'textarea',
    schema: textareaScheme,
    props: {
      clearable: true,
      showCount: true,
      maxLength: 300
    }
  },
  {
    label: '下拉单选',
    fieldType: '',
    as: 'select',
    schema: selectScheme,
    props: {
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    }
  },
  {
    field: 'select_multiple',
    fieldType: [],
    label: '下拉多选',
    as: 'select-multiple',
    schema: selectMultipleScheme,
    props: {
      change: (e: any) => {
        console.log(e)
      },
      clearable: true,
      options: [
        {
          label: '广东',
          value: '1'
        },
        {
          label: '深圳',
          value: '2'
        },
        {
          label: '杭州',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        },
        {
          label: '北京',
          value: '5'
        }
      ]
    }
  },
  {
    label: '单选框',
    fieldType: '',
    as: 'radio-group',
    props: {
      options: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        },
        {
          label: '不公开',
          value: '3'
        }
      ]
    }
  },
  {
    label: '复选框',
    fieldType: [],
    as: 'checkbox-group',
    props: {
      options: [
        {
          label: '唱歌',
          value: '1'
        },
        {
          label: '跳舞',
          value: '2'
        },
        {
          label: 'Rap',
          value: '3'
        },
        {
          label: '上海',
          value: '4'
        }
      ]
    }
  },
  {
    label: '选项卡',
    fieldType: '',
    as: 'tabs',
    schema: tabsScheme,
    props: {
      options: [
        {
          label: 'Beijing',
          value: '1'
        },
        {
          label: 'Shanghai',
          value: '2'
        },
        {
          label: 'Guangzhou',
          value: '3'
        }
      ]
    }
  },
  {
    label: '日期',
    fieldType: '',
    as: 'date-picker',
	schema: datePicker,
    props: {
      options: [
        {
          label: 'Beijing',
          value: '1'
        },
        {
          label: 'Shanghai',
          value: '2'
        },
        {
          label: 'Guangzhou',
          value: '3'
        }
      ]
    }
  },
  {
    label: '日期范围',
    fieldType: '',
    as: 'date-range-picker',
	schema: datePickerRange,
    props: {
      options: [
        {
          label: 'Beijing',
          value: '1'
        },
        {
          label: 'Shanghai',
          value: '2'
        },
        {
          label: 'Guangzhou',
          value: '3'
        }
      ]
    }
  },
  {
    label: '级联选择',
    fieldType: '',
    as: 'cascader',
	schema: cascader,
    props: {
      label: '是否同意',
      free: true,
      options: [
        {
          value: 1,
          label: 'Asia',
          children: [
            {
              value: 2,
              label: 'China',
              children: [
                { value: 3, label: 'Beijing' },
                { value: 4, label: 'Shanghai' },
                { value: 5, label: 'Hangzhou' }
              ]
            },
            {
              value: 6,
              label: 'Japan',
              children: [
                { value: 7, label: 'Tokyo' },
                { value: 8, label: 'Osaka' },
                { value: 9, label: 'Kyoto' }
              ]
            },
            {
              value: 10,
              label: 'Korea',
              children: [
                { value: 11, label: 'Seoul' },
                { value: 12, label: 'Busan' },
                { value: 13, label: 'Taegu' }
              ]
            }
          ]
        },
        {
          value: 14,
          label: 'Europe',
          children: [
            {
              value: 15,
              label: 'France',
              children: [
                { value: 16, label: 'Paris' },
                { value: 17, label: 'Marseille' },
                { value: 18, label: 'Lyon' }
              ]
            },
            {
              value: 19,
              label: 'UK',
              children: [
                { value: 20, label: 'London' },
                { value: 21, label: 'Birmingham' },
                { value: 22, label: 'Manchester' }
              ]
            }
          ]
        },
        {
          value: 23,
          label: 'North America',
          children: [
            {
              value: 24,
              label: 'US',
              children: [
                { value: 25, label: 'New York' },
                { value: 26, label: 'Los Angeles' },
                { value: 27, label: 'Washington' }
              ]
            },
            {
              value: 28,
              label: 'Canada',
              children: [
                { value: 29, label: 'Toronto' },
                { value: 30, label: 'Montreal' },
                { value: 31, label: 'Ottawa' }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    label: '选框',
    fieldType: false,
    as: 'checkbox',
    schema: checkbox,
    props: {
      label: '是否同意'
    }
  },
  {
    label: '标签输入框',
    fieldType: [],
    as: 'input-tag',
	schema: inputTag,
    props: {}
  },
  {
    label: '开关',
    fieldType: false,
    as: 'switch',
    schema: _switch,
    props: {
      round: 1
    }
  },
  {
    label: '上传',
    fieldType: [],
    as: 'upload',
	schema: upload,
    props: {}
  }
]
//   {
//     label: '滑块',
//     fieldType: '',
//     as: 'slider',
//     props: {
//       showCount: true,
//       maxLength: 30
//     }
//   },
//   {
//     label: '范围滑块',
//     fieldType: [],
//     as: 'slider-range',
//     props: {
//       showCount: true,
//       maxLength: 30
//     }
//   },
