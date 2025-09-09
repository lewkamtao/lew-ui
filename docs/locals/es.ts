const contextMenu = {
  label: 'Texto mostrado',
  value: 'Valor',
  icon: 'Función de renderizado de icono',
  children: 'Colección de nodos hijos',
  disabled: 'Opción deshabilitada',
  isDividerLine: 'Es línea divisoria',
  checkable: 'Es casilla de verificación',
  checked: 'Está marcado',
  onClick: 'Evento de clic',
}

export default {
  name: 'es',
  home: {
    title: 'Lew UI',
    description: 'Una hermosa y fácil de usar biblioteca de componentes Vue3',
    getStarted: 'Comenzar',
    sloganTitle: 'Menos es más',
    slogan: 'Una hermosa y fácil de usar biblioteca de componentes Vue3',
    home: 'Inicio',
    install: 'Instalación',
    components: 'Componentes',
    formEngine: 'Motor de formularios',
    descEngine: 'Motor de descripción',
  },
  base: {
    base: 'Base',
    navigation: 'Navegación',
    form: 'Formulario',
    data: 'Componentes de datos',
    feedback: 'Retroalimentación',
    close: 'Cerrar',
    showCode: 'Mostrar código',
  },
  components: {
    image: {
      name: 'Imagen',
      description:
        'Visualización elegante de imágenes con soporte para carga diferida, estados de carga y manejo de errores',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Estado de carga',
        tipsTitle: 'Consejos',
        tipsContent:
          'Necesitas establecer el ancho y alto para tener un efecto de marcador de posición durante la carga.',
      },
      demo3: {
        title: 'Error de carga',
      },
      props: {
        src: 'URL de la imagen',
        alt: 'Descripción de la imagen',
        width: 'Ancho',
        height: 'Alto',
        objectFit: 'Modo de ajuste',
        objectPosition: 'Posición de la imagen',
        lazy: 'Activar carga diferida',
        loading: 'Mostrar estado de carga',
        title: 'Título de la imagen',
      },
    },
    avatar: {
      name: 'Avatar',
      description:
        'Un elegante componente de avatar que admite formatos de imagen, icono y texto',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Estado',
      },
      demo3: {
        title: 'Avatar predeterminado',
      },
      demo4: {
        title: 'Forma',
        description:
          'Controla la forma del avatar a través de `shape`, los valores posibles son `circle`, `square`, `sharp`.',
      },
      props: {
        size: 'Tamaño',
        loading: 'Mostrar estado de carga',
        shape: 'Forma',
        src: 'URL de la imagen',
        alt: 'Descripción de la imagen',
        status: 'Estado',
        objectFit: 'Modo de ajuste',
        objectPosition: 'Posición de la imagen',
        statusPlacement: 'Posición del estado',
      },
    },
    button: {
      name: 'Botón',
      description:
        'Haz que tus interacciones sean más fluidas con un simple clic',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Color',
      },
      demo3: {
        title: 'Icono',
      },
      demo4: {
        title: 'Estado de carga',
      },
      demo5: {
        title: 'Estado deshabilitado',
      },
      demo6: {
        title: 'Soporte de Promise',
      },
      props: {
        text: 'Texto del botón',
        type: 'Tipo',
        size: 'Tamaño',
        singleIcon: 'Mostrar solo icono',
        color: 'Color',
        round: 'Redondeado',
        dashed: 'Punteado',
        loading: 'Mostrar estado de carga',
        disabled: 'Estado deshabilitado',
        request: 'Solicitud',
      },
    },
    tag: {
      name: 'Etiqueta',
      description:
        'Una herramienta de marcado pequeña pero poderosa que añade color a la clasificación del contenido',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tipo',
      },
      demo3: {
        title: 'Tamaño',
      },
      demo4: {
        title: 'Color',
      },
      demo5: {
        title: 'Deshabilitado',
      },
      demo6: {
        title: 'Cerrable',
      },
      demo7: {
        title: 'Slot',
      },
      props: {
        text: 'Texto de la etiqueta, tiene prioridad sobre el slot, se activará el efecto text-trim cuando se exceda el ancho',
        type: 'Tipo de estilo',
        size: 'Tamaño',
        color: 'Tema de color',
        closeable: 'Permite cerrar',
        disabled: 'Deshabilitado',
        round: 'Bordes redondeados',
        oversize: 'Tamaño más holgado',
      },
    },
    badge: {
      name: 'Insignia',
      description:
        'Un pequeño punto rojo que florece en la esquina superior derecha, haciendo que las notificaciones sean más llamativas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Punto',
      },
      demo3: {
        title: 'Uso directo',
      },
      demo4: {
        title: 'Texto',
      },
      demo5: {
        title: 'Procesando',
      },
      props: {
        text: 'Texto de la insignia',
        offset: 'Desplazamiento de la insignia',
        processing: 'En procesamiento',
        max: 'Valor máximo, se mostrará como max+ si se excede',
        color: 'Color de la insignia',
        disabled: 'Deshabilitado',
        value: 'Valor de la insignia (se mostrará como punto si está vacío)',
      },
    },
    title: {
      name: 'Título',
      description:
        'No solo un título, sino una esencia que da vida al contenido',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Negrita',
      },
      demo3: {
        title: 'Color',
      },
      props: {
        text: 'Contenido del texto',
        size: 'Tamaño del texto del título, puede ser un número (unidad: píxeles) o una cadena (ej., "1.5em")',
        bold: 'Grosor del texto del título, valores opcionales son números enteros entre 100 y 900',
        color:
          'Color del texto del título, los valores opcionales incluyen nombres de colores predefinidos o valores de color personalizados',
      },
    },
    textTrim: {
      name: 'Recorte de Texto',
      description:
        'Maneja elegantemente textos largos sin arruinar la estética del diseño',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Elipsis multilínea',
      },
      demo3: {
        title: 'Texto final',
      },
      demo4: {
        title: 'Alineación',
      },
      props: {
        text: 'Contenido del texto',
        lineClamp: 'Número máximo de líneas a mostrar, el exceso será truncado',
        allowHTML: 'Permitir renderizar etiquetas HTML',
        placement: 'Posición de visualización del tooltip',
        offset:
          'Desplazamiento del tooltip relativo al elemento objetivo [x, y] (unidad: píxeles)',
        textAlign:
          'Dirección de alineación horizontal (cuando el ancho es menor que el ancho del contenedor)',
        delay:
          'Tiempo de retraso para mostrar y ocultar el tooltip [retraso de mostrar, retraso de ocultar] (unidad: milisegundos)',
        reserveEnd:
          'Número de caracteres a conservar al final, mostrará puntos suspensivos en el medio cuando el texto se desborde, conservando el inicio y el número especificado de caracteres finales',
      },
    },
    flex: {
      name: 'Flex Layout',
      description:
        'Flexible layout solution, making page layout as easy as pie',
      demo1: {
        title: 'Row',
      },
      demo2: {
        title: 'Column',
      },
      demo3: {
        title: 'Mode',
      },
      props: {
        direction: 'Direction of child elements arrangement',
        x: 'Horizontal alignment of child elements',
        y: 'Vertical alignment of child elements',
        mode: 'Distribution mode of child elements, will override x or y alignment settings, specific impact depends on the value of direction',
        wrap: 'Allow child elements to wrap automatically when space is insufficient',
        gap: 'Gap between child elements (unit: pixel)',
        width: 'Width of the Flex container (unit: pixel or percentage)',
      },
    },
    mark: {
      name: 'Mark',
      description: 'Add highlight marks to text, making key content stand out',
      demo1: {
        title: 'Basic Usage',
      },
      props: {
        color: 'Color Theme',
        round: 'Round',
        bold: 'Bold',
        cursor: 'Cursor style when hovering',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'A collection of exquisite icons, adding visual language to the interface',
    },
    backTop: {
      name: 'Back to Top',
      description:
        'One-click back to the top, making long page browsing no longer annoying',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Custom Content',
      },
      demo3: {
        title: 'Trigger by Directive',
      },
      props: {
        target:
          'Specify the target element to trigger the scroll event, using CSS selector. If empty, defaults to the entire window.',
        right:
          'Set the distance of the component from the right side of the page, unit: pixel.',
        bottom:
          'Set the distance of the component from the bottom of the page, unit: pixel.',
        valveHeight:
          'Set the threshold of the page scroll height, the back to top button will be displayed when the scroll height exceeds this value, unit: pixel.',
      },
      events: {
        click: 'Back to top event callback',
      },
    },
    steps: {
      name: 'Pasos',
      description:
        'Muestra claramente el proceso de operación, permitiendo al usuario saber dónde se encuentra',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Estado',
      },
      demo3: {
        title: 'Cargando',
      },
      model: {
        modelValue: 'Índice del paso actualmente activo',
      },
      props: {
        options: 'Array de configuración de pasos',
        status: 'Estado actual de los pasos',
        minWidth: 'Ancho mínimo del paso',
      },
      options: {
        title: 'Título del paso',
        description: 'Descripción del paso',
      },
    },
    menu: {
      name: 'Menu',
      description: 'Elegant vertical menu, making navigation hierarchical',
      demo1: {
        title: 'Basic Usage',
      },
      model: {
        modelValue: 'Bound value of the current active menu',
      },
      props: {
        options: 'Array of menu configuration items',
      },
      menuOptions: {
        label: 'Text of the menu item',
        value: 'Value of the menu item',
        children: 'Array of sub-menu items',
        disabled: 'Disable the menu item',
        icon: 'Icon of the menu item',
        tagProps: 'Badge Props of the menu item',
      },
    },
    menuTree: {
      name: 'Menu Tree',
      description:
        'Hierarchical tree menu, easily displaying complex structural relationships',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Custom Icon',
      },
      demo3: {
        title: 'Default Expand',
        description: 'Control the default expanded menu items through v-model.',
      },
      demo4: {
        title: 'Label',
      },
      demo5: {
        title: 'Custom Style',
      },
      model: {
        modelValue: 'Bound value of the current active menu',
        expandKeys: 'Array of key values of the default expanded menu items',
        collapsed: 'Collapse the menu',
      },
      props: {
        options: 'Data source of the menu tree, supporting nested structure.',
        width: 'Width of the menu tree, supporting CSS width values.',
      },
      menuTreeItem: {
        label:
          'Title text of the menu tree item. You can also use the named slot "label" to customize the title content.',
        value:
          'Value of the menu item, used to identify the uniqueness of the menu item.',
        level: 'Level of the menu tree item, starting from 1.',
        icon: 'Icon rendering function',
        tagProps: 'Badge Props of the menu item',
        disabled: 'Disable the menu item',
        isLeaf: 'Is it a leaf node',
      },
    },
    dropdown: {
      'name': 'Dropdown Menu',
      'description':
        'Hover-triggered floating menu, making operations more convenient',
      'demo1': {
        title: 'Basic Usage',
      },
      'demo2': {
        title: 'Not Just a Button',
      },
      'demo3': {
        title: 'Disabled Item',
      },
      'props': {
        options: 'Menú options configuration',
        trigger: 'Trigger method',
        placement: 'Menu pop-up position',
        checkable: 'Permite selección',
      },
      'options(LewContextMenusOption[])': contextMenu,
      'events': {
        show: 'Menu show event callback',
        hide: 'Menu hide event callback',
        change: 'Menu item selection event callback',
      },
    },
    breadcrumb: {
      name: 'Breadcrumb',
      description: 'Clear path navigation, ensuring users do not get lost',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Custom Current Selection',
      },
      demo3: {
        title: 'Separator Icon Type',
      },
      props: {
        options: 'Array of breadcrumb configuration items',
        separator: 'Separator icon type',
      },
      breadcrumbOptions: {
        label: 'Text of the breadcrumb item',
        value: 'Value of the breadcrumb item',
        active: 'Is it the current selected item',
      },
      events: {
        change: 'Triggered when the breadcrumb item changes',
      },
    },
    contextMenu: {
      'name': 'Context Menu',
      'description': 'Elegant right-click menu, making operations more natural',
      'demo1': {
        title: 'Basic Usage',
      },
      'demo2': {
        title: 'Support Multi-level Nesting',
      },
      'demo3': {
        title: 'Support Dynamic Update',
      },
      'demo4': {
        title: 'Checkbox',
      },
      'props': {
        options: 'Right-click menu configuration',
        disabled: 'Disable right-click menu',
      },
      'options(LewContextMenusOption[])': contextMenu,
    },
    form: {
      name: 'Form',
      description:
        'Powerful form handling capabilities, making data collection a breeze',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Direction',
      },
      demo3: {
        title: 'Custom Validation',
      },
      demo4: {
        title: 'Support Grid Layout',
      },
      demo5: {
        title: 'Configure with Form Engine',
      },
      demo6: {
        title: 'Asynchronous Form Item Loading',
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
          'Collection of methods for form items, containing functions for operating the form',
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
        inputFormat: 'Formatting method for input parameters',
      },
      events: {
        mounted: 'Triggered when the form item is mounted',
      },
      methods: {
        getForm: 'Get the form',
        setForm: 'Set the form',
      },
    },
    input: {
      name: 'Input',
      description: 'Feature-rich input box, making data entry more convenient',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Prefix and Suffix',
      },
      demo3: {
        title: 'Character Limit',
      },
      demo4: {
        title: 'Alignment',
      },
      demo5: {
        title: 'Password Visibility',
      },
      demo6: {
        title: 'Auto Width',
      },
      demo7: {
        title: 'Select All Text on Focus',
      },
      demo8: {
        title: 'Clearable',
      },
      demo9: {
        title: 'Read-only Status',
      },
      demo10: {
        title: 'Disabled Status',
      },
      demo11: {
        title: 'Trigger Event on Enter Key',
      },
      props: {
        type: 'Input Box Type',
        size: 'Input Box Size',
        width: 'Ancho del campo de entrada',
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
        okByEnter: 'Allow Confirmation by Enter Key',
      },
      events: {
        change: 'Triggered when the input box value changes',
        focus: 'Triggered when the input box gains focus',
        blur: 'Triggered when the input box loses focus',
        input: 'Triggered when inputting content in the input box',
        clear: 'Triggered when the input box is cleared',
        ok: 'Triggered when confirming the input box',
      },
      model: {
        modelValue: 'Input Box Bound Value',
        prefixValue: 'Input Box Prefix Value',
        suffixValue: 'Input Box Suffix Value',
      },
    },
    inputNumber: {
      name: 'Input Number',
      description:
        'Specially designed for numeric input, making number handling more precise',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Select All on Focus',
      },
      demo3: {
        title: 'Range Limit',
      },
      demo4: {
        title: 'Precise Value',
      },
      demo5: {
        title: 'Disabled and Read-only',
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
        selectByFocus: 'Select All Text on Focus',
      },
      model: {
        modelValue: 'Bound Value',
      },
    },
    textarea: {
      name: 'Textarea',
      description:
        'Multi-line text input box, making long text input more comfortable',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Character Limit',
      },
      demo3: {
        title: 'Select All Text on Focus',
      },
      demo4: {
        title: 'Clearable',
      },
      demo5: {
        title: 'Read-only',
      },
      demo6: {
        title: 'Disabled',
      },
      demo7: {
        title: 'Trigger Event on Enter Key',
      },
      demo8: {
        title: 'Resizable',
      },
      model: {
        modelValue: 'Bound Value',
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
          'Enable Confirmation by Enter Key (Shift+Enter for newline when enabled)',
      },
      events: {
        change: 'Triggered when the value changes',
        focus: 'Triggered when gaining focus',
        blur: 'Triggered when losing focus',
        input: 'Triggered when inputting content',
        clear: 'Triggered when clearing',
        ok: 'Triggered when confirming',
      },
    },
    inputTag: {
      name: 'Input Tag',
      description:
        'Easily input and manage multiple tags, making data organization clearer',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Size',
      },
      demo3: {
        title: 'Allow Duplicates',
      },
      demo4: {
        title: 'Controlled Default Value',
      },
      demo5: {
        title: 'Clearable',
      },
      demo6: {
        title: 'Read-only Status',
      },
      demo7: {
        title: 'Disabled Status',
      },
      demo8: {
        title: 'Maximum Input Length',
      },
      model: {
        modelValue: 'Bound Value',
      },
      props: {
        size: 'Size',
        disabled: 'Disable',
        clearable: 'Clearable',
        placeholder: 'Placeholder Text',
        readonly: 'Read-only',
        allowDuplicates: 'Allow Duplicates',
        maxLength: 'Maximum Number of Tags',
        width: 'Width',
      },
      events: {
        change: 'Triggered when the value changes',
        clear: 'Triggered when clearing',
        add: 'Triggered when adding a tag',
        remove: 'Triggered when removing a tag',
      },
    },
    checkbox: {
      'name': 'Checkbox',
      'description':
        'Multi-select selector, making multiple choices more intuitive',
      'demo1': {
        title: 'Basic Usage',
      },
      'demo2': {
        title: 'Vertical Distribution',
      },
      'demo3': {
        title: 'Block',
      },
      'demo4': {
        title: 'Round',
      },
      'demo5': {
        title: 'Read-only Status',
      },
      'demo6': {
        title: 'Disabled Status',
      },
      'demo7': {
        title: 'Single Mode',
      },
      'model(CheckboxGroup)': {
        modelValue: 'Bound Value',
      },
      'model(Checkbox)': {
        modelValue: 'Bound Value',
      },
      'props(CheckboxGroup)': {
        options: 'Options',
        disabled: 'Disable',
        readonly: 'Read-only',
        size: 'Size',
        direction: 'Direction',
        block: 'Block Display',
        round: 'Round Style',
        iconable: 'Enable Icon',
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
        certain: 'Certain Status',
      },
      'events(Checkbox)': {
        change: 'Triggered when the value changes',
      },
      'events(CheckboxGroup)': {
        change: 'Triggered when the value changes',
      },
      'options': {
        label: 'Title',
        value: 'Value',
        disabled: 'Disable',
      },
    },
    radio: {
      'name': 'Radio',
      'description': 'Single-select selector, making single choice more clear',
      'demo1': {
        title: 'Basic Usage',
      },
      'demo2': {
        title: 'Vertical Distribution',
      },
      'demo3': {
        title: 'Block',
      },
      'demo4': {
        title: 'Shape',
      },
      'demo5': {
        title: 'Read-only Status',
      },
      'demo6': {
        title: 'Disabled Status',
      },
      'model': {
        modelValue: 'Bound Value',
      },
      'props(RadioGroup)': {
        size: 'Size',
        block: 'Block Display',
        direction: 'Direction',
        disabled: 'Disable',
        iconable: 'Enable Icon',
        options: 'Options',
        readonly: 'Read-only',
        round: 'Round Style',
      },
      'options': {
        label: 'Title',
        value: 'Value',
        disabled: 'Disable',
      },
      'events': {
        change: 'Triggered when the value changes',
      },
    },
    tabs: {
      name: 'Tabs',
      description:
        'Make content classification display clearer and switching more fluid',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Adaptive Width',
      },
      demo3: {
        title: 'Custom Item Width',
      },
      demo4: {
        title: 'Line',
      },
      demo5: {
        title: 'Round',
      },
      model: {
        modelValue: 'Bound Value',
      },
      props: {
        options: 'Options',
        type: 'Type',
        size: 'Size',
        width: 'Width',
        itemWidth: 'Item Width',
        round: 'Round Style',
        disabled: 'Disabled',
        readonly: 'Read-only',
      },
      options: {
        label: 'Title',
        value: 'Value',
      },
    },
    select: {
      name: 'Select',
      description: 'Dropdown selector, making selection more convenient',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Search',
      },
      demo3: {
        title: 'Support Slots',
      },
      demo4: {
        title: 'Disabled Options',
      },
      demo5: {
        title: 'Read-only',
      },
      demo6: {
        title: 'Disabled',
      },
      demo7: {
        title: 'Custom Empty Status',
      },
      demo8: {
        title: 'Group',
      },
      demo9: {
        title: 'Initialize Options Method',
      },
      demo10: {
        title: 'Enable Search Cache',
      },
      model: {
        modelValue: 'Bound Value',
      },
      props: {
        defaultValue: 'Default Value',
        options: 'Options',
        width: 'Width',
        autoWidth: 'Auto Width',
        popoverWidth: 'Popover Width',
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
        showCheckIcon: 'Show Check Icon',
        initMethod: 'Initialize Options Method',
        enableSearchCache: 'Enable Search Cache',
      },
      events: {
        change: 'Triggered when the value changes',
        clear: 'Triggered when cleared',
        blur: 'Triggered when losing focus',
        focus: 'Triggered when gaining focus',
      },
      options: { label: 'Label', value: 'Value', disabled: 'Disabled' },
      slots: {
        item: 'Custom Option Content',
        empty: 'Custom Empty State Content',
      },
    },
    selectMultiple: {
      name: 'Select Multiple',
      description:
        'Dropdown selector supporting multiple selections, making multiple choices more flexible',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Custom Filter Method',
      },
      demo3: {
        title: 'Support Slots',
      },
      demo4: {
        title: 'Disabled Options',
      },
      demo5: {
        title: 'Read-only',
      },
      demo6: {
        title: 'Disabled',
      },
      demo7: {
        title: 'Empty State Slot',
      },
      demo8: {
        title: 'Group',
      },
      demo9: {
        title: 'Initialize Options Method',
        description:
          'Use the ```initMethod``` to initialize multiple selection data and return a ```Promise``` object',
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
        defaultValue: 'Default Value',
        initMethod: 'Initialize Options Method',
        enableSearchCache: 'Enable Search Cache',
      },
      model: {
        modelValue: 'Bound Value',
      },
      events: { change: 'Value Change', blur: 'Blur', focus: 'Focus' },
      options: { label: 'Label', value: 'Value', disabled: 'Disabled' },
      slots: {
        item: 'Custom Option Content',
        empty: 'Custom Empty State Content',
      },
    },
    datePicker: {
      name: 'Date Picker',
      description:
        'Simple and intuitive date selection tool, making time selection more precise',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Clearable',
      },
      demo3: {
        title: 'Custom Format',
      },
      demo4: {
        title: 'Presets',
      },
      demo5: {
        title: 'Read-only',
      },
      demo6: {
        title: 'Disabled',
      },
      model: {
        modelValue: 'Bound Value',
      },
      props: {
        valueFormat: 'Value Format',
        size: 'Size',
        width: 'Width',
        placeholder: 'Placeholder Text',
        clearable: 'Clearable',
        readonly: 'Read-only',
        disabled: 'Disabled',
        presets: 'Presets',
      },
      events: {
        change: 'Value Change',
        focus: 'Focus',
        blur: 'Blur',
        clear: 'Clear',
      },
    },
    dateRangePicker: {
      name: 'Date Range Picker',
      description:
        'A powerful tool for selecting time ranges, making range selection more convenient',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Clearable',
      },
      demo3: {
        title: 'Others',
      },
      model: {
        modelValue: 'Bound Value',
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
        disabled: 'Disabled',
      },
      events: {
        change: 'Value Change',
        focus: 'Focus',
        blur: 'Blur',
        clear: 'Clear',
      },
    },
    cascader: {
      name: 'Cascader',
      description:
        'Selector for handling multi-level data, making category selection clearer',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Free Mode',
      },
      demo3: {
        title: 'Show Only Last Level',
      },
      demo4: {
        title: 'Asynchronous Loading',
      },
      demo5: {
        title: 'Clearable',
      },
      demo6: {
        title: 'Read-only',
      },
      demo7: {
        title: 'Disabled',
      },
      demo8: {
        title: 'Disabled Options',
      },
      demo9: {
        title: 'Initialize Options Method',
        description:
          'Use the ```initMethod``` to initialize cascader data and return a ```Promise``` object',
      },
      model: {
        modelValue: 'Bound Value',
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
        readonly: 'Read-only',
        initMethod: 'Initialize Options Method',
      },
      options: {
        label: 'Label',
        value: 'Value',
        isLeaf: 'Is Leaf Node',
        children: 'Children',
        disabled: 'Disabled',
      },
    },
    treeSelect: {
      name: 'Tree Select',
      description:
        'Tree structure selector, making hierarchical selection more intuitive',
      demo1: {
        title: 'Regular',
      },
      demo2: {
        title: 'Asynchronous Data Loading',
      },
      demo3: {
        title: 'Custom Slots',
      },
      demo4: {
        title: 'Disabled Items',
      },
      demo5: {
        title: 'Expand All by Default',
      },
      demo6: {
        title: 'Searchable',
      },
      demo7: {
        title: 'Empty State Slot',
      },
      demo8: {
        title: 'Others',
      },
      demo9: {
        title: 'Read-only',
      },
      demo10: {
        title: 'Disabled',
      },
      demo11: {
        title: 'Initialize Data',
        description:
          'Use the ```initMethod``` to initialize tree data and return a ```Promise``` object',
      },
      model: {
        modelValue: 'Bound Value',
      },
      props: {
        dataSource: 'Data Source',
        defaultValue: 'Default Selected Value',
        placeholder: 'Placeholder Text',
        width: 'Width',
        size: 'Component Size',
        disabled: 'Disabled',
        clearable: 'Clearable',
        checkable: 'Show Checkbox',
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
        initMethod: 'Initialize Tree Nodes Method',
        loadMethod: 'Asynchronous Load Child Nodes Method',
      },
      slots: {
        handle: 'Slot Name',
      },
    },
    inputTable: {
      name: 'Input Table',
      description:
        'Quickly input data in a table, making batch processing more efficient',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Default Value',
      },
      demo3: {
        title: 'More Rich',
      },
      props: {
        columns: 'Configuración de columnas',
        size: 'Tamaño',
        width: 'Ancho',
        rowKey: 'Clave de fila',
        batchDeletable: 'Permite eliminación por lotes',
        addable: 'Permite agregar',
        defaultForm: 'Formulario predeterminado',
        deletable: 'Permite eliminar',
        maxRows: 'Máximo de filas',
        minRows: 'Mínimo de filas',
        clearable: 'Permite limpiar',
        sortable: 'Permite ordenar',
        autoUniqueId: 'ID único automático',
        uniqueField: 'Campo único',
        sortTooltipCustomRender:
          'Renderizado personalizado del tooltip de ordenamiento',
      },
    },
    switch: {
      name: 'Switch',
      description: 'Simple switch selector, making state switching clearer',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Square',
      },
      demo3: {
        title: 'Simulate Request',
      },
      demo4: {
        title: 'Read-only',
      },
      demo5: {
        title: 'Disabled',
      },
      model: {
        modelValue: 'Parameter Name',
      },
      props: {
        size: 'Size',
        round: 'Round',
        readonly: 'Read-only',
        disabled: 'Disabled',
        request: 'Request',
        loading: 'Loading',
      },
      events: {
        change: 'Event Name',
      },
    },
    slider: {
      name: 'Slider',
      description:
        'Select values by dragging, making value selection more intuitive',
      demo1: {
        title: 'Size',
      },
      demo2: {
        title: 'Different Step Lengths',
      },
      demo3: {
        title: 'Limit Range',
      },
      demo4: {
        title: 'Read-only',
      },
      demo5: {
        title: 'Disabled',
      },
      demo6: {
        title: 'Configuration Items',
      },
      model: {
        modelValue: 'Parameter Name',
      },
      props: {
        size: 'Size',
        min: 'Minimum Value',
        max: 'Maximum Value',
        step: 'Step Length',
        readonly: 'Read-only',
        disabled: 'Disabled',
        options: 'Options',
        formatTooltip: 'Format Tooltip',
      },
    },
    sliderRange: {
      name: 'Slider Range',
      description:
        'Slider for selecting value ranges, making range selection more flexible',
      demo1: {
        title: 'Size',
      },
      demo2: {
        title: 'Different Step Lengths',
      },
      demo3: {
        title: 'Limit Range',
      },
      demo4: {
        title: 'Read-only',
      },
      demo5: {
        title: 'Disabled',
      },
      demo6: {
        title: 'Configuration Items',
      },
      model: {
        modelValue: 'Parameter Name',
      },
      props: {
        size: 'Size',
        min: 'Minimum Value',
        max: 'Maximum Value',
        step: 'Step Length',
        readonly: 'Read-only',
        disabled: 'Disabled',
        options: 'Options',
        formatTooltip: 'Format Tooltip',
      },
    },
    rate: {
      name: 'Rate',
      description:
        'Star rating component, making scoring more vivid and interesting',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Read-only',
      },
      demo3: {
        title: 'Disabled',
      },
      demo4: {
        title: 'Tips',
      },
      model: {
        modelValue: 'Parameter Name',
      },
      props: {
        size: 'Size',
        count: 'Count',
        tips: 'Tips',
        readonly: 'Read-only',
        disabled: 'Disabled',
      },
    },
    colorPicker: {
      name: 'Color Picker',
      description:
        'Rich color selection tool, making color matching more precise',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Different Sizes',
      },
      demo3: {
        title: 'Custom Width',
      },
      demo4: {
        title: 'Disabled State',
      },
      demo5: {
        title: 'Read-only State',
      },
      model: {
        modelValue: 'Parameter Name',
      },
      props: {
        size: 'Size',
        width: 'Width',
        placeholder: 'Placeholder',
        disabled: 'Disabled',
        readonly: 'Read-only',
      },
    },
    upload: {
      name: 'Upload',
      description: 'File upload component, making file handling simpler',
      demo1: {
        title: 'Regular',
      },
      demo2: {
        title: 'Limit Format and Size',
      },
      demo3: {
        title: 'Upload Image',
      },
      demo4: {
        title: 'Custom Tips',
      },
      demo5: {
        title: 'Photo Wall',
      },
      demo6: {
        title: 'Do Not Upload',
      },
      demo7: {
        title: 'Echo',
      },
      model: {
        modelValue: 'Bound Value',
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
        viewMode: 'View Mode',
      },
    },
    table: {
      name: 'Tabla',
      description:
        'Componente de tabla potente para una visualización de datos más clara',
      model: {
        modelValue: 'Nombre del parámetro',
        selectedKeys: 'Claves seleccionadas',
        sortValue: 'Valor de ordenación',
      },
      demo1: {
        title: 'Regular',
      },
      demo2: {
        title: 'Filas y columnas fijas',
      },
      demo3: {
        title: 'Operaciones personalizadas',
      },
      demo4: {
        title: 'Slots',
      },
      demo5: {
        title: 'Estilos personalizados',
      },
      demo6: {
        title: 'Selección',
      },
      demo7: {
        title: 'Ordenable',
      },
      demo8: {
        title: 'Renderizado personalizado',
      },
      demo9: {
        title: 'Funcionalidad completa',
      },
      demo10: {
        title: 'Sin datos',
      },
      demo11: {
        title: 'Encabezados agrupados',
        tipsTitle: 'Nota de limitación',
        tipsContent:
          'Si desea que los encabezados agrupados tengan columnas fijas, debe establecer el ancho para todos los encabezados de columnas fijas, incluidos todos los nodos padre, de lo contrario puede producirse un desalineamiento.',
      },
      demo12: {
        title: 'Ordenación por arrastrar y soltar',
      },
      props: {
        columns: 'Columnas',
        dataSource: 'Fuente de datos',
        bordered: 'Bordes',
        size: 'Tamaño',
        checkable: 'Seleccionable',
        maxHeight: 'Altura máxima',
        multiple: 'Selección múltiple',
        rowKey: 'Clave de fila',
        sortTooltipCustomRender:
          'Renderizado personalizado del tooltip de ordenamiento',
        sortable: 'Permite ordenar',
      },
      tableColumns: {
        field: 'Campo',
        fixed: 'Fijo',
        title: 'Título',
        type: 'Tipo',
        width: 'Ancho',
        x: 'Eje X',
        customRender: 'Renderizado personalizado',
      },
    },
    pagination: {
      name: 'Pagination',
      description: 'Clear pagination navigation, making data browsing easier',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Huge Amount',
      },
      demo3: {
        title: 'Simulate Asynchronous',
      },
      model: {
        total: 'Total',
        currentPage: 'Current Page',
        pageSize: 'Page Size',
      },
      props: {
        size: 'Size',
        pageSizeOptions: 'Page Size Options',
        visiblePagesCount: 'Visible Pages Count',
      },
      events: {
        change: 'Change Event',
      },
    },
    magicNumber: {
      name: 'Magic Number',
      description:
        'Animation component for displaying numbers more vividly and interestingly',
    },
    tree: {
      name: 'Tree',
      description:
        'A powerful tool for displaying hierarchical data structures, making data hierarchy clearer',
      demo1: {
        title: 'Regular',
      },
      demo2: {
        title: 'Show Checkbox',
      },
      demo3: {
        title: 'Multiple Selection',
      },
      demo4: {
        title: 'Parent-child Node Association Mode',
      },
      demo5: {
        title: 'Asynchronous Request',
      },
      demo6: {
        title: 'Expand All by Default',
      },
      demo7: {
        title: 'Show Auxiliary Line',
      },
      demo8: {
        title: 'Slots',
      },
      model: {
        modelValue: 'Parameter Name',
        expandedKeys: 'Expanded Node Keys',
      },
      props: {
        dataSource: 'Data source',
        multiple: 'Multiple selection',
        height: 'Tree height',
        searchable: 'Allow tree search',
        checkable: 'Show checkbox',
        expandAll: 'Default expand all',
        free: 'Free Selection',
        showLine: 'Show Connection Line',
        trigger: 'Trigger Method',
        placeholder: 'Placeholder Text',
        keyField: 'Node Key Field',
        labelField: 'Node Label Field',
        disabledField: 'Disabled Node Field',
        initMethod: 'Initialize Tree Nodes Method',
        loadMethod: 'Asynchronous Load Child Nodes Method',
        isSelect: 'Is Selected',
      },
      slots: {
        handle: 'Slot Name',
      },
      treeDataSource: {
        label: 'Label',
        key: 'Key',
        isLeaf: 'Is Leaf Node',
        children: 'Children',
        disabled: 'Disabled',
      },
    },
    collapse: {
      'name': 'Collapse',
      'description':
        'Collapsible and expandable content area, making information display more organized',
      'demo1': {
        title: 'Basic Usage',
      },
      'demo2': {
        title: 'Title Slot',
      },
      'demo3': {
        title: 'Accordion',
      },
      'model': {
        modelValue: 'Parameter Name',
      },
      'model(CollapseItem)': {
        modelValue: 'Parameter Name',
      },
      'props': {
        width: 'Width',
      },
      'props(CollapseItem)': {
        collapseKey: 'Collapse Key',
        title: 'Title',
        radius: 'Radius',
      },
    },
    desc: {
      name: 'Description List',
      description:
        'Neatly display multiple fields, making information display more standardized',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Direction',
      },
      demo3: {
        title: 'Rich',
      },
      demo4: {
        title: 'Support Online Configuration',
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
        bordered: 'Bordered',
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
        customRender: 'Custom Render',
      },
    },
    alert: {
      name: 'Alert',
      description:
        'Eye-catching information prompt box, making warnings more gentle',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Support Slots',
      },
      demo3: {
        title: 'More Scenarios',
      },
      props: {
        type: 'Type',
        title: 'Title',
        content: 'Content',
        closeable: 'Closeable',
        footer: 'Footer',
      },
    },
    message: {
      name: 'Message',
      description:
        'Lightweight information feedback, making prompts more concise',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Controllable',
      },
      demo3: {
        title: 'Simulate Request',
      },
      events: {
        close: 'Triggered when closed',
      },
      props: {
        type: 'Type',
        content: 'Content',
        duration: 'Duration',
      },
    },
    notification: {
      name: 'Notificación',
      description: 'Notificaciones elegantes para un feedback más amigable.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tiempo de retraso',
      },
      demo3: {
        title: 'Ancho personalizado',
      },
      demo4: {
        title: 'Mostrar barra de progreso',
      },
      demo5: {
        title: 'Cierre manual',
      },
      props: {
        title: 'Título',
        content: 'Contenido de la notificación',
        delay: 'Tiempo de retraso',
        width: 'Ancho',
        showProgress: 'Mostrar barra de progreso',
      },
    },
    drawer: {
      name: 'Cajón (Drawer)',
      description:
        'Panel que se desliza desde el borde de la pantalla para operaciones temporales más fluidas.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Cierre asíncrono',
      },
      demo3: {
        title: 'Encabezado y pie de página personalizados',
      },
      demo4: {
        title: 'Permitir cerrar con ESC',
      },
      demo5: {
        title: 'Cerrar al hacer clic en la máscara',
      },
      demo6: {
        title: 'Anidamiento',
      },
      model: {
        visible: 'Visible',
      },
      props: {
        title: 'Título',
        width: 'Ancho',
        position: 'Posición',
        height: 'Alto',
        closeOnClickOverlay: 'Cerrar al hacer clic en la máscara',
        closeByEsc: 'Cerrar con la tecla ESC',
        hideFooter: 'Ocultar pie de página',
        okButtonProps: 'Propiedades del botón OK',
        closeButtonProps: 'Propiedades del botón de cierre',
        zIndex: 'Índice Z',
      },
    },
    dialog: {
      name: 'Diálogo (Dialog)',
      description: 'Diálogo modal para resaltar interacciones importantes.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Cierre asíncrono',
      },
      demo3: {
        title: 'Cerrar al hacer clic en la máscara',
      },
      demo4: {
        title: 'Cerrar con ESC',
      },
      props: {
        type: 'Tipo',
        width: 'Ancho',
        trigger: 'Disparador',
        title: 'Título',
        okText: 'Texto del botón OK',
        cancelText: 'Texto del botón Cancelar',
        ok: 'Callback de confirmación',
        cancel: 'Callback de cancelación',
        closeOnClickOverlay: 'Cerrar al hacer clic en la máscara',
        closeByEsc: 'Cerrar con la tecla ESC',
        transformOrigin: 'Origen de la transformación',
      },
      events: {
        ok: 'Se activa al hacer clic en el botón OK',
        cancel: 'Se activa al hacer clic en el botón Cancelar',
      },
    },
    modal: {
      name: 'Modal',
      description:
        'More flexible modal window, making popup interaction richer',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Asynchronous Close',
      },
      demo3: {
        title: 'Custom Header and Footer',
      },
      demo4: {
        title: 'Allow ESC to Close',
      },
      model: {
        visible: 'Visible',
      },
      props: {
        title: 'Título',
        width: 'Ancho',
        top: 'Superior',
        maxHeight: 'Altura máxima',
        hideFooter: 'Ocultar pie',
        closeByEsc: 'Cerrar con ESC',
        okButtonProps: 'Propiedades del botón OK',
        closeButtonProps: 'Propiedades del botón Cerrar',
        closeOnClickOverlay: 'Cerrar al hacer clic en la superposición',
        zIndex: 'Índice Z',
      },
    },
    popok: {
      name: 'Popok',
      description:
        'Lightweight confirmation prompt, making operation confirmation more convenient',
      demo1: {
        title: 'Basic Usage',
      },
      demo2: {
        title: 'Trigger Method',
      },
      props: {
        type: 'Tipo',
        width: 'Ancho',
        trigger: 'Disparador',
        title: 'Título',
        content: 'Contenido',
        placement: 'Posición',
        okText: 'Texto OK',
        cancelText: 'Texto Cancelar',
        ok: 'Callback OK',
        cancel: 'Callback Cancelar',
      },
    },
    popover: {
      name: 'Popover',
      description:
        'Una tarjeta emergente que proporciona información o acciones adicionales.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Disparador',
      },
      demo3: {
        title: 'Disparador personalizado',
      },
      demo4: {
        title: 'Cierre automático al hacer clic fuera',
      },
      demo5: {
        title: 'Estado de carga',
      },
      props: {
        trigger: 'Disparador',
        placement: 'Posición',
        disabled: 'Deshabilitado',
        loading: 'Cargando',
        hideOnClick: 'Ocultar al hacer clic',
        offset: 'Desplazamiento',
        popoverBodyClassName: 'Nombre de clase del cuerpo del popover',
        triggerTarget: 'Objetivo del disparador',
      },
      slots: {
        'trigger': 'Slot del disparador',
        'popover-body': 'Slot del cuerpo del popover',
      },
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Burbuja de texto simple para indicaciones más ligeras.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Activar con clic',
      },
      demo3: {
        title: 'Tiempo de retraso',
      },
      demo4: {
        title: 'Soporte HTML',
      },
      props: {
        tips: 'Contenido del tooltip',
        placement: 'Posición',
        trigger: 'Disparador',
        allowHTML: 'Permitir HTML',
        delay: 'Tiempo de retraso',
      },
    },
    loading: {
      name: 'Cargando (Loading)',
      description:
        'Elegante efecto de carga para que la espera sea más agradable.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tamaño de icono personalizado',
      },
      demo3: {
        title: 'Mensaje de información personalizado',
      },
      props: {
        tip: 'Mensaje de información',
        iconSize: 'Tamaño del icono',
        visible: 'Visible',
      },
    },
    result: {
      name: 'Resultado (Result)',
      description:
        'Used to feedback operation results, making result display more complete',
      demo1: {
        title: 'Basic Usage',
      },
      props: {
        type: 'Type',
        title: 'Title',
        content: 'Content',
      },
      slots: {
        handle: 'Handle Slot',
      },
    },
    empty: {
      name: 'Empty',
      description: 'Empty data state display, making blank pages more friendly',
      demo1: {
        title: 'Basic Usage',
      },
      props: {
        type: 'Type',
        title: 'Title',
        fontSize: 'Font Size',
        padding: 'Padding',
        width: 'Width',
        height: 'Height',
      },
    },
    actionBox: {
      name: 'Caja de acción',
      description: 'Botones de acción flexibles para operaciones rápidas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Menú desplegable',
      },
      demo3: {
        title: 'Iconos personalizados',
      },
      demo4: {
        title: 'Estilos personalizados',
      },
      props: {
        options: 'Configuración de botones de acción',
        dropdownThreshold: 'Umbral del menú desplegable',
        dropdownLabel: 'Texto del menú desplegable',
        dropdownIcon: 'Icono del menú desplegable',
        divider: 'Mostrar divisor',
        iconOnly: 'Mostrar solo icono',
        x: 'Alineación horizontal',
      },
      options: {
        label: 'Texto del botón de acción',
        icon: 'Icono del botón de acción',
        onClick: 'Evento de clic del botón de acción',
        customRender: 'Contenido de renderizado personalizado',
      },
    },
  },
}
