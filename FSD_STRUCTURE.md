# FSD (Feature-Sliced Design) 패턴 구조

이 프로젝트는 FSD 아키텍처 패턴을 따릅니다.

## 디렉토리 구조

```
├── app/              # Next.js App Router 디렉토리
│   ├── processes/    # 프로세스 레이어 - 복잡한 비즈니스 프로세스 (선택적)
│   ├── pages/        # 페이지 레이어 - 라우트별 페이지 컴포넌트
│   ├── widgets/      # 위젯 레이어 - 복합 UI 블록
│   ├── features/     # 기능 레이어 - 사용자 기능 (비즈니스 로직 포함)
│   ├── entities/     # 엔티티 레이어 - 비즈니스 엔티티
│   ├── shared/       # 공유 레이어 - 재사용 가능한 공통 요소
│   │   ├── ui/       # 공통 UI 컴포넌트
│   │   ├── lib/      # 유틸리티 함수
│   │   └── types/    # 공통 타입 정의
│   ├── page.tsx      # Next.js 라우트 (pages 레이어 사용)
│   └── layout.tsx    # Next.js 레이아웃
└── ...               # 기타 설정 파일들
```

## 레이어별 역할

### 1. **shared** (공유 레이어)
프로젝트 전반에서 재사용되는 공통 요소

- `shared/ui/` - Button, Input 등 재사용 가능한 UI 컴포넌트
- `shared/lib/` - 유틸리티 함수 (cn, formatDate, debounce 등)
- `shared/types/` - 공통 타입 정의

**예제:**
- `shared/ui/Button` - 공통 버튼 컴포넌트
- `shared/ui/Input` - 공통 입력 필드 컴포넌트
- `shared/lib/utils` - 유틸리티 함수들

### 2. **entities** (엔티티 레이어)
비즈니스 엔티티 및 관련 로직

- `entities/{entity}/model/` - 타입 정의, 스토어, API
- `entities/{entity}/ui/` - 엔티티 관련 UI 컴포넌트

**예제:**
- `entities/user/` - User 엔티티
  - `model/types.ts` - User 타입 정의
  - `model/store.ts` - User 상태 관리 (Zustand)
  - `ui/UserCard/` - User 카드 컴포넌트

### 3. **features** (기능 레이어)
사용자가 수행하는 특정 기능

- `features/{feature}/model/` - 기능별 비즈니스 로직, 스토어
- `features/{feature}/ui/` - 기능별 UI 컴포넌트

**예제:**
- `features/todo/` - Todo 기능
  - `model/types.ts` - Todo 타입 정의
  - `model/store.ts` - Todo 상태 관리
  - `ui/CreateTodoForm/` - Todo 생성 폼
  - `ui/TodoItem/` - Todo 아이템 컴포넌트

### 4. **widgets** (위젯 레이어)
여러 기능과 엔티티를 조합한 복합 UI 블록

- `widgets/{widget}/` - 독립적인 위젯 컴포넌트

**예제:**
- `widgets/Header/` - 헤더 위젯
- `widgets/TodoList/` - Todo 리스트 위젯 (features/todo 조합)

### 5. **pages** (페이지 레이어)
라우트별 페이지 컴포넌트

- `pages/{page}/` - 페이지 컴포넌트

**예제:**
- `pages/HomePage/` - 홈 페이지

### 6. **processes** (프로세스 레이어) - 선택적
여러 features를 조합한 복잡한 비즈니스 프로세스

- `processes/{process}/` - 복잡한 워크플로우 프로세스
- **선택적 레이어**: 간단한 기능에는 필요 없음
- **사용 시기**: 여러 features를 순차적/조건부로 조합해야 할 때

**예제:**
- `processes/auth/` - 인증 프로세스 (로그인 + 회원가입 + 이메일 인증 조합)
- `processes/checkout/` - 결제 프로세스 (장바구니 + 결제 + 주문 생성)
- `processes/onboarding/` - 온보딩 프로세스 (단계별 가입 프로세스)

**TodoList 예제에서는 사용하지 않음**: 단순한 기능이므로 processes 없이 pages에서 직접 widgets 사용

