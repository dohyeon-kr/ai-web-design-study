---
name: css-judgment
description: CSS 작업 시 "어떻게 쓸지"가 아니라 "어떻게 판단할지"를 가이드한다. padding/margin/gap/width/height/position/z-index/overflow를 만지거나, hover·focus·responsive를 손보거나, primitive token(spacing.4, gray.100 같은)을 직접 쓰려 하거나, 사진·아바타·복합 일러스트를 SVG로 흉내내려 할 때 반드시 이 skill을 거친다. 사이즈 결정 주체(외부 layout vs 내부 content)·블록 모델 보존·token 위계·관찰 가능한 안티패턴(child margin으로 형제 간격, 의도 없는 `flex:1`/`width:100%`, raw px·임의 토큰 조합)을 작업 전에 정렬한다.
---

# CSS Judgment Skill

CSS는 속성 조합이 아니라 **책임·언어·범위의 설계**다.
픽셀이 아니라 의도를 다룬다.

세 lens:
1. **Layout responsibility** — 누가 sizing·spacing·alignment를 책임지는가
2. **Design language** — 시스템의 의미 단위를 따르는가
3. **Blast radius** — 변경이 어디까지 닿는가

---

## 1. 작업 전 자가질문

답이 안 나오면 멈춰서 코드를 **읽는다**. 추측으로 박지 않는다.

### Sizing 주체 (가장 먼저)

이 요소의 사이즈는 **외부 layout이 정하는가, 내부 content가 정하는가?**

- **외부 중심** (카드, 그리드 셀, nav, 화면 영역) — 콘텐츠는 컨테이너에 맞춰 들어간다. 패턴: 부모 `padding` + `display: flex/grid`, 자식 `flex: 1` 또는 `grid 1fr`. 자식이 정사각형이면 `aspect-ratio: 1`. **자식에 fixed px 박지 마라.**
- **내부 중심** (버튼 라벨, 칩, 텍스트) — 콘텐츠가 사이즈를 결정. 자식 `fit-content`, 부모는 `gap`으로 정렬만.

이 결정을 안 하면 "fixed 48px 자식이 컨테이너 분배와 충돌해서 padding 소실" 같은 사고가 난다.

### Layout context

- 이 요소: `block` / `flex item` / `grid item` / `absolute`?
- 외부 spacing 책임: parent `gap` (default) vs child `margin` (overlap 같은 명확한 예외만)
- `overflow` / `z-index` / `position`을 도입한다면 의도를 한 문장으로 말할 수 있는가?
- **Fill 속성**(`flex: 1` / `width: 100%` / `height: 100%`)을 박을 때: parent의 `flex-direction`을 확인했는가? column parent에서 `flex: 1`은 세로 확장이다.

### Design language

- 이 값을 **semantic token**으로 표현 가능한가? 없으면 **component variant**로 가능한가?
- 둘 다 안 되면 — 시스템에 표현 수단이 없다는 신호. CSS를 박지 말고 **contract를 제안**.

### Blast radius / Visual sanity

- 변경이 닿는 모든 호출부를 떠올렸는가?
- viewport에서 reference와 같이 띄워 비교했는가? "안 깨졌다"가 아니라 padding·비율 일치.

---

## 2. 핵심 원칙

1. **Spacing 책임은 parent** — sibling 간격은 parent `gap`. child margin은 overlap 같은 명백한 예외만.
2. **Token 위계** — `Component variant > Semantic token > Primitive token`. primitive 직접 사용은 새 semantic을 제안하면서.
3. **Layout 속성 수정은 의도 명시** — `display`/`position`/`overflow`/`z-index` 변경은 한 문장으로 말할 수 있을 때만.
4. **Fill 속성은 증상 패치 신호** — `width: 100%`, `flex: 1`, `height: 100%`를 박기 전에 진짜 원인 찾기. flex item이 안 줄어들면 `min-width: 0` 누락이 1위 원인.
5. **Block model 보존** — declared `padding`/`border`/`margin`은 그대로 보존돼야 한다. 자식의 총 사이즈가 컨테이너 inner를 초과하면 padding이 시각적으로 소실된다. 자식을 fixed로 줄여 맞추지 말고, **relative 분배**(flex:1 / grid 1fr)로 재설계.
6. **사진·아바타·복합 일러스트는 직접 SVG로 그리지 않는다** — circles/paths 조합으로 face/photo를 흉내내려는 충동은 차단. 단순 UI 아이콘만 inline SVG OK. 사진성 자산은 codex 위임(반드시 `image-create` 스킬 명시) 또는 placeholder + 보고.
7. **시스템 수준 문제는 보고** — 동일 패턴 반복, semantic 부재, 1-context-only 컴포넌트는 직접 박지 말고 token/variant/contract 추가를 제안.

---

## 3. Anti-patterns (보이면 즉시 멈춤)

