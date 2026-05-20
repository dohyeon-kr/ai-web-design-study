# flex 자식 sizing 안 됨 — 본격 수정 전 점검 순서

증상에 `width: 100%`나 `flex-shrink`를 던지기 전에, 먼저 **"이 자식의 sizing 책임이 누구에게 있는가"** 부터 정렬해야 함. 픽셀로 답을 맞추는 게 아니라, layout context를 읽는 작업.

## 1. Layout responsibility 먼저 — 누가 sizing을 결정하나

자식이 "의도대로 안 큰다 / 안 줄어든다"는 거의 항상 책임 소재 혼란임. 자식이 자기 width를 박고 있는데 부모 flex container가 다른 분배를 시도하면 충돌함. 그래서 코드를 만지기 전에 멘탈로 답해야 함:

- 이 자식의 sizing은 **자기 자신**이 결정해야 하나, **부모의 flex 분배**가 결정해야 하나?
- 정렬 문제인가, 분배 문제인가? — 정렬이면 부모의 `align-items` / `justify-content` / 자식의 `align-self`로 풀리지, 자식의 width로 풀리지 않음.
- 자식 안에 **더 큰 콘텐츠**(긴 텍스트, 이미지, 또 다른 flex container)가 들어있나? → `min-width: auto` 기본값이 줄어듦을 막고 있을 가능성 매우 높음. 이게 flex sizing 이슈의 1위 원인.

## 2. 부모 / 자식 양쪽 속성을 함께 본다

자식만 보면 답이 안 나옴. 최소한 다음을 함께 읽어야 진단이 됨:

- 부모: `display`, `flex-direction`, `align-items`, `justify-content`, `gap`, `width` / `min-width` / `max-width`
- 자식: `flex` 단축형(`flex: 1` vs `flex: 1 1 auto` vs `flex: 0 0 auto`), `min-width`, 자체 width 박혀 있는지

특히 자식이 또 다른 flex/grid container라면 **중첩된 min-width: auto** 가 사슬처럼 막고 있을 수 있음.

## 3. Blast radius 확인

자식이 공통 컴포넌트면, 거기에 `width: 100%`나 `flex-shrink: 0`을 박는 건 다른 호출부 전체에 시각 회귀를 뿌리는 일임. **이 자식이 다른 컨테이너에서도 같은 동작을 원하는가**를 먼저 확인하고, 아니면 호출부에서 wrapper로 가두는 게 안전함.

## 4. 해결을 시작하는 기준

위 셋이 정리되면 자연스럽게 갈래가 나뉨: 원인이 `min-width: auto` 면 1줄, 정렬 책임 혼란이면 부모로 책임 이동, 시스템 수준이면 variant/contract로 보고. 진단 없이 `width: 100%`로 덮는 건 증상 패치고, 다음 사람이 그걸 패턴으로 오인함.
