const contextMenu = {
  label: 'Texto exibido',
  value: 'Valor',
  icon: 'Função de renderização de ícone',
  children: 'Coleção de nós filhos',
  disabled: 'Opção desativada',
  isDividerLine: 'É linha divisória',
  checkable: 'É caixa de seleção',
  checked: 'Está marcado',
  onClick: 'Evento de clique',
}

export default {
  name: 'pt',
  home: {
    title: 'Lew UI',
    description: 'Uma biblioteca de componentes Vue3 bonita e fácil de usar',
    getStarted: 'Começar',
    sloganTitle: 'Menos é mais',
    slogan: 'Uma biblioteca de componentes Vue3 bonita e fácil de usar',
    home: 'Início',
    install: 'Instalação',
    components: 'Componentes',
    formEngine: 'Motor de formulários',
    descEngine: 'Motor de descrição',
  },
  base: {
    base: 'Base',
    navigation: 'Navegação',
    form: 'Formulário',
    data: 'Componentes de dados',
    feedback: 'Feedback',
    close: 'Fechar',
    showCode: 'Mostrar código',
  },
  components: {
    image: {
      name: 'Imagem',
      description:
        'Exibição elegante de imagens com suporte para carregamento preguiçoso, estados de carregamento e tratamento de erros',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Estado de carregamento',
        tipsTitle: 'Dicas',
        tipsContent:
          'Você precisa definir largura e altura para ter um efeito de carregamento com placeholder.',
      },
      demo3: {
        title: 'Erro de carregamento',
      },
      props: {
        src: 'URL da imagem',
        alt: 'Descrição da imagem',
        width: 'Largura',
        height: 'Altura',
        objectFit: 'Modo de ajuste',
        objectPosition: 'Posição da imagem',
        lazy: 'Ativar carregamento preguiçoso',
        loading: 'Mostrar estado de carregamento',
        title: 'Título da imagem',
      },
    },
    avatar: {
      name: 'Avatar',
      description:
        'Um elegante componente de avatar que suporta formatos de imagem, ícone e texto',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Estado',
      },
      demo3: {
        title: 'Avatar padrão',
      },
      demo4: {
        title: 'Forma',
        description:
          'Controle a forma do avatar através da propriedade `shape`, que aceita os valores `circle`, `square` e `sharp`.',
      },
      props: {
        size: 'Tamanho',
        loading: 'Mostrar estado de carregamento',
        shape: 'Forma',
        src: 'URL da imagem',
        alt: 'Descrição da imagem',
        status: 'Estado',
        objectFit: 'Modo de ajuste',
        objectPosition: 'Posição da imagem',
        statusPlacement: 'Posição do estado',
      },
    },
    button: {
      name: 'Botão',
      description: 'Torne suas interações mais fluidas com um simples clique',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Cor',
      },
      demo3: {
        title: 'Ícone',
      },
      demo4: {
        title: 'Estado de carregamento',
      },
      demo5: {
        title: 'Estado desativado',
      },
      demo6: {
        title: 'Suporte a Promise',
      },
      props: {
        text: 'Texto do botão',
        type: 'Tipo',
        size: 'Tamanho',
        singleIcon: 'Mostrar apenas ícone',
        color: 'Cor',
        round: 'Arredondado',
        dashed: 'Tracejado',
        loading: 'Mostrar estado de carregamento',
        disabled: 'Estado desativado',
        request: 'Requisição',
      },
    },
    tag: {
      name: 'Etiqueta',
      description:
        'Uma ferramenta de marcação pequena mas poderosa que adiciona cor à classificação de conteúdo',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tipo',
      },
      demo3: {
        title: 'Tamanho',
      },
      demo4: {
        title: 'Cor',
      },
      demo5: {
        title: 'Desativado',
      },
      demo6: {
        title: 'Fechável',
      },
      demo7: {
        title: 'Slot',
      },
      props: {
        text: 'Texto da etiqueta, tem prioridade sobre o slot, o efeito text-trim será ativado quando a largura for excedida',
        type: 'Tipo de estilo',
        size: 'Tamanho',
        color: 'Tema de cor',
        closeable: 'Fechável',
        disabled: 'Desativado',
        round: 'Arredondado',
        oversize: 'Tamanho mais solto',
      },
    },
    badge: {
      name: 'Emblema',
      description:
        'Um pequeno ponto vermelho que floresce no canto superior direito, tornando as notificações mais chamativas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Ponto',
      },
      demo3: {
        title: 'Uso direto',
      },
      demo4: {
        title: 'Texto',
      },
      demo5: {
        title: 'Processando',
      },
      props: {
        text: 'Texto do emblema',
        offset: 'Deslocamento do emblema',
        processing: 'Em processamento',
        max: 'Valor máximo, será exibido como max+ se excedido',
        color: 'Cor do emblema',
        disabled: 'Desativado',
        value: 'Valor do emblema (será exibido como ponto se vazio)',
      },
    },
    title: {
      name: 'Título',
      description:
        'Não apenas um título, mas a essência que dá vida ao conteúdo',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Negrito',
      },
      demo3: {
        title: 'Cor',
      },
      props: {
        text: 'Conteúdo do texto',
        size: 'Tamanho do texto do título, pode ser um número (unidade: pixels) ou uma string (ex: "1.5em")',
        bold: 'Espessura do texto do título, valores opcionais são números inteiros entre 100 e 900',
        color:
          'Cor do texto do título, os valores opcionais incluem nomes de cores predefinidas ou valores de cor personalizados',
      },
    },
    textTrim: {
      name: 'Corte de texto TextTrim',
      description: 'Trata textos longos com elegância, sem quebrar o layout',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Múltiplas linhas',
      },
      demo3: {
        title: 'Texto final',
      },
      demo4: {
        title: 'Alinhamento',
      },
      props: {
        text: 'Conteúdo do texto',
        lineClamp: 'Número máximo de linhas a exibir, o excesso será truncado',
        allowHTML: 'Permite renderizar tags HTML',
        placement: 'Posição da dica',
        offset:
          'Deslocamento da dica em relação ao elemento alvo [x, y] (pixels)',
        textAlign:
          'Alinhamento no eixo x (quando a largura é menor que o container)',
        delay: 'Atraso para mostrar/ocultar a dica [mostrar, ocultar] (ms)',
        reserveEnd:
          'Número de caracteres a preservar no final, mostrando reticências no meio',
      },
    },
    flex: {
      name: 'Layout flexível Flex',
      description:
        'Solução flexível de layout para organizar elementos com facilidade',
      demo1: {
        title: 'Linha',
      },
      demo2: {
        title: 'Coluna',
      },
      demo3: {
        title: 'Modo',
      },
      props: {
        direction: 'Direção dos elementos filhos',
        x: 'Alinhamento horizontal dos elementos filhos',
        y: 'Alinhamento vertical dos elementos filhos',
        mode: 'Modo de distribuição dos elementos, sobrepõe x ou y dependendo da direção',
        wrap: 'Permite quebra de linha quando não há espaço',
        gap: 'Espaçamento entre elementos (pixels)',
        width: 'Largura do container Flex (pixels ou porcentagem)',
      },
    },
    mark: {
      name: 'Marcador Mark',
      description: 'Destaca texto importante com realce visual',
      demo1: {
        title: 'Uso básico',
      },
      props: {
        color: 'Cor do tema',
        round: 'Bordas arredondadas',
        bold: 'Texto em negrito',
        cursor: 'Estilo do cursor ao passar o mouse',
      },
    },
    icon: {
      name: 'Ícone Icon',
      description: 'Coleção de ícones elegantes para enriquecer a interface',
    },
    backTop: {
      name: 'Voltar ao topo BackTop',
      description: 'Retorna ao topo da página com um clique',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Conteúdo personalizado',
      },
      demo3: {
        title: 'Via diretiva',
      },
      props: {
        target: 'Seletor CSS do elemento alvo. Se vazio, usa a janela inteira',
        right: 'Distância da direita da página (pixels)',
        bottom: 'Distância do fundo da página (pixels)',
        valveHeight: 'Altura de rolagem para exibir o botão (pixels)',
      },
      events: {
        click: 'Callback ao clicar para voltar ao topo',
      },
    },
    steps: {
      name: 'Passos',
      description:
        'Exibe claramente o processo de operação, permitindo que o usuário saiba onde está',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Status',
      },
      demo3: {
        title: 'Carregando',
      },
      model: {
        modelValue: 'Índice do passo atualmente ativo',
      },
      props: {
        options: 'Array de configuração de passos',
        status: 'Estado atual dos passos',
        minWidth: 'Largura mínima do passo',
      },
      options: {
        title: 'Título do passo',
        description: 'Descrição do passo',
      },
    },
    menu: {
      name: 'Menu Menu',
      description: 'Menu vertical elegante para navegação clara',
      demo1: {
        title: 'Uso básico',
      },
      model: {
        modelValue: 'Valor do menu ativo',
      },
      props: {
        options: 'Array de configuração do menu',
      },
      menuOptions: {
        label: 'Texto do item',
        value: 'Valor do item',
        children: 'Array de subitens',
        disabled: 'Desabilita o item',
        icon: 'Ícone do item',
        tagProps: 'Props da tag do item',
      },
    },
    menuTree: {
      name: 'Árvore de menu MenuTree',
      description: 'Menu em árvore para estruturas complexas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Ícones personalizados',
      },
      demo3: {
        title: 'Expansão padrão',
        description: 'Controle os itens expandidos via v-model.',
      },
      demo4: {
        title: 'Tags',
      },
      demo5: {
        title: 'Estilo personalizado',
      },
      model: {
        modelValue: 'Valor do menu ativo',
        expandKeys: 'Array de chaves dos itens expandidos',
        collapsed: 'Menu recolhido',
      },
      props: {
        options: 'Dados do menu em árvore, suporta estrutura aninhada',
        width: 'Largura do menu em árvore, aceita valores CSS',
      },
      menuTreeItem: {
        label: 'Texto do título. Pode usar slot "label" para personalizar',
        value: 'Valor único do item',
        level: 'Nível do item, começa em 1',
        icon: 'Função de renderização do ícone',
        tagProps: 'Props da tag do item',
        disabled: 'Desabilita o item',
        isLeaf: 'É um nó folha',
      },
    },
    dropdown: {
      'name': 'Menu suspenso Dropdown',
      'description': 'Menu flutuante acionado por clique',
      'demo1': {
        title: 'Uso básico',
      },
      'demo2': {
        title: 'Além de botões',
      },
      'demo3': {
        title: 'Itens desabilitados',
      },
      'props': {
        options: 'Configuração das opções',
        trigger: 'Modo de acionamento',
        placement: 'Posição do menu',
        checkable: 'Permite seleção',
      },
      'options(LewContextMenusOption[])': contextMenu,
      'events': {
        show: 'Callback ao mostrar menu',
        hide: 'Callback ao ocultar menu',
        change: 'Callback ao selecionar item',
      },
    },
    breadcrumb: {
      name: 'Navegação estrutural Breadcrumb',
      description: 'Navegação clara do caminho para orientar usuários',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Seleção atual personalizada',
      },
      demo3: {
        title: 'Tipo de separador',
      },
      props: {
        options: 'Array de configuração',
        separator: 'Tipo de ícone separador',
      },
      breadcrumbOptions: {
        label: 'Texto do item',
        value: 'Valor do item',
        active: 'Item atual',
      },
      events: {
        change: 'Dispara ao mudar item',
      },
    },
    contextMenu: {
      'name': 'Menu de contexto ContextMenu',
      'description': 'Menu elegante do botão direito',
      'demo1': {
        title: 'Uso básico',
      },
      'demo2': {
        title: 'Suporta múltiplos níveis',
      },
      'demo3': {
        title: 'Atualização dinâmica',
      },
      'demo4': {
        title: 'Checkbox',
      },
      'props': {
        options: 'Configuração do menu',
        disabled: 'Desabilita o menu',
      },
      'options(LewContextMenusOption[])': contextMenu,
    },
    actionBox: {
      name: 'Caixa de ação',
      description: 'Botões de ação flexíveis para operações rápidas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Menu suspenso',
      },
      demo3: {
        title: 'Ícones personalizados',
      },
      demo4: {
        title: 'Estilos personalizados',
      },
      props: {
        options: 'Configuração dos botões de ação',
        dropdownThreshold: 'Limite do menu suspenso',
        dropdownLabel: 'Texto do menu suspenso',
        dropdownIcon: 'Ícone do menu suspenso',
        divider: 'Exibir divisor',
        iconOnly: 'Apenas ícone',
        x: 'Alinhamento horizontal',
      },
      options: {
        label: 'Texto do botão de ação',
        icon: 'Ícone do botão de ação',
        onClick: 'Evento de clique do botão de ação',
        customRender: 'Conteúdo de renderização personalizado',
      },
    },
    form: {
      name: 'Formulário Form',
      description:
        'Poderosa capacidade de processamento de formulários para coleta de dados eficiente',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Direção',
      },
      demo3: {
        title: 'Validação personalizada',
      },
      demo4: {
        title: 'Suporte a layout em grade',
      },
      demo5: {
        title: 'Configuração com motor de formulário',
      },
      demo6: {
        title: 'Carregamento assíncrono de itens',
      },
      props: {
        options:
          'Array de opções que definem a estrutura e conteúdo do formulário',
        size: 'Tamanho geral do formulário, afeta todos os itens',
        width:
          'Largura geral do formulário, aceita número (pixels) ou porcentagem',
        columns: 'Número de itens por linha, máximo 4',
        labelWidth:
          'Largura do rótulo do item, aceita número (pixels) ou "auto"',
        disabled: 'Desabilita todo o formulário',
        readonly: 'Define todo o formulário como somente leitura',
        direction: 'Direção dos itens, "x" para horizontal, "y" para vertical',
        formMethods: 'Conjunto de métodos para manipular o formulário',
      },
      formItemProps: {
        label: 'Texto do rótulo do item',
        field: 'Nome do campo para vinculação e validação',
        required: 'Se o campo é obrigatório',
        as: 'Tipo do item de formulário, ex: "input", "select"',
        size: 'Tamanho individual do item',
        width: 'Largura individual do item',
        labelWidth: 'Largura do rótulo individual',
        direction: 'Direção individual do item',
        disabled: 'Desabilita o item',
        readonly: 'Define o item como somente leitura',
        tips: 'Texto de ajuda do item',
        errMessage: 'Mensagem de erro personalizada',
        rule: 'Regra de validação',
        props: 'Propriedades adicionais',
        between: 'Adiciona espaço entre itens horizontais',
        gridArea: 'Posição no layout em grade',
        outputFormat: 'Formatação de saída',
        inputFormat: 'Formatação de entrada',
      },
      events: {
        mounted: 'Disparado quando o item é montado',
      },
      methods: {
        getForm: 'Obtém o formulário',
        setForm: 'Define o formulário',
      },
    },
    input: {
      name: 'Campo de entrada Input',
      description:
        'Campo de entrada rico em recursos para entrada de dados conveniente',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Prefixo e sufixo',
      },
      demo3: {
        title: 'Limite de caracteres',
      },
      demo4: {
        title: 'Alinhamento',
      },
      demo5: {
        title: 'Senha visível',
      },
      demo6: {
        title: 'Largura automática',
      },
      demo7: {
        title: 'Selecionar tudo ao focar',
      },
      demo8: {
        title: 'Limpável',
      },
      demo9: {
        title: 'Somente leitura',
      },
      demo10: {
        title: 'Desabilitado',
      },
      demo11: {
        title: 'Evento ao pressionar Enter',
      },
      props: {
        type: 'Tipo do campo',
        size: 'Tamanho do campo',
        width: 'Largura do campo',
        placeholder: 'Texto de placeholder',
        disabled: 'Desabilita o campo',
        readonly: 'Define como somente leitura',
        clearable: 'Permite limpar o campo',
        showPassword: 'Permite mostrar/ocultar senha',
        maxLength: 'Comprimento máximo',
        showCount: 'Mostra contador de caracteres',
        align: 'Alinhamento do texto',
        minWidth: 'Largura mínima',
        autoWidth: 'Ajusta largura automaticamente',
        selectByFocus: 'Seleciona todo o texto ao focar',
        copyable: 'Permite copiar (apenas com readonly=true e suffix=false)',
        prefixes: 'Tipo de prefixo',
        prefixesOptions: 'Opções de prefixo para tipo select',
        prefixesTooltip: 'Tooltip do prefixo',
        suffix: 'Tipo de sufixo',
        suffixOptions: 'Opções de sufixo para tipo select',
        suffixTooltip: 'Tooltip do sufixo',
        okByEnter: 'Permite confirmar com Enter',
      },
      events: {
        change: 'Ao alterar valor',
        focus: 'Ao receber foco',
        blur: 'Ao perder foco',
        input: 'Ao digitar',
        clear: 'Ao limpar',
        ok: 'Ao confirmar',
      },
      model: {
        modelValue: 'Valor vinculado',
        prefixValue: 'Valor do prefixo',
        suffixValue: 'Valor do sufixo',
      },
    },
    inputNumber: {
      name: 'Campo numérico InputNumber',
      description: 'Campo específico para entrada de números com precisão',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Selecionar ao focar',
      },
      demo3: {
        title: 'Limites',
      },
      demo4: {
        title: 'Precisão',
      },
      demo5: {
        title: 'Desabilitado e somente leitura',
      },
      props: {
        min: 'Valor mínimo',
        max: 'Valor máximo',
        step: 'Incremento',
        disabled: 'Precisão',
        size: 'Tamanho: small, medium, large',
        placeholder: 'Texto de placeholder',
        readonly: 'Somente leitura',
        width: 'Largura',
        align: 'Alinhamento',
        selectByFocus: 'Seleciona ao focar',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
    },
    textarea: {
      name: 'Área de texto Textarea',
      description: 'Campo para entrada de texto multilinha',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Limite de caracteres',
      },
      demo3: {
        title: 'Selecionar ao focar',
      },
      demo4: {
        title: 'Limpável',
      },
      demo5: {
        title: 'Somente leitura',
      },
      demo6: {
        title: 'Desabilitado',
      },
      demo7: {
        title: 'Evento ao pressionar Enter',
      },
      demo8: {
        title: 'Redimensionável',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        placeholder: 'Texto de placeholder',
        disabled: 'Desabilita o campo',
        readonly: 'Somente leitura',
        clearable: 'Permite limpar',
        showCount: 'Mostra contador',
        maxLength: 'Comprimento máximo',
        size: 'Tamanho',
        resize: 'Direção de redimensionamento',
        width: 'Largura',
        height: 'Altura',
        minWidth: 'Largura mínima',
        minHeight: 'Altura mínima',
        maxWidth: 'Largura máxima',
        maxHeight: 'Altura máxima',
        selectByFocus: 'Seleciona ao focar',
        okByEnter: 'Confirma com Enter (Shift+Enter para nova linha)',
      },
      events: {
        change: 'Ao alterar valor',
        focus: 'Ao receber foco',
        blur: 'Ao perder foco',
        input: 'Ao digitar',
        clear: 'Ao limpar',
        ok: 'Ao confirmar',
      },
    },
    inputTag: {
      name: 'Campo de tags InputTag',
      description: 'Entrada e gerenciamento fácil de múltiplas tags',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tamanho',
      },
      demo3: {
        title: 'Permitir duplicatas',
      },
      demo4: {
        title: 'Valor padrão controlado',
      },
      demo5: {
        title: 'Limpável',
      },
      demo6: {
        title: 'Somente leitura',
      },
      demo7: {
        title: 'Desabilitado',
      },
      demo8: {
        title: 'Comprimento máximo',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        size: 'Tamanho',
        disabled: 'Desabilitado',
        clearable: 'Limpável',
        placeholder: 'Texto de placeholder',
        readonly: 'Somente leitura',
        allowDuplicates: 'Permite duplicatas',
        maxLength: 'Número máximo de tags',
        width: 'Largura',
      },
      events: {
        change: 'Ao alterar valor',
        clear: 'Ao limpar',
        add: 'Ao adicionar tag',
        remove: 'Ao remover tag',
      },
    },
    checkbox: {
      'name': 'Caixa de seleção Checkbox',
      'description': 'Seletor que suporta múltipla escolha',
      'demo1': {
        title: 'Uso básico',
      },
      'demo2': {
        title: 'Distribuição vertical',
      },
      'demo3': {
        title: 'Em bloco',
      },
      'demo4': {
        title: 'Arredondado',
      },
      'demo5': {
        title: 'Somente leitura',
      },
      'demo6': {
        title: 'Desabilitado',
      },
      'demo7': {
        title: 'Modo único',
      },
      'model(CheckboxGroup)': {
        modelValue: 'Valor vinculado',
      },
      'model(Checkbox)': {
        modelValue: 'Valor vinculado',
      },
      'props(CheckboxGroup)': {
        options: 'Opções',
        disabled: 'Desabilitado',
        readonly: 'Somente leitura',
        size: 'Tamanho',
        direction: 'Direção',
        block: 'Em bloco',
        round: 'Arredondado',
        iconable: 'Permite ícone',
      },
      'props(Checkbox)': {
        label: 'Rótulo',
        value: 'Valor',
        disabled: 'Desabilitado',
        readonly: 'Somente leitura',
        checked: 'Marcado',
        size: 'Tamanho',
        block: 'Em bloco',
        round: 'Arredondado',
        iconable: 'Permite ícone',
        certain: 'Estado definido',
      },
      'events(Checkbox)': {
        change: 'Ao alterar valor',
      },
      'events(CheckboxGroup)': {
        change: 'Ao alterar valor',
      },
      'options': {
        label: 'Rótulo',
        value: 'Valor',
        disabled: 'Desabilitado',
      },
    },
    radio: {
      'name': 'Botão de opção Radio',
      'description': 'Seletor que permite apenas uma escolha',
      'demo1': {
        title: 'Uso básico',
      },
      'demo2': {
        title: 'Distribuição vertical',
      },
      'demo3': {
        title: 'Em bloco',
      },
      'demo4': {
        title: 'Forma',
      },
      'demo5': {
        title: 'Somente leitura',
      },
      'demo6': {
        title: 'Desabilitado',
      },
      'model': {
        modelValue: 'Valor vinculado',
      },
      'props(RadioGroup)': {
        size: 'Tamanho',
        block: 'Em bloco',
        direction: 'Direção',
        disabled: 'Desabilitado',
        iconable: 'Permite ícone',
        options: 'Opções',
        readonly: 'Somente leitura',
        round: 'Arredondado',
      },
      'options': {
        label: 'Rótulo',
        value: 'Valor',
        disabled: 'Desabilitado',
      },
      'events': {
        change: 'Ao alterar valor',
      },
    },
    tabs: {
      name: 'Abas Tabs',
      description:
        'Exibe conteúdo categorizado de forma clara, com transições suaves',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Largura adaptável',
      },
      demo3: {
        title: 'Largura personalizada do item',
      },
      demo4: {
        title: 'Linha',
      },
      demo5: {
        title: 'Arredondado',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        options: 'Opções',
        type: 'Tipo',
        size: 'Tamanho',
        width: 'Largura',
        itemWidth: 'Largura do item',
        round: 'Estilo arredondado',
        disabled: 'Desabilitado',
        readonly: 'Somente leitura',
      },
      options: {
        label: 'Título',
        value: 'Valor',
      },
    },
    select: {
      name: 'Seletor Select',
      description: 'Caixa de seleção suspensa para escolhas mais convenientes',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Pesquisa',
      },
      demo3: {
        title: 'Suporte a slots',
      },
      demo4: {
        title: 'Opções desabilitadas',
      },
      demo5: {
        title: 'Somente leitura',
      },
      demo6: {
        title: 'Desabilitado',
      },
      demo7: {
        title: 'Estado vazio personalizado',
      },
      demo8: {
        title: 'Agrupamento',
      },
      demo9: {
        title: 'Método de inicialização de opções',
      },
      demo10: {
        title: 'Habilitar cache de pesquisa',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        defaultValue: 'Valor padrão',
        options: 'Opções',
        autoWidth: 'Largura automática',
        width: 'Largura',
        popoverWidth: 'Largura do popover',
        trigger: 'Modo de acionamento',
        placeholder: 'Texto de placeholder',
        size: 'Tamanho',
        itemHeight: 'Altura do item',
        searchable: 'Permite pesquisa',
        searchMethod: 'Método de pesquisa',
        searchDelay: 'Atraso da pesquisa',
        clearable: 'Permite limpar',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        showCheckIcon: 'Exibir ícone de seleção',
        initMethod: 'Método de inicialização de opções',
        enableSearchCache: 'Habilitar cache de pesquisa',
      },
      events: {
        change: 'Ao alterar valor',
        clear: 'Ao limpar',
        blur: 'Ao perder foco',
        focus: 'Ao ganhar foco',
      },
      options: {
        label: 'Título',
        value: 'Valor',
        disabled: 'Desabilitado',
      },
      slots: {
        item: 'Conteúdo personalizado do item',
        empty: 'Conteúdo personalizado quando vazio',
      },
    },
    selectMultiple: {
      name: 'Seletor Múltiplo SelectMultiple',
      description: 'Caixa de seleção múltipla para escolhas mais flexíveis',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Método de filtro personalizado',
      },
      demo3: {
        title: 'Suporte a slots',
      },
      demo4: {
        title: 'Opções desabilitadas',
      },
      demo5: {
        title: 'Somente leitura',
      },
      demo6: {
        title: 'Desabilitado',
      },
      demo7: {
        title: 'Slot de estado vazio',
      },
      demo8: {
        title: 'Agrupamento',
      },
      demo9: {
        title: 'Método de inicialização de opções',
        description:
          'Use o método ```initMethod``` para inicializar dados de seleção múltipla e retornar um objeto ```Promise```',
      },
      props: {
        options: 'Opções',
        trigger: 'Modo de acionamento',
        width: 'Largura',
        valueLayout: 'Layout do valor',
        valueTextSplit: 'Separador de texto do valor',
        placeholder: 'Texto de placeholder',
        size: 'Tamanho',
        itemHeight: 'Altura do item',
        searchable: 'Permite pesquisa',
        searchPlaceholder: 'Texto de placeholder da pesquisa',
        searchMethod: 'Método de pesquisa',
        searchDelay: 'Atraso da pesquisa',
        clearable: 'Permite limpar',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        showCheckIcon: 'Exibir ícone de seleção',
        defaultValue: 'Valor padrão',
        initMethod: 'Método de inicialização de opções',
        enableSearchCache: 'Habilitar cache de pesquisa',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      events: {
        change: 'Ao alterar valor',
        blur: 'Ao perder foco',
        focus: 'Ao ganhar foco',
      },
      options: {
        label: 'Rótulo',
        value: 'Valor',
        disabled: 'Desabilitado',
      },
      slots: {
        item: 'Conteúdo personalizado do item',
        empty: 'Conteúdo personalizado quando vazio',
      },
    },
    datePicker: {
      name: 'Seletor de Data DatePicker',
      description: 'Ferramenta intuitiva para seleção precisa de datas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Permite limpar',
      },
      demo3: {
        title: 'Formato personalizado',
      },
      demo4: {
        title: 'Predefinições',
      },
      demo5: {
        title: 'Somente leitura',
      },
      demo6: {
        title: 'Desabilitado',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        valueFormat: 'Formato do valor',
        size: 'Tamanho',
        width: 'Largura',
        placeholder: 'Texto de placeholder',
        clearable: 'Permite limpar',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        presets: 'Valores predefinidos',
      },
      events: {
        change: 'Ao alterar valor',
        focus: 'Ao ganhar foco',
        blur: 'Ao perder foco',
        clear: 'Ao limpar',
      },
    },
    dateRangePicker: {
      name: 'Seletor de Intervalo de Data DateRangePicker',
      description: 'Ferramenta para seleção conveniente de intervalos de datas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Permite limpar',
      },
      demo3: {
        title: 'Outros',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        startKey: 'Chave inicial',
        endKey: 'Chave final',
        valueFormat: 'Formato do valor',
        size: 'Tamanho',
        width: 'Largura',
        placeholderStart: 'Texto de placeholder inicial',
        placeholderEnd: 'Texto de placeholder final',
        clearable: 'Permite limpar',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
      },
      events: {
        change: 'Ao alterar valor',
        focus: 'Ao ganhar foco',
        blur: 'Ao perder foco',
        clear: 'Ao limpar',
      },
    },
    cascader: {
      name: 'Seletor em Cascata Cascader',
      description:
        'Seletor para dados multinível, tornando a seleção categorizada mais clara',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Modo livre',
      },
      demo3: {
        title: 'Exibir apenas último nível',
      },
      demo4: {
        title: 'Carregamento assíncrono',
      },
      demo5: {
        title: 'Permite limpar',
      },
      demo6: {
        title: 'Somente leitura',
      },
      demo7: {
        title: 'Desabilitado',
      },
      demo8: {
        title: 'Opções desabilitadas',
      },
      demo9: {
        title: 'Método de inicialização de opções',
        description:
          'Use o método ```initMethod``` para inicializar dados em cascata e retornar um objeto ```Promise```',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        width: 'Largura',
        options: 'Opções',
        placeholder: 'Texto de placeholder',
        disabled: 'Desabilitado',
        clearable: 'Permite limpar',
        showAllLevels: 'Exibir todos os níveis',
        multiple: 'Seleção múltipla',
        free: 'Seleção livre',
        size: 'Tamanho',
        trigger: 'Modo de acionamento',
        loadMethod: 'Método de carregamento',
        readonly: 'Somente leitura',
        initMethod: 'Método de inicialização de opções',
      },
      options: {
        label: 'Rótulo',
        value: 'Valor',
        isLeaf: 'É nó folha',
        children: 'Filhos',
        disabled: 'Desabilitado',
      },
    },
    treeSelect: {
      name: 'Seletor em Árvore TreeSelect',
      description:
        'Caixa de seleção em estrutura de árvore para seleção hierárquica mais intuitiva',
      demo1: {
        title: 'Normal',
      },
      demo2: {
        title: 'Carregamento assíncrono',
      },
      demo3: {
        title: 'Slots personalizados',
      },
      demo4: {
        title: 'Itens desabilitados',
      },
      demo5: {
        title: 'Expandir tudo por padrão',
      },
      demo6: {
        title: 'Pesquisável',
      },
      demo7: {
        title: 'Slot de estado vazio',
      },
      demo8: {
        title: 'Outros',
      },
      demo9: {
        title: 'Somente leitura',
      },
      demo10: {
        title: 'Desabilitado',
      },
      demo11: {
        title: 'Inicializar dados',
        description:
          'Use o método ```initMethod``` para inicializar dados em árvore e retornar um objeto ```Promise```',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        dataSource: 'Fonte de dados em árvore',
        defaultValue: 'Valor padrão selecionado',
        placeholder: 'Texto de placeholder',
        width: 'Largura',
        size: 'Tamanho do componente',
        disabled: 'Desabilitado',
        clearable: 'Permite limpar',
        checkable: 'Exibir checkbox',
        showAllLevels: 'Exibir todos os níveis',
        showCheckIcon: 'Exibir ícone de seleção',
        showLine: 'Exibir linhas de conexão',
        expandAll: 'Expandir todos os nós',
        searchable: 'Permite pesquisa',
        searchDelay: 'Atraso da pesquisa (ms)',
        readonly: 'Somente leitura',
        free: 'Modo livre (estados pai/filho não relacionados)',
        align: 'Alinhamento do texto',
        trigger: 'Modo de acionamento dos filhos',
        keyField: 'Campo identificador do nó',
        labelField: 'Campo rótulo do nó',
        disabledField: 'Campo de desabilitação do nó',
        initMethod: 'Método de inicialização dos nós',
        loadMethod: 'Método de carregamento assíncrono dos filhos',
      },
      slots: {
        handle: 'Nome do slot',
      },
    },
    inputTable: {
      name: 'Tabela de entrada InputTable',
      description:
        'Entrada rápida de dados em tabela para processamento em lote mais eficiente',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Valor padrão',
      },
      demo3: {
        title: 'Mais recursos',
      },
      props: {
        columns: 'Configuração das colunas',
        size: 'Tamanho',
        width: 'Largura',
        rowKey: 'Chave da linha',
        batchDeletable: 'Permite exclusão em lote',
        addable: 'Permite adicionar',
        defaultForm: 'Formulário padrão',
        deletable: 'Permite excluir',
        maxRows: 'Número máximo de linhas',
        minRows: 'Número mínimo de linhas',
        clearable: 'Permite limpar',
        sortable: 'Permite ordenar',
        autoUniqueId: 'Gera ID único automaticamente',
        uniqueField: 'Campo único',
        sortTooltipCustomRender:
          'Renderização personalizada da dica de ordenação',
      },
    },
    switch: {
      name: 'Interruptor Switch',
      description:
        'Seletor de alternância simples para mudanças de estado mais claras',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Quadrado',
      },
      demo3: {
        title: 'Simulação de requisição',
      },
      demo4: {
        title: 'Somente leitura',
      },
      demo5: {
        title: 'Desabilitado',
      },
      model: {
        modelValue: 'Nome do parâmetro',
      },
      props: {
        size: 'Tamanho',
        round: 'Arredondado',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        request: 'Requisição',
        loading: 'Carregando',
      },
      events: {
        change: 'Nome do evento',
      },
    },
    slider: {
      name: 'Controle deslizante Slider',
      description:
        'Selecione valores arrastando para uma seleção mais intuitiva',
      demo1: {
        title: 'Tamanho',
      },
      demo2: {
        title: 'Diferentes passos',
      },
      demo3: {
        title: 'Intervalo limitado',
      },
      demo4: {
        title: 'Somente leitura',
      },
      demo5: {
        title: 'Desabilitado',
      },
      demo6: {
        title: 'Opções',
      },
      model: {
        modelValue: 'Nome do parâmetro',
      },
      props: {
        size: 'Tamanho',
        min: 'Valor mínimo',
        max: 'Valor máximo',
        step: 'Passo',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        options: 'Opções',
        formatTooltip: 'Formatar dica',
      },
    },
    sliderRange: {
      name: 'Intervalo deslizante SliderRange',
      description:
        'Controle deslizante para selecionar intervalos de valores de forma mais flexível',
      demo1: {
        title: 'Tamanho',
      },
      demo2: {
        title: 'Diferentes passos',
      },
      demo3: {
        title: 'Intervalo limitado',
      },
      demo4: {
        title: 'Somente leitura',
      },
      demo5: {
        title: 'Desabilitado',
      },
      demo6: {
        title: 'Opções',
      },
      model: {
        modelValue: 'Nome do parâmetro',
      },
      props: {
        size: 'Tamanho',
        min: 'Valor mínimo',
        max: 'Valor máximo',
        step: 'Passo',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
        options: 'Opções',
        formatTooltip: 'Formatar dica',
      },
    },
    rate: {
      name: 'Avaliação Rate',
      description:
        'Componente de avaliação com estrelas para uma pontuação mais divertida',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Somente leitura',
      },
      demo3: {
        title: 'Desabilitado',
      },
      demo4: {
        title: 'Dicas',
      },
      model: {
        modelValue: 'Nome do parâmetro',
      },
      props: {
        size: 'Tamanho',
        count: 'Quantidade',
        tips: 'Dicas',
        readonly: 'Somente leitura',
        disabled: 'Desabilitado',
      },
    },
    colorPicker: {
      name: 'Seletor de cores ColorPicker',
      description: 'Ferramenta rica para seleção de cores mais precisa',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Diferentes tamanhos',
      },
      demo3: {
        title: 'Largura personalizada',
      },
      demo4: {
        title: 'Estado desabilitado',
      },
      demo5: {
        title: 'Estado somente leitura',
      },
      model: {
        modelValue: 'Nome do parâmetro',
      },
      props: {
        size: 'Tamanho',
        width: 'Largura',
        placeholder: 'Placeholder',
        disabled: 'Desabilitado',
        readonly: 'Somente leitura',
      },
    },
    upload: {
      name: 'Upload',
      description:
        'Componente de upload de arquivos para processamento mais simples',
      demo1: {
        title: 'Normal',
      },
      demo2: {
        title: 'Limitar formato e tamanho',
      },
      demo3: {
        title: 'Upload de imagem',
      },
      demo4: {
        title: 'Dicas personalizadas',
      },
      demo5: {
        title: 'Mural de fotos',
      },
      demo6: {
        title: 'Sem upload',
      },
      demo7: {
        title: 'Pré-visualização',
      },
      model: {
        modelValue: 'Valor vinculado',
      },
      props: {
        accept: 'Tipos de arquivo aceitos',
        immediate: 'Upload imediato',
        multiple: 'Upload múltiplo',
        disabled: 'Desabilitado',
        readonly: 'Somente leitura',
        limit: 'Limite de arquivos',
        maxFileSize: 'Tamanho máximo do arquivo',
        size: 'Tamanho',
        tips: 'Mensagens de dica',
        uploadHelper: 'Auxiliar de upload',
        viewMode: 'Modo de visualização',
      },
    },
    table: {
      name: 'Tabela Table',
      description:
        'Componente de tabela poderoso para exibição mais clara dos dados',
      model: {
        modelValue: 'Nome do parâmetro',
        selectedKeys: 'Chaves selecionadas',
        sortValue: 'Valor de ordenação',
      },
      demo1: {
        title: 'Normal',
      },
      demo2: {
        title: 'Fixar linhas e colunas',
      },
      demo3: {
        title: 'Operações personalizadas',
      },
      demo4: {
        title: 'Slots',
      },
      demo5: {
        title: 'Estilo personalizado',
      },
      demo6: {
        title: 'Seleção',
      },
      demo7: {
        title: 'Ordenável',
      },
      demo8: {
        title: 'Renderização personalizada',
      },
      demo9: {
        title: 'Funcionalidade completa',
      },
      demo10: {
        title: 'Sem dados',
      },
      demo11: {
        title: 'Cabeçalhos agrupados',
        tipsTitle: 'Nota de limitação',
        tipsContent:
          'Se você quiser que os cabeçalhos agrupados tenham colunas fixas, precisa definir a largura para todos os cabeçalhos de colunas fixas, incluindo todos os nós pais, caso contrário pode ocorrer desalinhamento.',
      },
      demo12: {
        title: 'Ordenação por arrastar',
      },
      props: {
        columns: 'Colunas',
        dataSource: 'Fonte de dados',
        bordered: 'Com bordas',
        size: 'Tamanho',
        checkable: 'Selecionável',
        maxHeight: 'Altura máxima',
        multiple: 'Múltipla seleção',
        rowKey: 'Chave da linha',
        sortTooltipCustomRender:
          'Renderização personalizada da dica de ordenação',
        sortable: 'Permite ordenar',
      },
      tableColumns: {
        field: 'Campo',
        fixed: 'Fixo',
        title: 'Título',
        type: 'Tipo',
        width: 'Largura',
        x: 'Eixo X',
        customRender: 'Renderização personalizada',
      },
    },
    pagination: {
      name: 'Paginação Pagination',
      description:
        'Navegação clara por páginas para uma navegação mais fácil pelos dados',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Grande volume',
      },
      demo3: {
        title: 'Simulação assíncrona',
      },
      model: {
        total: 'Nome do parâmetro',
        currentPage: 'Página atual',
        pageSize: 'Tamanho da página',
      },
      props: {
        size: 'Tamanho',
        pageSizeOptions: 'Opções de tamanho da página',
        visiblePagesCount: 'Número de páginas visíveis',
      },
      events: {
        change: 'Nome do evento',
      },
    },
    magicNumber: {
      name: 'Número mágico MagicNumber',
      description:
        'Componente de animação para tornar a exibição de números mais dinâmica e interessante',
    },
    tree: {
      name: 'Árvore Tree',
      description:
        'Ferramenta poderosa para exibir estruturas de dados hierárquicas com clareza',
      demo1: {
        title: 'Normal',
      },
      demo2: {
        title: 'Exibir checkbox',
      },
      demo3: {
        title: 'Múltipla seleção',
      },
      demo4: {
        title: 'Modo de relação pai-filho',
      },
      demo5: {
        title: 'Requisição assíncrona',
      },
      demo6: {
        title: 'Expandir tudo por padrão',
      },
      demo7: {
        title: 'Exibir linhas guia',
      },
      demo8: {
        title: 'Slots',
      },
      model: {
        modelValue: 'Nome do parâmetro',
        expandedKeys: 'Chaves expandidas',
      },
      props: {
        dataSource: 'Fonte de dados',
        multiple: 'Múltipla seleção',
        checkable: 'Exibir checkbox',
        height: 'Altura',
        searchable: 'Pesquisável',
        expandAll: 'Expandir tudo por padrão',
        free: 'Seleção livre',
        showLine: 'Exibir linhas de conexão',
        trigger: 'Modo de acionamento',
        placeholder: 'Texto placeholder',
        keyField: 'Campo identificador do nó',
        labelField: 'Campo rótulo do nó',
        disabledField: 'Campo de desabilitação do nó',
        initMethod: 'Método de inicialização da árvore',
        loadMethod: 'Método de carregamento assíncrono',
        isSelect: 'Está selecionado',
      },
      slots: {
        handle: 'Nome do slot',
      },
      treeDataSource: {
        label: 'Rótulo',
        key: 'Chave',
        isLeaf: 'É nó folha',
        children: 'Filhos',
        disabled: 'Desabilitado',
      },
    },
    collapse: {
      'name': 'Painel Expansível (Collapse)',
      'description':
        'Área de conteúdo que pode ser expandida e recolhida, tornando a exibição de informações mais organizada',
      'demo1': {
        title: 'Uso básico',
      },
      'demo2': {
        title: 'Slot de título',
      },
      'demo3': {
        title: 'Modo acordeão',
      },
      'model': {
        modelValue: 'Nome do parâmetro',
      },
      'model(CollapseItem)': {
        modelValue: 'Nome do parâmetro',
      },
      'props': {
        width: 'Largura',
      },
      'props(CollapseItem)': {
        collapseKey: 'Chave de expansão',
        title: 'Título',
        radius: 'Raio',
      },
    },
    desc: {
      name: 'Lista de Descrição (Desc)',
      description:
        'Exibe múltiplos campos de forma organizada, tornando a apresentação de informações mais padronizada',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Direção',
      },
      demo3: {
        title: 'Rico em recursos',
      },
      demo4: {
        title: 'Suporta configuração online',
      },
      props: {
        options: 'Opções',
        dataSource: 'Fonte de dados',
        size: 'Tamanho',
        labelX: 'Rótulo X',
        valueX: 'Valor X',
        gap: 'Espaçamento',
        width: 'Largura',
        columns: 'Colunas',
        labelWidth: 'Largura do rótulo',
        direction: 'Direção',
        bordered: 'Com borda',
      },
      descItemProps: {
        label: 'Rótulo',
        field: 'Campo',
        size: 'Tamanho',
        bordered: 'Com borda',
        width: 'Largura',
        labelWidth: 'Largura do rótulo',
        direction: 'Direção',
        tips: 'Dicas',
        type: 'Tipo',
        labelX: 'Rótulo X',
        valueX: 'Valor X',
        gridArea: 'Área da grade',
        customRender: 'Renderização personalizada',
      },
    },
    alert: {
      name: 'Alerta (Alert)',
      description:
        'Caixa de alerta chamativa para exibir avisos de forma mais suave',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Suporte a slots',
      },
      demo3: {
        title: 'Mais cenários',
      },
      props: {
        type: 'Tipo',
        title: 'Título',
        content: 'Conteúdo do alerta',
        closeable: 'Pode ser fechado',
        footer: 'Conteúdo do rodapé',
      },
    },
    message: {
      name: 'Mensagem Global (Message)',
      description:
        'Feedback leve de informações, tornando as notificações mais concisas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Controlável',
      },
      demo3: {
        title: 'Simulação de requisição',
      },
      events: {
        close: 'Disparado ao fechar',
      },
      props: {
        type: 'Tipo',
        content: 'Conteúdo da mensagem',
        duration: 'Duração',
      },
    },
    notification: {
      name: 'Notificação',
      description: 'Notificações elegantes para um feedback mais amigável.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tempo de atraso',
      },
      demo3: {
        title: 'Largura personalizada',
      },
      demo4: {
        title: 'Exibir barra de progresso',
      },
      demo5: {
        title: 'Fechamento manual',
      },
      props: {
        title: 'Título',
        content: 'Conteúdo da notificação',
        delay: 'Tempo de atraso',
        width: 'Largura',
        showProgress: 'Exibir barra de progresso',
      },
    },
    drawer: {
      name: 'Gaveta (Drawer)',
      description:
        'Um painel que desliza da lateral para operações temporárias suaves.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Fechamento assíncrono',
      },
      demo3: {
        title: 'Cabeçalho e rodapé personalizados',
      },
      demo4: {
        title: 'Permitir fechar com a tecla ESC',
      },
      demo5: {
        title: 'Fechar ao clicar na sobreposição',
      },
      demo6: {
        title: 'Aninhamento',
      },
      model: {
        visible: 'Visível',
      },
      props: {
        title: 'Título',
        width: 'Largura',
        position: 'Posição',
        height: 'Altura',
        closeOnClickOverlay: 'Fechar ao clicar na sobreposição',
        closeByEsc: 'Fechar com a tecla ESC',
        hideFooter: 'Ocultar rodapé',
        okButtonProps: 'Propriedades do botão OK',
        closeButtonProps: 'Propriedades do botão de fechar',
        zIndex: 'Índice Z',
      },
    },
    dialog: {
      name: 'Diálogo',
      description:
        'Uma caixa de diálogo modal para destacar interações importantes.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Fechamento assíncrono',
      },
      demo3: {
        title: 'Fechar ao clicar na sobreposição',
      },
      demo4: {
        title: 'Fechar com ESC',
      },
      props: {
        type: 'Tipo',
        width: 'Largura',
        trigger: 'Gatilho',
        title: 'Título',
        okText: 'Texto do botão OK',
        cancelText: 'Texto do botão Cancelar',
        ok: 'Callback de confirmação',
        cancel: 'Callback de cancelamento',
        closeOnClickOverlay: 'Fechar ao clicar na sobreposição',
        closeByEsc: 'Fechar com a tecla ESC',
        transformOrigin: 'Origem da transformação',
      },
      events: {
        ok: 'Disparado quando o botão OK é clicado',
        cancel: 'Disparado quando o botão Cancelar é clicado',
      },
    },
    modal: {
      name: 'Modal (Modal)',
      description: 'Janela modal mais flexível para interações mais ricas',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Fechamento assíncrono',
      },
      demo3: {
        title: 'Cabeçalho e rodapé personalizados',
      },
      demo4: {
        title: 'Permitir fechamento com ESC',
      },
      model: {
        visible: 'Visibilidade',
      },
      props: {
        title: 'Título',
        width: 'Largura',
        top: 'Distância do topo',
        hideFooter: 'Ocultar rodapé',
        closeByEsc: 'Fechar com tecla ESC',
        okButtonProps: 'Propriedades do botão OK',
        closeOnClickOverlay: 'Fechar ao clicar na sobreposição',
        zIndex: 'Índice Z',
        closeButtonProps: 'Propriedades do botão Fechar',
        maxHeight: 'Altura máxima',
      },
    },
    popok: {
      name: 'Confirmação em Popover (Popok)',
      description:
        'Confirmação leve em popover para confirmações de operações mais convenientes',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Modo de acionamento',
      },
      props: {
        type: 'Tipo',
        width: 'Largura',
        trigger: 'Modo de acionamento',
        title: 'Título',
        content: 'Conteúdo',
        placement: 'Posicionamento',
        okText: 'Texto do botão OK',
        cancelText: 'Texto do botão Cancelar',
        ok: 'Callback de confirmação',
        cancel: 'Callback de cancelamento',
      },
    },
    popover: {
      name: 'Popover',
      description:
        'Um cartão pop-up que fornece informações ou ações adicionais.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Gatilho',
      },
      demo3: {
        title: 'Gatilho personalizado',
      },
      demo4: {
        title: 'Fechar automaticamente ao clicar fora',
      },
      demo5: {
        title: 'Estado de carregamento',
      },
      props: {
        trigger: 'Gatilho',
        placement: 'Posicionamento',
        disabled: 'Desabilitado',
        loading: 'Carregando',
        hideOnClick: 'Ocultar ao clicar',
        offset: 'Deslocamento',
        popoverBodyClassName: 'Nome da classe do corpo do popover',
        triggerTarget: 'Alvo do gatilho',
      },
      slots: {
        'trigger': 'Slot do gatilho',
        'popover-body': 'Slot do corpo do popover',
      },
    },
    tooltip: {
      name: 'Dica (Tooltip)',
      description: 'Uma bolha de texto simples para dicas mais leves.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Disparar com clique',
      },
      demo3: {
        title: 'Tempo de atraso',
      },
      demo4: {
        title: 'Suporte a HTML',
      },
      props: {
        tips: 'Conteúdo da dica',
        placement: 'Posicionamento',
        trigger: 'Gatilho',
        allowHTML: 'Permitir HTML',
        delay: 'Tempo de atraso',
      },
    },
    loading: {
      name: 'Carregando (Loading)',
      description:
        'Um efeito de carregamento elegante para tornar a espera mais agradável.',
      demo1: {
        title: 'Uso básico',
      },
      demo2: {
        title: 'Tamanho do ícone personalizado',
      },
      demo3: {
        title: 'Informação de dica personalizada',
      },
      props: {
        tip: 'Informação da dica',
        iconSize: 'Tamanho do ícone',
        visible: 'Visível',
      },
    },
    result: {
      name: 'Resultado',
      description:
        'Usado para feedback de resultados de operações, tornando a exibição mais completa',
      demo1: {
        title: 'Uso básico',
      },
      props: {
        type: 'Tipo',
        title: 'Título',
        content: 'Conteúdo',
      },
      slots: {
        handle: 'Slot de manipulação',
      },
    },
    empty: {
      name: 'Estado Vazio (Empty)',
      description:
        'Exibição de estado de dados vazios, tornando páginas em branco mais amigáveis',
      demo1: {
        title: 'Uso básico',
      },
      props: {
        type: 'Tipo',
        title: 'Título',
        fontSize: 'Tamanho da fonte',
        padding: 'Preenchimento',
        width: 'Largura',
        height: 'Altura',
      },
    },
  },
}
