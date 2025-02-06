export default {
  name: 'en',
  home: {
    title: 'Lew UI',
    description: 'An elegant and user-friendly Vue3 component library',
    getStarted: 'Get Started',
    sloganTitle: 'Less is More',
    slogan: 'An elegant and user-friendly Vue3 component library',
    home: 'Home',
    install: 'Installation',
    components: 'Components',
    formEngine: 'Form Engine',
    descEngine: 'Description Engine'
  },
  base: {
    base: 'Basic',
    navigator: 'Navigation',
    form: 'Form',
    data: 'Data',
    feedback: 'Feedback'
  },
  components: {
    image: {
      name: 'Image',
      description:
        'Enhanced image display with lazy loading, loading states and error handling',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Loading State',
        tipsTitle: 'Tips',
        tipsContent:
          'Width and height must be set for placeholder loading effect.'
      },
      demo3: {
        title: 'Load Failed'
      },
      props: {
        src: 'Image source URL',
        alt: 'Image alternative text',
        width: 'Width',
        height: 'Height',
        objectFit: 'Object-fit mode',
        objectPosition: 'Object position',
        lazy: 'Enable lazy loading',
        loading: 'Show loading state',
        title: 'Image title'
      }
    },
    avatar: {
      name: 'Avatar',
      description:
        'A refined avatar component supporting images, icons and text',
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
        loading: 'Show loading state',
        shape: 'Shape',
        src: 'Image source URL',
        alt: 'Image alternative text',
        status: 'Status',
        objectFit: 'Object-fit mode',
        objectPosition: 'Object position',
        statusPlacement: 'Status placement'
      }
    },
    button: {
      name: 'Button',
      description: 'Click it for smooth and fluid interactions',
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
        title: 'Promise Support'
      },
      props: {
        text: 'Button text',
        type: 'Type',
        size: 'Size',
        singleIcon: 'Show icon only',
        color: 'Color',
        round: 'Round corners',
        dashed: 'Dashed border',
        loading: 'Show loading state',
        disabled: 'Disabled state',
        request: 'Enable request mode'
      }
    },
    tag: {
      name: 'Tag',
      description:
        'A compact yet powerful labeling tool for content categorization',
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
        text: 'Tag text (higher priority than slot, triggers text-trim when width exceeded)',
        type: 'Style type',
        size: 'Size',
        color: 'Color theme',
        closable: 'Enable close button',
        disabled: 'Disabled state',
        round: 'Round corners'
      }
    },
    badge: {
      name: 'Badge',
      description:
        'A small red dot in the top-right corner for eye-catching notifications',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Dot'
      },
      demo3: {
        title: 'Standalone'
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
        processing: 'Processing state',
        max: 'Maximum value (displays as max+ when exceeded)',
        color: 'Badge color',
        disabled: 'Disabled state',
        value: 'Badge value (shows as dot when empty)'
      }
    },
    title: {
      name: 'Title',
      description: 'More than just a heading - the soul of your content',
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
        size: 'Font size (number in pixels or string like "1.5em")',
        bold: 'Font weight (100-900 in hundreds)',
        color: 'Text color (predefined color names or custom values)'
      }
    },
    textTrim: {
      name: 'TextTrim',
      description: 'Elegantly handle long text without breaking your layout',
      demo1: {
        title: 'Basic Usage'
      },
      demo2: {
        title: 'Multi-line Ellipsis'
      },
      demo3: {
        title: 'End Text'
      },
      props: {
        text: 'Text content',
        lineClamp: 'Maximum lines before truncation',
        allowHTML: 'Allow HTML rendering',
        placement: 'Tooltip placement',
        offset: 'Tooltip offset [x, y] in pixels',
        textAlign: 'Horizontal alignment (when width is less than container)',
        delay: 'Tooltip show/hide delay [show, hide] in milliseconds',
        reserveEnd: 'Number of characters to preserve at the end'
      }
    },
    flex: {
      name: 'Flex',
      description: 'Flexible layout solution for effortless page composition',
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
        direction: 'Child element arrangement direction',
        x: 'Horizontal alignment',
        y: 'Vertical alignment',
        mode: 'Distribution mode (overrides x/y alignment based on direction)',
        wrap: 'Enable wrapping when space is insufficient',
        gap: 'Gap between elements (pixels)',
        width: 'Container width (pixels or percentage)'
      }
    },
    mark: {
      name: 'Mark',
      description: 'Highlight text to make key content stand out',
      demo1: {
        title: 'Basic Usage'
      },
      props: {
        color: 'Color theme',
        round: 'Round corners',
        bold: 'Bold text',
        cursor: 'Cursor style on hover'
      }
    },
    icon: {
      name: 'Icon',
      description: 'Beautiful icon collection to enhance visual language'
    },
    backTop: {
      name: 'BackTop',
      description: 'One-click return to top for hassle-free long page browsing'
    },
    steps: {
      name: 'Steps',
      description: 'Clear process visualization to keep users oriented'
    },
    menu: {
      name: 'Menu',
      description: 'Elegant vertical menu for clear navigation hierarchy'
    },
    menuTree: {
      name: 'MenuTree',
      description: 'Hierarchical tree menu for complex structural relationships'
    },
    dropdown: {
      name: 'Dropdown',
      description: 'Click-triggered floating menu for convenient operations'
    },
    breadcrumb: {
      name: 'Breadcrumb',
      description: 'Clear path navigation to keep users on track'
    },
    contextMenu: {
      name: 'ContextMenu',
      description: 'Elegant right-click menu for natural interactions'
    },
    form: {
      name: 'Form',
      description:
        'Powerful form handling capabilities for effortless data collection'
    },
    input: {
      name: 'Input',
      description: 'Feature-rich input field for convenient data entry'
    },
    inputNumber: {
      name: 'InputNumber',
      description: 'Specialized numeric input for precise number handling'
    },
    textarea: {
      name: 'Textarea',
      description: 'Multi-line text input for comfortable long text entry'
    },
    inputTag: {
      name: 'InputTag',
      description: 'Easy tag input and management for clear data organization'
    },
    checkbox: {
      name: 'Checkbox',
      description: 'Multiple-choice selector for intuitive selection'
    },
    radio: {
      name: 'Radio',
      description: 'Single-choice selector for clear decision making'
    },
    tabs: {
      name: 'Tabs',
      description: 'Clear content categorization with smooth transitions'
    },
    select: {
      name: 'Select',
      description: 'Dropdown selection for convenient choosing'
    },
    selectMultiple: {
      name: 'SelectMultiple',
      description: 'Multiple-selection dropdown for flexible choices'
    },
    datePicker: {
      name: 'DatePicker',
      description: 'Simple and intuitive date selection tool'
    },
    dateRangePicker: {
      name: 'DateRangePicker',
      description: 'Efficient tool for selecting date ranges'
    },
    cascader: {
      name: 'Cascader',
      description: 'Multi-level data selector for clear categorical choices'
    },
    treeSelect: {
      name: 'TreeSelect',
      description:
        'Tree-structured selector for intuitive hierarchical selection'
    },
    inputTable: {
      name: 'InputTable',
      description: 'Quick table data entry for efficient batch processing'
    },
    switch: {
      name: 'Switch',
      description: 'Clean toggle switch for clear state changes'
    },
    slider: {
      name: 'Slider',
      description: 'Drag-to-select value for intuitive number selection'
    },
    sliderRange: {
      name: 'SliderRange',
      description: 'Range slider for flexible value range selection'
    },
    rate: {
      name: 'Rate',
      description: 'Star rating component for lively scoring'
    },
    colorPicker: {
      name: 'ColorPicker',
      description: 'Rich color selection tool for precise color picking'
    },
    upload: {
      name: 'Upload',
      description: 'File upload component for simple file handling'
    },
    table: {
      name: 'Table',
      description: 'Powerful table component for clear data presentation'
    },
    pagination: {
      name: 'Pagination',
      description: 'Clear page navigation for easy data browsing'
    },
    magicNumber: {
      name: 'MagicNumber',
      description: 'Animated number display for engaging numeric presentation'
    },
    tree: {
      name: 'Tree',
      description: 'Hierarchical data structure display for clear organization'
    },
    collapse: {
      name: 'Collapse',
      description: 'Collapsible content areas for clean information display'
    },
    desc: {
      name: 'Desc',
      description:
        'Organized field display for standardized information presentation'
    },
    alert: {
      name: 'Alert',
      description: 'Eye-catching yet gentle warning messages'
    },
    message: {
      name: 'Message',
      description: 'Lightweight feedback for concise notifications'
    },
    notification: {
      name: 'Notification',
      description: 'Elegant notification system for friendly message delivery'
    },
    drawer: {
      name: 'Drawer',
      description: 'Sliding panel for smooth temporary operations'
    },
    dialog: {
      name: 'Dialog',
      description: 'Modal dialog for prominent information interaction'
    },
    modal: {
      name: 'Modal',
      description: 'Flexible modal window for rich popup interactions'
    },
    popok: {
      name: 'Popok',
      description:
        'Lightweight confirmation popup for quick action verification'
    },
    popover: {
      name: 'Popover',
      description: 'Hover information card for elegant tooltips'
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Simple text tooltip for lightweight hints'
    },
    loading: {
      name: 'Loading',
      description: 'Elegant loading effects for comfortable waiting'
    },
    result: {
      name: 'Result',
      description: 'Operation result feedback for complete status display'
    },
    empty: {
      name: 'Empty',
      description: 'Empty state display for friendly blank pages'
    }
  }
}
