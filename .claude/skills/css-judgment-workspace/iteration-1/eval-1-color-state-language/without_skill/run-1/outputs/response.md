# Primary 톤 상태 색을 어떻게 풀까

핵심은 **"색을 컴포넌트가 정하지 못하게 만드는 것"**입니다. 컴포넌트가 hex/raw 값을 알면 그 시점에 일관성은 이미 깨진 상태고, hover/pressed가 더 늘어날수록 산탄총 패치로 번집니다. 토큰 레이어를 의도적으로 두 단계로 쪼개야 안전합니다.

## 1. 토큰을 2계층으로 분리

- **Primitive (reference) tokens**: `blue-500`, `blue-600` 같은 팔레트. 의미 없음, 값만 있음.
- **Semantic (alias) tokens**: `color-primary`, `color-primary-hover`, `color-primary-pressed`, `color-primary-emphasis`. 이 이름이 컴포넌트가 보는 유일한 인터페이스.

컴포넌트는 무조건 semantic만 참조하고, semantic은 primitive를 가리킵니다. 다크모드/리브랜딩이 와도 컴포넌트는 그대로, 매핑 한 줄만 바뀝니다.

## 2. 상태는 "조정"이 아니라 "이름"으로

`color-primary`에서 darken(8%) 같은 동적 계산을 컴포넌트가 하면 안 됩니다. hover/pressed/focus/selected/emphasis는 **각각 토큰으로 박제**합니다. 디자이너가 "hover는 더 어두워야 해"라고 했을 때 한 곳만 바꾸면 끝나야 합니다. 계산식이 컴포넌트에 박히면 디자이너 결정이 코드로 분산됩니다.

## 3. 상호작용 상태는 표준 vocabulary로 고정

상태 이름은 컴포넌트마다 자유롭게 짓지 말고 디자인 시스템 차원에서 **정해둔 집합만 허용**: `default / hover / pressed / focus / disabled / selected / emphasis`. 새 상태가 필요하면 토큰부터 추가하고 그 다음 컴포넌트가 씁니다. 역순으로 가면 같은 색이 다섯 군데 다른 이름으로 박힙니다.

## 4. 가드레일은 도구로

- **린트**: 컴포넌트 파일에서 raw hex / rgb / primitive 토큰 직접 사용을 금지.
- **타입**: `bg`, `color` prop이 semantic 토큰 유니온 타입만 받도록.
- **리뷰 체크리스트**: "새 색 추가" PR은 토큰 정의 변경 없이는 머지 금지.

이렇게 두면 "primary가 더 필요해"라는 요청이 컴포넌트 수정이 아니라 **토큰 추가 PR**로 자연스럽게 흘러가고, 일관성은 도구가 지켜줍니다. 손으로 지키려 하면 무조건 무너집니다.