### 7. **app** (앱 레이어)
Next.js App Router 디렉토리

- Next.js의 App Router 구조
- `app/page.tsx` - 페이지에서 pages 레이어 컴포넌트 사용
- `app/layout.tsx` - 루트 레이아웃
- 모든 FSD 레이어는 `app/` 디렉토리 안에 위치

## 임포트 규칙

FSD 패턴에서는 **상위 레이어만 하위 레이어를 참조**할 수 있습니다:

**레이어 순서 (상위 → 하위):**
1. `app` (Next.js 라우팅)
2. `processes` → 여러 features 조합
3. `pages` → widgets, processes, features, entities, shared
4. `widgets` → features, entities, shared
5. `features` → entities, shared
6. `entities` → shared
7. `shared` → 다른 레이어 참조 불가

**허용되는 임포트:**
- ✅ `pages` → `processes`, `widgets`, `features`, `entities`, `shared`
- ✅ `processes` → `features`, `entities`, `shared` (여러 features 조합)
- ✅ `widgets` → `features`, `entities`, `shared`
- ✅ `features` → `entities`, `shared`
- ✅ `entities` → `shared`

**금지되는 임포트:**
- ❌ `shared` → 다른 레이어 참조 불가
- ❌ 같은 레이어 내 다른 슬라이스 참조 지양 (필요시 공통 부분은 상위 레이어로 이동)

## 예제 구조 설명

### Todo 기능 예제

```
features/todo/
├── model/
│   ├── types.ts          # Todo 타입 정의
│   └── store.ts          # Todo 상태 관리 (Zustand)
└── ui/
    ├── CreateTodoForm/   # Todo 생성 폼
    └── TodoItem/         # Todo 아이템
```

### 사용 흐름

**간단한 경우 (TodoList 예제):**
1. **shared/ui** - Button, Input 컴포넌트 제공
2. **entities/user** - User 엔티티 및 관련 로직
3. **features/todo** - Todo 기능 구현 (shared와 entities 사용)
4. **widgets/TodoList** - Todo 기능을 조합한 위젯
5. **pages/HomePage** - 페이지에서 위젯들 조합
6. **app/page.tsx** - Next.js 페이지에서 HomePage 사용

**복잡한 경우 (인증 프로세스 예제):**
1. **shared/ui** - 공통 컴포넌트
2. **entities/user** - User 엔티티
3. **features/login** - 로그인 기능
4. **features/register** - 회원가입 기능
5. **features/email-verification** - 이메일 인증 기능
6. **processes/auth** - 위 features들을 조합한 인증 프로세스
7. **pages/LoginPage** - 페이지에서 processes/auth 사용

## 확장 가이드

### 새로운 기능 추가하기

1. **새 엔티티 추가**: `entities/{entity-name}/` 디렉토리 생성
2. **새 기능 추가**: `features/{feature-name}/` 디렉토리 생성
3. **새 위젯 추가**: `widgets/{widget-name}/` 디렉토리 생성
4. **새 프로세스 추가** (선택적): `processes/{process-name}/` 디렉토리 생성
   - 여러 features를 조합해야 할 때만 사용
5. **새 페이지 추가**: `pages/{page-name}/` 디렉토리 생성

### processes 레이어 사용 가이드

**언제 processes를 사용하나요?**
- ✅ 여러 features를 순차적으로 실행해야 할 때
- ✅ 복잡한 비즈니스 워크플로우가 있을 때
- ✅ 단계별 프로세스가 필요할 때 (예: 온보딩, 체크아웃)

**언제 processes를 사용하지 않나요?**
- ❌ 단순한 기능은 widgets나 pages에서 직접 처리
- ❌ 하나의 feature만 필요한 경우
- ❌ 단순히 여러 위젯을 나열하는 경우

### 공통 컴포넌트 추가하기

- 재사용 가능한 UI 컴포넌트는 `shared/ui/` 에 추가
- 프로젝트 전반에서 사용하는 유틸리티는 `shared/lib/` 에 추가

## 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD Best Practices](https://feature-sliced.design/docs/get-started/overview)

