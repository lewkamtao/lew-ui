const contextMenu = {
  label: '텍스트 표시',
  value: '값',
  renderIcon: '아이콘 렌더링 함수',
  children: '하위 노드 집합',
  disabled: '비활성화 옵션',
  isDividerLine: '구분선 여부',
  checkbox: '체크박스 여부',
  checked: '체크 여부'
}

export default {
  name: 'ko',
  home: {
    title: 'Lew UI',
    description: '아름답고 사용하기 쉬운 Vue3 컴포넌트 라이브러리',
    getStarted: '시작하기',
    sloganTitle: '적은 것이 많은 것',
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
    showCode: '소스 코드 보기'
  },
  components: {
    image: {
      name: '이미지 Image',
      description:
        '이미지를 더 우아하게 표시하며, 지연 로딩, 로딩 상태, 실패 처리 등을 지원합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '로딩 상태',
        tipsTitle: '팁',
        tipsContent:
          '너비와 높이를 설정해야 로딩 플레이스홀더 효과가 나타납니다.'
      },
      demo3: {
        title: '로딩 실패'
      },
      props: {
        src: '이미지 주소',
        alt: '이미지 설명',
        width: '너비',
        height: '높이',
        objectFit: '이미지 채우기 모드',
        objectPosition: '이미지 위치',
        lazy: '지연 로딩 활성화 여부',
        loading: '로딩 중 상태 표시 여부',
        title: '이미지 제목'
      }
    },
    avatar: {
      name: '아바타 Avatar',
      description:
        '세련된 아바타 컴포넌트로, 이미지, 아이콘, 텍스트 세 가지 형태를 지원합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '상태'
      },
      demo3: {
        title: '기본 아바타'
      },
      demo4: {
        title: '모양'
      },
      props: {
        size: '크기',
        loading: '로딩 중 상태 표시 여부',
        shape: '모양',
        src: '이미지 주소',
        alt: '이미지 설명',
        status: '상태',
        objectFit: '이미지 채우기 모드',
        objectPosition: '이미지 위치',
        statusPlacement: '상태 위치'
      }
    },
    button: {
      name: '버튼 Button',
      description: '클릭하면 더 부드럽고 유연한 상호작용이 가능합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '색상'
      },
      demo3: {
        title: '아이콘'
      },
      demo4: {
        title: '로딩 상태'
      },
      demo5: {
        title: '비활성화 상태'
      },
      demo6: {
        title: 'Promise 지원'
      },
      props: {
        text: '버튼 텍스트',
        type: '타입',
        size: '크기',
        singleIcon: '아이콘만 표시 여부',
        color: '색상',
        round: '둥근 모서리 여부',
        dashed: '점선 여부',
        loading: '로딩 중 상태 표시 여부',
        disabled: '비활성화 상태 여부',
        request: '요청 여부'
      }
    },
    tag: {
      name: '태그 Tag',
      description:
        '작지만 강력한 마커 도구로, 콘텐츠 분류에 색다른 매력을 더합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '타입'
      },
      demo3: {
        title: '크기'
      },
      demo4: {
        title: '색상'
      },
      demo5: {
        title: '비활성화'
      },
      demo6: {
        title: '닫기 가능'
      },
      demo7: {
        title: '슬롯'
      },
      props: {
        text: '태그 텍스트, 슬롯보다 우선순위가 높으며 너비 초과 시 text-trim 효과가 적용됩니다',
        type: '스타일 타입',
        size: '크기',
        color: '색상 테마',
        closable: '닫기 가능 여부',
        disabled: '비활성화 여부',
        round: '둥근 모서리 여부'
      }
    },
    badge: {
      name: '배지 Badge',
      description:
        '우측 상단에 빛나는 작은 빨간 점으로, 알림을 더욱 눈에 띄게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '점'
      },
      demo3: {
        title: '직접 사용'
      },
      demo4: {
        title: '텍스트'
      },
      demo5: {
        title: '처리 중'
      },
      props: {
        text: '태그 텍스트',
        offset: '배지 오프셋',
        processing: '처리 중 여부',
        max: '최대값, 초과 시 max+로 표시',
        color: '배지 색상',
        disabled: '비활성화 여부',
        value: '배지 값(비어있을 경우 점으로 표시)'
      }
    },
    title: {
      name: '제목 Title',
      description: '단순한 제목이 아닌, 콘텐츠의 영혼을 담은 힌트',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '굵기'
      },
      demo3: {
        title: '색상'
      },
      props: {
        text: '텍스트 내용',
        size: '제목 텍스트 크기, 숫자(픽셀 단위) 또는 문자열("1.5em" 등)',
        bold: '제목 텍스트 굵기, 100에서 900 사이의 100 단위 값',
        color:
          '제목 텍스트 색상, 미리 정의된 색상 이름 또는 사용자 정의 색상 값'
      }
    },
    textTrim: {
      name: '텍스트 자르기 TextTrim',
      description:
        '긴 텍스트를 우아하게 처리하여 레이아웃의 아름다움을 해치지 않습니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '여러 줄 생략'
      },
      demo3: {
        title: '끝 텍스트'
      },
      demo4: {
        title: '정렬 방식'
      },
      props: {
        text: '텍스트 내용',
        lineClamp: '텍스트 최대 표시 줄 수, 초과분은 잘립니다',
        allowHTML: 'HTML 태그 렌더링 허용 여부',
        placement: '툴팁 표시 위치',
        offset: '툴팁의 대상 요소 기준 오프셋 [x, y](픽셀 단위)',
        textAlign: 'x축 정렬 방향(너비가 컨테이너보다 작을 때)',
        delay:
          '툴팁 표시 및 숨김 지연 시간 [표시 지연, 숨김 지연](밀리초 단위)',
        reserveEnd:
          '끝부분 보존 문자 수, 텍스트 넘침 시 중간에 생략 부호를 표시하고 시작과 지정된 수의 끝 문자를 보존'
      }
    },
    flex: {
      name: '플렉스 레이아웃 Flex',
      description: '유연한 레이아웃 솔루션으로 페이지 배치를 자유자재로',
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
        direction: '자식 요소 배열 방향',
        x: '자식 요소 수평 정렬 방식',
        y: '자식 요소 수직 정렬 방식',
        mode: '자식 요소 분배 모드, x 또는 y 정렬 설정을 덮어쓰며 direction 값에 따라 영향이 다름',
        wrap: '공간 부족 시 자식 요소 자동 줄바꿈 허용 여부',
        gap: '자식 요소 간 간격(픽셀 단위)',
        width: 'Flex 컨테이너 너비(픽셀 또는 백분율)'
      }
    },
    mark: {
      name: '마크 Mark',
      description:
        '텍스트에 하이라이트 표시를 추가하여 중요 내용을 한눈에 알아볼 수 있게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      props: {
        color: '색상 테마',
        round: '둥근 모서리 여부',
        bold: '굵게 표시 여부',
        cursor: '마우스 오버 시 커서 스타일'
      }
    },
    icon: {
      name: '아이콘 Icon',
      description:
        '아름다운 아이콘 모음으로 인터페이스에 시각적 언어를 더합니다'
    },
    backTop: {
      name: '맨 위로 BackTop',
      description:
        '원클릭으로 맨 위로 이동, 긴 페이지 탐색의 번거로움을 해소합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '사용자 정의 내용'
      },
      demo3: {
        title: '디렉티브 방식 트리거'
      },
      props: {
        target:
          '스크롤 이벤트를 트리거할 대상 요소, CSS 선택자 사용. 비어있으면 전체 창이 기본값.',
        right: '컴포넌트의 페이지 우측 거리, 픽셀 단위.',
        bottom: '컴포넌트의 페이지 하단 거리, 픽셀 단위.',
        valveHeight:
          '페이지 스크롤 높이 임계값, 이 값을 초과하면 맨 위로 버튼이 표시됨, 픽셀 단위.'
      },
      events: {
        click: '맨 위로 이동 이벤트 콜백'
      }
    },
    steps: {
      name: '단계 Steps',
      description:
        '작업 프로세스를 명확하게 표시하여 사용자가 현재 위치를 알 수 있게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '상태'
      },
      demo3: {
        title: '로딩 중'
      },
      model: {
        modelValue: '현재 활성화된 단계의 인덱스 값'
      },
      props: {
        options: '단계 구성 항목 배열',
        status: '단계 표시줄의 현재 상태',
        minWidth: '최소 단계 너비'
      }
    },
    menu: {
      name: '메뉴 Menu',
      description: '우아한 수직 메뉴로 네비게이션 계층을 명확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      model: {
        modelValue: '현재 활성화된 메뉴의 바인딩 값'
      },
      props: {
        options: '메뉴 구성 항목 배열'
      },
      menuOptions: {
        label: '메뉴 항목 텍스트',
        value: '메뉴 항목 값',
        children: '하위 메뉴 항목 배열',
        disabled: '메뉴 항목 비활성화 여부',
        icon: '메뉴 항목 아이콘',
        tagText: '메뉴 항목 배지 텍스트',
        tagColor: '메뉴 항목 배지 색상'
      }
    },
    menuTree: {
      name: '메뉴 트리 MenuTree',
      description:
        '계층이 명확한 트리형 메뉴로 복잡한 구조 관계를 쉽게 표현합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '사용자 정의 아이콘'
      },
      demo3: {
        title: '기본 펼침',
        description: 'v-model을 통해 기본적으로 펼쳐질 메뉴 항목을 제어합니다.'
      },
      demo4: {
        title: '태그'
      },
      demo5: {
        title: '사용자 정의 스타일'
      },
      model: {
        modelValue: '현재 활성화된 메뉴의 바인딩 값',
        expandKeys: '기본적으로 펼쳐질 메뉴 항목의 key 값 배열',
        collapsed: '메뉴 접힘 여부'
      },
      props: {
        options: '메뉴 트리의 데이터 소스, 중첩 구조를 지원합니다.',
        width: '메뉴 트리의 너비, CSS 너비 값을 지원합니다.'
      },
      menuTreeItem: {
        label:
          '메뉴 트리 항목의 제목 텍스트. "label" 이름이 지정된 슬롯을 사용하여 제목 내용을 사용자 정의할 수도 있습니다.',
        value: '메뉴 항목의 값, 메뉴 항목의 고유성을 식별하는 데 사용됩니다.',
        level: '메뉴 트리 항목의 레벨, 1부터 시작합니다.',
        renderIcon: '아이콘 렌더링 함수',
        renderLabel: '라벨 렌더링 함수',
        tagText: '메뉴 항목의 배지 텍스트',
        tagType: '메뉴 항목의 배지 타입',
        tagColor: '메뉴 항목의 배지 색상',
        disabled: '메뉴 항목 비활성화 여부',
        isLeaf: '리프 노드 여부'
      }
    },
    dropdown: {
      name: '드롭다운 메뉴 Dropdown',
      description:
        '클릭으로 트리거되는 플로팅 메뉴로 작업을 더욱 편리하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '버튼만이 아닙니다'
      },
      demo3: {
        title: '비활성화 항목'
      },

      props: {
        options: '메뉴 옵션 구성',
        trigger: '트리거 방식',
        placement: '메뉴 표시 위치'
      },
      'options(ContextMenus)': contextMenu,
      events: {
        show: '메뉴 표시 이벤트 콜백',
        hide: '메뉴 숨김 이벤트 콜백',
        change: '메뉴 항목 선택 이벤트 콜백'
      }
    },
    breadcrumb: {
      name: '브레드크럼 Breadcrumb',
      description:
        '명확한 경로 네비게이션으로 사용자가 방향을 잃지 않도록 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '현재 선택 사용자 정의'
      },
      demo3: {
        title: '구분 아이콘 타입'
      },
      props: {
        options: '브레드크럼 구성 항목 배열',
        separator: '구분자 아이콘 타입'
      },
      breadcrumbOptions: {
        label: '브레드크럼 항목 텍스트',
        value: '브레드크럼 항목 값',
        active: '현재 선택 항목 여부'
      },
      events: {
        change: '브레드크럼 항목 변경 시 트리거'
      }
    },
    contextMenu: {
      name: '컨텍스트 메뉴 ContextMenu',
      description: '우아한 우클릭 메뉴로 작업을 더욱 자연스럽게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '다중 중첩 지원'
      },
      demo3: {
        title: '동적 업데이트 지원'
      },
      demo4: {
        title: '체크박스'
      },
      props: {
        options: '우클릭 메뉴 구성',
        disabled: '우클릭 메뉴 비활성화 여부',
        selectHandler: '메뉴 항목 선택 시 콜백 함수'
      },
      'options(ContextMenus)': contextMenu
    },
    form: {
      name: '폼 Form',
      description: '강력한 폼 처리 기능으로 데이터 수집을 손쉽게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '방향'
      },
      demo3: {
        title: '사용자 정의 유효성 검사'
      },
      demo4: {
        title: '그리드 레이아웃 지원'
      },
      demo5: {
        title: '폼 엔진 구성과 함께 사용'
      },
      props: {
        options: '폼 구조와 내용을 정의하는 구성 옵션 배열',
        size: '폼 전체 크기, 모든 폼 항목 크기에 영향',
        width: '폼 전체 너비, 숫자(픽셀) 또는 백분율 문자열 지원',
        columns: '한 행에 표시될 폼 항목 수, 최대값 4',
        labelWidth: '폼 항목 라벨 너비, 숫자(픽셀) 또는 "auto" 지원',
        disabled: '전체 폼 비활성화 여부',
        readonly: '전체 폼 읽기 전용 설정 여부',
        direction: '폼 항목 배열 방향, "x"는 수평, "y"는 수직',
        formMethods: '폼 항목의 메소드 집합, 폼 조작을 위한 함수 포함'
      },
      formItemProps: {
        label: '폼 항목의 라벨 텍스트',
        field: '폼 항목의 필드명, 데이터 바인딩 및 유효성 검사에 사용',
        required: '필수 입력 여부',
        as: '폼 항목의 유형 지정, "input", "select" 등',
        size: '개별 폼 항목의 크기, 폼 전체 설정을 덮어씀',
        width: '개별 폼 항목의 너비, 숫자(픽셀) 또는 백분율 문자열 지원',
        labelWidth: '개별 폼 항목 라벨 너비, 숫자(픽셀) 또는 "auto" 지원',
        direction: '개별 폼 항목의 배열 방향, "x"는 수평, "y"는 수직',
        disabled: '폼 항목 비활성화 여부',
        readonly: '폼 항목 읽기 전용 설정 여부',
        tips: '폼 항목의 도움말',
        errMessage: '유효성 검사 실패 시 사용자 정의 오류 메시지',
        rule: '폼 항목의 유효성 검사 규칙',
        props: '폼 항목 컴포넌트에 전달할 추가 속성',
        between: '수평 배열 시 폼 항목 간 간격 추가 여부',
        gridArea: '그리드 레이아웃에서의 위치',
        outputFormat: '출력 시 형식화 메소드',
        inputFormat: '입력 시 형식화 메소드'
      },
      events: {
        mounted: '폼 항목이 마운트될 때 발생'
      },
      methods: {
        getForm: '폼 가져오기',
        setForm: '폼 설정하기'
      }
    },
    input: {
      name: '입력 Input',
      description:
        '기능이 풍부한 입력 상자로 데이터 입력을 더욱 편리하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '접두사/접미사'
      },
      demo3: {
        title: '글자 수 제한'
      },
      demo4: {
        title: '정렬 방식'
      },
      demo5: {
        title: '비밀번호 표시'
      },
      demo6: {
        title: '너비 자동 조정'
      },
      demo7: {
        title: '포커스 시 전체 선택'
      },
      demo8: {
        title: '지우기 가능'
      },
      demo9: {
        title: '읽기 전용 상태'
      },
      demo10: {
        title: '비활성화 상태'
      },
      demo11: {
        title: '엔터 키 이벤트 트리거'
      },
      props: {
        type: '입력 상자 유형',
        size: '입력 상자 크기',
        placeholder: '입력 상자 플레이스홀더',
        disabled: '입력 상자 비활성화 여부',
        readonly: '입력 상자 읽기 전용 여부',
        clearable: '지우기 버튼 활성화 여부',
        showPassword: '비밀번호 표시 활성화 여부',
        maxLength: '최대 입력 길이',
        showCount: '글자 수 표시 여부(type이 text인 경우만 유효)',
        align: '입력 상자 텍스트 정렬 방식',
        minWidth:
          '입력 상자 최소 너비, 숫자(픽셀) 또는 단위가 있는 문자열 지원',
        autoWidth: '내용에 따른 너비 자동 조정 여부',
        selectByFocus: '포커스 시 전체 텍스트 선택 활성화 여부',
        copyable:
          '내용 복사 허용 여부(readonly가 true이고 suffix가 false인 경우만 유효)',
        prefixes: '입력 상자 접두사 유형',
        prefixesOptions:
          '입력 상자 접두사 옵션 목록, prefixes가 select일 때 사용',
        prefixesTooltip: '입력 상자 접두사의 툴팁 텍스트',
        suffix: '입력 상자 접미사 유형',
        suffixOptions: '입력 상자 접미사 옵션 목록, suffix가 select일 때 사용',
        suffixTooltip: '입력 상자 접미사의 툴팁 텍스트',
        okByEnter: '엔터 키로 입력 확인 허용 여부'
      },
      events: {
        change: '입력 상자 값이 변경될 때 발생',
        focus: '입력 상자가 포커스를 얻을 때 발생',
        blur: '입력 상자가 포커스를 잃을 때 발생',
        input: '입력 상자에 내용을 입력할 때 발생',
        clear: '입력 상자를 지울 때 발생',
        ok: '입력 상자 확인 시 발생'
      }
    },
    inputNumber: {
      name: '숫자 입력 InputNumber',
      description: '숫자 입력 전용 상자로 숫자 처리를 더욱 정확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '포커스 시 전체 선택'
      },
      demo3: {
        title: '범위 제한'
      },
      demo4: {
        title: '정밀 수치'
      },
      demo5: {
        title: '비활성화 및 읽기 전용'
      },
      props: {
        min: '최소값',
        max: '최대값',
        step: '증감값',
        disabled: '정밀도',
        size: '크기, small/medium/large 중 선택',
        placeholder: '플레이스홀더 텍스트',
        readonly: '읽기 전용 여부',
        width: '너비, 숫자(픽셀) 또는 단위가 있는 문자열 지원',
        align: '정렬 방식',
        selectByFocus: '포커스 시 전체 텍스트 선택'
      },
      model: {
        modelValue: '바인딩 값'
      }
    },
    textarea: {
      name: '텍스트 영역 Textarea',
      description:
        '여러 줄 텍스트 입력 상자로 긴 텍스트 입력을 더욱 편안하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '글자 수 제한'
      },
      demo3: {
        title: '포커스 시 전체 선택'
      },
      demo4: {
        title: '지우기 가능'
      },
      demo5: {
        title: '읽기 전용'
      },
      demo6: {
        title: '비활성화'
      },
      demo7: {
        title: '엔터 키 이벤트 트리거'
      },
      demo8: {
        title: '크기 조정 가능'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        placeholder: '플레이스홀더 텍스트',
        disabled: '텍스트 영역 비활성화 여부',
        readonly: '읽기 전용 상태 여부',
        clearable: '지우기 버튼 표시 여부',
        showCount: '글자 수 표시 여부',
        maxLength: '최대 입력 글자 수',
        size: '텍스트 영역 크기',
        resize: '크기 조정 방향',
        width: '너비',
        height: '높이',
        minWidth: '최소 너비',
        minHeight: '최소 높이',
        maxWidth: '최대 너비',
        maxHeight: '최대 높이',
        selectByFocus: '포커스 시 전체 텍스트 선택',
        okByEnter: '엔터 키 확인 활성화 여부(활성화 시 Shift+Enter로 줄바꿈)'
      },
      events: {
        change: '값이 변경될 때 발생',
        focus: '포커스를 얻을 때 발생',
        blur: '포커스를 잃을 때 발생',
        input: '내용을 입력할 때 발생',
        clear: '지울 때 발생',
        ok: '확인 시 발생'
      }
    },
    inputTag: {
      name: '태그 입력 InputTag',
      description:
        '여러 태그를 쉽게 입력하고 관리하여 데이터 정리를 더욱 명확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '크기'
      },
      demo3: {
        title: '중복 허용 여부'
      },
      demo4: {
        title: '제어된 기본값'
      },
      demo5: {
        title: '지우기 가능'
      },
      demo6: {
        title: '읽기 전용 상태'
      },
      demo7: {
        title: '비활성화 상태'
      },
      demo8: {
        title: '최대 입력 길이'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        size: '크기',
        disabled: '비활성화 여부',
        clearable: '지우기 가능 여부',
        placeholder: '플레이스홀더 텍스트',
        readonly: '읽기 전용 여부',
        allowDuplicates: '중복 허용 여부',
        maxLength: '추가 가능한 최대 태그 수',
        width: '너비'
      },
      events: {
        change: '값이 변경될 때 발생',
        clear: '지울 때 발생',
        add: '태그 추가 시 발생',
        remove: '태그 삭제 시 발생'
      }
    },
    checkbox: {
      name: '체크박스 Checkbox',
      description:
        '다중 선택을 지원하는 선택기로 다중 선택을 더욱 직관적으로 만듭니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '수직 배열'
      },
      demo3: {
        title: '블록 형태'
      },
      demo4: {
        title: '원형'
      },
      demo5: {
        title: '읽기 전용 상태'
      },
      demo6: {
        title: '비활성화 상태'
      },
      demo7: {
        title: '단일 모드'
      },
      'model(CheckboxGroup)': {
        modelValue: '바인딩 값'
      },
      'model(Checkbox)': {
        modelValue: '바인딩 값'
      },
      'props(CheckboxGroup)': {
        options: '옵션',
        disabled: '비활성화 여부',
        readonly: '읽기 전용 여부',
        size: '크기',
        direction: '배열 방향',
        block: '블록 표시',
        round: '원형 스타일',
        iconable: '아이콘 사용 가능 여부'
      },
      'props(Checkbox)': {
        label: '제목',
        value: '값',
        disabled: '비활성화',
        readonly: '읽기 전용',
        checked: '선택 상태',
        size: '크기',
        block: '블록 표시',
        round: '원형 스타일',
        iconable: '아이콘 사용 가능 여부',
        certain: '확정 상태'
      },
      'events(Checkbox)': {
        change: '값이 변경될 때 발생'
      },
      'events(CheckboxGroup)': {
        change: '값이 변경될 때 발생'
      },
      options: {
        label: '제목',
        value: '값',
        disabled: '비활성화'
      }
    },
    radio: {
      name: '라디오 Radio',
      description:
        '하나만 선택할 수 있는 선택기로 단일 선택을 더욱 명확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '수직 배열'
      },
      demo3: {
        title: '블록 형태'
      },
      demo4: {
        title: '모양'
      },
      demo5: {
        title: '읽기 전용 상태'
      },
      demo6: {
        title: '비활성화 상태'
      },
      model: {
        modelValue: '바인딩 값'
      },
      'props(RadioGroup)': {
        size: '크기',
        block: '블록 표시',
        direction: '배열 방향',
        disabled: '비활성화 여부',
        iconable: '아이콘 사용 가능 여부',
        options: '옵션',
        readonly: '읽기 전용 여부',
        round: '원형 스타일'
      },
      options: {
        label: '제목',
        value: '값',
        disabled: '비활성화'
      },
      events: {
        change: '값이 변경될 때 발생'
      }
    },
    tabs: {
      name: '탭 Tabs',
      description:
        '내용을 분류하여 더욱 명확하게 표시하고 전환을 더욱 부드럽게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '너비 자동 조정'
      },
      demo3: {
        title: '사용자 정의 항목 너비'
      },
      demo4: {
        title: '라인'
      },
      demo5: {
        title: '둥근 모서리'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        options: '옵션',
        type: '유형',
        size: '크기',
        width: '너비',
        itemWidth: '항목 너비',
        round: '둥근 모서리 스타일',
        disabled: '비활성화 상태',
        readonly: '읽기 전용 상태'
      },
      options: {
        label: '제목',
        value: '값'
      }
    },
    select: {
      name: '선택기 Select',
      description: '드롭다운 선택 상자로 선택을 더욱 편리하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '검색'
      },
      demo3: {
        title: '슬롯 지원'
      },
      demo4: {
        title: '옵션 비활성화'
      },
      demo5: {
        title: '읽기 전용'
      },
      demo6: {
        title: '비활성화'
      },
      demo7: {
        title: '사용자 정의 빈 상태'
      },
      demo8: {
        title: '그룹화'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        defaultValue: '기본값',
        options: '옵션',
        width: '너비',
        trigger: '트리거 방식',
        placeholder: '플레이스홀더 텍스트',
        size: '크기',
        itemHeight: '항목 높이',
        searchable: '검색 가능 여부',
        searchMethod: '검색 메소드',
        searchDelay: '검색 지연',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용 상태',
        disabled: '비활성화 상태',
        showCheckIcon: '체크 아이콘 표시'
      },
      events: {
        change: '값이 변경될 때 발생',
        clear: '지울 때 발생',
        blur: '포커스를 잃을 때 발생',
        focus: '포커스를 얻을 때 발생'
      },
      options: { label: '제목', value: '값', disabled: '비활성화' },
      slots: {
        item: '사용자 정의 옵션 내용',
        empty: '사용자 정의 빈 상태 내용'
      }
    },
    selectMultiple: {
      name: '다중 선택기 SelectMultiple',
      description:
        '다중 선택을 지원하는 드롭다운 상자로 다중 선택을 더욱 유연하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '사용자 정의 필터 메소드'
      },
      demo3: {
        title: '슬롯 지원'
      },
      demo4: {
        title: '옵션 비활성화'
      },
      demo5: {
        title: '읽기 전용'
      },
      demo6: {
        title: '비활성화'
      },
      demo7: {
        title: '빈 상태 슬롯'
      },
      demo8: {
        title: '그룹화'
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
        searchMethod: '검색 메소드',
        searchDelay: '검색 지연',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용',
        disabled: '비활성화',
        showCheckIcon: '체크 아이콘 표시',
        defaultValue: '기본값'
      },
      model: {
        modelValue: '바인딩 값'
      },
      events: { change: '값 변경', blur: '포커스 잃음', focus: '포커스 얻음' },
      options: { label: '라벨', value: '값', disabled: '비활성화' },
      slots: {
        item: '사용자 정의 옵션 내용',
        empty: '사용자 정의 빈 상태 내용'
      }
    },
    datePicker: {
      name: '날짜 선택기 DatePicker',
      description:
        '간단하고 직관적인 날짜 선택 도구로 시간 선택을 더욱 정확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '지우기 가능'
      },
      demo3: {
        title: '사용자 정의 형식'
      },
      demo4: {
        title: '프리셋'
      },
      demo5: {
        title: '읽기 전용'
      },
      demo6: {
        title: '비활성화'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        valueFormat: '값 형식',
        size: '크기',
        width: '너비',
        placeholder: '플레이스홀더 텍스트',
        clearable: '지우기 가능 여부',
        readonly: '읽기 전용',
        disabled: '비활성화',
        presets: '프리셋 값'
      },
      events: {
        change: '값 변경',
        focus: '포커스 얻음',
        blur: '포커스 잃음',
        clear: '지우기'
      }
    },
    dateRangePicker: {
      name: '날짜 범위 선택기 DateRangePicker',
      description:
        '시간 범위를 선택하는 도구로 구간 선택을 더욱 편리하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '지우기 가능'
      },
      demo3: {
        title: '기타'
      },
      model: {
        modelValue: '바인딩 값'
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
        disabled: '비활성화'
      },
      events: {
        change: '값 변경',
        focus: '포커스 얻음',
        blur: '포커스 잃음',
        clear: '지우기'
      }
    },
    cascader: {
      name: '계단식 선택기 Cascader',
      description:
        '다층 데이터를 처리하는 선택기로 분류 선택을 더욱 명확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '자유 모드'
      },
      demo3: {
        title: '마지막 레벨만 표시'
      },
      demo4: {
        title: '비동기 로딩'
      },
      demo5: {
        title: '지우기 가능'
      },
      demo6: {
        title: '읽기 전용'
      },
      demo7: {
        title: '비활성화'
      },
      demo8: {
        title: '옵션 비활성화'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        width: '너비',
        options: '옵션',
        placeholder: '플레이스홀더 텍스트',
        disabled: '비활성화',
        clearable: '지우기 가능 여부',
        showAllLevels: '모든 레벨 표시',
        multiple: '다중 선택 여부',
        free: '자유 선택',
        size: '크기',
        trigger: '트리거 방식',
        loadMethod: '로딩 메소드',
        readonly: '읽기 전용'
      },
      options: {
        label: '라벨',
        value: '값',
        isLeaf: '리프 노드 여부',
        children: '자식 노드',
        disabled: '비활성화'
      }
    },
    treeSelect: {
      name: '트리 선택기 TreeSelect',
      description:
        '트리 구조의 선택 상자로 계층 선택을 더욱 직관적으로 만듭니다',
      demo1: {
        title: '일반'
      },
      demo2: {
        title: '비동기 데이터 로딩'
      },
      demo3: {
        title: '사용자 정의 슬롯'
      },
      demo4: {
        title: '항목 비활성화'
      },
      demo5: {
        title: '기본적으로 모두 펼치기'
      },
      demo6: {
        title: '검색 가능'
      },
      demo7: {
        title: '빈 상태 슬롯'
      },
      demo8: {
        title: '기타'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        dataSource: '트리 데이터 소스',
        defaultValue: '기본 선택 값',
        placeholder: '플레이스홀더 텍스트',
        size: '컴포넌트 크기',
        disabled: '비활성화 여부',
        clearable: '지우기 가능 여부',
        showCheckbox: '체크박스 표시 여부',
        showAllLevels: '모든 레벨 표시 여부',
        showCheckIcon: '선택 아이콘 표시 여부',
        showLine: '연결선 표시 여부',
        expandAll: '모든 노드 펼치기 여부',
        searchable: '검색 가능 여부',
        searchDelay: '검색 지연 시간(밀리초)',
        readonly: '읽기 전용 여부',
        free: '자유 모드 여부(부모-자식 노드 선택 상태 연관 없음)',
        align: '텍스트 정렬 방식',
        trigger: '자식 노드 트리거 방식',
        keyField: '노드 식별자 필드',
        labelField: '노드 라벨 필드',
        disabledField: '노드 비활성화 필드',
        initTree: '트리 노드 초기화 메소드',
        loadMethod: '자식 노드 데이터 비동기 로딩 메소드'
      },
      slots: {
        handle: '슬롯 이름'
      }
    },
    inputTable: {
      name: '테이블 입력 InputTable',
      description:
        '테이블에서 빠르게 데이터를 입력하여 일괄 처리를 더욱 효율적으로 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '기본값'
      },
      demo3: {
        title: '더 풍부한 기능'
      },
      props: {
        columns: '열 구성',
        size: '크기',
        width: '너비',
        rowKey: '행 키',
        batchDeletable: '일괄 삭제 지원 여부',
        addable: '추가 가능 여부',
        defaultForm: '기본 폼',
        deletable: '삭제 가능 여부',
        maxRows: '최대 행 수',
        minRows: '최소 행 수',
        clearable: '지우기 가능 여부',
        sortable: '정렬 가능 여부',
        autoUniqueId: '자동 고유 ID 생성 여부',
        uniqueField: '고유 필드'
      }
    },
    switch: {
      name: '스위치 Switch',
      description: '간단한 스위치 선택기로 상태 전환을 더욱 명확하게 합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '사각형'
      },
      demo3: {
        title: '요청 시뮬레이션'
      },
      demo4: {
        title: '읽기 전용'
      },
      demo5: {
        title: '비활성화'
      },
      model: {
        modelValue: '매개변수 이름'
      },
      props: {
        size: '크기',
        round: '둥근 모서리',
        readonly: '읽기 전용',
        disabled: '비활성화',
        request: '요청',
        loading: '로딩 중'
      },
      events: {
        change: '이벤트 이름'
      }
    },
    slider: {
      name: '슬라이더 Slider',
      description: '드래그로 값을 선택하여 더 직관적인 값 선택이 가능합니다',
      demo1: {
        title: '크기'
      },
      demo2: {
        title: '다른 단계'
      },
      demo3: {
        title: '범위 제한'
      },
      demo4: {
        title: '읽기 전용'
      },
      demo5: {
        title: '비활성화'
      },
      demo6: {
        title: '설정 옵션'
      },
      model: {
        modelValue: '매개변수 이름'
      },
      props: {
        size: '크기',
        min: '최소값',
        max: '최대값',
        step: '단계',
        readonly: '읽기 전용',
        disabled: '비활성화',
        options: '옵션',
        formatTooltip: '툴팁 형식'
      }
    },
    sliderRange: {
      name: '범위 슬라이더 SliderRange',
      description:
        '값 범위를 선택하는 슬라이더로 더 유연한 범위 선택이 가능합니다',
      demo1: {
        title: '크기'
      },
      demo2: {
        title: '다른 단계'
      },
      demo3: {
        title: '범위 제한'
      },
      demo4: {
        title: '읽기 전용'
      },
      demo5: {
        title: '비활성화'
      },
      demo6: {
        title: '설정 옵션'
      },
      model: {
        modelValue: '매개변수 이름'
      },
      props: {
        size: '크기',
        min: '최소값',
        max: '최대값',
        step: '단계',
        readonly: '읽기 전용',
        disabled: '비활성화',
        options: '옵션',
        formatTooltip: '툴팁 형식'
      }
    },
    rate: {
      name: '평점 Rate',
      description: '별점 평가 컴포넌트로 더 생동감 있는 평가가 가능합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '읽기 전용'
      },
      demo3: {
        title: '비활성화'
      },
      demo4: {
        title: '툴팁'
      },
      model: {
        modelValue: '매개변수 이름'
      },
      props: {
        size: '크기',
        count: '개수',
        tips: '툴팁',
        readonly: '읽기 전용',
        disabled: '비활성화'
      }
    },
    colorPicker: {
      name: '색상 선택기 ColorPicker',
      description: '다양한 색상 선택 도구로 더 정확한 색상 선택이 가능합니다',
      demo1: {
        title: '기본 사용법'
      },
      demo2: {
        title: '다양한 크기'
      },
      demo3: {
        title: '사용자 정의 너비'
      },
      demo4: {
        title: '비활성화 상태'
      },
      demo5: {
        title: '읽기 전용 상태'
      },
      model: {
        modelValue: '매개변수 이름'
      },
      props: {
        size: '크기',
        width: '너비',
        placeholder: '플레이스홀더',
        disabled: '비활성화',
        readonly: '읽기 전용'
      }
    },
    upload: {
      name: '업로드 Upload',
      description: '파일 업로드 컴포넌트로 더 간단한 파일 처리가 가능합니다',
      demo1: {
        title: '일반'
      },
      demo2: {
        title: '형식 및 크기 제한'
      },
      demo3: {
        title: '이미지 업로드'
      },
      demo4: {
        title: '사용자 정의 팁'
      },
      demo5: {
        title: '사진 벽'
      },
      demo6: {
        title: '업로드 안 함'
      },
      demo7: {
        title: '미리보기'
      },
      model: {
        modelValue: '바인딩 값'
      },
      props: {
        accept: '허용되는 파일 형식',
        immediate: '즉시 업로드',
        multiple: '다중 파일 업로드',
        disabled: '비활성화',
        readonly: '읽기 전용',
        limit: '파일 수량 제한',
        maxFileSize: '최대 파일 크기',
        size: '크기',
        tips: '도움말',
        uploadHelper: '업로드 도우미',
        viewMode: '보기 모드'
      }
    },
    table: {
      name: '테이블 Table',
      description:
        '강력한 테이블 컴포넌트로 더 명확한 데이터 표시가 가능합니다',
      model: {
        modelValue: '매개변수 이름',
        selectedKeys: '선택된 키'
      },
      demo1: {
        title: '일반'
      },
      demo2: {
        title: '고정 행 열'
      },
      demo3: {
        title: '사용자 정의 작업'
      },
      demo4: {
        title: '슬롯'
      },
      demo5: {
        title: '사용자 정의 스타일'
      },
      demo6: {
        title: '선택'
      },
      demo7: {
        title: '정렬 가능'
      },
      demo8: {
        title: '사용자 정의 렌더링'
      },
      demo9: {
        title: '완전한 기능'
      },
      demo10: {
        title: '데이터 없음'
      },
      props: {
        columns: '열',
        dataSource: '데이터 소스',
        size: '크기',
        checkable: '선택 가능',
        maxHeight: '최대 높이',
        multiple: '다중 선택',
        rowKey: '행 키'
      },
      tableColumns: {
        field: '필드',
        fixed: '고정',
        title: '제목',
        type: '유형',
        width: '너비',
        x: 'X축',
        customRender: '사용자 정의 렌더링'
      }
    }
  }
}
