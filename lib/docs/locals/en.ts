const contextMenu = {
  label: 'Display Text',
  value: 'Value',
  renderIcon: 'Render Icon Function',
  children: 'Children Collection',
  disabled: 'Disabled Option',
  isDividerLine: 'Is Divider Line'
}

export default {
  name: 'en',
  home: {
    title: 'Lew UI',
    description: 'A beautiful and easy-to-use Vue3 component library',
    getStarted: 'Get Started',
    sloganTitle: 'Less is More',
    slogan: 'A beautiful and easy-to-use Vue3 component library',
    home: 'Home',
    install: 'Install',
    components: 'Components',
    formEngine: 'Form Engine',
    descEngine: 'Description Engine'
  },
  base: {
    base: 'Base',
    navigator: 'Navigator',
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
        'Make image display more elegant, supporting lazy loading, loading status, failure handling, and other features',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Loading Status',
        tipsTitle: 'Tips',
        tipsContent:
          'You need to set width and height to have a placeholder loading effect.'
      },
      demo3: {
        title: 'Loading Failure'
      },
      props: {
        src: 'Image Source',
        alt: 'Image Description',
        width: 'Width',
        height: 'Height',
        objectFit: 'Image Fill Mode',
        objectPosition: 'Image Position',
        lazy: 'Enable Lazy Loading',
        loading: 'Show Loading Status',
        title: 'Image Title'
      }
    },
    avatar: {
      name: 'Avatar',
      description:
        'A delicate avatar component, supporting image, icon, and text forms',
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
        loading: 'Show Loading Status',
        shape: 'Shape',
        src: 'Image Source',
        alt: 'Image Description',
        status: 'Status',
        objectFit: 'Image Fill Mode',
        objectPosition: 'Image Position',
        statusPlacement: 'Status Placement'
      }
    },
    button: {
      name: 'Button',
      description: 'Click it to make interactions smoother',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Color'
      },
      demo3: {
        title: 'Icon'
      },
      demo4: {
        title: 'Loading Status'
      },
      demo5: {
        title: 'Disabled Status'
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
        round: 'Round',
        dashed: 'Dashed',
        loading: 'Show Loading Status',
        disabled: 'Disabled Status',
        request: 'Request'
      }
    },
    tag: {
      name: 'Tag',
      description:
        'A small but powerful marking tool, adding color to content classification',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Type'
      },
      demo3: {
        title: 'Size'
      },
      demo4: {
        title: 'Color'
      },
      demo5: {
        title: 'Disabled'
      },
      demo6: {
        title: 'Closable'
      },
      demo7: {
        title: 'Slot'
      },
      props: {
        text: 'Tag Text, priority over slot, text-trim effect will be triggered when width is exceeded',
        type: 'Style Type',
        size: 'Size',
        color: 'Color Theme',
        closable: 'Closable',
        disabled: 'Disabled',
        round: 'Round'
      }
    },
    badge: {
      name: 'Badge',
      description:
        'A small red dot blooming in the upper right corner, making reminders more eye-catching',
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
        text: 'Badge Text',
        offset: 'Badge Offset',
        processing: 'Processing',
        max: 'Max Value, will display as max+ if exceeded',
        color: 'Badge Color',
        disabled: 'Disabled',
        value: 'Badge Value (will display as dot if empty)'
      }
    },
    title: {
      name: 'Title',
      description: 'Not just a title, but a soul hint of the content',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Bold'
      },
      demo3: {
        title: 'Color'
      },
      props: {
        text: 'Text Content',
        size: 'Title Text Size, can be a number (unit: pixel) or a string (e.g., "1.5em")',
        bold: 'Title Text Boldness, optional values are integers between 100 and 900',
        color:
          'Title Text Color, optional values include predefined color names or custom color values'
      }
    },
    textTrim: {
      name: 'Text Trim',
      description:
        'Elegantly handle long text without ruining the layout aesthetics',
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
        text: 'Text Content',
        lineClamp:
          'Maximum number of lines to display, excess will be truncated',
        allowHTML: 'Allow rendering HTML tags',
        placement: 'Tooltip display position',
        offset:
          'Tooltip offset relative to the target element [x, y] (unit: pixel)',
        textAlign:
          'Horizontal alignment direction (when width is less than container width)',
        delay:
          'Delay time for showing and hiding the tooltip [show delay, hide delay] (unit: millisecond)',
        reserveEnd:
          'Number of characters to retain at the end, will show ellipsis in the middle when text overflows, retaining the beginning and specified number of ending characters'
      }
    },
    flex: {
      name: 'Flex Layout',
      description:
        'Flexible layout solution, making page layout as easy as pie',
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
        direction: 'Direction of child elements arrangement',
        x: 'Horizontal alignment of child elements',
        y: 'Vertical alignment of child elements',
        mode: 'Distribution mode of child elements, will override x or y alignment settings, specific impact depends on the value of direction',
        wrap: 'Allow child elements to wrap automatically when space is insufficient',
        gap: 'Gap between child elements (unit: pixel)',
        width: 'Width of the Flex container (unit: pixel or percentage)'
      }
    },
    mark: {
      name: 'Mark',
      description: 'Add highlight marks to text, making key content stand out',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        color: 'Color Theme',
        round: 'Round',
        bold: 'Bold',
        cursor: 'Cursor style when hovering'
      }
    },
    icon: {
      name: 'Icon',
      description:
        'A collection of exquisite icons, adding visual language to the interface'
    },
    backTop: {
      name: 'Back to Top',
      description:
        'One-click back to the top, making long page browsing no longer annoying',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Content'
      },
      demo3: {
        title: 'Trigger by Directive'
      },
      props: {
        target:
          'Specify the target element to trigger the scroll event, using CSS selector. If empty, defaults to the entire window.',
        right:
          'Set the distance of the component from the right side of the page, unit: pixel.',
        bottom:
          'Set the distance of the component from the bottom of the page, unit: pixel.',
        valveHeight:
          'Set the threshold of the page scroll height, the back to top button will be displayed when the scroll height exceeds this value, unit: pixel.'
      },
      events: {
        click: 'Back to top event callback'
      }
    },
    steps: {
      name: 'Steps',
      description:
        'Clearly display the operation process, letting users know where they are',
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
        modelValue: 'Index value of the current active step'
      },
      props: {
        options: 'Array of step configuration items',
        status: 'Current status of the step bar',
        minWidth: 'Minimum step width'
      }
    },
    menu: {
      name: 'Menu',
      description: 'Elegant vertical menu, making navigation hierarchical',
      demo1: {
        title: 'Basic Usage'
      },
      model: {
        modelValue: 'Bound value of the current active menu'
      },
      props: {
        options: 'Array of menu configuration items'
      },
      menuOptions: {
        label: 'Text of the menu item',
        value: 'Value of the menu item',
        children: 'Array of sub-menu items',
        disabled: 'Disable the menu item',
        icon: 'Icon of the menu item',
        tagText: 'Badge text of the menu item',
        tagColor: 'Badge color of the menu item'
      }
    },
    menuTree: {
      name: 'Menu Tree',
      description:
        'Hierarchical tree menu, easily displaying complex structural relationships',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Icon'
      },
      demo3: {
        title: 'Default Expand',
        description: 'Control the default expanded menu items through v-model.'
      },
      demo4: {
        title: 'Label'
      },
      demo5: {
        title: 'Custom Style'
      },
      model: {
        modelValue: 'Bound value of the current active menu',
        expandKeys: 'Array of key values of the default expanded menu items',
        collapsed: 'Collapse the menu'
      },
      props: {
        options: 'Data source of the menu tree, supporting nested structure.',
        width: 'Width of the menu tree, supporting CSS width values.'
      },
      menuTreeItem: {
        label:
          'Title text of the menu tree item. You can also use the named slot "label" to customize the title content.',
        value:
          'Value of the menu item, used to identify the uniqueness of the menu item.',
        level: 'Level of the menu tree item, starting from 1.',
        renderIcon: 'Icon rendering function',
        renderLabel: 'Label rendering function',
        tagText: 'Badge text of the menu item',
        tagType: 'Badge type of the menu item',
        tagColor: 'Badge color of the menu item',
        disabled: 'Disable the menu item',
        isLeaf: 'Is it a leaf node'
      }
    },
    dropdown: {
      name: 'Dropdown Menu',
      description:
        'Hover-triggered floating menu, making operations more convenient',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Not Just a Button'
      },
      demo3: {
        title: 'Disabled Item'
      },
      props: {
        options: 'Menu options configuration',
        trigger: 'Trigger method',
        placement: 'Menu pop-up position'
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
      description: 'Clear path navigation, ensuring users do not get lost',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Current Selection'
      },
      demo3: {
        title: 'Separator Icon Type'
      },
      props: {
        options: 'Array of breadcrumb configuration items',
        separator: 'Separator icon type'
      },
      breadcrumbOptions: {
        label: 'Text of the breadcrumb item',
        value: 'Value of the breadcrumb item',
        active: 'Is it the current selected item'
      },
      events: {
        change: 'Triggered when the breadcrumb item changes'
      }
    },
    contextMenu: {
      name: 'Context Menu',
      description: 'Elegant right-click menu, making operations more natural',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Support Multi-level Nesting'
      },
      demo3: {
        title: 'Support Dynamic Update'
      },
      demo4: {
        title: 'Checkbox'
      },
      props: {
        options: 'Right-click menu configuration',
        disabled: 'Disable right-click menu',
        selectHandler: 'Callback function when a menu item is selected'
      },
      'options(ContextMenus)': contextMenu
    },
    form: {
      name: 'Form',
      description:
        'Powerful form handling capabilities, making data collection a breeze',
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
        title: 'Configure with Form Engine'
      },
      props: {
        options:
          'Array of configuration options defining the form structure and content',
        size: 'Overall size of the form, affecting the size of all form items',
        width:
          'Overall width of the form, supporting numbers (pixels) or percentage strings',
        columns: 'Number of form items displayed per row, maximum value is 4',
        labelWidth:
          'Width of the form item label, supporting numbers (pixels) or "auto"',
        disabled: 'Disable the entire form',
        readonly: 'Set the entire form to read-only',
        direction:
          'Arrangement direction of form items, "x" for horizontal, "y" for vertical',
        formMethods:
          'Collection of methods for form items, containing functions for operating the form'
      },
      formItemProps: {
        label: 'Label text of the form item',
        field:
          'Field name corresponding to the form item, used for data binding and validation',
        required: 'Is it a required item',
        as: 'Specify the type of the form item, such as "input", "select", etc.',
        size: 'Size of a single form item, can override the overall form setting',
        width:
          'Width of a single form item, supporting numbers (pixels) or percentage strings',
        labelWidth:
          'Width of a single form item label, supporting numbers (pixels) or "auto"',
        direction:
          'Arrangement direction of a single form item, "x" for horizontal, "y" for vertical',
        disabled: 'Disable the form item',
        readonly: 'Set the form item to read-only',
        tips: 'Tips for the form item',
        errMessage: 'Custom error message for validation failure',
        rule: 'Validation rule for the form item',
        props: 'Additional attributes passed to the form item component',
        between: 'Add spacing between form items when arranged horizontally',
        gridArea: 'Position in the grid layout',
        outputFormat: 'Formatting method for output parameters',
        inputFormat: 'Formatting method for input parameters'
      },
      events: {
        mounted: 'Triggered when the form item is mounted'
      },
      methods: {
        getForm: 'Get the form',
        setForm: 'Set the form'
      }
    },
    input: {
      name: 'Input',
      description: 'Feature-rich input box, making data entry more convenient',
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
        title: 'Read-only Status'
      },
      demo10: {
        title: 'Disabled Status'
      },
      demo11: {
        title: 'Trigger Event on Enter Key'
      },
      props: {
        type: 'Input Box Type',
        size: 'Input Box Size',
        placeholder: 'Input Box Placeholder Text',
        disabled: 'Disable Input Box',
        readonly: 'Set Input Box to Read-only',
        clearable: 'Enable Clear Button',
        showPassword: 'Enable Password Visibility',
        maxLength: 'Maximum Input Length',
        showCount: 'Show Character Count (only effective when type is text)',
        align: 'Input Box Text Alignment',
        minWidth:
          'Minimum Width of the Input Box, supporting numbers (unit: pixel) or strings with units',
        autoWidth: 'Automatically Adjust Width Based on Content',
        selectByFocus: 'Enable Select All Text on Focus',
        copyable:
          'Allow Copying Content (only effective when readonly is true and suffix is false)',
        prefixes: 'Input Box Prefix Type',
        prefixesOptions:
          'List of Prefix Options for the Input Box, used when prefixes is select',
        prefixesTooltip: 'Tooltip Text for the Input Box Prefix',
        suffix: 'Input Box Suffix Type',
        suffixOptions:
          'List of Suffix Options for the Input Box, used when suffix is select',
        suffixTooltip: 'Tooltip Text for the Input Box Suffix',
        okByEnter: 'Allow Confirmation by Enter Key'
      },
      events: {
        change: 'Triggered when the input box value changes',
        focus: 'Triggered when the input box gains focus',
        blur: 'Triggered when the input box loses focus',
        input: 'Triggered when inputting content in the input box',
        clear: 'Triggered when the input box is cleared',
        ok: 'Triggered when confirming the input box'
      }
    },
    inputNumber: {
      name: 'Input Number',
      description:
        'Specially designed for numeric input, making number handling more precise',
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
        title: 'Precise Value'
      },
      demo5: {
        title: 'Disabled and Read-only'
      },
      props: {
        min: 'Minimum Value',
        max: 'Maximum Value',
        step: 'Step Value',
        disabled: 'Precision',
        size: 'Size, optional values: small, medium, large',
        placeholder: 'Placeholder Text',
        readonly: 'Read-only',
        width: 'Width, supporting numbers (unit: pixel) or strings with units',
        align: 'Alignment',
        selectByFocus: 'Select All Text on Focus'
      },
      model: {
        modelValue: 'Bound Value'
      }
    },
    textarea: {
      name: 'Textarea',
      description:
        'Multi-line text input box, making long text input more comfortable',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Character Limit'
      },
      demo3: {
        title: 'Select All Text on Focus'
      },
      demo4: {
        title: 'Clearable'
      },
      demo5: {
        title: 'Read-only'
      },
      demo6: {
        title: 'Disabled'
      },
      demo7: {
        title: 'Trigger Event on Enter Key'
      },
      demo8: {
        title: 'Resizable'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        placeholder: 'Placeholder Text',
        disabled: 'Disable Textarea',
        readonly: 'Read-only Status',
        clearable: 'Show Clear Button',
        showCount: 'Show Character Count',
        maxLength: 'Maximum Input Characters',
        size: 'Textarea Size',
        resize: 'Resize Direction',
        width: 'Width',
        height: 'Height',
        minWidth: 'Minimum Width',
        minHeight: 'Minimum Height',
        maxWidth: 'Maximum Width',
        maxHeight: 'Maximum Height',
        selectByFocus: 'Select All Text on Focus',
        okByEnter:
          'Enable Confirmation by Enter Key (Shift+Enter for newline when enabled)'
      },
      events: {
        change: 'Triggered when the value changes',
        focus: 'Triggered when gaining focus',
        blur: 'Triggered when losing focus',
        input: 'Triggered when inputting content',
        clear: 'Triggered when clearing',
        ok: 'Triggered when confirming'
      }
    },
    inputTag: {
      name: 'Input Tag',
      description:
        'Easily input and manage multiple tags, making data organization clearer',
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
        title: 'Read-only Status'
      },
      demo7: {
        title: 'Disabled Status'
      },
      demo8: {
        title: 'Maximum Input Length'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        size: 'Size',
        disabled: 'Disable',
        clearable: 'Clearable',
        placeholder: 'Placeholder Text',
        readonly: 'Read-only',
        allowDuplicates: 'Allow Duplicates',
        maxLength: 'Maximum Number of Tags',
        width: 'Width'
      },
      events: {
        change: 'Triggered when the value changes',
        clear: 'Triggered when clearing',
        add: 'Triggered when adding a tag',
        remove: 'Triggered when removing a tag'
      }
    },
    checkbox: {
      name: 'Checkbox',
      description:
        'Multi-select selector, making multiple choices more intuitive',
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
        title: 'Read-only Status'
      },
      demo6: {
        title: 'Disabled Status'
      },
      demo7: {
        title: 'Single Mode'
      },
      'model(CheckboxGroup)': {
        modelValue: 'Bound Value'
      },
      'model(Checkbox)': {
        modelValue: 'Bound Value'
      },
      'props(CheckboxGroup)': {
        options: 'Options',
        disabled: 'Disable',
        readonly: 'Read-only',
        size: 'Size',
        direction: 'Direction',
        block: 'Block Display',
        round: 'Round Style',
        iconable: 'Enable Icon'
      },
      'props(Checkbox)': {
        label: 'Title',
        value: 'Value',
        disabled: 'Disable',
        readonly: 'Read-only',
        checked: 'Checked Status',
        size: 'Size',
        block: 'Block Display',
        round: 'Round Style',
        iconable: 'Enable Icon',
        certain: 'Certain Status'
      },
      'events(Checkbox)': {
        change: 'Triggered when the value changes'
      },
      'events(CheckboxGroup)': {
        change: 'Triggered when the value changes'
      },
      options: {
        label: 'Title',
        value: 'Value',
        disabled: 'Disable'
      }
    },
    radio: {
      name: 'Radio',
      description: 'Single-select selector, making single choice more clear',
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
        title: 'Read-only Status'
      },
      demo6: {
        title: 'Disabled Status'
      },
      model: {
        modelValue: 'Bound Value'
      },
      'props(RadioGroup)': {
        size: 'Size',
        block: 'Block Display',
        direction: 'Direction',
        disabled: 'Disable',
        iconable: 'Enable Icon',
        options: 'Options',
        readonly: 'Read-only',
        round: 'Round Style'
      },
      options: {
        label: 'Title',
        value: 'Value',
        disabled: 'Disable'
      },
      events: {
        change: 'Triggered when the value changes'
      }
    },
    tabs: {
      name: 'Tabs',
      description:
        'Make content classification display clearer and switching more fluid',
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
        title: 'Round'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        options: 'Options',
        type: 'Type',
        size: 'Size',
        width: 'Width',
        itemWidth: 'Item Width',
        round: 'Round Style',
        disabled: 'Disabled',
        readonly: 'Read-only'
      },
      options: {
        label: 'Title',
        value: 'Value'
      }
    },
    select: {
      name: 'Select',
      description: 'Dropdown selector, making selection more convenient',
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
        title: 'Custom Empty Status'
      },
      demo8: {
        title: 'Group'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        defaultValue: 'Default Value',
        options: 'Options',
        width: 'Width',
        trigger: 'Trigger Method',
        placeholder: 'Placeholder Text',
        size: 'Size',
        itemHeight: 'Item Height',
        searchable: 'Searchable',
        searchMethod: 'Search Method',
        searchDelay: 'Search Delay',
        clearable: 'Clearable',
        readonly: 'Read-only',
        disabled: 'Disabled',
        showCheckIcon: 'Show Check Icon'
      },
      events: {
        change: 'Triggered when the value changes',
        clear: 'Triggered when cleared',
        blur: 'Triggered when losing focus',
        focus: 'Triggered when gaining focus'
      },
      options: { label: 'Label', value: 'Value', disabled: 'Disabled' },
      slots: {
        item: 'Custom Option Content',
        empty: 'Custom Empty State Content'
      }
    },
    selectMultiple: {
      name: 'Select Multiple',
      description:
        'Dropdown selector supporting multiple selections, making multiple choices more flexible',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Filter Method'
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
        title: 'Empty State Slot'
      },
      demo8: {
        title: 'Group'
      },
      props: {
        options: 'Options',
        trigger: 'Trigger Method',
        width: 'Width',
        valueLayout: 'Value Layout',
        valueTextSplit: 'Value Text Splitter',
        placeholder: 'Placeholder Text',
        size: 'Size',
        itemHeight: 'Item Height',
        searchable: 'Searchable',
        searchPlaceholder: 'Search Placeholder Text',
        searchMethod: 'Search Method',
        searchDelay: 'Search Delay',
        clearable: 'Clearable',
        readonly: 'Read-only',
        disabled: 'Disabled',
        showCheckIcon: 'Show Check Icon',
        defaultValue: 'Default Value'
      },
      model: {
        modelValue: 'Bound Value'
      },
      events: { change: 'Value Change', blur: 'Blur', focus: 'Focus' },
      options: { label: 'Label', value: 'Value', disabled: 'Disabled' },
      slots: {
        item: 'Custom Option Content',
        empty: 'Custom Empty State Content'
      }
    },
    datePicker: {
      name: 'Date Picker',
      description:
        'Simple and intuitive date selection tool, making time selection more precise',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Clearable'
      },
      demo3: {
        title: 'Custom Format'
      },
      demo4: {
        title: 'Presets'
      },
      demo5: {
        title: 'Read-only'
      },
      demo6: {
        title: 'Disabled'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        valueFormat: 'Value Format',
        size: 'Size',
        width: 'Width',
        placeholder: 'Placeholder Text',
        clearable: 'Clearable',
        readonly: 'Read-only',
        disabled: 'Disabled',
        presets: 'Presets'
      },
      events: {
        change: 'Value Change',
        focus: 'Focus',
        blur: 'Blur',
        clear: 'Clear'
      }
    },
    dateRangePicker: {
      name: 'Date Range Picker',
      description:
        'A powerful tool for selecting time ranges, making range selection more convenient',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Clearable'
      },
      demo3: {
        title: 'Others'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        startKey: 'Start Key',
        endKey: 'End Key',
        valueFormat: 'Value Format',
        size: 'Size',
        width: 'Width',
        placeholderStart: 'Start Placeholder Text',
        placeholderEnd: 'End Placeholder Text',
        clearable: 'Clearable',
        readonly: 'Read-only',
        disabled: 'Disabled'
      },
      events: {
        change: 'Value Change',
        focus: 'Focus',
        blur: 'Blur',
        clear: 'Clear'
      }
    },
    cascader: {
      name: 'Cascader',
      description:
        'Selector for handling multi-level data, making category selection clearer',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Free Mode'
      },
      demo3: {
        title: 'Show Only Last Level'
      },
      demo4: {
        title: 'Asynchronous Loading'
      },
      demo5: {
        title: 'Clearable'
      },
      demo6: {
        title: 'Read-only'
      },
      demo7: {
        title: 'Disabled'
      },
      demo8: {
        title: 'Disabled Options'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        width: 'Width',
        options: 'Options',
        placeholder: 'Placeholder Text',
        disabled: 'Disabled',
        clearable: 'Clearable',
        showAllLevels: 'Show All Levels',
        multiple: 'Multiple Selection',
        free: 'Free Selection',
        size: 'Size',
        trigger: 'Trigger Method',
        loadMethod: 'Load Method',
        readonly: 'Read-only'
      },
      options: {
        label: 'Label',
        value: 'Value',
        isLeaf: 'Is Leaf Node',
        children: 'Children',
        disabled: 'Disabled'
      }
    },
    treeSelect: {
      name: 'Tree Select',
      description:
        'Tree structure selector, making hierarchical selection more intuitive',
      demo1: {
        title: 'Regular'
      },
      demo2: {
        title: 'Asynchronous Data Loading'
      },
      demo3: {
        title: 'Custom Slots'
      },
      demo4: {
        title: 'Disabled Items'
      },
      demo5: {
        title: 'Expand All by Default'
      },
      demo6: {
        title: 'Searchable'
      },
      demo7: {
        title: 'Empty State Slot'
      },
      demo8: {
        title: 'Others'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        dataSource: 'Tree Data Source',
        defaultValue: 'Default Selected Value',
        placeholder: 'Placeholder Text',
        size: 'Component Size',
        disabled: 'Disabled',
        clearable: 'Clearable',
        showCheckbox: 'Show Checkbox',
        showAllLevels: 'Show All Levels',
        showCheckIcon: 'Show Check Icon',
        showLine: 'Show Connection Line',
        expandAll: 'Expand All Nodes',
        searchable: 'Searchable',
        searchDelay: 'Search Delay (ms)',
        readonly: 'Read-only',
        free: 'Free Mode (Parent-child node selection status not linked)',
        align: 'Text Alignment',
        trigger: 'Child Node Trigger Method',
        keyField: 'Node Key Field',
        labelField: 'Node Label Field',
        disabledField: 'Disabled Node Field',
        initTree: 'Initialize Tree Nodes Method',
        loadMethod: 'Asynchronous Load Child Nodes Method'
      },
      slots: {
        handle: 'Slot Name'
      }
    },
    inputTable: {
      name: 'Input Table',
      description:
        'Quickly input data in a table, making batch processing more efficient',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Default Value'
      },
      demo3: {
        title: 'More Rich'
      },
      props: {
        columns: 'Column Configuration',
        size: 'Size',
        width: 'Width',
        rowKey: 'Row Key',
        batchDeletable: 'Batch Deletable',
        addable: 'Addable',
        defaultForm: 'Default Form',
        deletable: 'Deletable',
        maxRows: 'Maximum Rows',
        minRows: 'Minimum Rows',
        clearable: 'Clearable',
        sortable: 'Sortable',
        autoUniqueId: 'Auto Generate Unique ID',
        uniqueField: 'Unique Field'
      }
    },
    switch: {
      name: 'Switch',
      description: 'Simple switch selector, making state switching clearer',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Square'
      },
      demo3: {
        title: 'Simulate Request'
      },
      demo4: {
        title: 'Read-only'
      },
      demo5: {
        title: 'Disabled'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      props: {
        size: 'Size',
        round: 'Round',
        readonly: 'Read-only',
        disabled: 'Disabled',
        request: 'Request',
        loading: 'Loading'
      },
      events: {
        change: 'Event Name'
      }
    },
    slider: {
      name: 'Slider',
      description:
        'Select values by dragging, making value selection more intuitive',
      demo1: {
        title: 'Size'
      },
      demo2: {
        title: 'Different Step Lengths'
      },
      demo3: {
        title: 'Limit Range'
      },
      demo4: {
        title: 'Read-only'
      },
      demo5: {
        title: 'Disabled'
      },
      demo6: {
        title: 'Configuration Items'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      props: {
        size: 'Size',
        min: 'Minimum Value',
        max: 'Maximum Value',
        step: 'Step Length',
        readonly: 'Read-only',
        disabled: 'Disabled',
        options: 'Options',
        formatTooltip: 'Format Tooltip'
      }
    },
    sliderRange: {
      name: 'Slider Range',
      description:
        'Slider for selecting value ranges, making range selection more flexible',
      demo1: {
        title: 'Size'
      },
      demo2: {
        title: 'Different Step Lengths'
      },
      demo3: {
        title: 'Limit Range'
      },
      demo4: {
        title: 'Read-only'
      },
      demo5: {
        title: 'Disabled'
      },
      demo6: {
        title: 'Configuration Items'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      props: {
        size: 'Size',
        min: 'Minimum Value',
        max: 'Maximum Value',
        step: 'Step Length',
        readonly: 'Read-only',
        disabled: 'Disabled',
        options: 'Options',
        formatTooltip: 'Format Tooltip'
      }
    },
    rate: {
      name: 'Rate',
      description:
        'Star rating component, making scoring more vivid and interesting',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Read-only'
      },
      demo3: {
        title: 'Disabled'
      },
      demo4: {
        title: 'Tips'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      props: {
        size: 'Size',
        count: 'Count',
        tips: 'Tips',
        readonly: 'Read-only',
        disabled: 'Disabled'
      }
    },
    colorPicker: {
      name: 'Color Picker',
      description:
        'Rich color selection tool, making color matching more precise',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Different Sizes'
      },
      demo3: {
        title: 'Custom Width'
      },
      demo4: {
        title: 'Disabled State'
      },
      demo5: {
        title: 'Read-only State'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      props: {
        size: 'Size',
        width: 'Width',
        placeholder: 'Placeholder',
        disabled: 'Disabled',
        readonly: 'Read-only'
      }
    },
    upload: {
      name: 'Upload',
      description: 'File upload component, making file handling simpler',
      demo1: {
        title: 'Regular'
      },
      demo2: {
        title: 'Limit Format and Size'
      },
      demo3: {
        title: 'Upload Image'
      },
      demo4: {
        title: 'Custom Tips'
      },
      demo5: {
        title: 'Photo Wall'
      },
      demo6: {
        title: 'Do Not Upload'
      },
      demo7: {
        title: 'Echo'
      },
      model: {
        modelValue: 'Bound Value'
      },
      props: {
        accept: 'Accepted File Types',
        immediate: 'Immediate Upload',
        multiple: 'Multiple File Upload',
        disabled: 'Disabled',
        readonly: 'Read-only',
        limit: 'File Quantity Limit',
        maxFileSize: 'Maximum File Size',
        size: 'Size',
        tips: 'Tips',
        uploadHelper: 'Upload Helper',
        viewMode: 'View Mode'
      }
    },
    table: {
      name: 'Table',
      description: 'Powerful table component, making data display clearer',
      model: {
        modelValue: 'Parameter Name',
        selectedKeys: 'Selected Keys'
      },
      demo1: {
        title: 'Regular'
      },
      demo2: {
        title: 'Fixed Rows and Columns'
      },
      demo3: {
        title: 'Custom Operations'
      },
      demo4: {
        title: 'Slots'
      },
      demo5: {
        title: 'Custom Styles'
      },
      demo6: {
        title: 'Selection'
      },
      demo7: {
        title: 'Sortable'
      },
      demo8: {
        title: 'Custom Rendering'
      },
      demo9: {
        title: 'Full Functionality'
      },
      demo10: {
        title: 'No Data'
      },
      props: {
        columns: 'Columns',
        dataSource: 'Data Source',
        size: 'Size',
        checkable: 'Checkable',
        maxHeight: 'Maximum Height',
        multiple: 'Multiple Selection',
        rowKey: 'Row Key'
      },
      tableColumns: {
        field: 'Field',
        fixed: 'Fixed',
        title: 'Title',
        type: 'Type',
        width: 'Width',
        x: 'X-axis',
        customRender: 'Custom Render'
      }
    },
    pagination: {
      name: 'Pagination',
      description: 'Clear pagination navigation, making data browsing easier',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Huge Amount'
      },
      demo3: {
        title: 'Simulate Asynchronous'
      },
      model: {
        total: 'Total',
        currentPage: 'Current Page',
        pageSize: 'Page Size'
      },
      props: {
        size: 'Size',
        pageSizeOptions: 'Page Size Options',
        visiblePagesCount: 'Visible Pages Count'
      },
      events: {
        change: 'Change Event'
      }
    },
    magicNumber: {
      name: 'Magic Number',
      description:
        'Animation component for displaying numbers more vividly and interestingly'
    },
    tree: {
      name: 'Tree',
      description:
        'A powerful tool for displaying hierarchical data structures, making data hierarchy clearer',
      demo1: {
        title: 'Regular'
      },
      demo2: {
        title: 'Show Checkbox'
      },
      demo3: {
        title: 'Multiple Selection'
      },
      demo4: {
        title: 'Parent-child Node Association Mode'
      },
      demo5: {
        title: 'Asynchronous Request'
      },
      demo6: {
        title: 'Expand All by Default'
      },
      demo7: {
        title: 'Show Auxiliary Line'
      },
      demo8: {
        title: 'Slots'
      },
      model: {
        modelValue: 'Parameter Name',
        expandedKeys: 'Expanded Node Keys'
      },
      props: {
        dataSource: 'Data Source',
        multiple: 'Multiple Selection',
        showCheckbox: 'Show Checkbox',
        expandAll: 'Expand All by Default',
        free: 'Free Selection',
        showLine: 'Show Connection Line',
        trigger: 'Trigger Method',
        placeholder: 'Placeholder Text',
        keyField: 'Node Key Field',
        labelField: 'Node Label Field',
        disabledField: 'Disabled Node Field',
        initTree: 'Initialize Tree Nodes Method',
        loadMethod: 'Asynchronous Load Child Nodes Method',
        isSelect: 'Is Selected'
      },
      slots: {
        handle: 'Slot Name'
      },
      treeDataSource: {
        label: 'Label',
        key: 'Key',
        isLeaf: 'Is Leaf Node',
        children: 'Children',
        disabled: 'Disabled'
      }
    },
    collapse: {
      name: 'Collapse',
      description:
        'Collapsible and expandable content area, making information display more organized',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Title Slot'
      },
      demo3: {
        title: 'Accordion'
      },
      model: {
        modelValue: 'Parameter Name'
      },
      'model(CollapseItem)': {
        modelValue: 'Parameter Name'
      },
      props: {
        width: 'Width'
      },
      'props(CollapseItem)': {
        collapseKey: 'Collapse Key',
        title: 'Title',
        radius: 'Radius'
      }
    },
    desc: {
      name: 'Description List',
      description:
        'Neatly display multiple fields, making information display more standardized',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Direction'
      },
      demo3: {
        title: 'Rich'
      },
      demo4: {
        title: 'Support Online Configuration'
      },
      props: {
        options: 'Options',
        dataSource: 'Data Source',
        size: 'Size',
        labelX: 'Label X',
        valueX: 'Value X',
        gap: 'Gap',
        width: 'Width',
        columns: 'Columns',
        labelWidth: 'Label Width',
        direction: 'Direction',
        bordered: 'Bordered'
      },
      descItemProps: {
        label: 'Label',
        field: 'Field',
        size: 'Size',
        bordered: 'Bordered',
        width: 'Width',
        labelWidth: 'Label Width',
        direction: 'Direction',
        tips: 'Tips',
        type: 'Type',
        labelX: 'Label X',
        valueX: 'Value X',
        gridArea: 'Grid Area',
        customRender: 'Custom Render'
      }
    },
    alert: {
      name: 'Alert',
      description:
        'Eye-catching information prompt box, making warnings more gentle',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Support Slots'
      },
      demo3: {
        title: 'More Scenarios'
      },
      props: {
        type: 'Type',
        title: 'Title',
        content: 'Content',
        closeable: 'Closeable',
        footer: 'Footer'
      }
    },
    message: {
      name: 'Message',
      description:
        'Lightweight information feedback, making prompts more concise',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Controllable'
      },
      demo3: {
        title: 'Simulate Request'
      },
      events: {
        close: 'Triggered when closed'
      },
      props: {
        type: 'Type',
        content: 'Content',
        duration: 'Duration'
      }
    },
    notification: {
      name: 'Notification',
      description:
        'Elegant notification reminder, making message pushing more friendly',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Custom Display Time'
      },
      props: {
        type: 'Type',
        title: 'Title',
        content: 'Content',
        delay: 'Delay'
      }
    },
    drawer: {
      name: 'Drawer',
      description:
        'Panel sliding out from the edge of the screen, making temporary operations smoother',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Asynchronous Close'
      },
      demo3: {
        title: 'Custom Header and Footer'
      },
      demo4: {
        title: 'Allow ESC to Close'
      },
      model: {
        visible: 'Visible'
      },
      props: {
        title: 'Title',
        width: 'Width',
        position: 'Position',
        height: 'Height',
        closeOnClickOverlay: 'Close on Click Overlay',
        closeByEsc: 'Close by ESC',
        hideFooter: 'Hide Footer',
        okProps: 'OK Button Props',
        cancelProps: 'Cancel Button Props',
        zIndex: 'Z Index'
      }
    },
    dialog: {
      name: 'Dialog',
      description:
        'Modal dialog box, making important information interaction more prominent',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Simple'
      },
      props: {
        type: 'Type',
        width: 'Width',
        trigger: 'Trigger',
        title: 'Title',
        okText: 'OK Text',
        cancelText: 'Cancel Text',
        ok: 'OK Callback',
        cancel: 'Cancel Callback',
        layout: 'Layout',
        closeOnClickOverlay: 'Close on Click Overlay',
        closeByEsc: 'Close by ESC',
        transformOrigin: 'Transform Origin'
      },
      events: {
        ok: 'Triggered when OK button is clicked',
        cancel: 'Triggered when Cancel button is clicked'
      }
    },
    modal: {
      name: 'Modal',
      description:
        'More flexible modal window, making popup interaction richer',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Asynchronous Close'
      },
      demo3: {
        title: 'Custom Header and Footer'
      },
      demo4: {
        title: 'Allow ESC to Close'
      },
      model: {
        visible: 'Visible'
      },
      props: {
        title: 'Title',
        width: 'Width',
        top: 'Top',
        hideFooter: 'Hide Footer',
        closeByEsc: 'Close by ESC',
        okProps: 'OK Button Props',
        cancelProps: 'Cancel Button Props',
        hideOkButton: 'Hide OK Button',
        hideCancelButton: 'Hide Cancel Button',
        closeOnClickOverlay: 'Close on Click Overlay',
        zIndex: 'Z Index'
      }
    },
    popok: {
      name: 'Popok',
      description:
        'Lightweight confirmation prompt, making operation confirmation more convenient',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Trigger Method'
      },
      props: {
        type: 'Type',
        width: 'Width',
        trigger: 'Trigger',
        title: 'Title',
        okProps: 'OK Button Props',
        cancelProps: 'Cancel Button Props',
        content: 'Content',
        placement: 'Placement'
      }
    },
    popover: {
      name: 'Popover',
      description:
        'Information card when mouse hovers, making prompts more elegant',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        trigger: 'Trigger',
        placement: 'Placement',
        disabled: 'Disabled',
        loading: 'Loading',
        hideOnClick: 'Hide on Click',
        offset: 'Offset',
        popoverBodyClassName: 'Popover Body Class Name',
        triggerTarget: 'Trigger Target'
      },
      slots: {
        trigger: 'Trigger Slot',
        'popover-body': 'Popover Body Slot'
      }
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Simple text prompt bubble, making prompts lighter',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Click to Trigger'
      },
      props: {
        tips: 'Tips',
        placement: 'Placement',
        trigger: 'Trigger',
        allowHTML: 'Allow HTML',
        delay: 'Delay'
      }
    },
    loading: {
      name: 'Loading',
      description: 'Elegant loading effect, making waiting easier',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        tip: 'Tip',
        placement: 'Placement',
        trigger: 'Trigger',
        allowHTML: 'Allow HTML'
      }
    },
    result: {
      name: 'Result',
      description:
        'Used to feedback operation results, making result display more complete',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        type: 'Type',
        title: 'Title',
        content: 'Content'
      },
      slots: {
        handle: 'Handle Slot'
      }
    },
    empty: {
      name: 'Empty',
      description: 'Empty data state display, making blank pages more friendly',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        type: 'Type',
        title: 'Title',
        fontSize: 'Font Size',
        padding: 'Padding',
        width: 'Width',
        height: 'Height'
      }
    }
  }
}
