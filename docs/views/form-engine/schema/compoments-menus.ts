import cascader from './components/cascader'
import checkbox from './components/checkbox'
import checkboxGroup from './components/checkbox-group'
import colorPicker from './components/color-picker'
import datePicker from './components/date-picker'
import datePickerRange from './components/date-range-picker'
import inputScheme from './components/input'
import inputNumberScheme from './components/input-number'
import inputTag from './components/input-tag'
import radioGroup from './components/radio-group'
import rate from './components/rate'
import selectScheme from './components/select'
import slider from './components/slider'
import sliderRange from './components/slider-range'
import _switch from './components/switch'
import tabsScheme from './components/tabs'
import textareaScheme from './components/textarea'
import upload from './components/upload'

export const componentsMenusSchema = [
  {
    label: 'Input',
    fieldType: '',
    as: 'input',
    schema: inputScheme,
    props: {
      clearable: true,
      type: 'text',
      align: 'left',
    },
  },
  {
    label: 'Textarea',
    fieldType: '',
    as: 'textarea',
    schema: textareaScheme,
    props: {
      clearable: true,
      showCount: true,
      maxLength: 500,
    },
  },
  {
    label: 'Number Input',
    fieldType: '',
    as: 'input-number',
    schema: inputNumberScheme,
    props: {
      align: 'left',
      step: 1,
      width: 100,
    },
  },

  {
    label: 'Radio Group',
    fieldType: '',
    as: 'radio-group',
    schema: radioGroup,
    props: {
      round: true,
      direction: 'x',
      iconable: false,
      options: [
        { label: 'Option A', value: '1' },
        { label: 'Option B', value: '2' },
        { label: 'Option C', value: '3' },
        { label: 'Option D', value: '4' },
      ],
    },
  },
  {
    label: 'Checkbox',
    fieldType: false,
    as: 'checkbox',
    schema: checkbox,
    props: {
      iconable: false,
      label: 'I agree to the terms of service',
    },
  },
  {
    label: 'Checkbox Group',
    fieldType: [],
    as: 'checkbox-group',
    schema: checkboxGroup,
    props: {
      iconable: false,
      direction: 'x',
      options: [
        { label: 'Option A', value: '1' },
        { label: 'Option B', value: '2' },
        { label: 'Option C', value: '3' },
        { label: 'Option D', value: '4' },
      ],
    },
  },

  {
    label: 'Select',
    fieldType: '',
    as: 'select',
    schema: selectScheme,
    props: {
      clearable: true,
      trigger: 'click',
      align: 'left',
      showCheckIcon: true,
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
        { label: 'Option 5', value: '5' },
      ],
    },
  },
  {
    label: 'Cascader',
    fieldType: '',
    as: 'cascader',
    schema: cascader,
    props: {
      clearable: true,
      label: 'Please select',
      free: true,
      trigger: 'click',
      options: [
        {
          value: 1,
          label: 'Food',
          children: [
            {
              value: 2,
              label: 'Fruits',
              children: [
                { value: 3, label: 'Apple' },
                { value: 4, label: 'Banana' },
                { value: 5, label: 'Orange' },
              ],
            },
            {
              value: 6,
              label: 'Vegetables',
              children: [
                { value: 7, label: 'Tomato' },
                { value: 8, label: 'Cucumber' },
                { value: 9, label: 'Carrot' },
              ],
            },
          ],
        },
        {
          value: 10,
          label: 'Drinks',
          children: [
            {
              value: 11,
              label: 'Soda',
              children: [
                { value: 12, label: 'Cola' },
                { value: 13, label: 'Sprite' },
                { value: 14, label: 'Fanta' },
              ],
            },
            {
              value: 15,
              label: 'Juice',
              children: [
                { value: 16, label: 'Orange Juice' },
                { value: 17, label: 'Apple Juice' },
                { value: 18, label: 'Grape Juice' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    label: 'Tabs',
    fieldType: '',
    as: 'tabs',
    schema: tabsScheme,
    props: {
      options: [
        { label: 'Tab 1', value: '1' },
        { label: 'Tab 2', value: '2' },
        { label: 'Tab 3', value: '3' },
        { label: 'Tab 4', value: '4' },
      ],
      type: 'block',
    },
  },
  {
    label: 'Rate',
    fieldType: '',
    as: 'rate',
    schema: rate,
    props: {
      count: 5,
    },
  },
  {
    label: 'Date',
    fieldType: '',
    as: 'date-picker',
    schema: datePicker,
    props: {
      clearable: true,
    },
  },
  {
    label: 'Date Range',
    fieldType: '',
    as: 'date-range-picker',
    schema: datePickerRange,
    props: {
      clearable: true,
    },
  },
  {
    label: 'Input Tag',
    fieldType: [],
    as: 'input-tag',
    schema: inputTag,
    props: {
      clearable: true,
    },
  },
  {
    label: 'Switch',
    fieldType: false,
    as: 'switch',
    schema: _switch,
    props: {
      round: true,
    },
  },
  {
    label: 'Upload',
    fieldType: [],
    as: 'upload',
    schema: upload,
    props: {
      viewMode: 'list',
    },
  },
  {
    label: 'Slider',
    fieldType: '',
    as: 'slider',
    schema: slider,
    props: {
      step: 1,
      options: [
        {
          label: '0',
          value: 0,
        },
        {
          label: '100',
          value: 100,
        },
      ],
    },
  },
  {
    label: 'Slider Range',
    fieldType: [],
    as: 'slider-range',
    schema: sliderRange,
    props: {
      step: 1,
      options: [
        {
          label: '0',
          value: 0,
        },
        {
          label: '100',
          value: 100,
        },
      ],
    },
  },
  {
    label: 'Color Picker',
    fieldType: '',
    as: 'color-picker',
    schema: colorPicker,
    props: {
      clearable: true,
    },
  },
  {
    label: 'Placeholder Box',
    as: '',
  },
]

// 以下是被注释的代码，保留原样

//   {
//     label: '范围滑块',
//     fieldType: [],
//     as: 'slider-range',
//     props: {
//       showCount: true,
//       maxLength: 30
//     }
//   },
