export default {
  name: 'zh',
  home: {
    title: 'Lew UI',
    description: '一个好看易用的 Vue3 组件库',
    getStarted: '立即开始',
    home: '首页',
    install: '安装',
    components: '组件',
    formEngine: '表单引擎',
    descEngine: '描述引擎'
  },
  components: {
    image: {
      name: '图片',
      description: '图片',
      demo1: '普通',
      demo2: '加载中',
      demo3: '加载失败',
      props: {
        src: '图片源URL',
        alt: '图片替代文本',
        width: '图片宽度',
        height: '图片高度',
        objectFit: '图片适应容器方式',
        objectPosition: '图片在容器中的位置',
        lazy: '是否启用懒加载',
        loading: '是否处于加载状态',
        title: '图片标题'
      }
    },
    input: {
      name: '',
      description: 'Image',
      demo1: 'common',
      demo2: 'loading',
      demo3: 'error',
      model: {
        modelValue: '输入框的值，支持 v-model 双向绑定',
        prefixesValue: '输入框前缀的值',
        suffixValue: '输入框后缀的值'
      },
      props: {
        type: '输入框类型',
        size: '尺寸',
        placeholder: '输入框占位文本',
        disabled: '是否禁用输入框',
        readonly: '是否将输入框设为只读',
        clearable: '是否显示清空按钮',
        showPassword: '是否显示切换密码可见性的按钮',
        maxLength: '输入框最大字符数',
        showCount: '是否显示字符计数（仅在 type 为 text 时有效）',
        align: '输入框文本对齐方式',
        minWidth: '输入框最小宽度，支持数字（单位：像素）或带单位的字符串',
        autoWidth: '是否根据内容自动调整宽度',
        selectByFocus: '聚焦时是否自动选中输入框内容',
        copyable:
          '是否允许复制内容（仅在 readonly 为 true 且 suffix 为 false 时生效）',
        prefixes: '输入框前缀类型',
        prefixesOptions: '输入框前缀选项列表，当 prefixes 为 select 时使用',
        prefixesTooltip: '输入框前缀的 tooltip 提示文本',
        suffix: '输入框后缀类型',
        suffixOptions: '输入框后缀选项列表，当 suffix 为 select 时使用',
        suffixTooltip: '输入框后缀的 tooltip 提示文本',
        okByEnter: '是否允许通过回车键确认输入'
      },
      default: {
        placeholder: '请输入'
      }
    }
  }
}
