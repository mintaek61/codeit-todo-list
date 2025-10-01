# Todo List

Next.js와 TypeScript를 활용한 할 일 관리 서비스입니다.

## 🚀 주요 기능

### 할 일 목록 페이지 (`/`)

- **목록 조회**: 진행 중인 할 일과 완료된 할 일을 구분하여 표시
- **할 일 추가**: 상단 입력창에 할 일을 입력하고 추가하기 버튼 클릭 또는 엔터키로 새 할 일 생성
- **할 일 완료**: 체크박스 클릭으로 할 일 완료/진행 상태 토글
- **상세 페이지 이동**: 할 일 항목 클릭 시 상세 페이지로 이동

### 할 일 상세 페이지 (`/items/{itemId}`)

- **할 일 수정**: 제목, 완료 상태, 메모 수정 가능
- **이미지 첨부**: 최대 1개의 이미지 첨부 (파일명 영어만, 5MB 이하)
- **할 일 삭제**: 삭제하기 버튼으로 할 일 삭제
- **수정 완료**: 수정 사항 저장 후 목록 페이지로 이동

## 🛠️ 기술 스택

- **Frontend**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Build Tool**: Turbopack

## 📦 프로젝트 구조

```
src/
├── app/
│   ├── items/
│   │   └── [id]/
│   │       └── page.tsx          # 할 일 상세 페이지
│   ├── globals.css               # 전역 스타일 및 컬러 시스템
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 할 일 목록 페이지
├── components/
│   └── ui/
│       ├── Button.tsx            # 재사용 가능한 버튼 컴포넌트
│       ├── Input.tsx            # 재사용 가능한 입력 필드 컴포넌트
│       ├── Textarea.tsx         # 재사용 가능한 텍스트 영역 컴포넌트
│       ├── Checkbox.tsx         # 재사용 가능한 체크박스 컴포넌트
│       ├── Card.tsx             # 재사용 가능한 카드 컴포넌트
│       ├── LoadingSpinner.tsx   # 로딩 스피너 컴포넌트
│       └── index.ts            # 컴포넌트 export
├── lib/
│   └── api.ts                   # API 클라이언트
└── types/
    └── todo.ts                  # TypeScript 타입 정의
```

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: #3b82f6 (파란색)
- **Success**: #10b981 (초록색)
- **Warning**: #f59e0b (노란색)
- **Error**: #ef4444 (빨간색)
- **Gray Scale**: 50-900 단계별 회색 팔레트

### 반응형 디자인

- **Mobile**: 320px 이상
- **Tablet**: 768px 이상
- **Desktop**: 1024px 이상

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd codeit-todo-list
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📝 사용 가능한 스크립트

- `npm run dev`: 개발 서버 실행 (Turbopack 사용)
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 실행

## 🔧 API 연동

이 프로젝트는 외부 API를 사용합니다:

- **Base URL**: `https://assignment-todolist-api.vercel.app/api`
- **Tenant ID**: `codeit-todo-list`

### API 엔드포인트

- `GET /items`: 할 일 목록 조회
- `GET /items/{id}`: 특정 할 일 조회
- `POST /items`: 새 할 일 생성
- `PUT /items/{id}`: 할 일 수정
- `DELETE /items/{id}`: 할 일 삭제
- `POST /images`: 이미지 업로드

## 📱 반응형 웹 디자인

### 모바일 (320px+)

- 세로 레이아웃으로 폼 요소 배치
- 터치 친화적인 버튼 크기
- 적절한 여백과 패딩

### 태블릿 (768px+)

- 가로 레이아웃으로 폼 요소 배치
- 그리드 시스템 활용
- 중간 크기 버튼과 입력 필드

### 데스크탑 (1024px+)

- 최대 너비 제한으로 가독성 향상
- 호버 효과 및 상호작용 개선
- 큰 화면에 최적화된 레이아웃

## 🎯 주요 특징

### 재사용 가능한 컴포넌트

- UI 컴포넌트들을 모듈화하여 재사용성 극대화
- 일관된 디자인 시스템 적용
- TypeScript로 타입 안정성 보장

### 사용자 경험 (UX)

- 직관적인 인터페이스
- 로딩 상태 표시
- 에러 처리 및 사용자 피드백
- 반응형 디자인으로 모든 기기에서 최적화

### 코드 품질

- TypeScript로 타입 안정성 확보
- ESLint로 코드 품질 관리
- 컴포넌트별 주석 및 문서화
- 깔끔한 코드 구조

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
