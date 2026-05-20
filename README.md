# ai-web-design-study

AI에게 웹 디자인 구현을 어디까지, 어떻게 위임할 수 있는지 실험하는 스터디 프로젝트.

---

## 연구 주제

**Agent에게 CSS 핸들링을 어디까지 맡길 수 있는가?**

### 핵심 가설

> CSS는 "코드 생성"보다 **시각적 의도 해석 + 영향 범위 제어 + 회귀 방지**가 어려워서,
> Agent에게 맡기려면 CSS 자체보다 **작업 경계와 검증 시스템**을 설계해야 한다.

---

## 1. Agent와 CSS 작업의 위험도 매핑

### 잘하는 작업

- 단순 스타일 추가
- 디자인 토큰 적용
- 반복적인 클래스 정리
- 반응형 보정
- 기존 패턴을 따른 컴포넌트 스타일 작성

### 위험한 작업

- 전역 CSS 수정
- 레이아웃 구조 변경
- `z-index` / `position` / `overflow` 조작
- 디자인 시스템 토큰 변경
- 여러 페이지에 영향 주는 공통 컴포넌트 수정

### 위임을 위한 시스템 조건

- Storybook이 있어야 한다
- 스냅샷 / 비주얼 회귀 테스트가 있어야 한다
- CSS 영향 범위가 컴포넌트 단위로 닫혀 있어야 한다
- 디자인 토큰 / spacing / typography 규칙이 명문화돼 있어야 한다
- "수정 금지 영역"이 명확해야 한다

---

## 2. 토큰의 함정 — "토큰을 썼다" ≠ "디자인 시스템을 따랐다"

Agent는 raw CSS보다 design token을 쓰게 만들면 안전해지지만,
여전히 **의미 없는 토큰 조합**으로 디자인 시스템의 일관성을 깨뜨릴 수 있다.

```ts
// 나쁨 — 토큰을 썼지만 임의 조합
color: vars.color.gray[473]
padding: vars.spacing[13]
borderRadius: vars.radius.xl2

// 좋음 — 의미 단위로 묶인 contract
variant: "primary"
size: "md"
tone: "brand"
density: "comfortable"
```

### 추상화 레벨

```
Primitive Token   — gray.100, spacing.4              ❌ Agent 직접 선택 금지
Semantic Token    — text.primary, surface.default    ⚠️ 조심해서 허용
Component Contract — Button variant=primary size=md  ✅ Agent에게 권장
Layout Contract   — Stack gap=md, Cluster justify    ✅ Agent에게 권장
```

> **원칙**: Agent에게 CSS 자유도를 주는 게 아니라, **선택 가능한 디자인 언어를 좁혀준다.**

---

## 3. CSS Agent Skill — 문법이 아닌 판단을 주입

Skill의 역할은 CSS 생성 규칙이 아니라 **CSS 사고방식 주입 장치**다.

```markdown
# CSS Agent Skill

## 원칙
CSS는 속성 단위로 수정하지 말고, 먼저 layout context를 파악한다.

## 수정 전 확인
- 이 요소는 block / flex / grid / absolute 중 무엇인가?
- 이 요소가 sizing을 결정하는가, 아니면 parent가 결정하는가?
- spacing 책임은 parent gap인가, child margin인가?
- overflow / z-index / position을 건드리는가?
- token / variant / recipe로 해결 가능한가?

## 금지
- 임의 px 추가
- primitive token 직접 선택
- 공통 컴포넌트 display 변경
- z-index raw number 사용
- 의도 없는 `overflow: hidden`
- `width: 100%`만 추가해서 해결 시도

## 선호
- parent `gap`
- `min-width: 0` 명시
- semantic token
- recipe variant
- layout contract 추가
```

진짜 핵심은 skill이 Agent에게 이렇게 말하게 만드는 것:

> ❌ "스타일을 수정하겠습니다"
>
> ✅ "이 문제는 spacing 책임이 child margin에 흩어져 있어서 parent gap으로 정리하는 게 안전합니다"

### Skill 분리 후보

