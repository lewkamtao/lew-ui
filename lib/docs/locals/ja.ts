const contextMenu = {
  label: '表示テキスト',
  value: '値',
  icon: 'アイコン描画関数',
  children: '子ノードコレクション',
  disabled: '無効オプション',
  isDividerLine: '区切り線の有無',
  checkable: 'チェックボックスの有無',
  checked: '選択状態',
  onClick: 'クリックイベント'
}

export default {
  name: 'ja',
  home: {
    title: 'Lew UI',
    description: '美しく使いやすい Vue3 コンポーネントライブラリ',
    getStarted: '始めましょう',
    sloganTitle: 'シンプルイズベスト',
    slogan: '美しく使いやすい Vue3 コンポーネントライブラリ',
    home: 'ホーム',
    install: 'インストール',
    components: 'コンポーネント',
    formEngine: 'フォームエンジン',
    descEngine: '説明エンジン'
  },
  base: {
    base: '基本',
    navigator: 'ナビゲーション',
    form: 'フォーム',
    data: 'データコンポーネント',
    feedback: 'フィードバック',
    close: '閉じる',
    showCode: 'コードを表示'
  },
  components: {
    image: {
      name: '画像 Image',
      description:
        '遅延読み込み、ローディング状態、エラー処理などをサポートする洗練された画像表示',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'ローディング状態',
        tipsTitle: 'ヒント',
        tipsContent:
          'プレースホルダー効果を得るには、width と height を設定する必要があります。'
      },
      demo3: {
        title: 'ローディング失敗'
      },
      props: {
        src: '画像のURL',
        alt: '画像の説明',
        width: '幅',
        height: '高さ',
        objectFit: '画像のフィットモード',
        objectPosition: '画像の位置',
        lazy: '遅延読み込みの有効化',
        loading: 'ローディング状態の表示',
        title: '画像のタイトル'
      }
    },
    avatar: {
      name: 'アバター Avatar',
      description:
        '画像、アイコン、テキストの3つの形式をサポートする洗練されたアバターコンポーネント',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'ステータス'
      },
      demo3: {
        title: 'デフォルトアバター'
      },
      demo4: {
        title: '形状',
        description:
          '`shape` でアバターの形状を制御します。オプション値は `circle`、`square`、`sharp` です。'
      },
      props: {
        size: 'サイズ',
        loading: 'ローディング状態の表示',
        shape: '形状',
        src: '画像のURL',
        alt: '画像の説明',
        status: 'ステータス',
        objectFit: '画像のフィットモード',
        objectPosition: '画像の位置',
        statusPlacement: 'ステータスの位置'
      }
    },
    button: {
      name: 'ボタン Button',
      description: 'クリックでスムーズなインタラクションを実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'カラー'
      },
      demo3: {
        title: 'アイコン'
      },
      demo4: {
        title: 'ローディング状態'
      },
      demo5: {
        title: '無効状態'
      },
      demo6: {
        title: 'Promise サポート'
      },
      props: {
        text: 'ボタンテキスト',
        type: 'タイプ',
        size: 'サイズ',
        singleIcon: 'アイコンのみ表示',
        color: 'カラー',
        round: '角丸',
        dashed: '破線',
        loading: 'ローディング状態の表示',
        disabled: '無効状態',
        request: 'リクエスト'
      }
    },
    tag: {
      name: 'タグ Tag',
      description: 'コンパクトで強力なマーカー、コンテンツの分類に彩りを添える',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'タイプ'
      },
      demo3: {
        title: 'サイズ'
      },
      demo4: {
        title: 'カラー'
      },
      demo5: {
        title: '無効'
      },
      demo6: {
        title: '閉じることができる'
      },
      demo7: {
        title: 'スロット'
      },
      props: {
        text: 'タグテキスト（スロットより優先、幅を超えると text-trim 効果が発動）',
        type: 'スタイルタイプ',
        size: 'サイズ',
        color: 'カラーテーマ',
        closable: '閉じることができるか',
        disabled: '無効状態',
        round: '角丸',
        oversize: 'よりゆったりとしたサイズ'
      }
    },
    badge: {
      name: 'バッジ Badge',
      description: '右上に表示される小さな赤い点で、通知をより目立たせる',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'ドット'
      },
      demo3: {
        title: '直接使用'
      },
      demo4: {
        title: 'テキスト'
      },
      demo5: {
        title: '処理中'
      },
      props: {
        text: 'バッジテキスト',
        offset: 'バッジのオフセット',
        processing: '処理中の状態',
        max: '最大値（超過すると max+ と表示）',
        color: 'バッジの色',
        disabled: '無効状態',
        value: 'バッジの値（空の場合はドットとして表示）'
      }
    },
    title: {
      name: 'タイトル Title',
      description: 'タイトルだけでなく、コンテンツの本質的なヒント',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '太字'
      },
      demo3: {
        title: 'カラー'
      },
      props: {
        text: 'テキスト内容',
        size: 'タイトルのサイズ（数値：ピクセル、または文字列："1.5em"など）',
        bold: 'タイトルの太さ（100から900の間の100単位の値）',
        color: 'タイトルの色（定義済みの色名または任意のカラー値）'
      }
    },
    textTrim: {
      name: 'テキスト省略 TextTrim',
      description: '長いテキストを優雅に処理し、レイアウトの美しさを保つ',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '複数行の省略'
      },
      demo3: {
        title: '末尾テキスト'
      },
      demo4: {
        title: '配置'
      },
      props: {
        text: 'テキスト内容',
        lineClamp: '表示する最大行数（超過部分は省略）',
        allowHTML: 'HTMLタグの描画を許可',
        placement: 'ツールチップの表示位置',
        offset: 'ツールチップの対象要素からのオフセット [x, y]（ピクセル）',
        textAlign: 'x軸の配置（幅がコンテナより小さい場合）',
        delay:
          'ツールチップの表示/非表示の遅延時間 [表示遅延, 非表示遅延]（ミリ秒）',
        reserveEnd:
          '末尾の保持文字数（テキストが溢れる場合、中央に省略記号を表示し、開始部分と指定数の末尾文字を保持）'
      }
    },
    flex: {
      name: 'フレックス Flex',
      description:
        '柔軟なレイアウトソリューション、ページレイアウトを自在に操る',
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
        direction: '子要素の配置方向',
        x: '水平方向の配置',
        y: '垂直方向の配置',
        mode: '子要素の分布モード（x または y の設定を上書き、direction の値に応じて影響が変化）',
        wrap: '子要素の折り返しを許可',
        gap: '子要素間の間隔（ピクセル）',
        width: 'Flexコンテナの幅（ピクセルまたはパーセント）'
      }
    },
    mark: {
      name: 'マーク Mark',
      description:
        'テキストにハイライトを追加し、重要な内容を一目で分かるように',
      demo1: {
        title: '基本的な使い方'
      },
      props: {
        color: 'カラーテーマ',
        round: '角丸',
        bold: '太字',
        cursor: 'ホバー時のカーソルスタイル'
      }
    },
    icon: {
      name: 'アイコン Icon',
      description:
        '美しいアイコンコレクション、インターフェースにビジュアル言語を追加'
    },
    backTop: {
      name: 'トップに戻る BackTop',
      description:
        'ワンクリックでトップに戻り、長いページの閲覧をストレスフリーに',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'カスタムコンテンツ'
      },
      demo3: {
        title: 'ディレクティブによるトリガー'
      },
      props: {
        target:
          'スクロールイベントをトリガーする対象要素（CSSセレクタ）。空の場合はウィンドウ全体',
        right: 'ページ右端からの距離（ピクセル）',
        bottom: 'ページ下端からの距離（ピクセル）',
        valveHeight: 'ボタンを表示するスクロール高さのしきい値（ピクセル）'
      },
      events: {
        click: 'トップに戻るクリックイベントコールバック'
      }
    },
    steps: {
      name: 'ステップ',
      description:
        '操作プロセスを明確に表示し、ユーザーが現在の位置を把握できるようにします',
      demo1: {
        title: '基本的な使用法'
      },
      demo2: {
        title: 'ステータス'
      },
      demo3: {
        title: '読み込み中'
      },
      model: {
        modelValue: '現在アクティブなステップのインデックス値'
      },
      props: {
        options: 'ステップ設定項目の配列',
        status: 'ステップの現在のステータス',
        minWidth: '最小ステップ幅'
      },
      options: {
        title: 'ステップのタイトル',
        description: 'ステップの説明'
      }
    },
    menu: {
      name: 'メニュー Menu',
      description: '優雅な垂直メニュー、ナビゲーションの階層を明確に',
      demo1: {
        title: '基本的な使い方'
      },
      model: {
        modelValue: '現在のアクティブメニューの値'
      },
      props: {
        options: 'メニュー設定項目の配列'
      },
      menuOptions: {
        label: 'メニュー項目のテキスト',
        value: 'メニュー項目の値',
        children: 'サブメニュー項目の配列',
        disabled: 'メニュー項目の無効化',
        icon: 'メニュー項目のアイコン',
        tagText: 'メニュー項目のバッジテキスト',
        tagColor: 'メニュー項目のバッジカラー'
      }
    },
    menuTree: {
      name: 'メニューツリー MenuTree',
      description: '階層が明確なツリー型メニュー、複雑な構造関係を簡単に表示',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'カスタムアイコン'
      },
      demo3: {
        title: 'デフォルト展開',
        description: 'v-model で展開するメニュー項目を制御'
      },
      demo4: {
        title: 'タグ'
      },
      demo5: {
        title: 'カスタムスタイル'
      },
      model: {
        modelValue: '現在のアクティブメニューの値',
        expandKeys: 'デフォルトで展開するメニュー項目のキー配列',
        collapsed: 'メニューの折りたたみ状態'
      },
      props: {
        options: 'メニューツリーのデータソース（ネスト構造をサポート）',
        width: 'メニューツリーの幅（CSS幅値をサポート）'
      },
      menuTreeItem: {
        label:
          'メニューツリー項目のタイトルテキスト。名前付きスロット "label" でカスタマイズ可能',
        value: 'メニュー項目の値（一意性を識別）',
        level: 'メニューツリー項目のレベル（1から開始）',
        icon: 'アイコン描画関数',
        tagText: 'メニュー項目のバッジテキスト',
        tagType: 'メニュー項目のバッジタイプ',
        tagColor: 'メニュー項目のバッジカラー',
        disabled: 'メニュー項目の無効化',
        isLeaf: 'リーフノードかどうか'
      }
    },
    dropdown: {
      name: 'ドロップダウン Dropdown',
      description:
        'クリックでトリガーされるフローティングメニュー、操作をより便利に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'ボタン以外にも'
      },
      demo3: {
        title: '無効項目'
      },

      props: {
        options: 'メニューオプション設定',
        trigger: 'トリガー方式',
        placement: 'メニューの表示位置',
        checkable: '選択可能'
      },
      'options(ContextMenus)': contextMenu,
      events: {
        show: 'メニュー表示イベントコールバック',
        hide: 'メニュー非表示イベントコールバック',
        change: 'メニュー項目選択イベントコールバック'
      }
    },
    breadcrumb: {
      name: 'パンくずリスト Breadcrumb',
      description: '明確なナビゲーションパスで、ユーザーが迷子にならないように',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '現在の選択をカスタマイズ'
      },
      demo3: {
        title: '区切りアイコンのタイプ'
      },
      props: {
        options: 'パンくずリストの設定項目配列',
        separator: '区切りアイコンのタイプ'
      },
      breadcrumbOptions: {
        label: 'パンくずリスト項目のテキスト',
        value: 'パンくずリスト項目の値',
        active: '現在選択中の項目かどうか'
      },
      events: {
        change: 'パンくずリスト項目が変更された時に発火'
      }
    },
    contextMenu: {
      name: 'コンテキストメニュー ContextMenu',
      description: 'エレガントな右クリックメニューで、より自然な操作を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '多階層のネストをサポート'
      },
      demo3: {
        title: '動的更新をサポート'
      },
      demo4: {
        title: 'Checkbox'
      },
      props: {
        options: '右クリックメニューの設定',
        disabled: '右クリックメニューを無効化するかどうか'
      },
      'options(ContextMenus)': contextMenu
    },
    form: {
      name: 'フォーム Form',
      description: '強力なフォーム処理機能で、データ収集を効率的に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '方向'
      },
      demo3: {
        title: 'カスタムバリデーション'
      },
      demo4: {
        title: 'グリッドレイアウトをサポート'
      },
      demo5: {
        title: 'フォームエンジン設定との組み合わせ'
      },
      props: {
        options: 'フォームの構造とコンテンツを定義する設定オプション配列',
        size: 'フォーム全体のサイズ（全フォーム項目に影響）',
        width: 'フォーム全体の幅（数値またはパーセンテージ文字列）',
        columns: '1行に表示するフォーム項目数（最大4）',
        labelWidth: 'フォーム項目ラベルの幅（数値または"auto"）',
        disabled: 'フォーム全体を無効化',
        readonly: 'フォーム全体を読み取り専用に設定',
        direction: 'フォーム項目の配置方向（"x"は水平、"y"は垂直）',
        formMethods: 'フォーム操作用メソッドのコレクション'
      },
      formItemProps: {
        label: 'フォーム項目のラベルテキスト',
        field: 'データバインディングと検証用のフィールド名',
        required: '必須項目かどうか',
        as: 'フォーム項目のタイプ（"input"、"select"など）',
        size: '個別フォーム項目のサイズ（全体設定を上書き可能）',
        width: '個別フォーム項目の幅（数値またはパーセンテージ文字列）',
        labelWidth: '個別フォーム項目ラベルの幅（数値または"auto"）',
        direction: '個別フォーム項目の配置方向（"x"は水平、"y"は垂直）',
        disabled: 'フォーム項目を無効化',
        readonly: 'フォーム項目を読み取り専用に設定',
        tips: 'フォーム項目のヒント情報',
        errMessage: 'バリデーション失敗時のカスタムエラーメッセージ',
        rule: 'フォーム項目の検証ルール',
        props: 'フォーム項目コンポーネントに渡す追加プロパティ',
        between: '水平配置時の項目間隔を追加するかどうか',
        gridArea: 'グリッドレイアウトでの位置',
        outputFormat: '出力時のフォーマット方法',
        inputFormat: '入力時のフォーマット方法'
      },
      events: {
        mounted: 'フォーム項目がマウントされた時に発火'
      },
      methods: {
        getForm: 'フォームを取得',
        setForm: 'フォームを設定'
      }
    },
    input: {
      name: '入力フィールド Input',
      description: '機能豊富な入力フィールドで、データ入力をより便利に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'プレフィックス/サフィックス'
      },
      demo3: {
        title: '文字数制限'
      },
      demo4: {
        title: '配置'
      },
      demo5: {
        title: 'パスワード表示切替'
      },
      demo6: {
        title: '幅自動調整'
      },
      demo7: {
        title: 'フォーカス時全選択'
      },
      demo8: {
        title: 'クリア可能'
      },
      demo9: {
        title: '読み取り専用'
      },
      demo10: {
        title: '無効状態'
      },
      demo11: {
        title: 'Enterキーでイベント発火'
      },
      props: {
        type: '入力フィールドのタイプ',
        size: '入力フィールドのサイズ',
        placeholder: 'プレースホルダーテキスト',
        disabled: '無効化するかどうか',
        readonly: '読み取り専用にするかどうか',
        clearable: 'クリアボタンを有効にするかどうか',
        showPassword: 'パスワード表示切替を有効にするかどうか',
        maxLength: '最大入力長',
        showCount:
          '文字数カウントを表示するかどうか（typeがtextの場合のみ有効）',
        align: 'テキストの配置',
        width: '入力フィールドの幅',
        minWidth: '最小幅（数値またはCSSの単位付き文字列）',
        autoWidth: 'コンテンツに応じて幅を自動調整するかどうか',
        selectByFocus: 'フォーカス時に全テキストを選択するかどうか',
        copyable:
          'コピー可能にするかどうか（readonlyがtrueかつsuffixがfalseの場合のみ有効）',
        prefixes: 'プレフィックスのタイプ',
        prefixesOptions:
          'プレフィックスのオプションリスト（prefixesがselectの場合に使用）',
        prefixesTooltip: 'プレフィックスのツールチップテキスト',
        suffix: 'サフィックスのタイプ',
        suffixOptions:
          'サフィックスのオプションリスト（suffixがselectの場合に使用）',
        suffixTooltip: 'サフィックスのツールチップテキスト',
        okByEnter: 'Enterキーで確定を有効にするかどうか'
      },
      events: {
        change: '値が変更された時に発火',
        focus: 'フォーカスを得た時に発火',
        blur: 'フォーカスを失った時に発火',
        input: '入力時に発火',
        clear: 'クリア時に発火',
        ok: '確定時に発火'
      },
      model: {
        modelValue: 'バインド値',
        prefixValue: 'プレフィックスのバインド値',
        suffixValue: 'サフィックスのバインド値'
      }
    },
    inputNumber: {
      name: '数値入力 InputNumber',
      description: '数値入力に特化したフィールドで、より正確な数値処理を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'フォーカス時全選択'
      },
      demo3: {
        title: '範囲制限'
      },
      demo4: {
        title: '精度設定'
      },
      demo5: {
        title: '無効化と読み取り専用'
      },
      props: {
        min: '最小値',
        max: '最大値',
        step: 'ステップ値',
        disabled: '精度',
        size: 'サイズ（small、medium、large）',
        placeholder: 'プレースホルダーテキスト',
        readonly: '読み取り専用かどうか',
        width: '幅（数値またはCSSの単位付き文字列）',
        align: '配置',
        selectByFocus: 'フォーカス時に全テキストを選択'
      },
      model: {
        modelValue: 'バインド値'
      }
    },
    textarea: {
      name: 'テキストエリア Textarea',
      description: '複数行のテキスト入力を快適に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '文字数制限'
      },
      demo3: {
        title: 'フォーカス時全選択'
      },
      demo4: {
        title: 'クリア可能'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効化'
      },
      demo7: {
        title: 'Enterキーでイベント発火'
      },
      demo8: {
        title: 'リサイズ可能'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        placeholder: 'プレースホルダーテキスト',
        disabled: '無効化するかどうか',
        readonly: '読み取り専用かどうか',
        clearable: 'クリアボタンを表示するかどうか',
        showCount: '文字数カウントを表示するかどうか',
        maxLength: '最大入力文字数',
        size: 'テキストエリアのサイズ',
        resize: 'リサイズ方向',
        width: '幅',
        height: '高さ',
        minWidth: '最小幅',
        minHeight: '最小高さ',
        maxWidth: '最大幅',
        maxHeight: '最大高さ',
        selectByFocus: 'フォーカス時に全テキストを選択',
        okByEnter: 'Enterキーで確定を有効化（Shift+Enterで改行）'
      },
      events: {
        change: '値が変更された時に発火',
        focus: 'フォーカスを得た時に発火',
        blur: 'フォーカスを失った時に発火',
        input: '入力時に発火',
        clear: 'クリア時に発火',
        ok: '確定時に発火'
      }
    },
    inputTag: {
      name: 'タグ入力 InputTag',
      description: '複数のタグを簡単に入力・管理し、データ整理をより明確に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'サイズ'
      },
      demo3: {
        title: '重複を許可'
      },
      demo4: {
        title: '制御されたデフォルト値'
      },
      demo5: {
        title: 'クリア可能'
      },
      demo6: {
        title: '読み取り専用'
      },
      demo7: {
        title: '無効状態'
      },
      demo8: {
        title: '最大入力長'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        size: 'サイズ',
        disabled: '無効化するかどうか',
        clearable: 'クリア可能かどうか',
        placeholder: 'プレースホルダーテキスト',
        readonly: '読み取り専用かどうか',
        allowDuplicates: '重複を許可するかどうか',
        maxLength: '追加可能なタグの最大数',
        width: '幅'
      },
      events: {
        change: '値が変更された時に発火',
        clear: 'クリア時に発火',
        add: 'タグ追加時に発火',
        remove: 'タグ削除時に発火'
      }
    },
    checkbox: {
      name: 'チェックボックス Checkbox',
      description: '複数選択可能なセレクター、より直感的な複数選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '垂直配置'
      },
      demo3: {
        title: 'ブロック表示'
      },
      demo4: {
        title: '丸形'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効状態'
      },
      demo7: {
        title: '単一モード'
      },
      'model(CheckboxGroup)': {
        modelValue: 'バインド値'
      },
      'model(Checkbox)': {
        modelValue: 'バインド値'
      },
      'props(CheckboxGroup)': {
        options: 'オプション',
        disabled: '無効化するかどうか',
        readonly: '読み取り専用かどうか',
        size: 'サイズ',
        direction: '配置方向',
        block: 'ブロック表示',
        round: '丸形スタイル',
        iconable: 'アイコンを使用可能にするかどうか'
      },
      'props(Checkbox)': {
        label: 'ラベル',
        value: '値',
        disabled: '無効化',
        readonly: '読み取り専用',
        checked: 'チェック状態',
        size: 'サイズ',
        block: 'ブロック表示',
        round: '丸形スタイル',
        iconable: 'アイコンを使用可能にするかどうか',
        certain: '確定状態'
      },
      'events(Checkbox)': {
        change: '値が変更された時に発火'
      },
      'events(CheckboxGroup)': {
        change: '値が変更された時に発火'
      },
      options: {
        label: 'ラベル',
        value: '値',
        disabled: '無効化'
      }
    },
    radio: {
      name: 'ラジオボタン Radio',
      description: '単一選択のセレクター、より明確な選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '垂直配置'
      },
      demo3: {
        title: 'ブロック表示'
      },
      demo4: {
        title: '形状'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効状態'
      },
      model: {
        modelValue: 'バインド値'
      },
      'props(RadioGroup)': {
        size: 'サイズ',
        block: 'ブロック表示',
        direction: '配置方向',
        disabled: '無効化するかどうか',
        iconable: 'アイコンを使用可能にするかどうか',
        options: 'オプション',
        readonly: '読み取り専用かどうか',
        round: '丸形スタイル'
      },
      options: {
        label: 'ラベル',
        value: '値',
        disabled: '無効化'
      },
      events: {
        change: '値が変更された時に発火'
      }
    },
    tabs: {
      name: 'タブ Tabs',
      description: 'コンテンツを分類表示し、スムーズな切り替えを実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '幅自動調整'
      },
      demo3: {
        title: 'アイテム幅のカスタマイズ'
      },
      demo4: {
        title: 'ライン'
      },
      demo5: {
        title: '丸形'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        options: 'オプション',
        type: 'タイプ',
        size: 'サイズ',
        width: '幅',
        itemWidth: 'アイテム幅',
        round: '丸形スタイル',
        disabled: '無効状態',
        readonly: '読み取り専用状態'
      },
      options: {
        label: 'ラベル',
        value: '値'
      }
    },
    select: {
      name: 'セレクト Select',
      description: 'ドロップダウン選択ボックスで、選択をより便利に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '検索機能'
      },
      demo3: {
        title: 'スロットのサポート'
      },
      demo4: {
        title: '無効化オプション'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効化'
      },
      demo7: {
        title: 'カスタム空状態'
      },
      demo8: {
        title: 'グループ化'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        defaultValue: 'デフォルト値',
        options: 'オプション',
        width: '幅',
        autoWidth: '自動幅',
        popoverWidth: 'ポップオーバー幅',
        trigger: 'トリガー方式',
        placeholder: 'プレースホルダーテキスト',
        size: 'サイズ',
        itemHeight: '項目の高さ',
        searchable: '検索可能にするかどうか',
        searchMethod: '検索メソッド',
        searchDelay: '検索遅延時間',
        clearable: 'クリア可能にするかどうか',
        readonly: '読み取り専用状態',
        disabled: '無効状態',
        showCheckIcon: 'チェックアイコンを表示'
      },
      events: {
        change: '値が変更された時に発火',
        clear: 'クリア時に発火',
        blur: 'フォーカスを失った時に発火',
        focus: 'フォーカスを得た時に発火'
      },
      options: { label: 'ラベル', value: '値', disabled: '無効化' },
      slots: {
        item: 'オプション内容のカスタマイズ',
        empty: '空状態のカスタマイズ'
      }
    },
    selectMultiple: {
      name: '複数選択 SelectMultiple',
      description:
        '複数選択可能なドロップダウンボックスで、より柔軟な選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'カスタムフィルター方法'
      },
      demo3: {
        title: 'スロットのサポート'
      },
      demo4: {
        title: '無効化オプション'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効化'
      },
      demo7: {
        title: '空状態スロット'
      },
      demo8: {
        title: 'グループ化'
      },
      props: {
        options: 'オプション',
        trigger: 'トリガー方式',
        width: '幅',
        valueLayout: '値のレイアウト',
        valueTextSplit: '値テキストの区切り文字',
        placeholder: 'プレースホルダーテキスト',
        size: 'サイズ',
        itemHeight: '項目の高さ',
        searchable: '検索可能にするかどうか',
        searchPlaceholder: '検索プレースホルダーテキスト',
        searchMethod: '検索メソッド',
        searchDelay: '検索遅延時間',
        clearable: 'クリア可能にするかどうか',
        readonly: '読み取り専用',
        disabled: '無効化',
        showCheckIcon: 'チェックアイコンを表示',
        defaultValue: 'デフォルト値'
      },
      model: {
        modelValue: 'バインド値'
      },
      events: {
        change: '値の変更',
        blur: 'フォーカスを失う',
        focus: 'フォーカスを得る'
      },
      options: { label: 'ラベル', value: '値', disabled: '無効化' },
      slots: {
        item: 'オプション内容のカスタマイズ',
        empty: '空状態のカスタマイズ'
      }
    },
    datePicker: {
      name: '日付選択 DatePicker',
      description: 'シンプルで直感的な日付選択ツール、より正確な時間選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'クリア可能'
      },
      demo3: {
        title: 'カスタムフォーマット'
      },
      demo4: {
        title: 'プリセット'
      },
      demo5: {
        title: '読み取り専用'
      },
      demo6: {
        title: '無効化'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        valueFormat: '値のフォーマット',
        size: 'サイズ',
        width: '幅',
        placeholder: 'プレースホルダーテキスト',
        clearable: 'クリア可能にするかどうか',
        readonly: '読み取り専用',
        disabled: '無効化',
        presets: 'プリセット値'
      },
      events: {
        change: '値の変更',
        focus: 'フォーカスを得る',
        blur: 'フォーカスを失う',
        clear: 'クリア'
      }
    },
    dateRangePicker: {
      name: '期間選択 DateRangePicker',
      description: '期間選択のための便利なツール、より簡単な範囲選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'クリア可能'
      },
      demo3: {
        title: 'その他'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        startKey: '開始キー',
        endKey: '終了キー',
        valueFormat: '値のフォーマット',
        size: 'サイズ',
        width: '幅',
        placeholderStart: '開始日プレースホルダー',
        placeholderEnd: '終了日プレースホルダー',
        clearable: 'クリア可能にするかどうか',
        readonly: '読み取り専用',
        disabled: '無効化'
      },
      events: {
        change: '値の変更',
        focus: 'フォーカスを得る',
        blur: 'フォーカスを失う',
        clear: 'クリア'
      }
    },
    cascader: {
      name: 'カスケード選択 Cascader',
      description: '階層データを扱う選択器、より明確なカテゴリー選択を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'フリーモード'
      },
      demo3: {
        title: '最終レベルのみ表示'
      },
      demo4: {
        title: '非同期読み込み'
      },
      demo5: {
        title: 'クリア可能'
      },
      demo6: {
        title: '読み取り専用'
      },
      demo7: {
        title: '無効化'
      },
      demo8: {
        title: 'オプション無効化'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        width: '幅',
        options: 'オプション',
        placeholder: 'プレースホルダーテキスト',
        disabled: '無効化',
        clearable: 'クリア可能にするかどうか',
        showAllLevels: '全レベルを表示',
        multiple: '複数選択可能',
        free: '自由選択',
        size: 'サイズ',
        trigger: 'トリガー方式',
        loadMethod: '読み込みメソッド',
        readonly: '読み取り専用'
      },
      options: {
        label: 'ラベル',
        value: '値',
        isLeaf: 'リーフノードかどうか',
        children: '子ノード',
        disabled: '無効化'
      }
    },
    treeSelect: {
      name: 'ツリー選択 TreeSelect',
      description: 'ツリー構造の選択ボックス、より直感的な階層選択を実現',
      demo1: {
        title: '通常'
      },
      demo2: {
        title: '非同期データ読み込み'
      },
      demo3: {
        title: 'カスタムスロット'
      },
      demo4: {
        title: '項目の無効化'
      },
      demo5: {
        title: 'デフォルトで全展開'
      },
      demo6: {
        title: '検索可能'
      },
      demo7: {
        title: '空状態スロット'
      },
      demo8: {
        title: 'その他'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        dataSource: 'ツリーデータソース',
        defaultValue: 'デフォルト選択値',
        placeholder: 'プレースホルダーテキスト',
        size: 'コンポーネントサイズ',
        disabled: '無効化するかどうか',
        clearable: 'クリア可能にするかどうか',
        checkable: 'チェックボックスを表示',
        showAllLevels: '全レベルを表示',
        showCheckIcon: '選択アイコンを表示',
        showLine: '接続線を表示',
        expandAll: '全ノードを展開',
        searchable: '検索可能にするかどうか',
        searchDelay: '検索遅延時間（ミリ秒）',
        readonly: '読み取り専用にするかどうか',
        free: '自由モード（親子ノードの選択状態を独立）',
        align: 'テキスト配置',
        trigger: '子ノードのトリガー方式',
        keyField: 'ノード識別フィールド',
        labelField: 'ノードラベルフィールド',
        disabledField: 'ノード無効化フィールド',
        initTree: 'ツリーノード初期化メソッド',
        loadMethod: '子ノードデータの非同期読み込みメソッド'
      },
      slots: {
        handle: 'スロット名'
      }
    },
    inputTable: {
      name: 'テーブル入力 InputTable',
      description: 'テーブル内でデータを素早く入力し、一括処理をより効率的に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'デフォルト値'
      },
      demo3: {
        title: '高度な使い方'
      },
      props: {
        columns: '列の設定',
        size: 'サイズ',
        width: '幅',
        rowKey: '行キー',
        batchDeletable: '一括削除を許可',
        addable: '追加可能',
        defaultForm: 'デフォルトフォーム',
        deletable: '削除可能',
        maxRows: '最大行数',
        minRows: '最小行数',
        clearable: 'クリア可能',
        sortable: 'ソート可能',
        autoUniqueId: '自動ID生成',
        uniqueField: 'ユニークフィールド',
        sortTooltipCustomRender: 'ソートツールチップのカスタムレンダリング'
      }
    },
    switch: {
      name: 'スイッチ Switch',
      description: 'シンプルな切り替えコントロール、状態の変更をより明確に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '四角形'
      },
      demo3: {
        title: 'リクエストのシミュレーション'
      },
      demo4: {
        title: '読み取り専用'
      },
      demo5: {
        title: '無効'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      props: {
        size: 'サイズ',
        round: '角丸',
        readonly: '読み取り専用',
        disabled: '無効',
        request: 'リクエスト',
        loading: '読み込み中'
      },
      events: {
        change: 'イベント名'
      }
    },
    slider: {
      name: 'スライダー Slider',
      description: 'ドラッグで数値を選択、より直感的な数値選択を実現',
      demo1: {
        title: 'サイズ'
      },
      demo2: {
        title: '異なるステップ'
      },
      demo3: {
        title: '範囲制限'
      },
      demo4: {
        title: '読み取り専用'
      },
      demo5: {
        title: '無効'
      },
      demo6: {
        title: '設定オプション'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      props: {
        size: 'サイズ',
        min: '最小値',
        max: '最大値',
        step: 'ステップ',
        readonly: '読み取り専用',
        disabled: '無効',
        options: 'オプション',
        formatTooltip: 'ツールチップのフォーマット'
      }
    },
    sliderRange: {
      name: '範囲スライダー SliderRange',
      description: '数値範囲を選択するスライダー、より柔軟な範囲選択を実現',
      demo1: {
        title: 'サイズ'
      },
      demo2: {
        title: '異なるステップ'
      },
      demo3: {
        title: '範囲制限'
      },
      demo4: {
        title: '読み取り専用'
      },
      demo5: {
        title: '無効'
      },
      demo6: {
        title: '設定オプション'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      props: {
        size: 'サイズ',
        min: '最小値',
        max: '最大値',
        step: 'ステップ',
        readonly: '読み取り専用',
        disabled: '無効',
        options: 'オプション',
        formatTooltip: 'ツールチップのフォーマット'
      }
    },
    rate: {
      name: '評価 Rate',
      description: '星による評価コンポーネント、より生き生きとした評価を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '読み取り専用'
      },
      demo3: {
        title: '無効'
      },
      demo4: {
        title: 'ヒント'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      props: {
        size: 'サイズ',
        count: '数量',
        tips: 'ヒント',
        readonly: '読み取り専用',
        disabled: '無効'
      }
    },
    colorPicker: {
      name: 'カラーピッカー ColorPicker',
      description: '豊富な色選択ツール、より正確な配色を実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '異なるサイズ'
      },
      demo3: {
        title: 'カスタム幅'
      },
      demo4: {
        title: '無効状態'
      },
      demo5: {
        title: '読み取り専用状態'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      props: {
        size: 'サイズ',
        width: '幅',
        placeholder: 'プレースホルダー',
        disabled: '無効',
        readonly: '読み取り専用'
      }
    },
    upload: {
      name: 'アップロード Upload',
      description:
        'ファイルアップロードコンポーネント、より簡単なファイル処理を実現',
      demo1: {
        title: '通常'
      },
      demo2: {
        title: '形式とサイズの制限'
      },
      demo3: {
        title: '画像アップロード'
      },
      demo4: {
        title: 'カスタムヒント'
      },
      demo5: {
        title: 'フォトウォール'
      },
      demo6: {
        title: 'アップロードなし'
      },
      demo7: {
        title: 'プレビュー'
      },
      model: {
        modelValue: 'バインド値'
      },
      props: {
        accept: '許可するファイル形式',
        immediate: '即時アップロード',
        multiple: '複数ファイル',
        disabled: '無効',
        readonly: '読み取り専用',
        limit: 'ファイル数制限',
        maxFileSize: '最大ファイルサイズ',
        size: 'サイズ',
        tips: 'ヒント情報',
        uploadHelper: 'アップロードヘルパー',
        viewMode: '表示モード'
      }
    },
    table: {
      name: 'テーブル Table',
      description: '強力なテーブルコンポーネント、よりクリアなデータ表示を実現',
      model: {
        modelValue: 'パラメータ名',
        selectedKeys: '選択されたキー',
        sortValue: 'ソート値'
      },
      demo1: {
        title: '通常'
      },
      demo2: {
        title: '固定行列'
      },
      demo3: {
        title: 'カスタム操作'
      },
      demo4: {
        title: 'スロット'
      },
      demo5: {
        title: 'カスタムスタイル'
      },
      demo6: {
        title: '選択'
      },
      demo7: {
        title: 'ソート可能'
      },
      demo8: {
        title: 'カスタムレンダリング'
      },
      demo9: {
        title: '完全機能'
      },
      demo10: {
        title: 'データなし'
      },
      demo11: {
        title: 'グループヘッダー',
        tipsTitle: '制限に関する注意',
        tipsContent:
          'グループヘッダーで固定列の効果を得たい場合、すべての固定列ヘッダーに幅を設定する必要があります。すべての親ノードを含め、そうしないと位置ずれが発生する可能性があります。'
      },
      props: {
        columns: '列',
        dataSource: 'データソース',
        bordered: 'ボーダーの有無',
        size: 'サイズ',
        checkable: 'チェック可能',
        maxHeight: '最大高さ',
        multiple: '複数選択',
        rowKey: '行キー',
        sortTooltipCustomRender: 'ソートツールチップのカスタムレンダリング',
        sortable: 'ソート可能'
      },
      tableColumns: {
        field: 'フィールド',
        fixed: '固定',
        title: 'タイトル',
        type: 'タイプ',
        width: '幅',
        x: 'X軸',
        customRender: 'カスタムレンダリング'
      }
    },
    pagination: {
      name: 'ページネーション Pagination',
      description:
        'クリアなページナビゲーション、より快適なデータブラウジングを実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '大量データ'
      },
      demo3: {
        title: '非同期シミュレーション'
      },
      model: {
        total: 'パラメータ名',
        currentPage: '現在のページ',
        pageSize: 'ページサイズ'
      },
      props: {
        size: 'サイズ',
        pageSizeOptions: 'ページサイズオプション',
        visiblePagesCount: '表示ページ数'
      },
      events: {
        change: 'イベント名'
      }
    },
    magicNumber: {
      name: 'マジックナンバー MagicNumber',
      description: '数字表示をより魅力的にするアニメーションコンポーネント'
    },
    tree: {
      name: 'ツリー Tree',
      description:
        '階層データ構造を表示するための強力なツール、データの階層をより明確に',
      demo1: {
        title: '通常'
      },
      demo2: {
        title: 'チェックボックス表示'
      },
      demo3: {
        title: '複数選択'
      },
      demo4: {
        title: '親子ノード連動モード'
      },
      demo5: {
        title: '非同期リクエスト'
      },
      demo6: {
        title: 'デフォルトで全展開'
      },
      demo7: {
        title: 'ガイドライン表示'
      },
      demo8: {
        title: 'スロット'
      },
      model: {
        modelValue: 'パラメータ名',
        expandedKeys: '展開されたノードキー'
      },
      props: {
        dataSource: 'データソース',
        multiple: '複数選択',
        height: '高さ',
        searchable: '検索可能',
        checkable: 'チェックボックス表示',
        expandAll: 'デフォルトで全展開',
        free: '自由選択',
        showLine: 'ガイドライン表示',
        trigger: 'トリガー方式',
        placeholder: 'プレースホルダー',
        keyField: 'ノード識別フィールド',
        labelField: 'ノードラベルフィールド',
        disabledField: '無効ノードフィールド',
        initTree: 'ツリーノード初期化メソッド',
        loadMethod: '子ノードデータ非同期読み込みメソッド',
        isSelect: '選択状態'
      },
      slots: {
        handle: 'スロット名'
      },
      treeDataSource: {
        label: 'ラベル',
        key: 'キー',
        isLeaf: 'リーフノードか',
        children: '子ノード',
        disabled: '無効'
      }
    },
    collapse: {
      name: 'コラプス Collapse',
      description:
        '折りたたみ可能なコンテンツ領域で、情報をより整理された形で表示',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'タイトルスロット'
      },
      demo3: {
        title: 'アコーディオン'
      },
      model: {
        modelValue: 'パラメータ名'
      },
      'model(CollapseItem)': {
        modelValue: 'パラメータ名'
      },
      props: {
        width: '幅'
      },
      'props(CollapseItem)': {
        collapseKey: '折りたたみキー',
        title: 'タイトル',
        radius: '角丸の半径'
      }
    },
    desc: {
      name: '説明リスト Desc',
      description: '複数のフィールドを整然と表示し、情報をより体系的に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '方向'
      },
      demo3: {
        title: 'リッチな表示'
      },
      demo4: {
        title: 'オンライン設定対応'
      },
      props: {
        options: 'オプション',
        dataSource: 'データソース',
        size: 'サイズ',
        labelX: 'ラベルX座標',
        valueX: '値X座標',
        gap: '間隔',
        width: '幅',
        columns: '列数',
        labelWidth: 'ラベル幅',
        direction: '方向',
        bordered: 'ボーダーの有無'
      },
      descItemProps: {
        label: 'ラベル',
        field: 'フィールド',
        size: 'サイズ',
        bordered: 'ボーダーの有無',
        width: '幅',
        labelWidth: 'ラベル幅',
        direction: '方向',
        tips: 'ヒント情報',
        type: 'タイプ',
        labelX: 'ラベルX座標',
        valueX: '値X座標',
        gridArea: 'グリッド領域',
        customRender: 'カスタムレンダリング'
      }
    },
    alert: {
      name: 'アラート Alert',
      description: '目立つ情報提示ボックスで、警告をより穏やかに',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'スロット対応'
      },
      demo3: {
        title: '様々なシーン'
      },
      props: {
        type: 'タイプ',
        title: 'タイトル',
        content: 'アラート内容',
        closeable: '閉じることができるかどうか',
        footer: 'フッター内容'
      }
    },
    message: {
      name: 'メッセージ Message',
      description:
        '画面上部に表示される簡潔なメッセージで、操作の結果をすばやく伝えます',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'タイプ'
      },
      demo3: {
        title: 'リクエストのシミュレーション'
      },
      events: {
        close: '閉じられたときに発火'
      },
      props: {
        type: 'タイプ',
        content: '内容',
        duration: '表示時間'
      }
    },
    notification: {
      name: '通知 Notification',
      description:
        '画面の隅に表示される通知メッセージで、重要な情報をより効果的に伝達します',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'タイプ'
      },
      demo3: {
        title: 'カスタム幅'
      },
      demo4: {
        title: 'プログレスバーの表示'
      },
      demo5: {
        title: '手動で閉じる'
      },
      props: {
        type: '通知タイプ',
        title: 'タイトル',
        content: '通知内容',
        delay: '遅延時間'
      }
    },
    drawer: {
      name: 'ドロワー Drawer',
      description:
        'サイドから滑り出す面板で、よりスムーズな操作体験を提供します',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '非同期で閉じる'
      },
      demo3: {
        title: 'カスタムヘッダーとフッター'
      },
      demo4: {
        title: 'ESCキーで閉じる設定'
      },
      demo5: {
        title: 'オーバーレイクリックで閉じる'
      },
      demo6: {
        title: 'ネスト'
      },
      model: {
        visible: '表示状態'
      },
      props: {
        title: 'タイトル',
        width: '幅',
        position: '位置',
        height: '高さ',
        closeOnClickOverlay: 'オーバーレイクリックで閉じるかどうか',
        closeByEsc: 'ESCキーで閉じるかどうか',
        hideFooter: 'フッターを非表示にするかどうか',
        okButtonProps: '確認ボタンのプロパティ',
        closeButtonProps: '閉じるボタンのプロパティ',
        zIndex: '重なり順序'
      }
    },
    dialog: {
      name: 'ダイアログ Dialog',
      description:
        'モーダルダイアログで、重要な情報のやり取りをより際立たせます',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'シンプルな例'
      },
      demo3: {
        title: '非同期で閉じる'
      },
      demo4: {
        title: 'ESCキーで閉じる'
      },
      props: {
        type: 'タイプ',
        width: '幅',
        trigger: 'トリガー方式',
        title: 'タイトル',
        okText: '確認ボタンのテキスト',
        cancelText: 'キャンセルボタンのテキスト',
        ok: '確認時のコールバック',
        cancel: 'キャンセル時のコールバック',
        closeOnClickOverlay: 'オーバーレイクリックによる閉じる',
        closeByEsc: 'ESCキーによる閉じる',
        transformOrigin: 'アニメーション原点'
      },
      events: {
        ok: '確認ボタンクリック時のイベント',
        cancel: 'キャンセルボタンクリック時のイベント'
      }
    },
    modal: {
      name: 'モーダル Modal',
      description:
        'より柔軟なモーダルウィンドウで、ポップアップの対話をより豊かに表現します',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '非同期での閉じる'
      },
      demo3: {
        title: 'ヘッダーとフッターのカスタマイズ'
      },
      demo4: {
        title: 'ESCキーでの閉じる設定'
      },
      model: {
        visible: '表示状態'
      },
      props: {
        title: 'タイトル',
        width: '幅',
        top: '上端からの距離',
        hideFooter: 'フッターを非表示にするかどうか',
        closeByEsc: 'ESCキーでの閉じる可否',
        okButtonProps: '確認ボタンのプロパティ',
        closeButtonProps: '閉じるボタンのプロパティ',
        closeOnClickOverlay: 'オーバーレイクリックでの閉じる可否',
        zIndex: '重なり順序'
      }
    },
    popok: {
      name: 'ポップ確認 Popok',
      description: '軽量な確認ポップアップで、操作の確認をより便利にします',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'トリガー方式'
      },
      props: {
        type: 'タイプ',
        width: '幅',
        trigger: 'トリガー方式',
        title: 'タイトル',
        content: '内容',
        placement: '表示位置',
        ok: '確認時のコールバック',
        cancel: 'キャンセル時のコールバック',
        okText: '確認ボタンのテキスト',
        cancelText: 'キャンセルボタンのテキスト'
      }
    },
    popover: {
      name: 'ポップオーバー Popover',
      description: 'マウスホバー時の情報カードで、ヒントをより優雅に表示します',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'トリガー方式'
      },
      demo3: {
        title: 'カスタムトリガー'
      },
      demo4: {
        title: 'ポップオーバー領域外クリックで自動閉じる'
      },
      demo5: {
        title: '読み込み状態'
      },
      props: {
        trigger: 'トリガー方式',
        placement: '表示位置',
        disabled: '無効状態',
        loading: '読み込み中',
        hideOnClick: 'クリック時に非表示',
        offset: 'オフセット',
        popoverBodyClassName: 'ポップオーバー本体のクラス名',
        triggerTarget: 'トリガー対象'
      },
      slots: {
        trigger: 'トリガースロット',
        'popover-body': 'ポップオーバー本体スロット'
      }
    },
    tooltip: {
      name: 'ツールチップ Tooltip',
      description: 'シンプルなテキストヒントで、情報をより軽やかに表示します',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'クリックでトリガー'
      },
      demo3: {
        title: '遅延時間'
      },
      demo4: {
        title: 'HTMLサポート'
      },
      props: {
        tips: 'ヒント内容',
        placement: '表示位置',
        trigger: 'トリガー方式',
        allowHTML: 'HTMLの許可',
        delay: '遅延時間'
      }
    },
    loading: {
      name: 'ローディング Loading',
      description: 'エレガントな読み込み効果で、待機をより快適に',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'カスタムアイコンサイズ'
      },
      demo3: {
        title: 'カスタムヒントメッセージ'
      },
      props: {
        tip: 'ヒントメッセージ',
        iconSize: 'アイコンサイズ',
        visible: '表示状態'
      }
    },
    result: {
      name: '結果表示 Result',
      description: '操作結果をフィードバックし、より完全な結果表示を実現します',
      demo1: {
        title: '基本的な使い方'
      },
      props: {
        type: 'タイプ',
        title: 'タイトル',
        content: '表示内容'
      },
      slots: {
        handle: 'カスタム処理用スロット'
      }
    },
    empty: {
      name: '空の状態 Empty',
      description: '空のデータ状態表示、空白ページをよりフレンドリーに',
      demo1: {
        title: '基本的な使い方'
      },
      props: {
        type: 'タイプ',
        title: 'タイトル',
        fontSize: 'フォントサイズ',
        padding: 'パディング',
        width: '幅',
        height: '高さ'
      }
    },
    actionBox: {
      name: 'アクションボックス',
      description: '柔軟な操作ボタンで、ユーザーが素早く操作できます',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: 'ドロップダウンメニュー'
      },
      demo3: {
        title: 'カスタムアイコン'
      },
      demo4: {
        title: 'カスタムスタイル'
      },
      props: {
        options: 'アクションボタンの設定',
        dropdownThreshold: 'ドロップダウンメニューのしきい値',
        dropdownLabel: 'ドロップダウンメニューのテキスト',
        dropdownIcon: 'ドロップダウンメニューのアイコン',
        divider: '区切り線の表示',
        iconOnly: 'アイコンのみ'
      },
      options: {
        label: 'アクションボタンのテキスト',
        icon: 'アクションボタンのアイコン',
        onClick: 'アクションボタンのクリックイベント',
        customRender: 'カスタムレンダリング内容'
      }
    }
  }
}
