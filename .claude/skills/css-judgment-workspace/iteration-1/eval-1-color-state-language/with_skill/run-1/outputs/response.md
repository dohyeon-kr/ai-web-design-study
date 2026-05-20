# primary 상태 색 일관성, 어떻게 풀어야 안전한가

먼저 한 발 빼고 보자. 이건 "hover에 어떤 hex를 박을까" 문제가 아니라 **디자인 언어에 표현 수단이 부족하다는 신호**다. 호출부에서 색을 직접 만지는 순간 시스템은 졌다. 그래서 단계별로 이렇게 본다.

## 1. 일단 컴포넌트 variant가 우선이다

`primary` hover/pressed/강조는 색이 아니라 **상태(state)** 다. 상태는 컴포넌트 contract 안에서 닫혀 있어야 한다. 즉 `<Button variant="primary" />` 하나로 hover/pressed/focus/disabled가 전부 정의돼 있고, 호출부는 "primary가 필요하다"는 의도만 선언한다. 호출부가 hover 색을 알아야 한다면 그 시점에 이미 캡슐화가 깨진 거다.

## 2. 색은 semantic 레이어를 거쳐야 한다

variant 내부에서도 raw hex나 `gray[473]` 같은 primitive를 꺼내 쓰면 안 된다. 중간에 의도 단위의 의미 토큰이 있어야 한다 — 예컨대 `action.primary.default / hover / pressed / focus` 같은 **상태별 semantic**. 이 레이어가 있으면 primary 톤 전체를 한 군데서 흔들 수 있고, 다크모드/브랜드 확장도 같은 자리에서 끝난다. primitive 팔레트는 디자이너가 합성하라고 만든 재료지, 매번 호출부에서 즉흥 합성하라고 만든 게 아니다.

## 3. 지금 막힌 게 "강조 상태가 더 필요하다"라면, 그건 토큰 부재 신호다

hover/pressed 외에 "강조"가 자꾸 따로 필요하다는 건 — 현재 시스템에 `selected`, `emphasized`, `loud` 같은 의미가 빠져 있다는 뜻이다. 이때 해야 할 일은 색 추가가 아니라 **contract 제안**이다: "지금 시스템엔 hover/pressed까지만 있는데, 호출부들에서 selected/emphasized에 해당하는 의도가 반복 등장하고 있다. semantic을 하나 추가하자" 라고 보고. 그 합의 없이 컴포넌트마다 한 톤씩 더 진하게 박으면 6개월 뒤엔 누구도 어떤 게 정식 primary인지 모른다.

## 4. blast radius — 어디서 정의를 바꿀지

토큰을 추가/조정한다면 **시스템의 단일 출처**에서 끝나야 한다. 컴포넌트 파일에서 hex를 만지지 않는다. 변경이 닫혀 있는지(토큰 정의 한 곳 → 모든 variant가 따라옴)를 먼저 그려보고, 닫혀 있지 않으면 그 자체가 리팩터링 신호다.

## 결론

호출부에서 색을 박는 건 금지. variant로 상태를 캡슐화하고, variant는 상태별 semantic token을 참조한다. 새 강조가 필요하면 색을 만들지 말고 **새 semantic을 제안**한다. 빨리 끝내려고 한 곳에 hex를 박는 순간 다음 사람이 그걸 패턴으로 오해한다 — 그게 일관성이 진짜 깨지는 경로다.
