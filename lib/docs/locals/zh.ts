export default {
  name: 'zh',
  home: {
    title: 'Lew UI',
    description: '一个好看易用的 Vue3 组件库',
    getStarted: '立即开始',
    sloganTitle: '少即是多',
    slogan: '一个好看易用的 Vue3 组件库',
    home: '首页',
    install: '安装',
    components: '组件',
    formEngine: '表单引擎',
    descEngine: '描述引擎'
  },
  base: {
    base: '基础',
    navigator: '导航',
    form: '表单',
    data: '数据组件',
    feedback: '反馈'
  },
  components: {
    image: {
      name: '图片 Image',
      description: '让图片展示更优雅，支持懒加载、加载状态、失败处理等特性',
      demo1: {
        title: '基础用法'
      },
      demo2: {
        title: '加载状态',
        tipsTitle: '提示',
        tipsContent: '需要设置 width 和 height，才会有占位加载效果。'
      },
      demo3: {
        title: '加载失败'
      },
      props: {
        src: '图片地址',
        alt: '图片描述',
        width: '宽度',
        height: '高度',
        objectFit: '图片填充模式',
        objectPosition: '图片位置',
        lazy: '是否开启懒加载',
        loading: '是否显示加载中状态',
        title: '图片标题'
      }
    },
    avatar: {
      name: '头像 Avatar',
      description: '一个精致的头像组件，支持图片、图标和文字三种形式',
      demo1: {
        title: '基础用法'
      },
      demo2: {
        title: '状态'
      },
      demo3: {
        title: '默认头像'
      },
      demo4: {
        title: '形状'
      },
      props: {
        size: '尺寸',
        loading: '是否显示加载中状态',
        shape: '形状',
        src: '图片地址',
        alt: '图片描述',
        status: '状态',
        objectFit: '图片填充模式',
        objectPosition: '图片位置',
        statusPlacement: '状态位置'
      }
    },
    button: {
      name: '按钮 Button',
      description: '点击它，让交互更加丝滑流畅',
      demo1: {
        title: '基础用法'
      },
      demo2: {
        title: '色彩'
      },
      demo3: {
        title: '图标'
      },
      demo4: {
        title: '加载状态'
      },
      demo5: {
        title: '禁用状态'
      },
      demo6: {
        title: '支持 Promise'
      },
      props: {
        text: '按钮文字',
        type: '类型',
        size: '尺寸',
        singleIcon: '是否只显示图标',
        color: '颜色',
        round: '是否圆角',
        dashed: '是否虚线',
        loading: '是否显示加载中状态',
        disabled: '是否禁用状态',
        request: '是否请求'
      }
    },
    tag: {
      name: '标签 Tag',
      description: '小巧而强大的标记利器，为内容分类添姿添彩',
      demo1: {
        title: '基础用法'
      },
      demo2: {
        title: '类型'
      },
      demo3: {
        title: '尺寸'
      },
      demo4: {
        title: '色彩'
      },
      demo5: {
        title: '禁用'
      },
      demo6: {
        title: '可关闭'
      },
      demo7: {
        title: '插槽'
      },
      props: {
        text: '标签文字',
        type: '类型',
        size: '尺寸',
        color: '颜色',
        closable: '是否可关闭',
        disabled: '是否禁用',
        round: '是否圆角'
      }
    },
    badge: {
      name: '徽章 Badge',
      description: '在右上角绽放的小红点，让提醒更加醒目',
      demo1: {
        title: '基础用法'
      },
      demo2: {
        title: '自定义内容'
      },
      demo3: {
        title: '尺寸'
      },
      demo4: {
        title: '颜色'
      }
    },
    title: {
      name: '标题 Title',
      description: '不只是标题，更是内容的灵魂提示'
    },
    textTrim: {
      name: '文本截断 TextTrim',
      description: '优雅地处理过长文本，不让它破坏布局的美感'
    },
    flex: {
      name: '弹性布局 Flex',
      description: '灵活的布局方案，让页面排版如臂使指'
    },
    mark: {
      name: '标记 Mark',
      description: '为文字添加高亮标记，让重点内容一目了然'
    },
    icon: {
      name: '图标 Icon',
      description: '精美的图标集合，为界面增添视觉语言'
    },
    backTop: {
      name: '返回顶部 BackTop',
      description: '一键回到顶部，让长页面浏览不再烦恼'
    },
    steps: {
      name: '步骤条 Steps',
      description: '清晰展示操作流程，让用户知道自己在哪'
    },
    menu: {
      name: '菜单 Menu',
      description: '优雅的垂直菜单，让导航层次分明'
    },
    menuTree: {
      name: '菜单树 MenuTree',
      description: '层级分明的树形菜单，轻松展示复杂的结构关系'
    },
    dropdown: {
      name: '下拉菜单 Dropdown',
      description: '点击触发的悬浮菜单，让操作更加便捷'
    },
    breadcrumb: {
      name: '面包屑 Breadcrumb',
      description: '清晰的路径导航，让用户不会迷失方向'
    },
    contextMenu: {
      name: '上下文菜单 ContextMenu',
      description: '优雅的右键菜单，让操作更加自然'
    },
    form: {
      name: '表单 Form',
      description: '强大的表单处理能力，让数据收集得心应手'
    },
    input: {
      name: '输入框 Input',
      description: '功能丰富的输入框，让数据录入更加便捷'
    },
    inputNumber: {
      name: '数字输入框 InputNumber',
      description: '专门用于数字输入的框，让数字处理更加精准'
    },
    textarea: {
      name: '文本域 Textarea',
      description: '多行文本输入框，让长文本输入更加舒适'
    },
    inputTag: {
      name: '标签输入框 InputTag',
      description: '轻松输入和管理多个标签，让数据整理更加清晰'
    },
    checkbox: {
      name: '复选框 Checkbox',
      description: '支持多选的选择器，让多项选择更加直观'
    },
    radio: {
      name: '单选框 Radio',
      description: '只能选择一项的选择器，让单项选择更加明确'
    },
    tabs: {
      name: '标签页 Tabs',
      description: '让内容分类展示更加清晰，切换更加流畅'
    },
    select: {
      name: '选择器 Select',
      description: '下拉选择框，让选择更加便捷'
    },
    selectMultiple: {
      name: '多选选择器 SelectMultiple',
      description: '支持多选的下拉框，让多项选择更加灵活'
    },
    datePicker: {
      name: '日期选择器 DatePicker',
      description: '简单直观的日期选择工具，让时间选择更加精确'
    },
    dateRangePicker: {
      name: '日期范围选择器 DateRangePicker',
      description: '选择时间范围的利器，让区间选择更加方便'
    },
    cascader: {
      name: '级联选择器 Cascader',
      description: '处理多层级数据的选择器，让分类选择更加清晰'
    },
    treeSelect: {
      name: '树形选择器 TreeSelect',
      description: '树形结构的选择框，让层级选择更加直观'
    },
    inputTable: {
      name: '表格输入框 InputTable',
      description: '在表格中快速输入数据，让批量处理更加高效'
    },
    switch: {
      name: '开关 Switch',
      description: '简洁的开关选择器，让状态切换更加明确'
    },
    slider: {
      name: '滑块 Slider',
      description: '通过拖动选择数值，让数值选择更加直观'
    },
    sliderRange: {
      name: '滑块范围 SliderRange',
      description: '选择数值范围的滑块，让范围选择更加灵活'
    },
    rate: {
      name: '评分 Rate',
      description: '星星评分组件，让打分更加生动有趣'
    },
    colorPicker: {
      name: '颜色选择器 ColorPicker',
      description: '丰富的颜色选择工具，让配色更加精准'
    },
    upload: {
      name: '上传 Upload',
      description: '文件上传组件，让文件处理更加简单'
    },
    table: {
      name: '表格 Table',
      description: '功能强大的表格组件，让数据展示更加清晰'
    },
    pagination: {
      name: '分页 Pagination',
      description: '清晰的分页导航，让数据浏览更加轻松'
    },
    magicNumber: {
      name: '魔法数字 MagicNumber',
      description: '让数字展示更加生动有趣的动效组件'
    },
    tree: {
      name: '树形控件 Tree',
      description: '展示层级数据结构的利器，让数据层次更加分明'
    },
    collapse: {
      name: '折叠面板 Collapse',
      description: '可折叠和展开的内容区域，让信息展示更加整洁'
    },
    desc: {
      name: '描述列表 Desc',
      description: '整齐的展示多个字段，让信息展示更加规范'
    },
    alert: {
      name: '警告提示 Alert',
      description: '醒目的信息提示框，让警告更加温和'
    },
    message: {
      name: '全局提示 Message',
      description: '轻量级的信息反馈，让提示更加简洁'
    },
    notification: {
      name: '通知提醒框 Notification',
      description: '优雅的通知提醒，让消息推送更加友好'
    },
    drawer: {
      name: '抽屉 Drawer',
      description: '从屏幕边缘滑出的面板，让临时操作更加流畅'
    },
    dialog: {
      name: '对话框 Dialog',
      description: '模态对话框，让重要信息交互更加突出'
    },
    modal: {
      name: '模态框 Modal',
      description: '更加灵活的模态窗口，让弹窗交互更加丰富'
    },
    popok: {
      name: '气泡确认框 Popok',
      description: '轻量级的确认提示，让操作确认更加便捷'
    },
    popover: {
      name: '气泡卡片 Popover',
      description: '鼠标悬停时的信息卡片，让提示更加优雅'
    },
    tooltip: {
      name: '文字提示 Tooltip',
      description: '简单的文字提示气泡，让提示更加轻巧'
    },
    loading: {
      name: '加载 Loading',
      description: '优雅的加载效果，让等待更加轻松'
    },
    result: {
      name: '结果 Result',
      description: '用于反馈操作结果，让结果展示更加完整'
    },
    empty: {
      name: '空状态 Empty',
      description: '空数据状态展示，让空白页面更加友好'
    }
  }
}