- ❌ 형제 간격을 child `margin-bottom` / `margin-right`로 해결
- ❌ 임의 px (`padding: 7px`)
- ❌ primitive token의 1회성 조합 (`var(--space-3) var(--space-5)`)
- ❌ 의도 없는 `flex: 1` — parent `flex-direction` 확인 없이 박기
- ❌ Fixed-size 자식 + `space-around`/`space-between` + `flex-shrink: 0`으로 컨테이너 overflow → padding 소실
- ❌ `width: 100%` / `height: 100%`로 layout 문제 패치
- ❌ `gap` + `justify-content: space-around` 동시 사용 (분배 충돌)
- ❌ z-index 원시 숫자, 의도 없는 `overflow: hidden`, `!important`
- ❌ 공통 컴포넌트의 `display`/`position` 변경
- ❌ Semantic token 있는데 primitive로 우회
- ❌ 사진·face avatar·복합 일러스트를 SVG 도형으로 흉내

---

## 4. 예시

### 예시 1 — 사이즈 결정 주체 잘못 판단 (SocialCard 회고)

상황: 카드 안에 3개 icon button. 자식 button을 `width: 44px; flex-shrink: 0`로 박았고, 부모를 `padding: 16px; justify-content: space-around; gap: 12px`로 함. 카드 inner width(141px)보다 자식+gap 총합(156px)이 큼 → 자식이 우측으로 overflow → **우측 padding이 시각적으로 0**으로 소실.

**나쁨**
```css
.card { padding: 16px; display: flex; justify-content: space-around; gap: 12px; }
.iconButton { width: 44px; height: 44px; flex-shrink: 0; }
```

**좋음** (block model 보존, 자식이 컨테이너에 fit)
```css
.card { padding: 12px; display: flex; align-items: center; gap: 4px; }
.iconButton { flex: 1; aspect-ratio: 1; /* size는 부모가 결정 */ }
```

판단: "카드 디자인이 핵심"인 구조 → 외부 layout이 사이즈 결정 → 자식은 fixed px가 아니라 `flex: 1` + `aspect-ratio: 1`로 비례 표현.

### 예시 2 — 리스트 아이템 간격 (parent gap)

**나쁨**
```tsx
<Item style={{ marginBottom: 12 }} /> // 자식이 외부 간격을 들고 다님
<Item style={{ marginBottom: 12 }} />
<Item /> {/* :last-child로 제거 — 패치의 패치 */}
```

**좋음**
```tsx
<List gap="md"><Item /><Item /><Item /></List>
```

### 예시 3 — flex item 줄어들지 않음

**나쁨**
```css
.child { width: 100%; }      /* 증상 패치 */
.parent { overflow: hidden; } /* 잘라서 숨김 */
```

**좋음**
```css
.child { min-width: 0; }
```

flex item의 기본 `min-width: auto`가 줄어듦을 막는 진짜 원인.

### 예시 4 — 시각 자산 (face avatar)

**나쁨**: `<svg>` 안에 `<circle>` + `<path>`로 face 흉내 → 어색한 placeholder

**좋음 (codex 환경)**: codex 서브에이전트에 위임. 프롬프트에 "**image-create 스킬을 사용해서**" 명시 + 파일 위치 + 사이즈/톤.

**좋음 (codex 환경 아님)**: 단색 원형 placeholder + `aria-label`로 자리 명세 + 상위에 "image-create로 채울 자리" 보고.

---

## 5. 검증

수정 후 다음에 답할 수 있어야 한다:

1. **재사용 안전성** — 다른 컨테이너에 넣어도 외부 간격이 깨지지 않는가?
2. **State 매트릭스** — hover/focus/disabled/loading/empty 동일 처리되는가?
3. **Token 위생** — 추가한 값이 variant 또는 semantic으로 표현 가능한가?
4. **Blast radius** — import하는 모든 곳에 시각 회귀가 없는가?
5. **실측 비교** — viewport에서 reference와 띄워 padding·비율 일치하는가? Fill 속성을 박은 곳은 특히 의도하지 않은 축으로 확장됐는지 확인.

---

## 6. 보고 형식

**무엇을 바꿨는가**가 아니라 **무엇을 결정했는가**를 먼저 말한다.

```
결정: <사이즈 결정 주체 / 책임 이동 / variant 추가 등>
이유: <왜 다른 방법이 아닌가>
변경: <파일 + 핵심 변경>
검증: <어떤 viewport / 어떤 state / overlay 결과>
잔여: <placeholder 자리 / 후속 작업 / 우려>
```

placeholder를 둔 자리는 반드시 "잔여"에 명시 — image-create로 채워야 본 자산 완성.

---

## 7. 우회 가능한 경우

- 사용자가 파일·라인 수준의 정확한 변경 지시를 줬고 위 원칙과 충돌하지 않을 때
- 단순 typo / 문자열 수정처럼 시각·레이아웃과 무관한 변경
- 디자인 시스템 등록된 단순 UI 아이콘을 그릴 때 (§2 원칙 6의 ✅ 케이스)
