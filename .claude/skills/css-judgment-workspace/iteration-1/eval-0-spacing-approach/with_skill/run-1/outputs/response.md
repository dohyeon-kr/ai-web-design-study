## 가장 안전한 spacing 접근

"어떤 값"이 아니라 **누가 책임지느냐**부터 정하는 게 안전합니다. 값은 그 다음.

### 1. 책임을 parent로 올린다 — 가장 중요한 결정

컴포넌트 **사이**의 간격이라고 했으니, 그건 자식이 아니라 컨테이너의 책임입니다.
자식에 `margin-bottom` / `margin-right`을 박지 마세요. 그 자식이 다른 컨테이너에 들어가는 순간 외부 간격이 항상 어긋납니다 — `:last-child` 예외처리, 컨테이너별 override 같은 패치의 패치가 시작되는 지점이 거기입니다.

대신 parent에서 layout primitive(`flex` / `grid`)의 `gap`으로 표현합니다. 이러면 아이템 추가·삭제·재정렬·재사용 모두 자동으로 맞습니다.

### 2. 값은 raw px이 아니라 시스템 어휘로

`gap: 12px` 같은 raw 값, 또는 `spacing[3]` 같은 primitive token을 매번 합성하는 것 둘 다 피합니다. 우선순위:

1. 이미 정의된 layout 컴포넌트의 `gap` prop (예: `<Stack gap="md">`) — 있으면 그걸 쓴다.
2. semantic spacing token (`space.section`, `space.itemGap` 같은 의미 단위) — 있으면 그걸 쓴다.
3. 둘 다 없다 → 멈추고 보고합니다. "현 시스템에 이 의도에 맞는 spacing semantic이 없습니다. 추가할지, 1회성 variant로 가둘지 결정 부탁드립니다."

### 3. 작업 전 자가질문 (30초)

- 이 요소는 flex item / grid item / block 중 무엇인가? — `gap` 가능 여부가 갈립니다.
- parent를 손댈 수 있는가, 아니면 호출부에서만 작업해야 하는가? — blast radius가 다릅니다.
- 공통 컴포넌트(List, Stack, Section 등)의 spacing API를 건드리는 변경인가? — 그렇다면 모든 사용처를 한 번 훑고 들어갑니다.

### 4. 보고는 "결정"부터

"gap을 16px로 했습니다"가 아니라 "spacing 책임을 parent로 이동, semantic token X 사용, 영향 범위는 이 페이지 한정"이라고 보고하면 다음 사람이 패턴을 오해하지 않습니다.

요약: **parent의 gap + semantic token**이 default. 둘 중 하나가 시스템에 없으면 코드 박지 말고 contract부터 합의.
