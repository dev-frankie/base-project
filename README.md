

### Version 
nextjs 15
react 19




### Desgin Pettern (FSD)
##### shared (공유 레벨)
- ui/Button - 재사용 가능한 버튼 컴포넌트
- ui/Input - 재사용 가능한 입력 컴포넌트
- lib/utils - 유틸리티 함수들
##### entities (엔티티 레벨)
- todo/model/types - Todo 타입 정의
- todo/api/todoApi - Todo API (localStorage 기반)
- todo/ui/TodoItem - Todo 아이템 컴포넌트
##### features (기능 레벨)
- todo-create/ui/TodoCreateForm - Todo 생성 기능
- widgets (위젯 레벨)
- todo-list/ui/TodoList - Todo 목록 위젯 (features와 entities를 조합)
##### app (페이지 레벨)
- page.tsx - 메인 페이지 (widgets 사용)
##### 각 레벨은 상위 레벨만 import할 수 있습니다
- widgets → features, entities, shared
- features → entities, shared
- entities → shared
