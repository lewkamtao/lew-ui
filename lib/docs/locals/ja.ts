export default {
  name: 'ja',
  home: {
    title: 'Lew UI',
    description: '美しく使いやすいVue3コンポーネントライブラリ',
    getStarted: '今すぐ始める',
    sloganTitle: 'シンプルイズベスト',
    slogan: '美しく使いやすいVue3コンポーネントライブラリ',
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
    data: 'データ',
    feedback: 'フィードバック'
  },
  components: {
    image: {
      name: '画像 Image',
      description:
        '画像表示をより優雅に。遅延読み込み、ローディング状態、エラー処理などをサポート',
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
        title: '読み込み失敗'
      },
      props: {
        src: '画像のURL',
        alt: '画像の説明',
        width: '幅',
        height: '高さ',
        objectFit: '画像のフィットモード',
        objectPosition: '画像の位置',
        lazy: '遅延読み込みを有効にするかどうか',
        loading: 'ローディング状態を表示するかどうか',
        title: '画像のタイトル'
      }
    },
    avatar: {
      name: 'アバター Avatar',
      description:
        '洗練されたアバターコンポーネント。画像、アイコン、テキストの3つの形式をサポート',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '状態'
      },
      demo3: {
        title: 'デフォルトアバター'
      },
      demo4: {
        title: '形状'
      },
      props: {
        size: 'サイズ',
        loading: 'ローディング状態を表示するかどうか',
        shape: '形状',
        src: '画像のURL',
        alt: '画像の説明',
        status: '状態',
        objectFit: '画像のフィットモード',
        objectPosition: '画像の位置',
        statusPlacement: '状態の位置'
      }
    },
    button: {
      name: 'ボタン Button',
      description: 'クリックでスムーズなインタラクションを実現',
      demo1: {
        title: '基本的な使い方'
      },
      demo2: {
        title: '色'
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
        title: 'Promiseサポート'
      },
      props: {
        text: 'ボタンテキスト',
        type: 'タイプ',
        size: 'サイズ',
        singleIcon: 'アイコンのみ表示するかどうか',
        color: '色',
        round: '角丸にするかどうか',
        dashed: '破線にするかどうか',
        loading: 'ローディング状態を表示するかどうか',
        disabled: '無効状態にするかどうか',
        request: 'リクエストを行うかどうか'
      }
    },
    tag: {
      name: 'タグ Tag',
      description:
        'コンパクトで強力なマーカーツール。コンテンツの分類に彩りを添える',
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
        title: '色'
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
        text: 'タグテキスト。スロットより優先され、幅を超えると text-trim 効果がトリガーされます',
        type: 'スタイルタイプ',
        size: 'サイズ',
        color: 'カラーテーマ',
        closable: '閉じることができるかどうか',
        disabled: '無効にするかどうか',
        round: '角丸にするかどうか'
      }
    },
    badge: {
      name: 'バッジ Badge',
      description: '右上に咲く小さな赤い点で、通知をより目立たせる',
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
        processing: '処理中かどうか',
        max: '最大値、超過すると max+ と表示',
        color: 'バッジの色',
        disabled: '無効にするかどうか',
        value: 'バッジの値（空の場合、ドットとして表示）'
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
        title: '色'
      },
      props: {
        text: 'テキスト内容',
        size: 'タイトルのフォントサイズ。数値（ピクセル単位）または文字列（例："1.5em"）',
        bold: 'タイトルの太さ。100から900の間の100の倍数',
        color: 'タイトルの色。事前定義された色名または任意の色値'
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
      props: {
        text: 'テキスト内容',
        lineClamp: 'テキストの最大行数、超過部分は省略',
        allowHTML: 'HTMLタグのレンダリングを許可するかどうか',
        placement: 'ツールチップの表示位置',
        offset:
          'ツールチップのターゲット要素からのオフセット [x, y]（ピクセル単位）',
        textAlign: 'x軸の配置（幅がコンテナより小さい場合）',
        delay:
          'ツールチップの表示/非表示の遅延時間 [表示遅延, 非表示遅延]（ミリ秒単位）',
        reserveEnd:
          '末尾の保持文字数。テキストがオーバーフローした場合、中央に省略記号を表示し、開始部分と指定された数の末尾文字を保持'
      }
    },
    flex: {
      name: 'フレックスレイアウト Flex',
      description:
        '柔軟なレイアウトソリューションで、ページのレイアウトを自在にコントロール',
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
        mode: '子要素の分布モード。xまたはyの配置設定を上書き。direction値に応じて影響が異なる',
        wrap: 'スペース不足時に子要素の折り返しを許可するかどうか',
        gap: '子要素間の間隔（ピクセル単位）',
        width: 'Flexコンテナの幅（ピクセルまたはパーセント）'
      }
    },
    mark: {
      name: 'マーク Mark',
      description:
        'テキストにハイライトを追加し、重要なコンテンツを一目で分かるように',
      demo1: {
        title: '基本的な使い方'
      },
      props: {
        color: 'カラーテーマ',
        round: '角丸にするかどうか',
        bold: '太字にするかどうか',
        cursor: 'マウスホバー時のカーソルスタイル'
      }
    },
    icon: {
      name: 'アイコン Icon',
      description:
        '美しいアイコンコレクションで、インターフェースにビジュアル言語を追加'
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
          'スクロールイベントをトリガーする対象要素。CSSセレクタを使用。空の場合、ウィンドウ全体がデフォルト',
        right: 'コンポーネントの右端からの距離（ピクセル）',
        bottom: 'コンポーネントの下端からの距離（ピクセル）',
        valveHeight:
          'トップに戻るボタンを表示するスクロール高さのしきい値（ピクセル）'
      },
      events: {
        click: 'トップに戻るイベントコールバック'
      }
    },
    steps: {
      name: 'ステップ Steps',
      description: '操作プロセスを明確に表示し、ユーザーの現在位置を把握'
    },
    menu: {
      name: 'メニュー Menu',
      description: '優雅な垂直メニューで、ナビゲーション階層を明確に'
    },
    menuTree: {
      name: 'メニューツリー MenuTree',
      description:
        '階層が明確なツリー形式のメニューで、複雑な構造関係を簡単に表示'
    },
    dropdown: {
      name: 'ドロップダウン Dropdown',
      description:
        'クリックでトリガーされるフローティングメニューで、操作をより便利に'
    },
    breadcrumb: {
      name: 'パンくず Breadcrumb',
      description: '明確なパスナビゲーションで、ユーザーを迷子にさせない'
    },
    contextMenu: {
      name: 'コンテキストメニュー ContextMenu',
      description: '優雅な右クリックメニューで、操作をより自然に'
    },
    form: {
      name: 'フォーム Form',
      description: '強力なフォーム処理機能で、データ収集を思いのままに'
    },
    input: {
      name: '入力フィールド Input',
      description: '機能豊富な入力フィールドで、データ入力をより便利に'
    },
    inputNumber: {
      name: '数値入力 InputNumber',
      description: '数値入力専用のフィールドで、数値処理をより正確に'
    },
    textarea: {
      name: 'テキストエリア Textarea',
      description: '複数行テキスト入力フィールドで、長文入力をより快適に'
    },
    inputTag: {
      name: 'タグ入力 InputTag',
      description: '複数のタグを簡単に入力・管理し、データ整理をより明確に'
    },
    checkbox: {
      name: 'チェックボックス Checkbox',
      description: '複数選択可能な選択肢で、複数項目の選択をより直感的に'
    },
    radio: {
      name: 'ラジオボタン Radio',
      description: '単一選択のみ可能な選択肢で、単一項目の選択をより明確に'
    },
    tabs: {
      name: 'タブ Tabs',
      description: 'コンテンツをカテゴリー別に表示し、切り替えをよりスムーズに'
    },
    select: {
      name: 'セレクト Select',
      description: 'ドロップダウン選択ボックスで、選択をより便利に'
    },
    selectMultiple: {
      name: '複数選択 SelectMultiple',
      description: '複数選択可能なドロップダウンで、複数項目の選択をより柔軟に'
    },
    datePicker: {
      name: '日付選択 DatePicker',
      description: 'シンプルで直感的な日付選択ツールで、時間選択をより正確に'
    },
    dateRangePicker: {
      name: '日付範囲選択 DateRangePicker',
      description: '時間範囲を選択するツールで、期間選択をより便利に'
    },
    cascader: {
      name: 'カスケード選択 Cascader',
      description:
        '多層階層データを処理する選択器で、カテゴリー選択をより明確に'
    },
    treeSelect: {
      name: 'ツリー選択 TreeSelect',
      description: 'ツリー構造の選択ボックスで、階層選択をより直感的に'
    },
    inputTable: {
      name: 'テーブル入力 InputTable',
      description: 'テーブル内で素早くデータを入力し、一括処理をより効率的に'
    },
    switch: {
      name: 'スイッチ Switch',
      description: 'シンプルなスイッチ選択器で、状態切り替えをより明確に'
    },
    slider: {
      name: 'スライダー Slider',
      description: 'ドラッグで数値を選択し、数値選択をより直感的に'
    },
    sliderRange: {
      name: '範囲スライダー SliderRange',
      description: '数値範囲を選択するスライダーで、範囲選択をより柔軟に'
    },
    rate: {
      name: '評価 Rate',
      description: '星による評価コンポーネントで、採点をより生き生きと'
    },
    colorPicker: {
      name: 'カラーピッカー ColorPicker',
      description: '豊富な色選択ツールで、配色をより正確に'
    },
    upload: {
      name: 'アップロード Upload',
      description:
        'ファイルアップロードコンポーネントで、ファイル処理をより簡単に'
    },
    table: {
      name: 'テーブル Table',
      description: '機能豊富なテーブルコンポーネントで、データ表示をより明確に'
    },
    pagination: {
      name: 'ページネーション Pagination',
      description: '明確なページナビゲーションで、データ閲覧をより快適に'
    },
    magicNumber: {
      name: 'マジックナンバー MagicNumber',
      description: '数字表示をより生き生きとさせるアニメーションコンポーネント'
    },
    tree: {
      name: 'ツリー Tree',
      description: '階層データ構造を表示するツールで、データ階層をより明確に'
    },
    collapse: {
      name: 'コラプス Collapse',
      description:
        '折りたたみ可能なコンテンツ領域で、情報表示をより整理された形に'
    },
    desc: {
      name: '説明リスト Desc',
      description: '複数のフィールドを整然と表示し、情報表示をより規則的に'
    },
    alert: {
      name: 'アラート Alert',
      description: '目立つ情報提示ボックスで、警告をよりソフトに'
    },
    message: {
      name: 'メッセージ Message',
      description: '軽量なフィードバックで、通知をよりシンプルに'
    },
    notification: {
      name: '通知 Notification',
      description:
        '優雅な通知リマインダーで、メッセージプッシュをよりフレンドリーに'
    },
    drawer: {
      name: 'ドロワー Drawer',
      description:
        '画面端からスライドするパネルで、一時的な操作をよりスムーズに'
    },
    dialog: {
      name: 'ダイアログ Dialog',
      description: 'モーダルダイアログで、重要な情報のやり取りをより目立たせる'
    },
    modal: {
      name: 'モーダル Modal',
      description:
        'より柔軟なモーダルウィンドウで、ポップアップインタラクションをより豊かに'
    },
    popok: {
      name: '確認ポップオーバー Popok',
      description: '軽量な確認プロンプトで、操作確認をより便利に'
    },
    popover: {
      name: 'ポップオーバー Popover',
      description: 'マウスホバー時の情報カードで、ヒントをより優雅に'
    },
    tooltip: {
      name: 'ツールチップ Tooltip',
      description: 'シンプルなテキストヒント気泡で、提示をよりコンパクトに'
    },
    loading: {
      name: 'ローディング Loading',
      description: '優雅なローディング効果で、待機をより快適に'
    },
    result: {
      name: '結果 Result',
      description: '操作結果のフィードバックに使用し、結果表示をより完全に'
    },
    empty: {
      name: '空の状態 Empty',
      description: '空データ状態の表示で、空白ページをよりフレンドリーに'
    }
  }
}
