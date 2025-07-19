const contextMenu = {
  label: '표시 텍스트',
  value: '값',
  icon: '아이콘 렌더링 함수',
  children: '하위 항목 컬렉션',
  disabled: '비활성화 옵션',
  isDividerLine: '구분선 여부',
  checkable: '체크박스 여부',
  checked: '선택 여부',
  onClick: '클릭 이벤트',
}

export default {
  name: 'ko',
  home: {
    title: 'Lew UI',
    description: '아름답고 사용하기 쉬운 Vue3 컴포넌트 라이브러리',
    getStarted: '시작하기',
    sloganTitle: '적을수록 더 많은 것을',
    slogan: '아름답고 사용하기 쉬운 Vue3 컴포넌트 라이브러리',
    home: '홈',
    install: '설치',
    components: '컴포넌트',
    formEngine: '폼 엔진',
    descEngine: '설명 엔진',
  },
  base: {
    base: '기본',
    navigator: '네비게이션',
    form: '폼',
    data: '데이터 컴포넌트',
    feedback: '피드백',
    close: '닫기',
    showCode: '코드 보기',
  },
  components: {
    image: {
      name: '이미지 Image',
      description:
        '이미지 표시를 더 우아하게, 지연 로딩, 로딩 상태, 오류 처리 등의 기능 지원',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '로딩 상태',
        tipsTitle: '팁',
        tipsContent:
          '로딩 중 플레이스홀더 효과를 위해 너비와 높이를 설정해야 합니다.',
      },
      demo3: {
        title: '로딩 실패',
      },
      props: {
        src: '이미지 주소',
        alt: '이미지 설명',
        width: '너비',
        height: '높이',
        objectFit: '이미지 채우기 모드',
        objectPosition: '이미지 위치',
        lazy: '지연 로딩 활성화 여부',
        loading: '로딩 상태 표시 여부',
        title: '이미지 제목',
      },
    },
    avatar: {
      name: '아바타 Avatar',
      description:
        '세련된 아바타 컴포넌트, 이미지, 아이콘, 텍스트 세 가지 형태 지원',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '상태',
      },
      demo3: {
        title: '기본 아바타',
      },
      demo4: {
        title: '모양',
        description:
          '`shape`을 통해 아바타의 모양을 제어합니다. 선택 가능한 값은 `circle`, `square`, `sharp`입니다.',
      },
      props: {
        size: '크기',
        loading: '로딩 상태 표시 여부',
        shape: '모양',
        src: '이미지 주소',
        alt: '이미지 설명',
        status: '상태',
        objectFit: '이미지 채우기 모드',
        objectPosition: '이미지 위치',
        statusPlacement: '상태 위치',
      },
    },
    button: {
      name: '버튼 Button',
      description: '클릭하면 상호작용이 더 부드럽고 유연해집니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '색상',
      },
      demo3: {
        title: '아이콘',
      },
      demo4: {
        title: '로딩 상태',
      },
      demo5: {
        title: '비활성화 상태',
      },
      demo6: {
        title: 'Promise 지원',
      },
      props: {
        text: '버튼 텍스트',
        type: '유형',
        size: '크기',
        singleIcon: '아이콘만 표시 여부',
        color: '색상',
        round: '둥근 모서리 여부',
        dashed: '점선 여부',
        loading: '로딩 상태 표시 여부',
        disabled: '비활성화 상태 여부',
        request: '요청 여부',
      },
    },
    tag: {
      name: '태그 Tag',
      description: '작지만 강력한 마킹 도구, 콘텐츠 분류에 색상과 스타일 추가',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '유형',
      },
      demo3: {
        title: '크기',
      },
      demo4: {
        title: '색상',
      },
      demo5: {
        title: '비활성화',
      },
      demo6: {
        title: '닫기 가능',
      },
      demo7: {
        title: '슬롯',
      },
      props: {
        text: '태그 텍스트, 슬롯보다 우선순위가 높으며, 너비를 초과하면 text-trim 효과 발생',
        type: '스타일 유형',
        size: '크기',
        color: '색상 테마',
        closable: '닫기 가능 여부',
        disabled: '비활성화 여부',
        round: '둥근 모서리 여부',
        oversize: '더 여유로운 크기',
      },
    },
    badge: {
      name: '배지 Badge',
      description:
        '오른쪽 상단에 표시되는 작은 빨간 점, 알림을 더 눈에 띄게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '점',
      },
      demo3: {
        title: '직접 사용',
      },
      demo4: {
        title: '텍스트',
      },
      demo5: {
        title: '처리 중',
      },
      props: {
        text: '배지 텍스트',
        offset: '배지 오프셋',
        processing: '처리 중 여부',
        max: '최대값, 초과 시 max+로 표시',
        color: '배지 색상',
        disabled: '비활성화 여부',
        value: '배지 값(비어 있을 경우 점으로 표시)',
      },
    },
    title: {
      name: '제목 Title',
      description: '단순한 제목이 아닌, 콘텐츠의 핵심을 알려주는 힌트',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '굵기',
      },
      demo3: {
        title: '색상',
      },
      props: {
        text: '텍스트 내용',
        size: '제목 텍스트 크기, 숫자(단위: 픽셀) 또는 문자열(예: "1.5em")로 지정 가능',
        bold: '제목 텍스트 굵기, 100에서 900 사이의 100 단위 정수 선택 가능',
        color:
          '제목 텍스트 색상, 미리 정의된 색상 이름 또는 사용자 정의 색상 값 사용 가능',
      },
    },
    textTrim: {
      name: '텍스트 잘라내기 TextTrim',
      description:
        '긴 텍스트를 우아하게 처리하여 레이아웃의 미적 감각을 해치지 않습니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '여러 줄 생략',
      },
      demo3: {
        title: '끝 텍스트',
      },
      demo4: {
        title: '정렬 방식',
      },
      props: {
        text: '텍스트 내용',
        lineClamp: '텍스트 표시 최대 줄 수, 초과 부분은 잘림',
        allowHTML: 'HTML 태그 렌더링 허용 여부',
        placement: '툴팁 표시 위치',
        offset: '툴팁의 대상 요소에 대한 오프셋 [x, y](단위: 픽셀)',
        textAlign: 'x축 정렬 방향(너비가 컨테이너 너비보다 작을 때)',
        delay:
          '툴팁 표시 및 숨김 지연 시간 [표시 지연, 숨김 지연](단위: 밀리초)',
        reserveEnd:
          '끝부분 문자 보존 수, 텍스트가 넘칠 때 중간에 생략 부호를 표시하고 시작과 지정된 수의 끝 문자 보존',
      },
    },
    flex: {
      name: '플렉스 레이아웃 Flex',
      description: '유연한 레이아웃 솔루션, 페이지 레이아웃을 손쉽게 제어',
      demo1: {
        title: 'Row',
      },
      demo2: {
        title: 'Column',
      },
      demo3: {
        title: 'Mode',
      },
      props: {
        direction: '자식 요소 배치 방향',
        x: '자식 요소의 수평 정렬 방식',
        y: '자식 요소의 수직 정렬 방식',
        mode: '자식 요소 분배 모드, x 또는 y 정렬 설정을 덮어쓰며, direction 값에 따라 영향이 달라짐',
        wrap: '공간이 부족할 때 자식 요소의 자동 줄바꿈 허용 여부',
        gap: '자식 요소 간 간격(단위: 픽셀)',
        width: 'Flex 컨테이너 너비(단위: 픽셀 또는 백분율)',
      },
    },
    mark: {
      name: '마크 Mark',
      description:
        '텍스트에 하이라이트 표시를 추가하여 중요 내용을 한눈에 알아볼 수 있게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      props: {
        color: '색상 테마',
        round: '둥근 모서리 여부',
        bold: '굵게 표시 여부',
        cursor: '마우스 오버 시 커서 스타일',
      },
    },
    icon: {
      name: '아이콘 Icon',
      description: '아름다운 아이콘 모음, 인터페이스에 시각적 언어 추가',
    },
    backTop: {
      name: '맨 위로 BackTop',
      description:
        '한 번의 클릭으로 페이지 상단으로 이동, 긴 페이지 탐색을 편리하게',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '사용자 정의 내용',
      },
      demo3: {
        title: '디렉티브 방식 트리거',
      },
      props: {
        target:
          '스크롤 이벤트를 트리거할 대상 요소, CSS 선택자 사용. 비어 있으면 전체 창이 기본값.',
        right: '컴포넌트가 페이지 오른쪽에서 떨어진 거리, 단위는 픽셀.',
        bottom: '컴포넌트가 페이지 하단에서 떨어진 거리, 단위는 픽셀.',
        valveHeight:
          '페이지 스크롤 높이 임계값, 이 값을 초과하면 맨 위로 버튼이 표시됨, 단위는 픽셀.',
      },
      events: {
        click: '맨 위로 이동 이벤트 콜백',
      },
    },
    steps: {
      name: '단계 Steps',
      description:
        '작업 과정을 명확하게 표시하여 사용자가 현재 위치를 알 수 있게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '상태',
      },
      demo3: {
        title: '로딩 중',
      },
      model: {
        modelValue: '현재 활성화된 단계의 인덱스 값',
      },
      props: {
        options: '단계 구성 항목 배열',
        status: '단계의 현재 상태',
        minWidth: '최소 단계 너비',
      },
      options: {
        title: '단계 제목',
        description: '단계 설명',
      },
    },
    menu: {
      name: '메뉴 Menu',
      description: '우아한 수직 메뉴, 탐색 계층을 명확하게 표시',
      demo1: {
        title: '기본 사용법',
      },
      model: {
        modelValue: '현재 활성화된 메뉴의 바인딩 값',
      },
      props: {
        options: '메뉴 구성 항목 배열',
      },
      menuOptions: {
        label: '메뉴 항목 텍스트',
        value: '메뉴 항목 값',
        children: '하위 메뉴 항목 배열',
        disabled: '메뉴 항목 비활성화 여부',
        icon: '메뉴 항목 아이콘',
        tagProps: '메뉴 항목 태그 Props',
      },
    },
    menuTree: {
      name: '메뉴 트리 MenuTree',
      description: '계층이 명확한 트리형 메뉴, 복잡한 구조 관계를 쉽게 표시',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '사용자 정의 아이콘',
      },
      demo3: {
        title: '기본 펼침',
        description: 'v-model을 통해 기본적으로 펼쳐진 메뉴 항목을 제어합니다.',
      },
      demo4: {
        title: '태그',
      },
      demo5: {
        title: '사용자 정의 스타일',
      },
      model: {
        modelValue: '현재 활성화된 메뉴의 바인딩 값',
        expandKeys: '기본적으로 펼쳐진 메뉴 항목의 키 값 배열',
        collapsed: '메뉴 접기 여부',
      },
      props: {
        options: '메뉴 트리의 데이터 소스, 중첩 구조 지원.',
        width: '메뉴 트리의 너비, CSS 너비 값 지원.',
      },
      menuTreeItem: {
        label:
          '메뉴 트리 항목의 제목 텍스트. "label" 이름이 지정된 슬롯을 사용하여 제목 내용을 사용자 정의할 수도 있습니다.',
        value: '메뉴 항목의 값, 메뉴 항목의 고유성을 식별하는 데 사용됩니다.',
        level: '메뉴 트리 항목의 레벨, 1부터 시작.',
        icon: '아이콘 렌더링 함수',
        tagProps: '메뉴 항목 태그 Props',
        disabled: '메뉴 항목 비활성화 여부',
        isLeaf: '리프 노드 여부',
      },
    },
    dropdown: {
      'name': '드롭다운 메뉴 Dropdown',
      'description':
        '클릭으로 트리거되는 플로팅 메뉴, 작업을 더 편리하게 만듭니다',
      'demo1': {
        title: '기본 사용법',
      },
      'demo2': {
        title: '버튼만이 아닌',
      },
      'demo3': {
        title: '비활성화 항목',
      },

      'props': {
        options: '메뉴 옵션 구성',
        trigger: '트리거 방식',
        placement: '메뉴 팝업 위치',
        checkable: '선택 가능 여부',
      },
      'options(ContextMenus)': contextMenu,
      'events': {
        show: '메뉴 표시 이벤트 콜백',
        hide: '메뉴 숨김 이벤트 콜백',
        change: '메뉴 항목 선택 이벤트 콜백',
      },
    },
    breadcrumb: {
      name: '브레드크럼 Breadcrumb',
      description: '명확한 경로 탐색, 사용자가 방향을 잃지 않도록 도와줍니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '현재 선택 항목 사용자 정의',
      },
      demo3: {
        title: '구분 아이콘 유형',
      },
      props: {
        options: '브레드크럼 구성 항목 배열',
        separator: '구분자 아이콘 유형',
      },
      breadcrumbOptions: {
        label: '브레드크럼 항목 텍스트',
        value: '브레드크럼 항목 값',
        active: '현재 선택 항목 여부',
      },
      events: {
        change: '브레드크럼 항목 변경 시 트리거',
      },
    },
    contextMenu: {
      'name': '컨텍스트 메뉴 ContextMenu',
      'description': '우아한 우클릭 메뉴, 작업을 더 자연스럽게 만듭니다',
      'demo1': {
        title: '기본 사용법',
      },
      'demo2': {
        title: '다중 레벨 중첩 지원',
      },
      'demo3': {
        title: '동적 업데이트 지원',
      },
      'demo4': {
        title: '체크박스',
      },
      'props': {
        options: '우클릭 메뉴 구성',
        disabled: '우클릭 메뉴 비활성화 여부',
      },
      'options(ContextMenus)': contextMenu,
    },
    actionBox: {
      name: '액션 박스',
      description: '유연한 작업 버튼으로 사용자가 빠르게 작업할 수 있습니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '드롭다운 메뉴',
      },
      demo3: {
        title: '사용자 정의 아이콘',
      },
      demo4: {
        title: '사용자 정의 스타일',
      },
      props: {
        options: '액션 버튼 구성',
        dropdownThreshold: '드롭다운 임계값',
        dropdownLabel: '드롭다운 텍스트',
        dropdownIcon: '드롭다운 아이콘',
        divider: '구분선 표시',
        iconOnly: '아이콘만 표시',
        x: '수평 방향 정렬 방식',
      },
      options: {
        label: '작업 버튼 텍스트',
        icon: '작업 버튼 아이콘',
        onClick: '작업 버튼 클릭 이벤트',
        customRender: '사용자 정의 렌더링 내용',
      },
    },
    form: {
      name: '폼 Form',
      description: '강력한 폼 처리 기능, 데이터 수집을 손쉽게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '방향',
      },
      demo3: {
        title: '사용자 정의 유효성 검사',
      },
      demo4: {
        title: '그리드 레이아웃 지원',
      },
      demo5: {
        title: '폼 엔진 구성과 함께 사용',
      },
      demo6: {
        title: '폼 항목 비동기 로딩',
      },
      props: {
        options: '폼 구조와 내용을 정의하는 구성 옵션 배열',
        size: '폼 전체 크기, 모든 폼 항목 크기에 영향',
        width: '폼 전체 너비, 숫자(픽셀) 또는 백분율 문자열 지원',
        columns: '한 행에 표시되는 폼 항목 수, 최대값은 4',
        labelWidth: '폼 항목 라벨 너비, 숫자(픽셀) 또는 "auto" 지원',
        disabled: '전체 폼 비활성화 여부',
        readonly: '전체 폼 읽기 전용 설정 여부',
        direction: '폼 항목 배열 방향, "x"는 수평, "y"는 수직',
        formMethods: '폼 항목 메서드 모음, 폼 조작을 위한 함수 포함',
      },
      formItemProps: {
        label: '폼 항목 라벨 텍스트',
        field: '폼 항목에 해당하는 필드명, 데이터 바인딩 및 검증에 사용',
        required: '필수 항목 여부',
        as: '폼 항목 유형 지정, "input", "select" 등',
        size: '개별 폼 항목 크기, 폼 전체 설정 덮어쓰기 가능',
        width: '개별 폼 항목 너비, 숫자(픽셀) 또는 백분율 문자열 지원',
        labelWidth: '개별 폼 항목 라벨 너비, 숫자(픽셀) 또는 "auto" 지원',
        direction: '개별 폼 항목 배열 방향, "x"는 수평, "y"는 수직',
        disabled: '해당 폼 항목 비활성화 여부',
        readonly: '해당 폼 항목 읽기 전용 설정 여부',
        tips: '폼 항목 힌트 정보',
        errMessage: '유효성 검사 실패 시 사용자 정의 오류 메시지',
        rule: '폼 항목 유효성 검사 규칙',
        props: '폼 항목 컴포넌트에 전달할 추가 속성',
        between: '수평 배열 시 폼 항목 간 간격 추가 여부',
        gridArea: '그리드 레이아웃에서의 위치',
        outputFormat: '출력 시 형식화 메서드',
        inputFormat: '입력 시 형식화 메서드',
      },
      events: {
        mounted: '폼 항목 마운트 시 트리거',
      },
      methods: {
        getForm: '폼 가져오기',
        setForm: '폼 설정하기',
      },
    },
    input: {
      name: '입력 상자 Input',
      description:
        '다양한 기능의 입력 상자, 데이터 입력을 더 편리하게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '접두사와 접미사',
      },
      demo3: {
        title: '글자 수 제한',
      },
      demo4: {
        title: '정렬 방식',
      },
      demo5: {
        title: '비밀번호 표시',
      },
      demo6: {
        title: '너비 자동 조정',
      },
      demo7: {
        title: '포커스 시 전체 텍스트 선택',
      },
      demo8: {
        title: '지울 수 있는',
      },
      demo9: {
        title: '읽기 전용 상태',
      },
      demo10: {
        title: '비활성화 상태',
      },
      demo11: {
        title: '엔터 키 누름으로 이벤트 트리거',
      },
      props: {
        type: '입력 상자 유형',
        size: '입력 상자 크기',
        width: '입력 상자 너비',
        placeholder: '입력 상자 플레이스홀더 텍스트',
        disabled: '입력 상자 비활성화 여부',
        readonly: '입력 상자 읽기 전용 설정 여부',
        clearable: '지우기 버튼 활성화 여부',
        showPassword: '비밀번호 표시 활성화 여부',
        maxLength: '최대 입력 길이',
        showCount: '글자 수 표시 여부(type이 text인 경우만 유효)',
        align: '입력 상자 텍스트 정렬 방식',
        minWidth:
          '입력 상자 최소 너비, 숫자(단위: 픽셀) 또는 단위가 있는 문자열 지원',
        autoWidth: '내용에 따라 너비 자동 조정 여부',
        selectByFocus: '포커스 시 전체 텍스트 선택 활성화 여부',
        copyable:
          '내용 복사 허용 여부(readonly가 true이고 suffix가 false인 경우만 적용)',
        prefixes: '입력 상자 접두사 유형',
        prefixesOptions:
          '입력 상자 접두사 옵션 목록, prefixes가 select일 때 사용',
        prefixesTooltip: '입력 상자 접두사의 툴팁 텍스트',
        suffix: '입력 상자 접미사 유형',
        suffixOptions: '입력 상자 접미사 옵션 목록, suffix가 select일 때 사용',
        suffixTooltip: '입력 상자 접미사의 툴팁 텍스트',
        okByEnter: '엔터 키로 입력 확인 허용 여부',
      },
      events: {
        change: '입력 상자 값 변경 시 트리거',
        focus: '입력 상자 포커스 획득 시 트리거',
        blur: '입력 상자 포커스 상실 시 트리거',
        input: '입력 상자 내용 입력 시 트리거',
        clear: '입력 상자 지우기 시 트리거',
        ok: '입력 상자 확인 시 트리거',
      },
      model: {
        modelValue: '입력 상자 바인딩 값',
        prefixValue: '접두사 바인딩 값',
        suffixValue: '접미사 바인딩 값',
      },
    },
    inputNumber: {
      name: '숫자 입력 상자 InputNumber',
      description: '숫자 입력 전용 상자, 숫자 처리를 더 정확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '포커스 시 전체 선택',
      },
      demo3: {
        title: '범위 제한',
      },
      demo4: {
        title: '정확한 수치',
      },
      demo5: {
        title: '비활성화 및 읽기 전용',
      },
      props: {
        min: '최소값',
        max: '최대값',
        step: '단계값',
        disabled: '정밀도',
        size: '크기, 가능한 값: small, medium, large',
        placeholder: '플레이스홀더 텍스트',
        readonly: '읽기 전용 여부',
        width: '너비, 숫자(단위: 픽셀) 또는 단위가 있는 문자열 지원',
        align: '정렬 방식',
        selectByFocus: '포커스 시 전체 텍스트 선택',
      },
      model: {
        modelValue: '바인딩 값',
      },
    },
    textarea: {
      name: '텍스트 영역 Textarea',
      description:
        '여러 줄 텍스트 입력 상자, 긴 텍스트 입력을 더 편안하게 합니다',

      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '글자 수 제한',
      },
      demo3: {
        title: '포커스 시 전체 텍스트 선택',
      },
      demo4: {
        title: '지우기 가능',
      },
      demo5: {
        title: '읽기 전용',
      },
      demo6: {
        title: '비활성화',
      },
      demo7: {
        title: '엔터 키로 이벤트 트리거',
      },
      demo8: {
        title: '크기 조절 가능',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        placeholder: '플레이스홀더 텍스트',
        disabled: '텍스트 영역 비활성화 여부',
        readonly: '읽기 전용 상태 여부',
        clearable: '지우기 버튼 표시 여부',
        showCount: '글자 수 표시 여부',
        maxLength: '최대 입력 글자 수',
        size: '텍스트 영역 크기',
        resize: '크기 조절 방향',
        width: '너비',
        height: '높이',
        minWidth: '최소 너비',
        minHeight: '최소 높이',
        maxWidth: '최대 너비',
        maxHeight: '최대 높이',
        selectByFocus: '포커스 시 전체 텍스트 선택 여부',
        okByEnter: '엔터 키로 확인 활성화 여부(활성화 시 Shift+Enter로 줄바꿈)',
      },
      events: {
        change: '값 변경 시 트리거',
        focus: '포커스 획득 시 트리거',
        blur: '포커스 상실 시 트리거',
        input: '내용 입력 시 트리거',
        clear: '지우기 시 트리거',
        ok: '확인 시 트리거',
      },
    },
    inputTag: {
      name: '태그 입력 상자 InputTag',
      description:
        '여러 태그를 쉽게 입력하고 관리하여 데이터 정리를 더 명확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '크기',
      },
      demo3: {
        title: '중복 허용 여부',
      },
      demo4: {
        title: '제어된 기본값',
      },
      demo5: {
        title: '지우기 가능',
      },
      demo6: {
        title: '읽기 전용 상태',
      },
      demo7: {
        title: '비활성화 상태',
      },
      demo8: {
        title: '최대 입력 길이',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        disabled: '비활성화 여부',
        clearable: '지우기 가능 여부',
        placeholder: '플레이스홀더 텍스트',
        readonly: '읽기 전용 여부',
        allowDuplicates: '중복 허용 여부',
        maxLength: '추가 가능한 태그의 최대 수',
        width: '너비',
      },
      events: {
        change: '값 변경 시 트리거',
        clear: '지우기 시 트리거',
        add: '태그 추가 시 트리거',
        remove: '태그 삭제 시 트리거',
      },
    },
    checkbox: {
      'name': '체크박스 Checkbox',
      'description':
        '다중 선택을 지원하는 선택기로 여러 항목 선택을 더 직관적으로 만듭니다',
      'demo1': {
        title: '기본 사용법',
      },
      'demo2': {
        title: '수직 배치',
      },
      'demo3': {
        title: '블록 형태',
      },
      'demo4': {
        title: '둥근 모양',
      },
      'demo5': {
        title: '읽기 전용 상태',
      },
      'demo6': {
        title: '비활성화 상태',
      },
      'demo7': {
        title: '단일 모드',
      },
      'model(CheckboxGroup)': {
        modelValue: '바인딩 값',
      },
      'model(Checkbox)': {
        modelValue: '바인딩 값',
      },
      'props(CheckboxGroup)': {
        options: '옵션',
        disabled: '비활성화 여부',
        readonly: '읽기 전용 여부',
        size: '크기',
        direction: '배치 방향',
        block: '블록 표시 여부',
        round: '둥근 스타일 여부',
        iconable: '아이콘 사용 가능 여부',
      },
      'props(Checkbox)': {
        label: '제목',
        value: '값',
        disabled: '비활성화',
        readonly: '읽기 전용',
        checked: '선택 상태',
        size: '크기',
        block: '블록 표시 여부',
        round: '둥근 스타일 여부',
        iconable: '아이콘 사용 가능 여부',
        certain: '확정 상태',
      },
      'events(Checkbox)': {
        change: '값 변경 시 트리거',
      },
      'events(CheckboxGroup)': {
        change: '값 변경 시 트리거',
      },
      'options': {
        label: '제목',
        value: '값',
        disabled: '비활성화',
      },
    },
    radio: {
      'name': '라디오 버튼 Radio',
      'description':
        '하나의 항목만 선택할 수 있는 선택기로 단일 선택을 더 명확하게 합니다',
      'demo1': {
        title: '기본 사용법',
      },
      'demo2': {
        title: '수직 배치',
      },
      'demo3': {
        title: '블록 형태',
      },
      'demo4': {
        title: '모양',
      },
      'demo5': {
        title: '읽기 전용 상태',
      },
      'demo6': {
        title: '비활성화 상태',
      },
      'model': {
        modelValue: '바인딩 값',
      },
      'props(RadioGroup)': {
        size: '크기',
        block: '블록 표시 여부',
        direction: '배치 방향',
        disabled: '비활성화 여부',
        iconable: '아이콘 사용 가능 여부',
        options: '옵션',
        readonly: '읽기 전용 여부',
        round: '둥근 스타일 여부',
      },
      'options': {
        label: '제목',
        value: '값',
        disabled: '비활성화',
      },
      'events': {
        change: '값 변경 시 트리거',
      },
    },
    tabs: {
      name: '탭 Tabs',
      description:
        '콘텐츠를 분류하여 더 명확하게 표시하고 전환을 더 원활하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '자동 너비 조정',
      },
      demo3: {
        title: '사용자 정의 항목 너비',
      },
      demo4: {
        title: '라인',
      },
      demo5: {
        title: '둥근 모양',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        options: '옵션',
        type: '유형',
        size: '크기',
        width: '너비',
        itemWidth: '항목 너비',
        round: '둥근 스타일 여부',
        disabled: '비활성화 상태',
        readonly: '읽기 전용 상태',
      },
      options: {
        label: '제목',
        value: '값',
      },
    },
    select: {
      name: '선택기 Select',
      description: '드롭다운 선택 상자로 선택을 더 편리하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '검색',
      },
      demo3: {
        title: '슬롯 지원',
      },
      demo4: {
        title: '옵션 비활성화',
      },
      demo5: {
        title: '읽기 전용',
      },
      demo6: {
        title: '비활성화',
      },
      demo7: {
        title: '사용자 정의 빈 상태',
      },
      demo8: {
        title: '그룹화',
      },
      demo9: {
        title: '옵션 초기화 방법',
      },
      demo10: {
        title: '검색 캐시 활성화',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        defaultValue: '기본값',
        options: '옵션',
        autoWidth: '자동 너비 여부',
        width: '너비',
        popoverWidth: '팝업 너비',
        trigger: '트리거 방식',
        placeholder: '플레이스홀더 텍스트',
        size: '크기',
        itemHeight: '항목 높이',
        searchable: '검색 가능 여부',
        searchMethod: '검색 방법',
        searchDelay: '검색 지연',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용 상태',
        disabled: '비활성화 상태',
        showCheckIcon: '체크 아이콘 표시 여부',
        initOptionsMethod: '옵션 초기화 방법',
        enableSearchCache: '검색 캐시 활성화 여부',
      },
      events: {
        change: '값 변경 시 트리거',
        clear: '지우기 시 트리거',
        blur: '포커스 상실 시 트리거',
        focus: '포커스 획득 시 트리거',
      },
      options: { label: '제목', value: '값', disabled: '비활성화' },
      slots: {
        item: '사용자 정의 옵션 내용',
        empty: '사용자 정의 빈 상태 내용',
      },
    },
    selectMultiple: {
      name: '다중 선택기 SelectMultiple',
      description:
        '다중 선택을 지원하는 드롭다운 상자로 여러 항목 선택을 더 유연하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '사용자 정의 필터 방법',
      },
      demo3: {
        title: '슬롯 지원',
      },
      demo4: {
        title: '옵션 비활성화',
      },
      demo5: {
        title: '읽기 전용',
      },
      demo6: {
        title: '비활성화',
      },
      demo7: {
        title: '빈 상태 슬롯',
      },
      demo8: {
        title: '그룹화',
      },
      demo9: {
        title: '옵션 초기화 방법',
        description:
          '```initOptionsMethod``` 방법을 사용하여 다중 선택 데이터를 초기화하고 ```Promise``` 객체를 반환합니다',
      },
      props: {
        options: '옵션',
        trigger: '트리거 방식',
        width: '너비',
        valueLayout: '값 레이아웃',
        valueTextSplit: '값 텍스트 구분자',
        placeholder: '플레이스홀더 텍스트',
        size: '크기',
        itemHeight: '항목 높이',
        searchable: '검색 가능 여부',
        searchPlaceholder: '검색 플레이스홀더 텍스트',
        searchMethod: '검색 방법',
        searchDelay: '검색 지연',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용',
        disabled: '비활성화',
        showCheckIcon: '체크 아이콘 표시 여부',
        defaultValue: '기본값',
        initOptionsMethod: '옵션 초기화 방법',
        enableSearchCache: '검색 캐시 활성화 여부',
      },
      model: {
        modelValue: '바인딩 값',
      },
      events: {
        change: '값 변경',
        blur: '포커스 상실',
        focus: '포커스 획득',
      },
      options: { label: '라벨', value: '값', disabled: '비활성화' },
      slots: {
        item: '사용자 정의 옵션 내용',
        empty: '사용자 정의 빈 상태 내용',
      },
    },
    datePicker: {
      name: '날짜 선택기 DatePicker',
      description:
        '간단하고 직관적인 날짜 선택 도구로 시간 선택을 더 정확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '지우기 가능',
      },
      demo3: {
        title: '사용자 정의 형식',
      },
      demo4: {
        title: '프리셋',
      },
      demo5: {
        title: '읽기 전용',
      },
      demo6: {
        title: '비활성화',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        valueFormat: '값 형식',
        size: '크기',
        width: '너비',
        placeholder: '플레이스홀더 텍스트',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용',
        disabled: '비활성화',
        presets: '프리셋 값',
      },
      events: {
        change: '값 변경',
        focus: '포커스 획득',
        blur: '포커스 상실',
        clear: '지우기',
      },
    },
    dateRangePicker: {
      name: '날짜 범위 선택기 DateRangePicker',
      description: '시간 범위를 선택하는 도구로 구간 선택을 더 편리하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '지우기 가능',
      },
      demo3: {
        title: '기타',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        startKey: '시작 키',
        endKey: '종료 키',
        valueFormat: '값 형식',
        size: '크기',
        width: '너비',
        placeholderStart: '시작 플레이스홀더 텍스트',
        placeholderEnd: '종료 플레이스홀더 텍스트',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용',
        disabled: '비활성화',
      },
      events: {
        change: '값 변경',
        focus: '포커스 획득',
        blur: '포커스 상실',
        clear: '지우기',
      },
    },
    cascader: {
      name: '계층형 선택기 Cascader',
      description:
        '다층 데이터를 처리하는 선택기로 분류 선택을 더 명확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '자유 모드',
      },
      demo3: {
        title: '마지막 계층만 표시',
      },
      demo4: {
        title: '비동기 로딩',
      },
      demo5: {
        title: '지우기 가능',
      },
      demo6: {
        title: '읽기 전용',
      },
      demo7: {
        title: '비활성화',
      },
      demo8: {
        title: '옵션 비활성화',
      },
      demo9: {
        title: '옵션 초기화 방법',
        description:
          '```initOptionsMethod``` 방법을 사용하여 계층형 데이터를 초기화하고 ```Promise``` 객체를 반환합니다',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        width: '너비',
        options: '옵션',
        placeholder: '플레이스홀더 텍스트',
        disabled: '비활성화',
        clearable: '지우기 가능 여부',
        showAllLevels: '모든 계층 표시',
        multiple: '다중 선택 여부',
        free: '자유 선택',
        size: '크기',
        trigger: '트리거 방식',
        loadMethod: '로딩 방법',
        readonly: '읽기 전용',
        initOptionsMethod: '옵션 초기화 방법',
      },
      options: {
        label: '라벨',
        value: '값',
        isLeaf: '리프 노드 여부',
        children: '자식 노드',
        disabled: '비활성화',
      },
    },
    treeSelect: {
      name: '트리 선택기 TreeSelect',
      description:
        '트리 구조의 선택 상자로 계층적 선택을 더 직관적으로 만듭니다',
      demo1: {
        title: '일반',
      },
      demo2: {
        title: '비동기 데이터 로딩',
      },
      demo3: {
        title: '사용자 정의 슬롯',
      },
      demo4: {
        title: '항목 비활성화',
      },
      demo5: {
        title: '기본적으로 모두 펼치기',
      },
      demo6: {
        title: '검색 가능',
      },
      demo7: {
        title: '빈 상태 슬롯',
      },
      demo8: {
        title: '기타',
      },
      demo9: {
        title: '읽기 전용',
      },
      demo10: {
        title: '비활성화',
      },
      demo11: {
        title: '데이터 초기화',
        description:
          '```initOptionsMethod``` 방법을 사용하여 트리 데이터를 초기화하고 ```Promise``` 객체를 반환합니다',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        dataSource: '트리 데이터 소스',
        defaultValue: '기본 선택 값',
        placeholder: '플레이스홀더 텍스트',
        size: '컴포넌트 크기',
        disabled: '비활성화 여부',
        clearable: '지우기 가능 여부',
        checkable: '체크박스 표시 여부',
        showAllLevels: '모든 계층 표시 여부',
        showCheckIcon: '선택 아이콘 표시 여부',
        showLine: '연결선 표시 여부',
        expandAll: '모든 노드 펼치기 여부',
        searchable: '검색 가능 여부',
        searchDelay: '검색 지연 시간(밀리초)',
        readonly: '읽기 전용 여부',
        free: '자유 모드 여부(부모-자식 노드 선택 상태 연결 없음)',
        align: '텍스트 정렬 방식',
        trigger: '자식 노드 트리거 방식',
        keyField: '노드 식별 필드',
        labelField: '노드 라벨 필드',
        disabledField: '노드 비활성화 필드',
        initOptionsMethod: '트리 노드 초기화 메서드',
        loadMethod: '자식 노드 데이터 비동기 로드 메서드',
        width: '너비',
      },
      slots: {
        handle: '슬롯 이름',
      },
    },
    inputTable: {
      name: '테이블 입력 InputTable',
      description:
        '테이블에서 데이터를 빠르게 입력하여 일괄 처리를 더욱 효율적으로 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '기본값',
      },
      demo3: {
        title: '더 다양한 기능',
      },
      props: {
        columns: '열 구성',
        size: '크기',
        width: '너비',
        rowKey: '행 키',
        batchDeletable: '일괄 삭제 지원 여부',
        addable: '추가 가능 여부',
        defaultForm: '기본 양식',
        deletable: '삭제 가능 여부',
        maxRows: '최대 행 수',
        minRows: '최소 행 수',
        clearable: '모두 지우기 가능 여부',
        sortable: '정렬 가능 여부',
        autoUniqueId: '자동 고유 ID 생성 여부',
        uniqueField: '고유 필드',
        sortTooltipCustomRender: '정렬 툴팁 커스텀 렌더링',
      },
    },
    switch: {
      name: '스위치 Switch',
      description: '간결한 스위치 선택기로 상태 전환을 더욱 명확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '사각형 모양',
      },
      demo3: {
        title: '요청 시뮬레이션',
      },
      demo4: {
        title: '읽기 전용',
      },
      demo5: {
        title: '비활성화',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        round: '둥근 모서리',
        readonly: '읽기 전용',
        disabled: '비활성화',
        request: '요청',
        loading: '로딩 중',
      },
      events: {
        change: '이벤트 이름',
      },
    },
    slider: {
      name: '슬라이더 Slider',
      description:
        '드래그하여 값을 선택하는 방식으로 수치 선택을 더욱 직관적으로 만듭니다',
      demo1: {
        title: '크기',
      },
      demo2: {
        title: '다양한 단계 크기',
      },
      demo3: {
        title: '범위 제한',
      },
      demo4: {
        title: '읽기 전용',
      },
      demo5: {
        title: '비활성화',
      },
      demo6: {
        title: '구성 옵션',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        min: '최소값',
        max: '최대값',
        step: '단계 크기',
        readonly: '읽기 전용',
        disabled: '비활성화',
        options: '옵션',
        formatTooltip: '툴팁 형식 지정',
      },
    },
    sliderRange: {
      name: '범위 슬라이더 SliderRange',
      description:
        '수치 범위를 선택하는 슬라이더로 범위 선택을 더욱 유연하게 합니다',
      demo1: {
        title: '크기',
      },
      demo2: {
        title: '다양한 단계 크기',
      },
      demo3: {
        title: '범위 제한',
      },
      demo4: {
        title: '읽기 전용',
      },
      demo5: {
        title: '비활성화',
      },
      demo6: {
        title: '구성 옵션',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        min: '최소값',
        max: '최대값',
        step: '단계 크기',
        readonly: '읽기 전용',
        disabled: '비활성화',
        options: '옵션',
        formatTooltip: '툴팁 형식 지정',
      },
    },
    rate: {
      name: '평점 Rate',
      description:
        '별점 평가 컴포넌트로 점수 매기기를 더욱 생동감 있게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '읽기 전용',
      },
      demo3: {
        title: '비활성화',
      },
      demo4: {
        title: '툴팁',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        count: '개수',
        tips: '툴팁',
        readonly: '읽기 전용',
        disabled: '비활성화',
      },
    },
    colorPicker: {
      name: '색상 선택기 ColorPicker',
      description: '다양한 색상 선택 도구로 색상 선택을 더욱 정확하게 합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '다양한 크기',
      },
      demo3: {
        title: '사용자 정의 너비',
      },
      demo4: {
        title: '비활성화 상태',
      },
      demo5: {
        title: '읽기 전용 상태',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        size: '크기',
        width: '너비',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        readonly: '읽기 전용',
      },
    },
    upload: {
      name: '업로드 Upload',
      description: '파일 업로드 컴포넌트로 파일 처리를 더욱 간편하게 합니다',
      demo1: {
        title: '일반',
      },
      demo2: {
        title: '형식 및 크기 제한',
      },
      demo3: {
        title: '이미지 업로드',
      },
      demo4: {
        title: '사용자 정의 팁',
      },
      demo5: {
        title: '사진 갤러리',
      },
      demo6: {
        title: '업로드 없음',
      },
      demo7: {
        title: '미리보기',
      },
      model: {
        modelValue: '바인딩 값',
      },
      props: {
        accept: '허용되는 파일 유형',
        immediate: '즉시 업로드',
        multiple: '다중 파일 업로드',
        disabled: '비활성화',
        readonly: '읽기 전용',
        limit: '파일 수량 제한',
        maxFileSize: '최대 파일 크기',
        size: '크기',
        tips: '도움말',
        uploadHelper: '업로드 도우미',
        viewMode: '보기 모드',
      },
    },
    table: {
      name: '테이블 Table',
      description:
        '강력한 기능의 테이블 컴포넌트로 데이터 표시를 더욱 명확하게 합니다',
      model: {
        modelValue: '바인딩 값',
        selectedKeys: '선택된 키',
        sortValue: '정렬 값',
      },
      demo1: {
        title: '일반',
      },
      demo2: {
        title: '행과 열 고정',
      },
      demo3: {
        title: '사용자 정의 작업',
      },
      demo4: {
        title: '슬롯',
      },
      demo5: {
        title: '사용자 정의 스타일',
      },
      demo6: {
        title: '선택',
      },
      demo7: {
        title: '정렬 가능',
      },
      demo8: {
        title: '사용자 정의 렌더링',
      },
      demo9: {
        title: '전체 기능',
      },
      demo10: {
        title: '데이터 없음',
      },
      demo11: {
        title: '그룹 헤더',
        tipsTitle: '제한 참고사항',
        tipsContent:
          '그룹 헤더에서 고정 열 효과를 원하는 경우, 모든 고정 열 헤더에 너비를 설정해야 합니다. 모든 부모 노드를 포함하지 않으면 위치가 어긋날 수 있습니다.',
      },
      demo12: {
        title: '드래그 앤 드롭 정렬',
      },
      props: {
        columns: '열',
        dataSource: '데이터 소스',
        bordered: '테두리',
        size: '크기',
        checkable: '선택 가능',
        maxHeight: '최대 높이',
        multiple: '다중 선택',
        rowKey: '행 키',
        sortTooltipCustomRender: '정렬 툴팁 커스텀 렌더링',
        sortable: '정렬 가능 여부',
      },
      tableColumns: {
        field: '필드',
        fixed: '고정',
        title: '제목',
        type: '유형',
        width: '너비',
        x: 'X축',
        customRender: '사용자 정의 렌더링',
      },
    },
    pagination: {
      name: '페이지네이션 Pagination',
      description:
        '명확한 페이지 탐색으로 데이터 브라우징을 더욱 쉽게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '대량 데이터',
      },
      demo3: {
        title: '비동기 시뮬레이션',
      },
      model: {
        total: '전체 항목 수',
        currentPage: '현재 페이지',
        pageSize: '페이지 크기',
      },
      props: {
        size: '크기',
        pageSizeOptions: '페이지 크기 옵션',
        visiblePagesCount: '표시할 페이지 수',
      },
      events: {
        change: '이벤트 이름',
      },
    },
    magicNumber: {
      name: '매직 넘버 MagicNumber',
      description: '숫자 표시를 더욱 생동감 있게 만드는 애니메이션 컴포넌트',
    },
    tree: {
      name: '트리 Tree',
      description:
        '계층적 데이터 구조를 표시하는 강력한 도구로, 데이터 계층을 더 명확하게 보여줍니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '체크박스 표시 여부',
      },
      demo3: {
        title: '다중 선택',
      },
      demo4: {
        title: '부모-자식 노드 연관 모드',
      },
      demo5: {
        title: '비동기 요청',
      },
      demo6: {
        title: '기본적으로 모두 펼치기',
      },
      demo7: {
        title: '보조선 표시 여부',
      },
      demo8: {
        title: '슬롯',
      },
      model: {
        modelValue: '매개변수 이름',
        expandedKeys: '펼쳐진 노드 키',
      },
      props: {
        dataSource: '데이터 소스',
        multiple: '다중 선택',
        height: '높이',
        searchable: '검색 가능 여부',
        checkable: '체크박스 표시',
        expandAll: '기본적으로 모두 펼치기',
        free: '자유 선택',
        showLine: '연결선 표시',
        trigger: '트리거 방식',
        placeholder: '플레이스홀더 텍스트',
        keyField: '노드 식별 필드',
        labelField: '노드 레이블 필드',
        disabledField: '비활성화 노드 필드',
        initOptionsMethod: '트리 노드 초기화 메서드',
        loadMethod: '자식 노드 데이터 비동기 로드 메서드',
        isSelect: '선택 여부',
      },
      slots: {
        handle: '슬롯 이름',
      },
      treeDataSource: {
        label: '레이블',
        key: '키',
        isLeaf: '리프 노드 여부',
        children: '자식 노드',
        disabled: '비활성화',
      },
    },
    collapse: {
      'name': '접이식 패널 Collapse',
      'description':
        '접고 펼칠 수 있는 콘텐츠 영역으로, 정보 표시를 더 깔끔하게 만듭니다',
      'demo1': {
        title: '기본 사용법',
      },
      'demo2': {
        title: '제목 슬롯',
      },
      'demo3': {
        title: '아코디언 모드',
      },
      'model': {
        modelValue: '매개변수 이름',
      },
      'model(CollapseItem)': {
        modelValue: '매개변수 이름',
      },
      'props': {
        width: '너비',
      },
      'props(CollapseItem)': {
        collapseKey: '접기 키',
        title: '제목',
        radius: '반경',
      },
    },
    desc: {
      name: '설명 목록 Desc',
      description:
        '여러 필드를 정돈된 방식으로 표시하여 정보 표현을 더 체계적으로 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '방향',
      },
      demo3: {
        title: '다양한 기능',
      },
      demo4: {
        title: '온라인 구성 지원',
      },
      props: {
        options: '옵션',
        dataSource: '데이터 소스',
        size: '크기',
        labelX: '레이블 X',
        valueX: '값 X',
        gap: '간격',
        width: '너비',
        columns: '열',
        labelWidth: '레이블 너비',
        direction: '방향',
        bordered: '테두리 여부',
      },
      descItemProps: {
        label: '레이블',
        field: '필드',
        size: '크기',
        bordered: '테두리 여부',
        width: '너비',
        labelWidth: '레이블 너비',
        direction: '방향',
        tips: '도움말',
        type: '유형',
        labelX: '레이블 X',
        valueX: '값 X',
        gridArea: '그리드 영역',
        customRender: '사용자 정의 렌더링',
      },
    },
    alert: {
      name: '경고 Alert',
      description: '눈에 띄는 정보 알림 상자로, 경고를 더 부드럽게 표시합니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '슬롯 지원',
      },
      demo3: {
        title: '다양한 상황',
      },
      props: {
        type: '유형',
        title: '제목',
        content: '알림 내용',
        closeable: '닫기 가능 여부',
        footer: '바닥글 내용',
      },
    },
    message: {
      name: '전역 알림 Message',
      description: '가벼운 정보 피드백으로, 알림을 더 간결하게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '제어 가능한 알림',
      },
      demo3: {
        title: '요청 시뮬레이션',
      },
      events: {
        close: '닫힐 때 트리거',
      },
      props: {
        type: '유형',
        content: '알림 내용',
        duration: '지속 시간',
      },
    },
    notification: {
      name: '알림 Notification',
      description: '우아한 알림 메시지로 메시지 푸시를 더욱 친근하게 만듭니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '지연 시간',
      },
      demo3: {
        title: '사용자 정의 너비',
      },
      demo4: {
        title: '진행률 표시줄 표시',
      },
      demo5: {
        title: '수동 닫기',
      },
      props: {
        title: '제목',
        content: '알림 내용',
        width: '너비',
        delay: '지연 시간',
        showProgress: '진행률 표시줄 표시',
      },
    },
    drawer: {
      name: '서랍 Drawer',
      description:
        '화면 가장자리에서 슬라이드되는 패널로 임시 작업을 더 원활하게 합니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '비동기 닫기',
      },
      demo3: {
        title: '사용자 정의 헤더 및 푸터',
      },
      demo4: {
        title: 'ESC로 닫기 허용 여부',
      },
      demo5: {
        title: '마스크 클릭 시 닫기',
      },
      demo6: {
        title: '중첩',
      },
      model: {
        visible: '표시 여부',
      },
      props: {
        title: '제목',
        width: '너비',
        position: '위치',
        height: '높이',
        closeOnClickOverlay: '마스크 클릭 시 닫을지 여부',
        closeByEsc: 'ESC 키를 눌러 닫을지 여부',
        hideFooter: '푸터 숨기기 여부',
        okButtonProps: '확인 버튼 속성',
        closeButtonProps: '닫기 버튼 속성',
        zIndex: '계층',
      },
    },
    dialog: {
      name: '다이얼로그 Dialog',
      description:
        '모달 대화 상자로 중요한 정보 상호 작용을 더 돋보이게 합니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '비동기 닫기',
      },
      demo3: {
        title: '마스크 클릭 시 닫기',
      },
      demo4: {
        title: 'ESC로 닫기',
      },
      props: {
        type: '유형',
        width: '너비',
        trigger: '트리거 방식',
        title: '제목',
        okText: '확인 버튼 텍스트',
        cancelText: '취소 버튼 텍스트',
        ok: '확인 콜백',
        cancel: '취소 콜백',
        closeOnClickOverlay: '마스크 클릭 시 닫을지 여부',
        closeByEsc: 'ESC 키를 눌러 닫을지 여부',
        transformOrigin: '애니메이션 원점',
      },
      events: {
        ok: '확인 버튼 클릭 시 트리거',
        cancel: '취소 버튼 클릭 시 트리거',
      },
    },
    modal: {
      name: '모달 Modal',
      description:
        '더 유연한 모달 창으로, 팝업 상호작용을 더 풍부하게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '비동기 닫기',
      },
      demo3: {
        title: '사용자 정의 헤더 및 푸터',
      },
      demo4: {
        title: 'ESC로 닫기 허용 여부',
      },
      model: {
        visible: '표시 여부',
      },
      props: {
        title: '제목',
        width: '너비',
        top: '상단으로부터의 거리',
        hideFooter: '푸터 숨김 여부',
        closeByEsc: 'ESC 키로 닫기 가능 여부',
        okButtonProps: '확인 버튼 속성',
        closeButtonProps: '닫기 버튼 속성',
        closeOnClickOverlay: '오버레이 클릭으로 닫기 가능 여부',
        zIndex: '층 레벨',
        maxHeight: '최대 높이',
      },
    },
    popok: {
      name: '팝업 확인 상자 Popok',
      description: '경량 확인 프롬프트로, 작업 확인을 더 편리하게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '트리거 방식',
      },
      props: {
        type: '유형',
        width: '너비',
        trigger: '트리거 방식',
        title: '제목',
        content: '내용',
        placement: '위치',
        ok: '확인 콜백',
        cancel: '취소 콜백',
        okText: '확인 버튼 텍스트',
        cancelText: '취소 버튼 텍스트',
      },
    },
    popover: {
      name: '팝오버 Popover',
      description:
        '클릭 또는 호버 시 나타나는 카드로, 더 풍부한 내용과 작업을 담고 있습니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '트리거 방식',
      },
      demo3: {
        title: '사용자 정의 트리거',
      },
      demo4: {
        title: '팝오버 영역 밖 클릭 시 자동 닫기',
      },
      demo5: {
        title: '로딩 상태',
      },
      props: {
        trigger: '트리거 방식',
        placement: '위치',
        disabled: '비활성화 여부',
        loading: '로딩 중 여부',
        hideOnClick: '팝오버 영역 밖 클릭 시 자동 닫기',
        offset: '오프셋',
        popoverBodyClassName: '팝오버 내용 클래스 이름',
        triggerTarget: '트리거 대상',
      },
      slots: {
        'trigger': '트리거 슬롯',
        'popover-body': '팝오버 내용 슬롯',
      },
    },
    tooltip: {
      name: '툴팁 Tooltip',
      description: '간단한 텍스트 팁 버블로, 팁을 더 가볍게 만듭니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '클릭하여 트리거',
      },
      demo3: {
        title: '지연 시간',
      },
      demo4: {
        title: 'HTML 지원',
      },
      props: {
        tips: '팁 내용',
        placement: '위치',
        trigger: '트리거 방식',
        allowHTML: 'HTML 지원 여부',
        delay: '지연 시간',
      },
    },
    loading: {
      name: '로딩 Loading',
      description: '우아한 로딩 효과로 기다림을 더 편안하게 만듭니다.',
      demo1: {
        title: '기본 사용법',
      },
      demo2: {
        title: '사용자 정의 아이콘 크기',
      },
      demo3: {
        title: '사용자 정의 팁 정보',
      },
      props: {
        tip: '팁 정보',
        iconSize: '아이콘 크기',
        visible: '표시 여부',
      },
    },
    result: {
      name: '결과 Result',
      description:
        '작업 결과를 피드백하는 데 사용되며, 결과 표시를 더 완전하게 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      props: {
        type: '유형',
        title: '제목',
        content: '내용',
      },
      slots: {
        handle: '핸들 슬롯',
      },
    },
    empty: {
      name: '빈 상태 Empty',
      description: '빈 데이터 상태 표시로, 빈 페이지를 더 친화적으로 만듭니다',
      demo1: {
        title: '기본 사용법',
      },
      props: {
        type: '유형',
        title: '제목',
        fontSize: '글꼴 크기',
        padding: '패딩',
        width: '너비',
        height: '높이',
      },
    },
  },
}
