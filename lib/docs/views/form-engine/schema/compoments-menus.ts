import inputScheme from './components/input'
import inputNumberScheme from './components/input-number'
import selectScheme from './components/select'
import selectMultipleScheme from './components/select-multiple'
import textareaScheme from './components/textarea'
import tabsScheme from './components/tabs'
import checkbox from './components/checkbox'
import checkboxGroup from './components/checkbox-group'
import radioGroup from './components/radio-group'
import _switch from './components/switch'
import upload from './components/upload'
import cascader from './components/cascader'
import datePicker from './components/date-picker'
import datePickerRange from './components/date-range-picker'
import inputTag from './components/input-tag'

export const componentsMenusSchema = [
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
    label: '文本域',
    fieldType: '',
    as: 'textarea',
    schema: textareaScheme,
    props: {
      clearable: true,
      showCount: true,
      maxLength: 500
    }
  },
  {
    label: '数字输入',
    fieldType: '',
    as: 'input-number',
    schema: inputNumberScheme,
    props: {
      align: 'left',
      width: 100
    }
  },
  {
    label: '单选框',
    fieldType: '',
    as: 'radio-group',
    schema: radioGroup,
    props: {
      round: true,
      direction: 'x',
      iconable: false,
      options: [
        { label: '选项 A', value: '1' },
        { label: '选项 B', value: '2' },
        { label: '选项 C', value: '3' },
        { label: '选项 D', value: '4' }
      ]
    }
  },
  {
    label: '选框',
    fieldType: false,
    as: 'checkbox',
    schema: checkbox,
    props: {
      iconable: false,
      label: '我同意服务条款'
    }
  },
  {
    label: '复选框',
    fieldType: [],
    as: 'checkbox-group',
    schema: checkboxGroup,
    props: {
      iconable: false,
      direction: 'x',
      options: [
        { label: '选项 A', value: '1' },
        { label: '选项 B', value: '2' },
        { label: '选项 C', value: '3' },
        { label: '选项 D', value: '4' }
      ]
    }
  },
  {
    label: '下拉单选',
    fieldType: '',
    as: 'select',
    schema: selectScheme,
    props: {
      clearable: true,
      trigger: 'click',
      align: 'left',
      showCheckIcon: true,
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
        { label: '选项四', value: '4' },
        { label: '选项五', value: '5' }
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
      clearable: true,
      valueTextSplit: '、',
      trigger: 'click',
      align: 'left',
      valueLayout: 'text',
      showCheckIcon: true,
      options: [
        { label: '选项 A', value: '1' },
        { label: '选项 B', value: '2' },
        { label: '选项 C', value: '3' },
        { label: '选项 D', value: '4' }
      ]
    }
  },
  {
    label: '级联选择',
    fieldType: '',
    as: 'cascader',
    schema: cascader,
    props: {
      clearable: true,
      label: '请选择',
      free: true,
      trigger: 'click',
      options: [
        {
          value: 1,
          label: '食品',
          children: [
            {
              value: 2,
              label: '水果',
              children: [
                { value: 3, label: '苹果' },
                { value: 4, label: '香蕉' },
                { value: 5, label: '橙子' }
              ]
            },
            {
              value: 6,
              label: '蔬菜',
              children: [
                { value: 7, label: '西红柿' },
                { value: 8, label: '黄瓜' },
                { value: 9, label: '胡萝卜' }
              ]
            }
          ]
        },
        {
          value: 10,
          label: '饮料',
          children: [
            {
              value: 11,
              label: '碳酸饮料',
              children: [
                { value: 12, label: '可乐' },
                { value: 13, label: '雪碧' },
                { value: 14, label: '芬达' }
              ]
            },
            {
              value: 15,
              label: '果汁',
              children: [
                { value: 16, label: '橙汁' },
                { value: 17, label: '苹果汁' },
                { value: 18, label: '葡萄汁' }
              ]
            }
          ]
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
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
        { label: '选项四', value: '4' }
      ]
    }
  },
  {
    label: '日期',
    fieldType: '',
    as: 'date-picker',
    schema: datePicker,
    props: {
      clearable: true
    }
  },
  {
    label: '日期范围',
    fieldType: '',
    as: 'date-range-picker',
    schema: datePickerRange,
    props: {
      clearable: true
    }
  },
  {
    label: '标签输入框',
    fieldType: [],
    as: 'input-tag',
    schema: inputTag,
    props: {
      clearable: true
    }
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
    props: {
      viewMode: 'list'
    }
  },
  {
    label: '占位盒子',
    as: ''
  }
]

// 以下是被注释的代码，保留原样
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
