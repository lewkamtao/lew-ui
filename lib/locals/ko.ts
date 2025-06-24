export default {
  name: 'ko',
  image: {
    fail: '이미지를 불러올 수 없습니다. 나중에 다시 시도해주세요',
  },
  input: {
    placeholder: '입력해주세요',
    copy: '복사',
    copySuccess: '클립보드에 복사되었습니다',
    copyFailed: '복사에 실패했습니다. 다시 시도해주세요',
  },
  inputTag: {
    placeholder: '태그를 입력하고 Enter를 눌러주세요',
    maxLength:
      '태그 {maxLength}개 제한에 도달했습니다. 새로운 태그를 추가하려면 기존 태그를 삭제해주세요',
    duplicate: '동일한 태그가 이미 존재합니다. 다른 태그를 입력해주세요',
  },
  select: {
    placeholder: '선택해주세요',
    resultCount: '총 {num}개의 결과',
    noResult: '결과 없음',
    searchPlaceholder: '검색 키워드 입력',
  },
  selectMultiple: {
    placeholder: '선택해주세요',
    resultCount: '총 {num}개의 결과',
    noResult: '결과 없음',
    searchPlaceholder: '검색 키워드 입력',
  },
  cascader: {
    placeholder: '선택해주세요',
    closeText: '닫기',
    okText: '확인',
    noResult: '결과 없음',
  },
  tree: {
    resultCount: '총 {num}개의 결과',
    noResult: '결과 없음',
    searchPlaceholder: '검색 키워드 입력',
  },
  textarea: {
    placeholder: '입력해주세요',
  },
  inputNumber: {
    placeholder: '입력해주세요',
  },
  datePicker: {
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
    Sun: '일',
    placeholder: '날짜 선택',
  },
  dateRangePicker: {
    placeholderStart: '시작일',
    placeholderEnd: '종료일',
  },
  inputTable: {
    addText: '추가',
    deleteConfirm: '삭제 확인',
    delete: '삭제',
    cancel: '취소',
    deleteConfirmContent:
      '이 데이터를 삭제하시겠습니까? 이 작업은 즉시 적용되므로 주의해주세요!',
    minRows: '최소 행 수에 도달하여 삭제할 수 없습니다',
    maxRows: '최대 행 수에 도달하여 추가할 수 없습니다',
    uniqueFieldExist:
      '이 {label}이(가) 이미 존재합니다. 중복되지 않는 {label}을(를) 입력해주세요.',
    save: '저장',
    modelTitle: '데이터 추가',
    editTitle: '데이터 편집',
  },
  drawer: {
    closeText: '닫기',
    okText: '확인',
  },
  modal: {
    closeText: '닫기',
    okText: '확인',
  },
  dialog: {
    cancelText: '취소',
    okText: '확인',
  },
  popok: {
    cancelText: '취소',
    okText: '확인',
  },
  upload: {
    dropActive: '파일을 놓으면 업로드가 시작됩니다',
    click: '클릭하여 업로드',
    paste: '붙여넣기',
    drag: '또는 여기에 파일을 끌어다 놓으세요',
    accept: '{accept} 파일 업로드 가능',
    limit: '최대 {limit}개의 파일을 업로드할 수 있습니다',
    maxFileSize: '파일당 {maxFileSize} 이하여야 합니다',
  },
  pagination: {
    pageSize: '페이지당 {pageSize}개',
    jumpTo: '이동',
  },
};
