const contextMenu = {
  label: 'Display Text',
  value: 'Value',
  renderIcon: 'Render Icon Function',
  children: 'Child Nodes Collection',
  disabled: 'Disable Option',
  isDividerLine: 'Is Divider Line'
}

export default {
  name: 'en',
  home: {
    title: 'Lew UI',
    description: 'A Beautiful and Easy-to-Use Vue3 Component Library',
    getStarted: 'Get Started',
    sloganTitle: 'Less is More',
    slogan: 'A Beautiful and Easy-to-Use Vue3 Component Library',
    home: 'Home',
    install: 'Installation',
    components: 'Components',
    formEngine: 'Form Engine',
    descEngine: 'Description Engine'
  },
  base: {
    base: 'Base',
    navigator: 'Navigation',
    form: 'Form',
    data: 'Data Components',
    feedback: 'Feedback',
    close: 'Close',
    showCode: 'Show Code'
  },
  components: {
    image: {
      name: 'Image',
      description:
        'Make image display more elegant, supporting lazy loading, loading state, failure handling and other features',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Loading State',
        tipsTitle: 'Tips',
        tipsContent:
          'Width and height must be set to have placeholder loading effect.'
      },
      demo3: {
        title: 'Load Failed'
      },
      props: {
        src: 'Image URL',
        alt: 'Image Description',
        width: 'Width',
        height: 'Height',
        objectFit: 'Image Fill Mode',
        objectPosition: 'Image Position',
        lazy: 'Enable Lazy Loading',
        loading: 'Show Loading State',
        title: 'Image Title'
      }
    },
    avatar: {
      name: 'Avatar',
      description:
        'An exquisite avatar component supporting image, icon and text formats',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Status'
      },
      demo3: {
        title: 'Default Avatar'
      },
      demo4: {
        title: 'Shape'
      },
      props: {
        size: 'Size',
        loading: 'Show Loading State',
        shape: 'Shape',
        src: 'Image URL',
        alt: 'Image Description',
        status: 'Status',
        objectFit: 'Image Fill Mode',
        objectPosition: 'Image Position',
        statusPlacement: 'Status Position'
      }
    },
    button: {
      name: 'Button',
      description: 'Click it for smooth and fluid interaction',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Colors'
      },
      demo3: {
        title: 'Icons'
      },
      demo4: {
        title: 'Loading State'
      },
      demo5: {
        title: 'Disabled State'
      },
      demo6: {
        title: 'Support Promise'
      },
      props: {
        text: 'Button Text',
        type: 'Type',
        size: 'Size',
        singleIcon: 'Show Icon Only',
        color: 'Color',
        round: 'Round Corner',
        dashed: 'Dashed Border',
        loading: 'Show Loading State',
        disabled: 'Disabled State',
        request: 'Request Mode'
      }
    },
    tag: {
      name: 'Tag',
      description:
        'A small but powerful marking tool that adds color to content classification',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Types'
      },
      demo3: {
        title: 'Sizes'
      },
      demo4: {
        title: 'Colors'
      },
      demo5: {
        title: 'Disabled'
      },
      demo6: {
        title: 'Closable'
      },
      demo7: {
        title: 'Slots'
      },
      props: {
        text: 'Tag text, higher priority than slot, text-trim effect will be triggered when width is exceeded',
        type: 'Style type',
        size: 'Size',
        color: 'Color theme',
        closable: 'Whether closable',
        disabled: 'Whether disabled',
        round: 'Whether rounded'
      }
    },
    badge: {
      name: 'Badge',
      description:
        'A small red dot that blooms in the upper right corner, making reminders more eye-catching',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Dot'
      },
      demo3: {
        title: 'Direct Use'
      },
      demo4: {
        title: 'Text'
      },
      demo5: {
        title: 'Processing'
      },
      props: {
        text: 'Badge text',
        offset: 'Badge offset',
        processing: 'Whether processing',
        max: 'Maximum value, will display as max+ when exceeded',
        color: 'Badge color',
        disabled: 'Whether disabled',
        value: 'Badge value (will show as dot when empty)'
      }
    },
    title: {
      name: 'Title',
      description: 'Not just a title, but the soul prompt of content',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Bold'
      },
      demo3: {
        title: 'Colors'
      },
      props: {
        text: 'Text content',
        size: 'Title text size, can be number (in pixels) or string (like "1.5em")',
        bold: 'Title text weight, can be values between 100 to 900 in hundreds',
        color:
          'Title text color, can be predefined color names or custom color values'
      }
    },
    textTrim: {
      name: 'TextTrim',
      description:
        'Elegantly handle long text without breaking layout aesthetics',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Multi-line Ellipsis'
      },
      demo3: {
        title: 'End Text'
      },
      demo4: {
        title: 'Alignment'
      },
      props: {
        text: 'Text content',
        lineClamp:
          'Maximum number of lines to display, excess will be truncated',
        allowHTML: 'Whether to allow HTML tag rendering',
        placement: 'Tooltip display position',
        offset: 'Tooltip offset relative to target element [x, y] (in pixels)',
        textAlign:
          'X-axis alignment direction (when width is less than container width)',
        delay:
          'Delay time for showing and hiding tooltip [show delay, hide delay] (in milliseconds)',
        reserveEnd:
          'Number of characters to reserve at the end, when text overflows ellipsis will show in the middle'
      }
    },
    flex: {
      name: 'Flex',
      description: 'Flexible layout solution for effortless page arrangement',
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
        direction: 'Child elements arrangement direction',
        x: 'Horizontal alignment of child elements',
        y: 'Vertical alignment of child elements',
        mode: 'Distribution mode of child elements, will override x or y alignment settings',
        wrap: 'Whether to allow child elements to wrap when space is insufficient',
        gap: 'Gap between child elements (in pixels)',
        width: 'Flex container width (in pixels or percentage)'
      }
    },
    mark: {
      name: 'Mark',
      description:
        'Add highlighting marks to text, making key content stand out',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        color: 'Color theme',
        round: 'Whether rounded',
        bold: 'Whether bold',
        cursor: 'Mouse hover cursor style'
      }
    },
    icon: {
      name: 'Icon',
      description:
        'A beautiful collection of icons that adds visual language to the interface'
    },
    backTop: {
      name: 'BackTop',
      description:
        'One-click return to top, making long page browsing hassle-free',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Content'
      },
      demo3: {
        title: 'Directive Trigger'
      },
      props: {
        target:
          'Specify the target element that triggers the scroll event using CSS selector. If empty, defaults to the entire window.',
        right: 'Set the distance from the right side of the page, in pixels.',
        bottom: 'Set the distance from the bottom of the page, in pixels.',
        valveHeight:
          'Set the threshold for page scroll height, the back to top button appears when scroll height exceeds this value, in pixels.'
      },
      events: {
        click: 'Back to top event callback'
      }
    },
    steps: {
      name: 'Steps',
      description:
        'Clearly display operation process, letting users know where they are',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Status'
      },
      demo3: {
        title: 'Loading'
      },
      model: {
        modelValue: 'Current active step index'
      },
      props: {
        options: 'Step configuration array',
        status: 'Current status of steps'
      }
    },
    menu: {
      name: 'Menu',
      description: 'Elegant vertical menu for clear navigation hierarchy',
      demo1: {
        title: 'Basic Usage'
      },
      model: {
        modelValue: 'Currently active menu binding value'
      },
      props: {
        options: 'Menu configuration array'
      },
      menuOptions: {
        label: 'Menu item text',
        value: 'Menu item value',
        children: 'Submenu items array',
        disabled: 'Whether menu item is disabled',
        icon: 'Menu item icon',
        tagText: 'Menu item badge text',
        tagColor: 'Menu item badge color'
      }
    },
    menuTree: {
      name: 'MenuTree',
      description:
        'Clear hierarchical tree menu for easily displaying complex structural relationships',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Icons'
      },
      demo3: {
        title: 'Default Expanded',
        description: 'Control default expanded menu items through v-model.'
      },
      demo4: {
        title: 'Tags'
      },
      demo5: {
        title: 'Custom Styles'
      },
      model: {
        modelValue: 'Currently active menu binding value',
        expandKeys: 'Array of key values for default expanded menu items',
        collapsed: 'Whether menu is collapsed'
      },
      props: {
        options: 'Menu tree data source, supports nested structure.',
        width: 'Menu tree width, supports CSS width values.'
      },
      menuTreeItem: {
        label:
          'Menu tree item title text. Can also use named slot "label" for custom title content.',
        value: 'Menu item value, used to identify menu item uniqueness.',
        level: 'Menu tree item level, starts from 1.',
        renderIcon: 'Icon render function',
        renderLabel: 'Label render function',
        tagText: 'Menu item badge text',
        tagType: 'Menu item badge type',
        tagColor: 'Menu item badge color',
        disabled: 'Whether menu item is disabled',
        isLeaf: 'Whether it is a leaf node'
      }
    },
    dropdown: {
      name: 'Dropdown',
      description: 'Click-triggered floating menu for convenient operations',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Not Just Buttons'
      },
      demo3: {
        title: 'Disabled Items'
      },
      props: {
        options: 'Menu options configuration',
        trigger: 'Trigger method',
        placement: 'Menu popup position'
      },
      'options(ContextMenus)': contextMenu,
      events: {
        show: 'Menu show event callback',
        hide: 'Menu hide event callback',
        change: 'Menu item selection event callback'
      }
    },
    breadcrumb: {
      name: 'Breadcrumb',
      description: 'Clear path navigation to keep users oriented',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Current Selection'
      },
      demo3: {
        title: 'Separator Icon Types'
      },
      props: {
        options: 'Breadcrumb configuration array',
        separator: 'Separator icon type'
      },
      breadcrumbOptions: {
        label: 'Breadcrumb item text',
        value: 'Breadcrumb item value',
        active: 'Whether currently selected'
      },
      events: {
        change: 'Triggered when breadcrumb item changes'
      }
    },
    contextMenu: {
      name: 'ContextMenu',
      description: 'Elegant right-click menu for more natural operations',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Support Multi-level Nesting'
      },
      demo3: {
        title: 'Support Dynamic Updates'
      },
      props: {
        options: 'Right-click menu configuration',
        disabled: 'Whether right-click menu is disabled',
        selectHandler: 'Callback function when menu item is selected'
      },
      'options(ContextMenus)': contextMenu
    },
    form: {
      name: 'Form',
      description:
        'Powerful form handling capabilities for effortless data collection',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Direction'
      },
      demo3: {
        title: 'Custom Validation'
      },
      demo4: {
        title: 'Support Grid Layout'
      },
      demo5: {
        title: 'Form Engine Configuration'
      },
      props: {
        options:
          'Configuration options array defining form structure and content',
        size: 'Overall form size, affects all form items',
        width:
          'Overall form width, supports numbers (pixels) or percentage strings',
        columns: 'Number of form items per row, maximum value is 4',
        labelWidth:
          'Form item label width, supports numbers (pixels) or "auto"',
        disabled: 'Whether to disable the entire form',
        readonly: 'Whether to set the entire form as read-only',
        direction:
          'Form item arrangement direction, "x" for horizontal, "y" for vertical',
        formMethods:
          'Collection of form item methods, containing functions for form operations'
      },
      formItemProps: {
        label: 'Form item label text',
        field:
          'Field name corresponding to form item, used for data binding and validation',
        required: 'Whether required field',
        as: 'Specify form item type, such as "input", "select", etc.',
        size: 'Individual form item size, can override overall form setting',
        width:
          'Individual form item width, supports numbers (pixels) or percentage strings',
        labelWidth:
          'Individual form item label width, supports numbers (pixels) or "auto"',
        direction:
          'Individual form item arrangement direction, "x" for horizontal, "y" for vertical',
        disabled: 'Whether to disable this form item',
        readonly: 'Whether to set this form item as read-only',
        tips: 'Form item tips',
        errMessage: 'Custom error message for validation failure',
        rule: 'Form item validation rules',
        props: 'Additional properties passed to form item component',
        between:
          'Whether to add spacing between form items in horizontal arrangement',
        gridArea: 'Position in grid layout',
        outputFormat: 'Output parameter formatting method',
        inputFormat: 'Input parameter formatting method'
      },
      events: {
        mounted: 'Triggered when form item is mounted'
      },
      methods: {
        getForm: 'Get form',
        setForm: 'Set form'
      }
    },
    input: {
      name: 'Input',
      description: 'Feature-rich input box for convenient data entry',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Prefix and Suffix'
      },
      demo3: {
        title: 'Character Limit'
      },
      demo4: {
        title: 'Alignment'
      },
      demo5: {
        title: 'Password Visibility'
      },
      demo6: {
        title: 'Auto Width'
      },
      demo7: {
        title: 'Select All Text on Focus'
      },
      demo8: {
        title: 'Clearable'
      },
      demo9: {
        title: 'Read-only State'
      },
      demo10: {
        title: 'Disabled State'
      },
      demo11: {
        title: 'Enter Key Event'
      },
      props: {
        type: 'Input type',
        size: 'Input size',
        placeholder: 'Input placeholder text',
        disabled: 'Whether input is disabled',
        readonly: 'Whether input is read-only',
        clearable: 'Whether to enable clear button',
        showPassword: 'Whether to enable password visibility',
        maxLength: 'Maximum input length',
        showCount:
          'Whether to show character count (only valid when type is text)',
        align: 'Input text alignment',
        minWidth:
          'Minimum input width, supports number (in pixels) or string with units',
        autoWidth: 'Whether to automatically adjust width based on content',
        selectByFocus: 'Whether to select all text on focus',
        copyable:
          'Whether to allow copying content (only works when readonly is true and suffix is false)',
        prefixes: 'Input prefix type',
        prefixesOptions:
          'Input prefix options list, used when prefixes is select',
        prefixesTooltip: 'Input prefix tooltip text',
        suffix: 'Input suffix type',
        suffixOptions: 'Input suffix options list, used when suffix is select',
        suffixTooltip: 'Input suffix tooltip text',
        okByEnter: 'Whether to allow confirmation by Enter key'
      },
      events: {
        change: 'Triggered when input value changes',
        focus: 'Triggered when input gains focus',
        blur: 'Triggered when input loses focus',
        input: 'Triggered when input content changes',
        clear: 'Triggered when input is cleared',
        ok: 'Triggered when input is confirmed'
      }
    },
    inputNumber: {
      name: 'InputNumber',
      description:
        'Specialized input box for numbers, making numeric handling more precise',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Select All on Focus'
      },
      demo3: {
        title: 'Range Limit'
      },
      demo4: {
        title: 'Precise Values'
      },
      demo5: {
        title: 'Disabled and Read-only'
      },
      props: {
        min: 'Minimum value',
        max: 'Maximum value',
        step: 'Step value',
        disabled: 'Precision',
        size: 'Size, options: small, medium, large',
        placeholder: 'Placeholder text',
        readonly: 'Whether read-only',
        width: 'Width, supports number (in pixels) or string with units',
        align: 'Alignment',
        selectByFocus: 'Select all text on focus'
      },
      model: {
        modelValue: 'Binding value'
      }
    },
    textarea: {
      name: 'Textarea',
      description: 'Multi-line text input box for comfortable long text input',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Character Limit'
      },
      demo3: {
        title: 'Select All on Focus'
      },
      demo4: {
        title: 'Clearable'
      },
      demo5: {
        title: 'Read-only and Disabled'
      },
      demo6: {
        title: 'Resize Mode'
      },
      demo7: {
        title: 'Enter Key Event'
      },
      model: {
        modelValue: 'Binding value'
      },
      props: {
        placeholder: 'Placeholder text',
        disabled: 'Whether textarea is disabled',
        readonly: 'Whether in read-only state',
        clearable: 'Whether to show clear button',
        showCount: 'Whether to show character count',
        maxLength: 'Maximum input characters',
        size: 'Textarea size',
        resize: 'Resize direction',
        width: 'Width',
        height: 'Height',
        minWidth: 'Minimum width',
        minHeight: 'Minimum height',
        maxWidth: 'Maximum width',
        maxHeight: 'Maximum height',
        selectByFocus: 'Select all text on focus',
        okByEnter:
          'Whether to enable Enter key confirmation (Shift+Enter for line break when enabled)'
      },
      events: {
        change: 'Triggered when value changes',
        focus: 'Triggered when gaining focus',
        blur: 'Triggered when losing focus',
        input: 'Triggered when content is input',
        clear: 'Triggered when cleared',
        ok: 'Triggered when confirmed'
      }
    },
    inputTag: {
      name: 'InputTag',
      description:
        'Easily input and manage multiple tags for clearer data organization',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Size'
      },
      demo3: {
        title: 'Allow Duplicates'
      },
      demo4: {
        title: 'Controlled Default Value'
      },
      demo5: {
        title: 'Clearable'
      },
      demo6: {
        title: 'Read-only State'
      },
      demo7: {
        title: 'Disabled State'
      },
      demo8: {
        title: 'Maximum Input Length'
      },
      model: {
        modelValue: 'Binding value'
      },
      props: {
        size: 'Size',
        disabled: 'Whether disabled',
        clearable: 'Whether clearable',
        placeholder: 'Placeholder text',
        readonly: 'Whether read-only',
        allowDuplicates: 'Whether to allow duplicates',
        maxLength: 'Maximum number of tags allowed'
      },
      events: {
        change: 'Triggered when value changes',
        clear: 'Triggered when cleared',
        add: 'Triggered when tag is added',
        remove: 'Triggered when tag is removed'
      }
    },
    checkbox: {
      name: 'Checkbox',
      description: 'Multi-selection selector for intuitive multiple choices',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Vertical Distribution'
      },
      demo3: {
        title: 'Block'
      },
      demo4: {
        title: 'Round'
      },
      demo5: {
        title: 'Read-only State'
      },
      demo6: {
        title: 'Disabled State'
      },
      demo7: {
        title: 'Single Mode'
      },
      'model(CheckboxGroup)': {
        modelValue: 'Binding value'
      },
      'model(Checkbox)': {
        modelValue: 'Binding value'
      },
      'props(CheckboxGroup)': {
        options: 'Options',
        disabled: 'Whether disabled',
        readonly: 'Whether read-only',
        size: 'Size',
        direction: 'Arrangement direction',
        block: 'Block display',
        round: 'Round style',
        iconable: 'Whether to use icon'
      },
      'props(Checkbox)': {
        label: 'Title',
        value: 'Value',
        disabled: 'Disabled',
        readonly: 'Read-only',
        checked: 'Checked state',
        size: 'Size',
        block: 'Block display',
        round: 'Round style',
        iconable: 'Whether to use icon',
        certain: 'Certain state'
      },
      'events(Checkbox)': {
        change: 'Triggered when value changes'
      },
      'events(CheckboxGroup)': {
        change: 'Triggered when value changes'
      },
      options: {
        label: 'Title',
        value: 'Value',
        disabled: 'Disabled'
      }
    },
    radio: {
      name: 'Radio',
      description: 'Single-selection selector for clear single choice',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Vertical Distribution'
      },
      demo3: {
        title: 'Block'
      },
      demo4: {
        title: 'Shape'
      },
      demo5: {
        title: 'Read-only State'
      },
      demo6: {
        title: 'Disabled State'
      },
      model: {
        modelValue: 'Binding value'
      },
      'props(RadioGroup)': {
        size: 'Size',
        block: 'Block display',
        direction: 'Arrangement direction',
        disabled: 'Whether disabled',
        iconable: 'Whether to use icon',
        options: 'Options',
        readonly: 'Whether read-only',
        round: 'Round style'
      },
      options: {
        label: 'Title',
        value: 'Value',
        disabled: 'Disabled'
      },
      events: {
        change: 'Triggered when value changes'
      }
    },
    tabs: {
      name: 'Tabs',
      description: 'Make content categorization clearer and switching smoother',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Adaptive Width'
      },
      demo3: {
        title: 'Custom Item Width'
      },
      demo4: {
        title: 'Line'
      },
      demo5: {
        title: 'Rounded'
      },
      model: {
        modelValue: 'Binding value'
      },
      props: {
        options: 'Options',
        type: 'Type',
        size: 'Size',
        width: 'Width',
        itemWidth: 'Item width',
        round: 'Round style',
        disabled: 'Disabled state',
        readonly: 'Read-only state'
      },
      options: {
        label: 'Title',
        value: 'Value'
      }
    },
    select: {
      name: 'Select',
      description: 'Dropdown selection box for convenient choosing',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Search'
      },
      demo3: {
        title: 'Support Slots'
      },
      demo4: {
        title: 'Disabled Options'
      },
      demo5: {
        title: 'Read-only'
      },
      demo6: {
        title: 'Disabled'
      },
      demo7: {
        title: 'Custom Empty State'
      },
      demo8: {
        title: 'Group'
      },
      model: {
        modelValue: 'Binding value'
      },
      props: {
        options: 'Options',
        size: 'Size',
        placeholder: 'Placeholder text'
      },
      events: {
        change: 'Triggered when value changes',
        clear: 'Triggered when cleared',
        blur: 'Triggered when losing focus',
        focus: 'Triggered when gaining focus'
      },
      options: {
        label: 'Title',
        value: 'Value',
        disabled: 'Disabled'
      },
      slots: {
        item: 'Custom option content',
        empty: 'Custom empty state content'
      }
    },
    selectMultiple: {
      name: 'SelectMultiple',
      description: 'Multi-selection dropdown box for flexible multiple choices'
    },
    datePicker: {
      name: 'DatePicker',
      description:
        'Simple and intuitive date selection tool for precise time selection'
    },
    dateRangePicker: {
      name: 'DateRangePicker',
      description:
        'Tool for selecting time ranges, making interval selection more convenient'
    },
    cascader: {
      name: 'Cascader',
      description:
        'Selector for handling multi-level data, making category selection clearer'
    },
    treeSelect: {
      name: 'TreeSelect',
      description:
        'Tree-structured selection box for more intuitive hierarchical selection'
    },
    inputTable: {
      name: 'InputTable',
      description: 'Quick data input in tables for efficient batch processing'
    },
    switch: {
      name: 'Switch',
      description: 'Concise switch selector for clear state switching'
    },
    slider: {
      name: 'Slider',
      description:
        'Select values through dragging for more intuitive value selection'
    },
    sliderRange: {
      name: 'SliderRange',
      description:
        'Slider for selecting value ranges, making range selection more flexible'
    },
    rate: {
      name: 'Rate',
      description: 'Star rating component for more lively and fun scoring'
    },
    colorPicker: {
      name: 'ColorPicker',
      description: 'Rich color selection tool for more precise color matching'
    },
    upload: {
      name: 'Upload',
      description: 'File upload component for simpler file handling'
    },
    table: {
      name: 'Table',
      description: 'Powerful table component for clearer data display'
    },
    pagination: {
      name: 'Pagination',
      description: 'Clear pagination navigation for easier data browsing'
    },
    magicNumber: {
      name: 'MagicNumber',
      description:
        'Animation component to make number display more lively and interesting'
    },
    tree: {
      name: 'Tree',
      description:
        'Tool for displaying hierarchical data structure, making data hierarchy clearer'
    },
    collapse: {
      name: 'Collapse',
      description:
        'Collapsible and expandable content area for neater information display'
    },
    desc: {
      name: 'Description List',
      description:
        'Neatly display multiple fields for more standardized information presentation'
    },
    alert: {
      name: 'Alert',
      description: 'Eye-catching information prompt box for gentler warnings'
    },
    message: {
      name: 'Message',
      description: 'Lightweight information feedback for more concise prompts'
    },
    notification: {
      name: 'Notification',
      description:
        'Elegant notification reminders for friendlier message pushing'
    },
    drawer: {
      name: 'Drawer',
      description:
        'Panel that slides out from screen edges for smoother temporary operations'
    },
    dialog: {
      name: 'Dialog',
      description:
        'Modal dialog box for more prominent important information interaction'
    },
    modal: {
      name: 'Modal',
      description: 'More flexible modal window for richer popup interaction'
    },
    popok: {
      name: 'Popok',
      description:
        'Lightweight confirmation prompt for more convenient operation confirmation'
    },
    popover: {
      name: 'Popover',
      description: 'Information card on mouse hover for more elegant prompts'
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Simple text tooltip bubble for lighter prompts'
    },
    loading: {
      name: 'Loading',
      description: 'Elegant loading effect for more relaxed waiting'
    },
    result: {
      name: 'Result',
      description:
        'Used for operation result feedback, making result display more complete'
    },
    empty: {
      name: 'Empty',
      description: 'Empty data state display for friendlier blank pages'
    }
  }
}