1. **CSS Layout Diagnosis Skill** — 진단 단계
2. **Design Token Selection Skill** — 선택 단계
3. **Visual Regression Review Skill** — 검증 단계

---

## 4. 구체 지시 vs 설계철학

| | 구체 지시 | 설계철학 |
|---|---|---|
| 형태 | "padding은 16px 써" | "spacing 책임은 가능하면 parent가 가진다" |
| 효과 | Agent의 손을 움직임 | Agent의 판단을 바꿈 |
| 적용 범위 | 케이스별 정답 주입 | 판단 기준 주입 |
| 확장성 | 모든 케이스 나열 불가 | 미지의 상황에도 적용 |

Agent에게 전부 위임하려면 모든 상황을 미리 나열할 수 없으므로 **판단 기준을 공유**해야 한다.

다만 설계철학만 주면 추상적이라, 가장 좋은 형태는 다음 5단 구조:

```
철학 → 원칙 → 금지사항 → 예시 → 검증방법
```

### 예시 — Spacing Responsibility

```markdown
## 철학
CSS는 속성 조합이 아니라 layout responsibility를 설계하는 작업이다.

## 원칙
spacing은 parent gap을 우선한다.

## 금지
형제 간 간격을 만들기 위해 child margin을 추가하지 않는다.

## 예시
List 내부 Item 간격은 Item margin-bottom이 아니라 List gap으로 처리한다.

## 검증
Item이 다른 컨테이너에서 재사용될 때 불필요한 외부 간격이 생기지 않아야 한다.
```

---

## 5. 더 큰 흐름 — 개발의 초점 이동

```
예전 — 내가 직접 구현한다
지금 — AI가 구현하게 만든다
앞으로 — AI가 안정적으로 구현할 수 있는 환경을 설계한다
```

이 흐름에서 중요해지는 것은 AI 자체 성능이 아니라:

- **경계(boundary)**
- **contract**
- **semantics**
- **observability**
- **verification**

같은 시스템 설계다.

> 강한 엔지니어는 단순 구현자가 아니라
> **Agent가 사고할 수 있는 언어를 설계하는 사람**이 될 가능성이 크다.

CSS 위임 문제도 결국 추상화 레벨을 올리는 작업:

```
raw css
  ↓
semantic token
  ↓
component contract
  ↓
layout contract
  ↓
agent skill
```

→ AI가 "픽셀"이 아니라 **"의도"** 를 다루게 만든다.

---

## 6. 결론

- Agent에게 CSS를 맡기는 일은 "더 똑똑한 Agent를 만드는 일"이 아니라 **"Agent가 망치기 어려운 시스템을 만드는 일"**에 가깝다.
- 토큰 도입만으로는 부족하다 — Agent에게 노출되는 추상화 레벨을 컴포넌트 / 레이아웃 contract까지 끌어올려야 한다.
- 구체 지시는 단기적, 설계철학은 장기적으로 효율적이다.
- 가장 좋은 형태: **철학 → 원칙 → 금지 → 예시 → 검증** 5단 구조.

---

## 프로젝트 구조

```
apps/
  web/                 # Vite + React 통합 셸 — 랜딩(연구 소개) + 쇼케이스(탭 + iframe)
.github/
  workflows/pages.yml  # main 셸 + 각 예시 브랜치 빌드 → /showcases/<slug>/ 로 합쳐서 gh-pages 배포
.claude/
  skills/              # Agent skill 실험 (css-judgment, image-asset-strategy, visual-reference-compare)
```

## 배포

`main`에 push되면 GitHub Actions가:
1. 셸을 빌드 (base=`/ai-web-design-study/`)
2. 각 예시 브랜치를 워크트리로 체크아웃 → 빌드 (base=`/ai-web-design-study/showcases/<slug>/`)
3. 모두 합쳐 GitHub Pages로 배포

새로운 예시 추가 시:
1. `feature/<example>-ui` 브랜치에서 예시 작성
2. `apps/web/src/showcase/examples.ts`에 슬롯 추가 (`status: 'live'`, `embedPath` 지정)
3. `.github/workflows/pages.yml`의 `entries` 배열에 `"<slug>:<branch>"` 추가
