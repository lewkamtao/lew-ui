export default {
  name: 'ja',
  image: {
    fail: '画像を読み込めませんでした。後でもう一度お試しください。',
  },
  input: {
    placeholder: '入力してください',
    copy: 'コピー',
    copySuccess: 'クリップボードにコピーしました',
    copyFailed: 'コピーに失敗しました。もう一度お試しください',
  },
  inputTag: {
    placeholder: 'タグを入力してEnterキーを押してください',
    maxLength:
      'タグの上限({maxLength}個)に達しました。新しいタグを追加するには、既存のタグを削除してください',
    duplicate: '同じタグが既に存在します。別のタグを入力してください',
  },
  select: {
    placeholder: '選択してください',
    resultCount: '合計{num}件の結果',
    noResult: '結果なし',
    searchPlaceholder: '検索キーワードを入力',
  },
  selectMultiple: {
    placeholder: '選択してください',
    resultCount: '合計{num}件の結果',
    noResult: '結果なし',
    searchPlaceholder: '検索キーワードを入力',
  },
  cascader: {
    placeholder: '選択してください',
    closeText: '閉じる',
    okText: '確定',
    noResult: '結果なし',
  },
  tree: {
    resultCount: '合計{num}件の結果',
    noResult: '結果なし',
    searchPlaceholder: '検索キーワードを入力',
  },
  treeSelect: {
    placeholder: '選択してください',
  },
  textarea: {
    placeholder: '入力してください',
  },
  inputNumber: {
    placeholder: '入力してください',
  },
  datePicker: {
    Mon: '月',
    Tue: '火',
    Wed: '水',
    Thu: '木',
    Fri: '金',
    Sat: '土',
    Sun: '日',
    placeholder: '日付を選択',
  },
  dateRangePicker: {
    placeholderStart: '開始日',
    placeholderEnd: '終了日',
  },
  inputTable: {
    addText: '追加',
    deleteConfirm: '削除確認',
    delete: '削除',
    cancel: 'キャンセル',
    deleteConfirmContent:
      'このデータを削除してもよろしいですか？この操作は即時に反映されます。ご注意ください。',
    minRows: '最小行数に達しているため、削除できません',
    maxRows: '最大行数に達しているため、追加できません',
    uniqueFieldExist:
      'この{label}は既に存在します。重複しない{label}を入力してください。',
    save: '保存',
    modelTitle: 'データ追加',
    editTitle: 'データ編集',
  },
  drawer: {
    closeText: '閉じる',
    okText: '確定',
  },
  modal: {
    closeText: '閉じる',
    okText: '確定',
  },
  dialog: {
    cancelText: 'キャンセル',
    okText: '確定',
  },
  popok: {
    cancelText: 'キャンセル',
    okText: '確定',
  },
  upload: {
    dropActive: 'ドロップしてアップロードを開始',
    click: 'クリックして、',
    paste: '貼り付けて、',
    drag: 'またはファイルをここにドラッグ',
    accept: '{accept}形式のファイルに対応',
    limit: '最大{limit}個のファイルをアップロード可能',
    maxFileSize: '1ファイルあたり{maxFileSize}まで',
  },
  pagination: {
    pageSize: '表示件数：{pageSize}件',
    jumpTo: '移動',
  },
};
