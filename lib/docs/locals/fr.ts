const contextMenu = {
  label: 'Texte affiché',
  value: 'Valeur',
  icon: "Fonction de rendu d'icône",
  children: 'Collection de nœuds enfants',
  disabled: 'Option désactivée',
  isDividerLine: 'Est une ligne de séparation',
  checkable: 'Est une case à cocher',
  checked: 'Est coché',
  onClick: 'Événement de clic'
}

export default {
  name: 'fr',
  home: {
    title: 'Lew UI',
    description:
      'Une bibliothèque de composants Vue3 belle et facile à utiliser',
    getStarted: 'Commencer',
    sloganTitle: 'La simplicité est la sophistication suprême',
    slogan: 'Une bibliothèque de composants Vue3 belle et facile à utiliser',
    home: 'Accueil',
    install: 'Installation',
    components: 'Composants',
    formEngine: 'Moteur de formulaires',
    descEngine: 'Moteur de description'
  },
  base: {
    base: 'Base',
    navigator: 'Navigation',
    form: 'Formulaire',
    data: 'Composants de données',
    feedback: 'Retour',
    close: 'Fermer',
    showCode: 'Afficher le code'
  },
  components: {
    image: {
      name: 'Image',
      description:
        "Affichage élégant d'images avec support du chargement différé, des états de chargement et de la gestion des erreurs",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'État de chargement',
        tipsTitle: 'Conseils',
        tipsContent:
          'Vous devez définir la largeur et la hauteur pour avoir un effet de chargement avec placeholder.'
      },
      demo3: {
        title: 'Échec de chargement'
      },
      props: {
        src: "URL de l'image",
        alt: "Description de l'image",
        width: 'Largeur',
        height: 'Hauteur',
        objectFit: 'Mode de remplissage',
        objectPosition: "Position de l'image",
        lazy: 'Activer le chargement différé',
        loading: "Afficher l'état de chargement",
        title: "Titre de l'image"
      }
    },
    avatar: {
      name: 'Avatar',
      description:
        "Un composant d'avatar élégant supportant les formats image, icône et texte",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'État'
      },
      demo3: {
        title: 'Avatar par défaut'
      },
      demo4: {
        title: 'Forme'
      },
      props: {
        size: 'Taille',
        loading: "Afficher l'état de chargement",
        shape: 'Forme',
        src: "URL de l'image",
        alt: "Description de l'image",
        status: 'État',
        objectFit: 'Mode de remplissage',
        objectPosition: "Position de l'image",
        statusPlacement: "Position de l'état"
      }
    },
    button: {
      name: 'Bouton',
      description: 'Rendez vos interactions plus fluides avec un simple clic',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Couleur'
      },
      demo3: {
        title: 'Icône'
      },
      demo4: {
        title: 'État de chargement'
      },
      demo5: {
        title: 'État désactivé'
      },
      demo6: {
        title: 'Support des Promesses'
      },
      props: {
        text: 'Texte du bouton',
        type: 'Type',
        size: 'Taille',
        singleIcon: "Afficher uniquement l'icône",
        color: 'Couleur',
        round: 'Arrondi',
        dashed: 'En pointillés',
        loading: "Afficher l'état de chargement",
        disabled: 'État désactivé',
        request: 'Requête'
      }
    },
    tag: {
      name: 'Étiquette',
      description:
        'Un outil de marquage petit mais puissant qui ajoute de la couleur à la classification du contenu',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Type'
      },
      demo3: {
        title: 'Taille'
      },
      demo4: {
        title: 'Couleur'
      },
      demo5: {
        title: 'Désactivé'
      },
      demo6: {
        title: 'Fermable'
      },
      demo7: {
        title: 'Slot'
      },
      props: {
        text: "Texte de l'étiquette, prioritaire sur le slot, l'effet text-trim sera déclenché en cas de dépassement de la largeur",
        type: 'Type de style',
        size: 'Taille',
        color: 'Thème de couleur',
        closable: 'Peut être fermé',
        disabled: 'Désactivé',
        round: 'Coins arrondis',
        oversize: 'Taille plus relâchée'
      }
    },
    badge: {
      name: 'Badge',
      description:
        "Un petit point rouge qui s'épanouit dans le coin supérieur droit, rendant les notifications plus visibles",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Point'
      },
      demo3: {
        title: 'Utilisation directe'
      },
      demo4: {
        title: 'Texte'
      },
      demo5: {
        title: 'En cours'
      },
      props: {
        text: 'Texte du badge',
        offset: 'Décalage du badge',
        processing: 'En cours de traitement',
        max: 'Valeur maximale, affichera max+ si dépassée',
        color: 'Couleur du badge',
        disabled: 'Désactivé',
        value: 'Valeur du badge (affichera un point si vide)'
      }
    },
    title: {
      name: 'Titre',
      description:
        "Plus qu'un simple titre, une essence qui donne vie au contenu",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Gras'
      },
      demo3: {
        title: 'Couleur'
      },
      props: {
        text: 'Contenu du texte',
        size: 'Taille du texte du titre, peut être un nombre (unité : pixels) ou une chaîne (ex : "1.5em")',
        bold: 'Épaisseur du texte du titre, les valeurs possibles sont des nombres entiers entre 100 et 900',
        color:
          'Couleur du texte du titre, les valeurs possibles incluent des noms de couleurs prédéfinis ou des valeurs de couleur personnalisées'
      }
    },
    textTrim: {
      name: 'Découpe de Texte',
      description:
        "Gérer élégamment les textes longs sans compromettre l'esthétique de la mise en page",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Points de suspension multiligne'
      },
      demo3: {
        title: 'Texte final'
      },
      demo4: {
        title: 'Alignement'
      },
      props: {
        text: 'Contenu du texte',
        lineClamp: "Nombre maximum de lignes à afficher, l'excès sera tronqué",
        allowHTML: 'Autoriser le rendu des balises HTML',
        placement: "Position d'affichage de l'infobulle",
        offset:
          "Décalage de l'infobulle par rapport à l'élément cible [x, y] (unité : pixels)",
        textAlign:
          "Direction d'alignement horizontal (lorsque la largeur est inférieure à la largeur du conteneur)",
        delay:
          "Délai d'affichage et de masquage de l'infobulle [délai d'affichage, délai de masquage] (unité : millisecondes)",
        reserveEnd:
          'Nombre de caractères à conserver à la fin, affichera des points de suspension au milieu lorsque le texte déborde, en conservant le début et le nombre spécifié de caractères finaux'
      }
    },
    flex: {
      name: 'Flex',
      description:
        'Solution de mise en page flexible, pour une disposition des éléments intuitive',
      demo1: {
        title: 'Rangée'
      },
      demo2: {
        title: 'Colonne'
      },
      demo3: {
        title: 'Mode'
      },
      props: {
        direction: "Direction d'arrangement des éléments enfants",
        x: 'Alignement horizontal des éléments enfants',
        y: 'Alignement vertical des éléments enfants',
        mode: "Mode de distribution des éléments enfants, remplace les paramètres d'alignement x ou y, l'effet dépend de la valeur de direction",
        wrap: "Autoriser le retour à la ligne des éléments enfants lorsque l'espace est insuffisant",
        gap: 'Espacement entre les éléments enfants (unité : pixels)',
        width: 'Largeur du conteneur Flex (unité : pixels ou pourcentage)'
      }
    },
    mark: {
      name: 'Marqueur',
      description:
        'Ajoute une mise en évidence au texte, rendant le contenu important immédiatement visible',
      demo1: {
        title: 'Utilisation de base'
      },
      props: {
        color: 'Thème de couleur',
        round: 'Coins arrondis',
        bold: 'Texte en gras',
        cursor: 'Style du curseur au survol'
      }
    },
    icon: {
      name: 'Icône',
      description:
        "Collection d'icônes élégantes, enrichissant le langage visuel de l'interface"
    },
    backTop: {
      name: 'Retour en haut',
      description:
        'Retour en haut de page en un clic, facilitant la navigation sur les longues pages',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Contenu personnalisé'
      },
      demo3: {
        title: 'Déclenchement par directive'
      },
      props: {
        target:
          "Spécifie l'élément cible qui déclenche l'événement de défilement, utilisant un sélecteur CSS. Si vide, la fenêtre entière est utilisée par défaut.",
        right:
          'Distance entre le composant et le bord droit de la page, en pixels.',
        bottom: 'Distance entre le composant et le bas de la page, en pixels.',
        valveHeight:
          "Hauteur de seuil de défilement de la page, le bouton de retour en haut s'affiche lorsque le défilement dépasse cette valeur, en pixels."
      },
      events: {
        click: "Callback de l'événement de retour en haut"
      }
    },
    steps: {
      name: 'Étapes',
      description:
        "Affiche clairement le processus d'opération, permettant à l'utilisateur de savoir où il se trouve",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'État'
      },
      demo3: {
        title: 'Chargement'
      },
      model: {
        modelValue: "Index de l'étape actuellement active"
      },
      props: {
        options: 'Tableau de configuration des étapes',
        status: 'État actuel des étapes',
        minWidth: "Largeur minimale de l'étape"
      },
      options: {
        title: "Titre de l'étape",
        description: "Description de l'étape"
      }
    },
    menu: {
      name: 'Menu',
      description:
        'Menu vertical élégant, rendant la navigation claire et structurée',
      demo1: {
        title: 'Utilisation de base'
      },
      model: {
        modelValue: 'Valeur liée au menu actif actuel'
      },
      props: {
        options: 'Tableau de configuration des options de menu'
      },
      menuOptions: {
        label: "Texte de l'élément de menu",
        value: "Valeur de l'élément de menu",
        children: 'Tableau des éléments de sous-menu',
        disabled: "Désactiver l'élément de menu",
        icon: "Icône de l'élément de menu",
        tagText: "Texte du badge de l'élément de menu",
        tagColor: "Couleur du badge de l'élément de menu"
      }
    },
    menuTree: {
      name: 'Arborescence de menu',
      description:
        'Menu arborescent hiérarchique, affichant facilement des relations structurelles complexes',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Icônes personnalisées'
      },
      demo3: {
        title: 'Expansion par défaut',
        description:
          'Contrôlez les éléments de menu développés par défaut via v-model.'
      },
      demo4: {
        title: 'Badges'
      },
      demo5: {
        title: 'Style personnalisé'
      },
      model: {
        modelValue: 'Valeur liée au menu actif actuel',
        expandKeys:
          'Tableau des clés des éléments de menu développés par défaut',
        collapsed: 'Si le menu est réduit'
      },
      props: {
        options:
          "Source de données de l'arborescence de menu, prend en charge les structures imbriquées.",
        width:
          "Largeur de l'arborescence de menu, prend en charge les valeurs de largeur CSS."
      },
      menuTreeItem: {
        label:
          'Texte du titre de l\'élément d\'arborescence de menu. Vous pouvez également utiliser le slot nommé "label" pour personnaliser le contenu du titre.',
        value:
          "Valeur de l'élément de menu, utilisée pour identifier l'unicité de l'élément de menu.",
        level: "Niveau de l'élément d'arborescence de menu, commençant à 1.",
        icon: "Fonction de rendu d'icône",
        tagText: "Texte du badge de l'élément de menu",
        tagType: "Type du badge de l'élément de menu",
        tagColor: "Couleur du badge de l'élément de menu",
        disabled: "Désactiver l'élément de menu",
        isLeaf: "Si c'est un nœud feuille"
      }
    },
    dropdown: {
      name: 'Menu déroulant',
      description:
        'Menu flottant déclenché par un clic, rendant les opérations plus pratiques',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Pas seulement des boutons'
      },
      demo3: {
        title: 'Éléments désactivés'
      },

      props: {
        options: 'Configuration des options de menu',
        trigger: 'Mode de déclenchement',
        placement: "Position d'apparition du menu",
        checkable: 'Permet la sélection'
      },
      'options(ContextMenus)': contextMenu,
      events: {
        show: "Callback d'affichage du menu",
        hide: 'Callback de masquage du menu',
        change: "Callback de sélection d'élément de menu"
      }
    },
    breadcrumb: {
      name: "Fil d'Ariane",
      description:
        'Navigation claire des chemins, empêchant les utilisateurs de se perdre',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Sélection personnalisée'
      },
      demo3: {
        title: "Types d'icônes séparateurs"
      },
      props: {
        options: "Tableau de configuration du fil d'Ariane",
        separator: "Type d'icône séparateur"
      },
      breadcrumbOptions: {
        label: "Texte de l'élément du fil d'Ariane",
        value: "Valeur de l'élément du fil d'Ariane",
        active: "Si c'est l'élément actuellement sélectionné"
      },
      events: {
        change: "Déclenché lorsque l'élément du fil d'Ariane change"
      }
    },
    contextMenu: {
      name: 'Menu contextuel',
      description:
        'Menu contextuel élégant, rendant les opérations plus naturelles',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Supporte plusieurs niveaux'
      },
      demo3: {
        title: 'Supporte les mises à jour dynamiques'
      },
      demo4: {
        title: 'Cases à cocher'
      },
      props: {
        options: 'Configuration du menu contextuel',
        disabled: 'Désactiver le menu contextuel'
      },
      'options(ContextMenus)': contextMenu
    },
    form: {
      name: 'Formulaire',
      description:
        'Capacité puissante de traitement des formulaires, facilitant la collecte de données',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Direction'
      },
      demo3: {
        title: 'Validation personnalisée'
      },
      demo4: {
        title: 'Supporte la disposition en grille'
      },
      demo5: {
        title: 'Avec configuration du moteur de formulaire'
      },
      props: {
        options:
          "Tableau d'options définissant la structure et le contenu du formulaire",
        size: 'Taille globale du formulaire, affecte tous les éléments du formulaire',
        width:
          'Largeur globale du formulaire, supporte les nombres (pixels) ou les pourcentages',
        columns: "Nombre d'éléments de formulaire par ligne, maximum 4",
        labelWidth:
          'Largeur des étiquettes des éléments de formulaire, supporte les nombres (pixels) ou "auto"',
        disabled: "Désactiver l'ensemble du formulaire",
        readonly: "Mettre l'ensemble du formulaire en lecture seule",
        direction:
          'Direction d\'arrangement des éléments de formulaire, "x" pour horizontal, "y" pour vertical',
        formMethods:
          'Collection de méthodes de formulaire, contenant des fonctions pour contrôler le formulaire'
      },
      formItemProps: {
        label: "Texte de l'étiquette de l'élément de formulaire",
        field:
          "Nom du champ de l'élément de formulaire pour la liaison de données et la validation",
        required: "Si c'est un champ obligatoire",
        as: 'Type de l\'élément de formulaire, comme "input", "select", etc.',
        size: "Taille de l'élément de formulaire individuel, peut remplacer le paramètre global",
        width:
          "Largeur de l'élément de formulaire individuel, supporte les nombres (pixels) ou les pourcentages",
        labelWidth:
          'Largeur de l\'étiquette de l\'élément de formulaire individuel, supporte les nombres (pixels) ou "auto"',
        direction:
          'Direction de l\'élément de formulaire individuel, "x" pour horizontal, "y" pour vertical',
        disabled: 'Désactiver cet élément de formulaire',
        readonly: 'Mettre cet élément de formulaire en lecture seule',
        tips: "Texte d'aide pour l'élément de formulaire",
        errMessage:
          "Message d'erreur personnalisé en cas d'échec de validation",
        rule: "Règle de validation pour l'élément de formulaire",
        props:
          "Propriétés supplémentaires à passer au composant de l'élément de formulaire",
        between:
          'Ajouter un espacement entre les éléments de formulaire en disposition horizontale',
        gridArea: 'Position dans la disposition en grille',
        outputFormat: 'Méthode de formatage pour la sortie des paramètres',
        inputFormat: "Méthode de formatage pour l'entrée des paramètres"
      },
      events: {
        mounted: "Déclenché lors du montage de l'élément de formulaire"
      },
      methods: {
        getForm: 'Obtenir le formulaire',
        setForm: 'Définir le formulaire'
      }
    },
    input: {
      name: 'Champ de saisie',
      description:
        'Champ de saisie riche en fonctionnalités, facilitant la saisie de données',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Préfixes et suffixes'
      },
      demo3: {
        title: 'Limite de caractères'
      },
      demo4: {
        title: 'Alignement'
      },
      demo5: {
        title: 'Visibilité du mot de passe'
      },
      demo6: {
        title: 'Largeur adaptative'
      },
      demo7: {
        title: 'Sélection du texte entier au focus'
      },
      demo8: {
        title: 'Effaçable'
      },
      demo9: {
        title: 'Lecture seule'
      },
      demo10: {
        title: 'Désactivé'
      },
      demo11: {
        title: 'Événement déclenché par la touche Entrée'
      },
      props: {
        type: 'Type de champ de saisie',
        size: 'Taille du champ de saisie',
        width: 'Largeur du champ de saisie',
        placeholder: "Texte d'espace réservé",
        disabled: 'Désactiver le champ de saisie',
        readonly: 'Mettre le champ de saisie en lecture seule',
        clearable: "Activer le bouton d'effacement",
        showPassword: 'Activer la visibilité du mot de passe',
        maxLength: 'Longueur maximale de saisie',
        showCount:
          'Afficher le compteur de caractères (uniquement valide lorsque type est text)',
        align: 'Alignement du texte du champ de saisie',
        minWidth:
          'Largeur minimale du champ de saisie, supporte les nombres (unité : pixels) ou les chaînes avec unités',
        autoWidth: 'Ajuster automatiquement la largeur en fonction du contenu',
        selectByFocus: 'Activer la sélection de tout le texte au focus',
        copyable:
          'Autoriser la copie du contenu (uniquement valide lorsque readonly est true et suffix est false)',
        prefixes: 'Type de préfixe du champ de saisie',
        prefixesOptions:
          'Liste des options de préfixe, utilisée lorsque prefixes est select',
        prefixesTooltip:
          "Texte d'info-bulle pour le préfixe du champ de saisie",
        suffix: 'Type de suffixe du champ de saisie',
        suffixOptions:
          'Liste des options de suffixe, utilisée lorsque suffix est select',
        suffixTooltip: "Texte d'info-bulle pour le suffixe du champ de saisie",
        okByEnter: 'Autoriser la confirmation par la touche Entrée'
      },
      events: {
        change: 'Déclenché lorsque la valeur du champ de saisie change',
        focus: 'Déclenché lorsque le champ de saisie obtient le focus',
        blur: 'Déclenché lorsque le champ de saisie perd le focus',
        input: 'Déclenché lors de la saisie dans le champ',
        clear: "Déclenché lors de l'effacement du champ de saisie",
        ok: 'Déclenché lors de la confirmation du champ de saisie'
      },
      model: {
        modelValue: 'Valeur liée',
        prefixValue: 'Valeur du préfixe',
        suffixValue: 'Valeur du suffixe'
      }
    },
    inputNumber: {
      name: 'Champ numérique',
      description:
        'Champ spécialement conçu pour la saisie de nombres, permettant un traitement numérique précis',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Sélection complète au focus'
      },
      demo3: {
        title: 'Limites de plage'
      },
      demo4: {
        title: 'Valeurs précises'
      },
      demo5: {
        title: 'Désactivé et lecture seule'
      },
      props: {
        min: 'Valeur minimale',
        max: 'Valeur maximale',
        step: "Pas d'incrémentation",
        disabled: 'Précision',
        size: 'Taille, valeurs possibles : small, medium, large',
        placeholder: "Texte d'espace réservé",
        readonly: 'Lecture seule',
        width:
          'Largeur, supporte les nombres (unité : pixels) ou les chaînes avec unités',
        align: 'Alignement',
        selectByFocus: 'Sélection de tout le texte au focus'
      },
      model: {
        modelValue: 'Valeur liée'
      }
    },
    textarea: {
      name: 'Zone de texte',
      description:
        'Champ de saisie multiligne, rendant la saisie de texte long plus confortable',

      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Limite de caractères'
      },
      demo3: {
        title: 'Sélection de tout le texte au focus'
      },
      demo4: {
        title: 'Effaçable'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      demo7: {
        title: 'Événement déclenché par la touche Entrée'
      },
      demo8: {
        title: 'Redimensionnable'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        placeholder: "Texte d'espace réservé",
        disabled: 'Désactiver la zone de texte',
        readonly: 'Mettre en lecture seule',
        clearable: "Afficher le bouton d'effacement",
        showCount: 'Afficher le compteur de caractères',
        maxLength: 'Nombre maximum de caractères',
        size: 'Taille de la zone de texte',
        resize: 'Direction de redimensionnement',
        width: 'Largeur',
        height: 'Hauteur',
        minWidth: 'Largeur minimale',
        minHeight: 'Hauteur minimale',
        maxWidth: 'Largeur maximale',
        maxHeight: 'Hauteur maximale',
        selectByFocus: 'Sélection de tout le texte au focus',
        okByEnter:
          'Activer la confirmation par la touche Entrée (lorsque activé, Shift+Entrée permet le saut de ligne)'
      },
      events: {
        change: 'Déclenché lorsque la valeur change',
        focus: "Déclenché lors de l'obtention du focus",
        blur: 'Déclenché lors de la perte du focus',
        input: 'Déclenché lors de la saisie',
        clear: "Déclenché lors de l'effacement",
        ok: 'Déclenché lors de la confirmation'
      }
    },
    inputTag: {
      name: 'Champ de tags',
      description:
        "Saisie et gestion faciles de plusieurs tags, rendant l'organisation des données plus claire",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Taille'
      },
      demo3: {
        title: 'Autoriser les doublons'
      },
      demo4: {
        title: 'Valeur par défaut contrôlée'
      },
      demo5: {
        title: 'Effaçable'
      },
      demo6: {
        title: 'Lecture seule'
      },
      demo7: {
        title: 'Désactivé'
      },
      demo8: {
        title: 'Longueur maximale'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        disabled: 'Désactivé',
        clearable: 'Effaçable',
        placeholder: "Texte d'espace réservé",
        readonly: 'Lecture seule',
        allowDuplicates: 'Autoriser les doublons',
        maxLength: 'Nombre maximum de tags autorisés',
        width: 'Largeur'
      },
      events: {
        change: 'Déclenché lorsque la valeur change',
        clear: "Déclenché lors de l'effacement",
        add: "Déclenché lors de l'ajout d'un tag",
        remove: "Déclenché lors de la suppression d'un tag"
      }
    },
    checkbox: {
      name: 'Case à cocher',
      description:
        'Sélecteur supportant la sélection multiple, rendant les choix multiples plus intuitifs',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Distribution verticale'
      },
      demo3: {
        title: 'Style bloc'
      },
      demo4: {
        title: 'Style arrondi'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      demo7: {
        title: 'Mode unique'
      },
      'model(CheckboxGroup)': {
        modelValue: 'Valeur liée'
      },
      'model(Checkbox)': {
        modelValue: 'Valeur liée'
      },
      'props(CheckboxGroup)': {
        options: 'Options',
        disabled: 'Désactivé',
        readonly: 'Lecture seule',
        size: 'Taille',
        direction: "Direction d'arrangement",
        block: 'Affichage en bloc',
        round: 'Style arrondi',
        iconable: "Autoriser l'utilisation d'icônes"
      },
      'props(Checkbox)': {
        label: 'Titre',
        value: 'Valeur',
        disabled: 'Désactivé',
        readonly: 'Lecture seule',
        checked: 'État coché',
        size: 'Taille',
        block: 'Affichage en bloc',
        round: 'Style arrondi',
        iconable: "Autoriser l'utilisation d'icônes",
        certain: 'État certain'
      },
      'events(Checkbox)': {
        change: 'Déclenché lorsque la valeur change'
      },
      'events(CheckboxGroup)': {
        change: 'Déclenché lorsque la valeur change'
      },
      options: {
        label: 'Titre',
        value: 'Valeur',
        disabled: 'Désactivé'
      }
    },
    radio: {
      name: 'Bouton radio',
      description:
        "Sélecteur ne permettant qu'un seul choix, rendant la sélection unique plus claire",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Distribution verticale'
      },
      demo3: {
        title: 'Style bloc'
      },
      demo4: {
        title: 'Forme'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      'props(RadioGroup)': {
        size: 'Taille',
        block: 'Affichage en bloc',
        direction: "Direction d'arrangement",
        disabled: 'Désactivé',
        iconable: "Autoriser l'utilisation d'icônes",
        options: 'Options',
        readonly: 'Lecture seule',
        round: 'Style arrondi'
      },
      options: {
        label: 'Titre',
        value: 'Valeur',
        disabled: 'Désactivé'
      },
      events: {
        change: 'Déclenché lorsque la valeur change'
      }
    },
    tabs: {
      name: 'Onglets',
      description:
        'Présentation claire du contenu par catégories, avec une transition fluide',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Largeur adaptative'
      },
      demo3: {
        title: 'Largeur personnalisée des éléments'
      },
      demo4: {
        title: 'Ligne'
      },
      demo5: {
        title: 'Style arrondi'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        options: 'Options',
        type: 'Type',
        size: 'Taille',
        width: 'Largeur',
        itemWidth: 'Largeur des éléments',
        round: 'Style arrondi',
        disabled: 'Désactivé',
        readonly: 'Lecture seule'
      },
      options: {
        label: 'Titre',
        value: 'Valeur'
      }
    },
    select: {
      name: 'Sélecteur',
      description:
        'Liste déroulante de sélection, rendant les choix plus pratiques',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Recherche'
      },
      demo3: {
        title: 'Support des slots'
      },
      demo4: {
        title: 'Options désactivées'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      demo7: {
        title: 'État vide personnalisé'
      },
      demo8: {
        title: 'Groupement'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        defaultValue: 'Valeur par défaut',
        options: 'Options',
        width: 'Largeur',
        autoWidth: 'Largeur automatique',
        popoverWidth: 'Largeur du popover',
        trigger: 'Mode de déclenchement',
        placeholder: "Texte d'espace réservé",
        size: 'Taille',
        itemHeight: 'Hauteur des éléments',
        searchable: 'Recherche possible',
        searchMethod: 'Méthode de recherche',
        searchDelay: 'Délai de recherche',
        clearable: 'Effaçable',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        showCheckIcon: "Afficher l'icône de vérification"
      },
      events: {
        change: 'Déclenché lorsque la valeur change',
        clear: "Déclenché lors de l'effacement",
        blur: 'Déclenché lors de la perte du focus',
        focus: "Déclenché lors de l'obtention du focus"
      },
      options: { label: 'Titre', value: 'Valeur', disabled: 'Désactivé' },
      slots: {
        item: 'Contenu personnalisé des options',
        empty: "Contenu personnalisé de l'état vide"
      }
    },
    selectMultiple: {
      name: 'Sélecteur multiple',
      description:
        'Liste déroulante supportant la sélection multiple, rendant les choix multiples plus flexibles',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Méthode de filtrage personnalisée'
      },
      demo3: {
        title: 'Support des slots'
      },
      demo4: {
        title: 'Options désactivées'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      demo7: {
        title: "Slot d'état vide"
      },
      demo8: {
        title: 'Groupement'
      },
      props: {
        options: 'Options',
        trigger: 'Mode de déclenchement',
        width: 'Largeur',
        valueLayout: 'Disposition des valeurs',
        valueTextSplit: 'Séparateur de texte des valeurs',
        placeholder: "Texte d'espace réservé",
        size: 'Taille',
        itemHeight: 'Hauteur des éléments',
        searchable: 'Recherche possible',
        searchPlaceholder: "Texte d'espace réservé pour la recherche",
        searchMethod: 'Méthode de recherche',
        searchDelay: 'Délai de recherche',
        clearable: 'Effaçable',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        showCheckIcon: "Afficher l'icône de vérification",
        defaultValue: 'Valeur par défaut'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      events: {
        change: 'Changement de valeur',
        blur: 'Perte de focus',
        focus: 'Obtention du focus'
      },
      options: { label: 'Étiquette', value: 'Valeur', disabled: 'Désactivé' },
      slots: {
        item: 'Contenu personnalisé des options',
        empty: "Contenu personnalisé de l'état vide"
      }
    },
    datePicker: {
      name: 'Sélecteur de date',
      description:
        'Outil de sélection de date simple et intuitif, pour une sélection temporelle précise',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Effaçable'
      },
      demo3: {
        title: 'Format personnalisé'
      },
      demo4: {
        title: 'Préréglages'
      },
      demo5: {
        title: 'Lecture seule'
      },
      demo6: {
        title: 'Désactivé'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        valueFormat: 'Format de la valeur',
        size: 'Taille',
        width: 'Largeur',
        placeholder: "Texte d'espace réservé",
        clearable: 'Effaçable',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        presets: 'Valeurs prédéfinies'
      },
      events: {
        change: 'Changement de valeur',
        focus: 'Obtention du focus',
        blur: 'Perte de focus',
        clear: 'Effacement'
      }
    },
    dateRangePicker: {
      name: 'Sélecteur de plage de dates',
      description:
        "Outil pour sélectionner une plage temporelle, rendant la sélection d'intervalles plus pratique",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Effaçable'
      },
      demo3: {
        title: 'Autres options'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        startKey: 'Clé de début',
        endKey: 'Clé de fin',
        valueFormat: 'Format de la valeur',
        size: 'Taille',
        width: 'Largeur',
        placeholderStart: "Texte d'espace réservé pour le début",
        placeholderEnd: "Texte d'espace réservé pour la fin",
        clearable: 'Effaçable',
        readonly: 'Lecture seule',
        disabled: 'Désactivé'
      },
      events: {
        change: 'Changement de valeur',
        focus: 'Obtention du focus',
        blur: 'Perte de focus',
        clear: 'Effacement'
      }
    },
    cascader: {
      name: 'Sélecteur en cascade',
      description:
        'Sélecteur pour gérer des données multi-niveaux, rendant les choix hiérarchiques plus clairs',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Mode libre'
      },
      demo3: {
        title: 'Afficher uniquement le dernier niveau'
      },
      demo4: {
        title: 'Chargement asynchrone'
      },
      demo5: {
        title: 'Effaçable'
      },
      demo6: {
        title: 'Lecture seule'
      },
      demo7: {
        title: 'Désactivé'
      },
      demo8: {
        title: 'Options désactivées'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        width: 'Largeur',
        options: 'Options',
        placeholder: "Texte d'espace réservé",
        disabled: 'Désactivé',
        clearable: 'Effaçable',
        showAllLevels: 'Afficher tous les niveaux',
        multiple: 'Sélection multiple',
        free: 'Sélection libre',
        size: 'Taille',
        trigger: 'Mode de déclenchement',
        loadMethod: 'Méthode de chargement',
        readonly: 'Lecture seule'
      },
      options: {
        label: 'Étiquette',
        value: 'Valeur',
        isLeaf: 'Est une feuille',
        children: 'Enfants',
        disabled: 'Désactivé'
      }
    },
    treeSelect: {
      name: 'Sélecteur arborescent',
      description:
        'Sélecteur avec structure en arbre, rendant la sélection hiérarchique plus intuitive',
      demo1: {
        title: 'Utilisation standard'
      },
      demo2: {
        title: 'Chargement asynchrone des données'
      },
      demo3: {
        title: 'Slots personnalisés'
      },
      demo4: {
        title: 'Éléments désactivés'
      },
      demo5: {
        title: 'Tout déplier par défaut'
      },
      demo6: {
        title: 'Recherche possible'
      },
      demo7: {
        title: "Slot d'état vide"
      },
      demo8: {
        title: 'Autres options'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        dataSource: 'Source de données',
        defaultValue: 'Valeur par défaut',
        placeholder: "Texte d'espace réservé",
        size: 'Taille du composant',
        disabled: 'Désactivé',
        clearable: 'Effaçable',
        checkable: 'Afficher les cases à cocher',
        showAllLevels: 'Afficher tous les niveaux',
        showCheckIcon: "Afficher l'icône de sélection",
        showLine: 'Afficher les lignes de connexion',
        expandAll: 'Déplier tous les nœuds',
        searchable: 'Recherche possible',
        searchDelay: 'Délai de recherche (millisecondes)',
        readonly: 'Lecture seule',
        free: 'Mode libre (état de sélection parent-enfant non lié)',
        align: 'Alignement du texte',
        trigger: 'Mode de déclenchement des nœuds enfants',
        keyField: "Champ d'identification du nœud",
        labelField: "Champ d'étiquette du nœud",
        disabledField: 'Champ de désactivation du nœud',
        initTree: "Méthode d'initialisation des nœuds",
        loadMethod: 'Méthode de chargement asynchrone des nœuds enfants'
      },
      slots: {
        handle: 'Nom du slot'
      }
    },
    inputTable: {
      name: "Table d'entrée",
      description:
        'Saisie rapide de données dans un tableau, rendant le traitement par lots plus efficace',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Valeurs par défaut'
      },
      demo3: {
        title: 'Options avancées'
      },
      props: {
        columns: 'Colonnes',
        size: 'Taille',
        width: 'Largeur',
        rowKey: 'Clé de ligne',
        batchDeletable: 'Suppression par lot',
        addable: 'Ajoutable',
        defaultForm: 'Formulaire par défaut',
        deletable: 'Supprimable',
        maxRows: 'Nombre maximal de lignes',
        minRows: 'Nombre minimal de lignes',
        clearable: 'Effaçable',
        sortable: 'Triable',
        autoUniqueId: 'Générer un ID unique automatiquement',
        uniqueField: 'Champ unique',
        sortTooltipCustomRender: `Rendu personnalisé de l'info-bulle de tri`
      } 
    },
    switch: {
      name: 'Interrupteur',
      description:
        "Sélecteur d'interrupteur simple, rendant les changements d'état plus clairs",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Carré'
      },
      demo3: {
        title: 'Simulation de requête'
      },
      demo4: {
        title: 'Lecture seule'
      },
      demo5: {
        title: 'Désactivé'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        round: 'Coins arrondis',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        request: 'Requête',
        loading: 'Chargement'
      },
      events: {
        change: 'Changement de valeur'
      }
    },
    slider: {
      name: 'Curseur',
      description:
        'Sélection de valeurs par glissement, rendant le choix de valeurs plus intuitif',
      demo1: {
        title: 'Taille'
      },
      demo2: {
        title: 'Pas différents'
      },
      demo3: {
        title: 'Plage limitée'
      },
      demo4: {
        title: 'Lecture seule'
      },
      demo5: {
        title: 'Désactivé'
      },
      demo6: {
        title: 'Options de configuration'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        min: 'Valeur minimale',
        max: 'Valeur maximale',
        step: 'Pas',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        options: 'Options',
        formatTooltip: "Formatage de l'infobulle"
      }
    },
    sliderRange: {
      name: 'Curseur de plage',
      description:
        'Curseur pour sélectionner une plage de valeurs, rendant la sélection de plages plus flexible',
      demo1: {
        title: 'Taille'
      },
      demo2: {
        title: 'Pas différents'
      },
      demo3: {
        title: 'Plage limitée'
      },
      demo4: {
        title: 'Lecture seule'
      },
      demo5: {
        title: 'Désactivé'
      },
      demo6: {
        title: 'Options de configuration'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        min: 'Valeur minimale',
        max: 'Valeur maximale',
        step: 'Pas',
        readonly: 'Lecture seule',
        disabled: 'Désactivé',
        options: 'Options',
        formatTooltip: "Formatage de l'infobulle"
      }
    },
    rate: {
      name: 'Évaluation',
      description:
        "Composant d'évaluation par étoiles, rendant la notation plus vivante et amusante",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Lecture seule'
      },
      demo3: {
        title: 'Désactivé'
      },
      demo4: {
        title: 'Infobulles'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        count: "Nombre d'étoiles",
        tips: 'Infobulles',
        readonly: 'Lecture seule',
        disabled: 'Désactivé'
      }
    },
    colorPicker: {
      name: 'Sélecteur de couleur',
      description:
        'Outil riche de sélection de couleurs, pour des choix de couleurs plus précis',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Différentes tailles'
      },
      demo3: {
        title: 'Largeur personnalisée'
      },
      demo4: {
        title: 'État désactivé'
      },
      demo5: {
        title: 'État lecture seule'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        size: 'Taille',
        width: 'Largeur',
        placeholder: "Texte d'espace réservé",
        disabled: 'Désactivé',
        readonly: 'Lecture seule'
      }
    },
    upload: {
      name: 'Téléchargement',
      description:
        'Composant de téléchargement de fichiers, simplifiant la gestion des fichiers',
      demo1: {
        title: 'Standard'
      },
      demo2: {
        title: 'Limites de format et de taille'
      },
      demo3: {
        title: "Téléchargement d'images"
      },
      demo4: {
        title: 'Conseils personnalisés'
      },
      demo5: {
        title: 'Mur de photos'
      },
      demo6: {
        title: 'Sans téléchargement'
      },
      demo7: {
        title: 'Prévisualisation'
      },
      model: {
        modelValue: 'Valeur liée'
      },
      props: {
        accept: 'Types de fichiers acceptés',
        immediate: 'Téléchargement immédiat',
        multiple: 'Téléchargement multiple',
        disabled: 'Désactivé',
        readonly: 'Lecture seule',
        limit: 'Limite du nombre de fichiers',
        maxFileSize: 'Taille maximale de fichier',
        size: 'Taille',
        tips: 'Conseils',
        uploadHelper: 'Assistant de téléchargement',
        viewMode: "Mode d'affichage"
      }
    },
    table: {
      name: 'Tableau',
      description:
        "Composant de tableau puissant, rendant l'affichage des données plus clair",
      model: {
        modelValue: 'Nom du paramètre',
        selectedKeys: 'Clés sélectionnées',
        sortValue: 'Valeur de tri'
      },
      demo1: {
        title: 'Standard'
      },
      demo2: {
        title: 'Lignes et colonnes fixes'
      },
      demo3: {
        title: 'Actions personnalisées'
      },
      demo4: {
        title: 'Slots'
      },
      demo5: {
        title: 'Style personnalisé'
      },
      demo6: {
        title: 'Sélection'
      },
      demo7: {
        title: 'Tri'
      },
      demo8: {
        title: 'Rendu personnalisé'
      },
      demo9: {
        title: 'Fonctionnalités complètes'
      },
      demo10: {
        title: 'Aucune donnée'
      },
      demo11: {
        title: 'En-têtes groupés',
        tipsTitle: 'Note de limitation',
        tipsContent:
          'Si vous souhaitez que les en-têtes groupés aient un effet de colonne fixe, vous devez définir la largeur pour tous les en-têtes de colonnes fixes, y compris tous les nœuds parents, sinon un désalignement peut se produire.'
      },
      props: {
        columns: 'Colonnes',
        dataSource: 'Source de données',
        bordered: 'Avec bordure',
        size: 'Taille',
        checkable: 'Sélectionnable',
        maxHeight: 'Hauteur maximale',
        multiple: 'Sélection multiple',
        rowKey: 'Clé de ligne',
        sortTooltipCustomRender: `Rendu personnalisé de l'info-bulle de tri`,
        sortable: 'Triable'
      },
      tableColumns: {
        field: 'Champ',
        fixed: 'Fixe',
        title: 'Titre',
        type: 'Type',
        width: 'Largeur',
        x: 'Axe X',
        customRender: 'Rendu personnalisé'
      }
    },
    pagination: {
      name: 'Pagination',
      description:
        'Navigation de pagination claire, facilitant la navigation dans les données',
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Grand volume'
      },
      demo3: {
        title: 'Simulation asynchrone'
      },
      model: {
        total: 'Total',
        currentPage: 'Page actuelle',
        pageSize: 'Taille de page'
      },
      props: {
        size: 'Taille',
        pageSizeOptions: 'Options de taille de page',
        visiblePagesCount: 'Nombre de pages visibles'
      },
      events: {
        change: 'Changement'
      }
    },
    magicNumber: {
      name: 'Nombre Magique',
      description:
        "Composant d'animation qui rend l'affichage des nombres plus vivant et intéressant"
    },
    tree: {
      name: 'Arborescence',
      description:
        'Outil puissant pour afficher des structures de données hiérarchiques avec clarté',
      demo1: {
        title: 'Usage standard'
      },
      demo2: {
        title: 'Affichage des cases à cocher'
      },
      demo3: {
        title: 'Sélection multiple'
      },
      demo4: {
        title: 'Mode de liaison parent-enfant'
      },
      demo5: {
        title: 'Chargement asynchrone'
      },
      demo6: {
        title: 'Tout déplier par défaut'
      },
      demo7: {
        title: 'Affichage des lignes de connexion'
      },
      demo8: {
        title: 'Utilisation des slots'
      },
      model: {
        modelValue: 'Nom du paramètre',
        expandedKeys: 'Clés des nœuds déployés'
      },
      props: {
        dataSource: 'Source de données',
        multiple: 'Sélection multiple',
        height: "Hauteur de l'arbre",
        searchable: "Permet la recherche dans l'arbre",
        checkable: 'Afficher les cases à cocher',
        expandAll: 'Tout déplier par défaut',
        free: 'Sélection libre',
        showLine: 'Afficher les lignes de connexion',
        trigger: 'Mode de déclenchement',
        placeholder: "Texte d'indication",
        keyField: "Champ d'identification du nœud",
        labelField: "Champ d'étiquette du nœud",
        disabledField: 'Champ de désactivation du nœud',
        initTree: "Méthode d'initialisation des nœuds",
        loadMethod: 'Méthode de chargement asynchrone des nœuds enfants',
        isSelect: 'Est sélectionné'
      },
      slots: {
        handle: 'Nom du slot'
      },
      treeDataSource: {
        label: 'Étiquette',
        key: 'Clé',
        isLeaf: 'Est une feuille',
        children: 'Enfants',
        disabled: 'Désactivé'
      }
    },
    collapse: {
      name: 'Panneau Accordéon',
      description:
        'Zone de contenu pliable et dépliable pour une présentation plus organisée des informations',
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Slot de titre'
      },
      demo3: {
        title: 'Mode accordéon'
      },
      model: {
        modelValue: 'Nom du paramètre'
      },
      'model(CollapseItem)': {
        modelValue: 'Nom du paramètre'
      },
      props: {
        width: 'Largeur'
      },
      'props(CollapseItem)': {
        collapseKey: 'Clé de pliage',
        title: 'Titre',
        radius: 'Rayon'
      }
    },
    desc: {
      name: 'Liste Descriptive',
      description:
        "Présentation ordonnée de multiples champs pour un affichage d'informations plus structuré",
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Direction'
      },
      demo3: {
        title: 'Version enrichie'
      },
      demo4: {
        title: 'Configuration en ligne'
      },
      props: {
        options: 'Options',
        dataSource: 'Source de données',
        size: 'Taille',
        labelX: 'Label X',
        valueX: 'Valeur X',
        gap: 'Espacement',
        width: 'Largeur',
        columns: 'Colonnes',
        labelWidth: 'Largeur du label',
        direction: 'Direction',
        bordered: 'Avec bordure'
      },
      descItemProps: {
        label: 'Label',
        field: 'Champ',
        size: 'Taille',
        bordered: 'Avec bordure',
        width: 'Largeur',
        labelWidth: 'Largeur du label',
        direction: 'Direction',
        tips: 'Infobulles',
        type: 'Type',
        labelX: 'Label X',
        valueX: 'Valeur X',
        gridArea: 'Zone de grille',
        customRender: 'Rendu personnalisé'
      }
    },
    alert: {
      name: 'Alerte',
      description:
        "Boîte d'information visible pour des avertissements plus doux",
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Support des slots'
      },
      demo3: {
        title: 'Plus de scénarios'
      },
      props: {
        type: 'Type',
        title: 'Titre',
        content: 'Contenu',
        closeable: 'Peut être fermé',
        footer: 'Contenu du pied'
      }
    },
    message: {
      name: 'Message',
      description:
        "Retour d'information léger pour des notifications plus concises",
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Contrôlable'
      },
      demo3: {
        title: 'Simulation de requête'
      },
      events: {
        close: 'Déclenché à la fermeture'
      },
      props: {
        type: 'Type',
        content: 'Contenu',
        duration: 'Durée'
      }
    },
    notification: {
      name: 'Notification',
      description: 'Notification élégante pour des alertes plus conviviales',
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: "Durée d'affichage personnalisée"
      },
      props: {
        type: 'Type',
        title: 'Titre',
        content: 'Contenu',
        delay: 'Délai'
      }
    },
    drawer: {
      name: 'Tiroir',
      description:
        "Panneau coulissant depuis le bord de l'écran pour des opérations temporaires plus fluides",
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Fermeture asynchrone'
      },
      demo3: {
        title: 'En-tête et pied personnalisés'
      },
      demo4: {
        title: 'Fermeture par touche ESC'
      },
      model: {
        visible: 'Visibilité'
      },
      props: {
        title: 'Titre',
        width: 'Largeur',
        position: 'Position',
        height: 'Hauteur',
        closeOnClickOverlay: 'Fermeture au clic sur le masque',
        closeByEsc: 'Fermeture par touche ESC',
        hideFooter: 'Masquer le pied',
        okButtonProps: 'Propriétés du bouton de confirmation',
        closeButtonProps: 'Propriétés du bouton de fermeture',
        zIndex: 'Niveau de couche'
      }
    },
    dialog: {
      name: 'Boîte de Dialogue',
      description:
        'Dialogue modal pour mettre en évidence les interactions importantes',
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Version simple'
      },
      props: {
        type: 'Type',
        width: 'Largeur',
        trigger: 'Mode de déclenchement',
        title: 'Titre',
        okText: 'Texte du bouton de confirmation',
        cancelText: "Texte du bouton d'annulation",
        ok: 'Callback de confirmation',
        cancel: "Callback d'annulation",
        closeOnClickOverlay: 'Fermeture au clic sur le masque',
        closeByEsc: 'Fermeture par touche ESC',
        transformOrigin: "Origine de l'animation"
      },
      events: {
        ok: 'Déclenché au clic sur le bouton de confirmation',
        cancel: "Déclenché au clic sur le bouton d'annulation"
      }
    },
    modal: {
      name: 'Fenêtre Modale',
      description:
        'Fenêtre modale plus flexible pour des interactions popup plus riches',
      demo1: {
        title: 'Usage de base'
      },
      demo2: {
        title: 'Fermeture asynchrone'
      },
      demo3: {
        title: 'En-tête et pied personnalisés'
      },
      demo4: {
        title: 'Fermeture par touche ESC'
      },
      model: {
        visible: 'Visibilité'
      },
      props: {
        title: 'Titre',
        width: 'Largeur',
        top: 'Distance du haut',
        hideFooter: 'Masquer le pied',
        closeByEsc: 'Fermeture par touche ESC',
        okButtonProps: 'Propriétés du bouton de confirmation',
        closeButtonProps: 'Propriétés du bouton de fermeture',
        closeOnClickOverlay: 'Fermeture au clic sur le masque',
        zIndex: 'Niveau de couche'
      }
    },
    popok: {
      name: 'Confirmation Popup',
      description:
        "Confirmation légère pour rendre les validations d'actions plus pratiques",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Modes de déclenchement'
      },
      props: {
        type: 'Type',
        width: 'Largeur',
        trigger: 'Mode de déclenchement',
        title: 'Titre',
        content: 'Contenu',
        placement: 'Position',
        ok: 'Callback de confirmation',
        cancel: "Callback d'annulation",
        okText: 'Texte du bouton de confirmation',
        cancelText: "Texte du bouton d'annulation"
      }
    },
    popover: {
      name: 'Popover',
      description:
        "Carte d'information au survol de la souris, pour des indications plus élégantes",
      demo1: {
        title: 'Utilisation de base'
      },
      props: {
        trigger: 'Mode de déclenchement',
        placement: 'Position',
        disabled: 'Désactivé',
        loading: 'Chargement',
        hideOnClick: 'Masquer au clic',
        offset: 'Décalage',
        popoverBodyClassName: 'Classe CSS du contenu',
        triggerTarget: 'Cible de déclenchement'
      },
      slots: {
        trigger: 'Slot de déclenchement',
        'popover-body': 'Slot du contenu'
      }
    },
    tooltip: {
      name: 'Infobulle',
      description:
        "Bulle d'aide textuelle simple, pour des indications plus légères",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Déclenchement au clic'
      },
      props: {
        tips: "Contenu de l'infobulle",
        placement: 'Position',
        trigger: 'Mode de déclenchement',
        allowHTML: 'Autoriser le HTML',
        delay: "Délai d'affichage"
      }
    },
    loading: {
      name: 'Chargement',
      description:
        "Effet de chargement élégant, pour rendre l'attente plus agréable",
      demo1: {
        title: 'Utilisation de base'
      },
      props: {
        tip: "Message d'indication",
        placement: "Position de l'indication",
        trigger: 'Mode de déclenchement',
        allowHTML: 'Autoriser le HTML'
      }
    },
    result: {
      name: 'Résultat',
      description:
        "Utilisé pour présenter les résultats d'opérations, pour un retour plus complet",
      demo1: {
        title: 'Utilisation de base'
      },
      props: {
        type: 'Type',
        title: 'Titre',
        content: 'Contenu'
      },
      slots: {
        handle: 'Slot de gestion'
      }
    },
    empty: {
      name: 'État vide',
      description:
        "Affichage d'état sans données, pour des pages vides plus conviviales",
      demo1: {
        title: 'Utilisation de base'
      },
      props: {
        type: 'Type',
        title: 'Titre',
        fontSize: 'Taille de police',
        padding: 'Marge intérieure',
        width: 'Largeur',
        height: 'Hauteur'
      }
    },
    actionBox: {
      name: "Boîte d'action",
      description: "Boutons d'action flexibles pour des opérations rapides",
      demo1: {
        title: 'Utilisation de base'
      },
      demo2: {
        title: 'Menu déroulant'
      },
      demo3: {
        title: 'Icônes personnalisées'
      },
      demo4: {
        title: 'Styles personnalisés'
      },
      props: {
        options: "Configuration des boutons d'action",
        dropdownThreshold: 'Seuil du menu déroulant',
        dropdownLabel: 'Texte du menu déroulant',
        dropdownIcon: 'Icône du menu déroulant',
        divider: 'Afficher le séparateur',
        iconOnly: 'Icône uniquement'
      },
      options: {
        label: "Texte du bouton d'action",
        icon: "Icône du bouton d'action",
        onClick: "Événement de clic du bouton d'action",
        customRender: 'Contenu de rendu personnalisé'
      }
    }
  }
}
