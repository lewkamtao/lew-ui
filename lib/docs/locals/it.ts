const contextMenu = {
  label: 'Etichetta',
  value: 'Valore',
  icon: 'Funzione di rendering icona',
  children: 'Elementi figlio',
  disabled: 'Disabilitato',
  isDividerLine: 'Linea divisoria',
  checkable: 'Casella di controllo',
  checked: 'Selezionato',
  onClick: 'Evento click',
};

export default {
  name: 'it',
  home: {
    title: 'Lew UI',
    description: 'Una libreria di componenti Vue 3 elegante e facile da usare',
    getStarted: 'Inizia ora',
    sloganTitle: 'Meno è di più',
    slogan: 'Una libreria di componenti Vue 3 elegante e facile da usare',
    home: 'Home',
    install: 'Installazione',
    components: 'Componenti',
    formEngine: 'Form Engine',
    descEngine: 'Description Engine',
  },
  base: {
    base: 'Base',
    navigator: 'Navigazione',
    form: 'Form',
    data: 'Dati',
    feedback: 'Feedback',
    close: 'Chiudi',
    showCode: 'Mostra codice',
  },
  components: {
    image: {
      name: 'Immagine',
      description:
        'Visualizza le immagini in modo elegante, con supporto per lazy loading, stati di caricamento e gestione degli errori',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Stato di caricamento',
        tipsTitle: 'Suggerimento',
        tipsContent:
          'È necessario impostare larghezza e altezza per visualizzare il placeholder durante il caricamento.',
      },
      demo3: {
        title: 'Errore di caricamento',
      },
      props: {
        src: 'URL immagine',
        alt: 'Testo alternativo',
        width: 'Larghezza',
        height: 'Altezza',
        objectFit: 'Modalità di riempimento',
        objectPosition: 'Posizione immagine',
        lazy: 'Abilita lazy loading',
        loading: 'Mostra stato di caricamento',
        title: 'Titolo immagine',
      },
    },
    avatar: {
      name: 'Avatar',
      description:
        'Un elegante componente avatar che supporta immagini, icone e testo',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Stato',
      },
      demo3: {
        title: 'Avatar predefinito',
      },
      demo4: {
        title: 'Forma',
        description:
          "Controlla la forma dell'avatar tramite `shape`, i valori possibili sono `circle`, `square`, `sharp`.",
      },
      props: {
        size: 'Dimensione',
        loading: 'Mostra stato di caricamento',
        shape: 'Forma',
        src: 'URL immagine',
        alt: 'Testo alternativo',
        status: 'Stato',
        objectFit: 'Modalità di riempimento',
        objectPosition: 'Posizione immagine',
        statusPlacement: 'Posizione indicatore di stato',
      },
    },
    button: {
      name: 'Pulsante',
      description: "Cliccalo per un'interazione fluida e scorrevole",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Colori',
      },
      demo3: {
        title: 'Icone',
      },
      demo4: {
        title: 'Stato di caricamento',
      },
      demo5: {
        title: 'Disabilitato',
      },
      demo6: {
        title: 'Supporto Promise',
      },
      props: {
        text: 'Testo pulsante',
        type: 'Tipo',
        size: 'Dimensione',
        singleIcon: 'Mostra solo icona',
        color: 'Colore',
        round: 'Bordi arrotondati',
        dashed: 'Bordo tratteggiato',
        loading: 'Stato di caricamento',
        disabled: 'Disabilitato',
        request: 'Richiesta',
      },
    },
    tag: {
      name: 'Tag',
      description:
        'Un potente strumento di etichettatura per categorizzare i contenuti',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Tipi',
      },
      demo3: {
        title: 'Dimensioni',
      },
      demo4: {
        title: 'Colori',
      },
      demo5: {
        title: 'Disabilitato',
      },
      demo6: {
        title: 'Chiudibile',
      },
      demo7: {
        title: 'Slot',
      },
      props: {
        text: 'Testo del tag (priorità maggiore dello slot, testo tagliato se eccede la larghezza)',
        type: 'Tipo di stile',
        size: 'Dimensione',
        color: 'Tema colore',
        closable: 'Chiudibile',
        disabled: 'Disabilitato',
        round: 'Bordi arrotondati',
        oversize: 'Dimensione più ampia',
      },
    },
    badge: {
      name: 'Badge',
      description:
        "Un punto rosso nell'angolo superiore destro per notifiche evidenti",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Punto',
      },
      demo3: {
        title: 'Uso standalone',
      },
      demo4: {
        title: 'Testo',
      },
      demo5: {
        title: 'In elaborazione',
      },
      props: {
        text: 'Testo badge',
        offset: 'Offset del badge',
        processing: 'In elaborazione',
        max: 'Valore massimo (mostra max+ se superato)',
        color: 'Colore badge',
        disabled: 'Disabilitato',
        value: 'Valore badge (mostra punto se vuoto)',
      },
    },
    title: {
      name: 'Titolo',
      description: "Non solo un titolo, ma l'essenza del contenuto",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Grassetto',
      },
      demo3: {
        title: 'Colori',
      },
      props: {
        text: 'Contenuto testuale',
        size: 'Dimensione testo (numero in pixel o stringa es. "1.5em")',
        bold: 'Peso font (valori da 100 a 900)',
        color: 'Colore testo (nome predefinito o valore personalizzato)',
      },
    },
    textTrim: {
      name: 'Testo troncato',
      description:
        'Gestisce elegantemente i testi lunghi preservando il layout',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Ellissi multilinea',
      },
      demo3: {
        title: 'Testo finale',
      },
      demo4: {
        title: 'Allineamento',
      },
      props: {
        text: 'Contenuto testuale',
        lineClamp: 'Numero massimo di righe prima del troncamento',
        allowHTML: 'Consenti rendering HTML',
        placement: 'Posizione tooltip',
        offset: 'Offset tooltip [x, y] in pixel',
        textAlign: 'Allineamento orizzontale (quando larghezza < contenitore)',
        delay: 'Ritardo [mostra, nascondi] tooltip in ms',
        reserveEnd: 'Caratteri da preservare alla fine (ellissi al centro)',
      },
    },
    flex: {
      name: 'Layout Flex',
      description:
        'Layout flessibile per un controllo preciso del posizionamento',
      demo1: {
        title: 'Riga',
      },
      demo2: {
        title: 'Colonna',
      },
      demo3: {
        title: 'Modalità',
      },
      props: {
        direction: 'Direzione elementi',
        x: 'Allineamento orizzontale',
        y: 'Allineamento verticale',
        mode: 'Modalità distribuzione (sovrascrive x/y in base a direction)',
        wrap: 'Permetti a capo automatico',
        gap: 'Spazio tra elementi (pixel)',
        width: 'Larghezza contenitore (pixel o percentuale)',
      },
    },
    mark: {
      name: 'Evidenziatore',
      description: 'Evidenzia il testo importante per una migliore visibilità',
      demo1: {
        title: 'Uso base',
      },
      props: {
        color: 'Tema colore',
        round: 'Bordi arrotondati',
        bold: 'Grassetto',
        cursor: 'Stile cursore al passaggio',
      },
    },
    icon: {
      name: 'Icona',
      description:
        "Una collezione di icone eleganti per arricchire l'interfaccia",
    },
    backTop: {
      name: 'Torna su',
      description: "Torna all'inizio della pagina con un click",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Contenuto personalizzato',
      },
      demo3: {
        title: 'Attivazione tramite direttiva',
      },
      props: {
        target: 'Selettore CSS elemento target (default: finestra)',
        right: 'Distanza dal bordo destro (pixel)',
        bottom: 'Distanza dal bordo inferiore (pixel)',
        valveHeight: 'Altezza soglia per mostrare il pulsante (pixel)',
      },
      events: {
        click: 'Callback click torna su',
      },
    },
    steps: {
      name: 'Passi',
      description:
        "Mostra chiaramente il processo di operazione, permettendo all'utente di sapere dove si trova",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Stato',
      },
      demo3: {
        title: 'Caricamento',
      },
      model: {
        modelValue: 'Indice del passo attualmente attivo',
      },
      props: {
        options: 'Array di configurazione dei passi',
        status: 'Stato attuale dei passi',
        minWidth: 'Larghezza minima del passo',
      },
      options: {
        title: 'Titolo del passo',
        description: 'Descrizione del passo',
      },
    },
    menu: {
      name: 'Menu',
      description: 'Menu verticale elegante per una navigazione chiara',
      demo1: {
        title: 'Uso base',
      },
      model: {
        modelValue: 'Valore menu attivo',
      },
      props: {
        options: 'Array configurazione menu',
      },
      menuOptions: {
        label: 'Testo voce menu',
        value: 'Valore voce menu',
        children: 'Voci sottomenu',
        disabled: 'Voce disabilitata',
        icon: 'Icona voce menu',
        tagProps: 'Proprietà badge',
      },
    },
    menuTree: {
      name: 'Menu ad albero',
      description: 'Menu gerarchico per visualizzare relazioni complesse',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Icone personalizzate',
      },
      demo3: {
        title: 'Espansione predefinita',
        description: "Controlla l'espansione tramite v-model.",
      },
      demo4: {
        title: 'Badge',
      },
      demo5: {
        title: 'Stile personalizzato',
      },
      model: {
        modelValue: 'Valore menu attivo',
        expandKeys: 'Array chiavi menu espansi',
        collapsed: 'Menu compresso',
      },
      props: {
        options: 'Dati menu gerarchico',
        width: 'Larghezza menu (valore CSS)',
      },
      menuTreeItem: {
        label: 'Titolo voce (personalizzabile con slot "label")',
        value: 'Identificatore univoco voce',
        level: 'Livello gerarchico (da 1)',
        icon: 'Funzione rendering icona',
        tagProps: 'Proprietà badge',
        disabled: 'Voce disabilitata',
        isLeaf: 'Nodo foglia',
      },
    },
    dropdown: {
      name: 'Menu a discesa',
      description: 'Menu contestuale a comparsa per azioni rapide',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Non solo pulsanti',
      },
      demo3: {
        title: 'Voci disabilitate',
      },

      props: {
        options: 'Configurazione menu',
        trigger: 'Modalità attivazione',
        placement: 'Posizione menu',
        checkable: 'Selezionabile',
      },
      'options(ContextMenus)': contextMenu,
      events: {
        show: 'Callback apertura menu',
        hide: 'Callback chiusura menu',
        change: 'Callback selezione voce',
      },
    },
    breadcrumb: {
      name: 'Breadcrumb',
      description: 'Navigazione chiara del percorso corrente',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Selezione personalizzata',
      },
      demo3: {
        title: 'Tipo separatore',
      },
      props: {
        options: 'Array configurazione breadcrumb',
        separator: 'Tipo icona separatore',
      },
      breadcrumbOptions: {
        label: 'Testo voce',
        value: 'Valore voce',
        active: 'Voce attiva',
      },
      events: {
        change: 'Callback cambio voce',
      },
    },
    contextMenu: {
      name: 'Menu contestuale',
      description: 'Menu tasto destro elegante per azioni contestuali',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Menu multilivello',
      },
      demo3: {
        title: 'Aggiornamento dinamico',
      },
      demo4: {
        title: 'Checkbox',
      },
      props: {
        options: 'Configurazione menu',
        disabled: 'Menu disabilitato',
      },
      'options(ContextMenus)': contextMenu,
    },
    form: {
      name: 'Form',
      description: 'Potente gestione dei form per una raccolta dati efficace',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Direzione',
      },
      demo3: {
        title: 'Validazione personalizzata',
      },
      demo4: {
        title: 'Layout a griglia',
      },
      demo5: {
        title: 'Configurazione Form Engine',
      },
      demo6: {
        title: 'Validazione asincrona',
      },
      props: {
        options: 'Array configurazione struttura form',
        size: 'Dimensione globale campi',
        width: 'Larghezza form (pixel o percentuale)',
        columns: 'Campi per riga (max 4)',
        labelWidth: 'Larghezza etichette (pixel o "auto")',
        disabled: 'Form disabilitato',
        readonly: 'Form sola lettura',
        direction: 'Direzione campi (x=orizzontale, y=verticale)',
        formMethods: 'Metodi operazioni form',
      },
      formItemProps: {
        label: 'Etichetta campo',
        field: 'Nome campo per binding e validazione',
        required: 'Campo obbligatorio',
        as: 'Tipo campo (es. input, select)',
        size: 'Dimensione campo (sovrascrive globale)',
        width: 'Larghezza campo (pixel o percentuale)',
        labelWidth: 'Larghezza etichetta (pixel o "auto")',
        direction: 'Direzione campo (x=orizzontale, y=verticale)',
        disabled: 'Campo disabilitato',
        readonly: 'Campo sola lettura',
        tips: 'Suggerimento campo',
        errMessage: 'Messaggio errore personalizzato',
        rule: 'Regola validazione',
        props: 'Proprietà aggiuntive componente',
        between: 'Spazio tra campi orizzontali',
        gridArea: 'Posizione in griglia',
        outputFormat: 'Formattazione output',
        inputFormat: 'Formattazione input',
      },
      events: {
        mounted: 'Callback montaggio campo',
      },
      methods: {
        getForm: 'Ottieni form',
        setForm: 'Imposta form',
      },
    },
    input: {
      name: 'Input',
      description: 'Campo di input ricco di funzionalità per inserimento dati',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Prefisso/Suffisso',
      },
      demo3: {
        title: 'Limite caratteri',
      },
      demo4: {
        title: 'Allineamento',
      },
      demo5: {
        title: 'Password visibile',
      },
      demo6: {
        title: 'Larghezza automatica',
      },
      demo7: {
        title: 'Selezione al focus',
      },
      demo8: {
        title: 'Cancellabile',
      },
      demo9: {
        title: 'Sola lettura',
      },
      demo10: {
        title: 'Disabilitato',
      },
      demo11: {
        title: 'Evento invio',
      },
      props: {
        type: 'Tipo input',
        size: 'Dimensione',
        width: 'Larghezza input',
        placeholder: 'Testo segnaposto',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
        clearable: 'Pulsante cancella',
        showPassword: 'Mostra password',
        maxLength: 'Lunghezza massima',
        showCount: 'Mostra conteggio (solo text)',
        align: 'Allineamento testo',
        minWidth: 'Larghezza minima (pixel o unità)',
        autoWidth: 'Larghezza automatica',
        selectByFocus: 'Seleziona al focus',
        copyable: 'Copiabile (solo readonly e no suffix)',
        prefixes: 'Tipo prefisso',
        prefixesOptions: 'Opzioni prefisso select',
        prefixesTooltip: 'Tooltip prefisso',
        suffix: 'Tipo suffisso',
        suffixOptions: 'Opzioni suffisso select',
        suffixTooltip: 'Tooltip suffisso',
        okByEnter: 'Conferma con Invio',
      },
      events: {
        change: 'Callback cambio valore',
        focus: 'Callback focus',
        blur: 'Callback blur',
        input: 'Callback input',
        clear: 'Callback cancellazione',
        ok: 'Callback conferma',
      },
      model: {
        modelValue: 'Valore legato',
        prefixValue: 'Valore prefisso',
        suffixValue: 'Valore suffisso',
      },
    },
    inputNumber: {
      name: 'Input numerico',
      description: 'Campo specializzato per input numerici precisi',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Selezione al focus',
      },
      demo3: {
        title: 'Limiti',
      },
      demo4: {
        title: 'Precisione',
      },
      demo5: {
        title: 'Disabilitato/Sola lettura',
      },
      props: {
        min: 'Valore minimo',
        max: 'Valore massimo',
        step: 'Incremento',
        disabled: 'Precisione',
        size: 'Dimensione (small/medium/large)',
        placeholder: 'Testo segnaposto',
        readonly: 'Sola lettura',
        width: 'Larghezza (pixel o unità)',
        align: 'Allineamento',
        selectByFocus: 'Seleziona al focus',
      },
      model: {
        modelValue: 'Valore legato',
      },
    },
    textarea: {
      name: 'Area di testo',
      description:
        'Campo di testo multilinea per inserire testi lunghi in modo confortevole',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Limite caratteri',
      },
      demo3: {
        title: 'Seleziona tutto al focus',
      },
      demo4: {
        title: 'Cancellabile',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      demo7: {
        title: 'Evento su Invio',
      },
      demo8: {
        title: 'Ridimensionabile',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        placeholder: 'Testo segnaposto',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
        clearable: 'Cancellabile',
        showCount: 'Mostra conteggio caratteri',
        maxLength: 'Lunghezza massima',
        size: 'Dimensione',
        resize: 'Direzione ridimensionamento',
        width: 'Larghezza',
        height: 'Altezza',
        minWidth: 'Larghezza minima',
        minHeight: 'Altezza minima',
        maxWidth: 'Larghezza massima',
        maxHeight: 'Altezza massima',
        selectByFocus: 'Seleziona tutto al focus',
        okByEnter: 'Conferma con Invio (Shift+Invio per nuova riga)',
      },
      events: {
        change: 'Callback cambio valore',
        focus: 'Callback focus',
        blur: 'Callback blur',
        input: 'Callback input',
        clear: 'Callback cancellazione',
        ok: 'Callback conferma',
      },
    },
    inputTag: {
      name: 'Input Tag',
      description:
        'Gestisci facilmente tag multipli per organizzare meglio i dati',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Dimensioni',
      },
      demo3: {
        title: 'Duplicati permessi',
      },
      demo4: {
        title: 'Valore predefinito controllato',
      },
      demo5: {
        title: 'Cancellabile',
      },
      demo6: {
        title: 'Sola lettura',
      },
      demo7: {
        title: 'Disabilitato',
      },
      demo8: {
        title: 'Lunghezza massima',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        size: 'Dimensione',
        disabled: 'Disabilitato',
        clearable: 'Cancellabile',
        placeholder: 'Testo segnaposto',
        readonly: 'Sola lettura',
        allowDuplicates: 'Permetti duplicati',
        maxLength: 'Numero massimo di tag',
        width: 'Larghezza',
      },
      events: {
        change: 'Callback cambio valore',
        clear: 'Callback cancellazione',
        add: 'Callback aggiunta tag',
        remove: 'Callback rimozione tag',
      },
    },
    checkbox: {
      name: 'Checkbox',
      description:
        'Selettore per scelte multiple, rende le selezioni più intuitive',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Distribuzione verticale',
      },
      demo3: {
        title: 'A blocco',
      },
      demo4: {
        title: 'Rotondo',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      demo7: {
        title: 'Modalità singola',
      },
      'model(CheckboxGroup)': {
        modelValue: 'Valore legato',
      },
      'model(Checkbox)': {
        modelValue: 'Valore legato',
      },
      'props(CheckboxGroup)': {
        options: 'Opzioni',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
        size: 'Dimensione',
        direction: 'Direzione',
        block: 'Visualizzazione a blocco',
        round: 'Stile arrotondato',
        iconable: 'Permetti icone',
      },
      'props(Checkbox)': {
        label: 'Etichetta',
        value: 'Valore',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
        checked: 'Selezionato',
        size: 'Dimensione',
        block: 'Visualizzazione a blocco',
        round: 'Stile arrotondato',
        iconable: 'Permetti icone',
        certain: 'Stato certo',
      },
      'events(Checkbox)': {
        change: 'Callback cambio valore',
      },
      'events(CheckboxGroup)': {
        change: 'Callback cambio valore',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
        disabled: 'Disabilitato',
      },
    },
    radio: {
      name: 'Radio',
      description:
        'Selettore per scelta singola, rende le selezioni più chiare',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Distribuzione verticale',
      },
      demo3: {
        title: 'A blocco',
      },
      demo4: {
        title: 'Forma',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      model: {
        modelValue: 'Valore legato',
      },
      'props(RadioGroup)': {
        size: 'Dimensione',
        block: 'Visualizzazione a blocco',
        direction: 'Direzione',
        disabled: 'Disabilitato',
        iconable: 'Permetti icone',
        options: 'Opzioni',
        readonly: 'Sola lettura',
        round: 'Stile arrotondato',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
        disabled: 'Disabilitato',
      },
      events: {
        change: 'Callback cambio valore',
      },
    },
    tabs: {
      name: 'Schede',
      description:
        'Organizza i contenuti in categorie per una navigazione fluida',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Larghezza adattiva',
      },
      demo3: {
        title: 'Larghezza elemento personalizzata',
      },
      demo4: {
        title: 'Linea',
      },
      demo5: {
        title: 'Arrotondato',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        options: 'Opzioni',
        type: 'Tipo',
        size: 'Dimensione',
        width: 'Larghezza',
        itemWidth: 'Larghezza elemento',
        round: 'Stile arrotondato',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
      },
    },
    select: {
      name: 'Select',
      description: 'Menu a tendina per selezioni più comode',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Ricerca',
      },
      demo3: {
        title: 'Supporto slot',
      },
      demo4: {
        title: 'Opzioni disabilitate',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      demo7: {
        title: 'Stato vuoto personalizzato',
      },
      demo8: {
        title: 'Gruppi',
      },
      demo9: {
        title: 'Metodo inizializzazione opzioni',
      },
      demo10: {
        title: 'Cache ricerca',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        defaultValue: 'Valore predefinito',
        options: 'Opzioni',
        width: 'Larghezza',
        autoWidth: 'Larghezza automatica',
        popoverWidth: 'Larghezza popover',
        trigger: 'Attivazione',
        placeholder: 'Testo segnaposto',
        size: 'Dimensione',
        itemHeight: 'Altezza elemento',
        searchable: 'Ricercabile',
        searchMethod: 'Metodo ricerca',
        searchDelay: 'Ritardo ricerca',
        clearable: 'Cancellabile',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        showCheckIcon: 'Mostra icona spunta',
        initOptionsMethod: 'Metodo inizializzazione opzioni',
        enableSearchCache: 'Abilita cache ricerca',
      },
      events: {
        change: 'Callback cambio valore',
        clear: 'Callback cancellazione',
        blur: 'Callback blur',
        focus: 'Callback focus',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
        disabled: 'Disabilitato',
      },
      slots: {
        item: 'Contenuto opzione personalizzato',
        empty: 'Contenuto stato vuoto personalizzato',
      },
    },
    selectMultiple: {
      name: 'Select Multiplo',
      description: 'Menu a tendina per selezioni multiple flessibili',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Metodo filtro personalizzato',
      },
      demo3: {
        title: 'Supporto slot',
      },
      demo4: {
        title: 'Opzioni disabilitate',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      demo7: {
        title: 'Slot stato vuoto',
      },
      demo8: {
        title: 'Gruppi',
      },
      demo9: {
        title: 'Metodo inizializzazione opzioni',
        description:
          'Utilizza ```initOptionsMethod``` per inizializzare i dati di selezione multipla e restituire un oggetto ```Promise```',
      },
      props: {
        options: 'Opzioni',
        trigger: 'Attivazione',
        width: 'Larghezza',
        valueLayout: 'Layout valori',
        valueTextSplit: 'Separatore testo valori',
        placeholder: 'Testo segnaposto',
        size: 'Dimensione',
        itemHeight: 'Altezza elemento',
        searchable: 'Ricercabile',
        searchPlaceholder: 'Testo segnaposto ricerca',
        searchMethod: 'Metodo ricerca',
        searchDelay: 'Ritardo ricerca',
        clearable: 'Cancellabile',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        showCheckIcon: 'Mostra icona spunta',
        defaultValue: 'Valore predefinito',
        initOptionsMethod: 'Metodo inizializzazione opzioni',
        enableSearchCache: 'Abilita cache ricerca',
      },
      model: {
        modelValue: 'Valore legato',
      },
      events: {
        change: 'Cambio valore',
        blur: 'Perdita focus',
        focus: 'Acquisizione focus',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
        disabled: 'Disabilitato',
      },
      slots: {
        item: 'Contenuto opzione personalizzato',
        empty: 'Contenuto stato vuoto personalizzato',
      },
    },
    datePicker: {
      name: 'Selettore Data',
      description: 'Strumento intuitivo per selezione date precise',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Cancellabile',
      },
      demo3: {
        title: 'Formato personalizzato',
      },
      demo4: {
        title: 'Preimpostazioni',
      },
      demo5: {
        title: 'Sola lettura',
      },
      demo6: {
        title: 'Disabilitato',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        valueFormat: 'Formato valore',
        size: 'Dimensione',
        width: 'Larghezza',
        placeholder: 'Testo segnaposto',
        clearable: 'Cancellabile',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        presets: 'Valori preimpostati',
      },
      events: {
        change: 'Cambio valore',
        focus: 'Acquisizione focus',
        blur: 'Perdita focus',
        clear: 'Cancellazione',
      },
    },
    dateRangePicker: {
      name: 'Selettore Intervallo Date',
      description:
        'Strumento per selezionare intervalli di date in modo semplice e intuitivo',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Cancellabile',
      },
      demo3: {
        title: 'Altro',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        startKey: 'Chiave inizio',
        endKey: 'Chiave fine',
        valueFormat: 'Formato valore',
        size: 'Dimensione',
        width: 'Larghezza',
        placeholderStart: 'Testo segnaposto inizio',
        placeholderEnd: 'Testo segnaposto fine',
        clearable: 'Cancellabile',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
      },
      events: {
        change: 'Cambio valore',
        focus: 'Acquisizione focus',
        blur: 'Perdita focus',
        clear: 'Cancellazione',
      },
    },
    cascader: {
      name: 'Selettore a Cascata',
      description: 'Selettore per dati gerarchici multilivello',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Modalità libera',
      },
      demo3: {
        title: 'Mostra solo ultimo livello',
      },
      demo4: {
        title: 'Caricamento asincrono',
      },
      demo5: {
        title: 'Cancellabile',
      },
      demo6: {
        title: 'Sola lettura',
      },
      demo7: {
        title: 'Disabilitato',
      },
      demo8: {
        title: 'Opzioni disabilitate',
      },
      demo9: {
        title: 'Metodo inizializzazione opzioni',
        description:
          'Utilizza ```initOptionsMethod``` per inizializzare i dati a cascata e restituire un oggetto ```Promise```',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        width: 'Larghezza',
        options: 'Opzioni',
        placeholder: 'Testo segnaposto',
        disabled: 'Disabilitato',
        clearable: 'Cancellabile',
        showAllLevels: 'Mostra tutti i livelli',
        multiple: 'Selezione multipla',
        free: 'Selezione libera',
        size: 'Dimensione',
        trigger: 'Modalità attivazione',
        loadMethod: 'Metodo caricamento',
        readonly: 'Sola lettura',
        initOptionsMethod: 'Metodo inizializzazione opzioni',
      },
      options: {
        label: 'Etichetta',
        value: 'Valore',
        isLeaf: 'È nodo foglia',
        children: 'Figli',
        disabled: 'Disabilitato',
      },
    },
    treeSelect: {
      name: 'Selettore ad Albero',
      description: 'Selettore con struttura gerarchica ad albero',
      demo1: {
        title: 'Base',
      },
      demo2: {
        title: 'Caricamento asincrono',
      },
      demo3: {
        title: 'Slot personalizzati',
      },
      demo4: {
        title: 'Elementi disabilitati',
      },
      demo5: {
        title: 'Espandi tutto di default',
      },
      demo6: {
        title: 'Ricercabile',
      },
      demo7: {
        title: 'Slot stato vuoto',
      },
      demo8: {
        title: 'Altro',
      },
      demo9: {
        title: 'Sola lettura',
      },
      demo10: {
        title: 'Disabilitato',
      },
      demo11: {
        title: 'Inizializza dati',
        description:
          'Utilizza ```initOptionsMethod``` per inizializzare i dati ad albero e restituire un oggetto ```Promise```',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        dataSource: 'Sorgente dati',
        defaultValue: 'Valore predefinito',
        placeholder: 'Testo segnaposto',
        width: 'Larghezza',
        size: 'Dimensione componente',
        disabled: 'Disabilitato',
        clearable: 'Cancellabile',
        checkable: 'Mostra checkbox',
        showAllLevels: 'Mostra tutti i livelli',
        showCheckIcon: 'Mostra icona selezione',
        showLine: 'Mostra linee connessione',
        expandAll: 'Espandi tutti i nodi',
        searchable: 'Ricercabile',
        searchDelay: 'Ritardo ricerca (ms)',
        readonly: 'Sola lettura',
        free: 'Modalità libera',
        align: 'Allineamento testo',
        trigger: 'Modalità attivazione nodi',
        keyField: 'Campo chiave nodo',
        labelField: 'Campo etichetta nodo',
        disabledField: 'Campo disabilitazione nodo',
        initOptionsMethod: 'Metodo inizializzazione albero',
        loadMethod: 'Metodo caricamento asincrono',
      },
      slots: {
        handle: 'Nome slot',
      },
    },
    inputTable: {
      name: 'Tabella Input',
      description:
        'Input dati in formato tabellare per inserimenti multipli efficienti',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Valori predefiniti',
      },
      demo3: {
        title: 'Avanzato',
      },
      props: {
        columns: 'Configurazione colonne',
        size: 'Dimensione',
        width: 'Larghezza',
        rowKey: 'Chiave riga',
        batchDeletable: 'Eliminazione multipla',
        addable: 'Aggiungibile',
        defaultForm: 'Form predefinito',
        deletable: 'Eliminabile',
        maxRows: 'Righe massime',
        minRows: 'Righe minime',
        clearable: 'Cancellabile',
        sortable: 'Ordinabile',
        autoUniqueId: 'ID unico automatico',
        uniqueField: 'Campo univoco',
        sortTooltipCustomRender: 'Rendering personalizzato tooltip ordinamento',
      },
    },
    switch: {
      name: 'Interruttore',
      description: 'Selettore a interruttore per stati binari',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Quadrato',
      },
      demo3: {
        title: 'Simula richiesta',
      },
      demo4: {
        title: 'Sola lettura',
      },
      demo5: {
        title: 'Disabilitato',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      props: {
        size: 'Dimensione',
        round: 'Arrotondato',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        request: 'Richiesta',
        loading: 'Caricamento',
      },
      events: {
        change: 'Nome evento',
      },
    },
    slider: {
      name: 'Cursore',
      description: 'Selezione valori tramite trascinamento',
      demo1: {
        title: 'Dimensioni',
      },
      demo2: {
        title: 'Passi diversi',
      },
      demo3: {
        title: 'Intervallo limitato',
      },
      demo4: {
        title: 'Sola lettura',
      },
      demo5: {
        title: 'Disabilitato',
      },
      demo6: {
        title: 'Configurazioni',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      props: {
        size: 'Dimensione',
        min: 'Minimo',
        max: 'Massimo',
        step: 'Passo',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        options: 'Opzioni',
        formatTooltip: 'Formatta tooltip',
      },
    },
    sliderRange: {
      name: 'Cursore Intervallo',
      description: 'Selezione intervalli di valori tramite cursore doppio',
      demo1: {
        title: 'Dimensioni',
      },
      demo2: {
        title: 'Passi diversi',
      },
      demo3: {
        title: 'Intervallo limitato',
      },
      demo4: {
        title: 'Sola lettura',
      },
      demo5: {
        title: 'Disabilitato',
      },
      demo6: {
        title: 'Configurazioni',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      props: {
        size: 'Dimensione',
        min: 'Minimo',
        max: 'Massimo',
        step: 'Passo',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
        options: 'Opzioni',
        formatTooltip: 'Formatta tooltip',
      },
    },
    rate: {
      name: 'Valutazione',
      description: 'Componente valutazione a stelle',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Sola lettura',
      },
      demo3: {
        title: 'Disabilitato',
      },
      demo4: {
        title: 'Suggerimenti',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      props: {
        size: 'Dimensione',
        count: 'Quantità',
        tips: 'Suggerimenti',
        readonly: 'Sola lettura',
        disabled: 'Disabilitato',
      },
    },
    colorPicker: {
      name: 'Selettore Colore',
      description: 'Strumento avanzato per selezione colori precisa',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Dimensioni diverse',
      },
      demo3: {
        title: 'Larghezza personalizzata',
      },
      demo4: {
        title: 'Disabilitato',
      },
      demo5: {
        title: 'Sola lettura',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      props: {
        size: 'Dimensione',
        width: 'Larghezza',
        placeholder: 'Segnaposto',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
      },
    },
    upload: {
      name: 'Caricamento',
      description: 'Componente per caricamento file semplificato',
      demo1: {
        title: 'Base',
      },
      demo2: {
        title: 'Limiti formato e dimensione',
      },
      demo3: {
        title: 'Carica immagine',
      },
      demo4: {
        title: 'Suggerimenti personalizzati',
      },
      demo5: {
        title: 'Galleria foto',
      },
      demo6: {
        title: 'Senza caricamento',
      },
      demo7: {
        title: 'Anteprima',
      },
      model: {
        modelValue: 'Valore legato',
      },
      props: {
        accept: 'Tipi file accettati',
        immediate: 'Caricamento immediato',
        multiple: 'Caricamento multiplo',
        disabled: 'Disabilitato',
        readonly: 'Sola lettura',
        limit: 'Limite file',
        maxFileSize: 'Dimensione massima file',
        size: 'Dimensione',
        tips: 'Suggerimenti',
        uploadHelper: 'Assistente caricamento',
        viewMode: 'Modalità visualizzazione',
      },
    },
    table: {
      name: 'Tabella',
      description: 'Potente componente tabella per visualizzazione dati',
      model: {
        modelValue: 'Nome parametro',
        selectedKeys: 'Chiavi selezionate',
        sortValue: 'Valore ordinamento',
      },
      demo1: {
        title: 'Base',
      },
      demo2: {
        title: 'Righe/Colonne fisse',
      },
      demo3: {
        title: 'Azioni personalizzate',
      },
      demo4: {
        title: 'Slot',
      },
      demo5: {
        title: 'Stile personalizzato',
      },
      demo6: {
        title: 'Selezione',
      },
      demo7: {
        title: 'Ordinabile',
      },
      demo8: {
        title: 'Rendering personalizzato',
      },
      demo9: {
        title: 'Funzionalità complete',
      },
      demo10: {
        title: 'Nessun dato',
      },
      demo11: {
        title: 'Intestazioni raggruppate',
        tipsTitle: 'Avviso limitazione',
        tipsContent:
          'Se desideri che le intestazioni raggruppate abbiano colonne fisse, devi impostare la larghezza per tutte le colonne fisse, inclusi tutti i nodi padre, altrimenti potrebbero verificarsi disallineamenti.',
      },
      demo12: {
        title: 'Ordinamento drag & drop',
      },
      props: {
        columns: 'Colonne',
        dataSource: 'Sorgente dati',
        size: 'Dimensione',
        checkable: 'Selezionabile',
        maxHeight: 'Altezza massima',
        multiple: 'Selezione multipla',
        rowKey: 'Chiave riga',
        bordered: 'Bordi',
        sortTooltipCustomRender: 'Rendering personalizzato tooltip ordinamento',
        sortable: 'Ordinabile',
      },
      tableColumns: {
        field: 'Campo',
        fixed: 'Fisso',
        title: 'Titolo',
        type: 'Tipo',
        width: 'Larghezza',
        x: 'Asse X',
        customRender: 'Rendering personalizzato',
      },
    },
    pagination: {
      name: 'Paginazione',
      description: 'Navigazione pagine chiara per sfogliare i dati',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Grande quantità',
      },
      demo3: {
        title: 'Simula asincrono',
      },
      model: {
        total: 'Nome parametro',
        currentPage: 'Pagina corrente',
        pageSize: 'Dimensione pagina',
      },
      props: {
        size: 'Dimensione',
        pageSizeOptions: 'Opzioni dimensione pagina',
        visiblePagesCount: 'Pagine visibili',
      },
      events: {
        change: 'Nome evento',
      },
    },
    magicNumber: {
      name: 'Numero Magico',
      description: 'Componente per animazioni numeriche accattivanti',
    },
    tree: {
      name: 'Albero',
      description: 'Visualizzazione dati gerarchici strutturata',
      demo1: {
        title: 'Base',
      },
      demo2: {
        title: 'Mostra checkbox',
      },
      demo3: {
        title: 'Selezione multipla',
      },
      demo4: {
        title: 'Modalità relazione padre-figlio',
      },
      demo5: {
        title: 'Richiesta asincrona',
      },
      demo6: {
        title: 'Espandi tutto di default',
      },
      demo7: {
        title: 'Mostra linee guida',
      },
      demo8: {
        title: 'Slot',
      },
      model: {
        modelValue: 'Nome parametro',
        expandedKeys: 'Chiavi nodi espansi',
      },
      props: {
        dataSource: 'Sorgente dati',
        multiple: 'Selezione multipla',
        checkable: 'Mostra checkbox',
        height: 'Altezza',
        searchable: 'Ricercabile',
        expandAll: 'Espandi tutti i nodi di default',
        free: 'Selezione libera',
        showLine: 'Mostra linee connessione',
        trigger: 'Modalità attivazione',
        placeholder: 'Testo segnaposto',
        keyField: 'Campo chiave nodo',
        labelField: 'Campo etichetta nodo',
        disabledField: 'Campo disabilitazione nodo',
        initOptionsMethod: 'Metodo inizializzazione albero',
        loadMethod: 'Metodo caricamento asincrono nodi',
        isSelect: 'È selezionato',
      },
      slots: {
        handle: 'Nome slot',
      },
      treeDataSource: {
        label: 'Etichetta',
        key: 'Chiave',
        isLeaf: 'È nodo foglia',
        children: 'Figli',
        disabled: 'Disabilitato',
      },
    },
    collapse: {
      name: 'Pannello pieghevole Collapse',
      description:
        'Area di contenuto che può essere espansa e compressa, per una visualizzazione più ordinata delle informazioni',
      demo1: {
        title: 'Utilizzo base',
      },
      demo2: {
        title: 'Slot titolo',
      },
      demo3: {
        title: 'Modalità fisarmonica',
      },
      model: {
        modelValue: 'Nome parametro',
      },
      'model(CollapseItem)': {
        modelValue: 'Nome parametro',
      },
      props: {
        width: 'Larghezza',
      },
      'props(CollapseItem)': {
        collapseKey: 'Chiave di collasso',
        title: 'Titolo',
        radius: 'Raggio',
      },
    },
    desc: {
      name: 'Lista descrittiva Desc',
      description:
        'Visualizza ordinatamente più campi per una presentazione più strutturata delle informazioni',
      demo1: {
        title: 'Utilizzo base',
      },
      demo2: {
        title: 'Direzione',
      },
      demo3: {
        title: 'Ricco',
      },
      demo4: {
        title: 'Supporta configurazione online',
      },
      props: {
        options: 'Opzioni',
        dataSource: 'Sorgente dati',
        size: 'Dimensione',
        labelX: 'Etichetta X',
        valueX: 'Valore X',
        gap: 'Spaziatura',
        width: 'Larghezza',
        columns: 'Colonne',
        labelWidth: 'Larghezza etichetta',
        direction: 'Direzione',
        bordered: 'Con bordo',
      },
      descItemProps: {
        label: 'Etichetta',
        field: 'Campo',
        size: 'Dimensione',
        bordered: 'Con bordo',
        width: 'Larghezza',
        labelWidth: 'Larghezza etichetta',
        direction: 'Direzione',
        tips: 'Suggerimenti',
        type: 'Tipo',
        labelX: 'Etichetta X',
        valueX: 'Valore X',
        gridArea: 'Area griglia',
        customRender: 'Rendering personalizzato',
      },
    },
    alert: {
      name: 'Avviso Alert',
      description:
        'Riquadro di avviso per informazioni importanti, per avvertimenti più delicati',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Supporto slot',
      },
      demo3: {
        title: 'Altri scenari',
      },
      props: {
        type: 'Tipo',
        title: 'Titolo',
        content: 'Contenuto avviso',
        closeable: 'Chiudibile',
        footer: 'Contenuto footer',
      },
    },
    message: {
      name: 'Messaggio globale Message',
      description:
        'Feedback leggero di informazioni, per notifiche più concise',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Controllabile',
      },
      demo3: {
        title: 'Simulazione richiesta',
      },
      events: {
        close: 'Attivato alla chiusura',
      },
      props: {
        type: 'Tipo',
        content: 'Contenuto messaggio',
        duration: 'Durata',
      },
    },
    notification: {
      name: 'Notifica',
      description: 'Notifiche eleganti per un feedback più intuitivo.',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Durata',
      },
      demo3: {
        title: 'Larghezza personalizzata',
      },
      demo4: {
        title: 'Mostra barra di avanzamento',
      },
      demo5: {
        title: 'Chiusura manuale',
      },
      props: {
        title: 'Titolo',
        content: 'Contenuto notifica',
        delay: 'Durata',
        width: 'Larghezza',
        showProgress: 'Mostra barra di avanzamento',
      },
    },
    drawer: {
      name: 'Drawer',
      description: 'Pannello a scorrimento laterale per operazioni temporanee.',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Chiusura asincrona',
      },
      demo3: {
        title: 'Intestazione e piè di pagina personalizzati',
      },
      demo4: {
        title: 'Chiudi con ESC',
      },
      demo5: {
        title: 'Chiudi cliccando sul overlay',
      },
      demo6: {
        title: 'Annidato',
      },
      model: {
        visible: 'Visibile',
      },
      props: {
        title: 'Titolo',
        width: 'Larghezza',
        position: 'Posizione',
        height: 'Altezza',
        closeOnClickOverlay: 'Chiudi cliccando sul overlay',
        closeByEsc: 'Chiudi con tasto ESC',
        hideFooter: 'Nascondi piè di pagina',
        okButtonProps: 'Proprietà pulsante OK',
        closeButtonProps: 'Proprietà pulsante Chiudi',
        zIndex: 'z-index',
      },
    },
    dialog: {
      name: 'Dialogo',
      description:
        'Finestra di dialogo modale per evidenziare interazioni importanti.',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Chiusura asincrona',
      },
      demo3: {
        title: 'Chiudi cliccando sul overlay',
      },
      demo4: {
        title: 'Chiudi con ESC',
      },
      props: {
        type: 'Tipo',
        width: 'Larghezza',
        trigger: 'Trigger',
        title: 'Titolo',
        okText: 'Testo pulsante OK',
        cancelText: 'Testo pulsante Annulla',
        ok: 'Callback conferma',
        cancel: 'Callback annullamento',
        closeOnClickOverlay: 'Chiudi cliccando sul overlay',
        closeByEsc: 'Chiudi con tasto ESC',
        transformOrigin: 'Origine trasformazione',
      },
      events: {
        ok: 'Scatta al click su OK',
        cancel: 'Scatta al click su Annulla',
      },
    },
    modal: {
      name: 'Modale',
      description:
        'Finestra modale flessibile, per interazioni popup più ricche',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Chiusura asincrona',
      },
      demo3: {
        title: 'Header e footer personalizzati',
      },
      demo4: {
        title: 'Chiusura con ESC abilitata',
      },
      model: {
        visible: 'Visibilità',
      },
      props: {
        title: 'Titolo',
        width: 'Larghezza',
        top: "Distanza dall'alto",
        maxHeight: 'Altezza massima',
        hideFooter: 'Nascondi footer',
        closeByEsc: 'Chiudi con ESC',
        okButtonProps: 'Proprietà OK',
        closeOnClickOverlay: 'Chiudi al click overlay',
        zIndex: 'Z-index',
        closeButtonProps: 'Proprietà pulsante Chiudi',
      },
    },
    popok: {
      name: 'Conferma popup Popok',
      description:
        'Conferma leggera, per conferme di operazioni più convenienti',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Modalità trigger',
      },
      props: {
        type: 'Tipo',
        width: 'Larghezza',
        trigger: 'Trigger',
        title: 'Titolo',
        content: 'Contenuto',
        placement: 'Posizione',
        okText: 'Testo OK',
        cancelText: 'Testo Annulla',
        ok: 'Callback OK',
        cancel: 'Callback Annulla',
      },
    },
    popover: {
      name: 'Popover',
      description:
        'Una scheda a comparsa che fornisce informazioni o azioni aggiuntive.',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Trigger',
      },
      demo3: {
        title: 'Trigger personalizzato',
      },
      demo4: {
        title: "Chiudi cliccando all'esterno",
      },
      demo5: {
        title: 'Stato di caricamento',
      },
      props: {
        trigger: 'Trigger',
        placement: 'Posizione',
        disabled: 'Disabilitato',
        loading: 'Caricamento',
        hideOnClick: 'Nascondi al click',
        offset: 'Offset',
        popoverBodyClassName: 'Classe corpo popover',
        triggerTarget: 'Target trigger',
      },
      slots: {
        trigger: 'Slot trigger',
        'popover-body': 'Slot corpo popover',
      },
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Semplice fumetto di testo per suggerimenti leggeri.',
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Attivazione al click',
      },
      demo3: {
        title: 'Ritardo',
      },
      demo4: {
        title: 'Supporto HTML',
      },
      props: {
        tips: 'Contenuto tooltip',
        placement: 'Posizione',
        trigger: 'Trigger',
        allowHTML: 'Consenti HTML',
        delay: 'Ritardo',
      },
    },
    loading: {
      name: 'Caricamento',
      description:
        "Un elegante effetto di caricamento per rendere l'attesa più piacevole.",
      demo1: {
        title: 'Uso base',
      },
      demo2: {
        title: 'Dimensione icona personalizzata',
      },
      demo3: {
        title: 'Messaggio personalizzato',
      },
      props: {
        tip: 'Messaggio',
        iconSize: 'Dimensione icona',
        visible: 'Visibile',
      },
    },
    result: {
      name: 'Risultato',
      description:
        'Per mostrare risultati di operazioni, per feedback più completi',
      demo1: {
        title: 'Uso base',
      },
      props: {
        type: 'Tipo',
        title: 'Titolo',
        content: 'Contenuto',
      },
      slots: {
        handle: 'Slot gestione',
      },
    },
    empty: {
      name: 'Stato vuoto Empty',
      description:
        'Visualizzazione stato dati vuoto, per pagine vuote più amichevoli',
      demo1: {
        title: 'Uso base',
      },
      props: {
        type: 'Tipo',
        title: 'Titolo',
        fontSize: 'Dimensione font',
        padding: 'Padding',
        width: 'Larghezza',
        height: 'Altezza',
      },
    },
    actionBox: {
      name: 'Box azioni',
      description: 'Pulsanti di azione flessibili per operazioni rapide',
      demo1: {
        title: 'Utilizzo base',
      },
      demo2: {
        title: 'Menu a discesa',
      },
      demo3: {
        title: 'Icone personalizzate',
      },
      demo4: {
        title: 'Stili personalizzati',
      },
      props: {
        options: 'Configurazione pulsanti azione',
        dropdownThreshold: 'Soglia menu a discesa',
        dropdownLabel: 'Testo menu a discesa',
        dropdownIcon: 'Icona menu a discesa',
        divider: 'Mostra divisore',
        iconOnly: 'Mostra solo icona',
        x: 'Posizione X',
      },
      options: {
        label: 'Testo pulsante azione',
        icon: 'Icona pulsante azione',
        onClick: 'Evento click pulsante azione',
        customRender: 'Contenuto rendering personalizzato',
      },
    },
  },
};
