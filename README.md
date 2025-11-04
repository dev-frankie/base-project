### Version

- Next.js 15
- React 19

### Design Pattern (FSD)

Feature-Sliced Design 패턴을 따릅니다. 자세한 내용은 [FSD_STRUCTURE.md](./FSD_STRUCTURE.md) 참고.

##### 레이어 구조

- `shared` - 공유 레벨 (UI 컴포넌트, 유틸리티, 타입)
- `entities` - 엔티티 레벨 (비즈니스 엔티티)
- `features` - 기능 레벨 (사용자 기능)
- `widgets` - 위젯 레벨 (복합 UI 블록)
- `processes` - 프로세스 레벨 (복잡한 비즈니스 프로세스, 선택적)
- `pages` - 페이지 레벨 (라우트별 페이지)

##### 각 레벨은 상위 레벨만 import할 수 있습니다

- `pages` → `processes`, `widgets`, `features`, `entities`, `shared`
- `processes` → `features`, `entities`, `shared`
- `widgets` → `features`, `entities`, `shared`
- `features` → `entities`, `shared`
- `entities` → `shared`

### Package Manager

이 프로젝트는 **pnpm**을 사용합니다.

```bash
# pnpm 설치 (전역)
npm install -g pnpm

# 또는
corepack enable
corepack prepare pnpm@latest --activate
```

### Scripts

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format

# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# 테스트 UI
pnpm test:ui
```

### Git Hooks (Husky)

이 프로젝트는 Husky를 사용하여 Git hooks를 설정합니다.

**Pre-commit Hook:**

- `lint-staged`로 변경된 파일에 대해 자동으로 ESLint와 Prettier 실행
- 전체 프로젝트에 대해 ESLint 검사 실행

커밋 시 자동으로 린트 검사가 실행되며, 오류가 있으면 커밋이 차단됩니다.

### CI/CD (GitHub Actions)

`main` 브랜치에 push하거나 PR을 생성할 때 자동으로 실행됩니다:

- ✅ ESLint 검사
- ✅ Vitest 테스트 실행

워크플로우 파일: `.github/workflows/ci.yml`
