const contextMenu = {
  label: 'Angezeigter Text',
  value: 'Wert',
  icon: 'Icon-Renderfunktion',
  children: 'Unterknoten-Sammlung',
  disabled: 'Deaktivierte Option',
  isDividerLine: 'Ist Trennlinie',
  checkable: 'Ist Kontrollkästchen',
  checked: 'Ist ausgewählt',
  onClick: 'Klick-Ereignis',
}

export default {
  name: 'de',
  home: {
    title: 'Lew UI',
    description:
      'Eine schöne und benutzerfreundliche Vue3-Komponentenbibliothek',
    getStarted: 'Loslegen',
    sloganTitle: 'Weniger ist mehr',
    slogan: 'Eine schöne und benutzerfreundliche Vue3-Komponentenbibliothek',
    home: 'Startseite',
    install: 'Installation',
    components: 'Komponenten',
    formEngine: 'Formular-Engine',
    descEngine: 'Beschreibungs-Engine',
  },
  base: {
    base: 'Basis',
    navigation: 'Navigation',
    form: 'Formular',
    data: 'Datenkomponenten',
    feedback: 'Rückmeldung',
    close: 'Schließen',
    showCode: 'Code anzeigen',
  },
  components: {
    image: {
      name: 'Bild',
      description:
        'Elegante Bildanzeige mit Unterstützung für Lazy Loading, Ladezustände und Fehlerbehandlung',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Ladezustand',
        tipsTitle: 'Tipps',
        tipsContent:
          'Sie müssen Breite und Höhe festlegen, um einen Platzhalter-Ladeeffekt zu erhalten.',
      },
      demo3: {
        title: 'Ladefehler',
      },
      props: {
        src: 'Bild-URL',
        alt: 'Bildbeschreibung',
        width: 'Breite',
        height: 'Höhe',
        objectFit: 'Anpassungsmodus',
        objectPosition: 'Bildposition',
        lazy: 'Lazy Loading aktivieren',
        loading: 'Ladezustand anzeigen',
        title: 'Bildtitel',
      },
    },
    avatar: {
      name: 'Avatar',
      description:
        'Eine elegante Avatar-Komponente, die Bild-, Icon- und Textformate unterstützt',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Status',
      },
      demo3: {
        title: 'Standard-Avatar',
      },
      demo4: {
        title: 'Form',
        description:
          'Steuern Sie die Form des Avatars über `shape`. Mögliche Werte sind `circle`, `square`, `sharp`.',
      },
      props: {
        size: 'Größe',
        loading: 'Ladezustand anzeigen',
        shape: 'Form',
        src: 'Bild-URL',
        alt: 'Bildbeschreibung',
        status: 'Status',
        objectFit: 'Anpassungsmodus',
        objectPosition: 'Bildposition',
        statusPlacement: 'Statusposition',
      },
    },
    button: {
      name: 'Schaltfläche',
      description:
        'Machen Sie Ihre Interaktionen flüssiger mit einem einfachen Klick',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Farbe',
      },
      demo3: {
        title: 'Icon',
      },
      demo4: {
        title: 'Ladezustand',
      },
      demo5: {
        title: 'Deaktivierter Zustand',
      },
      demo6: {
        title: 'Promise-Unterstützung',
      },
      props: {
        text: 'Schaltflächentext',
        type: 'Typ',
        size: 'Größe',
        singleIcon: 'Nur Icon anzeigen',
        color: 'Farbe',
        round: 'Abgerundet',
        dashed: 'Gestrichelt',
        loading: 'Ladezustand anzeigen',
        disabled: 'Deaktivierter Zustand',
        request: 'Anfrage',
      },
    },
    tag: {
      name: 'Etikett',
      description:
        'Ein kleines, aber leistungsstarkes Markierungswerkzeug, das der Inhaltsklassifizierung Farbe verleiht',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Typ',
      },
      demo3: {
        title: 'Größe',
      },
      demo4: {
        title: 'Farbe',
      },
      demo5: {
        title: 'Deaktiviert',
      },
      demo6: {
        title: 'Schließbar',
      },
      demo7: {
        title: 'Slot',
      },
      props: {
        text: 'Etikettentext, hat Vorrang vor Slot, Text-Trim-Effekt wird bei Überschreitung der Breite ausgelöst',
        type: 'Stiltyp',
        size: 'Größe',
        color: 'Farbthema',
        closable: 'Schließbar',
        disabled: 'Deaktiviert',
        round: 'Abgerundet',
        oversize: 'Großzügigere Größe',
      },
    },
    badge: {
      name: 'Abzeichen',
      description:
        'Ein kleiner roter Punkt, der in der oberen rechten Ecke erscheint und Benachrichtigungen auffälliger macht',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Punkt',
      },
      demo3: {
        title: 'Direkte Verwendung',
      },
      demo4: {
        title: 'Text',
      },
      demo5: {
        title: 'In Bearbeitung',
      },
      props: {
        text: 'Abzeichentext',
        offset: 'Abzeichenversatz',
        processing: 'In Bearbeitung',
        max: 'Maximalwert, wird als max+ angezeigt wenn überschritten',
        color: 'Abzeichenfarbe',
        disabled: 'Deaktiviert',
        value: 'Abzeichenwert (wird als Punkt angezeigt wenn leer)',
      },
    },
    title: {
      name: 'Titel',
      description:
        'Nicht nur ein Titel, sondern die Essenz, die dem Inhalt Leben einhaucht',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Fett',
      },
      demo3: {
        title: 'Farbe',
      },
      props: {
        text: 'Textinhalt',
        size: 'Titeltext-Größe, kann eine Zahl (Einheit: Pixel) oder eine Zeichenkette (z.B. "1.5em") sein',
        bold: 'Titeltext-Stärke, optionale Werte sind ganze Zahlen zwischen 100 und 900',
        color:
          'Titeltext-Farbe, optionale Werte umfassen vordefinierte Farbnamen oder benutzerdefinierte Farbwerte',
      },
    },
    textTrim: {
      name: 'Textkürzung',
      description:
        'Elegante Handhabung langer Texte ohne die Ästhetik des Layouts zu beeinträchtigen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Mehrzeilige Auslassungspunkte',
      },
      demo3: {
        title: 'Endtext',
      },
      demo4: {
        title: 'Ausrichtung',
      },
      props: {
        text: 'Textinhalt',
        lineClamp:
          'Maximale Anzahl der anzuzeigenden Zeilen, Überschuss wird abgeschnitten',
        allowHTML: 'Rendering von HTML-Tags erlauben',
        placement: 'Position der Tooltip-Anzeige',
        offset:
          'Tooltip-Versatz relativ zum Zielelement [x, y] (Einheit: Pixel)',
        textAlign:
          'Horizontale Ausrichtung (wenn Breite kleiner als Container-Breite)',
        delay:
          'Verzögerungszeit für das Ein- und Ausblenden des Tooltips [Einblendverzögerung, Ausblendverzögerung] (Einheit: Millisekunden)',
        reserveEnd:
          'Anzahl der am Ende zu behaltenden Zeichen, zeigt Auslassungspunkte in der Mitte an, wenn Text überläuft, behält Anfang und angegebene Anzahl von Endzeichen bei',
      },
    },
    flex: {
      name: 'Flex-Layout',
      description: 'Flexibles Layout-System für mühelose Seitengestaltung',
      demo1: {
        title: 'Zeile',
      },
      demo2: {
        title: 'Spalte',
      },
      demo3: {
        title: 'Modus',
      },
      props: {
        direction: 'Ausrichtung der Kindelemente',
        x: 'Horizontale Ausrichtung der Kindelemente',
        y: 'Vertikale Ausrichtung der Kindelemente',
        mode: 'Verteilungsmodus der Kindelemente, überschreibt x- oder y-Ausrichtung abhängig von der direction-Einstellung',
        wrap: 'Erlaubt Zeilenumbruch bei Platzmangel',
        gap: 'Abstand zwischen Kindelementen (Einheit: Pixel)',
        width: 'Breite des Flex-Containers (Einheit: Pixel oder Prozent)',
      },
    },
    mark: {
      name: 'Markierung',
      description:
        'Fügt Hervorhebungen zu Texten hinzu, um wichtige Inhalte klar zu machen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      props: {
        color: 'Farbthema',
        round: 'Abgerundet',
        bold: 'Fettschrift aktivieren',
        cursor: 'Mauszeiger-Stil beim Hover',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'Eine schöne Icon-Sammlung zur visuellen Verbesserung der Benutzeroberfläche',
    },
    backTop: {
      name: 'Nach oben scrollen',
      description:
        'Mit einem Klick zurück nach oben - macht das Scrollen auf langen Seiten angenehmer',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Benutzerdefinierter Inhalt',
      },
      demo3: {
        title: 'Direktiven-basierte Auslösung',
      },
      props: {
        target:
          'Zielelement für das Scroll-Event (CSS-Selektor). Standardmäßig das gesamte Fenster, wenn leer.',
        right: 'Abstand zur rechten Seite in Pixeln',
        bottom: 'Abstand zum unteren Rand in Pixeln',
        valveHeight:
          'Schwellenwert der Scroll-Höhe in Pixeln, ab dem der Button angezeigt wird',
      },
      events: {
        click: 'Callback beim Klick auf den Button',
      },
    },
    steps: {
      name: 'Schritte',
      description:
        'Zeigt den Betriebsablauf klar an und lässt den Benutzer wissen, wo er sich befindet',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Status',
      },
      demo3: {
        title: 'Wird geladen',
      },
      model: {
        modelValue: 'Index des aktuell aktiven Schritts',
      },
      props: {
        options: 'Array der Schrittkonfigurationen',
        status: 'Aktueller Status der Schritte',
        minWidth: 'Minimale Schrittbreite',
      },
      options: {
        title: 'Schritttitel',
        description: 'Schrittbeschreibung',
      },
    },
    menu: {
      name: 'Menü',
      description: 'Elegantes vertikales Menü für klare Navigation',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      model: {
        modelValue: 'Wert des aktiven Menüpunkts',
      },
      props: {
        options: 'Array der Menü-Konfigurationen',
      },
      menuOptions: {
        label: 'Text des Menüpunkts',
        value: 'Wert des Menüpunkts',
        children: 'Array der Untermenüpunkte',
        disabled: 'Menüpunkt deaktivieren',
        icon: 'Icon des Menüpunkts',
        tagProps: 'Badge-Props des Menüpunkts',
      },
    },
    menuTree: {
      name: 'Menübaum',
      description:
        'Hierarchisches Baummenü zur übersichtlichen Darstellung komplexer Strukturbeziehungen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Benutzerdefinierte Icons',
      },
      demo3: {
        title: 'Standardmäßig ausgeklappt',
        description:
          'Steuern Sie die standardmäßig ausgeklappten Menüpunkte über v-model.',
      },
      demo4: {
        title: 'Badges',
      },
      demo5: {
        title: 'Benutzerdefiniertes Styling',
      },
      model: {
        modelValue: 'Wert des aktiven Menüpunkts',
        expandKeys:
          'Array der Schlüssel der standardmäßig ausgeklappten Menüpunkte',
        collapsed: 'Ist das Menü eingeklappt',
      },
      props: {
        options:
          'Datenquelle des Menübaums, unterstützt verschachtelte Strukturen',
        width: 'Breite des Menübaums, unterstützt CSS-Breitenwerte',
      },
      menuTreeItem: {
        label:
          'Titel des Menübaum-Elements. Kann auch über den benannten Slot "label" angepasst werden',
        value: 'Wert des Menüpunkts zur eindeutigen Identifizierung',
        level: 'Ebene des Menübaum-Elements, beginnt bei 1',
        icon: 'Icon-Renderfunktion',
        tagProps: 'Badge-Props des Menüpunkts',
        disabled: 'Ist der Menüpunkt deaktiviert',
        isLeaf: 'Ist es ein Blattknoten',
      },
    },
    dropdown: {
      'name': 'Dropdown-Menü',
      'description': 'Klickaktiviertes Schwebendes Menü für bequemere Bedienung',
      'demo1': {
        title: 'Grundlegende Verwendung',
      },
      'demo2': {
        title: 'Nicht nur Buttons',
      },
      'demo3': {
        title: 'Deaktivierte Einträge',
      },
      'props': {
        options: 'Menüoptionen-Konfiguration',
        trigger: 'Auslösemethode',
        placement: 'Position',
        checkable: 'Ist auswählbar',
      },
      'options(LewContextMenusOption[])': contextMenu,
      'events': {
        show: 'Callback beim Anzeigen des Menüs',
        hide: 'Callback beim Ausblenden des Menüs',
        change: 'Callback bei Auswahl eines Menüpunkts',
      },
    },
    breadcrumb: {
      name: 'Brotkrümelnavigation',
      description:
        'Klare Pfadnavigation, damit Benutzer nicht die Orientierung verlieren',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Benutzerdefinierte Auswahl',
      },
      demo3: {
        title: 'Trennzeichen-Icon-Typen',
      },
      props: {
        options: 'Array der Brotkrümel-Konfigurationen',
        separator: 'Trennzeichen-Icon-Typ',
      },
      breadcrumbOptions: {
        label: 'Text des Brotkrümels',
        value: 'Wert des Brotkrümels',
        active: 'Ist aktuell ausgewählt',
      },
      events: {
        change: 'Wird ausgelöst, wenn sich der Brotkrümel ändert',
      },
    },
    contextMenu: {
      'name': 'Kontextmenü',
      'description': 'Elegantes Rechtsklickmenü für natürlichere Bedienung',
      'demo1': {
        title: 'Grundlegende Verwendung',
      },
      'demo2': {
        title: 'Unterstützt mehrere Ebenen',
      },
      'demo3': {
        title: 'Unterstützt dynamische Aktualisierung',
      },
      'demo4': {
        title: 'Kontrollkästchen',
      },
      'props': {
        options: 'Kontextmenü-Konfiguration',
        disabled: 'Kontextmenü deaktivieren',
      },
      'options(LewContextMenusOption[])': contextMenu,
    },
    form: {
      name: 'Formular',
      description:
        'Leistungsstarke Formularverarbeitung für mühelose Datenerfassung',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Ausrichtung',
      },
      demo3: {
        title: 'Benutzerdefinierte Validierung',
      },
      demo4: {
        title: 'Unterstützt Rasterlayout',
      },
      demo5: {
        title: 'Mit Formular-Engine-Konfiguration',
      },
      demo6: {
        title: 'Asynchrone Formularelement-Ladung',
      },
      props: {
        options:
          'Array der Optionen zur Definition von Formularstruktur und -inhalt',
        size: 'Gesamtgröße des Formulars, beeinflusst alle Formularelemente',
        width:
          'Gesamtbreite des Formulars, unterstützt Zahlen (Pixel) oder Prozentangaben',
        columns: 'Anzahl der Formularelemente pro Zeile, maximal 4',
        labelWidth:
          'Breite der Formularelement-Labels, unterstützt Zahlen (Pixel) oder "auto"',
        disabled: 'Gesamtes Formular deaktivieren',
        readonly: 'Gesamtes Formular schreibgeschützt setzen',
        direction:
          'Ausrichtung der Formularelemente, "x" für horizontal, "y" für vertikal',
        formMethods:
          'Sammlung von Formularmethoden mit Funktionen zur Formularsteuerung',
      },
      formItemProps: {
        label: 'Label-Text des Formularelements',
        field: 'Feldname des Formularelements für Datenbindung und Validierung',
        required: 'Ist Pflichtfeld',
        as: 'Typ des Formularelements, z.B. "input", "select" etc.',
        size: 'Größe des einzelnen Formularelements, überschreibt Gesamteinstellung',
        width:
          'Breite des einzelnen Formularelements, unterstützt Zahlen (Pixel) oder Prozentangaben',
        labelWidth:
          'Label-Breite des einzelnen Formularelements, unterstützt Zahlen (Pixel) oder "auto"',
        direction:
          'Ausrichtung des einzelnen Formularelements, "x" für horizontal, "y" für vertikal',
        disabled: 'Formularelement deaktivieren',
        readonly: 'Formularelement schreibgeschützt setzen',
        tips: 'Hinweistext für das Formularelement',
        errMessage:
          'Benutzerdefinierte Fehlermeldung bei fehlgeschlagener Validierung',
        rule: 'Validierungsregel für das Formularelement',
        props: 'Zusätzliche Eigenschaften für die Formularelement-Komponente',
        between:
          'Bei horizontaler Ausrichtung Abstand zwischen Formularelementen hinzufügen',
        gridArea: 'Position im Rasterlayout',
        outputFormat: 'Formatierungsmethode für Ausgabeparameter',
        inputFormat: 'Formatierungsmethode für Eingabeparameter',
      },
      events: {
        mounted: 'Wird ausgelöst, wenn das Formularelement eingebunden wird',
      },
      methods: {
        getForm: 'Formular abrufen',
        setForm: 'Formular setzen',
      },
    },
    input: {
      name: 'Eingabefeld',
      description: 'Funktionsreiches Eingabefeld für bequemere Dateneingabe',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Präfix und Suffix',
      },
      demo3: {
        title: 'Zeichenlimit',
      },
      demo4: {
        title: 'Ausrichtung',
      },
      demo5: {
        title: 'Passwort sichtbar',
      },
      demo6: {
        title: 'Automatische Breitenanpassung',
      },
      demo7: {
        title: 'Gesamten Text bei Fokus auswählen',
      },
      demo8: {
        title: 'Löschbar',
      },
      demo9: {
        title: 'Schreibgeschützt',
      },
      demo10: {
        title: 'Deaktiviert',
      },
      demo11: {
        title: 'Enter-Taste löst Event aus',
      },
      props: {
        type: 'Eingabefeld-Typ',
        size: 'Eingabefeld-Größe',
        width: 'Eingabefeld-Breite',
        placeholder: 'Platzhaltertext',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
        clearable: 'Löschbar',
        showPassword: 'Passwort sichtbar',
        maxLength: 'Maximale Eingabelänge',
        showCount: 'Zeichenzähler anzeigen (nur bei type="text")',
        align: 'Textausrichtung',
        minWidth: 'Minimale Breite, unterstützt Zahlen (Pixel) oder Einheiten',
        autoWidth: 'Breite automatisch an Inhalt anpassen',
        selectByFocus: 'Gesamten Text bei Fokus auswählen',
        copyable: 'Kopieren erlauben (nur bei readonly=true und suffix=false)',
        prefixes: 'Präfix-Typ',
        prefixesOptions: 'Präfix-Optionen, wenn prefixes="select"',
        prefixesTooltip: 'Präfix-Tooltip-Text',
        suffix: 'Suffix-Typ',
        suffixOptions: 'Suffix-Optionen, wenn suffix="select"',
        suffixTooltip: 'Suffix-Tooltip-Text',
        okByEnter: 'Enter-Taste zur Bestätigung erlauben',
      },
      events: {
        change: 'Wird bei Wertänderung ausgelöst',
        focus: 'Wird bei Fokus ausgelöst',
        blur: 'Wird bei Fokusverlust ausgelöst',
        input: 'Wird bei Eingabe ausgelöst',
        clear: 'Wird beim Löschen ausgelöst',
        ok: 'Wird bei Bestätigung ausgelöst',
      },
      model: {
        modelValue: 'Eingabefeld-Wert',
        prefixValue: 'Präfix-Wert',
        suffixValue: 'Suffix-Wert',
      },
    },
    inputNumber: {
      name: 'Zahleneingabe',
      description: 'Spezielles Eingabefeld für präzise Zahleneingabe',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Bei Fokus alles auswählen',
      },
      demo3: {
        title: 'Bereichsbegrenzung',
      },
      demo4: {
        title: 'Präzise Werte',
      },
      demo5: {
        title: 'Deaktiviert und schreibgeschützt',
      },
      props: {
        min: 'Minimalwert',
        max: 'Maximalwert',
        step: 'Schrittweite',
        disabled: 'Präzision',
        size: 'Größe (small, medium, large)',
        placeholder: 'Platzhaltertext',
        readonly: 'Schreibgeschützt',
        width: 'Breite, unterstützt Zahlen (Pixel) oder Einheiten',
        align: 'Ausrichtung',
        selectByFocus: 'Bei Fokus alles auswählen',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
    },
    textarea: {
      name: 'Textbereich',
      description: 'Mehrzeiliges Eingabefeld für komfortablere Texteingabe',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Zeichenlimit',
      },
      demo3: {
        title: 'Bei Fokus alles auswählen',
      },
      demo4: {
        title: 'Löschbar',
      },
      demo5: {
        title: 'Schreibgeschützt',
      },
      demo6: {
        title: 'Deaktiviert',
      },
      demo7: {
        title: 'Enter-Taste löst Event aus',
      },
      demo8: {
        title: 'Größenänderung möglich',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        placeholder: 'Platzhaltertext',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
        clearable: 'Löschbar',
        showCount: 'Zeichenzähler anzeigen',
        maxLength: 'Maximale Zeichenanzahl',
        size: 'Größe',
        resize: 'Richtung der Größenänderung',
        width: 'Breite',
        height: 'Höhe',
        minWidth: 'Minimale Breite',
        minHeight: 'Minimale Höhe',
        maxWidth: 'Maximale Breite',
        maxHeight: 'Maximale Höhe',
        selectByFocus: 'Bei Fokus alles auswählen',
        okByEnter:
          'Enter-Taste zur Bestätigung (Shift+Enter für Zeilenumbruch)',
      },
      events: {
        change: 'Wird bei Wertänderung ausgelöst',
        focus: 'Wird bei Fokus ausgelöst',
        blur: 'Wird bei Fokusverlust ausgelöst',
        input: 'Wird bei Eingabe ausgelöst',
        clear: 'Wird beim Löschen ausgelöst',
        ok: 'Wird bei Bestätigung ausgelöst',
      },
    },
    inputTag: {
      name: 'Tag-Eingabe',
      description:
        'Einfache Eingabe und Verwaltung mehrerer Tags für übersichtlichere Datenorganisation',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Größe',
      },
      demo3: {
        title: 'Duplikate erlauben',
      },
      demo4: {
        title: 'Kontrollierter Standardwert',
      },
      demo5: {
        title: 'Löschbar',
      },
      demo6: {
        title: 'Schreibgeschützt',
      },
      demo7: {
        title: 'Deaktiviert',
      },
      demo8: {
        title: 'Maximale Eingabelänge',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        size: 'Größe',
        disabled: 'Deaktiviert',
        clearable: 'Löschbar',
        placeholder: 'Platzhaltertext',
        readonly: 'Schreibgeschützt',
        allowDuplicates: 'Duplikate erlauben',
        maxLength: 'Maximale Anzahl von Tags',
        width: 'Breite',
      },
      events: {
        change: 'Wird bei Wertänderung ausgelöst',
        clear: 'Wird beim Löschen ausgelöst',
        add: 'Wird beim Hinzufügen eines Tags ausgelöst',
        remove: 'Wird beim Entfernen eines Tags ausgelöst',
      },
    },
    checkbox: {
      'name': 'Kontrollkästchen',
      'description':
        'Mehrfachauswahl-Komponente für intuitive Auswahlmöglichkeiten',
      'demo1': {
        title: 'Grundlegende Verwendung',
      },
      'demo2': {
        title: 'Vertikale Anordnung',
      },
      'demo3': {
        title: 'Block-Darstellung',
      },
      'demo4': {
        title: 'Abgerundet',
      },
      'demo5': {
        title: 'Schreibgeschützt',
      },
      'demo6': {
        title: 'Deaktiviert',
      },
      'demo7': {
        title: 'Einzelmodus',
      },
      'model(CheckboxGroup)': {
        modelValue: 'Gebundener Wert',
      },
      'model(Checkbox)': {
        modelValue: 'Gebundener Wert',
      },
      'props(CheckboxGroup)': {
        options: 'Optionen',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
        size: 'Größe',
        direction: 'Ausrichtung',
        block: 'Block-Darstellung',
        round: 'Abgerundet',
        iconable: 'Icon aktivieren',
      },
      'props(Checkbox)': {
        label: 'Beschriftung',
        value: 'Wert',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
        checked: 'Ausgewählt',
        size: 'Größe',
        block: 'Block-Darstellung',
        round: 'Abgerundet',
        iconable: 'Icon aktivieren',
        certain: 'Bestimmter Zustand',
      },
      'events(Checkbox)': {
        change: 'Wird bei Wertänderung ausgelöst',
      },
      'events(CheckboxGroup)': {
        change: 'Wird bei Wertänderung ausgelöst',
      },
      'options': {
        label: 'Beschriftung',
        value: 'Wert',
        disabled: 'Deaktiviert',
      },
    },
    radio: {
      'name': 'Optionsfeld',
      'description': 'Einzelauswahl-Komponente für klare Auswahlmöglichkeiten',
      'demo1': {
        title: 'Grundlegende Verwendung',
      },
      'demo2': {
        title: 'Vertikale Anordnung',
      },
      'demo3': {
        title: 'Block-Darstellung',
      },
      'demo4': {
        title: 'Form',
      },
      'demo5': {
        title: 'Schreibgeschützt',
      },
      'demo6': {
        title: 'Deaktiviert',
      },
      'model': {
        modelValue: 'Gebundener Wert',
      },
      'props(RadioGroup)': {
        size: 'Größe',
        block: 'Block-Darstellung',
        direction: 'Ausrichtung',
        disabled: 'Deaktiviert',
        iconable: 'Icon aktivieren',
        options: 'Optionen',
        readonly: 'Schreibgeschützt',
        round: 'Abgerundet',
      },
      'options': {
        label: 'Beschriftung',
        value: 'Wert',
        disabled: 'Deaktiviert',
      },
      'events': {
        change: 'Wird bei Wertänderung ausgelöst',
      },
    },
    tabs: {
      name: 'Registerkarten',
      description:
        'Klare Inhaltsorganisation mit flüssigem Wechsel zwischen Kategorien',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Adaptive Breite',
      },
      demo3: {
        title: 'Benutzerdefinierte Elementbreite',
      },
      demo4: {
        title: 'Linie',
      },
      demo5: {
        title: 'Abgerundet',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        options: 'Optionen',
        type: 'Typ',
        size: 'Größe',
        width: 'Breite',
        itemWidth: 'Elementbreite',
        round: 'Abgerundet',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
      },
      options: {
        label: 'Beschriftung',
        value: 'Wert',
      },
    },
    select: {
      name: 'Auswahlfeld',
      description: 'Dropdown-Auswahlfeld für bequeme Auswahl',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Suche',
      },
      demo3: {
        title: 'Slot-Unterstützung',
      },
      demo4: {
        title: 'Deaktivierte Optionen',
      },
      demo5: {
        title: 'Schreibgeschützt',
      },
      demo6: {
        title: 'Deaktiviert',
      },
      demo7: {
        title: 'Benutzerdefinierter Leerzustand',
      },
      demo8: {
        title: 'Gruppierung',
      },
      demo9: {
        title: 'Optionsinitialisierungsmethode',
      },
      demo10: {
        title: 'Suchcache aktivieren',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        defaultValue: 'Standardwert',
        options: 'Optionen',
        width: 'Breite',
        autoWidth: 'Auto Width',
        popoverWidth: 'Popover Width',
        trigger: 'Auslösemethode',
        placeholder: 'Platzhaltertext',
        size: 'Größe',
        itemHeight: 'Elementhöhe',
        searchable: 'Durchsuchbar',
        searchMethod: 'Suchmethode',
        searchDelay: 'Suchverzögerung',
        clearable: 'Löschbar',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        showCheckIcon: 'Häkchen-Icon anzeigen',
        initMethod: 'Optionsinitialisierungsmethode',
        enableSearchCache: 'Suchcache aktivieren',
      },
      events: {
        change: 'Wird bei Wertänderung ausgelöst',
        clear: 'Wird beim Löschen ausgelöst',
        blur: 'Wird bei Fokusverlust ausgelöst',
        focus: 'Wird bei Fokus ausgelöst',
      },
      options: {
        label: 'Beschriftung',
        value: 'Wert',
        disabled: 'Deaktiviert',
      },
      slots: {
        item: 'Benutzerdefinierter Optionsinhalt',
        empty: 'Benutzerdefinierter Leerzustand',
      },
    },
    selectMultiple: {
      name: 'Mehrfachauswahl',
      description:
        'Dropdown-Auswahlfeld mit Mehrfachauswahl für flexible Auswahlmöglichkeiten',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Benutzerdefinierte Filtermethode',
      },
      demo3: {
        title: 'Slot-Unterstützung',
      },
      demo4: {
        title: 'Deaktivierte Optionen',
      },
      demo5: {
        title: 'Schreibgeschützt',
      },
      demo6: {
        title: 'Deaktiviert',
      },
      demo7: {
        title: 'Leerzustand-Slot',
      },
      demo8: {
        title: 'Gruppierung',
      },
      demo9: {
        title: 'Optionsinitialisierungsmethode',
        description:
          'Verwenden Sie die ```initMethod```, um Mehrfachauswahldaten zu initialisieren und ein ```Promise```-Objekt zurückzugeben',
      },
      props: {
        options: 'Optionen',
        trigger: 'Auslösemethode',
        width: 'Breite',
        valueLayout: 'Wert-Layout',
        valueTextSplit: 'Wert-Text-Trennzeichen',
        placeholder: 'Platzhaltertext',
        size: 'Größe',
        itemHeight: 'Elementhöhe',
        searchable: 'Durchsuchbar',
        searchPlaceholder: 'Such-Platzhaltertext',
        searchMethod: 'Suchmethode',
        searchDelay: 'Suchverzögerung',
        clearable: 'Löschbar',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        showCheckIcon: 'Häkchen-Icon anzeigen',
        defaultValue: 'Standardwert',
        initMethod: 'Optionsinitialisierungsmethode',
        enableSearchCache: 'Suchcache aktivieren',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      events: {
        change: 'Wertänderung',
        blur: 'Fokusverlust',
        focus: 'Fokus',
      },
      options: {
        label: 'Beschriftung',
        value: 'Wert',
        disabled: 'Deaktiviert',
      },
      slots: {
        item: 'Benutzerdefinierter Optionsinhalt',
        empty: 'Benutzerdefinierter Leerzustand',
      },
    },
    datePicker: {
      name: 'Datumsauswahl',
      description: 'Intuitive Datumsauswahl für präzise Zeitauswahl',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Löschbar',
      },
      demo3: {
        title: 'Benutzerdefiniertes Format',
      },
      demo4: {
        title: 'Voreinstellungen',
      },
      demo5: {
        title: 'Schreibgeschützt',
      },
      demo6: {
        title: 'Deaktiviert',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        valueFormat: 'Wertformat',
        size: 'Größe',
        width: 'Breite',
        placeholder: 'Platzhaltertext',
        clearable: 'Löschbar',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        presets: 'Voreinstellungen',
      },
      events: {
        change: 'Wertänderung',
        focus: 'Fokus',
        blur: 'Fokusverlust',
        clear: 'Löschen',
      },
    },
    dateRangePicker: {
      name: 'Datumsbereichsauswahl',
      description:
        'Werkzeug zur Auswahl von Zeitbereichen für bequeme Bereichsauswahl',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Löschbar',
      },
      demo3: {
        title: 'Weitere',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        startKey: 'Startschlüssel',
        endKey: 'Endschlüssel',
        valueFormat: 'Wertformat',
        size: 'Größe',
        width: 'Breite',
        placeholderStart: 'Start-Platzhaltertext',
        placeholderEnd: 'End-Platzhaltertext',
        clearable: 'Löschbar',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
      },
      events: {
        change: 'Wertänderung',
        focus: 'Fokus',
        blur: 'Fokusverlust',
        clear: 'Löschen',
      },
    },
    cascader: {
      name: 'Kaskadierendes Auswahlfeld',
      description:
        'Auswahlfeld für mehrstufige Daten mit klarer Kategorieauswahl',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Freier Modus',
      },
      demo3: {
        title: 'Nur letzte Ebene anzeigen',
      },
      demo4: {
        title: 'Asynchrones Laden',
      },
      demo5: {
        title: 'Löschbar',
      },
      demo6: {
        title: 'Schreibgeschützt',
      },
      demo7: {
        title: 'Deaktiviert',
      },
      demo8: {
        title: 'Deaktivierte Optionen',
      },
      demo9: {
        title: 'Optionsinitialisierungsmethode',
        description:
          'Verwenden Sie die ```initMethod```, um Kaskadendaten zu initialisieren und ein ```Promise```-Objekt zurückzugeben',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        width: 'Breite',
        options: 'Optionen',
        placeholder: 'Platzhaltertext',
        disabled: 'Deaktiviert',
        clearable: 'Löschbar',
        showAllLevels: 'Alle Ebenen anzeigen',
        multiple: 'Mehrfachauswahl',
        free: 'Freie Auswahl',
        size: 'Größe',
        trigger: 'Auslösemethode',
        loadMethod: 'Lademethode',
        readonly: 'Schreibgeschützt',
        initMethod: 'Optionsinitialisierungsmethode',
      },
      options: {
        label: 'Beschriftung',
        value: 'Wert',
        isLeaf: 'Ist Blattknoten',
        children: 'Unterknoten',
        disabled: 'Deaktiviert',
      },
    },
    treeSelect: {
      name: 'Baumauswahl',
      description:
        'Baumstrukturiertes Auswahlfeld für intuitive hierarchische Auswahl',
      demo1: {
        title: 'Standard',
      },
      demo2: {
        title: 'Asynchrones Laden von Daten',
      },
      demo3: {
        title: 'Benutzerdefinierte Slots',
      },
      demo4: {
        title: 'Deaktivierte Elemente',
      },
      demo5: {
        title: 'Standardmäßig alle ausgeklappt',
      },
      demo6: {
        title: 'Durchsuchbar',
      },
      demo7: {
        title: 'Leerzustand-Slot',
      },
      demo8: {
        title: 'Weitere',
      },
      demo9: {
        title: 'Schreibgeschützt',
      },
      demo10: {
        title: 'Deaktiviert',
      },
      demo11: {
        title: 'Daten initialisieren',
        description:
          'Verwenden Sie die ```initMethod```, um Baumdaten zu initialisieren und ein ```Promise```-Objekt zurückzugeben',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        dataSource: 'Datenquelle',
        defaultValue: 'Standardwert',
        placeholder: 'Platzhaltertext',
        width: 'Breite',
        size: 'Komponentengröße',
        disabled: 'Deaktiviert',
        clearable: 'Löschbar',
        checkable: 'Kontrollkästchen anzeigen',
        showAllLevels: 'Alle Ebenen anzeigen',
        showCheckIcon: 'Häkchen-Icon anzeigen',
        showLine: 'Verbindungslinien anzeigen',
        expandAll: 'Alle Knoten ausklappen',
        searchable: 'Durchsuchbar',
        searchDelay: 'Suchverzögerung (Millisekunden)',
        readonly: 'Schreibgeschützt',
        free: 'Freier Modus (Eltern-Kind-Knoten unabhängig)',
        align: 'Textausrichtung',
        trigger: 'Auslösemethode für Unterknoten',
        keyField: 'Knotenschlüsselfeld',
        labelField: 'Knotenbeschriftungsfeld',
        disabledField: 'Deaktiviertes Knotenfeld',
        initMethod: 'Methode zur Initialisierung von Baumknoten',
        loadMethod: 'Methode zum asynchronen Laden von Unterknoten',
      },
      slots: {
        handle: 'Slot-Name',
      },
    },
    inputTable: {
      name: 'Tabelleneingabe',
      description:
        'Schnelle Dateneingabe in Tabellen für effiziente Stapelverarbeitung',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Standardwert',
      },
      demo3: {
        title: 'Erweitert',
      },
      props: {
        columns: 'Spaltenkonfiguration',
        size: 'Größe',
        width: 'Breite',
        rowKey: 'Zeilenschlüssel',
        batchDeletable: 'Stapellöschung erlauben',
        addable: 'Hinzufügen erlauben',
        defaultForm: 'Standardformular',
        deletable: 'Löschen erlauben',
        maxRows: 'Maximale Zeilenanzahl',
        minRows: 'Minimale Zeilenanzahl',
        clearable: 'Löschen erlauben',
        sortable: 'Sortieren erlauben',
        autoUniqueId: 'Automatische eindeutige ID',
        uniqueField: 'Eindeutiges Feld',
        sortTooltipCustomRender:
          'Benutzerdefinierte Sortier-Tooltip-Darstellung',
      },
    },
    switch: {
      name: 'Schalter',
      description: 'Klarer Umschalter für eindeutige Statuswechsel',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Quadratisch',
      },
      demo3: {
        title: 'Anfrage simulieren',
      },
      demo4: {
        title: 'Schreibgeschützt',
      },
      demo5: {
        title: 'Deaktiviert',
      },
      model: {
        modelValue: 'Parametername',
      },
      props: {
        size: 'Größe',
        round: 'Abgerundet',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        request: 'Anfrage',
        loading: 'Wird geladen',
      },
      events: {
        change: 'Ereignisname',
      },
    },
    slider: {
      name: 'Schieberegler',
      description: 'Intuitive Wertauswahl durch Ziehen',
      demo1: {
        title: 'Größe',
      },
      demo2: {
        title: 'Verschiedene Schrittweiten',
      },
      demo3: {
        title: 'Begrenzter Bereich',
      },
      demo4: {
        title: 'Schreibgeschützt',
      },
      demo5: {
        title: 'Deaktiviert',
      },
      demo6: {
        title: 'Konfigurationsoptionen',
      },
      model: {
        modelValue: 'Parametername',
      },
      props: {
        size: 'Größe',
        min: 'Minimalwert',
        max: 'Maximalwert',
        step: 'Schrittweite',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        options: 'Optionen',
        formatTooltip: 'Tooltip formatieren',
      },
    },
    sliderRange: {
      name: 'Bereichsschieberegler',
      description: 'Flexibler Schieberegler zur Auswahl von Wertebereichen',
      demo1: {
        title: 'Größe',
      },
      demo2: {
        title: 'Verschiedene Schrittweiten',
      },
      demo3: {
        title: 'Begrenzter Bereich',
      },
      demo4: {
        title: 'Schreibgeschützt',
      },
      demo5: {
        title: 'Deaktiviert',
      },
      demo6: {
        title: 'Konfigurationsoptionen',
      },
      model: {
        modelValue: 'Parametername',
      },
      props: {
        size: 'Größe',
        min: 'Minimalwert',
        max: 'Maximalwert',
        step: 'Schrittweite',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
        options: 'Optionen',
        formatTooltip: 'Tooltip formatieren',
      },
    },
    rate: {
      name: 'Bewertung',
      description: 'Lebendige Sternbewertungskomponente',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Schreibgeschützt',
      },
      demo3: {
        title: 'Deaktiviert',
      },
      demo4: {
        title: 'Tipps',
      },
      model: {
        modelValue: 'Parametername',
      },
      props: {
        size: 'Größe',
        count: 'Anzahl',
        tips: 'Tipps',
        readonly: 'Schreibgeschützt',
        disabled: 'Deaktiviert',
      },
    },
    colorPicker: {
      name: 'Farbwähler',
      description: 'Umfassendes Farbauswahltool für präzise Farbauswahl',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Verschiedene Größen',
      },
      demo3: {
        title: 'Benutzerdefinierte Breite',
      },
      demo4: {
        title: 'Deaktivierter Zustand',
      },
      demo5: {
        title: 'Schreibgeschützter Zustand',
      },
      model: {
        modelValue: 'Parametername',
      },
      props: {
        size: 'Größe',
        width: 'Breite',
        placeholder: 'Platzhalter',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
      },
    },
    upload: {
      name: 'Datei-Upload',
      description: 'Einfache Dateiupload-Komponente',
      demo1: {
        title: 'Standard',
      },
      demo2: {
        title: 'Format- und Größenbeschränkung',
      },
      demo3: {
        title: 'Bild-Upload',
      },
      demo4: {
        title: 'Benutzerdefinierte Tipps',
      },
      demo5: {
        title: 'Fotowand',
      },
      demo6: {
        title: 'Kein Upload',
      },
      demo7: {
        title: 'Vorschau',
      },
      model: {
        modelValue: 'Gebundener Wert',
      },
      props: {
        accept: 'Akzeptierte Dateitypen',
        immediate: 'Sofortiger Upload',
        multiple: 'Mehrere Dateien',
        disabled: 'Deaktiviert',
        readonly: 'Schreibgeschützt',
        limit: 'Dateianzahlbegrenzung',
        maxFileSize: 'Maximale Dateigröße',
        size: 'Größe',
        tips: 'Hinweise',
        uploadHelper: 'Upload-Helfer',
        viewMode: 'Ansichtsmodus',
      },
    },
    table: {
      name: 'Tabelle',
      description:
        'Leistungsstarke Tabellenkomponente für übersichtliche Datenanzeige',
      model: {
        modelValue: 'Parametername',
        selectedKeys: 'Ausgewählte Schlüssel',
        sortValue: 'Sortierwert',
      },
      demo1: {
        title: 'Standard',
      },
      demo2: {
        title: 'Fixierte Zeilen und Spalten',
      },
      demo3: {
        title: 'Benutzerdefinierte Aktionen',
      },
      demo4: {
        title: 'Slots',
      },
      demo5: {
        title: 'Benutzerdefinierter Stil',
      },
      demo6: {
        title: 'Auswahl',
      },
      demo7: {
        title: 'Sortierbar',
      },
      demo8: {
        title: 'Benutzerdefiniertes Rendering',
      },
      demo9: {
        title: 'Vollständige Funktionalität',
      },
      demo10: {
        title: 'Keine Daten',
      },
      demo11: {
        title: 'Gruppierte Kopfzeilen',
        tipsTitle: 'Einschränkungshinweis',
        tipsContent:
          'Wenn Sie fixierte Spalten in gruppierten Kopfzeilen verwenden möchten, müssen Sie allen fixierten Spaltenköpfen eine Breite zuweisen, einschließlich aller übergeordneten Knoten, sonst können Positionierungsprobleme auftreten.',
      },
      demo12: {
        title: 'Drag & Drop Sortierung',
      },
      props: {
        columns: 'Spalten',
        dataSource: 'Datenquelle',
        bordered: 'Umrandet',
        size: 'Größe',
        checkable: 'Auswählbar',
        maxHeight: 'Maximale Höhe',
        multiple: 'Mehrfachauswahl',
        rowKey: 'Zeilenschlüssel',
        sortTooltipCustomRender:
          'Benutzerdefinierte Sortier-Tooltip-Darstellung',
        sortable: 'Sortierbar',
      },
      tableColumns: {
        field: 'Feld',
        fixed: 'Fixiert',
        title: 'Titel',
        type: 'Typ',
        width: 'Breite',
        x: 'X-Achse',
        customRender: 'Benutzerdefiniertes Rendering',
      },
    },
    pagination: {
      name: 'Seitennummerierung',
      description:
        'Klare Seitennavigation für einfaches Durchblättern von Daten',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Große Datenmengen',
      },
      demo3: {
        title: 'Asynchrone Simulation',
      },
      model: {
        total: 'Parametername',
        currentPage: 'Aktuelle Seite',
        pageSize: 'Seitengröße',
      },
      props: {
        size: 'Größe',
        pageSizeOptions: 'Seitengrößenoptionen',
        visiblePagesCount: 'Anzahl sichtbarer Seiten',
      },
      events: {
        change: 'Ereignisname',
      },
    },
    magicNumber: {
      name: 'Magische Zahl',
      description: 'Animierte Komponente für lebendige Zahlenanzeige',
    },
    tree: {
      name: 'Baumstruktur',
      description:
        'Werkzeug zur Anzeige hierarchischer Datenstrukturen mit klaren Ebenen',
      demo1: {
        title: 'Standard',
      },
      demo2: {
        title: 'Kontrollkästchen anzeigen',
      },
      demo3: {
        title: 'Mehrfachauswahl',
      },
      demo4: {
        title: 'Eltern-Kind-Verknüpfungsmodus',
      },
      demo5: {
        title: 'Asynchrone Anfrage',
      },
      demo6: {
        title: 'Standardmäßig alle ausgeklappt',
      },
      demo7: {
        title: 'Hilfslinien anzeigen',
      },
      demo8: {
        title: 'Slots',
      },
      model: {
        modelValue: 'Parametername',
        expandedKeys: 'Ausgeklappte Knotenschlüssel',
      },
      props: {
        dataSource: 'Datenquelle',
        multiple: 'Mehrfachauswahl',
        height: 'Höhe',
        searchable: 'Ist durchsuchbar',
        checkable: 'Kontrollkästchen anzeigen',
        expandAll: 'Standardmäßig alle ausgeklappt',
        free: 'Freie Auswahl',
        showLine: 'Verbindungslinien anzeigen',
        trigger: 'Auslösemethode',
        placeholder: 'Platzhaltertext',
        keyField: 'Knotenschlüsselfeld',
        labelField: 'Knotenbeschriftungsfeld',
        disabledField: 'Deaktiviertes Knotenfeld',
        initMethod: 'Methode zur Initialisierung von Baumknoten',
        loadMethod: 'Methode zum asynchronen Laden von Unterknoten',
        isSelect: 'Ist ausgewählt',
      },
      slots: {
        handle: 'Slot-Name',
      },
      treeDataSource: {
        label: 'Beschriftung',
        key: 'Schlüssel',
        isLeaf: 'Ist Blattknoten',
        children: 'Unterknoten',
        disabled: 'Deaktiviert',
      },
    },
    collapse: {
      'name': 'Akkordeon',
      'description':
        'Zusammenklappbare und erweiterbare Inhaltsbereiche, um Informationen übersichtlicher darzustellen',
      'demo1': {
        title: 'Grundlegende Verwendung',
      },
      'demo2': {
        title: 'Titel-Slot',
      },
      'demo3': {
        title: 'Akkordeon-Modus',
      },
      'model': {
        modelValue: 'Parametername',
      },
      'model(CollapseItem)': {
        modelValue: 'Parametername',
      },
      'props': {
        width: 'Breite',
      },
      'props(CollapseItem)': {
        collapseKey: 'Zusammenklapp-Schlüssel',
        title: 'Titel',
        radius: 'Radius',
      },
    },
    desc: {
      name: 'Beschreibungsliste',
      description:
        'Ordentliche Darstellung mehrerer Felder für eine strukturiertere Informationsanzeige',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Richtung',
      },
      demo3: {
        title: 'Umfangreich',
      },
      demo4: {
        title: 'Unterstützt Online-Konfiguration',
      },
      props: {
        options: 'Optionen',
        dataSource: 'Datenquelle',
        size: 'Größe',
        labelX: 'Beschriftung X',
        valueX: 'Wert X',
        gap: 'Abstand',
        width: 'Breite',
        columns: 'Spalten',
        labelWidth: 'Beschriftungsbreite',
        direction: 'Richtung',
        bordered: 'Mit Rahmen',
      },
      descItemProps: {
        label: 'Beschriftung',
        field: 'Feld',
        size: 'Größe',
        bordered: 'Mit Rahmen',
        width: 'Breite',
        labelWidth: 'Beschriftungsbreite',
        direction: 'Richtung',
        tips: 'Hinweise',
        type: 'Typ',
        labelX: 'Beschriftung X',
        valueX: 'Wert X',
        gridArea: 'Rasterbereich',
        customRender: 'Benutzerdefinierte Darstellung',
      },
    },
    alert: {
      name: 'Warnhinweis',
      description: 'Auffällige Informationsboxen für sanftere Warnungen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Unterstützt Slots',
      },
      demo3: {
        title: 'Weitere Szenarien',
      },
      props: {
        type: 'Typ',
        title: 'Titel',
        content: 'Hinweisinhalt',
        closeable: 'Schließbar',
        footer: 'Fußzeileninhalt',
      },
    },
    message: {
      name: 'Globale Benachrichtigung',
      description: 'Leichtgewichtiges Feedback für prägnantere Hinweise',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Steuerbar',
      },
      demo3: {
        title: 'Anfrage simulieren',
      },
      events: {
        close: 'Wird beim Schließen ausgelöst',
      },
      props: {
        type: 'Typ',
        content: 'Hinweisinhalt',
        duration: 'Anzeigedauer',
      },
    },
    notification: {
      name: 'Benachrichtigung',
      description:
        'Elegante Benachrichtigungen für ein freundlicheres Feedback.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Verzögerungszeit',
      },
      demo3: {
        title: 'Benutzerdefinierte Breite',
      },
      demo4: {
        title: 'Fortschrittsbalken anzeigen',
      },
      demo5: {
        title: 'Manuelles Schließen',
      },
      props: {
        title: 'Titel',
        content: 'Benachrichtigungsinhalt',
        delay: 'Verzögerungszeit',
        width: 'Breite',
        showProgress: 'Fortschrittsbalken anzeigen',
      },
    },
    drawer: {
      name: 'Schublade (Drawer)',
      description:
        'Ein seitlich ausfahrbares Panel für reibungslose temporäre Operationen.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Asynchrones Schließen',
      },
      demo3: {
        title: 'Benutzerdefinierter Kopf- und Fußbereich',
      },
      demo4: {
        title: 'Schließen mit ESC erlauben',
      },
      demo5: {
        title: 'Beim Klick auf die Maske schließen',
      },
      demo6: {
        title: 'Verschachtelung',
      },
      model: {
        visible: 'Sichtbar',
      },
      props: {
        title: 'Titel',
        width: 'Breite',
        position: 'Position',
        height: 'Höhe',
        closeOnClickOverlay: 'Beim Klick auf die Maske schließen',
        closeByEsc: 'Mit ESC-Taste schließen',
        hideFooter: 'Fußbereich ausblenden',
        okButtonProps: 'Eigenschaften des OK-Buttons',
        closeButtonProps: 'Eigenschaften des Schließen-Buttons',
        zIndex: 'Z-Index',
      },
    },
    dialog: {
      name: 'Dialog',
      description:
        'Ein modales Dialogfeld, um wichtige Interaktionen hervorzuheben.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Asynchrones Schließen',
      },
      demo3: {
        title: 'Beim Klick auf die Maske schließen',
      },
      demo4: {
        title: 'Mit ESC schließen',
      },
      props: {
        type: 'Typ',
        width: 'Breite',
        trigger: 'Auslöser',
        title: 'Titel',
        okText: 'OK-Button-Text',
        cancelText: 'Abbrechen-Button-Text',
        ok: 'Bestätigungs-Callback',
        cancel: 'Abbruch-Callback',
        closeOnClickOverlay: 'Beim Klick auf die Maske schließen',
        closeByEsc: 'Mit ESC-Taste schließen',
        transformOrigin: 'Transformationsursprung',
      },
      events: {
        ok: 'Wird ausgelöst, wenn der OK-Button geklickt wird',
        cancel: 'Wird ausgelöst, wenn der Abbrechen-Button geklickt wird',
      },
    },
    modal: {
      name: 'Modalfenster',
      description:
        'Flexibleres modales Fenster für reichhaltigere Popup-Interaktionen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Asynchrones Schließen',
      },
      demo3: {
        title: 'Benutzerdefinierter Kopf- und Fußbereich',
      },
      demo4: {
        title: 'ESC zum Schließen erlauben',
      },
      model: {
        visible: 'Sichtbarkeit',
      },
      props: {
        title: 'Titel',
        width: 'Breite',
        top: 'Abstand zum oberen Rand',
        hideFooter: 'Fußbereich ausblenden',
        closeByEsc: 'Durch ESC-Taste schließen',
        okButtonProps: 'Eigenschaften der Bestätigungsschaltfläche',
        closeButtonProps: 'Eigenschaften der Schließen-Schaltfläche',
        closeOnClickOverlay: 'Durch Klick auf Overlay schließen',
        zIndex: 'Z-Index',
        maxHeight: 'Maximale Höhe',
      },
    },
    popok: {
      name: 'Popup-Bestätigung',
      description:
        'Leichtgewichtige Bestätigungshinweise für bequemere Operationsbestätigungen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Auslösemethode',
      },
      props: {
        type: 'Typ',
        width: 'Breite',
        trigger: 'Auslösemethode',
        title: 'Titel',
        content: 'Inhalt',
        placement: 'Position',
        okText: 'Bestätigungstext',
        cancelText: 'Abbruchtext',
        ok: 'Bestätigungscallback',
        cancel: 'Abbruchcallback',
      },
    },
    popover: {
      name: 'Popover',
      description:
        'Eine Pop-up-Karte, die zusätzliche Informationen oder Aktionen bereitstellt.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Auslöser',
      },
      demo3: {
        title: 'Benutzerdefinierter Auslöser',
      },
      demo4: {
        title: 'Automatisches Schließen bei Klick außerhalb',
      },
      demo5: {
        title: 'Ladezustand',
      },
      props: {
        trigger: 'Auslöser',
        placement: 'Position',
        disabled: 'Deaktiviert',
        loading: 'Laden',
        hideOnClick: 'Bei Klick ausblenden',
        offset: 'Versatz',
        popoverBodyClassName: 'Klassenname des Popover-Körpers',
        triggerTarget: 'Auslöserziel',
      },
      slots: {
        'trigger': 'Auslöser-Slot',
        'popover-body': 'Popover-Körper-Slot',
      },
    },
    tooltip: {
      name: 'Tooltip',
      description: 'Eine einfache Textblase für leichtere Hinweise.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Per Klick auslösen',
      },
      demo3: {
        title: 'Verzögerungszeit',
      },
      demo4: {
        title: 'HTML-Unterstützung',
      },
      props: {
        tips: 'Tooltip-Inhalt',
        placement: 'Position',
        trigger: 'Auslöser',
        allowHTML: 'HTML erlauben',
        delay: 'Verzögerungszeit',
      },
    },
    loading: {
      name: 'Laden (Loading)',
      description:
        'Ein eleganter Ladeeffekt, um das Warten angenehmer zu gestalten.',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Benutzerdefinierte Icon-Größe',
      },
      demo3: {
        title: 'Benutzerdefinierte Tipp-Information',
      },
      props: {
        tip: 'Tipp-Information',
        iconSize: 'Icon-Größe',
        visible: 'Sichtbar',
      },
    },
    result: {
      name: 'Ergebnis (Result)',
      description:
        'Zur Rückmeldung von Operationsergebnissen für vollständigere Ergebnisdarstellung',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      props: {
        type: 'Typ',
        title: 'Titel',
        content: 'Inhalt',
      },
      slots: {
        handle: 'Slot-Behandlung',
      },
    },
    empty: {
      name: 'Leerzustand',
      description:
        'Anzeige für leere Datenzustände für freundlichere leere Seiten',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      props: {
        type: 'Typ',
        title: 'Titel',
        fontSize: 'Schriftgröße',
        padding: 'Innenabstand',
        width: 'Breite',
        height: 'Höhe',
      },
    },
    actionBox: {
      name: 'Aktionsbox',
      description:
        'Flexible Aktionsschaltflächen für schnelle Benutzeroperationen',
      demo1: {
        title: 'Grundlegende Verwendung',
      },
      demo2: {
        title: 'Dropdown-Menü',
      },
      demo3: {
        title: 'Benutzerdefinierte Symbole',
      },
      demo4: {
        title: 'Benutzerdefinierte Stile',
      },
      props: {
        options: 'Aktionsschaltflächen-Konfiguration',
        dropdownThreshold: 'Dropdown-Menü-Schwellenwert',
        dropdownLabel: 'Dropdown-Menü-Text',
        dropdownIcon: 'Dropdown-Menü-Symbol',
        divider: 'Trennlinie anzeigen',
        iconOnly: 'Nur Symbol anzeigen',
        x: 'Horizontale Ausrichtung',
      },
      options: {
        label: 'Aktionsschaltflächen-Text',
        icon: 'Aktionsschaltflächen-Symbol',
        onClick: 'Aktionsschaltflächen-Klickereignis',
        customRender: 'Benutzerdefinierter Renderinhalt',
      },
    },
  },
}
