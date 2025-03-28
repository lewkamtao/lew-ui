export default {
  name: 'ja',
  image: {
    fail: '画像を読み込めませんでした。後でもう一度お試しください。'
  },
  input: {
    placeholder: '入力してください',
    copy: 'コピー',
    copySuccess: 'クリップボードにコピーしました',
    copyFailed: 'コピーに失敗しました。もう一度お試しください'
  },
  inputTag: {
    placeholder: 'タグを入力してEnterキーを押してください',
    maxLength:
      'タグの上限({maxLength}個)に達しました。新しいタグを追加するには、既存のタグを削除してください',
    duplicate: '同じタグが既に存在します。別のタグを入力してください'
  },
  select: {
    placeholder: '選択してください'
  },
  selectMultiple: {
    placeholder: '選択してください'
  },
  cascader: {
    placeholder: '選択してください'
  },
  textarea: {
    placeholder: '入力してください'
  },
  datePicker: {
    Mon: '月',
    Tue: '火',
    Wed: '水',
    Thu: '木',
    Fri: '金',
    Sat: '土',
    Sun: '日',
    placeholder: '日付を選択'
  },
  dateRangePicker: {
    placeholderStart: '開始日',
    placeholderEnd: '終了日'
  },
  upload: {
    dropActive: 'ドロップしてアップロードを開始',
    click: 'クリックして、',
    paste: '貼り付けて、',
    drag: 'またはファイルをここにドラッグ',
    accept: '{accept}形式のファイルに対応',
    limit: '最大{limit}個のファイルをアップロード可能',
    maxFileSize: '1ファイルあたり{maxFileSize}まで'
  },
  pagination: {
    pageSize: '表示件数：{pageSize}件'
  }
}
