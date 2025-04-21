const contextMenu = {
  label: '표시 텍스트',
  value: '값',
  renderIcon: '아이콘 렌더링 함수',
  children: '하위 노드 모음',
  disabled: '비활성화 옵션',
  isDividerLine: '구분선 여부',
  checkbox: '체크박스 여부',
  checked: '선택 여부'
}

export default {
  name: 'ko',
  home: {
    title: 'Lew UI',
    description: '아름답고 사용하기 쉬운 Vue3 컴포넌트 라이브러리',
    getStarted: '시작하기',
    sloganTitle: '단순함이 최고',
    slogan: '아름답고 사용하기 쉬운 Vue3 컴포넌트 라이브러리',
    home: '홈',
    install: '설치',
    components: '컴포넌트',
    formEngine: '폼 엔진',
    descEngine: '설명 엔진'
  },
  base: {
    base: '기본',
    navigator: '네비게이션',
    form: '폼',
    data: '데이터 컴포넌트',
    feedback: '피드백',
    close: '닫기',
    showCode: '코드 보기'
  },
  components: {
    image: {
      name: '이미지 Image',
      description: '이미지 표시 및 미리보기 기능을 제공하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '미리보기'
      },
      demo3: {
        title: '오류 처리'
      },
      props: {
        src: '이미지 소스',
        width: '너비',
        height: '높이',
        radius: '반경',
        preview: '미리보기',
        error: '오류 처리'
      }
    },
    avatar: {
      name: '아바타 Avatar',
      description: '사용자 프로필 이미지를 표시하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      demo3: {
        title: '그룹'
      },
      props: {
        src: '이미지 소스',
        size: '크기',
        shape: '모양',
        text: '텍스트',
        icon: '아이콘'
      }
    },
    button: {
      name: '버튼 Button',
      description: '사용자 상호작용을 위한 기본 버튼 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      demo3: {
        title: '상태'
      },
      props: {
        type: '유형',
        size: '크기',
        disabled: '비활성화',
        loading: '로딩',
        block: '블록',
        icon: '아이콘'
      }
    },
    text: {
      name: '텍스트 Text',
      description: '텍스트 표시를 위한 기본 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      demo3: {
        title: '정렬'
      },
      props: {
        content: '내용',
        size: '크기',
        align: '정렬',
        color: '색상',
        weight: '굵기'
      }
    },
    textTrim: {
      name: '텍스트 자르기 TextTrim',
      description: '긴 텍스트를 자르고 말줄임표를 표시하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '행 수'
      },
      props: {
        content: '내용',
        rows: '행 수',
        ellipsis: '말줄임표',
        expandable: '확장 가능'
      }
    },
    flex: {
      name: '플렉스 Flex',
      description: '유연한 레이아웃을 위한 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '정렬'
      },
      props: {
        direction: '방향',
        justify: '정렬',
        align: '수직 정렬',
        wrap: '줄바꿈',
        gap: '간격'
      }
    },
    mark: {
      name: '마크 Mark',
      description: '텍스트를 강조하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '색상'
      },
      props: {
        content: '내용',
        color: '색상',
        background: '배경색'
      }
    },
    icon: {
      name: '아이콘 Icon',
      description: '아이콘을 표시하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      props: {
        name: '이름',
        size: '크기',
        color: '색상',
        spin: '회전'
      }
    },
    backTop: {
      name: '맨 위로 BackTop',
      description: '페이지 상단으로 돌아가는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '커스텀'
      },
      props: {
        target: '대상',
        visibilityHeight: '가시성 높이',
        right: '오른쪽 위치',
        bottom: '아래쪽 위치'
      }
    },
    steps: {
      name: '단계 Steps',
      description: '단계별 진행 상태를 표시하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '방향'
      },
      model: {
        current: '현재 단계'
      },
      props: {
        direction: '방향',
        current: '현재 단계',
        size: '크기',
        status: '상태'
      }
    },
    menu: {
      name: '메뉴 Menu',
      description: '네비게이션 메뉴 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '모드'
      },
      model: {
        selectedKeys: '선택된 키'
      },
      props: {
        mode: '모드',
        theme: '테마',
        selectedKeys: '선택된 키',
        openKeys: '열린 키'
      }
    },
    menuTree: {
      name: '메뉴 트리 MenuTree',
      description: '계층적 메뉴 구조를 표시하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '선택 가능'
      },
      model: {
        selectedKeys: '선택된 키',
        expandedKeys: '확장된 키'
      },
      props: {
        dataSource: '데이터 소스',
        checkable: '선택 가능',
        multiple: '다중 선택',
        defaultExpandAll: '기본 확장'
      }
    },
    dropdown: {
      name: '드롭다운 Dropdown',
      description: '드롭다운 메뉴 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '트리거'
      },
      props: {
        trigger: '트리거',
        placement: '위치',
        disabled: '비활성화',
        overlay: '오버레이'
      }
    },
    breadcrumb: {
      name: '경로 표시 Breadcrumb',
      description: '현재 위치를 표시하는 경로 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '구분자'
      },
      props: {
        separator: '구분자',
        routes: '경로',
        maxCount: '최대 개수'
      }
    },
    form: {
      name: '폼 Form',
      description: '폼 데이터를 관리하는 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '레이아웃'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        layout: '레이아웃',
        labelWidth: '레이블 너비',
        labelPosition: '레이블 위치',
        size: '크기',
        disabled: '비활성화'
      }
    },
    input: {
      name: '입력 Input',
      description: '텍스트 입력을 위한 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        type: '유형',
        size: '크기',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        readonly: '읽기 전용',
        clearable: '지우기 가능'
      }
    },
    inputNumber: {
      name: '숫자 입력 InputNumber',
      description: '숫자 입력을 위한 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '범위'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        min: '최소값',
        max: '최대값',
        step: '단계',
        precision: '정밀도',
        size: '크기',
        disabled: '비활성화'
      }
    },
    textarea: {
      name: '텍스트 영역 Textarea',
      description: '여러 줄 텍스트 입력을 위한 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '자동 크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        rows: '행 수',
        autosize: '자동 크기',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        readonly: '읽기 전용'
      }
    },
    inputTag: {
      name: '태그 입력 InputTag',
      description: '태그 입력을 위한 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '유효성 검사'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        readonly: '읽기 전용',
        clearable: '지우기 가능',
        validate: '유효성 검사'
      }
    },
    checkbox: {
      name: '체크박스 Checkbox',
      description: '체크박스 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '그룹'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        label: '레이블',
        value: '값',
        disabled: '비활성화',
        indeterminate: '불확정'
      }
    },
    radio: {
      name: '라디오 Radio',
      description: '라디오 버튼 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '그룹'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        label: '레이블',
        value: '값',
        disabled: '비활성화'
      }
    },
    tabs: {
      name: '탭 Tabs',
      description: '탭 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '위치'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        type: '유형',
        position: '위치',
        size: '크기',
        animated: '애니메이션'
      }
    },
    select: {
      name: '선택 Select',
      description: '선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '검색'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        options: '옵션',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        filterable: '필터링 가능'
      }
    },
    selectMultiple: {
      name: '다중 선택 SelectMultiple',
      description: '다중 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '태그'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        options: '옵션',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        multiple: '다중 선택'
      }
    },
    datePicker: {
      name: '날짜 선택 DatePicker',
      description: '날짜 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '범위'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        type: '유형',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        format: '형식'
      }
    },
    dateRangePicker: {
      name: '날짜 범위 선택 DateRangePicker',
      description: '날짜 범위 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '단축키'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        type: '유형',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        format: '형식'
      }
    },
    cascader: {
      name: '계단식 선택 Cascader',
      description: '계단식 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '검색'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        options: '옵션',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        filterable: '필터링 가능'
      }
    },
    treeSelect: {
      name: '트리 선택 TreeSelect',
      description: '트리 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '다중 선택'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        dataSource: '데이터 소스',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        clearable: '지우기 가능',
        multiple: '다중 선택'
      }
    },
    inputTable: {
      name: '테이블 입력 InputTable',
      description: '테이블 입력 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '유효성 검사'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        columns: '열',
        dataSource: '데이터 소스',
        disabled: '비활성화',
        readonly: '읽기 전용',
        validate: '유효성 검사'
      }
    },
    switch: {
      name: '스위치 Switch',
      description: '스위치 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        size: '크기',
        disabled: '비활성화',
        loading: '로딩',
        activeText: '활성 텍스트',
        inactiveText: '비활성 텍스트'
      }
    },
    slider: {
      name: '슬라이더 Slider',
      description: '슬라이더 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '범위'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        min: '최소값',
        max: '최대값',
        step: '단계',
        disabled: '비활성화',
        marks: '표시'
      }
    },
    sliderRange: {
      name: '범위 슬라이더 SliderRange',
      description: '범위 슬라이더 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '범위'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        min: '최소값',
        max: '최대값',
        step: '단계',
        disabled: '비활성화',
        marks: '표시'
      }
    },
    rate: {
      name: '평가 Rate',
      description: '평가 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        count: '개수',
        size: '크기',
        disabled: '비활성화',
        allowHalf: '반값 허용',
        texts: '텍스트'
      }
    },
    colorPicker: {
      name: '색상 선택 ColorPicker',
      description: '색상 선택 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '알파'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        disabled: '비활성화',
        showAlpha: '알파 표시',
        showInput: '입력 표시',
        format: '형식'
      }
    },
    upload: {
      name: '업로드 Upload',
      description: '파일 업로드 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '드래그'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        accept: '수락',
        multiple: '다중',
        disabled: '비활성화',
        drag: '드래그',
        limit: '제한'
      }
    },
    table: {
      name: '테이블 Table',
      description: '테이블 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '선택'
      },
      model: {
        modelValue: '모델 값',
        selectedKeys: '선택된 키'
      },
      props: {
        columns: '열',
        dataSource: '데이터 소스',
        size: '크기',
        bordered: '테두리',
        selection: '선택'
      }
    },
    pagination: {
      name: '페이지네이션 Pagination',
      description: '페이지네이션 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값',
        pageSize: '페이지 크기'
      },
      props: {
        total: '전체',
        pageSize: '페이지 크기',
        size: '크기',
        showSizeChanger: '크기 변경 표시',
        showQuickJumper: '빠른 이동 표시'
      }
    },
    magicNumber: {
      name: '마법 숫자 MagicNumber',
      description: '마법 숫자 컴포넌트'
    },
    tree: {
      name: '트리 Tree',
      description: '트리 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '선택'
      },
      model: {
        modelValue: '모델 값',
        selectedKeys: '선택된 키',
        expandedKeys: '확장된 키'
      },
      props: {
        dataSource: '데이터 소스',
        checkable: '선택 가능',
        multiple: '다중 선택',
        defaultExpandAll: '기본 확장',
        showLine: '선 표시'
      }
    },
    collapse: {
      name: '접기 Collapse',
      description: '접기 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '아코디언'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        accordion: '아코디언',
        bordered: '테두리',
        ghost: '고스트'
      }
    },
    desc: {
      name: '설명 Desc',
      description: '설명 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '레이아웃'
      },
      props: {
        title: '제목',
        column: '열',
        size: '크기',
        bordered: '테두리',
        layout: '레이아웃'
      }
    },
    alert: {
      name: '경고 Alert',
      description: '경고 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '유형'
      },
      props: {
        type: '유형',
        title: '제목',
        description: '설명',
        showIcon: '아이콘 표시',
        closable: '닫기 가능'
      }
    },
    message: {
      name: '메시지 Message',
      description: '메시지 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '유형'
      },
      props: {
        type: '유형',
        content: '내용',
        duration: '지속 시간',
        showClose: '닫기 표시'
      }
    },
    notification: {
      name: '알림 Notification',
      description: '알림 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '유형'
      },
      props: {
        type: '유형',
        title: '제목',
        content: '내용',
        duration: '지속 시간',
        showClose: '닫기 표시'
      }
    },
    drawer: {
      name: '서랍 Drawer',
      description: '서랍 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '위치'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        title: '제목',
        width: '너비',
        placement: '위치',
        closable: '닫기 가능',
        maskClosable: '마스크 클릭 가능'
      }
    },
    dialog: {
      name: '대화상자 Dialog',
      description: '대화상자 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        title: '제목',
        width: '너비',
        visible: '표시',
        closable: '닫기 가능',
        maskClosable: '마스크 클릭 가능'
      }
    },
    modal: {
      name: '모달 Modal',
      description: '모달 컴포넌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      model: {
        modelValue: '모델 값'
      },
      props: {
        title: '제목',
        width: '너비',
        visible: '표시',
        closable: '닫기 가능',
        maskClosable: '마스크 클릭 가능'
      }
    },
    popok: {
      name: '팝업 확인 Popok',
      description: '팝업 확인 대화상자',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '트리거 방식'
      },
      props: {
        type: '유형',
        width: '너비',
        trigger: '트리거 방식',
        title: '제목',
        okProps: '확인 버튼 속성',
        cancelProps: '취소 버튼 속성',
        content: '내용',
        placement: '위치'
      }
    },
    popover: {
      name: '팝오버 Popover',
      description: '마우스 오버 시 정보 카드',
      demo1: {
        title: '기본 사용법'
      },
      props: {
        trigger: '트리거 방식',
        placement: '위치',
        disabled: '비활성화 상태',
        loading: '로딩 상태',
        hideOnClick: '클릭 시 숨김',
        offset: '오프셋',
        popoverBodyClassName: '팝오버 내용 클래스명',
        triggerTarget: '트리거 대상'
      },
      slots: {
        trigger: '트리거 슬롯',
        'popover-body': '팝오버 내용 슬롯'
      }
    },
    tooltip: {
      name: '툴팁 Tooltip',
      description: '간단한 텍스트 툴팁',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '클릭 트리거'
      },
      props: {
        tips: '팁 내용',
        placement: '위치',
        trigger: '트리거 방식',
        allowHTML: 'HTML 지원 여부',
        delay: '지연 시간'
      }
    },
    loading: {
      name: '로딩 Loading',
      description: '로딩 효과',
      demo1: {
        title: '기본 사용법'
      },
      props: {
        tip: '팁 메시지',
        placement: '팁 위치',
        trigger: '트리거 방식',
        allowHTML: 'HTML 허용'
      }
    },
    result: {
      name: '결과 Result',
      description: '작업 결과 피드백',
      demo1: {
        title: '기본 사용법'
      },
      props: {
        type: '유형',
        title: '제목',
        content: '내용'
      },
      slots: {
        handle: '처리 슬롯'
      }
    },
    empty: {
      name: '빈 상태 Empty',
      description: '빈 데이터 상태 표시',
      demo1: {
        title: '기본 사용법'
      },
      props: {
        type: '유형',
        title: '제목',
        fontSize: '글꼴 크기',
        padding: '내부 여백',
        width: '너비',
        height: '높이'
      }
    }
  }
}
