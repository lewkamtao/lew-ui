const contextMenu = {
    label: 'Testo visualizzato',
    value: 'Valore',
    renderIcon: 'Funzione di rendering icona',
    children: 'Collezione di nodi figli',
    disabled: 'Opzione disabilitata',
    isDividerLine: 'È una linea divisoria',
    checkbox: 'È una casella di controllo',
    checked: 'È selezionato'
  }
  
  export default {
    name: 'it',
    home: {
      title: 'Lew UI',
      description: 'Una bellissima e facile da usare libreria di componenti Vue3',
      getStarted: 'Inizia ora',
      sloganTitle: 'Meno è più',
      slogan: 'Una bellissima e facile da usare libreria di componenti Vue3',
      home: 'Home',
      install: 'Installazione',
      components: 'Componenti',
      formEngine: 'Motore dei form',
      descEngine: 'Motore delle descrizioni'
    },
    base: {
      base: 'Base',
      navigator: 'Navigazione',
      form: 'Form',
      data: 'Componenti dati',
      feedback: 'Feedback',
      close: 'Chiudi',
      showCode: 'Mostra codice'
    },
    components: {
      image: {
        name: 'Immagine',
        description: 'Visualizzazione elegante delle immagini con supporto per caricamento lazy, stati di caricamento e gestione degli errori',
        demo1: {
          title: 'Utilizzo base'
        },
        demo2: {
          title: 'Stato di caricamento',
          tipsTitle: 'Suggerimenti',
          tipsContent: 'È necessario impostare larghezza e altezza per avere un effetto placeholder durante il caricamento.'
        },
        demo3: {
          title: 'Errore di caricamento'
        },
        props: {
          src: 'URL dell\'immagine',
          alt: 'Descrizione dell\'immagine',
          width: 'Larghezza',
          height: 'Altezza',
          objectFit: 'Modalità di riempimento',
          objectPosition: 'Posizione dell\'immagine',
          lazy: 'Attiva caricamento lazy',
          loading: 'Mostra stato di caricamento',
          title: 'Titolo dell\'immagine'
        }
      },
      avatar: {
        name: 'Avatar',
        description: 'Un elegante componente avatar che supporta formati immagine, icona e testo',
        demo1: {
          title: 'Utilizzo base'
        },
        demo2: {
          title: 'Stato'
        },
        demo3: {
          title: 'Avatar predefinito'
        },
        demo4: {
          title: 'Forma'
        },
        props: {
          size: 'Dimensione',
          loading: 'Mostra stato di caricamento',
          shape: 'Forma',
          src: 'URL dell\'immagine',
          alt: 'Descrizione dell\'immagine',
          status: 'Stato',
          objectFit: 'Modalità di riempimento',
          objectPosition: 'Posizione dell\'immagine',
          statusPlacement: 'Posizione dello stato'
        }
      },
      button: {
        name: 'Pulsante',
        description: 'Rendi le tue interazioni più fluide con un semplice clic',
        demo1: {
          title: 'Utilizzo base'
        },
        demo2: {
          title: 'Colore'
        },
        demo3: {
          title: 'Icona'
        },
        demo4: {
          title: 'Stato di caricamento'
        },
        demo5: {
          title: 'Stato disabilitato'
        },
        demo6: {
          title: 'Supporto Promise'
        },
        props: {
          text: 'Testo del pulsante',
          type: 'Tipo',
          size: 'Dimensione',
          singleIcon: 'Mostra solo icona',
          color: 'Colore',
          round: 'Arrotondato',
          dashed: 'Tratteggiato',
          loading: 'Mostra stato di caricamento',
          disabled: 'Stato disabilitato',
          request: 'Richiesta'
        }
      },
      tag: {
        name: 'Etichetta',
        description: 'Uno strumento di marcatura piccolo ma potente che aggiunge colore alla classificazione dei contenuti',
        demo1: {
          title: 'Utilizzo base'
        },
        demo2: {
          title: 'Tipo'
        },
        demo3: {
          title: 'Dimensione'
        },
        demo4: {
          title: 'Colore'
        },
        demo5: {
          title: 'Disabilitato'
        },
        demo6: {
          title: 'Chiudibile'
        },
        demo7: {
          title: 'Slot'
        },
        props: {
          text: 'Testo dell\'etichetta, ha priorità sullo slot, l\'effetto text-trim si attiva quando viene superata la larghezza',
          type: 'Tipo di stile',
          size: 'Dimensione',
          color: 'Tema colore',
          closable: 'Chiudibile',
          disabled: 'Disabilitato',
          round: 'Arrotondato'
        }
      },
      badge: {
        name: 'Badge',
        description: 'Un piccolo punto rosso che fiorisce nell\'angolo superiore destro, rendendo le notifiche più evidenti',
        demo1: {
          title: 'Utilizzo base'
        },
        demo2: {
          title: 'Punto'
        },
        demo3: {
          title: 'Utilizzo diretto'
        },
        demo4: {
          title: 'Testo'
        },
        demo5: {
          title: 'In elaborazione'
        },
        props: {
          text: 'Testo del badge',
          offset: 'Offset del badge',
          processing: 'In elaborazione',
          max: 'Valore massimo, verrà mostrato come max+ se superato',
          color: 'Colore del badge',
          disabled: 'Disabilitato',
          value: 'Valore del badge (verrà mostrato come punto se vuoto)'
        }
      },
      title: {
        name: '标题 Title',
        description: '不只是标题，更是内容的灵魂提示',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '粗体'
        },
        demo3: {
          title: '色彩'
        },
        props: {
          text: '文本内容',
          size: '标题文字大小，可以是数字（单位：像素）或字符串（如 "1.5em"）',
          bold: '标题文字粗细程度，可选值为 100 到 900 之间的整百数',
          color: '标题文字颜色，可选值包括预定义的颜色名称或自定义的颜色值'
        }
      },
      textTrim: {
        name: '文本截断 TextTrim',
        description: '优雅地处理过长文本，不让它破坏布局的美感',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '多行省略'
        },
        demo3: {
          title: '末端文本'
        },
        demo4: {
          title: '对齐方式'
        },
        props: {
          text: '文本内容',
          lineClamp: '文本显示的最大行数，超出部分将被截断',
          allowHTML: '是否允许渲染 HTML 标签',
          placement: '提示框的显示位置',
          offset: '提示框相对于目标元素的偏移量 [x, y]（单位：像素）',
          textAlign: 'x轴对齐方向（当宽度小于容器宽度时）',
          delay: '显示和隐藏提示框的延迟时间 [显示延迟, 隐藏延迟]（单位：毫秒）',
          reserveEnd:
            '保留末尾的字符数量，当文本溢出时会在中间显示省略号，保留开头和指定数量的末尾字符'
        }
      },
      flex: {
        name: '弹性布局 Flex',
        description: '灵活的布局方案，让页面排版如臂使指',
        demo1: {
          title: 'Row'
        },
        demo2: {
          title: 'Column'
        },
        demo3: {
          title: 'Mode'
        },
        props: {
          direction: '子元素的排列方向',
          x: '子元素在水平方向上的对齐方式',
          y: '子元素在垂直方向上的对齐方式',
          mode: '子元素的分布模式，会覆盖 x 或 y 的对齐设置，具体影响取决于 direction 的值',
          wrap: '是否允许子元素在空间不足时自动换行',
          gap: '子元素之间的间距（单位：像素）',
          width: 'Flex 容器的宽度（单位：像素或百分比）'
        }
      },
      mark: {
        name: '标记 Mark',
        description: '为文字添加高亮标记，让重点内容一目了然',
        demo1: {
          title: '基础用法'
        },
        props: {
          color: '颜色主题',
          round: '是否圆角',
          bold: '是否加粗',
          cursor: '鼠标悬停时的光标样式'
        }
      },
      icon: {
        name: '图标 Icon',
        description: '精美的图标集合，为界面增添视觉语言'
      },
      backTop: {
        name: '返回顶部 BackTop',
        description: '一键回到顶部，让长页面浏览不再烦恼',
        demo1: {
          title: '基本用法'
        },
        demo2: {
          title: '自定义内容'
        },
        demo3: {
          title: '指令方式触发'
        },
        props: {
          target:
            '指定触发滚动事件的目标元素，使用 CSS 选择器。如果为空，则默认为整个窗口。',
          right: '设置组件距离页面右侧的距离，单位为像素。',
          bottom: '设置组件距离页面底部的距离，单位为像素。',
          valveHeight:
            '设置页面滚动高度的阈值，当滚动高度超过此值时显示回到顶部按钮，单位为像素。'
        },
        events: {
          click: '回到顶部事件回调'
        }
      },
      steps: {
        name: '步骤条 Steps',
        description: '清晰展示操作流程，让用户知道自己在哪',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '状态'
        },
        demo3: {
          title: '加载中'
        },
        model: {
          modelValue: '当前激活步骤的索引值'
        },
        props: {
          options: '步骤配置项数组',
          status: '步骤条的当前状态',
          minWidth: '最小步骤宽度'
        }
      },
      menu: {
        name: '菜单 Menu',
        description: '优雅的垂直菜单，让导航层次分明',
        demo1: {
          title: '基础用法'
        },
        model: {
          modelValue: '当前激活菜单的绑定值'
        },
        props: {
          options: '菜单配置项数组'
        },
        menuOptions: {
          label: '菜单项的文本',
          value: '菜单项的值',
          children: '子菜单项数组',
          disabled: '是否禁用菜单项',
          icon: '菜单项的图标',
          tagText: '菜单项的徽章文本',
          tagColor: '菜单项的徽章颜色'
        }
      },
      menuTree: {
        name: '菜单树 MenuTree',
        description: '层级分明的树形菜单，轻松展示复杂的结构关系',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自定义图标'
        },
        demo3: {
          title: '默认展开',
          description: '通过 v-model 控制默认展开的菜单项。'
        },
        demo4: {
          title: '标签'
        },
        demo5: {
          title: '自定义样式'
        },
        model: {
          modelValue: '当前激活菜单的绑定值',
          expandKeys: '默认展开的菜单项的 key 值数组',
          collapsed: '是否折叠菜单'
        },
        props: {
          options: '菜单树的数据源，支持嵌套结构。',
          width: '菜单树的宽度，支持 CSS 宽度值。'
        },
        menuTreeItem: {
          label:
            '菜单树项的标题文本。也可以使用具名插槽 "label" 自定义标题内容。',
          value: '菜单项的值，用于标识菜单项的唯一性。',
          level: '菜单树项的层级，从 1 开始。',
          renderIcon: '图标渲染函数',
          renderLabel: '标签渲染函数',
          tagText: '菜单项的徽章文本',
          tagType: '菜单项的徽章类型',
          tagColor: '菜单项的徽章颜色',
          disabled: '是否禁用菜单项',
          isLeaf: '是否为叶子节点'
        }
      },
      dropdown: {
        name: '下拉菜单 Dropdown',
        description: '点击触发的悬浮菜单，让操作更加便捷',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '不仅仅是按钮'
        },
        demo3: {
          title: '禁用项'
        },
  
        props: {
          options: '菜单选项配置',
          trigger: '触发方式',
          placement: '菜单弹出位置'
        },
        'options(ContextMenus)': contextMenu,
        events: {
          show: '菜单显示事件回调',
          hide: '菜单隐藏事件回调',
          change: '菜单项选择事件回调'
        }
      },
      breadcrumb: {
        name: '面包屑 Breadcrumb',
        description: '清晰的路径导航，让用户不会迷失方向',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自定义当前选中'
        },
        demo3: {
          title: '分割图标类型'
        },
        props: {
          options: '面包屑配置项数组',
          separator: '分隔符图标类型'
        },
        breadcrumbOptions: {
          label: '面包屑项的文本',
          value: '面包屑项的值',
          active: '是否为当前选中项'
        },
        events: {
          change: '面包屑项发生变化时触发'
        }
      },
      contextMenu: {
        name: '上下文菜单 ContextMenu',
        description: '优雅的右键菜单，让操作更加自然',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '支持多级嵌套'
        },
        demo3: {
          title: '支持动态更新'
        },
        demo4: {
          title: 'Checkbox'
        },
        props: {
          options: '右键菜单配置',
          disabled: '是否禁用右键菜单',
          selectHandler: '选中菜单项时的回调函数'
        },
        'options(ContextMenus)': contextMenu
      },
      form: {
        name: '表单 Form',
        description: '强大的表单处理能力，让数据收集得心应手',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '方向'
        },
        demo3: {
          title: '自定义校验'
        },
        demo4: {
          title: '支持网格布局'
        },
        demo5: {
          title: '搭配表单引擎配置'
        },
        props: {
          options: '定义表单结构和内容的配置选项数组',
          size: '表单整体尺寸，影响所有表单项大小',
          width: '表单整体宽度，支持数字（像素）或百分比字符串',
          columns: '每行显示的表单项数量，最大值为4',
          labelWidth: '表单项标签宽度，支持数字（像素）或 "auto"',
          disabled: '是否禁用整个表单',
          readonly: '是否将整个表单设为只读',
          direction: '表单项排列方向，"x" 为水平，"y" 为垂直',
          formMethods: '表单项的方法集合，包含用于操作表单的函数'
        },
        formItemProps: {
          label: '表单项的标签文本',
          field: '表单项对应的字段名，用于数据绑定和验证',
          required: '是否为必填项',
          as: '指定表单项的类型，如 "input"、"select" 等',
          size: '单个表单项的尺寸，可覆盖表单整体设置',
          width: '单个表单项的宽度，支持数字（像素）或百分比字符串',
          labelWidth: '单个表单项标签宽度，支持数字（像素）或 "auto"',
          direction: '单个表单项的排列方向，"x" 为水平，"y" 为垂直',
          disabled: '是否禁用该表单项',
          readonly: '是否将该表单项设为只读',
          tips: '表单项的提示信息',
          errMessage: '自定义验证失败时的错误提示',
          rule: '表单项的验证规则',
          props: '传递给表单项组件的额外属性',
          between: '水平排列时是否在表单项之间添加间隔',
          gridArea: '在网格布局中的位置',
          outputFormat: '出参时的格式化方法',
          inputFormat: '入参时的格式化方法'
        },
        events: {
          mounted: '表单项挂载时触发'
        },
        methods: {
          getForm: '获取表单',
          setForm: '设置表单'
        }
      },
      input: {
        name: '输入框 Input',
        description: '功能丰富的输入框，让数据录入更加便捷',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '前后缀'
        },
        demo3: {
          title: '字数限制'
        },
        demo4: {
          title: '对齐方式'
        },
        demo5: {
          title: '密码可见'
        },
        demo6: {
          title: '宽度自适应'
        },
        demo7: {
          title: '聚焦后选择全部文本'
        },
        demo8: {
          title: '可清空的'
        },
        demo9: {
          title: '只读状态'
        },
        demo10: {
          title: '禁用状态'
        },
        demo11: {
          title: '按下回车键触发事件'
        },
        props: {
          type: '输入框类型',
          size: '输入框尺寸',
          placeholder: '输入框占位文本',
          disabled: '是否禁用输入框',
          readonly: '是否将输入框设为只读',
          clearable: '是否启用清除按钮',
          showPassword: '是否启用密码可见',
          maxLength: '最大输入长度',
          showCount: '是否显示字符计数（仅在 type 为 text 时有效）',
          align: '输入框文本对齐方式',
          minWidth: '输入框最小宽度，支持数字（单位：像素）或带单位的字符串',
          autoWidth: '是否根据内容自动调整宽度',
          selectByFocus: '是否启用聚焦后选择全部文本',
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
        events: {
          change: '输入框值发生变化时触发',
          focus: '输入框获得焦点时触发',
          blur: '输入框失去焦点时触发',
          input: '输入框输入内容时触发',
          clear: '输入框清空时触发',
          ok: '输入框确认时触发'
        }
      },
      inputNumber: {
        name: '数字输入框 InputNumber',
        description: '专门用于数字输入的框，让数字处理更加精准',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '聚焦时全选'
        },
        demo3: {
          title: '限制范围'
        },
        demo4: {
          title: '精确数值'
        },
        demo5: {
          title: '禁用和只读'
        },
        props: {
          min: '最小值',
          max: '最大值',
          step: '步进值',
          disabled: '精度',
          size: '尺寸大小，可选值：small、medium、large',
          placeholder: '占位提示文本',
          readonly: '是否只读',
          width: '宽度，支持数字（单位：像素）或带单位的字符串',
          align: '对齐方式',
          selectByFocus: '聚焦后选择全部文本'
        },
        model: {
          modelValue: '绑定值'
        }
      },
      textarea: {
        name: '文本域 Textarea',
        description: '多行文本输入框，让长文本输入更加舒适',
  
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '字数限制'
        },
        demo3: {
          title: '聚焦后选择全部文本'
        },
        demo4: {
          title: '可清空的'
        },
        demo5: {
          title: '只读'
        },
        demo6: {
          title: '禁用'
        },
        demo7: {
          title: '按下回车键触发事件'
        },
        demo8: {
          title: '可缩放的'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          placeholder: '占位提示文本',
          disabled: '是否禁用文本域',
          readonly: '是否为只读状态',
          clearable: '是否显示清空按钮',
          showCount: '是否显示字符计数',
          maxLength: '最大输入字符数',
          size: '文本域尺寸',
          resize: '调整尺寸的方向',
          width: '宽度',
          height: '高度',
          minWidth: '最小宽度',
          minHeight: '最小高度',
          maxWidth: '最大宽度',
          maxHeight: '最大高度',
          selectByFocus: '聚焦后选择全部文本',
          okByEnter: '是否启用回车键确认（启用后，Shift+Enter可换行）'
        },
        events: {
          change: '值发生变化时触发',
          focus: '获得焦点时触发',
          blur: '失去焦点时触发',
          input: '输入内容时触发',
          clear: '清空时触发',
          ok: '确认时触发'
        }
      },
      inputTag: {
        name: '标签输入框 InputTag',
        description: '轻松输入和管理多个标签，让数据整理更加清晰',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '尺寸'
        },
        demo3: {
          title: '是否允许重复'
        },
        demo4: {
          title: '受控默认值'
        },
        demo5: {
          title: '可清空的'
        },
        demo6: {
          title: '只读状态'
        },
        demo7: {
          title: '禁用状态'
        },
        demo8: {
          title: '最大输入长度'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          size: '尺寸大小',
          disabled: '是否禁用',
          clearable: '是否可清空',
          placeholder: '占位提示文本',
          readonly: '是否只读',
          allowDuplicates: '是否允许重复',
          maxLength: '允许添加标签的最大数量',
          width: '宽度'
        },
        events: {
          change: '值发生变化时触发',
          clear: '清空时触发',
          add: '添加标签时触发',
          remove: '删除标签时触发'
        }
      },
      checkbox: {
        name: '复选框 Checkbox',
        description: '支持多选的选择器，让多项选择更加直观',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '垂直分布'
        },
        demo3: {
          title: '块状'
        },
        demo4: {
          title: '圆形'
        },
        demo5: {
          title: '只读状态'
        },
        demo6: {
          title: '禁用状态'
        },
        demo7: {
          title: '单个模式'
        },
        'model(CheckboxGroup)': {
          modelValue: '绑定值'
        },
        'model(Checkbox)': {
          modelValue: '绑定值'
        },
        'props(CheckboxGroup)': {
          options: '选项',
          disabled: '是否禁用',
          readonly: '是否只读',
          size: '尺寸大小',
          direction: '排列方向',
          block: '块状显示',
          round: '圆角样式',
          iconable: '是否可使用图标'
        },
        'props(Checkbox)': {
          label: '标题',
          value: '值',
          disabled: '禁用',
          readonly: '只读',
          checked: '选中状态',
          size: '尺寸',
          block: '块状显示',
          round: '圆角样式',
          iconable: '是否可使用图标',
          certain: '确定状态'
        },
        'events(Checkbox)': {
          change: '值发生变化时触发'
        },
        'events(CheckboxGroup)': {
          change: '值发生变化时触发'
        },
        options: {
          label: '标题',
          value: '值',
          disabled: '禁用'
        }
      },
      radio: {
        name: '单选框 Radio',
        description: '只能选择一项的选择器，让单项选择更加明确',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '垂直分布'
        },
        demo3: {
          title: '块状'
        },
        demo4: {
          title: '形状'
        },
        demo5: {
          title: '只读状态'
        },
        demo6: {
          title: '禁用状态'
        },
        model: {
          modelValue: '绑定值'
        },
        'props(RadioGroup)': {
          size: '尺寸大小',
          block: '块状显示',
          direction: '排列方向',
          disabled: '是否禁用',
          iconable: '是否可使用图标',
          options: '选项',
          readonly: '是否只读',
          round: '圆角样式'
        },
        options: {
          label: '标题',
          value: '值',
          disabled: '禁用'
        },
        events: {
          change: '值发生变化时触发'
        }
      },
      tabs: {
        name: '标签页 Tabs',
        description: '让内容分类展示更加清晰，切换更加流畅',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自适应宽度'
        },
        demo3: {
          title: '自定义item宽度'
        },
        demo4: {
          title: '线'
        },
        demo5: {
          title: '圆角的'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          options: '选项',
          type: '类型',
          size: '尺寸大小',
          width: '宽度',
          itemWidth: '项宽度',
          round: '圆角样式',
          disabled: '禁用状态',
          readonly: '只读状态'
        },
        options: {
          label: '标题',
          value: '值'
        }
      },
      select: {
        name: '选择器 Select',
        description: '下拉选择框，让选择更加便捷',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '搜索'
        },
        demo3: {
          title: '支持插槽'
        },
        demo4: {
          title: '禁用选项'
        },
        demo5: {
          title: '只读'
        },
        demo6: {
          title: '禁用'
        },
        demo7: {
          title: '自定义空状态'
        },
        demo8: {
          title: '分组'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          defaultValue: '默认值',
          options: '选项',
          width: '宽度',
          trigger: '触发方式',
          placeholder: '占位提示文本',
          size: '尺寸大小',
          itemHeight: '项高度',
          searchable: '是否可搜索',
          searchMethod: '搜索方法',
          searchDelay: '搜索延迟',
          clearable: '是否可清空',
          readonly: '只读状态',
          disabled: '禁用状态',
          showCheckIcon: '显示勾选图标'
        },
        events: {
          change: '值发生变化时触发',
          clear: '清空时触发',
          blur: '失去焦点时触发',
          focus: '获得焦点时触发'
        },
        options: { label: '标题', value: '值', disabled: '禁用' },
        slots: { item: '自定义选项内容', empty: '自定义空状态内容' }
      },
      selectMultiple: {
        name: '多选选择器 SelectMultiple',
        description: '支持多选的下拉框，让多项选择更加灵活',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自定义过滤方法'
        },
        demo3: {
          title: '支持插槽'
        },
        demo4: {
          title: '禁用选项'
        },
        demo5: {
          title: '只读'
        },
        demo6: {
          title: '禁用'
        },
        demo7: {
          title: '空状态插槽'
        },
        demo8: {
          title: '分组'
        },
        props: {
          options: '选项',
          trigger: '触发方式',
          width: '宽度',
          valueLayout: '值布局',
          valueTextSplit: '值文本分隔符',
          placeholder: '占位提示文本',
          size: '尺寸大小',
          itemHeight: '项高度',
          searchable: '是否可搜索',
          searchPlaceholder: '搜索占位提示文本',
          searchMethod: '搜索方法',
          searchDelay: '搜索延迟',
          clearable: '是否可清空',
          readonly: '只读',
          disabled: '禁用',
          showCheckIcon: '显示勾选图标',
          defaultValue: '默认值'
        },
        model: {
          modelValue: '绑定值'
        },
        events: { change: '值变化', blur: '失去焦点', focus: '获得焦点' },
        options: { label: '标签', value: '值', disabled: '禁用' },
        slots: { item: '自定义选项内容', empty: '自定义空状态内容' }
      },
      datePicker: {
        name: '日期选择器 DatePicker',
        description: '简单直观的日期选择工具，让时间选择更加精确',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '可清空的'
        },
        demo3: {
          title: '自定义格式'
        },
        demo4: {
          title: '预设'
        },
        demo5: {
          title: '只读'
        },
        demo6: {
          title: '禁用'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          valueFormat: '值格式',
          size: '尺寸',
          width: '宽度',
          placeholder: '占位提示文本',
          clearable: '是否可清空',
          readonly: '只读',
          disabled: '禁用',
          presets: '预设值'
        },
        events: {
          change: '值变化',
          focus: '获得焦点',
          blur: '失去焦点',
          clear: '清空'
        }
      },
      dateRangePicker: {
        name: '日期范围选择器 DateRangePicker',
        description: '选择时间范围的利器，让区间选择更加方便',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '可清空的'
        },
        demo3: {
          title: '其他'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          startKey: '开始键',
          endKey: '结束键',
          valueFormat: '值格式',
          size: '尺寸',
          width: '宽度',
          placeholderStart: '开始占位提示文本',
          placeholderEnd: '结束占位提示文本',
          clearable: '是否可清空',
          readonly: '只读',
          disabled: '禁用'
        },
        events: {
          change: '值变化',
          focus: '获得焦点',
          blur: '失去焦点',
          clear: '清空'
        }
      },
      cascader: {
        name: '级联选择器 Cascader',
        description: '处理多层级数据的选择器，让分类选择更加清晰',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自由模式'
        },
        demo3: {
          title: '仅展示最后层级'
        },
        demo4: {
          title: '异步加载'
        },
        demo5: {
          title: '可清空的'
        },
        demo6: {
          title: '只读'
        },
        demo7: {
          title: '禁用'
        },
        demo8: {
          title: '选项禁用'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          width: '宽度',
          options: '选项',
          placeholder: '占位提示文本',
          disabled: '禁用',
          clearable: '是否可清空',
          showAllLevels: '显示所有层级',
          multiple: '是否多选',
          free: '自由选择',
          size: '尺寸',
          trigger: '触发方式',
          loadMethod: '加载方法',
          readonly: '只读'
        },
        options: {
          label: '标签',
          value: '值',
          isLeaf: '是否叶子节点',
          children: '子节点',
          disabled: '禁用'
        }
      },
      treeSelect: {
        name: '树形选择器 TreeSelect',
        description: '树形结构的选择框，让层级选择更加直观',
        demo1: {
          title: '常规'
        },
        demo2: {
          title: '异步加载数据'
        },
        demo3: {
          title: '自定义插槽'
        },
        demo4: {
          title: '禁用项'
        },
        demo5: {
          title: '默认展开全部'
        },
        demo6: {
          title: '可搜索'
        },
        demo7: {
          title: '空状态插槽'
        },
        demo8: {
          title: '其他'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          dataSource: '树形数据源',
          defaultValue: '默认选中值',
          placeholder: '占位文本',
          size: '组件尺寸大小',
          disabled: '是否禁用',
          clearable: '是否可清空',
          showCheckbox: '是否显示复选框',
          showAllLevels: '是否显示所有层级',
          showCheckIcon: '是否显示选择图标',
          showLine: '是否显示连接线',
          expandAll: '是否展开全部节点',
          searchable: '是否可搜索',
          searchDelay: '搜索延迟时间（毫秒）',
          readonly: '是否只读',
          free: '是否为自由模式（父子节点选中状态不关联）',
          align: '文本对齐方式',
          trigger: '子节点触发方式',
          keyField: '节点标识字段',
          labelField: '节点标签字段',
          disabledField: '禁用节点字段',
          initTree: '初始化树节点的方法',
          loadMethod: '异步加载子节点数据的方法'
        },
        slots: {
          handle: '插槽名'
        }
      },
      inputTable: {
        name: '表格输入框 InputTable',
        description: '在表格中快速输入数据，让批量处理更加高效',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '默认值'
        },
        demo3: {
          title: '更丰富'
        },
        props: {
          columns: '列配置',
          size: '尺寸',
          width: '宽度',
          rowKey: '行键',
          batchDeletable: '是否支持批量删除',
          addable: '是否可添加',
          defaultForm: '默认表单',
          deletable: '是否可删除',
          maxRows: '最大行数',
          minRows: '最小行数',
          clearable: '是否可清空',
          sortable: '是否可排序',
          autoUniqueId: '是否自动生成唯一ID',
          uniqueField: '唯一字段'
        }
      },
      switch: {
        name: '开关 Switch',
        description: '简洁的开关选择器，让状态切换更加明确',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '方形'
        },
        demo3: {
          title: '模拟请求'
        },
        demo4: {
          title: '只读'
        },
        demo5: {
          title: '禁用'
        },
        model: {
          modelValue: '参数名称'
        },
        props: {
          size: '尺寸',
          round: '圆角',
          readonly: '只读',
          disabled: '禁用',
          request: '请求',
          loading: '加载中'
        },
        events: {
          change: '事件名称'
        }
      },
      slider: {
        name: '滑块 Slider',
        description: '通过拖动选择数值，让数值选择更加直观',
        demo1: {
          title: '尺寸'
        },
        demo2: {
          title: '不同步长'
        },
        demo3: {
          title: '限定范围'
        },
        demo4: {
          title: '只读'
        },
        demo5: {
          title: '禁用'
        },
        demo6: {
          title: '配置项'
        },
        model: {
          modelValue: '参数名称'
        },
        props: {
          size: '尺寸',
          min: '最小值',
          max: '最大值',
          step: '步长',
          readonly: '只读',
          disabled: '禁用',
          options: '选项',
          formatTooltip: '格式化提示'
        }
      },
      sliderRange: {
        name: '滑块范围 SliderRange',
        description: '选择数值范围的滑块，让范围选择更加灵活',
        demo1: {
          title: '尺寸'
        },
        demo2: {
          title: '不同步长'
        },
        demo3: {
          title: '限定范围'
        },
        demo4: {
          title: '只读'
        },
        demo5: {
          title: '禁用'
        },
        demo6: {
          title: '配置项'
        },
        model: {
          modelValue: '参数名称'
        },
        props: {
          size: '尺寸',
          min: '最小值',
          max: '最大值',
          step: '步长',
          readonly: '只读',
          disabled: '禁用',
          options: '选项',
          formatTooltip: '格式化提示'
        }
      },
      rate: {
        name: '评分 Rate',
        description: '星星评分组件，让打分更加生动有趣',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '只读'
        },
        demo3: {
          title: '禁用'
        },
        demo4: {
          title: '提示'
        },
        model: {
          modelValue: '参数名称'
        },
        props: {
          size: '尺寸',
          count: '数量',
          tips: '提示',
          readonly: '只读',
          disabled: '禁用'
        }
      },
      colorPicker: {
        name: '颜色选择器 ColorPicker',
        description: '丰富的颜色选择工具，让配色更加精准',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '不同尺寸'
        },
        demo3: {
          title: '自定义宽度'
        },
        demo4: {
          title: '禁用状态'
        },
        demo5: {
          title: '只读状态'
        },
        model: {
          modelValue: '参数名称'
        },
        props: {
          size: '尺寸',
          width: '宽度',
          placeholder: '占位符',
          disabled: '禁用',
          readonly: '只读'
        }
      },
      upload: {
        name: '上传 Upload',
        description: '文件上传组件，让文件处理更加简单',
        demo1: {
          title: '常规'
        },
        demo2: {
          title: '限制格式和大小'
        },
        demo3: {
          title: '上传图片'
        },
        demo4: {
          title: '自定义tips'
        },
        demo5: {
          title: '照片墙'
        },
        demo6: {
          title: '不上传'
        },
        demo7: {
          title: '回显'
        },
        model: {
          modelValue: '绑定值'
        },
        props: {
          accept: '接受的文件类型',
          immediate: '立即上传',
          multiple: '多文件上传',
          disabled: '禁用',
          readonly: '只读',
          limit: '文件数量限制',
          maxFileSize: '最大文件大小',
          size: '尺寸',
          tips: '提示信息',
          uploadHelper: '上传助手',
          viewMode: '查看模式'
        }
      },
      table: {
        name: '表格 Table',
        description: '功能强大的表格组件，让数据展示更加清晰',
        model: {
          modelValue: '参数名称',
          selectedKeys: '选中的键'
        },
        demo1: {
          title: '常规'
        },
        demo2: {
          title: '固定行列'
        },
        demo3: {
          title: '自定义操作'
        },
        demo4: {
          title: '插槽'
        },
        demo5: {
          title: '自定义样式'
        },
        demo6: {
          title: '选择'
        },
        demo7: {
          title: '可排序'
        },
        demo8: {
          title: '自定义渲染'
        },
        demo9: {
          title: '完整功能'
        },
        demo10: {
          title: '暂无数据'
        },
        props: {
          columns: '列',
          dataSource: '数据源',
          size: '尺寸',
          checkable: '可选',
          maxHeight: '最大高度',
          multiple: '多选',
          rowKey: '行键'
        },
        tableColumns: {
          field: '字段',
          fixed: '固定',
          title: '标题',
          type: '类型',
          width: '宽度',
          x: 'X轴',
          customRender: '自定义渲染'
        }
      },
      pagination: {
        name: '分页 Pagination',
        description: '清晰的分页导航，让数据浏览更加轻松',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '巨量'
        },
        demo3: {
          title: '模拟异步'
        },
        model: {
          total: '参数名称',
          currentPage: '当前页',
          pageSize: '每页大小'
        },
        props: {
          size: '尺寸',
          pageSizeOptions: '每页大小选项',
          visiblePagesCount: '可见页数'
        },
        events: {
          change: '事件名称'
        }
      },
      magicNumber: {
        name: '魔法数字 MagicNumber',
        description: '让数字展示更加生动有趣的动效组件'
      },
      tree: {
        name: '树形控件 Tree',
        description: '展示层级数据结构的利器，让数据层次更加分明',
        demo1: {
          title: '常规'
        },
        demo2: {
          title: '是否显示复选框'
        },
        demo3: {
          title: '多选'
        },
        demo4: {
          title: '父子节点关联模式'
        },
        demo5: {
          title: '异步请求'
        },
        demo6: {
          title: '默认全部展开'
        },
        demo7: {
          title: '是否显示辅助线'
        },
        demo8: {
          title: '插槽'
        },
        model: {
          modelValue: '参数名称',
          expandedKeys: '展开的节点键'
        },
        props: {
          dataSource: '数据源',
          multiple: '多选',
          showCheckbox: '显示复选框',
          expandAll: '默认全部展开',
          free: '自由选择',
          showLine: '显示连接线',
          trigger: '触发方式',
          placeholder: '占位文本',
          keyField: '节点标识字段',
          labelField: '节点标签字段',
          disabledField: '禁用节点字段',
          initTree: '初始化树节点的方法',
          loadMethod: '异步加载子节点数据的方法',
          isSelect: '是否选中'
        },
        slots: {
          handle: '插槽名'
        },
        treeDataSource: {
          label: '标签',
          key: '键',
          isLeaf: '是否叶子节点',
          children: '子节点',
          disabled: '禁用'
        }
      },
      collapse: {
        name: '折叠面板 Collapse',
        description: '可折叠和展开的内容区域，让信息展示更加整洁',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '标题插槽'
        },
        demo3: {
          title: '手风琴'
        },
        model: {
          modelValue: '参数名称'
        },
        'model(CollapseItem)': {
          modelValue: '参数名称'
        },
        props: {
          width: '宽度'
        },
        'props(CollapseItem)': {
          collapseKey: '折叠键',
          title: '标题',
          radius: '半径'
        }
      },
      desc: {
        name: '描述列表 Desc',
        description: '整齐的展示多个字段，让信息展示更加规范',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '方向'
        },
        demo3: {
          title: '丰富的'
        },
        demo4: {
          title: '支持在线配置'
        },
        props: {
          options: '选项',
          dataSource: '数据源',
          size: '尺寸',
          labelX: '标签X',
          valueX: '值X',
          gap: '间距',
          width: '宽度',
          columns: '列',
          labelWidth: '标签宽度',
          direction: '方向',
          bordered: '是否有边框'
        },
        descItemProps: {
          label: '标签',
          field: '字段',
          size: '尺寸',
          bordered: '是否有边框',
          width: '宽度',
          labelWidth: '标签宽度',
          direction: '方向',
          tips: '提示信息',
          type: '类型',
          labelX: '标签X',
          valueX: '值X',
          gridArea: '网格区域',
          customRender: '自定义渲染'
        }
      },
      alert: {
        name: '警告提示 Alert',
        description: '醒目的信息提示框，让警告更加温和',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '支持插槽'
        },
        demo3: {
          title: '更多场景'
        },
        props: {
          type: '类型',
          title: '标题',
          content: '提示内容',
          closeable: '是否可关闭',
          footer: '底部内容'
        }
      },
      message: {
        name: '全局提示 Message',
        description: '轻量级的信息反馈，让提示更加简洁',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '可控制的'
        },
        demo3: {
          title: '模拟请求'
        },
        events: {
          close: '关闭时触发'
        },
        props: {
          type: '类型',
          content: '提示内容',
          duration: '持续时间'
        }
      },
      notification: {
        name: '通知提醒框 Notification',
        description: '优雅的通知提醒，让消息推送更加友好',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '自定义展示时间'
        },
        props: {
          type: '类型',
          title: '标题',
          content: '提示内容',
          delay: '延迟时间'
        }
      },
      drawer: {
        name: '抽屉 Drawer',
        description: '从屏幕边缘滑出的面板，让临时操作更加流畅',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '异步关闭'
        },
        demo3: {
          title: '自定义头部和底部'
        },
        demo4: {
          title: '是否允许esc关闭'
        },
        model: {
          visible: '是否显示'
        },
        props: {
          title: '标题',
          width: '宽度',
          position: '位置',
          height: '高度',
          closeOnClickOverlay: '是否可通过点击遮罩关闭',
          closeByEsc: '是否可通过按下 ESC 关闭',
          hideFooter: '是否隐藏底部',
          okProps: '确认按钮的属性',
          cancelProps: '取消按钮的属性',
          zIndex: '层级'
        }
      },
      dialog: {
        name: 'Finestra di Dialogo',
        description: 'Finestra di dialogo modale per rendere più evidenti le interazioni con informazioni importanti',
        demo1: {
          title: 'Utilizzo Base'
        },
        demo2: {
          title: 'Esempio Semplice'
        },
        props: {
          type: 'Tipo',
          width: 'Larghezza',
          trigger: 'Metodo di Attivazione',
          title: 'Titolo',
          okText: 'Testo del Pulsante di Conferma',
          cancelText: 'Testo del Pulsante di Annullamento',
          ok: 'Callback di Conferma',
          cancel: 'Callback di Annullamento',
          layout: 'Tipo di Layout',
          closeOnClickOverlay: 'Chiudi al Click su Overlay',
          closeByEsc: 'Chiudi con Tasto ESC',
          transformOrigin: 'Origine Animazione'
        },
        events: {
          ok: 'Evento Click su Conferma',
          cancel: 'Evento Click su Annulla'
        }
      },
      modal: {
        name: 'Finestra Modale',
        description: 'Una finestra modale più flessibile per interazioni di popup più ricche',
        demo1: {
          title: 'Utilizzo Base'
        },
        demo2: {
          title: 'Chiusura Asincrona'
        },
        demo3: {
          title: 'Intestazione e Piè di Pagina Personalizzati'
        },
        demo4: {
          title: 'Chiusura con Tasto ESC'
        },
        model: {
          visible: 'Stato di Visibilità'
        },
        props: {
          title: 'Titolo',
          width: 'Larghezza',
          top: 'Distanza dal Bordo Superiore',
          hideFooter: 'Nascondi Piè di Pagina',
          closeByEsc: 'Chiudi con Tasto ESC',
          okProps: 'Proprietà Pulsante Conferma',
          cancelProps: 'Proprietà Pulsante Annulla',
          hideOkButton: 'Nascondi Pulsante Conferma',
          hideCancelButton: 'Nascondi Pulsante Annulla',
          closeOnClickOverlay: 'Chiudi al Click su Overlay',
          zIndex: 'Livello di Sovrapposizione'
        }
      },
      popok: {
        name: '气泡确认框 Popok',
        description: '轻量级的确认提示，让操作确认更加便捷',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '触发方式'
        },
        props: {
          type: '类型',
          width: '宽度',
          trigger: '触发方式',
          title: '标题',
          okProps: '确认按钮属性',
          cancelProps: '取消按钮属性',
          content: '内容',
          placement: '位置'
        }
      },
      popover: {
        name: '气泡卡片 Popover',
        description: '鼠标悬停时的信息卡片，让提示更加优雅',
        demo1: {
          title: '基础用法'
        },
        props: {
          trigger: '触发方式',
          placement: '位置',
          disabled: '禁用状态',
          loading: '加载状态',
          hideOnClick: '点击时隐藏',
          offset: '偏移量',
          popoverBodyClassName: '气泡内容类名',
          triggerTarget: '触发目标'
        },
        slots: {
          trigger: '触发插槽',
          'popover-body': '气泡内容插槽'
        }
      },
      tooltip: {
        name: '文字提示 Tooltip',
        description: '简单的文字提示气泡，让提示更加轻巧',
        demo1: {
          title: '基础用法'
        },
        demo2: {
          title: '点击触发'
        },
        props: {
          tips: '提示内容',
          placement: '位置',
          trigger: '触发方式',
          allowHTML: '是否支持HTML',
          delay: '延迟时间'
        }
      },
      loading: {
        name: '加载 Loading',
        description: '优雅的加载效果，让等待更加轻松',
        demo1: {
          title: '基础用法'
        },
        props: {
          tip: '提示信息',
          placement: '提示位置',
          trigger: '触发方式',
          allowHTML: '允许 HTML'
        }
      },
      result: {
        name: '结果 Result',
        description: '用于反馈操作结果，让结果展示更加完整',
        demo1: {
          title: '基础用法'
        },
        props: {
          type: '类型',
          title: '标题',
          content: '内容'
        },
        slots: {
          handle: '插槽处理'
        }
      },
      empty: {
        name: '空状态 Empty',
        description: '空数据状态展示，让空白页面更加友好',
        demo1: {
          title: '基础用法'
        },
        props: {
          type: '类型',
          title: '标题',
          fontSize: '字体大小',
          padding: '内边距',
          width: '宽度',
          height: '高度'
        }
      }
    }
  }
  