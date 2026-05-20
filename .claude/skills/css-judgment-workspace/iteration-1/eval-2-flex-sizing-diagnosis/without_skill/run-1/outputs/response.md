# flex 자식 sizing 디버깅: 뭘 먼저 봐야 하나

본격적으로 고치기 전에 **"누가 사이즈를 결정하고 있는가"** 를 먼저 분리해서 보는 게 핵심이야. flex sizing은 거의 항상 "내가 짠 CSS" vs "flex 알고리즘의 기본 동작" 사이의 충돌이라, 추측으로 `flex: 1` 박고 `width: 100%` 박기 시작하면 미궁에 빠져.

진단할 때 보통 이 순서로 확인해.

**1. flex direction과 main/cross axis부터 확정.** `flex-direction`이 row면 width가 main, height가 cross다. 의도한 축이 어느 쪽인지 헷갈리면 `flex-basis` / `flex-grow` / `flex-shrink`가 의도와 다른 축에서 작동하고 있을 가능성이 큼.

**2. 자식의 `min-content` 사이즈.** flex item의 기본 `min-width`는 `auto`인데, 이게 자식 내용의 `min-content`로 해석돼서 "왜 안 줄어들지?"의 대부분 원인이야. 긴 텍스트, 이미지, `<input>` 같은 게 들어 있으면 `min-width: 0` (또는 `min-height: 0`)을 풀어야 `flex-shrink`가 비로소 동작함. 중첩 flex에서는 부모 쪽도 같이 풀어야 전파됨.

**3. `flex-basis` vs `width`.** `flex: 1`이 실제로 어떻게 풀리는지 (`1 1 0` vs `1 1 auto`) 확인. basis가 `auto`면 콘텐츠 크기 기반, `0`이면 부모 공간을 그로우 비율로 나눔 — 둘은 결과가 완전히 다른데 자주 혼동돼.

**4. 부모의 사이즈가 결정돼 있나.** 자식이 % / `flex-grow`로 잡혀 있는데 부모 자체가 `height: auto` / `min-height: 0` 으로 콘텐츠에 끌려다니면, 자식은 늘어날 공간 자체가 없음. 특히 height 방향에서 자주 사고남.

**5. DevTools의 flex 배지로 실측.** Chrome의 flex inspector에서 각 item의 `flex-basis` / `min-size` / actual size를 확인. 머릿속 모델과 실제 계산이 어디서 벌어지는지를 눈으로 확인하는 게 가장 빠름.

원칙은 하나야 — **"내가 명시한 사이즈"와 "flex가 계산한 사이즈" 중 어느 쪽이 이기고 있는지를 먼저 본다.** 그게 잡히면 고치는 건 보통 한 줄임.
